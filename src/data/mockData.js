// Mock dataset for AutoVault Platform

export const INITIAL_USED_CARS = [
  {
    id: 'car-101',
    make: 'Hyundai',
    model: 'Creta SX (O) 1.5 Diesel AT',
    year: 2022,
    regNumber: 'DL-01-CA-9921',
    mileage: 28400,
    fuel: 'Diesel',
    transmission: 'Automatic',
    owners: 1,
    location: 'South Delhi Hub',
    price: 1475000,
    estimatedMarketValue: 1550000,
    reservePrice: 1420000, // Seller acceptance threshold
    category: 'needbuster', // 'needbuster' | 'cloud' | 'bidmaster'
    inspectionScore: 9.4,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/car-detection.mp4',
    features: ['Panoramic Sunroof', 'Ventilated Seats', 'Bose Premium Audio', 'Wireless Charger', '6 Airbags'],
    bids: [
      { id: 'b1', brokerName: 'Star Auto Link', brokerPhone: '9876543210', amount: 1380000, timestamp: '10 mins ago' },
      { id: 'b2', brokerName: 'Apex Wheels Delhi', brokerPhone: '9811223344', amount: 1400000, timestamp: '4 mins ago' }
    ],
    highestBid: 1400000,
    auctionEndTime: Date.now() + 1000 * 60 * 45, // 45 mins remaining today
    auctionRound: 'Needbuster Daily Special (Batch #104)',
    status: 'live' // 'live' | 'accepted' | 'closed'
  },
  {
    id: 'car-102',
    make: 'Honda',
    model: 'City ZX CVT Petrol',
    year: 2021,
    regNumber: 'MH-02-EE-4189',
    mileage: 34100,
    fuel: 'Petrol',
    transmission: 'Automatic',
    owners: 1,
    location: 'Mumbai Andheri Hub',
    price: 1120000,
    estimatedMarketValue: 1200000,
    reservePrice: 1090000,
    category: 'bidmaster',
    inspectionScore: 9.1,
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4',
    features: ['Sunroof', 'LaneWatch Camera', 'LED Headlights', 'Leatherette Upholstery'],
    bids: [
      { id: 'b3', brokerName: 'Premier Cars Mumbai', brokerPhone: '9822001122', amount: 1060000, timestamp: '12 mins ago' },
      { id: 'b4', brokerName: 'Silverline Motor Corp', brokerPhone: '9876543210', amount: 1075000, timestamp: '1 min ago' }
    ],
    highestBid: 1075000,
    auctionEndTime: Date.now() + 1000 * 60 * 22, // 22 mins remaining
    auctionRound: 'BidMaster Afternoon Round (2 of 3)',
    status: 'live'
  },
  {
    id: 'car-103',
    make: 'Tata',
    model: 'Nexon EV Max XZ+ Lux',
    year: 2023,
    regNumber: 'KA-05-MM-7822',
    mileage: 18200,
    fuel: 'Electric',
    transmission: 'Automatic',
    owners: 1,
    location: 'Bengaluru Whitefield Hub',
    price: 1390000,
    estimatedMarketValue: 1480000,
    reservePrice: 1350000,
    category: 'cloud',
    inspectionScore: 9.6,
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/car-detection.mp4',
    features: ['7.2kW Fast AC Charging', 'Electronic Parking Brake', 'Air Purifier', 'Ventilated Front Seats'],
    bids: [
      { id: 'b5', brokerName: 'GreenWheels Bangalore', brokerPhone: '9845012345', amount: 1320000, timestamp: '2 hours ago' }
    ],
    highestBid: 1320000,
    auctionEndTime: Date.now() + 1000 * 60 * 60 * 14, // 14 hours in continuous cloud
    auctionRound: 'Cloud Continuous Stock 24/7',
    status: 'live'
  },
  {
    id: 'car-104',
    make: 'Maruti Suzuki',
    model: 'Swift ZXi+ AMT Dual Tone',
    year: 2021,
    regNumber: 'HR-26-DJ-5512',
    mileage: 39500,
    fuel: 'Petrol',
    transmission: 'Automatic',
    owners: 1,
    location: 'Gurugram Cyber Hub',
    price: 645000,
    estimatedMarketValue: 710000,
    reservePrice: 620000,
    category: 'bidmaster',
    inspectionScore: 8.9,
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4',
    features: ['SmartPlay Pro Touchscreen', 'Cruise Control', 'Push Button Start', 'Auto Folding Mirrors'],
    bids: [
      { id: 'b6', brokerName: 'Delhi NCR Fleet Partners', brokerPhone: '9810198101', amount: 605000, timestamp: '25 mins ago' }
    ],
    highestBid: 605000,
    auctionEndTime: Date.now() + 1000 * 60 * 18,
    auctionRound: 'BidMaster Afternoon Round (2 of 3)',
    status: 'live'
  },
  {
    id: 'car-105',
    make: 'Kia',
    model: 'Seltos GTX Plus 1.4 Turbo DCT',
    year: 2022,
    regNumber: 'TS-09-FH-3390',
    mileage: 26100,
    fuel: 'Petrol',
    transmission: 'Automatic',
    owners: 1,
    location: 'Hyderabad Gachibowli Hub',
    price: 1540000,
    estimatedMarketValue: 1620000,
    reservePrice: 1490000,
    category: 'needbuster',
    inspectionScore: 9.3,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/car-detection.mp4',
    features: ['360 Degree Camera', 'Blind View Monitor', 'Heads Up Display', 'Ventilated Seats'],
    bids: [],
    highestBid: 0,
    auctionEndTime: Date.now() + 1000 * 60 * 55,
    auctionRound: 'Needbuster Daily Special (Batch #104)',
    status: 'live'
  },
  {
    id: 'car-106',
    make: 'Mahindra',
    model: 'Thar LX 4-Str Hard Top Diesel AT 4WD',
    year: 2022,
    regNumber: 'MH-12-PQ-8800',
    mileage: 31000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    owners: 1,
    location: 'Pune Wakad Hub',
    price: 1420000,
    estimatedMarketValue: 1500000,
    reservePrice: 1380000,
    category: 'cloud',
    inspectionScore: 9.0,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4',
    features: ['4x4 Low Range', 'Convertible / Hardtop', 'Touchscreen Infotainment', 'Roll Cage Certified'],
    bids: [
      { id: 'b7', brokerName: 'Pune Auto Hub', brokerPhone: '9823098230', amount: 1350000, timestamp: '1 hour ago' }
    ],
    highestBid: 1350000,
    auctionEndTime: Date.now() + 1000 * 60 * 60 * 18,
    auctionRound: 'Cloud Continuous Stock 24/7',
    status: 'live'
  }
];

