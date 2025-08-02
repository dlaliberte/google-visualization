import React, { useState } from 'react';
import {
  ChartRenderer,
  CodeEditor,
  ErrorDisplay,
  GoogleChartsLoader,
  LiveChartEditorComposed,
  GoogleChartCodeComposed
} from './index';

const CompositionExamples: React.FC = () => {
  const [customCode, setCustomCode] = useState(`
var data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work',     11],
  ['Eat',      2],
  ['Commute',  2],
  ['Watch TV', 2],
  ['Sleep',    7]
]);

var options = {
  title: 'My Daily Activities'
};

var chart = new google.visualization.PieChart(container);
chart.draw(data, options);
  `.trim());

  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Google Charts Component Composition Examples</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>1. Full Live Chart Editor (Composed)</h2>
        <p>Complete editor with all features using composed components:</p>
        <LiveChartEditorComposed />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>2. Simple Chart Display (Composed)</h2>
        <p>Just display a chart from code without editor:</p>
        <GoogleChartCodeComposed
          code={`
            var data = google.visualization.arrayToDataTable([
              ['Year', 'Sales', 'Expenses'],
              ['2004',  1000,      400],
              ['2005',  1170,      460],
              ['2006',  660,       1120],
              ['2007',  1030,      540]
            ]);

            var options = {
              title: 'Company Performance',
              curveType: 'function',
              legend: { position: 'bottom' }
            };

            var chart = new google.visualization.LineChart(container);
            chart.draw(data, options);
          `}
          height={300}
        />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>3. Custom Composition - Separate Editor and Chart</h2>
        <p>Build your own layout using individual components:</p>

        <GoogleChartsLoader packages={['corechart']}>
          {(isLoaded) => (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h3>Code Editor</h3>
                <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
                  <CodeEditor
                    value={customCode}
                    onChange={setCustomCode}
                    height={300}
                    placeholder="Enter your chart code..."
                  />
                </div>
              </div>

              <div>
                <h3>Chart Output</h3>
                <ErrorDisplay error={error} />
                {isLoaded ? (
                  <ChartRenderer
                    code={customCode}
                    height={300}
                    onError={setError}
                    onSuccess={() => setError(null)}
                  />
                ) : (
                  <div style={{
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #eee',
                    borderRadius: '4px'
                  }}>
                    Loading Google Charts...
                  </div>
                )}
              </div>
            </div>
          )}
        </GoogleChartsLoader>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>4. Read-Only Code Display with Chart</h2>
        <p>Show code and chart side by side (read-only):</p>

        <GoogleChartsLoader packages={['corechart']}>
          {(isLoaded) => {
            const readOnlyCode = `
var data = google.visualization.arrayToDataTable([
  ['Element', 'Density', { role: 'style' }],
  ['Copper', 8.94, '#b87333'],
  ['Silver', 10.49, 'silver'],
  ['Gold', 19.30, 'gold'],
  ['Platinum', 21.45, 'color: #e5e4e2']
]);

var options = {
  title: "Density of Precious Metals, in g/cm^3",
  width: 600,
  height: 400,
  bar: {groupWidth: "95%"},
  legend: { position: "none" },
};

var chart = new google.visualization.ColumnChart(container);
chart.draw(data, options);
            `.trim();

            return (
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <h4>Code:</h4>
                  <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
                    <CodeEditor
                      value={readOnlyCode}
                      onChange={() => {}} // No-op for read-only
                      height={250}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h4>Result:</h4>
                  {isLoaded && (
                    <ChartRenderer
                      code={readOnlyCode}
                      height={250}
                    />
                  )}
                </div>
              </div>
            );
          }}
        </GoogleChartsLoader>
      </section>
    </div>
  );
};

export default CompositionExamples;
