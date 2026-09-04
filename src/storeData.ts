import { Product, StoreOrder } from './types';

export const initialProducts: Product[] = [
  // 1. Light
  {
    id: 'prod-light-1',
    name: 'Industrial LED High Bay Light 150W (IP65)',
    category: 'Light',
    wholesalePriceBdt: 2450,
    retailPriceBdt: 3600,
    weightKg: 2.8,
    moq: 5,
    brand: 'RUTA Lumina Pro',
    inStock: true,
    stockCount: 84,
    imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&auto=format&fit=crop&q=80',
    description: 'Heavy die-cast aluminum high bay fixture designed for industrial factory ceilings, textile sheds, and warehouses with 150 lm/Watt efficiency.',
    specifications: [
      '150 Watt Osram LED Driver',
      '22,500 Lumens output (6500K Cool White)',
      'IP65 Waterproof & Dustproof',
      'Surge Protection 6kV built-in'
    ]
  },
  {
    id: 'prod-light-2',
    name: 'Smart WiFi Recessed COB Downlight 12W',
    category: 'Light',
    wholesalePriceBdt: 580,
    retailPriceBdt: 950,
    weightKg: 0.35,
    moq: 10,
    brand: 'Tuya SmartLife',
    inStock: true,
    stockCount: 160,
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80',
    description: 'RGB+CCT Tunable white smart recessed ceiling spotlight controlled via mobile app, Google Assistant, and Alexa.',
    specifications: [
      '12W Output (1050 Lumens)',
      '16 Million Colors + 2700K-6500K Tunable',
      'No Gateway required (2.4GHz Direct WiFi)',
      'Dimmable 1% - 100%'
    ]
  },

  // 2. Fan
  {
    id: 'prod-fan-1',
    name: 'Industrial Heavy Duty Exhaust Fan 24" (1400 RPM)',
    category: 'Fan',
    wholesalePriceBdt: 4200,
    retailPriceBdt: 5800,
    weightKg: 8.5,
    moq: 2,
    brand: 'RUTA PowerBlower',
    inStock: true,
    stockCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80',
    description: 'High air delivery steel-bladed exhaust fan for commercial kitchens, dyeing units, and factory floor ventilation.',
    specifications: [
      'Pure Copper Heavy Motor with Ball Bearings',
      '1400 RPM High Torque 350W',
      '7,800 m3/h Air Delivery',
      'Anti-Corrosive Powder Coated Safety Guard'
    ]
  },
  {
    id: 'prod-fan-2',
    name: 'BLDC Energy Saving Smart Ceiling Fan 56"',
    category: 'Fan',
    wholesalePriceBdt: 3400,
    retailPriceBdt: 4950,
    weightKg: 4.6,
    moq: 4,
    brand: 'AeroSync Smart',
    inStock: true,
    stockCount: 55,
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80',
    description: 'Brushless DC motor ceiling fan consuming only 32W at max speed with RF remote control and timer modes.',
    specifications: [
      '32W BLDC Motor (Saves 65% Electricity)',
      'RF Remote Control + Sleep Mode',
      '230 m3/min High Air Flow Delivery',
      'Operates smooth on low voltage (140V-260V)'
    ]
  },

  // 3. Switch & Socket
  {
    id: 'prod-switch-1',
    name: 'Smart Tempered Glass Touch Switch 4-Gang (WiFi)',
    category: 'Switch & Socket',
    wholesalePriceBdt: 1250,
    retailPriceBdt: 1850,
    weightKg: 0.3,
    moq: 5,
    brand: 'SmartTouch BD',
    inStock: true,
    stockCount: 120,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-thin crystal tempered glass capacitive touch wall switch with gentle night backlight and mobile automation.',
    specifications: [
      '4 Independent Relay Gangs (1000W total capacity)',
      'Scratch-resistant Waterproof Glass Plate',
      'Timer, Countdown, and Scene Interlock',
      'Compatible with Tuya / Smart Life apps'
    ]
  },
  {
    id: 'prod-switch-2',
    name: '16A Industrial Weatherproof Socket Box (IP66)',
    category: 'Switch & Socket',
    wholesalePriceBdt: 850,
    retailPriceBdt: 1350,
    weightKg: 0.65,
    moq: 8,
    brand: 'RUTA SafePower',
    inStock: true,
    stockCount: 95,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Heavy duty impact-resistant polycarbonate surface-mounted socket with spring seal cover for outdoor and factory damp locations.',
    specifications: [
      '16A Universal 3-Pin / 2-Pin Plug Outlet',
      'IP66 Certified Jet Water and Chemical Resistant',
      'Integrated Mechanical Lock switch',
      'Pure Brass contacts with safety child shutter'
    ]
  },

  // 4. Security Lock
  {
    id: 'prod-lock-1',
    name: 'Biometric Smart Digital Door Lock Pro',
    category: 'Security Lock',
    wholesalePriceBdt: 6800,
    retailPriceBdt: 9800,
    weightKg: 3.2,
    moq: 2,
    brand: 'SecureVault Smart',
    inStock: true,
    stockCount: 28,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    description: 'All-in-one smart security mortise lock with semiconductor 360° fingerprint scanner, RFID card, PIN code, and mobile remote unlock.',
    specifications: [
      'Fingerprint, RFID Card, Passcode, App & Emergency Key',
      'Swedish FPC Semiconductor Fingerprint Sensor (0.3s response)',
      'Anti-peep virtual passcode protection',
      'Stainless steel multi-point anti-theft mortise body'
    ]
  },
  {
    id: 'prod-lock-2',
    name: 'Heavy Duty 600lbs Electromagnetic Lock (Access Control)',
    category: 'Security Lock',
    wholesalePriceBdt: 2200,
    retailPriceBdt: 3200,
    weightKg: 2.1,
    moq: 4,
    brand: 'RUTA MagLock',
    inStock: true,
    stockCount: 60,
    imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80',
    description: 'Fail-safe magnetic lock for commercial emergency exit doors, server rooms, and fire egress doors interlocking with access control.',
    specifications: [
      '280kg (600 lbs) Holding Force',
      '12V / 24V DC Auto Select Dual Voltage',
      'Built-in MOV surge and reverse current protection',
      'LED Door Status Sensor (Red/Green)'
    ]
  },

  // 5. CCTV Camera
  {
    id: 'prod-cctv-1',
    name: '5MP PoE Full-Color Night Vision Bullet Camera',
    category: 'CCTV Camera',
    wholesalePriceBdt: 2850,
    retailPriceBdt: 3950,
    weightKg: 0.75,
    moq: 4,
    brand: 'VisionGuard HD',
    inStock: true,
    stockCount: 75,
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    description: 'High-resolution IP security camera with Warm LED spotlight for 24/7 full-color surveillance in total darkness.',
    specifications: [
      '5.0 Megapixel (2560 x 1920) Starlight Sensor',
      'PoE (Power over Ethernet) IEEE 802.3af',
      'IP67 Waterproof Heavy Metal Casing',
      'H.265+ Compression (Saves 70% Storage)'
    ]
  },
  {
    id: 'prod-cctv-2',
    name: '8-Channel 4K H.265+ PoE NVR System',
    category: 'CCTV Camera',
    wholesalePriceBdt: 7400,
    retailPriceBdt: 10500,
    weightKg: 2.4,
    moq: 1,
    brand: 'VisionGuard Core',
    inStock: true,
    stockCount: 18,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Plug-and-play Network Video Recorder supporting up to 8 PoE cameras with AI human and vehicle perimeter detection.',
    specifications: [
      '8 Built-in Independent PoE Network Ports',
      'Supports up to 8MP/4K IP Cameras',
      '1 SATA HDD Interface (Supports up to 10TB)',
      'Instant Mobile App Remote View without Port Forwarding'
    ]
  },

  // 6. Smart Camera
  {
    id: 'prod-scam-1',
    name: '360° AI Human Tracking Dual-Band Smart WiFi Camera',
    category: 'Smart Camera',
    wholesalePriceBdt: 1850,
    retailPriceBdt: 2600,
    weightKg: 0.45,
    moq: 3,
    brand: 'SmartCam Omni',
    inStock: true,
    stockCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    description: 'Pan-tilt smart home and office camera with AI auto-tracking, real-time two-way voice call, and micro-SD card recording.',
    specifications: [
      '3MP 2K Ultra Clear Lens (355° Pan / 90° Tilt)',
      'Dual-Band WiFi (2.4GHz + 5GHz)',
      'Smart Motion Detection & Baby Crying Alert',
      'Two-way crystal clear audio call'
    ]
  },
  {
    id: 'prod-scam-2',
    name: 'Solar-Powered 4G LTE Outdoor Security Camera',
    category: 'Smart Camera',
    wholesalePriceBdt: 5400,
    retailPriceBdt: 7800,
    weightKg: 1.8,
    moq: 2,
    brand: 'SolarEye 4G',
    inStock: true,
    stockCount: 22,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    description: '100% wire-free camera for farms, rural factory construction sites, and remote areas using SIM card cellular data and high-efficiency solar panel.',
    specifications: [
      'High-Capacity 15,000mAh Battery + 8W Monocrystalline Solar Panel',
      '4G LTE SIM Card Support (Grameenphone, Robi, Banglalink)',
      'Dual Radar + PIR Human Body Sensor detection',
      'IP66 Waterproof & Color Night Vision'
    ]
  },

  // 7. Fire Alarm Detection & Protective Device
  {
    id: 'prod-fire-1',
    name: 'Addressable Optical Smoke Detector with Base (EN54-7)',
    category: 'Fire Alarm Detection & Protective Device',
    wholesalePriceBdt: 950,
    retailPriceBdt: 1450,
    weightKg: 0.25,
    moq: 10,
    brand: 'FireGuard Pro',
    inStock: true,
    stockCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80',
    description: 'Certified addressable photoelectric smoke detector conforming to EN54-7 & NFPA 72 standards for industrial factories and high-rises.',
    specifications: [
      'Microprocessor controlled digital addressable protocol',
      '360° Viewing Angle Dual Status LEDs',
      'Anti-tamper locking mechanism & dust protection mesh',
      'Operating Voltage: 16V - 28V Loop Powered'
    ]
  },
  {
    id: 'prod-fire-2',
    name: 'Manual Call Point (Break Glass) Addressable',
    category: 'Fire Alarm Detection & Protective Device',
    wholesalePriceBdt: 820,
    retailPriceBdt: 1250,
    weightKg: 0.3,
    moq: 10,
    brand: 'FireGuard Pro',
    inStock: true,
    stockCount: 140,
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80',
    description: 'Surface-mount addressable manual alarm push station with reusable plastic element and reset test key.',
    specifications: [
      'Resettable operating element with test key included',
      'Bright Red Fire Evacuation Casing',
      'Built-in Isolator Loop Protection',
      'Conforms to NFPA 72 & BNBC 2020 fire regulations'
    ]
  },
  {
    id: 'prod-fire-3',
    name: 'Industrial Motor Voltage & Phase Failure Protection Relay',
    category: 'Fire Alarm Detection & Protective Device',
    wholesalePriceBdt: 1650,
    retailPriceBdt: 2400,
    weightKg: 0.4,
    moq: 5,
    brand: 'RUTA Protec',
    inStock: true,
    stockCount: 65,
    imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&auto=format&fit=crop&q=80',
    description: '3-Phase electrical protection relay guarding industrial pumps, compressors, and motor starters against phase loss, phase reverse, and over/under voltage.',
    specifications: [
      'Phase Sequence, Phase Loss & Phase Unbalance protection',
      'Adjustable Over-Voltage (380V-460V) & Under-Voltage (300V-380V)',
      'Tripping Delay Timer 0.1s - 10s',
      'DIN-Rail 35mm Standard Mounting'
    ]
  }
];

