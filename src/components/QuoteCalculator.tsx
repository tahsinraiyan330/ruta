import React, { useState } from 'react';
import { serviceCatalog } from '../data';
import { Calculator, ArrowRight, Check, Sparkles, MapPin, Layers, Clock, AlertTriangle } from 'lucide-react';
import { Lead } from '../types';
import rutaLogo from '../assets/images/ruta_logo_1788542472103.jpg';

interface QuoteCalculatorProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
}

export default function QuoteCalculator({ onAddLead }: QuoteCalculatorProps) {
  const [selectedService, setSelectedService] = useState(serviceCatalog[0].id);
  const [useDimensions, setUseDimensions] = useState(false);
  const [length, setLength] = useState<number>(100);
  const [width, setWidth] = useState<number>(100);
  const [directArea, setDirectArea] = useState<number>(15000);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Dhaka Division');
  const [submitted, setSubmitted] = useState(false);

  // Derive Area in sq ft
  const areaSqFt = useDimensions ? length * width : directArea;

  // Rate of 1 BDT per sq ft is strictly enforced
  const activeService = serviceCatalog.find(s => s.id === selectedService) || serviceCatalog[0];
  const rate = activeService.ratePerSqFt; // 1.00 BDT
  const baseCost = areaSqFt * rate;

  // Derive drafting duration based on complexity
  const derivedDays = Math.max(7, Math.ceil(5 + (areaSqFt / 18000)));

  const handleCrmSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("Please fill in your Name and Contact Phone Number to submit.");
      return;
    }

    onAddLead({
      fullName,
      companyName: companyName || "Independent Premium Resident",
      email: email || "direct-client@website.com",
      phone,
      location,
      projectType: activeService.title as any,
      sizeSqFt: areaSqFt,
      estimatedCostBdt: Math.round(baseCost),
      priority: areaSqFt > 100000 ? 'High' : 'Medium',
      notes: `Generated via Automated Quote Calculator. Selected Category: ${activeService.title}. Derived Drafting Span: ${derivedDays} days.`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      // Reset submission fields
      setFullName('');
      setCompanyName('');
      setEmail('');
      setPhone('');
    }, 5000);
  };

  return (
    <section id="quote-calc" className="py-20 bg-zinc-950 text-white border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 text-xs font-mono uppercase tracking-wider rounded-md inline-flex items-center gap-1.5 mb-3">
            <Calculator className="w-3.5 h-3.5 text-orange-500" />
            Transparent Cost Calculator
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white font-display mb-3 leading-none">
            Estimate Your Blueprint Costs Instantly
          </h2>
          <p className="text-zinc-400 font-sans text-sm">
            No hidden layout commissions. No dynamic builder kickbacks. Exactly <span className="font-bold text-white text-orange-500">1.00 BDT per sq. ft.</span> for certified industrial factory floors and high-end residential schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Cost Input Parameters */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-sm text-white">
            <h3 className="text-lg font-display font-medium text-white mb-6 flex items-center gap-2 uppercase tracking-wide">
              <Layers className="w-5 h-5 text-orange-500" />
              1. Project Specifications
            </h3>

            {/* Service catalog select */}
            <div className="mb-6">
              <label className="block text-xs font-mono font-bold uppercase text-zinc-500 mb-2">Select Design Category</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceCatalog.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedService === service.id
                        ? 'border-orange-500 bg-black ring-1 ring-orange-500'
                        : 'border-zinc-850 bg-black hover:bg-zinc-900'
                    }`}
                  >
                    <div className="font-display font-bold text-sm text-white uppercase tracking-tight">{service.title}</div>
                    <div className="text-[11px] text-orange-500 font-mono mt-1">Rate: {service.ratePerSqFt.toFixed(2)} BDT / SQFT</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Switch between direct size entry and Length x Width */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono font-bold uppercase text-zinc-500">Calculator Mode</span>
              <button
                type="button"
                onClick={() => setUseDimensions(!useDimensions)}
                className="text-xs text-orange-500 hover:text-orange-400 font-semibold underline underline-offset-2 cursor-pointer"
              >
                {useDimensions ? "Enter Area in Sq.Ft directly" : "Calculate Area via Dimensions"}
              </button>
            </div>

            {useDimensions ? (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Length (Feet)</label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={length}
                    onChange={(e) => setLength(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 border border-zinc-800 bg-black rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Width (Feet)</label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={width}
                    onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 border border-zinc-800 bg-black rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono text-sm text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Total Covered Floor Area (Square Feet)</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={directArea}
                    onChange={(e) => setDirectArea(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <input
                    type="number"
                    min="100"
                    max="10000000"
                    value={directArea}
                    onChange={(e) => setDirectArea(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-32 px-3 py-1.5 border border-zinc-800 bg-black rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono text-sm text-right font-bold text-white"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                  <span>1,000 sq ft</span>
                  <span>Ideal for High-End Flats</span>
                  <span>500,000 sq ft</span>
                </div>
              </div>
            )}

            {/* Quick Presets row */}
            <div className="mb-8 pt-4 border-t border-zinc-850">
              <span className="text-[10px] font-mono text-zinc-500 block mb-2 uppercase">Quick architectural scale presets</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Gulshan Duplex (4,500 sq ft)", size: 4500 },
                  { label: "Dhanmondi Sky-Villa (15,000 sq ft)", size: 15000 },
                  { label: "Commercial 10-Story Mall (80,000 sq ft)", size: 80000 },
                  { label: "Apex Gazipur RMG Wing (220,000 sq ft)", size: 220000 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                       setUseDimensions(false);
                       setDirectArea(preset.size);
                    }}
                    className="px-2.5 py-1 bg-zinc-850 hover:bg-orange-500 hover:text-black text-zinc-350 rounded text-[11px] font-mono transition-all cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subform to instantly submit lead into the CRM */}
            <form onSubmit={handleCrmSync} className="bg-black rounded-xl p-4 sm:p-5 border border-zinc-800 mt-4">
              <h4 className="text-xs font-mono font-bold uppercase text-orange-500 mb-3 flex items-center gap-1.5 tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Submit Design Quote Directly to CRM Pipeline
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name (Required)"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-800 bg-zinc-950 rounded-md text-xs text-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company Name (optional)"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-800 bg-zinc-950 rounded-md text-xs text-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone (e.g. +88017...)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-800 bg-zinc-950 rounded-md text-xs font-mono text-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-800 bg-zinc-950 text-zinc-300 rounded-md text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Dhaka Division">Dhaka Division (ঢাকা)</option>
                    <option value="Chattogram Division">Chattogram Division (চট্টগ্রাম)</option>
                    <option value="Rajshahi Division">Rajshahi Division (রাজশাহী)</option>
                    <option value="Khulna Division">Khulna Division (খুলনা)</option>
                    <option value="Barishal Division">Barishal Division (বরিশাল)</option>
                    <option value="Sylhet Division">Sylhet Division (সিলেট)</option>
                    <option value="Rangpur Division">Rangpur Division (রংপুর)</option>
                    <option value="Mymensingh Division">Mymensingh Division (ময়মনসিংহ)</option>
                  </select>
                </div>
              </div>

              {submitted ? (
                <div className="p-3 bg-zinc-900 border border-orange-500 text-orange-400 text-xs rounded-lg text-center font-medium font-mono uppercase tracking-wider animate-pulse">
                  ✓ Successfully injected into RUTA Engineering &amp; Automation's active CRM workspace! Click 'Engineer CRM Desk' on the navbar overhead to view this lead live.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-orange-500 text-black rounded-lg text-xs font-display font-black uppercase tracking-widest hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Confirm Estimate &amp; Lock-in Schedule Slot
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </form>

          </div>

          {/* Right Column: Estimated Outflows Sheet */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Visual Invoice Details Dashboard */}
            <div className="bg-zinc-90 w-full bg-zinc-900 text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-xl border border-zinc-800">
              
              <div className="absolute inset-0 blueprint-grid-dark opacity-10 pointer-events-none"></div>

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-zinc-800 bg-black shrink-0">
                    <img
                      src={rutaLogo}
                      alt="RUTA Engineering &amp; Automation Logo"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">Design Estimates Invoice</h3>
                    <div className="text-xs text-zinc-300 font-display font-bold mt-0.5">RUTA Engineering &amp; Automation</div>
                  </div>
                </div>
                <div className="px-2 py-0.5 bg-zinc-950 text-orange-500 text-[10px] font-mono border border-zinc-800 rounded">
                  IEB Registered Office
                </div>
              </div>

              {/* Massive Cost display */}
              <div className="mb-6 pt-4 border-t border-zinc-800">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">Grand Calculated Design Fee</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-display font-black text-orange-500 tracking-tight uppercase">
                    Tk {baseCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">BDT Total</span>
                </div>
                <div className="text-[10px] font-mono text-orange-500/80 mt-1 uppercase">
                  (Rate: 1.00 BDT / sq. ft. flat cost of coverage)
                </div>
              </div>

              {/* Derived parameters */}
              <div className="space-y-3.5 text-xs font-mono mb-6 pt-4 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">Arch Covered Ground:</span>
                  <span className="text-white font-bold">{areaSqFt.toLocaleString()} Sq. Ft.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">Blueprinting Timeline:</span>
                  <span className="text-orange-500 font-bold flex items-center gap-1 font-sans">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    ~{derivedDays} working days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">Tax Auditing Standard:</span>
                  <span className="text-orange-500 font-bold">BNBC 2020 Compliant</span>
                </div>
              </div>

              {/* Professional Scope of Work checklist included for 1 BDT */}
              <div className="bg-black p-4 border border-zinc-800 rounded-xl">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-500 mb-2.5">
                  Included Blueprints Blueprinting Package:
                </div>
                <div className="space-y-2 text-xs">
                  {activeService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-zinc-300 font-sans text-[11px]">{item}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2.5 font-sans pt-1 text-[11px] font-bold text-orange-400">
                    <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span>Double ground loop maps &amp; Lightning Arrester positioning</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Safety Reminder badge */}
            <div className="bg-orange-500/10 border-l-4 border-orange-500 rounded-r-xl p-5 text-zinc-300 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-display text-white mb-0.5 uppercase tracking-wider text-xs">Warning against commission-cutters</strong>
                We do not solicit commission kickbacks from wire manufacturers, transformer builders or vendors. Our flat fee ensures RUTA Engineering &amp; Automation designs purely for maximum safety limits, never for manufacturing markups.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
