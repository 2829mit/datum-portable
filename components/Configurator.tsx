
import React, { useState, useRef, useEffect } from 'react';
import type { AccessoryOption, IotOption, TankOption, DispensingUnitOption, SafetyUpgradeOption, CustomerDetails, LicenseOption } from '../types';
import { 
  CONSUMPTION_OPTIONS, 
  TANK_OPTIONS, 
  REPOS_OS_OPTIONS, 
  DISPENSING_UNIT_OPTIONS, 
  MECHANICAL_INCLUSION_OPTIONS, 
  SAFETY_UPGRADE_OPTIONS, 
  LICENSE_OPTIONS, 
  SAFETY_UNIT_OPTIONS,
  RFD_Z_BASE_OPTIONS, RFD_Z_UPGRADE_OPTIONS,
  
  
  
  
  
  RFD_SENSORS_AND_CONTROLLER_OPTIONS,
  RFD_REPOS_OS_OPTIONS
} from '../constants';
import { getSafetyImage } from '../utils/vehicleHelpers';

interface ConfiguratorProps {
  customerDetails: CustomerDetails | null;
  paymentMode: 'outright' | 'installments';
  setPaymentMode: (mode: 'outright' | 'installments') => void;
  selectedTank: TankOption['id'];
  setSelectedTank: (tankId: TankOption['id']) => void;
  selectedReposOsOptions: AccessoryOption[];
  onReposOsToggle: (option: AccessoryOption) => void;
  selectedMechanicalInclusionOptions: AccessoryOption[];
  onMechanicalInclusionToggle: (option: AccessoryOption) => void;
  
  // Updated to Array for Multi-Select
  selectedDecantation: IotOption[];
  onDecantationToggle: (option: IotOption) => void;
  
  // Updated to Array for Multi-Select
  selectedDispensingUnits: DispensingUnitOption[];
  onDispensingUnitToggle: (option: DispensingUnitOption) => void;
  
  selectedSafetyUnits: AccessoryOption[];
  onSafetyUnitToggle: (option: AccessoryOption) => void;
  selectedSafetyUpgrades: SafetyUpgradeOption[];
  onSafetyUpgradeToggle: (option: SafetyUpgradeOption) => void;

  rfidTagsQuantity: number;
  setRfidTagsQuantity: (qty: number) => void;

  selectedLicenseOptions: LicenseOption[];
  onLicenseToggle: (option: LicenseOption) => void;
  selectedConsumption: string | null;
  onConsumptionSelect: (consumption: string) => void;
  
  totalContractValue: number; 
  gstAmount: number;
  finalPrice: number; 
  
  recommendedTankId: TankOption['id'] | null;
  showPrices: boolean;
  onResetConfiguration?: () => void;
  
  // Handlers for opening modals
  onOpenComparison: () => void;
  onOpenQuote: () => void;
  onCalculateRoi: () => void;

  // Custom Product Props
  selectedProduct?: 'rfd-portable' | 'rfd-z';
  setSelectedProduct?: (prod: 'rfd-portable' | 'rfd-z') => void;

  // RFD Z state
  rfdZBase?: string;
  setRfdZBase?: (val: string) => void;
  rfdZUpgrades?: string[];
  onRfdZUpgradeToggle?: (val: string) => void;
}

