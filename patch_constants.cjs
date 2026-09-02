const fs = require('fs');
let code = fs.readFileSync('constants.ts', 'utf8');

code = code.replace(
  "id: 'fuel-monitoring-system',\n    name: 'Fuel Monitoring system',",
  "id: 'fuel-monitoring-system',\n    name: 'Fuel level Sensor',"
);

const cameraCode = `  {
    id: '360-camera',
    name: '360° Camera',
    price: 0,
    imageUrl: '',
    description: ''
  },
`;

code = code.replace(
  "id: 'erp-integration',",
  cameraCode + "  {\n    id: 'erp-integration',"
);

fs.writeFileSync('constants.ts', code);
