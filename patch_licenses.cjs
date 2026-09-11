const fs = require('fs');
let code = fs.readFileSync('components/Configurator.tsx', 'utf8');

const targetStrLicenses = `            {/* 10. Licenses and Compliances */}
            <div className="mb-[45px]">
              <h2 className="text-2xl font-semibold text-center text-gray-900 mt-8">Licenses and Compliances</h2>
              <div className="space-y-3 mt-6">
                {LICENSE_OPTIONS.map(option => (
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
                ))}
              </div>
            </div>`;

const replacementLicenses = `            {/* Installation & Commissioning */}
            <div className="mb-[45px]">
                <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Installation & Commissioning</h2>
                <div className="space-y-6">
                  {SAFETY_UPGRADE_OPTIONS.filter(opt => ['erp-integration', 'installation-commissioning'].includes(opt.id)).map(option => {
                    return (
                      <button
                        key={option.id}
                        onClick={() => onSafetyUpgradeToggle(option)}
                        className={\`group w-full flex items-center p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 \${
                          selectedSafetyUpgrades.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-500'
                        }\`}
                      >
                        <div className={\`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 \${
                          selectedSafetyUpgrades.some(o => o.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                        }\`}>
                          {selectedSafetyUpgrades.some(o => o.id === option.id) && (
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
                    );
                  })}
                </div>
            </div>

            {/* 10. Licenses and Compliances */}
            <div className="mb-[45px]">
              <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Licenses and Compliances</h2>
              <div className="space-y-3 mt-6">
                {LICENSE_OPTIONS.map(option => (
                  <div key={\`license-\${option.id}\`} className={\`border rounded-lg transition-all duration-300 \${selectedLicenseOptions.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}\`}>
                    <button
                      onClick={() => onLicenseToggle(option)}
                      className="group w-full flex items-center p-4 text-left cursor-pointer transition-all duration-300"
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
                    {selectedLicenseOptions.some(o => o.id === option.id) && (
                       <div className="px-4 pb-4 pt-1 ml-8">
                         <div className="space-y-2">
                            {['PESO Drawing Creation', 'PESO Prior Approval & Site Inspection', 'PESO final Grant - Form XIV', 'Tank & Nozzle Calibration'].map((point, idx) => (
                               <div key={idx} className="flex items-center text-sm text-gray-700">
                                 <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                 </svg>
                                 {point}
                               </div>
                            ))}
                         </div>
                       </div>
                    )}
                  </div>
                ))}
              </div>
            </div>`;

code = code.replace(targetStrLicenses, replacementLicenses);
fs.writeFileSync('components/Configurator.tsx', code);
