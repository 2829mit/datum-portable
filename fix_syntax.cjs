const fs = require('fs');
let code = fs.readFileSync('constants.ts', 'utf8');

code = code.replace(
  "  {\n      {\n    id: '360-camera',",
  "  {\n    id: '360-camera',"
);

// Also try the other possibility
code = code.replace(
  "  {\n\n  {\n    id: '360-camera',",
  "  {\n    id: '360-camera',"
);
code = code.replace(
  "    {   \n      id: '360-camera',",
  "    {   \n      id: '360-camera',"
);
code = code.replace(
  "    {\n        {\n      id: '360-camera',",
  "    {\n      id: '360-camera',"
);
fs.writeFileSync('constants.ts', code);
