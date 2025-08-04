---
sidebar_position: 2
---

# Documentation Plan

This document outlines the plan for creating comprehensive documentation for the Google Visualization API. The primary focus is on documenting the public-facing API to enable developers to use the library effectively.

## Guiding Principles

-   **User-Focused**: Documentation should be written from the perspective of a developer using the library, addressing common questions and use cases.
-   **Example-Driven**: Every feature should be accompanied by clear, working code examples.
-   **Interactive & Live**: Wherever possible, examples should be presented in a live editor (like the `LiveChartEditor` component) so users can modify the code and see the results instantly.
-   **Comprehensive**: Cover all public APIs, including charts, options, methods, and events.
-   **Discoverable & Searchable**: The documentation structure should make it easy for users to find what they need. A powerful search functionality is key.
-   **Progressive Disclosure**: Start with simple concepts and gradually introduce more advanced topics. Avoid overwhelming new users.

## Documentation Structure

The documentation will be organized into the following major sections:

### 1. Getting Started (High Priority)

This section will provide a gentle introduction for new users.

- **Overview**: What is the Google Visualization API? What can it do?
-   **Quick Start**: A simple, step-by-step guide to drawing your first chart (e.g., a PieChart) using the `GoogleChartCode` or `GoogleChartsLoader` components.
-   **Loading the Library**: How to include the necessary scripts and use the `GoogleChartsLoader` component in React environments.
-   **ChartWrapper**: Introduce the `ChartWrapper` class as the recommended way to create and manage charts in plain JavaScript.

### 2. Core Concepts (High Priority)

This section will cover the fundamental building blocks of the API.

- **`DataTable` and `DataView`**:
    -   Creating a `DataTable` from scratch (`arrayToDataTable`, `new DataTable()`).
    -   Understanding data types (string, number, boolean, date, etc.) and their formatting.
    -   Adding/removing rows and columns.
    -   Using a `DataView` to transform and filter data without modifying the original `DataTable`.
    -   Data Roles (e.g., `tooltip`, `style`, `annotation`, `interval`).
- **Configuration Options**:
  - How to pass options to a chart.
  - Common options available for most charts (e.g., `title`, `width`, `height`, `colors`, `legend`, `tooltip`).
- **Selection**:
  - How to get the selected items (`getSelection()`).
  - How to set the selection programmatically (`setSelection()`).
  - Responding to selection changes.
- **Events**:
  - How to listen for events (`ready`, `select`, `error`, `onmouseover`, `onmouseout`).
  - Getting event properties and interacting with the chart based on events.
- **Actions**:
  - Adding custom actions to charts (e.g., context menu items).
- **Tooltips**:
  - Customizing tooltips (HTML tooltips, custom content).
- **Explorers**:
  - Enabling and configuring chart explorers for zooming and panning.
- **Controls and Dashboards**:
  - Overview: What are Controls and Dashboards?
  - Using `ControlWrapper`: How to set up a control (e.g., `CategoryFilter`, `NumberRangeFilter`).
  - Using `Dashboard`: How to bind controls to charts.

### 3. Chart Gallery & Reference (Medium Priority)

This will be a comprehensive, searchable reference for every chart type. We will add charts one by one, following a standardized template for each.

**Priority List:**
1.  PieChart, BarChart / ColumnChart, LineChart
2.  ScatterChart, AreaChart, Table
3.  **TreeMap** (since the code is present)
4.  Gauge, GeoChart, CandlestickChart, Histogram, ComboChart
5.  Other charts.

**Template for each Chart Page:**

-   **Overview**: A brief description of the chart and its common use cases.
-   **Live Example**: A live, editable example using the `LiveChartEditorComposed` component.
-   **Data Format**: A clear explanation of the required `DataTable` structure, including column types and roles.
-   **Configuration Options**: A searchable and filterable table of all specific configuration options for that chart. Each option will have:
    -   Name (e.g., `hAxis.title`)
    -   Type (e.g., `string`, `number`, `object`)
    -   Default value
    -   Description
    -   A small, live example demonstrating the option.
-   **Methods**: Documentation for public methods (e.g., `getSelection()`, `setSelection()`).
-   **Events**: Documentation for events specific to the chart.
-   **Advanced Examples**: A gallery of more complex examples (e.g., using a `DataView`, custom HTML tooltips, event handling).

### 4. Chart Interactivity (Medium Priority)

This section will detail all the ways users can interact with charts, beyond just viewing them.

- **Overview**: What are the different ways users can interact with charts?

### 5. Advanced Topics (Low Priority)

- **Using the `Query` Class**: Fetching data from Google Sheets.
- **Performance Best Practices**.

## Implementation Plan

1.  **Write the "Getting Started" guide** to onboard new users.
2.  **Document `DataTable` and `DataView`**, as they are fundamental.
3.  **Begin the Chart Reference**, starting with `PieChart` and `TreeMap`.
4.  **Document Chart Interactivity**, covering selection, events, actions, tooltips, and explorers.
5.  **Incrementally add more charts and concepts** following the priority list.
