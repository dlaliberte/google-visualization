---
sidebar_position: 2
---

# Documentation Plan

This document outlines the plan for creating comprehensive documentation for the Google Visualization API. The primary focus is on documenting the public-facing API to enable developers to use the library effectively.

## Guiding Principles

- **User-Focused**: Documentation should be written from the perspective of a developer using the library.
- **Example-Driven**: Every feature should be accompanied by clear, working code examples.
- **Comprehensive**: Cover all public APIs, including charts, options, methods, and events.
- **Discoverable**: The documentation structure should make it easy for users to find what they need.

## Documentation Structure

The documentation will be organized into the following major sections:

### 1. Getting Started (High Priority)

This section will provide a gentle introduction for new users.

- **Overview**: What is the Google Visualization API? What can it do?
- **Quick Start**: A simple, step-by-step guide to drawing your first chart (e.g., a PieChart).
- **Loading the Library**: How to include the necessary scripts.
- **ChartWrapper**: Introduce the `ChartWrapper` class as the recommended way to create and manage charts.

### 2. Core Concepts (High Priority)

This section will cover the fundamental building blocks of the API.

- **`DataTable` and `DataView`**:
  - Creating a `DataTable` from scratch.
  - Understanding data types (string, number, boolean, date, etc.).
  - Using a `DataView` to transform and filter data.
  - Data Roles (e.g., `tooltip`, `style`, `annotation`).
- **Configuration Options**:
  - How to pass options to a chart.
  - Common options available for most charts (e.g., `title`, `width`, `height`, `colors`, `legend`, `tooltip`).
- **Events**:
  - How to listen for events (`ready`, `select`, `error`, `onmouseover`).
  - Getting event properties.
- **Formatting Data**:
  - `NumberFormat`, `DateFormat`, `PatternFormat`, `ColorFormat`.

### 3. Chart Gallery & Reference (Medium Priority)

This will be a comprehensive reference for every chart type. We will add charts one by one.

**Priority List:**
1.  PieChart, BarChart / ColumnChart, LineChart
2.  ScatterChart, AreaChart, Table
3.  **TreeMap** (since the code is present)
4.  Gauge, GeoChart, CandlestickChart, Histogram, ComboChart

For each chart, the documentation will include an overview, data format, configuration options, methods, and events.

### 4. Controls and Dashboards (Medium Priority)

This section will explain how to create interactive dashboards.

- **Overview**: What are Controls and Dashboards?
- **Using `ControlWrapper`**: How to set up a control (e.g., `CategoryFilter`, `NumberRangeFilter`).
- **Using `Dashboard`**: How to bind controls to charts.

### 5. Advanced Topics (Low Priority)

- **Using the `Query` Class**: Fetching data from Google Sheets.
- **Customizing Tooltips**: HTML tooltips and advanced customization.
- **Performance Best Practices**.

## Implementation Plan

1.  **Write the "Getting Started" guide** to onboard new users.
2.  **Document `DataTable` and `DataView`**, as they are fundamental.
3.  **Begin the Chart Reference**, starting with `PieChart` and `TreeMap`.
4.  **Incrementally add more charts and concepts** following the priority list.
