# Google Visualization Library

This repository contains the open-source subset of the Google Visualization API, also known as Google Charts. It provides a library for creating interactive charts and data visualizations.

The user documentation for Google Charts is at: https://developers.google.com/chart.

## Migration Status

The library is currently being modernized by replacing Closure Library dependencies with internal utilities. See [MIGRATION.md](MIGRATION.md) for details on the migration progress.

## Getting Started

### Installation

```bash
npm install
```

### Running Tests

```bash
npm test
```

## Project Structure

- **axis**: Components for chart axis functionality
- **colorbar**: Color bar visualization components
- **common**: Shared utilities and common functionality
- **controls**: UI controls for charts
- **data**: Data handling and manipulation components
- **dom**: DOM manipulation utilities
- **events**: Event handling for chart interactions
- **format**: Formatting utilities for data display
- **graphics**: Rendering and graphics utilities
- **i18n**: Internationalization support
- **legend**: Chart legend components
- **loader**: Script and resource loading utilities
- **math**: Mathematical utilities and functions
- **query**: Data query functionality
- **text**: Text handling and formatting
- **tooltip**: Tooltip components for charts
- **tree**: Tree data structure implementations
- **trendlines**: Trend line calculation and rendering
- **ui**: UI components for charts
- **visualization**: Core visualization components and chart types
- **wrapper**: Wrapper classes for charts and controls

Issues for this library may be posted by members of the public in the associated repo: https://github.com/google/google-visualization-issues/issues

Privacy Policy
==============

Google Charts is a library, not a service.  So it does not store data itself
regarding use of any features of the library.  However, there are two exceptions
that may apply depending on your use case.

See https://policies.google.com/privacy for the general Google privacy policy.

Use of google.visualization.Query
---------------------------------

If you use the `google.visualization.Query` class and methods to request data
from a Google Sheets spreadsheet, whether it is your data or someone else's,
you will be sending requests to the Google Sheets service.
This also applies when you use the query mechanism
indirectly, which happens if you use the `dataSourceUrl` property or `setDataSourceUrl`
method via an instance of `google.visualization.ChartWrapper` or the
`google.visualization.drawChart` method.

The sheets service has its own privacy policy, which is the same as the general
[Google Privacy and Terms](https://policies.google.com/privacy).

See [how to change the
sharing-related settings of a spreadsheet](https://support.google.com/drive/answer/2494893).


Use of google.visualization.GeoChart
------------------------------------

(Not yet available in this repo... but soon)
If you use the `google.visualization.GeoChart` together with the geocoding feature
for looking up locations by their names, then the Google Maps service will likely
be used. You will also need to get a Google Maps "API Key" to use this service.
Google Maps has its own privacy policy, which is the same as the general
[Google Privacy and Terms](https://policies.google.com/privacy).
