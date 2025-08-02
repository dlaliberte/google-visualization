import React, { useRef } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  readOnly?: boolean;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter your code here...",
  height = 200,
  readOnly = false,
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      readOnly={readOnly}
      className={`code-editor ${className}`}
      style={{
        width: '100%',
        height: `${height}px`,
        padding: '12px',
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        fontSize: '13px',
        border: 'none',
        outline: 'none',
        resize: 'vertical',
        backgroundColor: readOnly ? '#f5f5f5' : '#fafafa',
      }}
      placeholder={placeholder}
    />
  );
};

export default CodeEditor;
