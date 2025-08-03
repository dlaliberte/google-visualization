import React, { useState, useRef, useEffect } from 'react';
import { GoogleChartsLoader } from './index';

const CompositionExamples: React.FC = () => {
  const [liveCode, setLiveCode] = useState(`
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

  // Helper function to execute chart code
  const executeChartCode = (code: string, container: HTMLElement) => {
    try {
      container.innerHTML = '';
      const chartFunction = new Function('google', 'container', 'console', code);
      chartFunction(window.google, container, console);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      container.innerHTML = `<div style="color: red; padding: 20px;">Error: ${errorMessage}</div>`;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>GoogleChartsLoader - One Component, Many Uses</h1>
      <p>All examples below use only the <code>GoogleChartsLoader</code> component as the foundation.</p>

      <section style={{ marginBottom: '40px' }}>
        <h2>1. Simple Static Chart</h2>
        <p>Load Google Charts and display a predefined chart:</p>

        <GoogleChartsLoader packages={['corechart']}>
          {(isLoaded) => {
            const chartRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
              if (isLoaded && chartRef.current) {
                const code = `
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
                `;
                executeChartCode(code, chartRef.current);
              }
            }, [isLoaded]);

            return (
              <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '20px' }}>
                {isLoaded ? (
                  <div ref={chartRef} style={{ height: '300px' }} />
                ) : (
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                    Loading Google Charts...
                  </div>
                )}
              </div>
            );
          }}
        </GoogleChartsLoader>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>2. Live Chart Editor</h2>
        <p>Interactive editor with real-time chart updates:</p>

        <GoogleChartsLoader packages={['corechart']}>
          {(isLoaded) => {
            const chartRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
              if (isLoaded && chartRef.current) {
                executeChartCode(liveCode, chartRef.current);
              }
            }, [isLoaded, liveCode]);

            return (
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#f5f5f5', padding: '8px 12px', borderBottom: '1px solid #ddd' }}>
                  <strong>Live Chart Editor</strong> {!isLoaded && '(Loading Google Charts...)'}
                </div>

                <textarea
                  value={liveCode}
                  onChange={(e) => setLiveCode(e.target.value)}
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

                <div style={{ padding: '8px 12px', backgroundColor: '#f0f0f0', borderTop: '1px solid #ddd', fontSize: '12px', color: '#666' }}>
                  💡 Tip: Use <code>container</code> instead of <code>document.getElementById('myChart')</code>
                </div>

                <div style={{ padding: '20px' }}>
                  {error && (
                    <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '4px', backgroundColor: '#fee', marginBottom: '10px' }}>
                      <strong>Error:</strong> {error}
                    </div>
                  )}

                  {isLoaded ? (
                    <div ref={chartRef} style={{ height: '400px' }} />
                  ) : (
                    <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', border: '1px solid #eee', borderRadius: '4px' }}>
                      <div style={{ color: '#999' }}>Loading Google Charts...</div>
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        </GoogleChartsLoader>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>3. Multiple Chart Types</h2>
        <p>Load multiple packages and display different chart types:</p>

        <GoogleChartsLoader packages={['corechart', 'geochart', 'table']}>
          {(isLoaded) => {
            const pieRef = useRef<HTMLDivElement>(null);
            const geoRef = useRef<HTMLDivElement>(null);
            const tableRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
              if (!isLoaded) return;

              // Pie Chart
              if (pieRef.current) {
                const pieCode = `
                  var data = google.visualization.arrayToDataTable([
                    ['Browser', 'Usage'],
                    ['Chrome', 65],
                    ['Firefox', 15],
                    ['Safari', 10],
                    ['Edge', 7],
                    ['Other', 3]
                  ]);
                  var chart = new google.visualization.PieChart(container);
                  chart.draw(data, {title: 'Browser Usage'});
                `;
                executeChartCode(pieCode, pieRef.current);
              }

              // Geo Chart
              if (geoRef.current) {
                const geoCode = `
                  var data = google.visualization.arrayToDataTable([
                    ['Country', 'Population'],
                    ['China', 1439323776],
                    ['India', 1380004385],
                    ['United States', 331002651],
                    ['Indonesia', 273523615],
                    ['Brazil', 212559417]
                  ]);
                  var chart = new google.visualization.GeoChart(container);
                  chart.draw(data, {});
                `;
                executeChartCode(geoCode, geoRef.current);
              }

              // Table
              if (tableRef.current) {
                const tableCode = `
                  var data = google.visualization.arrayToDataTable([
                    ['Name', 'Salary', 'Full Time Employee'],
                    ['Mike',  {v: 10000, f: '$10,000'}, true],
                    ['Jim',   {v:8000,   f: '$8,000'},  false],
                    ['Alice', {v: 12500, f: '$12,500'}, true],
                    ['Bob',   {v: 7000,  f: '$7,000'},  true]
                  ]);
                  var chart = new google.visualization.Table(container);
                  chart.draw(data, {width: '100%', height: '100%'});
                `;
                executeChartCode(tableCode, tableRef.current);
              }
            }, [isLoaded]);

            return (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '15px' }}>
                  <h4>Pie Chart</h4>
                  {isLoaded ? (
                    <div ref={pieRef} style={{ height: '250px' }} />
                  ) : (
                    <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                      Loading...
                    </div>
                  )}
                </div>

                <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '15px' }}>
                  <h4>Geo Chart</h4>
                  {isLoaded ? (
                    <div ref={geoRef} style={{ height: '250px' }} />
                  ) : (
                    <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                      Loading...
                    </div>
                  )}
                </div>

                <div style={{ gridColumn: '1 / -1', border: '1px solid #ddd', borderRadius: '4px', padding: '15px' }}>
                  <h4>Data Table</h4>
                  {isLoaded ? (
                    <div ref={tableRef} style={{ height: '200px' }} />
                  ) : (
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                      Loading...
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        </GoogleChartsLoader>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>4. Code Display with Chart</h2>
        <p>Show code and chart side by side:</p>

        <GoogleChartsLoader packages={['corechart']}>
          {(isLoaded) => {
            const chartRef = useRef<HTMLDivElement>(null);
            const displayCode = `
var data = google.visualization.arrayToDataTable([
  ['Element', 'Density', { role: 'style' }],
  ['Copper', 8.94, '#b87333'],
  ['Silver', 10.49, 'silver'],
  ['Gold', 19.30, 'gold'],
  ['Platinum', 21.45, 'color: #e5e4e2']
]);

var options = {
  title: "Density of Precious Metals, in g/cm^3",
  bar: {groupWidth: "95%"},
  legend: { position: "none" },
};

var chart = new google.visualization.ColumnChart(container);
chart.draw(data, options);
            `.trim();

            useEffect(() => {
              if (isLoaded && chartRef.current) {
                executeChartCode(displayCode, chartRef.current);
              }
            }, [isLoaded]);

            return (
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <h4>Code:</h4>
                  <textarea
                    value={displayCode}
                    readOnly
                    style={{
                      width: '100%',
                      height: '300px',
                      padding: '12px',
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      fontSize: '13px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: '#f5f5f5',
                      resize: 'none'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h4>Result:</h4>
                  {isLoaded ? (
                    <div ref={chartRef} style={{ height: '300px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '4px', color: '#999' }}>
                      Loading Google Charts...
                    </div>
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
