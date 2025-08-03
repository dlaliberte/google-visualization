import React, { useEffect, useState, useRef } from 'react';

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
  codeString?: string;
}

// Global state to track loaded packages and prevent conflicts
declare global {
  interface Window {
    __googleChartsLoadedPackages?: Set<string>;
    __googleChartsLoading?: Promise<void>;
  }
}

const GoogleChartsLoader: React.FC<GoogleChartsLoaderProps> = ({
  children,
  packages = ['corechart', 'table'],
  version = 'current',
  timeout = 10000,
  showCode = false,
  codeString = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here if desired
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      {children(isLoaded)}
      {showCode && codeString && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '8px 12px',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Chart Code</span>
            <button
              onClick={() => copyToClipboard(codeString)}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#007cba',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Copy Code
            </button>
          </div>
          <pre style={{
            margin: 0,
            padding: '12px',
            backgroundColor: '#fafafa',
            overflow: 'auto',
            fontSize: '13px',
            lineHeight: '1.4'
          }}>
            <code>{codeString}</code>
          </pre>
        </div>
      )}
    </>
  );
};

export default GoogleChartsLoader;
