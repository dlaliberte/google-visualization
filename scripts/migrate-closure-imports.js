/**
 * Script to help migrate Closure Library imports to internal utilities
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const rootDir = path.resolve(__dirname, '..');
const importMappings = {
  // Array
  '@npm//@closure/array/array': '../common/array',

  // Asserts
  '@npm//@closure/asserts/asserts': '../common/assert',
  '@npm//@closure/asserts/dom': '../common/dom_assert',

  // Disposable
  '@npm//@closure/disposable/disposable': '../common/disposable',
  '@npm//@closure/disposable/dispose': '../common/disposable',

  // DOM
  '@npm//@closure/dom/classlist': '../dom/classlist',
  '@npm//@closure/dom/dom': '../dom/dom',
  '@npm//@closure/dom/tagname': '../dom/tagname',
  '@npm//@closure/dom/nodetype': '../dom/node_type',

  // Events
  '@npm//@closure/events/browserevent': '../events/browser_event',
  '@npm//@closure/events/eventhandler': '../events/event_handler',
  '@npm//@closure/events/eventtype': '../events/event_type',
  '@npm//@closure/events/keycodes': '../events/key_codes',
  '@npm//@closure/events/events': '../events/events',
  '@npm//@closure/events/eventtarget': '../events/event_target',

  // Object
  '@npm//@closure/object/object': '../common/object',

  // String
  '@npm//@closure/string/string': '../common/string',
  '@npm//@closure/string/stringformat': '../common/string_format',

  // Style
  '@npm//@closure/style/style': '../dom/style',

  // UI
  '@npm//@closure/ui/buttonside': '../ui/button_side',
  '@npm//@closure/ui/component': '../ui/component',
  '@npm//@closure/ui/controlcontent': '../ui/control_content',
  '@npm//@closure/ui/custombutton': '../ui/custom_button',

  // User Agent
  '@npm//@closure/useragent/useragent': '../common/user_agent',

  // Color
  '@npm//@closure/color/color': '../common/color',

  // Functions
  '@npm//@closure/functions/functions': '../common/functions',

  // Math
  '@npm//@closure/math/box': '../math/box',
  '@npm//@closure/math/coordinate': '../math/coordinate',
  '@npm//@closure/math/math': '../math/math',
  '@npm//@closure/math/rect': '../math/rect',
  '@npm//@closure/math/vec2': '../math/vec2',
  '@npm//@closure/math/size': '../math/size',
  '@npm//@closure/math/line': '../math/line',

  // A11y
  '@npm//@closure/a11y/aria/aria': '../a11y/aria',

  // Log
  '@npm//@closure/log/log': '../common/log',

  // Timer
  '@npm//@closure/timer/timer': '../common/timer',
};

// High-priority files
const highPriorityFiles = [
  'visualization/table/table_chart.ts',
  'visualization/corechart/axis_chart_definer.ts',
  'graphics/drawing_frame.ts',
  'graphics/svg_renderer.ts',
  'visualization/corechart/corechart.ts',
];

/**
 * Finds all files with Closure imports
 * @param {string} directory Directory to search
 * @param {string[]} extensions File extensions to include
 * @returns {string[]} List of files with Closure imports
 */
function findFilesWithClosureImports(directory, extensions = ['.ts']) {
  try {
    const command = `grep -l "@npm//@closure" --include="*${extensions.join(',*')}" -r "${directory}"`;
    const result = execSync(command, { encoding: 'utf8' });
    return result.trim().split('\n').filter(Boolean);
  } catch (error) {
    if (error.status === 1 && error.stdout === '') {
      // grep returns status 1 when no matches are found
      return [];
    }
    console.error('Error finding files with Closure imports:', error);
    return [];
  }
}

/**
 * Parses imports from a file
 * @param {string} filePath Path to the file
 * @returns {Object} Object with import information
 */
function parseImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /import\s+(?:{([^}]*)}\s+from\s+)?['"](@npm\/\/@closure\/[^'"]+)['"]/g;
  const imports = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const symbols = match[1] ? match[1].split(',').map(s => s.trim()) : ['*'];
    const importPath = match[2];
    imports.push({
      fullMatch: match[0],
      symbols,
      importPath,
      startIndex: match.index,
      endIndex: match.index + match[0].length
    });
  }

  return {
    content,
    imports
  };
}

