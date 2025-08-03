import React, { useEffect, useState, useRef } from 'react';
import CodeBlock from './CodeBlock';

// TypeScript declarations for Google Charts
declare global {
  interface Window {
    google: {
      charts: {
        load: (version: string, options: { packages: string[] }) => void;
        setOnLoadCallback: (callback: () => void) => void;
      };
      visualization: {
        arrayToDataTable: (data: any[][]) => any;
        DataTable: new () => any;
        PieChart: new (element: HTMLElement) => any;
        LineChart: new (element: HTMLElement) => any;
        ColumnChart: new (element: HTMLElement) => any;
        BarChart: new (element: HTMLElement) => any;
        AreaChart: new (element: HTMLElement) => any;
        ScatterChart: new (element: HTMLElement) => any;
        ComboChart: new (element: HTMLElement) => any;
        Table: new (element: HTMLElement) => any;
        Histogram: new (element: HTMLElement) => any;
      };
    };
  }
}

interface GoogleChartsLoaderProps {
  children: (isLoaded: boolean) => React.ReactNode;
  packages?: string[];
  version?: string;
  timeout?: number;
  showCode?: boolean;
}

// Global state to track loaded packages and prevent conflicts
declare global {
  interface Window {
    __googleChartsLoadedPackages?: Set<string>;
    __googleChartsLoading?: Promise<void>;
  }
}

// Helper function to extract chart creation code from the children function
const extractChartCode = (functionString: string): string => {
  try {
    // Remove the outer function wrapper and extract the useEffect content
    const useEffectMatch = functionString.match(/useEffect\(\(\) => \{([\s\S]*?)\}, \[isLoaded\]\);/);
    if (!useEffectMatch) return '';

    let code = useEffectMatch[1];

    // Remove the conditional wrapper and chartRef check
    const conditionalMatch = code.match(/if \(isLoaded && chartRef\.current\) \{([\s\S]*?)\n\s*\}/s);
    if (conditionalMatch) {
      code = conditionalMatch[1];
    }

    // Clean up indentation and remove unnecessary parts
    const lines = code.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim() !== '');

    if (nonEmptyLines.length === 0) return '';

    // Find the minimum indentation (excluding the first line which might be special)
    const indentations = nonEmptyLines
      .slice(1) // Skip first line
      .map(line => line.match(/^\s*/)?.[0]?.length || 0)
      .filter(indent => indent > 0);

    const minIndent = indentations.length > 0 ? Math.min(...indentations) : 0;

    // Remove the common indentation and clean up
    const cleanedLines = nonEmptyLines.map(line => {
      if (line.trim() === '') return '';
      const currentIndent = line.match(/^\s*/)?.[0]?.length || 0;
      const newIndent = Math.max(0, currentIndent - minIndent);
      return ' '.repeat(newIndent) + line.trim();
    });

    code = cleanedLines.join('\n').trim();

    return code;
  } catch (error) {
    console.warn('Error extracting code:', error);
    return '';
  }
};

const GoogleChartsLoader: React.FC<GoogleChartsLoaderProps> = ({
  children,
  packages = ['corechart', 'table'],
  version = 'current',
  timeout = 10000,
  showCode = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [extractedCode, setExtractedCode] = useState<string>('');

  // Extract code from the children function for display
  useEffect(() => {
    if (showCode) {
      try {
        const childrenStr = children.toString();
        const codeMatch = extractChartCode(childrenStr);
        if (codeMatch) {
          setExtractedCode(codeMatch);
        }
      } catch (error) {
        console.warn('Could not extract code for display:', error);
      }
    }
  }, [children, showCode]);

  useEffect(() => {
    // Helper function to check if Google Charts and visualization API are fully loaded
    const isGoogleChartsReady = () => {
      return window.google &&
             window.google.charts &&
             window.google.visualization &&
             window.google.visualization.arrayToDataTable;
    };

    // Helper function to check if all required packages are loaded
    const arePackagesLoaded = (requiredPackages: string[]) => {
      if (!window.__googleChartsLoadedPackages) return false;
      return requiredPackages.every(pkg => window.__googleChartsLoadedPackages!.has(pkg));
    };

    // Initialize loaded packages set if not exists
    if (!window.__googleChartsLoadedPackages) {
      window.__googleChartsLoadedPackages = new Set();
    }

    // Check if Google Charts is already fully loaded with the required packages
    if (isGoogleChartsReady() && arePackagesLoaded(packages)) {
      setIsLoaded(true);
      return;
    }

    // If already loading, wait for it to complete
    if (window.__googleChartsLoading) {
      window.__googleChartsLoading.then(() => {
        if (isGoogleChartsReady() && arePackagesLoaded(packages)) {
          setIsLoaded(true);
        } else {
          // Need to load additional packages
          loadAdditionalPackages();
        }
      });
      return;
    }

    const loadAdditionalPackages = () => {
      const missingPackages = packages.filter(pkg => !window.__googleChartsLoadedPackages!.has(pkg));

      if (missingPackages.length === 0) {
        setIsLoaded(true);
        return;
      }

      // Merge with already loaded packages to avoid conflicts
      const allPackages = Array.from(new Set([...Array.from(window.__googleChartsLoadedPackages!), ...packages]));

      window.google.charts.load(version, { packages: allPackages });
      window.google.charts.setOnLoadCallback(() => {
        // Mark packages as loaded
        packages.forEach(pkg => window.__googleChartsLoadedPackages!.add(pkg));

        if (isGoogleChartsReady()) {
          setIsLoaded(true);
        } else {
          console.error('Google Charts loaded but visualization API not available');
        }
      });
    };

    // Load Google Charts if not already loaded
    if (!window.google) {
      window.__googleChartsLoading = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
          window.google.charts.load(version, { packages });
          window.google.charts.setOnLoadCallback(() => {
            // Mark packages as loaded
            packages.forEach(pkg => window.__googleChartsLoadedPackages!.add(pkg));

            if (isGoogleChartsReady()) {
              setIsLoaded(true);
              resolve();
            } else {
              console.error('Google Charts loaded but visualization API not available');
              reject(new Error('Visualization API not available'));
            }
          });
        };
        script.onerror = () => {
          const error = new Error('Failed to load Google Charts script');
          console.error(error.message);
          reject(error);
        };
        document.head.appendChild(script);
      });
    } else {
      // Google is loaded, load additional packages if needed
      loadAdditionalPackages();
    }

    // Timeout fallback
    const timeoutId = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Google Charts failed to load within timeout period');
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [packages, version, timeout]);

  return (
    <>
      {children(isLoaded)}
      {showCode && extractedCode && (
        <div style={{ marginTop: '20px' }}>
          <CodeBlock
            code={extractedCode}
            language="javascript"
            title="Chart Code"
            showLineNumbers={true}
            showCopyButton={true}
          />
        </div>
      )}
    </>
  );
};

export default GoogleChartsLoader;
