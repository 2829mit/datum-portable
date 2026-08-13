const fs = require('fs');
let code = fs.readFileSync('components/Configurator.tsx', 'utf8');

// Add onLicenseToggle to props
code = code.replace(
  'selectedLicenseOptions: LicenseOption[];',
  'selectedLicenseOptions: LicenseOption[];\n  onLicenseToggle: (option: LicenseOption) => void;'
);

code = code.replace(
  'selectedLicenseOptions,',
  'selectedLicenseOptions,\n  onLicenseToggle,'
);

const oldLicenseBlock = `                {LICENSE_OPTIONS.map(option => (
                  <div key={\`license-\${option.id}\`} className="w-full flex items-center p-4 border border-gray-300 rounded-lg text-left bg-gray-50">
                    <div className="flex-grow flex justify-between items-center">
                      <span className="font-medium text-gray-900">{option.name}</span>
                      <span className="font-medium text-gray-900">{showPrices ? formatPrice(option.price) : ''}</span>
                    </div>
                  </div>
                ))}`;

const newLicenseBlock = `                {LICENSE_OPTIONS.map(option => (
                  <button
                    key={\`license-\${option.id}\`}
                    onClick={() => onLicenseToggle(option)}
                    className={\`group w-full flex items-center p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 \${
                      selectedLicenseOptions.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-500'
                    }\`}
                  >
                    <div className={\`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 \${
                      selectedLicenseOptions.some(o => o.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                    }\`}>
                      {selectedLicenseOptions.some(o => o.id === option.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-grow flex justify-between items-center">
                      <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option.name}</p>
                      <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">
                        {showPrices ? formatPrice(option.price) : ''}
                      </p>
                    </div>
                  </button>
                ))}`;

code = code.replace(oldLicenseBlock, newLicenseBlock);
fs.writeFileSync('components/Configurator.tsx', code);
