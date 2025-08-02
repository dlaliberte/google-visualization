import React, { useState } from 'react';
import ChartRenderer from './ChartRenderer';
import ErrorDisplay from './ErrorDisplay';
import GoogleChartsLoader from './GoogleChartsLoader';

interface GoogleChartCodeComposedProps {
  code: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  packages?: string[];
  showErrors?: boolean;
}

const GoogleChartCodeComposed: React.FC<GoogleChartCodeComposedProps> = ({
  code,
  width = '100%',
  height = 400,
  className = '',
  packages = ['corechart'],
  showErrors = true,
}) => {
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
        <div className={`google-chart-code-composed ${className}`}>
          {showErrors && <ErrorDisplay error={error} />}

          {isLoaded ? (
            <ChartRenderer
              code={code}
              width={width}
              height={height}
              onError={handleError}
              onSuccess={handleSuccess}
            />
          ) : (
            <div style={{
              width,
              height,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fafafa',
              border: '1px solid #eee',
              borderRadius: '4px'
            }}>
              <div style={{ color: '#999' }}>Loading Google Charts...</div>
            </div>
          )}
        </div>
      )}
    </GoogleChartsLoader>
  );
};

export default GoogleChartCodeComposed;
