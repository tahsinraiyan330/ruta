import { Project, IncidentStat, ServiceDetail, Lead } from './types';

export const engineerBio = {
  name: "Engr. A. K. M. Rukon Uddin",
  company: "RUTA Engineering & Automation",
  title: "Principal Consultant & Chartered Electrical Engineer",
  experienceYears: 25,
  location: "Dhaka, Bangladesh",
  address: "Nuirani Shorok, Bottrish, Kishoreganj Sadar, Dhaka, Bangladesh",
  phone: "+880 1730318552",
  email: "rukonenger@gmail.com",
  tagline: "Bridging architectural vision with bulletproof electrical, industrial automation, power architecture, and NFPA-compliant fire safety designs.",
  credentials: [
    "Board Certified Consultant (IEB - FE-12109)",
    "25+ Years Industrial Design & Automation Expertise",
    "Completed 210+ Commercial & Industrial Blueprint Certifications",
    "Specialist in BPDB, DESCO, BREB Substation Approval Blueprints",
    "Certified Fire Protection Specialist (NFPA standard design compliance)",
  ],
  bioParagraph: "Backed by a legacy of 25 years in the power, industrial automation, and heavy engineering sector of Bangladesh, RUTA Engineering & Automation, led by Engr. A. K. M. Rukon Uddin, has been the primary engineering force behind highly resilient power distributions, automation systems, sub-station drawings, and world-class fire safety grids. Operating with absolute transparency, our bureau offers comprehensive, uncompromised blueprints for massive industrial plants, automation installations, and commercial projects at a flat rate of exactly 1 BDT per square foot."
};

export const serviceCatalog: ServiceDetail[] = [
  {
    id: "substation-electrical",
    title: "Industrial Substation & Power Layout",
    ratePerSqFt: 1.00,
    subtitle: "High-voltage planning & load division panels",
    icon: "Cpu",
    description: "Full sub-station layout blueprints (transformer, HT/LT switchgear, PFI plant), lightning protection system (LPS), ground loop layouts, and customized single-line diagrams (SLD) ready for BPDB, BREB, or DESCO agency verification.",
    deliverables: [
      "HT/LT Switchgear & Transformer Sizing Layouts",
      "Power Factor Improvement (PFI) Calculations",
      "Grounding Grid and Earthing Resistance Map",
      "Overhead Lightning Protection Blueprints",
      "Load Calculation & Circuit Division Registers"
    ]
  },
  {
    id: "fire-detection-safety",
    title: "NFPA-Compliant Fire Detection Grids",
    ratePerSqFt: 1.00,
    subtitle: "Active prevention & warning system maps",
    icon: "ShieldAlert",
    description: "Detailed intelligent/addressable smoke & heat detection schematics adhering strictly to Bangladesh National Building Code (BNBC 2020) and NFPA 101 Life Safety Code standards. Includes exit emergency systems and integrated emergency panel triggers.",
    deliverables: [
      "Addressable Smoke & Heat Sensor Routing Plans",
      "Fire Detection Panel Terminal Schematics",
      "Emergency Exit Path & Illumination Blueprints",
      "PA System & Sprinkler Panel Interlocking Matrix",
      "FSCD Authority Approval Ready Blueprints"
    ]
  },
  {
    id: "commercial-power",
    title: "Commercial Complex Power Distribution",
    ratePerSqFt: 1.00,
    subtitle: "Reliable distribution for massive malls & towers",
    icon: "Zap",
    description: "Comprehensive power layouts, safe riser diagramming, and generator auto-transfer installations for high-rise commercial structures. Configured to shield against current surges, phases misalignment, and overheating.",
    deliverables: [
      "Busbar Trunking (BBT) Systems Layouts",
      "Generator Synchronization & AMF Panel Blueprints",
      "Structured Multi-tenant Metering Diagrams",
      "Harmonics Filtering & Cable Tray Design Plans",
      "Emergency Back-up Utility Routing Maps"
    ]
  },
  {
    id: "highrise-residential",
    title: "High-End Residential wiring layouts",
    ratePerSqFt: 1.00,
    subtitle: "Premium luxury residences & smart layouts",
    icon: "Home",
    description: "Bespoke wiring blueprints for high-end residential skyscrapers, duplexes, and estates in Dhanmondi, Gulshan, and Banani. Balanced phase allocation, elegant control panels, smart lighting conduit paths, and reliable backup systems.",
    deliverables: [
      "Balanced Phase Loading Wiring Registers",
      "Bespoke Smart Automation Conduit Architecture",
      "Uninterruptible Power Supply (UPS) Allocation Map",
      "Surge Protective Device (SPD) Integration Maps",
      "Intelligent Video Intercom Wiring Blueprints"
    ]
  }
];

