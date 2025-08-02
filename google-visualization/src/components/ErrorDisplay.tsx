import React from 'react';

interface ErrorDisplayProps {
  error: string | null;
  className?: string;
  style?: React.CSSProperties;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  className = '',
  style = {},
}) => {
  if (!error) return null;

  return (
    <div
      className={`error-display ${className}`}
      style={{
        color: 'red',
        padding: '20px',
        border: '1px solid red',
        borderRadius: '4px',
        backgroundColor: '#fee',
        margin: '10px 0',
        ...style
      }}
    >
      <strong>Error:</strong> {error}
    </div>
  );
};

export default ErrorDisplay;
