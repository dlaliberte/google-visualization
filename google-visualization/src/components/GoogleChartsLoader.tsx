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

        [key: string]: any;
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

    // Check if Google Charts is already fully loaded with the required packages
    if (isGoogleChartsReady()) {
      setIsLoaded(true);
      return;
    }

    // Load Google Charts if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        window.google.charts.load(version, { packages });
        window.google.charts.setOnLoadCallback(() => {
          // Double-check that visualization API is available before setting loaded
          if (isGoogleChartsReady()) {
            setIsLoaded(true);
          } else {
            console.error('Google Charts loaded but visualization API not available');
          }
        });
      };
      script.onerror = () => {
        console.error('Failed to load Google Charts script');
      };
      document.head.appendChild(script);
    } else {
      // Google is loaded but charts might not be, or packages might be different
      window.google.charts.load(version, { packages });
      window.google.charts.setOnLoadCallback(() => {
        // Double-check that visualization API is available before setting loaded
        if (isGoogleChartsReady()) {
          setIsLoaded(true);
        } else {
          console.error('Google Charts loaded but visualization API not available');
        }
      });
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