/**
 * Migrates imports in a file
 * @param {string} filePath Path to the file
 * @returns {boolean} True if file was modified
 */
function migrateImports(filePath) {
  console.log(`Processing ${filePath}...`);

  const { content, imports } = parseImports(filePath);

  if (imports.length === 0) {
    console.log('  No Closure imports found');
    return false;
  }

  console.log(`  Found ${imports.length} Closure imports`);

  // Sort imports by start index in reverse order to avoid changing positions
  imports.sort((a, b) => b.startIndex - a.startIndex);

  let newContent = content;
  let modified = false;

  for (const importInfo of imports) {
    const { fullMatch, importPath } = importInfo;

    if (importMappings[importPath]) {
      const newImportPath = importMappings[importPath];
      const newImport = fullMatch.replace(importPath, newImportPath);

      newContent = newContent.substring(0, importInfo.startIndex) +
                  newImport +
                  newContent.substring(importInfo.endIndex);

      console.log(`  Migrated: ${importPath} -> ${newImportPath}`);
      modified = true;
    } else {
      console.log(`  No mapping found for: ${importPath}`);
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('  File updated');
  }

  return modified;
}

/**
 * Checks if a utility file exists
 * @param {string} utilityPath Relative path to the utility file
 * @returns {boolean} True if the file exists
 */
function checkUtilityExists(utilityPath) {
  const fullPath = path.join(rootDir, utilityPath + '.ts');
  return fs.existsSync(fullPath);
}

/**
 * Lists missing utility files
 * @returns {string[]} List of missing utility files
 */
function listMissingUtilities() {
  const missingUtilities = [];

  for (const [, utilityPath] of Object.entries(importMappings)) {
    if (!checkUtilityExists(utilityPath)) {
      missingUtilities.push(utilityPath);
    }
  }

  return missingUtilities;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'check') {
    // Check for missing utilities
    const missingUtilities = listMissingUtilities();

    if (missingUtilities.length > 0) {
      console.log('Missing utility files:');
      missingUtilities.forEach(util => console.log(`  ${util}.ts`));
      console.log(`\nTotal: ${missingUtilities.length} missing utilities`);
    } else {
      console.log('All utility files exist');
    }
  } else if (command === 'list') {
    // List files with Closure imports
    const files = findFilesWithClosureImports(rootDir);

    if (files.length > 0) {
      console.log('Files with Closure imports:');
      files.forEach(file => console.log(`  ${file}`));
      console.log(`\nTotal: ${files.length} files`);
    } else {
      console.log('No files with Closure imports found');
    }
  } else if (command === 'migrate') {
    // Migrate high-priority files
    console.log('Migrating high-priority files...\n');

    let migratedCount = 0;

    for (const relativeFilePath of highPriorityFiles) {
      const filePath = path.join(rootDir, relativeFilePath);

      if (fs.existsSync(filePath)) {
        const modified = migrateImports(filePath);
        if (modified) {
          migratedCount++;
        }
      } else {
        console.log(`File not found: ${filePath}`);
      }

      console.log(''); // Empty line for readability
    }

    console.log(`Migration complete. Modified ${migratedCount} files.`);
  } else if (command === 'migrate-all') {
    // Migrate all files
    console.log('Migrating all files with Closure imports...\n');

    const files = findFilesWithClosureImports(rootDir);
    let migratedCount = 0;

    for (const filePath of files) {
      const modified = migrateImports(filePath);
      if (modified) {
        migratedCount++;
      }

      console.log(''); // Empty line for readability
    }

    console.log(`Migration complete. Modified ${migratedCount} out of ${files.length} files.`);
  } else {
    console.log('Usage:');
    console.log('  node migrate-closure-imports.js check     - Check for missing utility files');
    console.log('  node migrate-closure-imports.js list      - List files with Closure imports');
    console.log('  node migrate-closure-imports.js migrate   - Migrate high-priority files');
    console.log('  node migrate-closure-imports.js migrate-all - Migrate all files');
  }
}

// Run the script
main();
