import { engineerBio } from '../data';
import { Calculator, FileText, ArrowUpRight, Award, BadgeAlert } from 'lucide-react';
import rutaLogo from '../assets/images/ruta_logo_1788542472103.jpg';

interface HeroProps {
  onQuoteClick: () => void;
  onInquiryClick: () => void;
}

export default function Hero({ onQuoteClick, onInquiryClick }: HeroProps) {
  return (
    <header id="bio" className="relative bg-zinc-950 text-white py-20 lg:py-28 overflow-hidden border-b border-zinc-800">
      {/* Dynamic technical blueprint lines */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-15 pointer-events-none"></div>

      {/* Decorative gradient shadows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Text / Info Desk Column */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* National IEB badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-orange-500 text-xs font-mono uppercase tracking-wider rounded-md mb-6 w-fit">
              <Award className="w-3.5 h-3.5" />
              RUTA Engineering &amp; Automation • 25 Years Industrial Excellence
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tighter uppercase mb-6 font-display text-white">
              Power &amp;<br /><span className="text-orange-500">Automation.</span>
            </h1>

            <p className="text-zinc-400 font-sans text-base sm:text-md leading-relaxed mb-8 max-w-xl">
              {engineerBio.tagline} Experienced in Gazipur, Chittagong, and Dhaka industrial clusters, specializing in compliant sub-station wiring, automated transfers, and NFPA active protection design.
            </p>

            {/* Quick stats grid row */}
            <div className="grid grid-cols-3 gap-4 border-y border-zinc-800 py-6 mb-8">
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-orange-500">25+</div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wide">Years Exp</div>
              </div>
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-orange-500">1 BDT</div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wide">Per Sq.ft Rate</div>
              </div>
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-white">0%</div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wide">Fire Failure</div>
              </div>
            </div>

            {/* Micro CTAs group */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onQuoteClick}
                className="flex items-center justify-center gap-2 px-7 py-4 bg-orange-500 hover:bg-orange-600 text-black font-display text-xs font-black uppercase tracking-widest rounded-full shadow-lg cursor-pointer transition-all"
              >
                <Calculator className="w-4 h-4" />
                Automated Quote Estimator
                <ArrowUpRight className="w-3.5 h-3.5 opacity-85" />
              </button>
              <button
                onClick={onInquiryClick}
                className="flex items-center justify-center gap-2 px-7 py-4 bg-transparent hover:bg-zinc-900 text-white font-display text-xs font-black uppercase tracking-widest rounded-full border-2 border-white cursor-pointer transition-all"
              >
                <FileText className="w-4 h-4" />
                Submit Design Inquiry
              </button>
            </div>
          </div>

          {/* Right Blueprint Desk Card Panel */}
          <div className="lg:col-span-5 relative lg:self-start w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-xl mx-auto lg:max-w-none bg-zinc-900 border border-zinc-800 p-6 sm:p-7 rounded-2xl shadow-2xl relative">
              <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-zinc-800">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-orange-500/40 bg-black flex items-center justify-center shrink-0 shadow-lg">
                  <img
                    src={rutaLogo}
                    alt="RUTA Engineering &amp; Automation"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-md font-display font-bold text-white uppercase tracking-tight">{engineerBio.company}</h3>
                  <p className="text-xs font-mono text-zinc-400">{engineerBio.name} • {engineerBio.title}</p>
                </div>
              </div>

              {/* Bio Block paragraphs */}
              <div className="space-y-4 mb-6">
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {engineerBio.bioParagraph}
                </p>
              </div>

              {/* Checklist details */}
              <div className="bg-black p-4 border border-zinc-800 rounded-xl space-y-2.5">
                <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-orange-500 mb-1.5 flex items-center gap-1.5">
                  <BadgeAlert className="w-3 text-orange-500" />
                  Standards &amp; Registrations Core compliance
                </div>
                {engineerBio.credentials.map((cred, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mt-1.5 shrink-0"></span>
                    <span className="text-xs text-zinc-300 font-sans">{cred}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
