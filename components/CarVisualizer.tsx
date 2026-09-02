
import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { TankOption, AccessoryOption, DispensingUnitOption, SafetyUpgradeOption, IotOption } from '../types';
import { getVisualizerLayers } from '../utils/vehicleHelpers';

const TECH_IMAGE_MAP: Record<string, string> = {
  'reports-analytics': 'https://drf-media-data.s3.ap-south-1.amazonaws.com/RFD-Z/report.png',
  'real-time-inventory': 'https://i.postimg.cc/hGvGNNMR/Fuel-level-rps.png',
  'fuel-level-sensors': 'https://i.postimg.cc/hGvGNNMR/Fuel-level-rps.png',
  'leak-detection-system': 'https://i.postimg.cc/N0F0ZZbq/RPS-leak-detetion.png',
  'fire-suppression': 'https://i.postimg.cc/s2x2bbm0/Fire-detected.png',
  'fuel-monitoring-system': 'https://i.postimg.cc/hGvGNNMR/Fuel-level-rps.png',
  'fuel-monitoring': 'https://i.postimg.cc/MpmcRSd7/app-ratg-(1).png',
  'safety-security': 'https://i.postimg.cc/Njc95M79/app-afs-(1).png',
  'rfid-tags': 'https://i.postimg.cc/PJxXLCSf/RFID.png',
};

interface CarVisualizerProps {
  tank: TankOption['id'];
  mechanicalOptions?: AccessoryOption[];
  dispensingUnits?: DispensingUnitOption[];
  safetyUnits?: AccessoryOption[];
  safetyUpgrades: SafetyUpgradeOption[];
  decantation?: IotOption[];
  reposOsOptions?: AccessoryOption[];
  hasPlatform?: boolean;
  rfidTagsQuantity?: number;

  // Custom Product Props
  selectedProduct?: 'rfd-portable' | 'rfd-z';
  rfdZBase?: string;
  rfdZUpgrades?: string[];
  techSelectionHistory?: string[];
}