export const initialStoreOrders: StoreOrder[] = [
  {
    id: 'ORD-8941',
    customerName: 'Khandakar Textiles Ltd (Engr. Shahed)',
    customerPhone: '+8801711223344',
    deliveryAddress: 'Plot 42, Mawna Road, Gazipur Industrial Zone',
    items: [
      {
        productId: 'prod-light-1',
        productName: 'Industrial LED High Bay Light 150W (IP65)',
        category: 'Light',
        quantity: 10,
        unitPriceBdt: 2450,
        weightKg: 2.8
      },
      {
        productId: 'prod-fire-1',
        productName: 'Addressable Optical Smoke Detector with Base (EN54-7)',
        category: 'Fire Alarm Detection & Protective Device',
        quantity: 20,
        unitPriceBdt: 950,
        weightKg: 0.25
      }
    ],
    totalWeightKg: 33.0,
    subtotalBdt: 43500,
    deliveryFeeBdt: 4620, // 33 kg * 140 BDT
    totalAmountBdt: 48120,
    status: 'Confirmed',
    orderDate: '2026-09-02T14:20:00Z',
    notes: 'Urgent factory ceiling retrofit. Delivery via SA Paribahan Gazipur branch.'
  },
  {
    id: 'ORD-8942',
    customerName: 'Nasir Ahmed (Apex Spinning Auxiliary)',
    customerPhone: '+8801819998877',
    deliveryAddress: 'Mirzapur, Tangail Highway',
    items: [
      {
        productId: 'prod-lock-1',
        productName: 'Biometric Smart Digital Door Lock Pro',
        category: 'Security Lock',
        quantity: 3,
        unitPriceBdt: 6800,
        weightKg: 3.2
      }
    ],
    totalWeightKg: 9.6,
    subtotalBdt: 20400,
    deliveryFeeBdt: 1344, // 9.6 kg * 140 BDT
    totalAmountBdt: 21744,
    status: 'Shipped',
    orderDate: '2026-09-03T10:15:00Z',
    notes: 'Order confirmed via WhatsApp. Courier tracking sent to client.'
  }
];
