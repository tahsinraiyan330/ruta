import { Cpu, Activity, Gauge, Radio, Settings2, Sliders, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function AutomationCapabilities() {
  const automationSolutions = [
    {
      icon: Cpu,
      title: 'PLC Architecture & Control Panels',
      platforms: ['Siemens S7-1500 / S7-1200', 'Schneider Modicon M241/M251', 'Allen-Bradley Micro850', 'Delta DVP Series'],
      description: 'Custom industrial automation panel design, deterministic ladder logic, fail-safe interlocks, and sensor integration for high-throughput continuous manufacturing.'
    },
    {
      icon: Activity,
      title: 'Enterprise SCADA & HMI Systems',
      platforms: ['Siemens WinCC Unified', 'Ignition by Inductive Automation', 'Wonderware InTouch', 'Weintek & Pro-face HMI'],
      description: 'Centralized plant control rooms, interactive graphic mimic diagrams, alarm annunciation logs, historical trending, and automated production recipe management.'
    },
    {
      icon: Sliders,
      title: 'VFD Multi-Drive & Motion Systems',
      platforms: ['ABB ACS880 / ACS580', 'Schneider Altivar Process', 'Danfoss VLT AutomationDrive', 'Yaskawa GA700'],
      description: 'Harmonic mitigation, constant pressure water booster systems, textile spinning frame multi-speed sequencing, and 25-35% energy reduction on industrial fan/pump loads.'
    },
    {
      icon: Radio,
      title: 'Substation SCADA & IEC 61850 RTU',
      platforms: ['IEC 61850 Goose Protocol', 'Modbus TCP/IP & RTU', 'DNP3 / IEC 60870-5-104', 'Cellular 4G/5G Industrial Gateway'],
      description: 'Remote telemetry for 33kV/11kV substations, automatic vacuum circuit breaker trip logging, transformer temperature alerts, and cloud power quality surveillance.'
    },
    {
      icon: Gauge,
      title: 'Energy Management System (EMS)',
      platforms: ['Schneider PowerLogic', 'Siemens SENTRON PAC', 'Multi-tenant Modbus Cloud', 'Tariff Cost Allocator'],
      description: 'Per-floor and per-machine power metering, automatic peak-demand alarm to prevent maximum demand contract penalties, and CO2 emissions carbon footprint reporting.'
    },
    {
      icon: Settings2,
      title: 'Pharmaceutical Cleanroom BMS',
      platforms: ['21 CFR Part 11 Compliance', 'Differential Pressure Control', 'HEPA Filter Air Velocity', 'Humidity & Temp Loops'],
      description: 'Turnkey Building Management System (BMS) for FDA & WHO GMP pharmaceutical manufacturing lines, air handling unit (AHU) cascade controls, and environmental logging.'
    }
  ];

  return (
    <section id="automation-capabilities" className="py-20 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 rounded-md text-xs font-mono uppercase tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5" />
              INDUSTRY 4.0 INTEGRATION // AUTOMATION DIVISION
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Industrial Automation &amp; Smart Control Systems
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
              From standalone PLC machine retrofits to factory-wide SCADA supervisory networks, RUTA Engineering &amp; Automation engineers mission-critical control hardware and software.
            </p>
          </div>

          <a
            href="#contact"
            className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-orange-500 border border-zinc-800 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            Request Automation Architecture Proposal &rarr;
          </a>
        </div>

        {/* Grid of Automation Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automationSolutions.map((sol, index) => {
            const Icon = sol.icon;
            return (
              <div
                key={index}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col justify-between hover:border-orange-500/50 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-black border border-zinc-800 group-hover:border-orange-500/50 text-orange-500 flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight mb-2 group-hover:text-orange-400 transition-colors">
                    {sol.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                    {sol.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
                    Target Platforms:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sol.platforms.map((plat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-black border border-zinc-800 text-zinc-300 rounded text-[10px] font-mono"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Industrial Standards Bar */}
        <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span>Industrial Protocols: Modbus TCP/RTU • Profinet • Ethernet/IP • CANopen • OPC-UA • MQTT</span>
          </div>
          <div className="text-orange-500 font-bold">
            Certified System Integrator Standards
          </div>
        </div>

      </div>
    </section>
  );
}
