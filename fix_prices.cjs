const fs = require('fs');
let code = fs.readFileSync('constants.ts', 'utf8');

code = code.replace(
  "id: 'fuel-monitoring-system',\n    name: 'Fuel Monitoring system',\n    price: 99999,",
  "id: 'fuel-monitoring-system',\n    name: 'Fuel Monitoring system',\n    price: 99999 / 36,"
);
code = code.replace(
  "id: 'secure-fueling-1',\n    name: 'Secure Fuelling System (1-Active Tag)',\n    price: 49999,",
  "id: 'secure-fueling-1',\n    name: 'Secure Fuelling System (1-Active Tag)',\n    price: 49999 / 36,"
);
code = code.replace(
  "id: 'secure-fueling-2',\n    name: 'Secure Fuelling System (2-Active Tag)',\n    price: 149999,",
  "id: 'secure-fueling-2',\n    name: 'Secure Fuelling System (2-Active Tag)',\n    price: 149999 / 36,"
);
code = code.replace(
  "id: 'erp-integration',\n    name: 'ERP Integration',\n    price: 99999,",
  "id: 'erp-integration',\n    name: 'ERP Integration',\n    price: 99999 / 36,"
);
code = code.replace(
  "id: 'installation-commissioning',\n    name: 'Installation & Commissioning',\n    price: 99999,",
  "id: 'installation-commissioning',\n    name: 'Installation & Commissioning',\n    price: 99999 / 36,"
);

code = code.replace(
  "{ id: 'peso-drawing', name: 'PESO Drawing Creation', price: 49999, subtext: '' },",
  "{ id: 'peso-drawing', name: 'PESO Drawing Creation', price: 49999 / 36, subtext: '' },"
);
code = code.replace(
  "{ id: 'peso-prior-approval', name: 'PESO Prior Approval & Site Inspection', price: 49999, subtext: '' },",
  "{ id: 'peso-prior-approval', name: 'PESO Prior Approval & Site Inspection', price: 49999 / 36, subtext: '' },"
);
code = code.replace(
  "{ id: 'peso-final-grant', name: 'PESO final Grant - Form XIV', price: 49999, subtext: '' },",
  "{ id: 'peso-final-grant', name: 'PESO final Grant - Form XIV', price: 49999 / 36, subtext: '' },"
);
code = code.replace(
  "{ id: 'tank-nozzle-calibration', name: 'Tank & Nozzle Calibration', price: 99999, subtext: '' },",
  "{ id: 'tank-nozzle-calibration', name: 'Tank & Nozzle Calibration', price: 99999 / 36, subtext: '' },"
);

fs.writeFileSync('constants.ts', code);
