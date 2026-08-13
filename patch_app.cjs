const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

// Add handleLicenseToggle
const safetyToggleIndex = code.indexOf('const handleSafetyUpgradeToggle');
if (safetyToggleIndex !== -1) {
    const licenseToggle = `
  const handleLicenseToggle = (option: LicenseOption) => {
    setSelectedLicenseOptions(prev => {
      const exists = prev.find(o => o.id === option.id);
      if (!exists) {
        return [...prev, option];
      }
      return prev.filter(o => o.id !== option.id);
    });
  };

`;
    code = code.slice(0, safetyToggleIndex) + licenseToggle + code.slice(safetyToggleIndex);
}

// Pass onLicenseToggle to Configurator
const confPropIndex = code.indexOf('selectedLicenseOptions={selectedLicenseOptions}');
if (confPropIndex !== -1) {
    code = code.slice(0, confPropIndex) + 'onLicenseToggle={handleLicenseToggle}\n              ' + code.slice(confPropIndex);
}

fs.writeFileSync('App.tsx', code);
