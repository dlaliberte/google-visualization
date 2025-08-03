---
sidebar_position: 99
title: CodeBlock Component Examples
---

import CodeBlock from '@site/src/components/CodeBlock';

# CodeBlock Component Examples

The `CodeBlock` component provides a convenient way to display JavaScript/TypeScript code with syntax highlighting, line numbers, and copy functionality.

## Basic Usage

<CodeBlock
  code={`const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7]
]);

const options = {
  title: 'My Daily Activities'
};

const chart = new google.visualization.PieChart(document.getElementById('piechart'));
chart.draw(data, options);`}
/>

## With Title

<CodeBlock
  title="Creating a Line Chart"
  code={`const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', 'Expenses'],
  ['2019', 1000, 400],
  ['2020', 1170, 460],
  ['2021', 660, 1120],
  ['2022', 1030, 540]
]);

const options = {
  title: 'Company Performance',
  curveType: 'function',
  legend: { position: 'bottom' }
};

const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
chart.draw(data, options);`}
/>

## TypeScript Example

<CodeBlock
  title="TypeScript Chart Configuration"
  language="typescript"
  code={`interface ChartOptions {
  title: string;
  width: number;
  height: number;
  colors?: string[];
}

interface DataRow {
  label: string;
  value: number;
}

class ChartManager {
  private options: ChartOptions;
  private data: DataRow[];

  constructor(options: ChartOptions, data: DataRow[]) {
    this.options = options;
    this.data = data;
  }

  public render(elementId: string): void {
    const dataTable = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ...this.data.map(row => [row.label, row.value])
    ]);

    const chart = new google.visualization.PieChart(
      document.getElementById(elementId)
    );

    chart.draw(dataTable, this.options);
  }
}`}
/>

## With Line Highlighting

<CodeBlock
  title="Responsive Chart with Highlighted Lines"
  code={`function createResponsiveChart() {
  const data = google.visualization.arrayToDataTable([
    ['Month', 'Sales'],
    ['Jan', 1000],
    ['Feb', 1170],
    ['Mar', 660],
    ['Apr', 1030]
  ]);

  const options = {
    title: 'Monthly Sales',
    width: '100%',
    height: 400,
    responsive: true
  };

  const chart = new google.visualization.LineChart(
    document.getElementById('responsive_chart')
  );

  chart.draw(data, options);

  // Auto-resize on window resize
  window.addEventListener('resize', () => {
    chart.draw(data, options);
  });
}`}
  highlightLines={[10, 11, 12, 22, 23, 24]}
/>

## Without Line Numbers

<CodeBlock
  title="Simple Configuration Object"
  showLineNumbers={false}
  code={`const simpleOptions = {
  title: 'Simple Chart',
  legend: 'none',
  colors: ['#e0440e']
};`}
/>

## Without Copy Button

<CodeBlock
  title="Read-Only Code Example"
  showCopyButton={false}
  code={`// This code block cannot be copied
const readOnlyExample = {
  message: 'This is for display only'
};`}
/>

## Component Props

The `CodeBlock` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | **required** | The code string to display |
| `language` | `string` | `'javascript'` | Programming language for syntax highlighting |
| `showLineNumbers` | `boolean` | `true` | Show line numbers |
| `showCopyButton` | `boolean` | `true` | Show copy button |
| `title` | `string` | `undefined` | Title for the code block |
| `className` | `string` | `''` | Additional CSS class name |
| `style` | `React.CSSProperties` | `{}` | Custom style object |
| `highlightLines` | `number[] \| string` | `[]` | Highlight specific lines (e.g., [1, 3, 5] or "1,3,5") |

## Supported Languages

The component supports all languages supported by Prism.js, including:

- `javascript` / `js`
- `typescript` / `ts`
- `json`
- `html`
- `css`
- `python`
- `java`
- `c`
- `cpp`
- `csharp`
- And many more...
