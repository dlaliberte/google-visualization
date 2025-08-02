import React, { useEffect, useRef } from 'react';

interface GoogleChartCodeProps {
  code: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const GoogleChartCode: React.FC<GoogleChartCodeProps> = ({
  code,
  width = '100%',
  height = 400,
  className = '',
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const executeChartCode = () => {
      if (!chartRef.current || !window.google) return;

      try {
        // Create a function that has access to the chart container
        const chartFunction = new Function(
          'google',
          'container',
          'console',
          `
          ${code}
          `
        );

        // Execute the code with the necessary context
        chartFunction(window.google, chartRef.current, console);
      } catch (error) {
        console.error('Error executing chart code:', error);
        if (chartRef.current) {
          chartRef.current.innerHTML = `<div style="color: red; padding: 20px;">Error rendering chart: ${error.message}</div>`;
        }
      }
    };

    // Check if Google Charts is already loaded
    if (window.google && window.google.charts) {
      executeChartCode();
    } else {
      // Wait for Google Charts to load
      const checkGoogleCharts = setInterval(() => {
        if (window.google && window.google.charts) {
          clearInterval(checkGoogleCharts);
          executeChartCode();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkGoogleCharts), 10000);
    }
  }, [code]);

  return (
    <div
      ref={chartRef}
      className={`google-chart-code ${className}`}
      style={{ width, height }}
    />
  );
};

export default GoogleChartCode;