export const portfolioProjects: Project[] = [
  {
    id: "proj-1",
    title: "Mega-scale Garment Factory & Substation",
    category: "Industrial",
    description: "Complete electrical layout design for a state-of-the-art green industrial garment facility in Gazipur, featuring 3 lines of 1500 KVA substation distribution, safe overhead busbar trunking, and harmonized industrial machine loads.",
    client: "Apex Apparel Group",
    location: "Gazipur Industrial Zone, Dhaka",
    sizeSqFt: 280000,
    capacity: "4500 kVA total Substation Load",
    year: 2024,
    featured: true,
    standardsComplied: ["BNBC 2020", "IEB Code", "Accord Guide", "RSC Standard"],
    highlightMetric: "Zero electrical malfunctions or overload shutdowns across 2 years of continuous operation.",
    costBdt: 280000
  },
  {
    id: "proj-2",
    title: "Intelligent Addressable Fire alarm Grid",
    category: "Fire & Safety Grid",
    description: "Custom design of an integrated, addressable safety alarm grid across five high-occupancy production floors, including master indicators and emergency auto-mains shutoff logic connected to gas valves.",
    client: "Narayanganj Spinners Ltd.",
    location: "Narayanganj Industrial Hub",
    sizeSqFt: 145000,
    capacity: "680 Intelligent Addressable Sensor Nodes",
    year: 2023,
    featured: true,
    standardsComplied: ["NFPA 72 - Fire Alarm", "NFPA 101 - Life Safety", "BNBC 2020"],
    highlightMetric: "Successfully passed 3 ACCORD safety audits and FSCD agency inspection with perfect feedback.",
    costBdt: 145000
  },
  {
    id: "proj-3",
    title: "Gulshan Crown Commercial Tower Plan",
    category: "Power Systems",
    description: "Comprehensive 14-story corporate office tower power planning. Includes safe cable-riser trays, Busbar Trunking (BBT) systems, centralized cooling loads, dynamic standby generator synchronization grids, and automated transfer switches.",
    client: "Crown Holdings Bangladesh",
    location: "Gulshan-2 Circle, Dhaka",
    sizeSqFt: 120000,
    capacity: "1250 KVA Standby Synchronized Power",
    year: 2025,
    featured: true,
    standardsComplied: ["BNBC 2020", "DPDC Regulations", "IEEE Safety Standards"],
    highlightMetric: "Harmonics distortion measured at less than 1.8%, protecting high-end corporate servers.",
    costBdt: 120000
  },
  {
    id: "proj-4",
    title: "Dhanmondi Royal Crest Sky-Villas",
    category: "High-End Residential",
    description: "Exquisite residential complex electrical design for ultra-luxury apartments. Implemented structural phase load balance, soundless high-capacity generator support, smart home backup grids, and premium earthing layout.",
    client: "Elite Builders BD",
    location: "Road 15, Dhanmondi, Dhaka",
    sizeSqFt: 85000,
    capacity: "Dual 500 kVA Substation & Active Auto-Backup",
    year: 2022,
    featured: false,
    standardsComplied: ["BNBC 2020", "DESCO Wiring Standards"],
    highlightMetric: "Engineered phase-routing ensures perfectly balanced loading with <1% neutral leakage current.",
    costBdt: 85000
  },
  {
    id: "proj-5",
    title: "Steel Melting Plant High-Voltage Feeders",
    category: "Power Systems",
    description: "Rugged industrial power routing layout to handle electric arc furnaces. Integrated thick copper-busbars, heavy-duty earthing mats, harmonic filter calculations, and specialized temperature sensory relays.",
    client: "Chittagong Alloy Steel Works",
    location: "Shitakunda, Chattogram Division",
    sizeSqFt: 190000,
    capacity: "10,000 kVA Core Feeder Allocation",
    year: 2021,
    featured: false,
    standardsComplied: ["IEB Code", "BPDB Grid Guidelines", "IEC Standards"],
    highlightMetric: "High-thermal cable routing designed for ambient temperature up to 55°C without current de-rating.",
    costBdt: 190000
  }
];

