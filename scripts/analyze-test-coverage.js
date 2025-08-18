/**
 * Script to analyze test coverage and generate a report
 */
const fs = require('fs');
const path = require('path');

// Configuration
const rootDir = path.resolve(__dirname, '..');
const coverageDir = path.join(rootDir, 'coverage');
const coverageJsonPath = path.join(coverageDir, 'coverage-final.json');
const outputPath = path.join(rootDir, 'test-coverage-report.md');
const templatePath = path.join(rootDir, 'test-coverage-template.md');

// Module directories to analyze
const modules = [
  'axis',
  'colorbar',
  'common',
  'controls',
  'data',
  'dom',
  'events',
  'format',
  'graphics',
  'i18n',
  'legend',
  'loader',
  'math',
  'query',
  'text',
  'tooltip',
  'tree',
  'trendlines',
  'visualization',
  'wrapper'
];

/**
 * Reads the coverage data from the JSON file
 * @returns {Object} Coverage data
 */
function readCoverageData() {
  try {
    const coverageJson = fs.readFileSync(coverageJsonPath, 'utf8');
    return JSON.parse(coverageJson);
  } catch (error) {
    console.error('Error reading coverage data:', error.message);
    return null;
  }
}

/**
 * Calculates coverage statistics for a module
 * @param {Object} coverageData The coverage data
 * @param {string} moduleName The module name
 * @returns {Object} Coverage statistics
 */
function calculateModuleCoverage(coverageData, moduleName) {
  const moduleStats = {
    files: 0,
    lines: { total: 0, covered: 0 },
    statements: { total: 0, covered: 0 },
    functions: { total: 0, covered: 0 },
    branches: { total: 0, covered: 0 }
  };

  // Filter files that belong to this module
  const moduleFiles = Object.keys(coverageData).filter(filePath => {
    return filePath.includes(`/${moduleName}/`) || filePath.includes(`\\${moduleName}\\`);
  });

  moduleStats.files = moduleFiles.length;

  // Aggregate statistics for all files in the module
  moduleFiles.forEach(filePath => {
    const fileData = coverageData[filePath];

    // Statements
    const statementCoverage = fileData.s;
    const statementMap = fileData.statementMap;
    moduleStats.statements.total += Object.keys(statementMap).length;
    moduleStats.statements.covered += Object.values(statementCoverage).filter(v => v > 0).length;

    // Functions
    const functionCoverage = fileData.f;
    const functionMap = fileData.fnMap;
    moduleStats.functions.total += Object.keys(functionMap).length;
    moduleStats.functions.covered += Object.values(functionCoverage).filter(v => v > 0).length;

    // Branches
    const branchCoverage = fileData.b;
    const branchMap = fileData.branchMap;
    Object.keys(branchMap).forEach(branchId => {
      const branch = branchCoverage[branchId];
      moduleStats.branches.total += branch.length;
      moduleStats.branches.covered += branch.filter(v => v > 0).length;
    });

    // Lines
    const lineCoverage = fileData.l;
    moduleStats.lines.total += Object.keys(lineCoverage).length;
    moduleStats.lines.covered += Object.values(lineCoverage).filter(v => v > 0).length;
  });

  return moduleStats;
}

/**
 * Calculates the coverage percentage
 * @param {number} covered Number of covered items
 * @param {number} total Total number of items
 * @returns {string} Coverage percentage as a string
 */
function calculatePercentage(covered, total) {
  if (total === 0) return '0.00%';
  return ((covered / total) * 100).toFixed(2) + '%';
}

/**
 * Generates a markdown table row for a module
 * @param {string} moduleName The module name
 * @param {Object} stats The module statistics
 * @returns {string} Markdown table row
 */
function generateModuleRow(moduleName, stats) {
  const linesCoverage = calculatePercentage(stats.lines.covered, stats.lines.total);
  const statementsCoverage = calculatePercentage(stats.statements.covered, stats.statements.total);
  const functionsCoverage = calculatePercentage(stats.functions.covered, stats.functions.total);
  const branchesCoverage = calculatePercentage(stats.branches.covered, stats.branches.total);

  const overallCoverage = calculatePercentage(
    stats.statements.covered + stats.functions.covered + stats.branches.covered,
    stats.statements.total + stats.functions.total + stats.branches.total
  );

  return `| ${moduleName} | ${stats.files} | ${linesCoverage} | ${statementsCoverage} | ${functionsCoverage} | ${branchesCoverage} | ${overallCoverage} |`;
}

/**
 * Generates the coverage report
 * @param {Object} coverageData The coverage data
 * @returns {string} Markdown report
 */
function generateCoverageReport(coverageData) {
  // Read the template
  const template = fs.readFileSync(templatePath, 'utf8');

  // Calculate coverage for each module
  const moduleRows = [];
  const totalStats = {
    files: 0,
    lines: { total: 0, covered: 0 },
    statements: { total: 0, covered: 0 },
    functions: { total: 0, covered: 0 },
    branches: { total: 0, covered: 0 }
  };

  modules.forEach(moduleName => {
    const stats = calculateModuleCoverage(coverageData, moduleName);

    // Add to totals
    totalStats.files += stats.files;
    totalStats.lines.total += stats.lines.total;
    totalStats.lines.covered += stats.lines.covered;
    totalStats.statements.total += stats.statements.total;
    totalStats.statements.covered += stats.statements.covered;
    totalStats.functions.total += stats.functions.total;
    totalStats.functions.covered += stats.functions.covered;
    totalStats.branches.total += stats.branches.total;
    totalStats.branches.covered += stats.branches.covered;

    moduleRows.push(generateModuleRow(moduleName, stats));
  });

  // Add total row
  moduleRows.push(generateModuleRow('**Total**', totalStats));

  // Replace the placeholder in the template
  let report = template;
  const moduleTableRegex = /\| Module \| Files \| Lines \| Statements \| Functions \| Branches \| Coverage % \|\n\|--------|-------|-------|------------|-----------|----------|------------\|\n([\s\S]*?)\n\n## End-to-End Test Coverage/;

  report = report.replace(moduleTableRegex, `| Module | Files | Lines | Statements | Functions | Branches | Coverage % |\n|--------|-------|-------|------------|-----------|----------|------------|\n${moduleRows.join('\n')}\n\n## End-to-End Test Coverage`);

  return report;
}

/**
 * Main function
 */
function main() {
  console.log('Analyzing test coverage...');

  // Check if coverage data exists
  if (!fs.existsSync(coverageJsonPath)) {
    console.error(`Coverage data not found at ${coverageJsonPath}`);
    console.error('Please run "npm run test:coverage" first.');
    process.exit(1);
  }

  // Read coverage data
  const coverageData = readCoverageData();
  if (!coverageData) {
    process.exit(1);
  }

  // Generate report
  const report = generateCoverageReport(coverageData);

  // Write report to file
  fs.writeFileSync(outputPath, report);

  console.log(`Coverage report generated at ${outputPath}`);
}

// Run the script
main();
