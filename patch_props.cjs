const fs = require('fs');
let code = fs.readFileSync('components/Configurator.tsx', 'utf8');

const targetStr = `  rfidTagsQuantity,
  setRfidTagsQuantity,
  selectedConsumption,
  onConsumptionSelect,`;

const replacement = `  rfidTagsQuantity,
  setRfidTagsQuantity,
  selectedLicenseOptions = [],
  onLicenseToggle,
  selectedConsumption,
  onConsumptionSelect,`;

code = code.replace(targetStr, replacement);
fs.writeFileSync('components/Configurator.tsx', code);
