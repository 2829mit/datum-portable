const fs = require('fs');
let code = fs.readFileSync('components/Configurator.tsx', 'utf8');

const targetStr = `                        <div className="flex-grow flex justify-between items-center">
                          <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option.name}</p>
                          <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">
                            {showPrices ? formatPrice(option.price) : ''}
                          </p>
                        </div>`;

const replacementStr = `                        <div className="flex-grow flex justify-between items-center">
                          <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option.name}</p>
                          <div className="relative min-w-[60px] flex justify-end">
                              <span className={\`font-medium text-[14px] leading-[20px] text-[#171A20] transition-opacity duration-200 \${option.infoImageUrl ? 'group-hover:opacity-0' : ''}\`}>
                                  {showPrices ? formatPrice(option.price) : ''}
                              </span>
                              {option.infoImageUrl && (
                                <div role="button" onClick={(e) => { e.stopPropagation(); setLearnMoreOption(option); }} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-black hover:bg-black/10 rounded-full p-1" title="View Image">
                                  <InfoIcon />
                                </div>
                              )}
                          </div>
                        </div>`;

// Replace all occurrences of this target string (which applies to Fuel Monitoring System, Add-Ons, etc. to make it uniform for all SafetyUpgrades that might have an infoImageUrl)
code = code.split(targetStr).join(replacementStr);

fs.writeFileSync('components/Configurator.tsx', code);
