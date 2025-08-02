import React, { useState, useEffect, useRef } from 'react';

interface LiveChartEditorProps {
  initialCode?: string;
  height?: number;
  showEditor?: boolean;
}

const LiveChartEditor: React.FC<LiveChartEditorProps> = ({
  initialCode = `// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1],
    ['Zucchini', 1],
    ['Pepperoni', 2]
  ]);

  // Set chart options
  var options = {
    'title': 'How Much Pizza I Ate Last Night',
    'width': 400,
    'height': 300
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(container);
  chart.draw(data, options);
}`,
  height = 400,
  showEditor = true,
}) => {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const executeCode = () => {
    if (!chartRef.current || !window.google) return;

    setError(null);
    chartRef.current.innerHTML = ''; // Clear previous chart

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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      if (chartRef.current) {
        chartRef.current.innerHTML = `
          <div style="color: red; padding: 20px; border: 1px solid red; border-radius: 4px; background-color: #fee;">
            <strong>Error:</strong> ${errorMessage}
          </div>
        `;
      }
    }
  };

  useEffect(() => {
    // Check if Google Charts is already loaded
    if (window.google && window.google.charts) {
      executeCode();
    } else {
      // Wait for Google Charts to load
      const checkGoogleCharts = setInterval(() => {
        if (window.google && window.google.charts) {
          clearInterval(checkGoogleCharts);
          executeCode();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkGoogleCharts), 10000);
    }
  }, [code]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      {showEditor && (
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '8px 12px',
            fontSize: '14px',
            fontWeight: 'bold',
            borderBottom: '1px solid #ddd'
          }}>
            Live Chart Editor
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              height: '200px',
              padding: '12px',
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              fontSize: '13px',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              backgroundColor: '#fafafa',
            }}
            placeholder="Enter your Google Charts JavaScript code here..."
          />
          <div style={{
            padding: '8px 12px',
            backgroundColor: '#f0f0f0',
            borderTop: '1px solid #ddd',
            fontSize: '12px',
            color: '#666'
          }}>
            💡 Tip: Use <code>container</code> instead of <code>document.getElementById('myChart')</code>
          </div>
        </div>
      )}

      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>
          Chart Output:
        </div>
        <div
          ref={chartRef}
          style={{
            minHeight: height,
            border: '1px solid #eee',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa'
          }}
        >
          <div style={{ color: '#999' }}>Loading chart...</div>
        </div>
      </div>
    </div>
  );
};

export default LiveChartEditor;
