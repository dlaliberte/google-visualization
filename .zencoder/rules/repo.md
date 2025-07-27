---
description: Repository Information Overview
alwaysApply: true
---

# Google Visualization Information

## Summary
This repository contains the open-source subset of the Google Visualization API, also known as Google Charts. It provides a library for creating interactive charts and data visualizations. The code is written in TypeScript with minimal dependencies.

## Structure
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
- **visualization**: Core visualization components and chart types
- **wrapper**: Wrapper classes for charts and controls

## Language & Runtime
**Language**: TypeScript
**Build System**: Not explicitly defined (likely uses Node.js tooling)
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- dompurify (^3.2.6): HTML sanitization library
- fp-ts (^2.16.10): Functional programming utilities
- three (^0.177.0): 3D library for WebGL-based visualizations
- ts-essentials (^10.1.1): TypeScript utility types

**Development Dependencies**:
- @types/node (^24.0.3): TypeScript definitions for Node.js
- @types/three (^0.177.0): TypeScript definitions for Three.js
- @vitest/ui (^3.2.4): UI for Vitest testing framework
- jsdom (^26.1.0): JavaScript implementation of DOM for testing
- vitest (^3.2.4): Testing framework

## Build & Installation
```bash
# Install dependencies
npm install

# Run tests
npm test
```

## Testing
**Framework**: Vitest
**Test Location**: Tests are located alongside source files with `_test.ts` suffix
**Configuration**: vitest.config.ts
**Run Command**:
```bash
npm test
```

## Main Components
- **Core Charts**: Implementation of various chart types (pie, line, bar, etc.)
- **Data Handling**: DataTable and DataView implementations for data manipulation
- **Events**: Event handling for chart interactions and user gestures
- **Visualization**: Abstract visualization components and specific chart implementations
- **Wrappers**: ChartWrapper, ControlWrapper, and QueryWrapper for simplified API usage
