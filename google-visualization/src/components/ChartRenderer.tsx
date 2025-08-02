import React, { useEffect, useRef } from 'react';

interface ChartRendererProps {
  code: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({
  code,
  width = '100%',
  height = 400,
  className = '',
  onError,
  onSuccess,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const executeChartCode = () => {
      if (!chartRef.current || !window.google) return;

      // Clear previous chart
      chartRef.current.innerHTML = '';

      try {
        // Create a function that has access to the chart container
        const chartFunction = new Function(
          'google',
          'container',
          'console',
          code
        );

        // Execute the code with the necessary context
        chartFunction(window.google, chartRef.current, console);
        onSuccess?.();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error executing chart code:', error);
        onError?.(errorMessage);
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
  }, [code, onError, onSuccess]);

  return (
    <div
      ref={chartRef}
      className={`chart-renderer ${className}`}
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        border: '1px solid #eee',
        borderRadius: '4px'
      }}
    >
      <div style={{ color: '#999' }}>Loading chart...</div>
    </div>
  );
};

export default ChartRenderer;
