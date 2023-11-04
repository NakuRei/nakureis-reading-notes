const path = require('path');

const buildLintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildFormatCommand = (filenames) =>
  `prettier --check --debug-check ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildLintCommand],
  '*.{js,jsx,ts,tsx,json,css}': [buildFormatCommand],
};
