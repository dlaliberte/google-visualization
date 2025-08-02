import React from 'react';
import GoogleChart from './GoogleChart';

const PieChartExample: React.FC = () => {
  const data = [
    ['Task', 'Hours per Day'],
    ['Work', 8],
    ['Eat', 2],
    ['Commute', 1],
    ['Watch TV', 3],
    ['Sleep', 8]
  ];

  const options = {
    title: 'My Daily Activities',
    width: 400,
    height: 300,
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <GoogleChart
        chartType="PieChart"
        data={data}
        options={options}
        width={400}
        height={300}
      />
    </div>
  );
};

export default PieChartExample;
