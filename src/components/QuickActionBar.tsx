import { MessageSquare, Phone, Calculator, ShieldCheck } from 'lucide-react';

export default function QuickActionBar() {
  const phoneNumber = "+8801730318552";
  const whatsappUrl = `https://wa.me/8801730318552?text=${encodeURIComponent(
    "Hello Engr. A. K. M. Rukon Uddin / RUTA Engineering & Automation, I would like to discuss an industrial electrical / automation design project."
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-40 flex justify-center px-3 sm:px-4 pointer-events-none">
      <div 
        id="quick-action-dock"
        className="pointer-events-auto bg-zinc-950/95 backdrop-blur-lg border border-orange-500/40 p-1.5 sm:px-4 sm:py-2 rounded-full shadow-2xl shadow-black/90 flex items-center justify-center gap-1.5 sm:gap-3 max-w-full overflow-x-auto"
      >
        
        {/* Verification Status (Shown on desktop) */}
        <div className="hidden lg:flex items-center gap-2 pl-2 pr-3 border-r border-zinc-800 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 font-bold whitespace-nowrap">
            Direct Engineering Desk
          </span>
        </div>

        {/* WhatsApp Direct Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-display font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer shadow-md whitespace-nowrap"
          title="Chat directly with Chief Engineer on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-black shrink-0" />
          <span className="hidden sm:inline">WhatsApp Direct</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>

        {/* Direct Call Action */}
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-orange-500 hover:bg-orange-400 active:scale-95 text-black font-display font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer shadow-md whitespace-nowrap"
          title="Direct Phone Line: +8801730318552"
        >
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden md:inline font-mono">+880 1730318552</span>
          <span className="md:hidden">Call Now</span>
        </a>

        {/* Quick Quote Scroll */}
        <a
          href="#quote-calc"
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-[10px] sm:text-[11px] uppercase rounded-full transition-colors shrink-0 cursor-pointer whitespace-nowrap"
          title="Calculate project rate at 1 BDT per sq.ft"
        >
          <Calculator className="w-3.5 h-3.5 text-orange-500 shrink-0" />
          <span className="hidden sm:inline">1 BDT/SQFT Quote</span>
          <span className="sm:hidden">1 BDT Quote</span>
        </a>

      </div>
    </div>
  );
}
