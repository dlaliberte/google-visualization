import React, { useEffect, useState } from 'react';

interface GoogleChartsLoaderProps {
  children: (isLoaded: boolean) => React.ReactNode;
  packages?: string[];
  version?: string;
  timeout?: number;
}

const GoogleChartsLoader: React.FC<GoogleChartsLoaderProps> = ({
  children,
  packages = ['corechart'],
  version = 'current',
  timeout = 10000,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Charts is already loaded
    if (window.google && window.google.charts) {
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
          setIsLoaded(true);
        });
      };
      document.head.appendChild(script);
    } else {
      // Google is loaded but charts might not be
      window.google.charts.load(version, { packages });
      window.google.charts.setOnLoadCallback(() => {
        setIsLoaded(true);
      });
    }

    // Timeout fallback
    const timeoutId = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Google Charts failed to load within timeout period');
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [packages, version, timeout, isLoaded]);

  return <>{children(isLoaded)}</>;
};

export default GoogleChartsLoader;
