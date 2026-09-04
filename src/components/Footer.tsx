import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import rutaLogo from '../assets/images/ruta_logo_1788542472103.jpg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-black text-white border-t border-zinc-800 py-12 lg:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start pb-10">
          {/* Brand & Engineering Bureau Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center shrink-0 shadow-md">
                <img
                  src={rutaLogo}
                  alt="RUTA Engineering &amp; Automation Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-white leading-none">
                  RUTA Engineering &amp; Automation
                </div>
                <p className="text-[11px] font-mono text-orange-500 uppercase tracking-wider mt-1">
                  Engr. A. K. M. Rukon Uddin (IEB FE-12109)
                </p>
              </div>
            </div>
            
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md font-sans">
              25+ years providing certified industrial power substations, automated transfer switchboards, and BNBC 2020 / NFPA 101 compliant fire detection grids across Bangladesh. Flat 1 BDT per sq.ft nationwide design rate.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-mono rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                IEB Certified Consultant
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-orange-400 text-[11px] font-mono rounded-md">
                1 BDT / Sq.Ft Flat Design Fee
              </span>
            </div>
          </div>

          {/* Headquarter & Address Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-orange-500 uppercase mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Bureau Headquarters &amp; Address
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Nuirani Shorok, Bottrish</p>
                  <p className="text-zinc-400 text-xs">Kishoreganj Sadar, Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a 
                  href="tel:+8801730318552" 
                  className="hover:text-orange-400 transition-colors font-mono text-xs"
                >
                  +880 1730318552
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a 
                  href="mailto:rukonenger@gmail.com" 
                  className="hover:text-orange-400 transition-colors text-xs"
                >
                  rukonenger@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-3">
              Direct Access
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <a href="#quote-calc" className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  1 BDT Calculator
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="#sld-schematic" className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  Blueprint SLD
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="#engineering-toolkit" className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  Engineering Tools
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  Submit Inquiry
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator row */}
        <div className="border-t border-zinc-800 pt-6 mt-2 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-3">
          <div>
            &copy; {currentYear} RUTA Engineering &amp; Automation. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-zinc-400">
            <span>Nuirani Shorok, Bottrish, Kishoreganj Sadar</span>
            <span className="text-zinc-700">•</span>
            <span className="text-orange-500">IEB FE-12109</span>
            <span className="text-zinc-700">•</span>
            <span>BNBC 2020 &amp; NFPA 101</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
