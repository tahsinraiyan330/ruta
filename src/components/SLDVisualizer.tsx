import { useState } from 'react';
import { Activity, ShieldCheck, Zap, AlertTriangle, Play, RefreshCw, Cpu, Layers, Radio, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

interface SLDNode {
  id: string;
  name: string;
  type: string;
  voltage: string;
  status: 'online' | 'warning' | 'tripped' | 'backup';
  details: {
    specification: string;
    protectionType: string;
    standard: string;
    notes: string;
  };
}

export default function SLDVisualizer() {
  const [simulationMode, setSimulationMode] = useState<'normal' | 'overload' | 'generator' | 'earth_fault' | 'fire_trip'>('normal');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-transformer');

  const sldNodes: SLDNode[] = [
    {
      id: 'node-grid',
      name: '33kV / 11kV Grid Infeed',
      type: 'Utility High Voltage Infeed',
      voltage: '11,000 V (HT)',
      status: simulationMode === 'generator' ? 'tripped' : 'online',
      details: {
        specification: 'Dual feeder overhead transmission lines with drop-out fuse (DOF) & 11kV lightning arresters (LA)',
        protectionType: '10kA surge arresters, outdoor gang-operated air break switch (GOAB)',
        standard: 'PDB / BREB / DESCO Substation Interconnect Rules',
        notes: simulationMode === 'generator' ? 'Grid blackout detected. Automatic Transfer Switch (ATS) commanded.' : 'Operating stably at 50.0 Hz nominal frequency.'
      }
    },
    {
      id: 'node-vcb',
      name: '11kV Vacuum Circuit Breaker (VCB)',
      type: 'HT Incomer Switchgear',
      voltage: '11 kV AC',
      status: simulationMode === 'generator' ? 'backup' : simulationMode === 'earth_fault' ? 'tripped' : 'online',
      details: {
        specification: '630A, 25kA/3sec breaking capacity, motor-charged spring mechanism',
        protectionType: 'Microprocessor Numerical Relay (50/51 Overcurrent + 50N/51N Earth Fault, 86 Master Trip)',
        standard: 'IEC 62271-100 / BNBC 2020',
        notes: simulationMode === 'earth_fault' ? 'Tripped on 50N instantaneous earth-fault trip. Bus de-energized.' : 'Relay armed. Trip coil circuit healthy.'
      }
    },
    {
      id: 'node-transformer',
      name: '1500 kVA Step-Down Transformer',
      type: 'Power Step-Down',
      voltage: '11kV / 0.415kV (Dyn11)',
      status: simulationMode === 'overload' ? 'warning' : 'online',
      details: {
        specification: '1500 kVA, Copper wound ONAN oil-immersed / Cast resin dry type, Impedance 6.0%',
        protectionType: 'Buchholz relay gas detector, winding temperature indicator (WTI), oil temperature indicator (OTI), PRV',
        standard: 'IEC 60076 / BNBC 2020 Chapter 2',
        notes: simulationMode === 'overload' ? 'Warning: Operating at 96% load. Temperature rising above 75°C. Cooling fans engaged.' : 'Load balanced across 3 phases (R-420A, Y-415A, B-425A).'
      }
    },
    {
      id: 'node-acb',
      name: 'Main LT Panel & Air Circuit Breaker (ACB)',
      type: 'Low Tension Incomer',
      voltage: '415V 3-Phase + Neutral',
      status: simulationMode === 'fire_trip' ? 'tripped' : 'online',
      details: {
        specification: '2500A 4-Pole Draw-out ACB, 65kA Icu, Electronic Microprocessor Trip Release',
        protectionType: 'LSIG (Long time delay, Short time, Instantaneous, Ground fault protection)',
        standard: 'IEC 60947-2',
        notes: simulationMode === 'fire_trip' ? 'Tripped via shunt release command from Addressable Fire Alarm Panel interlock.' : 'Energized. Busbar trunking (BBT) feeds active.'
      }
    },
    {
      id: 'node-pfi',
      name: '600 kVAR Automatic PFI Plant',
      type: 'Capacitor Bank & Reactor',
      voltage: '415V / 440V',
      status: 'online',
      details: {
        specification: '600 kVAR staged (12-step automatic microprocessor controller) with 7% detuned harmonic reactors',
        protectionType: 'HRC fuses per step, thermal overload relays, discharge resistors',
        standard: 'PDB Mandatory Power Factor Benchmark (cos φ >= 0.95)',
        notes: 'Active power factor maintained at 0.98 lagging. Zero utility surcharge penalty.'
      }
    },
    {
      id: 'node-plc',
      name: 'Automation PLC & SCADA RTU Core',
      type: 'Industrial Automation Master',
      voltage: '24V DC Regulated',
      status: simulationMode === 'fire_trip' ? 'warning' : 'online',
      details: {
        specification: 'Siemens S7-1500 / Schneider Modicon M241 with Modbus TCP/IP, Profinet & Cellular RTU',
        protectionType: 'Optoisolated digital inputs, surge suppressor diodes, dual redundant 24V UPS power',
        standard: 'IEC 61131-3 / Industrial IoT Telemetry',
        notes: simulationMode === 'fire_trip' ? 'Fire protocol engaged: Shutting down ventilation dampers and machinery drives. Activating emergency lighting.' : 'Streaming real-time energy telemetry and motor statuses to plant control room.'
      }
    },
    {
      id: 'node-mcc',
      name: 'Motor Control Center (MCC) & VFD Drives',
      type: 'Final Machine Distribution',
      voltage: '415V / 230V',
      status: simulationMode === 'overload' ? 'warning' : simulationMode === 'fire_trip' ? 'tripped' : 'online',
      details: {
        specification: 'Modular Form 4b segregated switchboard with ABB/Schneider Variable Frequency Drives (VFD)',
        protectionType: 'Electronic motor protection, phase loss detection, earth leakage circuit breakers (ELCB 30mA)',
        standard: 'BNBC 2020 / Accord/RSC Electrical Safety Guidelines',
        notes: simulationMode === 'fire_trip' ? 'Safe emergency power down completed.' : 'All motor feeders operating within thermal limits.'
      }
    }
  ];

  const selectedNode = sldNodes.find(n => n.id === selectedNodeId) || sldNodes[2];

  return (
    <section id="sld-schematic" className="py-20 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 rounded-md text-xs font-mono uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              INTERACTIVE ARCHITECTURE // SLD &amp; AUTOMATION SCHEMATIC
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Single Line Diagram (SLD) &amp; Control Architecture
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
              Explore how RUTA Engineering &amp; Automation designs zero-compromise electrical distribution, interlock protections, and PLC automation loops from high-voltage substation to final machinery.
            </p>
          </div>

          {/* Simulation Toggle Modes */}
          <div className="flex flex-wrap items-center gap-2 bg-zinc-900/80 p-1.5 border border-zinc-800 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 font-bold">Simulate Event:</span>
            <button
              onClick={() => setSimulationMode('normal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer ${
                simulationMode === 'normal' ? 'bg-orange-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Normal Load
            </button>
            <button
              onClick={() => setSimulationMode('overload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer ${
                simulationMode === 'overload' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Overload 96%
            </button>
            <button
              onClick={() => setSimulationMode('generator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer ${
                simulationMode === 'generator' ? 'bg-blue-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Grid Loss &amp; ATS
            </button>
            <button
              onClick={() => setSimulationMode('earth_fault')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer ${
                simulationMode === 'earth_fault' ? 'bg-red-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Earth Fault 50N
            </button>
            <button
              onClick={() => setSimulationMode('fire_trip')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer ${
                simulationMode === 'fire_trip' ? 'bg-rose-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Fire Trip Interlock
            </button>
          </div>
        </div>

        {/* The Interactive SLD Diagram Rail & Live Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left / Main Rail: Diagram Flow */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">Live Power Topology Flow</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Click any component node to inspect</span>
            </div>

            {/* Vertical Flow Diagram Nodes */}
            <div className="space-y-4 relative">
              {/* Connecting Bus Line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-orange-500 via-zinc-700 to-orange-500 z-0 pointer-events-none"></div>

              {sldNodes.map((node, index) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`relative z-10 flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-black border-orange-500 shadow-lg shadow-orange-500/10'
                        : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-950'
                    }`}
                  >
                    {/* Status Pip */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      node.status === 'online'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : node.status === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse'
                        : node.status === 'backup'
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-500 animate-bounce'
                    }`}>
                      {node.type.includes('PLC') ? (
                        <Cpu className="w-5 h-5" />
                      ) : (
                        <Zap className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-zinc-500 font-bold">0{index + 1}.</span>
                          <h4 className="text-sm font-display font-bold text-white uppercase tracking-tight truncate">
                            {node.name}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 shrink-0">
                          {node.voltage}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 mt-1 truncate font-sans">
                        {node.details.specification}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-[10px] font-mono">
                        <span className={`capitalize font-bold ${
                          node.status === 'online' ? 'text-emerald-400' : node.status === 'warning' ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          ● {node.status}
                        </span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-orange-400/80">{node.details.protectionType.split(',')[0]}</span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 mt-3 transition-transform ${isSelected ? 'text-orange-500 translate-x-1' : 'text-zinc-600'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Node Engineering Inspector */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-orange-500" />
                  <span className="font-mono text-xs uppercase tracking-wider text-orange-500 font-bold">
                    Substation Spec Sheet
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">
                  IEB FE-12109 Signature Ready
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Component Details</span>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                  {selectedNode.name}
                </h3>
                <div className="text-xs font-mono text-orange-400 mt-1">
                  Operating Voltage: {selectedNode.voltage} • Classification: {selectedNode.type}
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="p-4 bg-black rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Design Specifications
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                    {selectedNode.details.specification}
                  </p>
                </div>

                <div className="p-4 bg-black rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Protection Relays &amp; Tripping Scheme
                  </span>
                  <p className="text-xs text-orange-300 leading-relaxed font-mono">
                    {selectedNode.details.protectionType}
                  </p>
                </div>

                <div className="p-4 bg-black rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Compliance Code &amp; Testing Benchmark
                  </span>
                  <p className="text-xs text-zinc-300 font-mono">
                    {selectedNode.details.standard}
                  </p>
                </div>

                <div className={`p-4 rounded-xl border text-xs font-sans leading-relaxed ${
                  selectedNode.status === 'online'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : selectedNode.status === 'warning'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                    : 'bg-red-500/10 border-red-500/20 text-red-200'
                }`}>
                  <strong className="block uppercase font-mono mb-1 font-bold">
                    Active Telemetry Status:
                  </strong>
                  {selectedNode.details.notes}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <a
                  href="#contact"
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-black font-display font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  Request Full CAD / PDF Blueprint for this System
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Engineering Advantage Note */}
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 text-xs text-zinc-400 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-display uppercase tracking-wide mb-0.5">
                  100% Inspection Immunity Guarantee
                </strong>
                Every Single Line Diagram prepared by RUTA Engineering &amp; Automation includes authenticated relay coordination curves (TCC) to ensure zero spurious tripping during factory shifts.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
