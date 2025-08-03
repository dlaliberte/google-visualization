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
    console.log('Full function string:', functionString);

    // Look for key patterns in the function to identify chart type and data
    const patterns = {
      // Data patterns
      arrayToDataTable: /google\.visualization\.arrayToDataTable\(\[([\s\S]*?)\]\)/,

      // Chart type patterns
      pieChart: /new google\.visualization\.PieChart/,
      lineChart: /new google\.visualization\.LineChart/,
      columnChart: /new google\.visualization\.ColumnChart/,
      barChart: /new google\.visualization\.BarChart/,
      areaChart: /new google\.visualization\.AreaChart/,
      scatterChart: /new google\.visualization\.ScatterChart/,
      comboChart: /new google\.visualization\.ComboChart/,
      table: /new google\.visualization\.Table/,
      histogram: /new google\.visualization\.Histogram/,

      // Options pattern
      options: /const options = \{([\s\S]*?)\};/,
    };

    // Extract data
    const dataMatch = functionString.match(patterns.arrayToDataTable);
    let dataCode = '';
    if (dataMatch) {
      dataCode = `const data = google.visualization.arrayToDataTable([${dataMatch[1]}]);`;
    }

    // Extract options
    const optionsMatch = functionString.match(patterns.options);
    let optionsCode = '';
    if (optionsMatch) {
      optionsCode = `const options = {${optionsMatch[1]}};`;
    }

    // Determine chart type
    let chartType = '';
    let chartCode = '';

    if (patterns.pieChart.test(functionString)) {
      chartType = 'PieChart';
    } else if (patterns.lineChart.test(functionString)) {
      chartType = 'LineChart';
    } else if (patterns.columnChart.test(functionString)) {
      chartType = 'ColumnChart';
    } else if (patterns.barChart.test(functionString)) {
      chartType = 'BarChart';
    } else if (patterns.areaChart.test(functionString)) {
      chartType = 'AreaChart';
    } else if (patterns.scatterChart.test(functionString)) {
      chartType = 'ScatterChart';
    } else if (patterns.comboChart.test(functionString)) {
      chartType = 'ComboChart';
    } else if (patterns.table.test(functionString)) {
      chartType = 'Table';
    } else if (patterns.histogram.test(functionString)) {
      chartType = 'Histogram';
    }

    if (chartType) {
      chartCode = `const chart = new google.visualization.${chartType}(chartRef.current);
chart.draw(data, options);`;
    }

    // Combine all parts
    const parts = [dataCode, optionsCode, chartCode].filter(part => part.trim() !== '');
    const result = parts.join('\n\n');

    console.log('Generated code:', result);
    return result;

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
    if (showCode && typeof window !== 'undefined') {
      try {
        const childrenStr = children.toString();
        console.log('Function string:', childrenStr);
        const codeMatch = extractChartCode(childrenStr);
        console.log('Extracted code match:', codeMatch);
        if (codeMatch) {
          setExtractedCode(codeMatch);
        } else {
          // Fallback: provide a basic template
          setExtractedCode(`// Chart code will be displayed here once the component loads
// The actual implementation is in the chart above`);
        }
      } catch (error) {
        console.warn('Could not extract code for display:', error);
        // Fallback for extraction errors
        setExtractedCode(`// Code extraction failed
// Please check the browser console for more details`);
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
