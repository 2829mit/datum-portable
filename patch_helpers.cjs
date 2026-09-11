const fs = require('fs');
let code = fs.readFileSync('utils/vehicleHelpers.ts', 'utf8');

const targetStr = `    // Fuel Level Sensors
    if (safetyUnits.some(o => o.id === 'fuel-level-sensors')) {
         if (isSmallTank) {
             layers.push('https://drf-media-data.s3.ap-south-1.amazonaws.com/compressor_aws/final/-1-6-Fuel%20Level30-min.png');
         } else {
             layers.push('https://drf-media-data.s3.ap-south-1.amazonaws.com/compressor_aws/final/-1-6-Fuel%20Level60-min.png');
         }
    }`;

const replacementStr = `    // Fuel Level Sensors
    if (safetyUpgrades.some(o => o.id === 'fuel-monitoring-system')) {
         if (isSmallTank) {
             layers.push('https://drf-media-data.s3.ap-south-1.amazonaws.com/compressor_aws/final/-1-6-Fuel%20Level30-min.png');
         } else {
             layers.push('https://drf-media-data.s3.ap-south-1.amazonaws.com/compressor_aws/final/-1-6-Fuel%20Level60-min.png');
         }
    }`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('utils/vehicleHelpers.ts', code);
