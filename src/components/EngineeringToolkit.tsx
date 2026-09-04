import { useState } from 'react';
import { Calculator, Zap, Gauge, FileText, CheckCircle2, AlertTriangle, ArrowRight, Printer, RefreshCw } from 'lucide-react';

export default function EngineeringToolkit() {
  const [activeTab, setActiveTab] = useState<'cable' | 'transformer' | 'pfi'>('cable');

  // Cable Sizing States
  const [loadKw, setLoadKw] = useState<number>(75);
  const [voltage, setVoltage] = useState<number>(415); // 415V 3-phase or 230V 1-phase
  const [cableLength, setCableLength] = useState<number>(85); // meters
  const [powerFactor, setPowerFactor] = useState<number>(0.85);
  const [cableType, setCableType] = useState<'copper' | 'aluminum'>('copper');

  // Transformer Sizing States
  const [connectedLoadKw, setConnectedLoadKw] = useState<number>(800);
  const [diversityFactor, setDiversityFactor] = useState<number>(0.75);
  const [targetPf, setTargetPf] = useState<number>(0.95);
  const [futureExpansionMargin, setFutureExpansionMargin] = useState<number>(20); // 20%

  // PFI Sizing States
  const [activeLoadKw, setActiveLoadKw] = useState<number>(450);
  const [currentPf, setCurrentPf] = useState<number>(0.74);
  const [desiredPf, setDesiredPf] = useState<number>(0.98);

  // --- Calculations ---

  // Cable Sizing calculation
  // I = P (in Watts) / (sqrt(3) * V * pf) for 3-phase, or P / (V * pf) for 1-phase
  const isThreePhase = voltage > 300;
  const currentAmps = isThreePhase
    ? (loadKw * 1000) / (Math.sqrt(3) * voltage * powerFactor)
    : (loadKw * 1000) / (voltage * powerFactor);

  // Derating factor for ambient temperature 40°C in Bangladesh + touching trays = ~0.82
  const deratingFactor = 0.82;
  const designCurrent = currentAmps / deratingFactor;

  // Standard copper XLPE/PVC cable sizes and safe current capacity (in air/trays)
  const cableLookup = [
    { size: '4 sq.mm', capacity: 34, rPerKm: 4.61 },
    { size: '6 sq.mm', capacity: 44, rPerKm: 3.08 },
    { size: '10 sq.mm', capacity: 60, rPerKm: 1.83 },
    { size: '16 sq.mm', capacity: 80, rPerKm: 1.15 },
    { size: '25 sq.mm', capacity: 105, rPerKm: 0.727 },
    { size: '35 sq.mm', capacity: 130, rPerKm: 0.524 },
    { size: '50 sq.mm', capacity: 160, rPerKm: 0.387 },
    { size: '70 sq.mm', capacity: 200, rPerKm: 0.268 },
    { size: '95 sq.mm', capacity: 245, rPerKm: 0.193 },
    { size: '120 sq.mm', capacity: 285, rPerKm: 0.153 },
    { size: '150 sq.mm', capacity: 325, rPerKm: 0.124 },
    { size: '185 sq.mm', capacity: 375, rPerKm: 0.0991 },
    { size: '240 sq.mm', capacity: 440, rPerKm: 0.0754 },
    { size: '300 sq.mm', capacity: 505, rPerKm: 0.0601 },
    { size: '2 x (4C x 185 sq.mm)', capacity: 700, rPerKm: 0.0495 },
    { size: '2 x (4C x 240 sq.mm)', capacity: 830, rPerKm: 0.0377 },
    { size: '3 x (4C x 240 sq.mm)', capacity: 1200, rPerKm: 0.0251 },
  ];

  const matchedCable = cableLookup.find(c => c.capacity >= designCurrent) || cableLookup[cableLookup.length - 1];

  // Voltage drop = sqrt(3) * I * (R * cos(theta) + X * sin(theta)) * L / 1000
  // Approximation: Vd = sqrt(3) * I * R * L / 1000
  const voltageDropVolts = isThreePhase
    ? (Math.sqrt(3) * currentAmps * (matchedCable.rPerKm / 1000) * cableLength)
    : (2 * currentAmps * (matchedCable.rPerKm / 1000) * cableLength);
  const voltageDropPercent = (voltageDropVolts / voltage) * 100;
  const bnbcCompliant = voltageDropPercent <= 3.0; // BNBC 2020 limit is 3% for lighting and 5% for power sub-mains

  // Recommended Breaker
  const breakerRatings = [16, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600];
  const recommendedBreaker = breakerRatings.find(b => b >= currentAmps * 1.25) || 1600;

  // Transformer Calculation
  const maximumDemandKw = connectedLoadKw * diversityFactor;
  const requiredKvaBase = maximumDemandKw / targetPf;
  const requiredKvaWithExpansion = requiredKvaBase * (1 + futureExpansionMargin / 100);

  const standardTransformers = [100, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1500, 1600, 2000, 2500, 3150];
  const recommendedTransformerKva = standardTransformers.find(t => t >= requiredKvaWithExpansion) || 3150;
  const transformerLoadingPercent = (requiredKvaBase / recommendedTransformerKva) * 100;
  const htCurrent = recommendedTransformerKva / (Math.sqrt(3) * 11); // 11kV side
  const ltCurrent = recommendedTransformerKva / (Math.sqrt(3) * 0.415); // 415V side

  // PFI Calculation
  // Required kVAR = P * (tan(theta1) - tan(theta2))
  // theta1 = arccos(currentPf), theta2 = arccos(desiredPf)
  const angle1 = Math.acos(Math.max(0.1, Math.min(0.99, currentPf)));
  const angle2 = Math.acos(Math.max(0.1, Math.min(0.99, desiredPf)));
  const requiredKvar = activeLoadKw * (Math.tan(angle1) - Math.tan(angle2));
  const roundedKvar = Math.max(10, Math.ceil(requiredKvar / 25) * 25);
  // Monthly penalty avoided: DESCO/DPDC/BREB penalizes ~ 5-12% on electric bill if PF < 0.90
  const estimatedMonthlyBill = activeLoadKw * 220 * 9.5; // ~220 hours/month * 9.5 BDT/kWh average
  const estimatedAvoidedPenalty = currentPf < 0.90 ? estimatedMonthlyBill * (0.90 - currentPf) * 0.8 : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="engineering-toolkit" className="py-20 bg-black border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 rounded-md text-xs font-mono uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              ENGINEERING UTILITY SUITE // BNBC 2020 &amp; IEC 60364
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Industrial Electrical Design Calculators
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
              Verify actual copper gauge sizing, substation transformer capacities, and PFI capacitor bank ratings before procuring expensive heavy switchgear.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-orange-500" />
              Print Calculation Sheet
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('cable')}
            className={`px-6 py-3 font-display text-xs uppercase tracking-wider font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'cable'
                ? 'border-orange-500 text-orange-400 bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Gauge className="w-4 h-4" />
            1. Cable Sizing &amp; Voltage Drop
          </button>
          <button
            onClick={() => setActiveTab('transformer')}
            className={`px-6 py-3 font-display text-xs uppercase tracking-wider font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'transformer'
                ? 'border-orange-500 text-orange-400 bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            2. Transformer &amp; Substation Sizing
          </button>
          <button
            onClick={() => setActiveTab('pfi')}
            className={`px-6 py-3 font-display text-xs uppercase tracking-wider font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'pfi'
                ? 'border-orange-500 text-orange-400 bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            3. PFI Capacitor Bank &amp; Penalty Offset
          </button>
        </div>

        {/* Tab 1: Cable Sizing */}
        {activeTab === 'cable' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input parameters */}
            <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                  Circuit Design Inputs
                </h3>
                <span className="text-[10px] font-mono text-orange-500 px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded">
                  IEC 60364-5-52 Standard
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-300">Total Circuit Load:</span>
                    <span className="text-orange-500 font-bold">{loadKw} kW</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={loadKw}
                    onChange={(e) => setLoadKw(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>5 kW (Small branch)</span>
                    <span>500 kW (Heavy Motor Center)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">System Voltage</label>
                    <select
                      value={voltage}
                      onChange={(e) => setVoltage(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="415">415V (3-Phase 4-Wire)</option>
                      <option value="230">230V (1-Phase Lighting)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Conductor Material</label>
                    <select
                      value={cableType}
                      onChange={(e) => setCableType(e.target.value as 'copper' | 'aluminum')}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="copper">Class-2 Annealed Copper (Cu)</option>
                      <option value="aluminum">Aluminum (Al)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-300">Run Distance to Main Panel:</span>
                    <span className="text-orange-500 font-bold">{cableLength} Meters</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="350"
                    step="5"
                    value={cableLength}
                    onChange={(e) => setCableLength(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>10m (Close proximity)</span>
                    <span>350m (Distant shed/ETP)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-300">Estimated Power Factor (cos φ):</span>
                    <span className="text-orange-500 font-bold">{powerFactor}</span>
                  </div>
                  <input
                    type="range"
                    min="0.70"
                    max="0.99"
                    step="0.01"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Includes automatic 0.82 derating factor for Bangladesh 40°C peak ambient heat and perforated cable ladder placement.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                  <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                    Engineering Specification Output
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                    bnbcCompliant ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    {bnbcCompliant ? 'BNBC 2020 Compliant (<3% Drop)' : 'Non-Compliant (>3% Drop - Upsize Required)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/60 p-4 rounded-xl border border-zinc-800/80">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Operating Current (FLA)</div>
                    <div className="text-2xl font-mono font-black text-white mt-1">
                      {currentAmps.toFixed(1)} <span className="text-xs text-orange-500">Amps</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">Design Current: {designCurrent.toFixed(1)} A</div>
                  </div>

                  <div className="bg-black/60 p-4 rounded-xl border border-zinc-800/80">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Recommended Breaker (MCCB)</div>
                    <div className="text-2xl font-mono font-black text-orange-400 mt-1">
                      {recommendedBreaker} <span className="text-xs text-zinc-400">A TP</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">36kA or 50kA Fault Icu</div>
                  </div>
                </div>

                {/* Recommended Cable Highlight */}
                <div className="p-5 bg-black border-2 border-orange-500/40 rounded-xl mb-6">
                  <div className="text-[10px] font-mono uppercase text-orange-500 tracking-wider font-bold">
                    Primary Conductor Cross-Section Recommendation
                  </div>
                  <div className="text-xl sm:text-2xl font-display font-black text-white mt-1">
                    4-Core {matchedCable.size} XLPE/SWA/PVC
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mt-2">
                    <span>Safe In-Air Rating: <strong className="text-white">{matchedCable.capacity} A</strong></span>
                    <span>•</span>
                    <span>Voltage Drop: <strong className={bnbcCompliant ? 'text-emerald-400' : 'text-red-400'}>{voltageDropPercent.toFixed(2)}% ({voltageDropVolts.toFixed(1)}V)</strong></span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-400 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>Calculated with Bangladesh high-ambient derating factors (BNBC Chapter 2, Part 8).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>Includes separate 50% cross-section earth continuity conductor (ECC) sizing.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center text-xs">
                <span className="font-mono text-zinc-500">A. K. M. Rukon Uddin Blueprint Rule</span>
                <a href="#contact" className="text-orange-500 font-bold uppercase hover:underline flex items-center gap-1 font-mono">
                  Book Site Cable Schedule &rarr;
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Transformer Sizing */}
        {activeTab === 'transformer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                  Substation Sizing Parameters
                </h3>
                <span className="text-[10px] font-mono text-orange-500 px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded">
                  PDB / BREB / DESCO Guideline
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-300">Total Connected Machinery Load:</span>
                    <span className="text-orange-500 font-bold">{connectedLoadKw} kW</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2500"
                    step="50"
                    value={connectedLoadKw}
                    onChange={(e) => setConnectedLoadKw(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>50 kW (Commercial)</span>
                    <span>2500 kW (Heavy Spinning/Dyeing)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-300">Machinery Diversity / Coincidence Factor:</span>
                    <span className="text-orange-500 font-bold">{diversityFactor}</span>
                  </div>
                  <input
                    type="range"
                    min="0.50"
                    max="0.95"
                    step="0.05"
                    value={diversityFactor}
                    onChange={(e) => setDiversityFactor(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Maximum Demand = Connected Load × Diversity Factor = {(connectedLoadKw * diversityFactor).toFixed(0)} kW
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Target Operating PF</label>
                    <select
                      value={targetPf}
                      onChange={(e) => setTargetPf(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="0.95">0.95 (High PFI)</option>
                      <option value="0.90">0.90 (Standard)</option>
                      <option value="0.85">0.85 (Conservative)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Future Expansion Buffer</label>
                    <select
                      value={futureExpansionMargin}
                      onChange={(e) => setFutureExpansionMargin(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="15">+15% Reserve</option>
                      <option value="20">+20% Optimal (Recommended)</option>
                      <option value="30">+30% Rapid Growth Expansion</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                  <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                    Recommended Substation Rating
                  </h3>
                  <span className="px-2.5 py-0.5 bg-zinc-950 text-orange-500 border border-zinc-800 rounded text-[10px] font-mono uppercase font-bold">
                    Dyn11 Vector Group
                  </span>
                </div>

                <div className="p-6 bg-black border-2 border-orange-500 rounded-xl mb-6 text-center">
                  <div className="text-xs font-mono uppercase text-orange-500 tracking-widest font-bold mb-1">
                    Standard Industrial Transformer Rating
                  </div>
                  <div className="text-4xl sm:text-5xl font-display font-black text-white">
                    {recommendedTransformerKva} <span className="text-xl text-orange-500">kVA</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-2">
                    11kV / 0.415kV 3-Phase ONAN / Cast Resin Dry Type
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                  <div className="bg-black/60 p-3 rounded-xl border border-zinc-800">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase">HT Breaker (11kV)</div>
                    <div className="text-base font-mono font-bold text-white mt-1">{htCurrent.toFixed(1)} A</div>
                    <div className="text-[9px] text-orange-500 mt-0.5">630A VCB Panel</div>
                  </div>
                  <div className="bg-black/60 p-3 rounded-xl border border-zinc-800">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase">LT Incomer (415V)</div>
                    <div className="text-base font-mono font-bold text-white mt-1">{ltCurrent.toFixed(0)} A</div>
                    <div className="text-[9px] text-orange-500 mt-0.5">4P Air Circuit Breaker</div>
                  </div>
                  <div className="bg-black/60 p-3 rounded-xl border border-zinc-800">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase">Operating Load</div>
                    <div className="text-base font-mono font-bold text-emerald-400 mt-1">{transformerLoadingPercent.toFixed(0)}%</div>
                    <div className="text-[9px] text-zinc-500 mt-0.5">Ideal: 70-80% peak</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-400">
                <span className="font-bold text-white block mb-1">Civil &amp; Ventilation Mandatory Clearance:</span>
                Substation room requires minimum 3.6m ceiling height, 1.2m maintenance clearance around transformer tank, and automatic CO2 fire flooding / NFPA deluge protection.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: PFI Capacitor Bank */}
        {activeTab === 'pfi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                  Power Factor Improvement Sizing
                </h3>
                <span className="text-[10px] font-mono text-orange-500 px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded">
                  Zero Utility Penalty Rule
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-300">Average Running Active Load:</span>
                    <span className="text-orange-500 font-bold">{activeLoadKw} kW</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="1500"
                    step="20"
                    value={activeLoadKw}
                    onChange={(e) => setActiveLoadKw(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>20 kW (Light workshop)</span>
                    <span>1500 kW (Heavy mill)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-300">Present Power Factor (Lagging):</span>
                    <span className="text-red-400 font-bold">{currentPf}</span>
                  </div>
                  <input
                    type="range"
                    min="0.65"
                    max="0.88"
                    step="0.01"
                    value={currentPf}
                    onChange={(e) => setCurrentPf(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>0.65 (High inductive induction motors)</span>
                    <span>0.88 (Moderate uncorrected)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-300">Target Power Factor:</span>
                    <span className="text-emerald-400 font-bold">{desiredPf}</span>
                  </div>
                  <input
                    type="range"
                    min="0.95"
                    max="0.99"
                    step="0.01"
                    value={desiredPf}
                    onChange={(e) => setDesiredPf(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Standard target in Bangladesh is 0.98 lagging to guarantee safety buffer above the 0.90 billing penalty baseline.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                  <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                    Required Automatic Capacitor Bank
                  </h3>
                  <span className="px-2.5 py-0.5 bg-zinc-950 text-emerald-400 border border-zinc-800 rounded text-[10px] font-mono uppercase font-bold">
                    Microprocessor Controlled
                  </span>
                </div>

                <div className="p-6 bg-black border-2 border-orange-500 rounded-xl mb-6 text-center">
                  <div className="text-xs font-mono uppercase text-orange-500 tracking-widest font-bold mb-1">
                    Recommended Automatic PFI Rating
                  </div>
                  <div className="text-4xl sm:text-5xl font-display font-black text-white">
                    {roundedKvar} <span className="text-xl text-orange-500">kVAR</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-2">
                    Multi-stage automatic stepping with 7% detuned harmonic reactors
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Monthly Utility Surcharge Avoided:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      ≈ ৳ {estimatedAvoidedPenalty.toLocaleString('en-US', { maximumFractionDigits: 0 })} BDT / month
                    </span>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Cable &amp; Transformer Heat Losses Saved:</span>
                    <span className="font-mono font-bold text-white">12% - 18% thermal reduction</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl text-xs text-orange-200">
                <strong className="block font-display text-white mb-0.5 uppercase">Harmonics Caution:</strong>
                If your facility uses extensive VFD drives or induction furnaces, RUTA Engineering installs 7% or 14% detuned copper reactors to prevent capacitor bank resonance explosions.
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
