const fs = require('fs');
let code = fs.readFileSync('components/Configurator.tsx', 'utf8');

const targetStrAddOns = `            {/* 7. Add-Ons */}
            <div className="mb-[45px]">
                <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Add-Ons</h2>
                <div className="space-y-6">
                  {SAFETY_UPGRADE_OPTIONS.filter(opt => ['advanced-skid', 'backup-du', 'fuel-monitoring-system', 'erp-integration', 'installation-commissioning'].includes(opt.id) && !(selectedTank === '30kl' && opt.id === 'advanced-skid')).map(option => {`;

const replacementAddOns = `            {/* 7. Add-Ons */}
            <div className="mb-[45px]">
                <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Add-Ons</h2>
                <div className="space-y-6">
                  {SAFETY_UPGRADE_OPTIONS.filter(opt => ['advanced-skid', 'backup-du'].includes(opt.id) && !(selectedTank === '30kl' && opt.id === 'advanced-skid')).map(option => {`;

code = code.replace(targetStrAddOns, replacementAddOns);

const targetStrFuelMonitoring = `                  })}
                </div>
            </div>

            {/* 7a. Safety & Security */}`;

const replacementFuelMonitoring = `                  })}
                </div>
            </div>

            {/* Fuel Monitoring System */}
            <div className="mb-[45px]">
                <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Fuel Monitoring System</h2>
                <div className="space-y-6">
                  {SAFETY_UPGRADE_OPTIONS.filter(opt => ['fuel-monitoring-system'].includes(opt.id)).map(option => {
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

            {/* 7a. Safety & Security */}`;

code = code.replace(targetStrFuelMonitoring, replacementFuelMonitoring);

const targetStrSafetySecurity = `                  {SAFETY_UPGRADE_OPTIONS.filter(opt => ['crash-barrier', 'fire-suppression'].includes(opt.id)).map(option => {
                    return (
                      <div key={option.id} className="flex flex-col">
                        <div onClick={() => onSafetyUpgradeToggle(option)} className={\`border rounded-lg p-4 cursor-pointer transition-all duration-300 \${selectedSafetyUpgrades.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400' : 'border-gray-300 hover:border-gray-400'}\`}>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className={\`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors \${selectedSafetyUpgrades.some(o => o.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'}\`}>
                                {selectedSafetyUpgrades.some(o => o.id === option.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className="font-medium text-gray-900">{option.name}</span>
                            </div>
                            <span className="font-medium text-gray-900">{showPrices ? formatPrice(option.price) : ''}</span>
                          </div>
                          <div className="w-full bg-white rounded-lg flex items-center justify-center overflow-hidden">
                            <img src={option.imageUrl || getSafetyImage(selectedTank, option.id)} alt={option.name} className="max-h-[150px] w-auto object-contain mix-blend-multiply" />
                          </div>
                        </div>
                        <div className="flex justify-center mt-3">
                          <button onClick={(e) => { e.stopPropagation(); setLearnMoreOption(option); }} className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">Learn More</button>
                        </div>
                      </div>
                    );
                  })}`;

const replacementSafetySecurity = `                  {SAFETY_UPGRADE_OPTIONS.filter(opt => ['crash-barrier', 'fire-suppression', '360-camera'].includes(opt.id)).map(option => {
                    return (
                      <div key={option.id} className="flex flex-col">
                        <div onClick={() => onSafetyUpgradeToggle(option)} className={\`border rounded-lg p-4 cursor-pointer transition-all duration-300 \${selectedSafetyUpgrades.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400' : 'border-gray-300 hover:border-gray-400'}\`}>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className={\`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors \${selectedSafetyUpgrades.some(o => o.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'}\`}>
                                {selectedSafetyUpgrades.some(o => o.id === option.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className="font-medium text-gray-900">{option.name}</span>
                            </div>
                            <span className="font-medium text-gray-900">{showPrices ? formatPrice(option.price) : ''}</span>
                          </div>
                          {(option.imageUrl || getSafetyImage(selectedTank, option.id)) ? (
                              <div className="w-full bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                <img src={option.imageUrl || getSafetyImage(selectedTank, option.id)} alt={option.name} className="max-h-[150px] w-auto object-contain mix-blend-multiply" />
                              </div>
                          ) : null}
                        </div>
                        <div className="flex justify-center mt-3">
                          <button onClick={(e) => { e.stopPropagation(); setLearnMoreOption(option); }} className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">Learn More</button>
                        </div>
                      </div>
                    );
                  })}`;

code = code.replace(targetStrSafetySecurity, replacementSafetySecurity);

fs.writeFileSync('components/Configurator.tsx', code);
