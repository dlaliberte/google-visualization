---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.

---
sidebar_position: 2
title: DataTable and DataView
---

# Using DataTable and DataView

The `google.visualization.DataTable` class is the fundamental data structure used to pass data to all Google Charts. It's a two-dimensional, mutable table of data that provides methods for sorting, modifying, and filtering data. This guide covers how to create and use a `DataTable`.

## What is a DataTable?

A `DataTable` is like a spreadsheet. It has rows and columns, where each column has a specific data type and an optional label.

-   **Columns**: Each column has a data type (e.g., `string`, `number`, `date`), an optional string `label` (which is what charts display), and an optional `id`.
-   **Rows**: Each row is an array of data, where the order of elements corresponds to the order of the columns.
-   **Cells**: Each cell in the table holds a value that matches the data type of its column. Cells can also have an optional formatted string version of the data.

## Creating a DataTable

There are several ways to create a `DataTable`.

### 1. Creating an Empty DataTable and Populating It

You can instantiate an empty `DataTable` and then add columns and rows manually. This is useful when you are building the data dynamically.

```javascript
// 1. Create a new DataTable
const data = new google.visualization.DataTable();

// 2. Add columns
data.addColumn('string', 'Task');
data.addColumn('number', 'Hours per Day');

// 3. Add rows
data.addRows([
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', {v: 7, f: '7.0'}], // Cell object with value and formatted value
]);
```

### 2. From an Array using `arrayToDataTable`

The `google.visualization.arrayToDataTable()` is a convenient helper method to create a `DataTable` from a 2D array. The first row of the array is treated as the column headers.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['Commute', 1],
  ['Watch TV', 3],
  ['Sleep', 7],
]);
```

### 3. Using Object Literal Notation

For more complex scenarios, you can pass a JavaScript object literal describing the data table directly to the constructor. This is the most flexible method.

```javascript
const data = new google.visualization.DataTable({
  cols: [
    {id: 'task', label: 'Task', type: 'string'},
    {id: 'hours', label: 'Hours per Day', type: 'number'}
  ],
  rows: [
    {c: [{v: 'Work'}, {v: 8}]},
    {c: [{v: 'Eat'}, {v: 2}]},
    {c: [{v: 'Commute'}, {v: 1}]},
    {c: [{v: 'Watch TV'}, {v: 3}]},
    {c: [{v: 'Sleep'}, {v: 7, f: '7 hours'}]} // 'f' is the formatted value
  ]
});
```

## Data Types

The Google Visualization API supports the following data types for columns:

-   `'string'`
-   `'number'`
-   `'boolean'`
-   `'date'` (a JavaScript `Date` object with no time part)
-   `'datetime'` (a JavaScript `Date` object including time)
-   `'timeofday'` (an array of three numbers: `[hour, minute, second]`)

## Data Roles

Data Roles are a powerful feature that allows you to attach special properties to data columns. These roles tell the chart how to use the data in that column. For example, a column can be used for the data itself, for a tooltip, for styling, or for an annotation.

You define a role by adding a role property to a column object. Common roles include:

-   **`'style'`**: Specifies CSS styling for the associated data point.
-   **`'tooltip'`**: Provides custom HTML content for the tooltip of the associated data point.
-   **`'annotation'`**: Displays text near the data point on the chart.
-   **`'interval'`**: Defines a range (min/max) for a data point, used for things like error bars.

### Tooltip Role Example

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', {role: 'tooltip', type: 'string', p: {html: true}}],
  ['2018', 1000, '<h4>2018</h4><p>Sales: 1,000</p><b>Status: Good</b>'],
  ['2019', 1170, '<h4>2019</h4><p>Sales: 1,170</p><b>Status: Excellent</b>'],
  ['2020', 660,  '<h4>2020</h4><p>Sales: 660</p><b>Status: Poor</b>'],
  ['2021', 1030, '<h4>2021</h4><p>Sales: 1,030</p><b>Status: Good</b>']
]);

// You must set the 'tooltip.isHtml' option to true.
const options = {
  tooltip: { isHtml: true }
};
```

## What is a DataView?

A `google.visualization.DataView` is a read-only wrapper around a `DataTable`. It allows you to select a subset of columns and rows from the underlying `DataTable` without modifying the original data. This is extremely useful for creating interactive dashboards where different charts display different views of the same data.

You create a `DataView` from an existing `DataTable` and then use `setColumns()` or `setRows()` to define the view. You can then pass this `view` object to a chart's `draw()` method just like you would with a `DataTable`.
