import { useState } from 'react';
import { portfolioProjects } from '../data';
import { Layers, MapPin, CheckCircle, Tag, Ruler, Sparkles, Building, Calendar } from 'lucide-react';

export default function Portfolio() {
  const [filter, setFilter] = useState<'All' | 'Industrial' | 'Power Systems' | 'Fire & Safety Grid' | 'High-End Residential'>('All');

  const filteredProjects = filter === 'All'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-zinc-950 text-white border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 text-xs font-mono uppercase tracking-wider rounded-md inline-block mb-3">
              Certified Case Studies
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white font-display mb-2 leading-none">
              Safe, Compliant Infrastructure
            </h2>
            <p className="text-zinc-400 font-sans mt-2 max-w-2xl text-sm leading-relaxed">
              Explore 25 years of electrical, substation, and active addressable fire alarm designs meticulously executed throughout Bangladesh's elite commercial centers and heavy industrial zones.
            </p>
          </div>

          {/* Categories select pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {(['All', 'Industrial', 'Power Systems', 'Fire & Safety Grid', 'High-End Residential'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-display font-black uppercase tracking-widest transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-orange-500 text-black shadow-sm'
                    : 'bg-zinc-900 text-zinc-455 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article 
              key={project.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              {/* Card Header visual band */}
              <div className="p-5 pb-0">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-2 py-0.5 bg-black text-orange-500 border border-zinc-800 text-[10px] font-mono rounded font-black uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-550 text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Delivery: {project.year}
                  </span>
                </div>

                <h3 className="text-md font-display font-bold text-white mb-2 leading-snug uppercase tracking-tight hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Specs & Highlight Table */}
              <div className="px-5 py-4 bg-black/60 border-y border-zinc-800/60 space-y-2 text-xs">
                <div className="flex justify-between text-[11px] font-sans">
                  <span className="text-zinc-500 font-medium flex items-center gap-1">
                    <Building className="w-3 text-zinc-600" />
                    Client Partner:
                  </span>
                  <span className="text-white font-bold">{project.client}</span>
                </div>
                <div className="flex justify-between text-[11px] font-sans">
                  <span className="text-zinc-500 font-medium flex items-center gap-1">
                    <MapPin className="w-3 text-zinc-600" />
                    Location Setup:
                  </span>
                  <span className="text-white font-bold truncate max-w-[160px]">{project.location}</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-zinc-500 flex items-center gap-1 font-sans">
                    <Ruler className="w-3 text-zinc-600" />
                    Total Area:
                  </span>
                  <span className="text-white font-bold">{project.sizeSqFt.toLocaleString()} sq ft</span>
                </div>
                {project.capacity && (
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="text-zinc-500">System Capability:</span>
                    <span className="text-orange-500 font-semibold truncate max-w-[160px]">{project.capacity}</span>
                  </div>
                )}
              </div>

              {/* Footnotes & Cost highlight */}
              <div className="p-5 pt-4 bg-zinc-900">
                {/* Metric banner */}
                <div className="flex items-start gap-2 bg-black border border-zinc-800 p-2.5 rounded-lg text-[11px] text-zinc-300 leading-relaxed font-sans mb-4">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Verification outcome:</strong> {project.highlightMetric}
                  </div>
                </div>

                {/* Badges of Standard alignment */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.standardsComplied.map((st) => (
                    <span key={st} className="px-1.5 py-0.5 bg-zinc-950 text-zinc-500 text-[9px] font-mono rounded border border-zinc-800">
                      {st}
                    </span>
                  ))}
                </div>

                {/* Cost at 1 BDT/sq.ft */}
                <div className="flex justify-between items-center text-xs font-mono border-t border-zinc-800 pt-3">
                  <span className="text-zinc-500 uppercase">Design Blueprint Cost:</span>
                  <span className="font-black text-orange-500 text-sm">
                    Tk {project.costBdt.toLocaleString()} BDT
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