const CarVisualizer: React.FC<CarVisualizerProps> = ({ 
  tank, 
  mechanicalOptions = [], 
  dispensingUnits = [], 
  safetyUnits = [], 
  safetyUpgrades,
  decantation = [],
  reposOsOptions = [],
  hasPlatform = false,
  rfidTagsQuantity = 0,

  selectedProduct = 'rfd-portable',
  rfdZBase = '',
  rfdZUpgrades = [] as string[],
  techSelectionHistory = [],
}) => {
  const s3BaseUrl = 'https://drf-media-data.s3.ap-south-1.amazonaws.com/compressor_aws/ShortPixelOptimized/';

  useEffect(() => {
    Object.values(TECH_IMAGE_MAP).forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const getRfdZLayers = () => {
    const images: { url: string; order: number }[] = [];
    
    // Bottom most image
    images.push({ url: 'https://i.postimg.cc/SKk5P9yG/fullll-datummm.png', order: 2 });

    if (rfdZBase === 'datum-2kl') {
      images.push({ url: 'https://drf-media-data.s3.ap-south-1.amazonaws.com/RFD-Z/3-Fire-Screen-common%20(1).png', order: 3 });
      images.push({ url: 'https://drf-media-data.s3.ap-south-1.amazonaws.com/RFD-Z/1-TANK-2kl%20(1).png', order: 4 });
    }

    if (rfdZUpgrades?.includes('fuel-monitoring')) {
      images.push({ url: 'https://drf-media-data.s3.ap-south-1.amazonaws.com/RFD-Z/2-tank%20ratg-2kl%20(1).png', order: 6 });
    }

    if (rfdZUpgrades?.includes('safety-security')) {
      images.push({ url: 'https://drf-media-data.s3.ap-south-1.amazonaws.com/RFD-Z/4-AFSS-common%20(1).png', order: 7 });
      images.push({ url: 'https://drf-media-data.s3.ap-south-1.amazonaws.com/RFD-Z/8-Camera-common%20(1).png', order: 11 });
      images.push({ url: 'https://i.postimg.cc/rwMDHYjh/fire-bucket-sales-website.png', order: 1 });
      images.push({ url: 'https://i.postimg.cc/qMwWdN0S/manhole-assembly2.png', order: 4 });
    }

    if (rfdZUpgrades?.includes('lm-stamping')) {
      images.push({ url: 'https://drf-media-data.s3.ap-south-1.amazonaws.com/RFD-Z/6-Filteration-common%20(1).png', order: 9 });
      images.push({ url: 'https://drf-media-data.s3.ap-south-1.amazonaws.com/RFD-Z/5-Dispenser-common%20(1).png', order: 8 });
      images.push({ url: 'https://i.postimg.cc/NFMsyKds/5-litre-jar-test.png', order: 23 });
    }

    if (rfdZUpgrades?.includes('secure-fueling')) {
      images.push({ url: 'https://drf-media-data.s3.ap-south-1.amazonaws.com/RFD-Z/7-RFID-common%20(1).png', order: 10 });
      images.push({ url: 'https://i.postimg.cc/PJxXLCSf/RFID.png', order: 24 });
    }

    if (rfdZUpgrades?.includes('packing-forwarding')) {
      images.push({ url: 'https://i.postimg.cc/bY1Nj9ZJ/pakced-datum.png', order: 12 });
    }

    if (rfdZUpgrades?.includes('transportation')) {
      // No image for transportation
    }

    const sortedImages = images
      .sort((a, b) => a.order - b.order)
      .map(item => item.url);

    return sortedImages;
  };

  const layers = selectedProduct === 'rfd-z'
    ? getRfdZLayers()
    : getVisualizerLayers(
        tank, 
        mechanicalOptions, 
        dispensingUnits, 
        safetyUnits, 
        safetyUpgrades, 
        decantation,
        hasPlatform
      );

  const activeOptionIds = useMemo(() => {
    const activeIds: string[] = [];
    if (selectedProduct === 'rfd-z') {
      rfdZUpgrades.forEach(id => activeIds.push(id));
    } else {
      reposOsOptions.forEach(opt => activeIds.push(opt.id));
      safetyUnits.forEach(opt => activeIds.push(opt.id));
      safetyUpgrades.forEach(opt => activeIds.push(opt.id));
      if (rfidTagsQuantity > 0) {
        activeIds.push('rfid-tags');
      }
    }
    return activeIds;
  }, [selectedProduct, rfdZUpgrades, reposOsOptions, safetyUnits, safetyUpgrades, rfidTagsQuantity]);

  const techImages = useMemo(() => {
    // Keep active options in the order they were selected in techSelectionHistory
    const activeHistory = techSelectionHistory.filter(
      id => activeOptionIds.includes(id) && TECH_IMAGE_MAP[id]
    );

    // Any active option with a tech image mapping not yet in history gets appended
    const missingActive = activeOptionIds.filter(
      id => TECH_IMAGE_MAP[id] && !activeHistory.includes(id)
    );

    const orderedIds = [...activeHistory, ...missingActive];

    return Array.from(new Set(orderedIds.map(id => TECH_IMAGE_MAP[id])));
  }, [techSelectionHistory, activeOptionIds]);

  const hasTechImage = techImages.length > 0;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-white overflow-hidden group">
      {/* Tech Images (Background) */}
      {techImages.map((imgUrl, idx) => (
        <motion.img
          key={`tech-${imgUrl}`}
          src={imgUrl}
          alt={`Tech Layer ${idx}`}
          className="absolute inset-0 object-contain w-full h-full"
          style={{ zIndex: 10 + idx }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      ))}

      {/* Hardware Images (Foreground, scales down if tech images are present) */}
      <motion.div 
        className="relative flex items-center justify-center"
        initial={false}
        animate={{ 
          width: hasTechImage ? '65%' : '83.333333%',
          height: hasTechImage ? '65%' : '83.333333%',
          y: hasTechImage ? '10%' : '0%', // slight shift down
          x: hasTechImage ? '-12%' : '0%', // shift left to balance the phone on the right
        }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
        style={{ zIndex: 50 }} // hardware is always in front
      >
        {layers.map((layerUrl, index) => {
          const isDatumDoor = layerUrl.includes('10-Datum%20open%20door');
          
          return (
            <motion.img
                key={`${layerUrl}-${index}`}
                src={layerUrl}
                alt={`Configuration Layer ${index}`}
                className="absolute inset-0 object-contain w-full h-full"
                style={{ zIndex: index * 10 }}
                initial={isDatumDoor ? { opacity: 0, scale: 0.8, x: 20 } : { opacity: 0 }}
                animate={isDatumDoor ? { opacity: 1, scale: 1, x: 0 } : { opacity: 1 }}
                transition={isDatumDoor ? { type: "spring", stiffness: 200, damping: 20, delay: 0.1 } : { duration: 0.3 }}
            />
          );
        })}
        {layers.length === 0 && (
             <p className="text-gray-400">Loading Configuration...</p>
        )}
      </motion.div>
    </div>
  );
};

export default CarVisualizer;
