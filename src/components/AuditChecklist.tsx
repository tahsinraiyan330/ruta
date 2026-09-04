import { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, AlertCircle, Award, Printer, ArrowRight, Download, FileCheck, CheckCircle2 } from 'lucide-react';

interface AuditItem {
  id: string;
  category: 'SLD & Electrical' | 'Fire Alarm & Detection' | 'Earthing & Lightning' | 'Substation & Transformer';
  title: string;
  requirement: string;
  standard: string;
  mandatory: boolean;
}

export default function AuditChecklist() {
  const auditItems: AuditItem[] = [
    {
      id: 'chk-1',
      category: 'SLD & Electrical',
      title: 'Certified As-Built Single Line Diagram (SLD)',
      requirement: 'Physical SLD displayed in laminated glass frame at substation entrance signed by certified professional engineer.',
      standard: 'BNBC 2020 / RSC Clause 3.2',
      mandatory: true
    },
    {
      id: 'chk-2',
      category: 'SLD & Electrical',
      title: 'Infrared Thermographic Scan Report',
      requirement: 'Annual thermographic imaging of all LT/HT busbars, ACB terminals and distribution boards showing no hotspots >50°C delta.',
      standard: 'NFPA 70B / RSC Electrical Standard',
      mandatory: true
    },
    {
      id: 'chk-3',
      category: 'SLD & Electrical',
      title: 'Segregated Cable Trays & Fire Barrier Stops',
      requirement: 'HT, LT power and data cables routed in distinct trays with intumescent firestop seals through floor penetrations.',
      standard: 'BNBC Part 8, Chap 2 / BS 7671',
      mandatory: true
    },
    {
      id: 'chk-4',
      category: 'Fire Alarm & Detection',
      title: 'Intelligent Addressable Fire Alarm Control Panel (FACP)',
      requirement: 'Dual loop addressable panel with minimum 24-hour battery backup and smoke/heat detectors mapped per room code.',
      standard: 'NFPA 72 / FSCD Bangladesh',
      mandatory: true
    },
    {
      id: 'chk-5',
      category: 'Fire Alarm & Detection',
      title: 'Emergency Lighting & Illuminated Exit Signs',
      requirement: 'Self-powered 90-minute autonomous battery backup exit signage along all factory escape routes.',
      standard: 'BNBC 2020 Part 4 / NFPA 101',
      mandatory: true
    },
    {
      id: 'chk-6',
      category: 'Fire Alarm & Detection',
      title: 'Deluge / Sprinkler Interlock Trip System',
      requirement: 'Automatic tripping of electrical supply in affected fire zones before sprinkler water release to avoid electrocution.',
      standard: 'NFPA 13 & 72 Interlock Rules',
      mandatory: true
    },
    {
      id: 'chk-7',
      category: 'Earthing & Lightning',
      title: 'Individual Earth Pit Resistance <= 1.0 Ohm',
      requirement: 'Substation and transformer neutral earth pits tested with 3-point fall-of-potential megger showing earth loop <= 1Ω.',
      standard: 'BNBC 2020 / IEEE 142 Standard',
      mandatory: true
    },
    {
      id: 'chk-8',
      category: 'Earthing & Lightning',
      title: 'Certified Lightning Protection System (LPS)',
      requirement: 'Early Streamer Emission (ESE) or Faraday cage mesh covering 100% of factory roof perimeter with surge arresters.',
      standard: 'NFPA 780 / IEC 62305',
      mandatory: true
    },
    {
      id: 'chk-9',
      category: 'Earthing & Lightning',
      title: 'Equipment Enclosure Earth Continuity (ECC)',
      requirement: 'All metallic machinery bodies, cable trays, and generator enclosures bonded with green/yellow earthing conductors.',
      standard: 'BNBC Part 8 / Accord Protocol',
      mandatory: true
    },
    {
      id: 'chk-10',
      category: 'Substation & Transformer',
      title: 'Transformer Oil Breakdown Voltage (BDV) > 40kV',
      requirement: 'Annual dielectric breakdown voltage laboratory certification and dissolved gas analysis (DGA).',
      standard: 'IEC 60156 Standard',
      mandatory: true
    },
    {
      id: 'chk-11',
      category: 'Substation & Transformer',
      title: 'Fire Resistance & Clearance Walls (2-Hour Rated)',
      requirement: 'Substation room isolated from production floor with 2-hour fire rated masonry and emergency outward opening steel doors.',
      standard: 'BNBC 2020 Part 4',
      mandatory: true
    },
    {
      id: 'chk-12',
      category: 'Substation & Transformer',
      title: 'Automatic Capacitor Bank (PFI) Reactor De-Tuning',
      requirement: 'Capacitor bank equipped with 7% detuned reactors to block 5th and 7th order harmonic resonance spikes.',
      standard: 'IEEE 519 / PDB Guidelines',
      mandatory: false
    }
  ];

  // Store completed checks in state
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    'chk-1': true,
    'chk-2': true,
    'chk-4': true,
    'chk-7': true,
    'chk-10': true
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const toggleItem = (id: string) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalCount = auditItems.length;
  const passedCount = Object.values(completed).filter(Boolean).length;
  const scorePercent = Math.round((passedCount / totalCount) * 100);

  const filteredItems = selectedCategory === 'All'
    ? auditItems
    : auditItems.filter(item => item.category === selectedCategory);

  const categories = ['All', 'SLD & Electrical', 'Fire Alarm & Detection', 'Earthing & Lightning', 'Substation & Transformer'];

  return (
    <section id="audit-matrix" className="py-20 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 rounded-md text-xs font-mono uppercase tracking-wider mb-3">
              <FileCheck className="w-3.5 h-3.5" />
              AUDIT IMMUNITY PROTOCOL // ACCORD / RSC / NIRAPON / DIFE
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Factory Compliance &amp; Inspection Matrix
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
              Evaluate your industrial facility against the exact 12-point protocol audited by European &amp; North American buyer inspectors in Bangladesh.
            </p>
          </div>

          {/* Interactive Readiness Scorecard Badge */}
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Audit Readiness</span>
              <span className={`text-2xl font-display font-black uppercase ${
                scorePercent >= 80 ? 'text-emerald-400' : scorePercent >= 50 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {scorePercent}% Ready
              </span>
              <span className="text-[10px] font-mono text-zinc-400 block">{passedCount} of {totalCount} verified</span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-orange-500 font-display font-black text-lg">
              {scorePercent >= 80 ? '✓ A' : scorePercent >= 50 ? '! B' : '✕ C'}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-black font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Audit Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isChecked = !!completed[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isChecked
                    ? 'bg-zinc-900/90 border-emerald-500/40 hover:border-emerald-500'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 border ${
                  isChecked ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                }`}>
                  {isChecked ? <CheckCircle2 className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-display font-bold uppercase tracking-tight ${isChecked ? 'text-white' : 'text-zinc-300'}`}>
                      {item.title}
                    </h4>
                    {item.mandatory && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 shrink-0 uppercase">
                        Mandatory
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">
                    {item.requirement}
                  </p>

                  <div className="flex items-center gap-3 mt-3 text-[10px] font-mono text-zinc-500">
                    <span className="text-orange-500">{item.standard}</span>
                    <span>•</span>
                    <span className="capitalize">{item.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA for Full Site Remediation */}
        <div className="mt-10 p-6 sm:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="text-lg font-display font-black text-white uppercase tracking-tight">
              Facing an Upcoming RSC / DIFE / Accord Factory Audit?
            </h4>
            <p className="text-zinc-400 text-xs mt-1 font-sans max-w-xl">
              Engr. A. K. M. Rukon Uddin conducts comprehensive on-site pre-audit verification across all 8 divisions of Bangladesh with same-week certified remediation drawings.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-black font-display font-black uppercase text-xs tracking-widest rounded-lg flex items-center gap-2 shrink-0 transition-colors"
          >
            Schedule On-Site Pre-Audit Inspection
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