export const incidentStats: IncidentStat[] = [
  {
    year: 2020,
    incidentsCount: 20450,
    deathsCount: 154,
    injuredCount: 382,
    financialLossCroreBdt: 246.5,
    electricalShortCircuitPct: 72.4,
    description: "Over 70% of recorded incidents initiated from faulty consumer distribution boards, old low-grade wiring cables, and absence of Single Line Diagrams (SLD)."
  },
  {
    year: 2021,
    incidentsCount: 21601,
    deathsCount: 219,
    injuredCount: 570,
    financialLossCroreBdt: 342.9,
    electricalShortCircuitPct: 76.1,
    description: "Fires in major RMG storage barns in Gazipur and Chawkbazar. 76% traced back to electrical overheating, undersized switchgears, and unsafe load expansions."
  },
  {
    year: 2022,
    incidentsCount: 24102,
    deathsCount: 98,
    injuredCount: 407,
    financialLossCroreBdt: 367.4,
    electricalShortCircuitPct: 78.5,
    description: "Faulty earth-loops caused continuous ground lekage, sparking warehouse materials. The absence of reliable electrical blueprint audits led to critical safety bypasses."
  },
  {
    year: 2023,
    incidentsCount: 27624,
    deathsCount: 281,
    injuredCount: 815,
    financialLossCroreBdt: 479.2,
    electricalShortCircuitPct: 81.2,
    description: "High-density multi-tenant structures experienced severe load imbalance fires. Main distribution riser line short-circuit was cited as the principal disaster origin."
  },
  {
    year: 2024,
    incidentsCount: 28560,
    deathsCount: 194,
    injuredCount: 630,
    financialLossCroreBdt: 512.7,
    electricalShortCircuitPct: 79.8,
    description: "Industrial complexes operating without up-to-date Single-Line Diagrams (SLD) suffered structural fire outbreaks during lightning storms due to bypassed LPS."
  }
];

export const initialLeads: Lead[] = [
  {
    id: "lead-1",
    fullName: "Mukhlesur Rahman",
    companyName: "Karim Textiles Ltd.",
    email: "mukhles@karimtextiles.com",
    phone: "+8801711223344",
    location: "Konabari, Gazipur",
    projectType: "Industrial Factory Grid",
    sizeSqFt: 180000,
    estimatedCostBdt: 180000,
    status: "Design Phase",
    priority: "High",
    notes: "Requires complete industrial factory power distribution blueprint and Accord-approved lighting layout. Immediate urgency.",
    createdAt: "2026-05-20T10:45:00Z",
    scheduleDate: "2026-06-10",
    scheduledTask: "Submit completed SLD blueprint for Accord review"
  },
  {
    id: "lead-2",
    fullName: "Imtiaz Sarafat",
    companyName: "SkyLine Developers BD",
    email: "imtiaz@skylinebd.com",
    phone: "+8801819556677",
    location: "Banani Residential Area, Dhaka",
    projectType: "High-End Residential",
    sizeSqFt: 95000,
    estimatedCostBdt: 95000,
    status: "In Consultation",
    priority: "Medium",
    notes: "12-storied luxury apartment building. Standard 1 BDT/sq ft layout of wiring conduits. Wants to incorporate centralized generator transfer panel designs.",
    createdAt: "2026-06-01T14:20:00Z",
    scheduleDate: "2026-06-05",
    scheduledTask: "Initial consultation meeting regarding backup load requirements"
  },
  {
    id: "lead-3",
    fullName: "Farhana Parveen",
    companyName: "Apex Pharma Labs Ltd.",
    email: "f.parveen@apexpharma.com",
    phone: "+8801552334455",
    location: "Tongi Industrial Area, Gazipur",
    projectType: "Fire Safety & Detection Grid",
    sizeSqFt: 110000,
    estimatedCostBdt: 110000,
    status: "Site Visit Scheduled",
    priority: "High",
    notes: "Upgrading cleanroom chemical storage area with smart addressable heat detectors and air extraction triggers. Must match NFPA 45 compliance.",
    createdAt: "2026-05-28T09:12:00Z",
    scheduleDate: "2026-06-07",
    scheduledTask: "Physical site survey & sensor location audit at Tongi plant"
  },
  {
    id: "lead-4",
    fullName: "Kamrul Ahsan",
    companyName: "Bishwas Apparel Group",
    email: "kamrul@bishwasapparel.com",
    phone: "+8801912443399",
    location: "Halishahar Industrial Estate, Chattogram",
    projectType: "Industrial Substation",
    sizeSqFt: 250000,
    estimatedCostBdt: 250000,
    status: "Quote Generated",
    priority: "High",
    notes: "Wants a complete 2000 KVA substation layout overhaul, earthing grid, and PFI panel calculation maps. Emailed initial draft proposals.",
    createdAt: "2026-05-15T11:00:00Z",
    scheduleDate: "2026-06-08",
    scheduledTask: "Follow-up phone discussion for quote ratification"
  },
  {
    id: "lead-5",
    fullName: "Zahangir Alam",
    companyName: "Metro Trade Center Complex",
    email: "alam.metro@hotmail.com",
    phone: "+8801715887722",
    location: "Uttara Sector 11, Dhaka",
    projectType: "Commercial Complex",
    sizeSqFt: 62000,
    estimatedCostBdt: 62000,
    status: "New Inquiry",
    priority: "Low",
    notes: "New shopping arcade layout wiring diagram request. Checking pricing and blueprint delivery timeline.",
    createdAt: "2026-06-03T16:15:00Z",
    scheduleDate: "2026-06-12",
    scheduledTask: "Send general portfolio case studies standard PDF brochure"
  }
];
