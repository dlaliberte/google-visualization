import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useColorMode } from '@docusaurus/theme-common';

interface CodeBlockProps {
  /** The code string to display */
  code: string;
  /** Programming language for syntax highlighting (default: 'javascript') */
  language?: string;
  /** Show line numbers (default: true) */
  showLineNumbers?: boolean;
  /** Show copy button (default: true) */
  showCopyButton?: boolean;
  /** Title for the code block */
  title?: string;
  /** Additional CSS class name */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Highlight specific lines (e.g., [1, 3, 5] or "1,3,5") */
  highlightLines?: number[] | string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
  showCopyButton = true,
  title,
  className = '',
  style = {},
  highlightLines = [],
}) => {
  const [copied, setCopied] = useState(false);
  const { colorMode } = useColorMode();

  // Parse highlight lines if provided as string
  const parseHighlightLines = (lines: number[] | string): number[] => {
    if (Array.isArray(lines)) return lines;
    if (typeof lines === 'string') {
      return lines.split(',').map(line => parseInt(line.trim(), 10)).filter(n => !isNaN(n));
    }
    return [];
  };

  const highlightLinesArray = parseHighlightLines(highlightLines);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const theme = colorMode === 'dark' ? themes.vsDark : themes.github;

  return (
    <div
      className={`code-block-container ${className}`}
      style={{
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '6px',
        overflow: 'hidden',
        marginBottom: '1rem',
        ...style
      }}
    >
      {/* Header with title and copy button */}
      {(title || showCopyButton) && (
        <div
          style={{
            backgroundColor: 'var(--ifm-color-emphasis-100)',
            padding: '8px 16px',
            borderBottom: '1px solid var(--ifm-color-emphasis-300)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '14px',
          }}
        >
          {title && (
            <span style={{ fontWeight: 600, color: 'var(--ifm-color-content)' }}>
              {title}
            </span>
          )}
          {showCopyButton && (
            <button
              onClick={copyToClipboard}
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                backgroundColor: copied ? 'var(--ifm-color-success)' : 'var(--ifm-color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                fontWeight: 500,
              }}
              title="Copy code to clipboard"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}

      {/* Code content */}
      <Highlight theme={theme} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              margin: 0,
              padding: '16px',
              overflow: 'auto',
              fontSize: '14px',
              lineHeight: '1.5',
            }}
          >
            {tokens.map((line, i) => {
              const lineNumber = i + 1;
              const isHighlighted = highlightLinesArray.includes(lineNumber);

              return (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  style={{
                    display: 'flex',
                    backgroundColor: isHighlighted
                      ? 'var(--ifm-color-primary-lightest)'
                      : 'transparent',
                    margin: '0 -16px',
                    padding: '0 16px',
                    ...(isHighlighted && {
                      borderLeft: '3px solid var(--ifm-color-primary)',
                      paddingLeft: '13px',
                    }),
                  }}
                >
                  {showLineNumbers && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '3em',
                        textAlign: 'right',
                        marginRight: '16px',
                        color: 'var(--ifm-color-content-secondary)',
                        fontSize: '12px',
                        userSelect: 'none',
                        flexShrink: 0,
                      }}
                    >
                      {lineNumber}
                    </span>
                  )}
                  <span style={{ flex: 1 }}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
