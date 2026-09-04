import { useState } from 'react';
import { incidentStats } from '../data';
import { ShieldAlert, Users, TrendingUp, DollarSign, Activity, FileWarning, CheckCircle } from 'lucide-react';

export default function LossVisualizer() {
  const [activeTab, setActiveTab ] = useState<'trends' | 'culprits' | 'prevention'>('trends');
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const selectedData = incidentStats.find(s => s.year === selectedYear) || incidentStats[4];

  // SVG drawing calculators
  const maxLoss = Math.max(...incidentStats.map(s => s.financialLossCroreBdt));
  const maxIncidents = Math.max(...incidentStats.map(s => s.incidentsCount));

  return (
    <section id="safety-warnings" className="py-20 bg-zinc-950 text-white relative overflow-hidden border-b border-zinc-800">
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-15 pointer-events-none"></div>
      
      {/* Decorative Red Ambience for Danger warning */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 text-xs font-mono uppercase tracking-wider rounded-md inline-flex items-center gap-1.5 mb-4">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            National Safety Audit Report
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white mb-4 leading-none font-display">
            The Devastating Cost of Poor Design
          </h2>
          <p className="text-zinc-400 font-sans text-md leading-relaxed">
            In Bangladesh, an alarming <span className="text-orange-500 font-black">75% to 81% of industrial fire outbreaks</span> are traced to faulty electrical connections, mismatched cable gauges, lack of Single-Line Diagrams (SLD), and neglected system loads.
          </p>
        </div>

        {/* Sub-navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-zinc-900 p-1 border border-zinc-800 rounded-xl">
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-4 py-2 font-display text-xs font-black uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                activeTab === 'trends'
                  ? 'bg-orange-500 text-black shadow-lg'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Bangladesh Hazard Trends
            </button>
            <button
              onClick={() => setActiveTab('culprits')}
              className={`px-4 py-2 font-display text-xs font-black uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                activeTab === 'culprits'
                  ? 'bg-orange-500 text-black shadow-lg'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Typical Critical Misassignments
            </button>
            <button
              onClick={() => setActiveTab('prevention')}
              className={`px-4 py-2 font-display text-xs font-black uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                activeTab === 'prevention'
                  ? 'bg-orange-500 text-black shadow-lg'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Certified Solutions
            </button>
          </div>
        </div>

        {activeTab === 'trends' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Graph Panel */}
            <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-display font-medium text-white">Loss Timeline (2020 - 2024)</h3>
                    <p className="text-zinc-500 text-xs">Based on Bangladesh Fire Service & Civil Defence Annual Registers</p>
                  </div>
                  <div className="flex gap-2 font-mono text-xs text-zinc-400">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-600 rounded-sm inline-block"></span> Financial Damage</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-orange-500 rounded-sm inline-block"></span> Total Fires</span>
                  </div>
                </div>

                {/* Highly-custom visual SVG chart for maximum design polish */}
                <div className="relative h-64 w-full mb-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                    {/* Grids */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="0" y1="140" x2="500" y2="140" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="0" y1="190" x2="500" y2="190" stroke="#3f3f46" strokeWidth="1" />

                    {/* Financial Loss Path Area (underneath) */}
                    <path
                      d={`M 10,${190 - (incidentStats[0].financialLossCroreBdt / maxLoss) * 150} 
                          L 130,${190 - (incidentStats[1].financialLossCroreBdt / maxLoss) * 150} 
                          L 250,${190 - (incidentStats[2].financialLossCroreBdt / maxLoss) * 150} 
                          L 370,${190 - (incidentStats[3].financialLossCroreBdt / maxLoss) * 150} 
                          L 490,${190 - (incidentStats[4].financialLossCroreBdt / maxLoss) * 150} 
                          L 490,190 L 10,190 Z`}
                      fill="url(#redGlowGrad)"
                      opacity="0.15"
                    />

                    {/* Financial Loss Line */}
                    <path
                      d={`M 10,${190 - (incidentStats[0].financialLossCroreBdt / maxLoss) * 150} 
                          L 130,${190 - (incidentStats[1].financialLossCroreBdt / maxLoss) * 150} 
                          L 250,${190 - (incidentStats[2].financialLossCroreBdt / maxLoss) * 150} 
                          L 370,${190 - (incidentStats[3].financialLossCroreBdt / maxLoss) * 150} 
                          L 490,${190 - (incidentStats[4].financialLossCroreBdt / maxLoss) * 150}`}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Fires Count Line (Dotted Yellow) */}
                    <path
                      d={`M 10,${190 - (incidentStats[0].incidentsCount / maxIncidents) * 140} 
                          L 130,${190 - (incidentStats[1].incidentsCount / maxIncidents) * 140} 
                          L 250,${190 - (incidentStats[2].incidentsCount / maxIncidents) * 140} 
                          L 370,${190 - (incidentStats[3].incidentsCount / maxIncidents) * 140} 
                          L 490,${190 - (incidentStats[4].incidentsCount / maxIncidents) * 140}`}
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2.5"
                      strokeDasharray="4,4"
                      strokeLinecap="round"
                    />

                    {/* Year Nodes and Interactive Click targets */}
                    {incidentStats.map((stat, idx) => {
                      const x = 10 + idx * 120;
                      const yFinancial = 190 - (stat.financialLossCroreBdt / maxLoss) * 150;
                      return (
                        <g key={stat.year} className="cursor-pointer group" onClick={() => setSelectedYear(stat.year)}>
                          <circle
                            cx={x}
                            cy={yFinancial}
                            r={selectedYear === stat.year ? "7" : "5"}
                            fill={selectedYear === stat.year ? "#dc2626" : "#09090b"}
                            stroke="#ef4444"
                            strokeWidth="2.5"
                            className="transition-all duration-300"
                          />
                          <text
                            x={x}
                            y={180}
                            fill={selectedYear === stat.year ? "#ffffff" : "#71717a"}
                            fontSize="8"
                            textAnchor="middle"
                            className="font-mono font-bold select-none transition-colors"
                          >
                            '{stat.year.toString().slice(-2)}
                          </text>
                        </g>
                      );
                    })}

                    <defs>
                      <linearGradient id="redGlowGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="text-zinc-500 text-xs font-sans text-center">
                  *Click on any node point on the timeline map to analyze annual statistics details.
                </p>
              </div>

              {/* Dynamic Bottom Row */}
              <div className="grid grid-cols-5 gap-3 border-t border-zinc-800 pt-4 mt-4 font-sans text-xs text-zinc-400">
                {incidentStats.map((stat) => (
                  <button
                    key={stat.year}
                    onClick={() => setSelectedYear(stat.year)}
                    className={`text-center py-1 rounded transition-colors cursor-pointer ${
                      selectedYear === stat.year
                        ? 'bg-zinc-800 text-orange-500 font-semibold border border-zinc-700'
                        : 'hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    {stat.year}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Interactive Telemetry Panels */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative">
                <span className="text-[10px] font-mono tracking-widest text-[#ef4444] block mb-2 uppercase">Selected Audit Year: {selectedData.year}</span>
                <h3 className="text-xl font-display font-semibold text-white mb-4">Deep Mismatch Diagnostics</h3>
                
                <div className="space-y-4 mb-5">
                  {/* Metric Progress Bar for Misallocated Wire Origin */}
                  <div>
                    <div className="flex justify-between text-xs text-zinc-300 font-mono mb-1.5">
                      <span>Electrical Design Failure Origin</span>
                      <span className="text-[#ef4444] font-bold">{selectedData.electricalShortCircuitPct}% Of Fires</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-700"
                        style={{ width: `${selectedData.electricalShortCircuitPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Visual Cards Row for specific stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-black border border-zinc-800 rounded-xl text-center">
                      <TrendingUp className="w-4 h-4 mx-auto mb-1.5 text-orange-500" />
                      <div className="text-sm font-mono font-bold text-white">{selectedData.incidentsCount.toLocaleString()}</div>
                      <div className="text-[10px] text-zinc-500">Recorded Fires</div>
                    </div>
                    <div className="p-3 bg-black border border-zinc-800 rounded-xl text-center">
                      <Users className="w-4 h-4 mx-auto mb-1.5 text-red-500" />
                      <div className="text-sm font-mono font-bold text-white">{selectedData.deathsCount}</div>
                      <div className="text-[10px] text-zinc-500">Casualties</div>
                    </div>
                    <div className="p-3 bg-black border border-zinc-800 rounded-xl text-center">
                      <DollarSign className="w-4 h-4 mx-auto mb-1.5 text-orange-500" />
                      <div className="text-sm font-mono font-bold text-white">Tk {selectedData.financialLossCroreBdt} Cr</div>
                      <div className="text-[10px] text-zinc-500">Direct Losses</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl text-sm leading-relaxed text-zinc-300">
                  <p className="italic">"{selectedData.description}"</p>
                </div>
              </div>

              {/* Warnings Panel */}
              <div className="bg-red-950/20 border-l-4 border-red-600 p-5 flex items-start gap-4 rounded-xl">
                <div className="p-3 bg-red-950/80 border border-red-500/20 text-red-500 rounded-xl shrink-0">
                  <FileWarning className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-red-500 uppercase tracking-wide mb-1">A Call For Verified Engineering</h4>
                  <p className="text-xs text-red-200/80 leading-relaxed font-sans">
                    Continuing to build or modify factory layouts without professional power flow calculations and NFPA smoke layout maps represents a high hazard sector. Safely layout systems today for a tiny fraction of budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'culprits' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <span className="text-red-500 font-mono text-xs font-semibold block mb-2 uppercase">CRITICAL MISTAKE #1</span>
              <h3 className="text-xl font-display font-medium text-white mb-3">Imbalanced Phase Loads</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Placing high single-phase machinery or lighting loads on a single phase of the distribution grid, causing neutral shifting. This leads to neutral line overheating, cable melting behind drywall panels, and instantaneous sparks.
              </p>
              <div className="p-3.5 bg-black rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center justify-between">
                <span>Neutral Overheating Risk:</span>
                <span className="text-red-500 font-bold">EXTREME HAZARD</span>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <span className="text-red-500 font-mono text-xs font-semibold block mb-2 uppercase">CRITICAL MISTAKE #2</span>
              <h3 className="text-xl font-display font-medium text-white mb-3">Undersized Main Cable Trays</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Purchasing low-gauge domestic cabling to route high-current commercial generators without applying temperature de-rating factors. Cables slowly char their PVC sleeves under nominal loads, initiating unseen electrical embers.
              </p>
              <div className="p-3.5 bg-black rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center justify-between">
                <span>Thermal Arc Threshold:</span>
                <span className="text-red-500 font-bold">&gt;180°C Charring</span>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <span className="text-red-500 font-mono text-xs font-semibold block mb-2 uppercase">CRITICAL MISTAKE #3</span>
              <h3 className="text-xl font-display font-medium text-white mb-3">Undetected Earthing Faults</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Skipping grounding loop resistance testing (requiring below 1.0 Ohm compliance). When heavy-duty motors leakage occurs, ground voltage rises, creating high-temperature arc flashes and instant touch-potentials that burn raw panels.
              </p>
              <div className="p-3.5 bg-black rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center justify-between">
                <span>Unmitigated Ground Arc:</span>
                <span className="text-red-500 font-bold">&lt;1Ω Standard Missing</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prevention' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="px-2.5 py-0.5 bg-zinc-800 text-orange-500 text-xs font-mono font-semibold rounded-md border border-zinc-700 inline-block mb-3 uppercase">The Professional Design Defense</span>
                <h3 className="text-2xl font-display font-semibold text-white mb-4 uppercase tracking-tight">How RUTA Engineering &amp; Automation Solves These Risks</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans">
                  By providing exhaustive structural blueprinting at exactly 1 BDT/sq ft, we democratize engineering safety, eliminating cost-cutting excuses for complex sites:
                </p>
                <div className="space-y-3">
                  {[
                    "Complete phase load calculations showing exact balance coefficients.",
                    "Proper wire sizing, copper cross-section checks, voltage drop offsets and CB trip matching.",
                    "Exhaustive earth-loop resistance blueprints with double grounding system grids.",
                    "BNBC 2020 & NFPA guidelines compliant active fire alarm maps and detectors coordinates.",
                    "Single Line Diagrams (SLD) ready for authorized electrical inspector signature audits."
                  ].map((sol, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-zinc-300 text-sm font-sans">{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 p-6 bg-black border border-zinc-800 rounded-2xl text-center">
                <Activity className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <div className="text-3xl font-display font-black uppercase text-white mb-1"><span className="text-orange-500">0%</span> Incident Rate</div>
                <div className="text-xs font-mono text-zinc-500 mb-4 tracking-wider uppercase">In 25 Years of Engineering Practice</div>
                <div className="h-0.5 bg-zinc-800 my-4"></div>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans mt-2">
                  All substations, distributions, safety panels engineered since 2001 continue running reliably across Gazipur, Tongi, Chattogram industrial segments with zero records of electrical breakdowns.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