export const INITIAL_NEW_CARS = [
  {
    id: 'new-201',
    make: 'Mahindra',
    model: 'XUV 700 AX7 Luxury Pack',
    tagline: 'The Intelligent & Dominant SUV',
    startingPrice: 1399000,
    onRoadPriceEstimate: 1650000,
    fuelTypes: ['Petrol', 'Diesel'],
    transmission: ['Manual', 'Automatic'],
    waitingPeriod: '4-6 Weeks',
    bookingTokenAmount: 21000,
    brochureUrl: '#',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    colors: ['Midnight Black', 'Electric Blue', 'Dazzling Silver', 'Everest White'],
    variants: [
      { name: 'AX5 5-Str Petrol MT', price: '₹ 17.49 Lakh' },
      { name: 'AX7 7-Str Diesel AT', price: '₹ 22.89 Lakh' },
      { name: 'AX7L AWD Luxury Pack', price: '₹ 26.99 Lakh' }
    ],
    specs: {
      engine: '2.2L mHawk Turbo Diesel / 2.0L mStallion Turbo Petrol',
      power: '200 PS @ 5000 rpm',
      torque: '380 Nm @ 1750-3000 rpm',
      seating: '5 or 7 Seater',
      safety: '5-Star Global NCAP, Level 2 ADAS'
    }
  },
  {
    id: 'new-202',
    make: 'Hyundai',
    model: 'Verna 1.5 Turbo GDi DCT',
    tagline: 'Futuristic Fastback Sedan with Level 2 ADAS',
    startingPrice: 1100000,
    onRoadPriceEstimate: 1320000,
    fuelTypes: ['Petrol'],
    transmission: ['Manual', '7-Speed DCT'],
    waitingPeriod: '2-3 Weeks',
    bookingTokenAmount: 21000,
    brochureUrl: '#',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
    colors: ['Abyss Black', 'Atlas White', 'Fiery Red', 'Tellurian Brown'],
    variants: [
      { name: 'EX 1.5 MT', price: '₹ 11.00 Lakh' },
      { name: 'SX 1.5 Turbo MT', price: '₹ 14.87 Lakh' },
      { name: 'SX(O) 1.5 Turbo DCT', price: '₹ 17.42 Lakh' }
    ],
    specs: {
      engine: '1.5L Turbo GDi 4-Cylinder Petrol',
      power: '160 PS @ 5500 rpm',
      torque: '253 Nm @ 1500-3500 rpm',
      seating: '5 Seater',
      safety: '5-Star Bharat NCAP, 65+ Safety Features'
    }
  },
  {
    id: 'new-203',
    make: 'Tata',
    model: 'Harrier Fearless+ Dark Edition',
    tagline: 'Warrior DNA Engineered for Unmatched Authority',
    startingPrice: 1549000,
    onRoadPriceEstimate: 1820000,
    fuelTypes: ['Diesel'],
    transmission: ['Manual', 'Automatic'],
    waitingPeriod: '3-4 Weeks',
    bookingTokenAmount: 21000,
    brochureUrl: '#',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
    colors: ['Oberon Black', 'Sunlit Yellow', 'Pebble Grey', 'Lunar White'],
    variants: [
      { name: 'Smart 2.0 MT', price: '₹ 15.49 Lakh' },
      { name: 'Adventure+ 2.0 AT', price: '₹ 21.69 Lakh' },
      { name: 'Fearless+ Dark Edition AT', price: '₹ 26.44 Lakh' }
    ],
    specs: {
      engine: '2.0L Kryotec Turbocharged Diesel',
      power: '170 PS @ 3750 rpm',
      torque: '350 Nm @ 1750-2500 rpm',
      seating: '5 Seater',
      safety: '5-Star Bharat NCAP, 7 Airbags, ADAS'
    }
  },
  {
    id: 'new-204',
    make: 'Toyota',
    model: 'Urban Cruiser Hyryder Strong Hybrid',
    tagline: 'Self-Charging Electric Hybrid SUV with 27.97 km/l',
    startingPrice: 1114000,
    onRoadPriceEstimate: 1310000,
    fuelTypes: ['Hybrid', 'Petrol', 'CNG'],
    transmission: ['e-Drive (e-CVT)', 'Manual', 'Automatic'],
    waitingPeriod: '3-5 Weeks',
    bookingTokenAmount: 21000,
    brochureUrl: '#',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    colors: ['Cafe White', 'Enticing Silver', 'Gaming Grey', 'Speedy Blue'],
    variants: [
      { name: 'S NeoDrive Petrol MT', price: '₹ 12.81 Lakh' },
      { name: 'G Strong Hybrid e-CVT', price: '₹ 18.69 Lakh' },
      { name: 'V Strong Hybrid e-CVT Panoramic', price: '₹ 20.19 Lakh' }
    ],
    specs: {
      engine: '1.5L TNGA Petrol + Electric Motor',
      power: '116 PS Combined Output',
      torque: '141 Nm Motor Torque',
      seating: '5 Seater',
      safety: 'All-Wheel Disc Brakes, 6 Airbags, VSC'
    }
  }
];

