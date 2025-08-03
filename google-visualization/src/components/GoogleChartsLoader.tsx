import React, { useEffect, useState } from 'react';

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
        CandlestickChart: new (element: HTMLElement) => any;
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
}

const GoogleChartsLoader: React.FC<GoogleChartsLoaderProps> = ({
  children,
  packages = ['corechart', 'table'],
  version = 'current',
  timeout = 10000,
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

  return <>{children(isLoaded)}</>;
};

export default GoogleChartsLoader;
