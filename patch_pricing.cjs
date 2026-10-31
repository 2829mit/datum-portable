const fs = require('fs');
let code = fs.readFileSync('components/Configurator.tsx', 'utf8');

const targetStr = `...selectedSafetyUpgrades
      .filter(opt => !(selectedTank === '30kl' && opt.id === 'advanced-skid'))
      .map(opt => ({ name: opt.name, price: opt.price * multiplier })),`;

const replacement = `...selectedSafetyUpgrades
      .filter(opt => !(selectedTank === '30kl' && opt.id === 'advanced-skid'))
      .map(opt => ({ name: opt.name, price: opt.price * multiplier })),
    ...selectedLicenseOptions.map(opt => ({ name: opt.name, price: opt.price * multiplier })),`;

code = code.replace(targetStr, replacement);
fs.writeFileSync('components/Configurator.tsx', code);