export const INITIAL_SERVICE_ORDERS = [
  {
    id: 'srv-901',
    regNumber: 'DL-04-ER-9821',
    carModel: 'Maruti Suzuki Baleno Alpha 1.2',
    customerName: 'Rohit Sharma',
    customerPhone: '9871100223',
    bookingDate: '2026-09-14',
    currentStageIndex: 3, // 0: Pickup Car, 1: Car Picked, 2: Workshop Arrival, 3: Estimate Acceptance, 4: Service Happening, 5: Moves back to drop, 6: Feedback
    estimateAccepted: null, // null | 'accepted' | 'rejected'
    driver: {
      name: 'Mukesh Kumar (AutoVault Valet)',
      phone: '+91 98722 55441',
      rating: 4.9,
      allotmentPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      assignedTime: 'Today at 08:30 AM'
    },
    pickupDetails: {
      pickedAt: 'Today at 09:15 AM',
      odometer: '42,180 km',
      fuelLevel: '75%',
      pickupNotes: 'Front bumper minor scratch noted on digital delivery sheet'
    },
    workshopDetails: {
      hubName: 'AutoVault Mega Workshop, Okhla Phase III',
      arrivedAt: 'Today at 10:05 AM',
      workshopPhotos: [
        'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
      ]
    },
    estimate: {
      items: [
        { desc: 'Comprehensive Periodic Service (Engine Oil Synthetic + Oil Filter)', cost: 3499 },
        { desc: 'Air Filter & Cabin AC Pollen Filter Replacement', cost: 850 },
        { desc: 'Brake Caliper Servicing & Front Disc Pad Cleaning', cost: 650 },
        { desc: 'Wheel Alignment, Balancing & Tire Rotation', cost: 799 },
        { desc: 'Complete 360 Interior Deep Cleaning & Engine Bay Coating', cost: 1200 }
      ],
      taxes: 1259,
      totalAmount: 8257
    },
    liveServiceProof: {
      statusNote: 'Mechanic Ramesh is actively replacing synthetic engine oil and servicing the brake pads.',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80', caption: 'Fresh Synthetic Mobil 1 Engine Oil top up' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=800&q=80', caption: 'AC cooling coil disinfection' }
      ]
    },
    returnDelivery: {
      driverName: 'Mukesh Kumar',
      eta: 'Estimated delivery 05:30 PM today',
      status: 'Awaiting completion of workshop tasks'
    },
    feedback: null
  }
];

