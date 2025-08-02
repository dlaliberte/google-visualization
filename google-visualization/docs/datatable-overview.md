---
sidebar_position: 2
title: DataTable Overview
---

# DataTable Overview

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

- **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
- **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
- **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Quick Start Example

Here's a simple example of creating and using a DataTable:

```javascript
// Create a DataTable
const data = new google.visualization.DataTable();

// Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// Add data
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Sleep', 7]
]);

// Use with a chart
const chart = new google.visualization.PieChart(document.getElementById('myChart'));
chart.draw(data, {title: 'My Daily Activities'});
```

## DataTable vs DataView

Understanding when to use each:

### Use DataTable when:
- You need to modify data (add/remove rows or columns)
- You're creating data from scratch
- You need full control over the data structure
- You're building interactive applications that change data

### Use DataView when:
- You want to show different views of the same data
- You need to filter or transform data without modifying the original
- You're creating dashboards with multiple charts from one dataset
- You want to improve performance by avoiding data duplication

## Basic Workflow

1. **Create** a DataTable (empty or with initial data)
2. **Populate** with columns and rows
3. **Pass** to chart's `draw()` method
4. **Modify** as needed for interactivity

## Next Steps

- Learn about [Creating DataTables](./datatable-creation.md) for detailed creation methods
- Explore [Data Types and Formatting](./datatable-data-types.md) for working with different data types
- Discover [DataView](./dataview.md) for advanced data filtering and transformation
