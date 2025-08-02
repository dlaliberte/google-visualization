---
sidebar_position: 4
title: Data Types and Formatting
---

# Data Types and Formatting

Understanding data types is crucial for working with Google Charts. Each column in a DataTable has a specific data type that determines how the data is interpreted and displayed.

## Supported Data Types

### string
Text data. This is the default type if none is specified.

```javascript
data.addColumn('string', 'Product Name');
data.addRow(['iPhone 15']);
```

**Use cases:**
- Labels, categories, names
- Text annotations
- IDs that shouldn't be treated as numbers

### number
Numeric data including integers and floating-point numbers.

```javascript
data.addColumn('number', 'Price');
data.addRow([999.99]);
```

**Use cases:**
- Measurements, quantities, prices
- Chart values for most chart types
- Calculations and aggregations

### boolean
True/false values.

```javascript
data.addColumn('boolean', 'In Stock');
data.addRow([true]);
```

**Use cases:**
- Yes/no indicators
- Feature flags
- Conditional formatting

### date
Date values (year, month, day only).

```javascript
data.addColumn('date', 'Launch Date');
data.addRow([new Date(2023, 8, 12)]); // September 12, 2023
```

**Use cases:**
- Timeline charts
- Date-based filtering
- Historical data analysis

### datetime
Date and time values with full precision.

```javascript
data.addColumn('datetime', 'Timestamp');
data.addRow([new Date(2023, 8, 12, 14, 30, 0)]); // Sep 12, 2023 2:30 PM
```

**Use cases:**
- Precise time tracking
- Real-time data
- Event logging

### timeofday
Time of day as an array of numbers [hours, minutes, seconds, milliseconds].

```javascript
data.addColumn('timeofday', 'Meeting Time');
data.addRow([[14, 30, 0, 0]]); // 2:30 PM
```

**Use cases:**
- Daily schedules
- Time-based patterns
- Duration calculations

## Working with Different Data Types

### String Data

```javascript
const data = new google.visualization.DataTable();
data.addColumn('string', 'Category');
data.addColumn('string', 'Description');

data.addRows([
  ['Electronics', 'Consumer electronics and gadgets'],
  ['Books', 'Fiction and non-fiction literature'],
  ['Clothing', 'Apparel and accessories']
]);
```

### Numeric Data

```javascript
const data = new google.visualization.DataTable();
data.addColumn('string', 'Product');
data.addColumn('number', 'Price');
data.addColumn('number', 'Quantity');
data.addColumn('number', 'Revenue');

data.addRows([
  ['Laptop', 1299.99, 50, 64999.50],
  ['Mouse', 29.99, 200, 5998.00],
  ['Keyboard', 79.99, 100, 7999.00]
]);
```

### Date and Time Data

```javascript
const data = new google.visualization.DataTable();
data.addColumn('date', 'Date');
data.addColumn('datetime', 'Timestamp');
data.addColumn('timeofday', 'Time');

data.addRows([
  [new Date(2023, 0, 1), new Date(2023, 0, 1, 9, 30), [9, 30, 0]],
  [new Date(2023, 0, 2), new Date(2023, 0, 2, 14, 15), [14, 15, 0]],
  [new Date(2023, 0, 3), new Date(2023, 0, 3, 16, 45), [16, 45, 0]]
]);
```

### Boolean Data

```javascript
const data = new google.visualization.DataTable();
data.addColumn('string', 'Feature');
data.addColumn('boolean', 'Available');
data.addColumn('boolean', 'Premium Only');

data.addRows([
  ['Dark Mode', true, false],
  ['Advanced Analytics', true, true],
  ['Custom Themes', false, true]
]);
```

## Cell Formatting

Each cell can have three components:
- **v** (value): The actual data value
- **f** (formatted): How the value should be displayed
- **p** (properties): Additional metadata

### Basic Formatting

```javascript
data.addRow([
  'Q1 Sales',
  {
    v: 1234567.89,           // Actual value
    f: '$1.23M'              // Displayed value
  }
]);
```

### Advanced Cell Properties

```javascript
data.addRow([
  'Important Metric',
  {
    v: 95.5,
    f: '95.5%',
    p: {
      style: 'color: green; font-weight: bold;',
      className: 'highlight-cell',
      customData: 'exceeds-target'
    }
  }
]);
```

## Data Type Conversion

### Automatic Conversion

Google Charts automatically converts compatible types:

