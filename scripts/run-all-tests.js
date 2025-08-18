/**
 * Script to run all tests and generate reports
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const rootDir = path.resolve(__dirname, '..');
const reportsDir = path.join(rootDir, 'test-reports');

/**
 * Executes a command and returns the output
 * @param {string} command The command to execute
 * @returns {string} Command output
 */
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    const output = execSync(command, {
      cwd: rootDir,
      stdio: 'inherit'
    });
    return output ? output.toString() : '';
  } catch (error) {
    console.error(`Error running command: ${command}`);
    console.error(error.message);
    return '';
  }
}

/**
 * Creates a directory if it doesn't exist
 * @param {string} dirPath Directory path
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Runs unit tests with coverage
 */
function runUnitTests() {
  console.log('\n=== Running Unit Tests ===\n');
  runCommand('npm run test:coverage');
}

/**
 * Runs end-to-end tests
 */
function runE2ETests() {
  console.log('\n=== Running End-to-End Tests ===\n');
  runCommand('npm run test:e2e');
}

/**
 * Generates test coverage report
 */
function generateCoverageReport() {
  console.log('\n=== Generating Coverage Report ===\n');
  runCommand('node scripts/analyze-test-coverage.js');
}

/**
 * Copies test reports to the reports directory
 */
function copyReports() {
  console.log('\n=== Copying Reports ===\n');

  ensureDirectoryExists(reportsDir);

  // Copy unit test coverage report
  const coverageReportDir = path.join(rootDir, 'coverage');
  if (fs.existsSync(coverageReportDir)) {
    const targetDir = path.join(reportsDir, 'unit-coverage');
    ensureDirectoryExists(targetDir);

    // Copy HTML report
    const htmlReportDir = path.join(coverageReportDir, 'html');
    if (fs.existsSync(htmlReportDir)) {
      runCommand(`xcopy "${htmlReportDir}" "${targetDir}" /E /I /Y`);
    }
  }

  // Copy E2E test report
  const e2eReportDir = path.join(rootDir, 'playwright-report');
  if (fs.existsSync(e2eReportDir)) {
    const targetDir = path.join(reportsDir, 'e2e-report');
    ensureDirectoryExists(targetDir);
    runCommand(`xcopy "${e2eReportDir}" "${targetDir}" /E /I /Y`);
  }

  // Copy screenshots
  const screenshotsDir = path.join(rootDir, 'test-results');
  if (fs.existsSync(screenshotsDir)) {
    const targetDir = path.join(reportsDir, 'screenshots');
    ensureDirectoryExists(targetDir);
    runCommand(`xcopy "${screenshotsDir}" "${targetDir}" /E /I /Y`);
  }

  // Copy coverage report
  const coverageReportPath = path.join(rootDir, 'test-coverage-report.md');
  if (fs.existsSync(coverageReportPath)) {
    fs.copyFileSync(coverageReportPath, path.join(reportsDir, 'test-coverage-report.md'));
  }
}

/**
 * Main function
 */
function main() {
  console.log('Starting test run...');

  // Create reports directory
  ensureDirectoryExists(reportsDir);

  // Run tests
  runUnitTests();
  runE2ETests();

  // Generate reports
  generateCoverageReport();

  // Copy reports
  copyReports();

  console.log('\n=== Test Run Complete ===\n');
  console.log(`Reports are available in: ${reportsDir}`);
}

// Run the script
main();
