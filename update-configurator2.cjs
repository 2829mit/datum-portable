const fs = require('fs');
const content = fs.readFileSync('components/Configurator.tsx', 'utf8');
const replacement = fs.readFileSync('replace_end.tsx', 'utf8');

const startPattern = '            {/* 9. Licenses and Compliances */}';
const endPattern = '            {/* Pricing Breakdown */}';

const startIndex = content.indexOf(startPattern);
const endIndex = content.indexOf(endPattern);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex + endPattern.length);
  fs.writeFileSync('components/Configurator.tsx', newContent);
  console.log('Updated components/Configurator.tsx');
} else {
  console.log('Patterns not found', { startIndex, endIndex });
}
