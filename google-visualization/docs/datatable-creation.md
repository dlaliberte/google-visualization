---
sidebar_position: 3
title: Creating DataTables
---

# Creating DataTables

There are several ways to create and populate a `google.visualization.DataTable`. This guide covers all the methods you can use to get data into your charts.

## Method 1: Create Empty and Add Data

The most common approach is to create an empty DataTable and then add columns and rows:

```javascript
// Create an empty DataTable
const data = new google.visualization.DataTable();

// Add columns (specify type and optional label)
data.addColumn('string', 'Country');
data.addColumn('number', 'Population');
data.addColumn('number', 'Area');

// Add rows one at a time
data.addRow(['China', 1439323776, 9596961]);
data.addRow(['India', 1380004385, 3287263]);
data.addRow(['United States', 331002651, 9833517]);

// Or add multiple rows at once
data.addRows([
  ['Indonesia', 273523615, 1904569],
  ['Pakistan', 220892340, 881913]
]);
```

## Method 2: Initialize with Data Object

You can create a DataTable with initial data by passing a data object to the constructor:

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'country', label: 'Country', type: 'string'},
    {id: 'population', label: 'Population', type: 'number'},
    {id: 'area', label: 'Area (km²)', type: 'number'}
  ],
  rows: [
    {c: [{v: 'China'}, {v: 1439323776}, {v: 9596961}]},
    {c: [{v: 'India'}, {v: 1380004385}, {v: 3287263}]},
    {c: [{v: 'United States'}, {v: 331002651}, {v: 9833517}]}
  ]
});
```

## Method 3: Using arrayToDataTable()

The simplest method for creating a DataTable from a 2D array:

```javascript
const data = google.visualization.arrayToDataTable([
  ['Country', 'Population', 'Area (km²)'],
  ['China', 1439323776, 9596961],
  ['India', 1380004385, 3287263],
  ['United States', 331002651, 9833517],
  ['Indonesia', 273523615, 1904569],
  ['Pakistan', 220892340, 881913]
]);
```

### Without Headers

If your array doesn't include headers, set the second parameter to `true`:

```javascript
const data = google.visualization.arrayToDataTable([
  ['China', 1439323776, 9596961],
  ['India', 1380004385, 3287263],
  ['United States', 331002651, 9833517]
], true); // true means no headers in first row

// You'll need to set column labels manually
data.setColumnLabel(0, 'Country');
data.setColumnLabel(1, 'Population');
data.setColumnLabel(2, 'Area (km²)');
```

## Method 4: From JSON String

You can create a DataTable from a JSON string representation:

```javascript
const jsonString = `{
  "cols": [
    {"id": "country", "label": "Country", "type": "string"},
    {"id": "population", "label": "Population", "type": "number"}
  ],
  "rows": [
    {"c": [{"v": "China"}, {"v": 1439323776}]},
    {"c": [{"v": "India"}, {"v": 1380004385}]}
  ]
}`;

const data = new google.visualization.DataTable(jsonString);
```

## Adding Columns

### Basic Column Addition

```javascript
// Add a simple column
data.addColumn('number', 'Sales');

// Add column with ID
data.addColumn('string', 'Product Name', 'product_id');
```

### Column Specification Object

For more control, use a column specification object:

```javascript
data.addColumn({
  type: 'number',
  label: 'Revenue',
  id: 'revenue',
  role: 'data',
  pattern: '#,###'
});
```

### Column Properties

Columns can have additional properties:

```javascript
data.addColumn({
  type: 'number',
  label: 'Sales',
  id: 'sales',
  p: {
    style: 'color: blue;',
    customProperty: 'myValue'
  }
});
```

## Adding Rows

### Single Row

```javascript
// Simple values
data.addRow(['Product A', 100, 1500]);

// With formatted values and properties
data.addRow([
  'Product A',
  {v: 100, f: '100 units'},
  {v: 1500, f: '$1,500', p: {style: 'color: green;'}}
]);
```

### Multiple Rows

```javascript
// Add multiple rows at once
data.addRows([
  ['Product A', 100, 1500],
  ['Product B', 200, 2500],
  ['Product C', 150, 1800]
]);

// Add empty rows (will be filled with null values)
data.addRows(5); // Adds 5 empty rows
```

## Cell Format

Each cell can contain:
- **v**: The actual value
- **f**: Formatted string representation
- **p**: Properties object

```javascript
data.addRow([
  'Q1 2023',
  {
    v: 1234567.89,
    f: '$1.23M',
    p: {
      style: 'color: green; font-weight: bold;',
      note: 'Record quarter'
    }
  }
]);
```

## Best Practices

### Performance Tips

1. **Use `addRows()` instead of multiple `addRow()` calls**:
   ```javascript
   // Good - single call
   data.addRows([
     ['A', 1], ['B', 2], ['C', 3]
   ]);

   // Avoid - multiple calls
   data.addRow(['A', 1]);
   data.addRow(['B', 2]);
   data.addRow(['C', 3]);
   ```

2. **Use `arrayToDataTable()` for simple data**:
   ```javascript
   // Fastest for simple 2D arrays
   const data = google.visualization.arrayToDataTable(myArray);
   ```

### Data Validation

Always ensure your data matches the column types:

```javascript
data.addColumn('number', 'Value');
data.addColumn('date', 'Date');

// Good
data.addRow([123, new Date('2023-01-01')]);

// Bad - will cause errors
data.addRow(['not a number', 'not a date']);
```

### Memory Considerations

For large datasets, consider using DataView to show subsets rather than creating multiple DataTables:

```javascript
// Create one large DataTable
const fullData = new google.visualization.DataTable();
// ... populate with all data

// Create views for different charts
const view1 = new google.visualization.DataView(fullData);
view1.setColumns([0, 1]); // Show only first two columns

const view2 = new google.visualization.DataView(fullData);
view2.setRows([0, 1, 2]); // Show only first three rows
```

## Next Steps

- Learn about [Data Types and Formatting](./datatable-data-types.md)
- Explore [DataView](./dataview.md) for data transformation
- See [Chart Integration](./chart-integration.md) for using DataTables with charts
