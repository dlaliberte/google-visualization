import React, { useEffect, useRef } from 'react';
import { CandlestickChart } from '../../../visualization/corechart/corecharts';

interface GoogleChartProps {
  chartType: string;
  data: any[][];
  options?: any;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const GoogleChart: React.FC<GoogleChartProps> = ({
  chartType,
  data,
  options = {},
  width = '100%',
  height = 400,
  className = '',
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawChart = () => {
      if (!chartRef.current || !window.google) return;

      // Load the visualization API and the corechart package
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(() => {
        const dataTable = window.google.visualization.arrayToDataTable(data);

        // Create chart based on chartType
        let chart;
        switch (chartType) {
          case 'PieChart':
            chart = new window.google.visualization.PieChart(chartRef.current);
            break;
          case 'ColumnChart':
            chart = new window.google.visualization.ColumnChart(chartRef.current);
            break;
          case 'LineChart':
            chart = new window.google.visualization.LineChart(chartRef.current);
            break;
          case 'BarChart':
            chart = new window.google.visualization.BarChart(chartRef.current);
            break;
          case 'AreaChart':
            chart = new window.google.visualization.AreaChart(chartRef.current);
            break;
          case 'Table':
            chart = new window.google.visualization.Table(chartRef.current);
            break;

          default:
            console.error(`Unsupported chart type: ${chartType}`);
            return;
        }

        const finalOptions = {
          width,
          height,
          ...options,
        };

        chart.draw(dataTable, finalOptions);
      });
    };

    // Check if Google Charts is already loaded
    if (window.google && window.google.charts) {
      drawChart();
    } else {
      // Wait for Google Charts to load
      const checkGoogleCharts = setInterval(() => {
        if (window.google && window.google.charts) {
          clearInterval(checkGoogleCharts);
          drawChart();
        }
      }, 100);

      // Cleanup interval after 10 seconds to prevent infinite checking
      setTimeout(() => clearInterval(checkGoogleCharts), 10000);
    }
  }, [chartType, data, options, width, height]);

  return (
    <div
      ref={chartRef}
      className={`google-chart ${className}`}
      style={{ width, height }}
    />
  );
};

// Extend the Window interface to include Google Charts
declare global {
  interface Window {
    google: any;
  }
}

export default GoogleChart;
