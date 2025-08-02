import React, { useState } from 'react';
import ChartRenderer from './ChartRenderer';
import CodeEditor from './CodeEditor';
import ErrorDisplay from './ErrorDisplay';
import GoogleChartsLoader from './GoogleChartsLoader';

interface LiveChartEditorComposedProps {
  initialCode?: string;
  height?: number;
  showEditor?: boolean;
  editorHeight?: number;
  packages?: string[];
}

const LiveChartEditorComposed: React.FC<LiveChartEditorComposedProps> = ({
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
  editorHeight = 200,
  packages = ['corechart'],
}) => {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleSuccess = () => {
    setError(null);
  };

  return (
    <GoogleChartsLoader packages={packages}>
      {(isLoaded) => (
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
                Live Chart Editor {!isLoaded && '(Loading Google Charts...)'}
              </div>

              <CodeEditor
                value={code}
                onChange={setCode}
                height={editorHeight}
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

            <ErrorDisplay error={error} />

            {isLoaded ? (
              <ChartRenderer
                code={code}
                height={height}
                onError={handleError}
                onSuccess={handleSuccess}
              />
            ) : (
              <div style={{
                minHeight: height,
                border: '1px solid #eee',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ color: '#999' }}>Loading Google Charts...</div>
              </div>
            )}
          </div>
        </div>
      )}
    </GoogleChartsLoader>
  );
};

export default LiveChartEditorComposed;