const ChevronUp: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDown: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Configurator: React.FC<ConfiguratorProps> = ({
  customerDetails,
  paymentMode,
  setPaymentMode,
  selectedTank,
  setSelectedTank,
  selectedReposOsOptions,
  onReposOsToggle,
  selectedMechanicalInclusionOptions,
  onMechanicalInclusionToggle,
  selectedDecantation,
  onDecantationToggle,
  selectedDispensingUnits,
  onDispensingUnitToggle,
  selectedSafetyUnits,
  onSafetyUnitToggle,
  selectedSafetyUpgrades,
  onSafetyUpgradeToggle,
  rfidTagsQuantity,
  setRfidTagsQuantity,
  selectedLicenseOptions = [],
  onLicenseToggle,
  selectedConsumption,
  onConsumptionSelect,
  
  totalContractValue,
  gstAmount,
  finalPrice,
  
  recommendedTankId,
  showPrices,
  onResetConfiguration,
  
  onOpenComparison,
  onOpenQuote,
  onCalculateRoi,

  // Custom Product Props
  selectedProduct = 'rfd-portable',
  setSelectedProduct,

  // RFD Z state
  rfdZBase = 'datum-2kl',
  setRfdZBase,
  rfdZUpgrades = [],
  onRfdZUpgradeToggle,
}) => {
  const [learnMoreOption, setLearnMoreOption] = useState<SafetyUpgradeOption | IotOption | AccessoryOption | null>(null);

  const [isStickyFooterVisible, setIsStickyFooterVisible] = useState(true);
  const [isPricingDetailsOpen, setIsPricingDetailsOpen] = useState(true);
  const [showIncludedOptions, setShowIncludedOptions] = useState(false);
  
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPrices) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyFooterVisible(!entry.isIntersecting);
      },
      { root: null, threshold: 0.1, rootMargin: "0px" }
    );

    const currentRef = pricingSectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [showPrices]);

  const formatCurrency = (amount: number) => {
    if (!showPrices) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPrice = (monthlyPrice: number) => {
    if (!showPrices) return '';
    if (paymentMode === 'outright') {
        const fullPrice = monthlyPrice * 36;
        return fullPrice === 0 ? formatCurrency(0) : `+${formatCurrency(fullPrice)}`;
    }
    return monthlyPrice === 0 ? formatCurrency(0) : `+${formatCurrency(monthlyPrice)}`;
  };
  
  const currentTank = TANK_OPTIONS.find(t => t.id === selectedTank);

  const tankBasePrice = currentTank ? currentTank.price : 0;

  // DETERMINE MULTIPLIER BASED ON PAYMENT MODE
  const multiplier = paymentMode === 'outright' ? 36 : 1;

  let pricingItems: { name: string; price: number }[] = [
    { name: `RPS Base Price (${currentTank?.name || ''} Tank)`, price: tankBasePrice * multiplier },
    ...selectedDispensingUnits.map(du => ({ name: du.name, price: du.price * multiplier })),
    ...selectedReposOsOptions.map(opt => ({ name: opt.name, price: opt.price * multiplier })),
    ...selectedDecantation.map(opt => ({ name: opt.name, price: opt.price * multiplier })),
    ...selectedMechanicalInclusionOptions.map(opt => ({ name: opt.name, price: opt.price * multiplier })),
    ...selectedSafetyUnits.map(opt => ({ name: opt.name, price: opt.price * multiplier })),
    ...selectedSafetyUpgrades
      .filter(opt => !(selectedTank === '30kl' && opt.id === 'advanced-skid'))
      .map(opt => ({ name: opt.name, price: opt.price * multiplier })),
    ...selectedLicenseOptions.map(opt => ({ name: opt.name, price: opt.price * multiplier })),
  ];

  if (rfidTagsQuantity > 0) {
    pricingItems.push({
      name: `RFID Tags (${rfidTagsQuantity} nos)`,
      price: (rfidTagsQuantity * 49) * multiplier
    });
  }

  // Hide Tank Base Price row from the list if desired
  pricingItems = pricingItems.filter(item => !item.name.includes('RPS Base Price'));

  const paidItems = pricingItems.filter(item => item.price > 0);
  const includedItems = pricingItems.filter(item => item.price === 0);

  const displayedPriceLabel = paymentMode === 'outright' 
    ? 'Total RPS Price (Inc. GST)' 
    : 'Monthly Payment (36 mo)';
  const footerPrice = finalPrice;
  
  const subtotalDisplay = paymentMode === 'outright' ? totalContractValue : finalPrice;
  const subtotalLabel = paymentMode === 'outright' ? 'Subtotal (Excl. GST)' : 'Total Monthly Payment';

  return (
    <div className="bg-white text-gray-800 lg:h-full h-auto flex flex-col relative lg:overflow-hidden">
      <div className="flex-grow lg:overflow-y-auto overflow-visible scroll-smooth pb-24">
        <div className="pb-6 md:pb-10">
          
          {/* Sticky Header Section with Clear Button */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 md:px-10 mb-6 flex justify-between items-center shadow-sm">
             <h1 className="text-xl md:text-2xl font-medium text-[#171A20]">Repos Fuel Datum</h1>
             {onResetConfiguration && (
               <button 
                 onClick={onResetConfiguration}
                 className="flex-shrink-0 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors uppercase tracking-wide shadow-sm"
               >
                 Clear All
               </button>
             )}
          </div>

          <div className="px-6 md:px-10">
            <div className="flex justify-around my-8 text-center mt-6">
              {[
                { label: 'Speed', value: '120L/m' },
                { label: 'Tracking', value: '100%' },
                { label: 'Monitoring', value: '24/7' },
              ].map(spec => (
                <div key={spec.label}>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">{spec.value}</p>
                  <p className="text-xs sm:text-[14px] leading-[20px] text-[#393C41] mt-1">{spec.label}</p>
                </div>
              ))}
            </div>

            {/* 1. Consumption */}
            <div className="mb-[45px]">
              <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Consumption</h2>
              <div className="space-y-4">
                {CONSUMPTION_OPTIONS.map(option => (
                  <button 
                      key={option}
                      onClick={() => onConsumptionSelect(option)}
                      className={`group relative w-full p-4 border rounded-lg text-left transition-all duration-300 ${
                        selectedConsumption === option 
                          ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' 
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                  >
                      <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">Consumption</p>
                            <p className="font-medium text-[12px] leading-[18px] text-[#5C5E62]">Monthly</p>
                          </div>
                          <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option}</p>
                      </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Datum Portable Capacity */}
            <div className="mb-[45px]">
              <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Datum Portable Capacity</h2>
              <div className="space-y-4">
                {TANK_OPTIONS.map(option => (
                    <button 
                        key={option.id}
                        onClick={() => setSelectedTank(option.id)}
                        className={`group relative w-full p-4 border rounded-lg text-left transition-all duration-300 ${
                          selectedTank === option.id 
                            ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' 
                            : 'border-gray-300 hover:border-gray-500'
                        }`}
                    >
                        {recommendedTankId === option.id && (
                            <div className="absolute top-0 right-0 text-white text-xs font-semibold z-10">
                                <div className="relative bg-blue-600 px-2.5 py-0.5 rounded-tr-lg shadow">Recommended</div>
                                <div className="absolute top-full left-0 w-0 h-0" style={{ borderStyle: 'solid', borderWidth: '0 6px 6px 0', borderColor: 'transparent #1d4ed8 transparent transparent' }} />
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option.name}</p>
                              {option.dimensions && <p className="font-medium text-[12px] leading-[18px] text-[#5C5E62]">{option.dimensions}</p>}
                            </div>
                        </div>
                        {selectedTank && selectedTank !== option.id && (
                            <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg transition-opacity duration-300 group-hover:opacity-0"></div>
                        )}
                    </button>
                ))}
              </div>
            </div>

            {/* Compare Features Button */}
            <div className="mb-[45px]">
                <button
                    onClick={onOpenComparison}
                    className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
                >
                    <span className="font-semibold text-gray-800">View & Compare Features</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* 4. Standard Inclusions */}
            <div className="mb-[45px]">
              <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Standard Inclusions</h2>
              <div className="space-y-2">
                {MECHANICAL_INCLUSION_OPTIONS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => onMechanicalInclusionToggle(option)}
                    className={`group w-full flex items-center p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 ${
                      selectedMechanicalInclusionOptions.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                      selectedMechanicalInclusionOptions.some(o => o.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                      {selectedMechanicalInclusionOptions.some(o => o.id === option.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-grow flex justify-between items-center">
                      <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option.name}</p>
                      <div className="relative min-w-[60px] flex justify-end">
                         <span className={`font-medium text-[14px] leading-[20px] text-[#171A20] transition-opacity duration-200 ${option.infoImageUrl ? 'group-hover:opacity-0' : ''}`}>
                             {showPrices ? formatPrice(option.price) : ''}
                         </span>
                         {option.infoImageUrl && (
                           <div role="button" onClick={(e) => { e.stopPropagation(); setLearnMoreOption(option); }} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-black hover:bg-black/10 rounded-full p-1" title="View Image">
                             <InfoIcon />
                           </div>
                         )}
                      </div>
                    </div>
                  </button>
                ))}

                {DISPENSING_UNIT_OPTIONS.map(option => (
                  <button
                    key={`dispensing-unit-${option.id}`}
                    onClick={() => onDispensingUnitToggle(option)}
                    className={`group relative w-full flex items-center p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 ${
                      selectedDispensingUnits.some(du => du.id === option.id)
                        ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                      selectedDispensingUnits.some(du => du.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                      {selectedDispensingUnits.some(du => du.id === option.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option.name}</p>
                          {option.subtext && <p className="font-medium text-[12px] leading-[18px] text-[#5C5E62]">{option.subtext}</p>}
                        </div>
                        <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">
                          {showPrices ? formatPrice(option.price) : ''}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}

                {SAFETY_UNIT_OPTIONS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => onSafetyUnitToggle(option)}
                    className={`group w-full flex items-center p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 ${
                      selectedSafetyUnits.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                      selectedSafetyUnits.some(o => o.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                      {selectedSafetyUnits.some(o => o.id === option.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-grow flex justify-between items-center">
                      <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option.name}</p>
                      <div className="relative min-w-[60px] flex justify-end">
                          <span className={`font-medium text-[14px] leading-[20px] text-[#171A20] transition-opacity duration-200 ${option.infoImageUrl ? 'group-hover:opacity-0' : ''}`}>
                              {showPrices ? formatPrice(option.price) : ''}
                          </span>
                          {option.infoImageUrl && (
                            <div role="button" onClick={(e) => { e.stopPropagation(); setLearnMoreOption(option); }} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-black hover:bg-black/10 rounded-full p-1" title="View Image">
                              <InfoIcon />
                            </div>
                          )}
                      </div>
                    </div>
                  </button>
                ))}
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
                        className={`group w-full flex items-center p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 ${
                          selectedSafetyUpgrades.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                          selectedSafetyUpgrades.some(o => o.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                        }`}>
                          {selectedSafetyUpgrades.some(o => o.id === option.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-grow flex justify-between items-center">
                          <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option.name}</p>
                          <div className="relative min-w-[60px] flex justify-end">
                              <span className={`font-medium text-[14px] leading-[20px] text-[#171A20] transition-opacity duration-200 ${option.infoImageUrl ? 'group-hover:opacity-0' : ''}`}>
                                  {showPrices ? formatPrice(option.price) : ''}
                              </span>
                              {option.infoImageUrl && (
                                <div role="button" onClick={(e) => { e.stopPropagation(); setLearnMoreOption(option); }} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-black hover:bg-black/10 rounded-full p-1" title="View Image">
                                  <InfoIcon />
                                </div>
                              )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
            </div>

            {/* Safety & Security */}
            <div className="mb-[45px]">
                <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Safety & Security</h2>
                <div className="space-y-6">
                  {SAFETY_UPGRADE_OPTIONS.filter(opt => opt.id === 'safety-security-system').map(option => {
                    const isSelected = selectedSafetyUpgrades.some(o => o.id === option.id);
                    return (
                      <div key={option.id} className={`border rounded-lg transition-all duration-300 ${isSelected ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}>
                        <button
                          onClick={() => onSafetyUpgradeToggle(option)}
                          className="group w-full flex items-center p-4 text-left cursor-pointer transition-all duration-300"
                        >
                          <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                            isSelected ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                          }`}>
                            {isSelected && (
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
                        
                        {/* Flap showing small squares for included safety options */}
                        <div className="px-4 pb-4 pt-1 border-t border-gray-200/60 mt-1">
                          <p className="text-xs text-gray-500 mb-2 font-medium">Included Safety & Security Components:</p>
                          <div className="grid grid-cols-3 gap-3">
                            {/* Crash Barrier */}
                            <div className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-between relative shadow-sm text-center select-none transition-colors ${isSelected ? 'border-emerald-200 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                              {isSelected && (
                                <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full" title="Included">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className={`w-full flex-grow flex items-center justify-center mt-2 transition-opacity ${isSelected ? '' : 'opacity-60'}`}>
                                <img src="https://drf-media-data.s3.ap-south-1.amazonaws.com/compressor_aws/ShortPixelOptimized/3.png" alt="Crash Barrier" className="max-h-12 w-auto object-contain mix-blend-multiply" />
                              </div>
                              <span className={`text-[11px] leading-tight font-semibold mb-1 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>Crash Barrier</span>
                            </div>

                            {/* Fire Suppression */}
                            <div className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-between relative shadow-sm text-center select-none transition-colors ${isSelected ? 'border-emerald-200 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                              {isSelected && (
                                <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full" title="Included">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className={`w-full flex-grow flex items-center justify-center mt-2 transition-opacity ${isSelected ? '' : 'opacity-60'}`}>
                                <img src="https://drf-media-data.s3.ap-south-1.amazonaws.com/compressor_aws/ShortPixelOptimized/2.png" alt="Fire Suppression" className="max-h-12 w-auto object-contain mix-blend-multiply" />
                              </div>
                              <span className={`text-[11px] leading-tight font-semibold mb-1 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>Fire Suppression</span>
                            </div>

                            {/* 360° Camera */}
                            <div className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-between relative shadow-sm text-center select-none transition-colors ${isSelected ? 'border-emerald-200 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                              {isSelected && (
                                <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full" title="Included">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className={`w-full flex-grow flex items-center justify-center mt-2 ${isSelected ? 'text-gray-700' : 'text-gray-400'}`}>
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className={`text-[11px] leading-tight font-semibold mb-1 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>360° Camera</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>

            {/* Secure Fueling System */}
            <div className="mb-[45px]">
                <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Secure Fueling System</h2>
                <div className="space-y-6">
                  {(() => {
                    const is1Selected = selectedSafetyUpgrades.some(o => o.id === 'secure-fueling-1');
                    const is2Selected = selectedSafetyUpgrades.some(o => o.id === 'secure-fueling-2');
                    const isAnySelected = is1Selected || is2Selected;
                    
                    const option1Obj = SAFETY_UPGRADE_OPTIONS.find(o => o.id === 'secure-fueling-1');
                    const option2Obj = SAFETY_UPGRADE_OPTIONS.find(o => o.id === 'secure-fueling-2');
                    
                    const currentPrice = (is1Selected ? 49999 / 36 : 0) + (is2Selected ? 100000 / 36 : 0);

                    const handleMainToggle = () => {
                      if (isAnySelected) {
                        if (is1Selected && option1Obj) onSafetyUpgradeToggle(option1Obj);
                        if (is2Selected && option2Obj) onSafetyUpgradeToggle(option2Obj);
                      } else {
                        if (option1Obj) onSafetyUpgradeToggle(option1Obj);
                        if (option2Obj) onSafetyUpgradeToggle(option2Obj);
                      }
                    };

                    return (
                      <div className={`border rounded-lg transition-all duration-300 ${isAnySelected ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}>
                        <button
                          onClick={handleMainToggle}
                          className="group w-full flex items-center p-4 text-left cursor-pointer transition-all duration-300"
                        >
                          <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                            isAnySelected ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                          }`}>
                            {isAnySelected && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-grow flex justify-between items-center">
                            <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">Secure Fuelling System</p>
                            <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">
                              {showPrices && currentPrice > 0 ? formatPrice(currentPrice) : ''}
                            </p>
                          </div>
                        </button>

                        <div className="px-4 pb-4 pt-1 border-t border-gray-200/60 mt-1">
                          <p className="text-xs text-gray-500 mb-2 font-medium">Included Options:</p>
                          <div className="grid grid-cols-3 gap-3">
                            {/* 1-Active Tag */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (option1Obj) onSafetyUpgradeToggle(option1Obj);
                              }}
                              className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-between relative shadow-sm text-center select-none cursor-pointer transition-colors ${
                                is1Selected ? 'border-emerald-200 bg-white' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                              }`}
                            >
                              {is1Selected && (
                                <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full" title="Included">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className={`w-full flex-grow flex items-center justify-center mt-2 ${is1Selected ? 'text-gray-700' : 'text-gray-400'}`}>
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className={`text-[11px] leading-tight font-semibold mb-0.5 ${is1Selected ? 'text-gray-800' : 'text-gray-500'}`}>1-Active Tag</span>
                                <span className={`text-[9px] font-medium ${is1Selected ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {is1Selected ? (showPrices ? formatPrice(49999/36) : 'Included') : 'Add (+₹49,999)'}
                                </span>
                              </div>
                            </div>

                            {/* 2-Active Tag */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (option2Obj) onSafetyUpgradeToggle(option2Obj);
                              }}
                              className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-between relative shadow-sm text-center select-none cursor-pointer transition-colors ${
                                is2Selected ? 'border-emerald-200 bg-white' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                              }`}
                            >
                              {is2Selected && (
                                <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full" title="Included">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className={`w-full flex-grow flex items-center justify-center mt-2 ${is2Selected ? 'text-gray-700' : 'text-gray-400'}`}>
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className={`text-[11px] leading-tight font-semibold mb-0.5 ${is2Selected ? 'text-gray-800' : 'text-gray-500'}`}>2-Active Tag</span>
                                <span className={`text-[9px] font-medium ${is2Selected ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {is2Selected ? (showPrices ? formatPrice(100000/36) : 'Included') : 'Add (+₹1,00,000)'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* RFID Tags Numeric Option */}
                  <div className={`group w-full p-4 border border-gray-300 rounded-lg transition-all duration-300 bg-white hover:border-gray-400`}>
                    <div className="flex justify-between items-center">
                       <span className="font-medium text-[14px] leading-[20px] text-[#171A20]">RFID Tags</span>
                       <div className="flex items-center gap-4">
                          <span className="font-medium text-[14px] leading-[20px] text-[#171A20]">{showPrices ? formatPrice(rfidTagsQuantity * 49) : ''}</span>
                          <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 overflow-hidden">
                             <button 
                               onClick={() => setRfidTagsQuantity(Math.max(0, rfidTagsQuantity - 1))}
                               className="px-3 py-1 bg-white hover:bg-gray-100 text-gray-800 font-bold border-r border-gray-200"
                             >
                               -
                             </button>
                             <input 
                               type="number" 
                               min="0"
                               value={rfidTagsQuantity}
                               onChange={(e) => setRfidTagsQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                               className="w-12 text-center bg-transparent text-sm font-semibold outline-none py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                             />
                             <button 
                               onClick={() => setRfidTagsQuantity(rfidTagsQuantity + 1)}
                               className="px-3 py-1 bg-white hover:bg-gray-100 text-gray-800 font-bold border-l border-gray-200"
                             >
                               +
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
            </div>

            {/* Repos OS */}
            <div className="mb-[45px]">
              <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Repos OS</h2>
              <div className="space-y-6">
                {(() => {
                  const isAnySelected = selectedReposOsOptions.length > 0;
                  
                  const handleMainToggle = () => {
                    if (isAnySelected) {
                      REPOS_OS_OPTIONS.forEach(opt => {
                        if (selectedReposOsOptions.some(so => so.id === opt.id)) onReposOsToggle(opt);
                      });
                    } else {
                      REPOS_OS_OPTIONS.forEach(opt => {
                        if (!selectedReposOsOptions.some(so => so.id === opt.id)) onReposOsToggle(opt);
                      });
                    }
                  };

                  return (
                    <div className={`border rounded-lg transition-all duration-300 ${isAnySelected ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <button
                        onClick={handleMainToggle}
                        className="group w-full flex items-center p-4 text-left cursor-pointer transition-all duration-300"
                      >
                        <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                          isAnySelected ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                        }`}>
                          {isAnySelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-grow flex justify-between items-center">
                          <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">Repos OS</p>
                          <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">
                            {showPrices ? 'Included' : ''}
                          </p>
                        </div>
                      </button>

                      <div className="px-4 pb-4 pt-1 border-t border-gray-200/60 mt-1">
                        <p className="text-xs text-gray-500 mb-2 font-medium">Included Software Options:</p>
                        <div className="grid grid-cols-3 gap-3">
                          {REPOS_OS_OPTIONS.map((option, idx) => {
                            const isSelected = selectedReposOsOptions.some(o => o.id === option.id);
                            return (
                              <div 
                                key={option.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onReposOsToggle(option);
                                }}
                                className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-between relative shadow-sm text-center select-none cursor-pointer transition-colors ${
                                  isSelected ? 'border-emerald-200 bg-white' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                                }`}
                              >
                                {isSelected && (
                                  <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full" title="Included">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                )}
                                <div className={`w-full flex-grow flex items-center justify-center mt-2 ${isSelected ? 'text-gray-700' : 'text-gray-400'}`}>
                                  {idx === 0 && (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                  )}
                                  {idx === 1 && (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                  )}
                                  {idx === 2 && (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className={`text-[11px] leading-tight font-semibold mb-0.5 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>{option.name}</span>
                                  <span className={`text-[9px] font-medium ${isSelected ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {isSelected ? 'Included' : 'Add'}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Installation & Commissioning */}
            <div className="mb-[45px]">
                <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Installation & Commissioning</h2>
                <div className="space-y-6">
                  {(() => {
                    const isInstallationSelected = selectedSafetyUpgrades.some(o => o.id === 'installation-commissioning');
                    const isErpSelected = selectedSafetyUpgrades.some(o => o.id === 'erp-integration');
                    
                    const mainOptionObj = SAFETY_UPGRADE_OPTIONS.find(o => o.id === 'installation-commissioning');
                    const erpOptionObj = SAFETY_UPGRADE_OPTIONS.find(o => o.id === 'erp-integration');
                    
                    const currentPrice = (isInstallationSelected
                      ? (99999 + (isErpSelected ? 99999 : 0)) / 36
                      : (99999 + 99999) / 36);

                    const handleMainToggle = () => {
                      if (isInstallationSelected) {
                        // Deselect both
                        if (mainOptionObj) onSafetyUpgradeToggle(mainOptionObj);
                        if (isErpSelected && erpOptionObj) onSafetyUpgradeToggle(erpOptionObj);
                      } else {
                        // Select both by default
                        if (mainOptionObj) onSafetyUpgradeToggle(mainOptionObj);
                        if (!isErpSelected && erpOptionObj) onSafetyUpgradeToggle(erpOptionObj);
                      }
                    };

                    return (
                      <div className={`border rounded-lg transition-all duration-300 ${isInstallationSelected ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}>
                        <button
                          onClick={handleMainToggle}
                          className="group w-full flex items-center p-4 text-left cursor-pointer transition-all duration-300"
                        >
                          <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                            isInstallationSelected ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                          }`}>
                            {isInstallationSelected && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-grow flex justify-between items-center">
                            <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">Installation & Commissioning</p>
                            <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">
                              {showPrices ? formatPrice(currentPrice) : ''}
                            </p>
                          </div>
                        </button>

                        {/* Flap showing inclusions: Installation & Commissioning, ERP Integration */}
                        <div className="px-4 pb-4 pt-1 border-t border-gray-200/60 mt-1">
                          <p className="text-xs text-gray-500 mb-2 font-medium">Included Services:</p>
                          <div className="grid grid-cols-3 gap-3">
                            {/* Mandatory Installation & Commissioning */}
                            <div className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-between relative shadow-sm text-center select-none transition-colors ${isInstallationSelected ? 'border-emerald-200 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                              {isInstallationSelected && (
                                <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full" title="Included">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className={`w-full flex-grow flex items-center justify-center mt-2 ${isInstallationSelected ? 'text-gray-700' : 'text-gray-400'}`}>
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <span className={`text-[11px] leading-tight font-semibold mb-1 ${isInstallationSelected ? 'text-gray-800' : 'text-gray-500'}`}>Installation & Commissioning</span>
                            </div>

                            {/* ERP Integration (Toggleable) */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (erpOptionObj) onSafetyUpgradeToggle(erpOptionObj);
                              }}
                              className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-between relative shadow-sm text-center select-none cursor-pointer transition-colors ${
                                isErpSelected ? 'border-emerald-200 bg-white' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                              }`}
                            >
                              {isErpSelected && (
                                <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full" title="Included">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className={`w-full flex-grow flex items-center justify-center mt-2 ${isErpSelected ? 'text-gray-700' : 'text-gray-400'}`}>
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                </svg>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className={`text-[11px] leading-tight font-semibold mb-0.5 ${isErpSelected ? 'text-gray-800' : 'text-gray-500'}`}>ERP Integration</span>
                                <span className={`text-[9px] font-medium ${isErpSelected ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {isErpSelected ? (showPrices ? formatPrice(99999/36) : 'Included') : 'Add (+₹99,999)'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
            </div>

            {/* Licenses and Compliances */}
            <div className="mb-[45px]">
              <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Licenses and Compliances</h2>
              <div className="space-y-3 mt-6">
                {LICENSE_OPTIONS.map(option => (
                  <div key={`license-${option.id}`} className={`border rounded-lg transition-all duration-300 ${selectedLicenseOptions.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <button
                      onClick={() => onLicenseToggle(option)}
                      className="group w-full flex items-center p-4 text-left cursor-pointer transition-all duration-300"
                    >
                      <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                        selectedLicenseOptions.some(o => o.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                      }`}>
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
                    <div className="px-4 pb-4 pt-1 border-t border-gray-200/60 mt-1">
                      <p className="text-xs text-gray-500 mb-2 font-medium">Included Services:</p>
                      <div className="grid grid-cols-3 gap-3">
                        {['PESO Drawing Creation', 'PESO Prior Approval & Site Inspection', 'PESO final Grant - Form XIV', 'Tank & Nozzle Calibration'].map((point, idx) => {
                          const isSelected = selectedLicenseOptions.some(o => o.id === option.id);
                          return (
                            <div key={idx} className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-between relative shadow-sm text-center select-none transition-colors ${isSelected ? 'border-emerald-200 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                              {isSelected && (
                                <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full" title="Included">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className={`w-full flex-grow flex items-center justify-center mt-2 ${isSelected ? 'text-gray-700' : 'text-gray-400'}`}>
                                {idx === 0 && (
                                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                )}
                                {idx === 1 && (
                                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                  </svg>
                                )}
                                {idx === 2 && (
                                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                  </svg>
                                )}
                                {idx === 3 && (
                                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-[11px] leading-tight font-semibold mb-1 px-1 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>{point}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessories (formerly Add-Ons, moved to last section) */}
            <div className="mb-[45px]">
                <h2 className="font-medium text-[20px] leading-[28px] text-[#171A20] mb-3 text-center">Accessories</h2>
                <div className="space-y-6">
                  {SAFETY_UPGRADE_OPTIONS.filter(opt => ['advanced-skid', 'backup-du'].includes(opt.id) && !(selectedTank === '30kl' && opt.id === 'advanced-skid')).map(option => {
                    return (
                      <button
                        key={option.id}
                        onClick={() => onSafetyUpgradeToggle(option)}
                        className={`group w-full flex items-center p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 ${
                          selectedSafetyUpgrades.some(o => o.id === option.id) ? 'border-gray-400 ring-1 ring-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <div className={`h-5 w-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors mr-3 ${
                          selectedSafetyUpgrades.some(o => o.id === option.id) ? 'bg-gray-600 border-gray-600' : 'bg-white border-gray-300'
                        }`}>
                          {selectedSafetyUpgrades.some(o => o.id === option.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-grow flex justify-between items-center">
                          <p className="font-medium text-[14px] leading-[20px] text-[#171A20]">{option.name}</p>
                          <div className="relative min-w-[60px] flex justify-end">
                              <span className={`font-medium text-[14px] leading-[20px] text-[#171A20] transition-opacity duration-200 ${option.infoImageUrl ? 'group-hover:opacity-0' : ''}`}>
                                  {showPrices ? formatPrice(option.price) : ''}
                              </span>
                              {option.infoImageUrl && (
                                <div role="button" onClick={(e) => { e.stopPropagation(); setLearnMoreOption(option); }} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-black hover:bg-black/10 rounded-full p-1" title="View Image">
                                  <InfoIcon />
                                </div>
                              )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
            </div>

            {/* Pricing Breakdown */}

            {showPrices ? (
              <div ref={pricingSectionRef} className="pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6 cursor-pointer group select-none" onClick={() => setIsPricingDetailsOpen(!isPricingDetailsOpen)}>
                  <h2 className="text-xl font-medium text-gray-900">Pricing Details</h2>
                  <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                          <span className={`${paymentMode === 'installments' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Monthly</span>
                          <button onClick={(e) => { e.stopPropagation(); setPaymentMode(paymentMode === 'installments' ? 'outright' : 'installments'); }} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${paymentMode === 'outright' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${paymentMode === 'outright' ? 'translate-x-5' : 'translate-x-1'}`} />
                          </button>
                          <span className={`${paymentMode === 'outright' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Full Price</span>
                      </div>

                      <div className="p-1 rounded-full group-hover:bg-gray-100 transition-colors">{isPricingDetailsOpen ? <ChevronUp /> : <ChevronDown />}</div>
                  </div>
                </div>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isPricingDetailsOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-3 text-sm text-gray-600 mb-8">
                      {paidItems.map((item, idx) => (
                        <div key={`paid-${idx}`} className="flex justify-between">
                          <span>{item.name}</span>
                          <span>{formatCurrency(item.price)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 my-3 pt-3">
                          <div className="flex justify-between font-semibold text-gray-800">
                              <span>{subtotalLabel}</span>
                              <span>{formatCurrency(subtotalDisplay)}</span>
                          </div>
                          {paymentMode === 'outright' && (
                            <div className="flex justify-between text-gray-600 mt-1">
                                <span>GST (18%)</span>
                                <span>{formatCurrency(gstAmount)}</span>
                            </div>
                          )}
                          {paymentMode === 'installments' && (
                             <>
                               <div className="flex justify-between text-blue-600 font-medium mt-2 text-sm">
                                  <span>Down Payment (GST Amount)</span>
                                  <span>{formatCurrency(gstAmount)}</span>
                               </div>
                               <div className="flex justify-between text-gray-600 mt-1 text-sm">
                                  <span>Tenure</span>
                                  <span>36 Months</span>
                               </div>
                               <div className="mt-2 text-xs text-gray-500 italic text-right">Subject to approval from Partnered Bank</div>
                             </>
                          )}
                      </div>
                      {includedItems.length > 0 && (
                        <div className="mt-4 border-t border-gray-100 pt-2">
                           <button onClick={() => setShowIncludedOptions(!showIncludedOptions)} className="flex items-center text-xs font-medium text-gray-500 hover:text-gray-800 mb-2">
                             {showIncludedOptions ? 'Hide included features' : 'Show included features'}
                             <span className="ml-1">{showIncludedOptions ? <ChevronUp /> : <ChevronDown />}</span>
                           </button>
                           <div className={`space-y-2 pl-2 transition-all duration-300 overflow-hidden ${showIncludedOptions ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                             {includedItems.map((item, idx) => (
                               <div key={`inc-${idx}`} className="flex justify-between text-gray-500">
                                 <span>{item.name}</span>
                                 <span>Included</span>
                               </div>
                             ))}
                           </div>
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-8">
                     <span className="text-lg font-semibold text-gray-900">{displayedPriceLabel}</span>
                     <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">{formatCurrency(finalPrice)}</span>
                        {paymentMode === 'outright' && <p className="text-xs text-gray-500 font-normal">Inclusive of GST</p>}
                     </div>
                </div>
                <div className="flex gap-4 flex-col sm:flex-row">
                     <button 
                       onClick={onCalculateRoi} 
                       className="flex-1 py-3 px-4 rounded text-sm font-semibold transition-colors bg-gray-100 text-gray-800 hover:bg-gray-200"
                     >
                       Calculate ROI
                     </button>
                     <button onClick={onOpenQuote} className="flex-1 py-3 px-4 rounded text-sm font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700">View Quote</button>
                </div>
              </div>
            ) : (
              <div className="pt-8 border-t border-gray-200 mb-8">
                  <div className="flex gap-4 flex-col sm:flex-row">
                     <button className="w-full py-3 px-4 rounded text-sm font-semibold bg-blue-600 text-white transition-colors hover:bg-blue-700" onClick={onCalculateRoi}>Calculate ROI</button>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showPrices && (
        <div className={`fixed bottom-0 left-0 right-0 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 p-4 z-20 w-full pointer-events-none transition-transform duration-300 ease-in-out ${isStickyFooterVisible ? 'translate-y-0' : 'translate-y-[120%]'}`}>
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 pointer-events-auto">
             <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{formatCurrency(footerPrice)}</p>
                  {paymentMode === 'installments' && <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Per Month</p>}
                </div>
                <button onClick={onOpenQuote} className="bg-blue-600 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-md text-sm sm:text-base font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">View Quote</button>
             </div>
          </div>
        </div>
      )}
      {learnMoreOption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setLearnMoreOption(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLearnMoreOption(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center">{learnMoreOption.name}</h3>
            {((learnMoreOption as any).infoImageUrl || (learnMoreOption as any).imageUrl || ((learnMoreOption as any).id?.includes('fire')) || ((learnMoreOption as any).id?.includes('crash'))) ? (
               <div className="flex justify-center mb-6"><img src={(learnMoreOption as any).infoImageUrl || ((learnMoreOption as SafetyUpgradeOption).id.includes('fire') || (learnMoreOption as SafetyUpgradeOption).id.includes('crash') ? getSafetyImage(selectedTank, (learnMoreOption as SafetyUpgradeOption).id) : (learnMoreOption as any).imageUrl)} alt={learnMoreOption.name} className="max-h-64 object-contain" /></div>
            ) : null}
            <p className="text-gray-600 text-center leading-relaxed">{(learnMoreOption as any).description || 'No description available.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configurator;