export const INITIAL_BROKERS = [
  {
    id: 'brk-01',
    name: 'Rajesh Malhotra',
    companyName: 'Malhotra Auto Empire',
    phone: '9876543210',
    subscriptionStatus: 'active', // 'active' | 'pending'
    subscriptionType: 'Yearly VIP Channel Partner',
    validUntil: '2027-03-31',
    lastParticipatedDaysAgo: 0, // participated today
    totalBidsPlaced: 142,
    wonAuctions: 18
  },
  {
    id: 'brk-02',
    name: 'Sukhvinder Singh',
    companyName: 'Apex Wheels Delhi',
    phone: '9811223344',
    subscriptionStatus: 'active',
    subscriptionType: 'Quarterly Broker Pass',
    validUntil: '2026-11-30',
    lastParticipatedDaysAgo: 3, // > 2 days -> triggers client reminder rule!
    totalBidsPlaced: 88,
    wonAuctions: 9
  },
  {
    id: 'brk-03',
    name: 'Vikram Joshi',
    companyName: 'Silverline Motor Corp',
    phone: '9822001122',
    subscriptionStatus: 'pending', // offline subscription pending
    subscriptionType: 'Pending Offline Activation',
    validUntil: 'Pending Approval',
    lastParticipatedDaysAgo: 4,
    totalBidsPlaced: 12,
    wonAuctions: 1
  }
];

export const OUTLET_HUBS = [
  {
    city: 'New Delhi',
    name: 'South Delhi Central Hub',
    address: 'Plot 42, Okhla Industrial Area Phase III, New Delhi - 110020',
    phone: '+91 11 4900 1200',
    carsInStock: 85,
    servicesHandled: 'Used Car Sales, Workshop Services, New Car Delivery Hub'
  },
  {
    city: 'Gurugram',
    name: 'Cyber City Flagship Hub',
    address: 'DLF Phase 2, Adjacent to Rapid Metro Station, Gurugram - 122002',
    phone: '+91 124 6700 800',
    carsInStock: 110,
    servicesHandled: 'Megastore, Live Auction Experience Center, Test Drives'
  },
  {
    city: 'Mumbai',
    name: 'Andheri West Experience Hub',
    address: 'Link Road, Near Infinity Mall, Andheri West, Mumbai - 400053',
    phone: '+91 22 2844 9100',
    carsInStock: 94,
    servicesHandled: 'Used Car Sales, Quick Service, Home Valet Depot'
  },
  {
    city: 'Bengaluru',
    name: 'Whitefield Tech Hub',
    address: 'ITPL Main Road, Hoodi Circle, Bengaluru - 560048',
    phone: '+91 80 4122 7300',
    carsInStock: 125,
    servicesHandled: 'EV Specialist Center, Used Car Auction, Full Workshop'
  },
  {
    city: 'Hyderabad',
    name: 'Gachibowli Premium Outlet',
    address: 'Financial District, Near Wave Rock, Gachibowli, Hyderabad - 500032',
    phone: '+91 40 6811 4400',
    carsInStock: 78,
    servicesHandled: 'Inspection Center, Luxury Segment Hub, Service Drop'
  }
];
