#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// Try to find the main.js file in different possible locations
const possiblePaths = [
  // When running from apps/backend directory
  path.join(__dirname, 'dist', 'apps', 'backend', 'src', 'main.js'),
  // When running from project root
  path.join(__dirname, 'apps', 'backend', 'dist', 'apps', 'backend', 'src', 'main.js'),
  // Fallback for Railway
  path.join(process.cwd(), 'apps', 'backend', 'dist', 'apps', 'backend', 'src', 'main.js'),
];

let mainPath = null;
for (const possiblePath of possiblePaths) {
  const resolvedPath = path.resolve(possiblePath);
  if (fs.existsSync(resolvedPath)) {
    mainPath = resolvedPath;
    break;
  }
}

if (!mainPath) {
  console.error('Error: Cannot find main.js file. Tried paths:');
  possiblePaths.forEach(p => console.error(`  - ${path.resolve(p)}`));
  process.exit(1);
}

console.log(`Starting backend from: ${mainPath}`);

// Spawn node process with the correct path
const nodeProcess = spawn(
  'node',
  ['--experimental-require-module', mainPath],
  {
    stdio: 'inherit',
    env: process.env,
  }
);

nodeProcess.on('exit', (code) => {
  process.exit(code || 0);
});

nodeProcess.on('error', (err) => {
  console.error('Failed to start backend:', err);
  process.exit(1);
});

