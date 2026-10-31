const fs = require('fs');
let code = fs.readFileSync('constants.ts', 'utf8');

const targetStr = `export const SAFETY_UNIT_OPTIONS: AccessoryOption[] = [
  { 
    id: 'fuel-level-sensors', 
    name: 'Fuel Level Sensors', 
    price: 0,
    infoImageUrl: 'https://res.cloudinary.com/dt8jmqu8d/image/upload/v1764951508/RATG_sensor_pe2a55.png',
    description: 'High-precision ATG (Automatic Tank Gauge) sensors for real-time fuel inventory monitoring and leak detection.'
  }, 
  {`;

const replacementStr = `export const SAFETY_UNIT_OPTIONS: AccessoryOption[] = [
  {`;

code = code.replace(targetStr, replacementStr);

const targetStr2 = `  {
    id: 'fuel-monitoring-system',
    name: 'Fuel level Sensor',
    price: 99999 / 36,
    imageUrl: ''
  },`;

const replacementStr2 = `  {
    id: 'fuel-monitoring-system',
    name: 'Fuel level Sensor',
    price: 99999 / 36,
    imageUrl: '',
    infoImageUrl: 'https://res.cloudinary.com/dt8jmqu8d/image/upload/v1764951508/RATG_sensor_pe2a55.png',
    description: 'High-precision ATG (Automatic Tank Gauge) sensors for real-time fuel inventory monitoring and leak detection.'
  },`;

code = code.replace(targetStr2, replacementStr2);

fs.writeFileSync('constants.ts', code);