```javascript
// These are equivalent for number columns
data.addRow([42]);        // number
data.addRow(['42']);      // string that looks like number
data.addRow([{v: 42}]);   // cell object
```

### Manual Conversion

```javascript
// Convert string to number
const stringValue = '123.45';
const numberValue = parseFloat(stringValue);
data.addRow([numberValue]);

// Convert date string to Date object
const dateString = '2023-09-12';
const dateValue = new Date(dateString);
data.addRow([dateValue]);
```

## Formatting Patterns

### Number Patterns

Use patterns to control how numbers are displayed:

```javascript
data.addColumn({
  type: 'number',
  label: 'Price',
  pattern: '$#,###.##'
});

data.addColumn({
  type: 'number',
  label: 'Percentage',
  pattern: '#.##%'
});
```

### Date Patterns

```javascript
data.addColumn({
  type: 'date',
  label: 'Date',
  pattern: 'MMM dd, yyyy'
});
```

## Using Formatters

For more advanced formatting, use formatter objects:

### Number Formatter

```javascript
const formatter = new google.visualization.NumberFormat({
  prefix: '$',
  suffix: ' USD',
  negativeColor: 'red',
  negativeParens: true,
  fractionDigits: 2
});

formatter.format(data, 1); // Format column 1
```

### Date Formatter

```javascript
const formatter = new google.visualization.DateFormat({
  pattern: 'MMM dd, yyyy'
});

formatter.format(data, 0); // Format column 0
```

### Percentage Formatter

```javascript
const formatter = new google.visualization.NumberFormat({
  suffix: '%',
  fractionDigits: 1
});

formatter.format(data, 2); // Format column 2
```

## Data Validation

### Type Checking

```javascript
function validateDataTypes(data) {
  const numRows = data.getNumberOfRows();
  const numCols = data.getNumberOfColumns();

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const value = data.getValue(row, col);
      const type = data.getColumnType(col);

      if (!isValidType(value, type)) {
        console.warn(`Invalid value at row ${row}, col ${col}: ${value} (expected ${type})`);
      }
    }
  }
}

function isValidType(value, expectedType) {
  if (value === null) return true; // null is valid for any type

  switch (expectedType) {
    case 'string': return typeof value === 'string';
    case 'number': return typeof value === 'number';
    case 'boolean': return typeof value === 'boolean';
    case 'date':
    case 'datetime': return value instanceof Date;
    case 'timeofday': return Array.isArray(value) && value.length >= 3;
    default: return true;
  }
}
```

## Best Practices

### Choose the Right Type

```javascript
// Good - use appropriate types
data.addColumn('date', 'Date');        // For dates
data.addColumn('number', 'Revenue');   // For numeric calculations
data.addColumn('string', 'Category');  // For labels

// Avoid - using wrong types
data.addColumn('string', 'Date');      // Dates as strings
data.addColumn('string', 'Revenue');   // Numbers as strings
```

### Consistent Formatting

```javascript
// Good - consistent date format
data.addRows([
  [new Date(2023, 0, 1), 100],
  [new Date(2023, 0, 2), 150],
  [new Date(2023, 0, 3), 200]
]);

// Avoid - mixed formats
data.addRows([
  [new Date(2023, 0, 1), 100],
  ['2023-01-02', 150],           // String instead of Date
  [new Date(2023, 0, 3), 200]
]);
```

### Handle Null Values

```javascript
// Explicitly handle missing data
data.addRows([
  ['Product A', 100],
  ['Product B', null],  // Missing value
  ['Product C', 200]
]);
```

## Common Pitfalls

### Date Constructor Issues

```javascript
// Wrong - months are 0-indexed
new Date(2023, 12, 1); // This is January 1, 2024!

// Correct
new Date(2023, 11, 1); // December 1, 2023
new Date('2023-12-01'); // December 1, 2023
```

### Number Precision

```javascript
// Be aware of floating-point precision
const value = 0.1 + 0.2; // 0.30000000000000004

// Round when necessary
const rounded = Math.round(value * 100) / 100; // 0.3
```

### String vs Number

```javascript
// These behave differently in calculations
data.addRow(['10']);  // String - won't sum properly
data.addRow([10]);    // Number - will sum correctly
```

## Next Steps

- Learn about [DataView](./dataview.md) for data transformation
- Explore [Chart Integration](./chart-integration.md) for using formatted data in charts
- See [Advanced Formatting](./advanced-formatting.md) for complex formatting scenarios
