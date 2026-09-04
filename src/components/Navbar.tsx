import { ShieldCheck, Database, Menu, X, Globe, ShoppingBag, Lock } from 'lucide-react';
import { useState } from 'react';
import rutaLogo from '../assets/images/ruta_logo_1788542472103.jpg';

interface NavbarProps {
  currentView: 'home' | 'store' | 'crm';
  setCurrentView: (view: 'home' | 'store' | 'crm') => void;
  leadsCount: number;
  ordersCount: number;
  isAdminAuthenticated: boolean;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
}

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  leadsCount, 
  ordersCount,
  isAdminAuthenticated,
  onOpenAdminLogin,
  onAdminLogout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Schematic", href: "#sld-schematic", isAnchor: true },
    { label: "Calculators", href: "#engineering-toolkit", isAnchor: true, hideOnLg: true },
    { label: "Automation", href: "#automation-capabilities", isAnchor: true },
    { label: "Audit", href: "#audit-matrix", isAnchor: true, hideOnLg: true },
    { label: "Quote", href: "#quote-calc", isAnchor: true },
    { label: "Contact", href: "#contact", isAnchor: true }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center gap-2 sm:gap-4">
          {/* Logo / Personal Branding Group */}
          <button 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer min-w-0 shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-zinc-800 group-hover:border-orange-500 bg-zinc-900 flex items-center justify-center shrink-0 shadow-md transition-all">
              <img
                src={rutaLogo}
                alt="RUTA Engineering &amp; Automation Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0 justify-center">
              <span className="font-display font-black text-white tracking-wide text-xs sm:text-sm uppercase leading-tight whitespace-nowrap truncate">
                RUTA Engineering &amp; Automation
              </span>
              <span className="text-[9px] font-mono text-zinc-400 tracking-wider flex items-center gap-1 uppercase whitespace-nowrap truncate mt-0.5">
                <Globe className="w-2.5 h-2.5 text-orange-500 shrink-0" />
                <span className="truncate">Engr. A.K.M. Rukon Uddin</span>
                <span className="hidden sm:inline text-zinc-600">•</span>
                <span className="hidden sm:inline text-zinc-500">25 Yrs Exp</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0 flex-nowrap">
            {currentView !== 'crm' && (
              <>
                <button
                  onClick={() => setCurrentView('store')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-display uppercase tracking-wider font-black transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    currentView === 'store'
                      ? 'bg-orange-500 text-black shadow-md shadow-orange-500/20'
                      : 'text-orange-400 hover:text-orange-300 bg-zinc-900 border border-orange-500/30 hover:border-orange-500'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span>Wholesale Market</span>
                </button>

                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={currentView === 'home' ? item.href : '#'}
                    onClick={(e) => {
                      if (currentView !== 'home') {
                        e.preventDefault();
                        setCurrentView('home');
                        setTimeout(() => {
                          const el = document.querySelector(item.href || '');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className={`${item.hideOnLg ? 'hidden xl:inline-block' : 'inline-block'} text-zinc-300 hover:text-orange-500 font-display text-[11px] xl:text-xs uppercase tracking-wider font-bold transition-colors whitespace-nowrap shrink-0 px-1 py-1`}
                  >
                    {item.label}
                  </a>
                ))}
              </>
            )}

            {/* Flat Rate Tag */}
            <span className="hidden 2xl:inline-block text-[10px] font-mono font-bold bg-zinc-900 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shrink-0">
              1 BDT/SQFT
            </span>

            {/* CRM & Store Admin Portal Command Link (User focused element) */}
            <button
              onClick={() => {
                if (currentView === 'crm') {
                  setCurrentView('home');
                } else if (isAdminAuthenticated) {
                  setCurrentView('crm');
                } else {
                  onOpenAdminLogin();
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 xl:px-4 xl:py-2 rounded-full font-display text-[11px] uppercase tracking-wider font-black transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm ${
                currentView === 'crm'
                  ? 'bg-orange-500 text-black hover:bg-orange-600 shadow-md shadow-orange-500/20'
                  : isAdminAuthenticated
                  ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-orange-500/60'
              }`}
              id="crm-portal-toggle"
              title={
                currentView === 'crm'
                  ? 'Exit Admin Desk'
                  : isAdminAuthenticated
                  ? 'Access Enterprise Admin Desk (Session Active)'
                  : 'Passkey Protected: Admin clearance required'
              }
            >
              {isAdminAuthenticated ? (
                <Database className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              )}
              <span className="hidden xl:inline">
                {currentView === 'crm'
                  ? 'Exit Admin Desk'
                  : isAdminAuthenticated
                  ? 'Admin CRM Desk'
                  : 'Admin Passkey'}
              </span>
              <span className="xl:hidden">
                {currentView === 'crm' ? 'Exit' : isAdminAuthenticated ? 'Admin' : 'Passkey'}
              </span>
              <span className={`px-1.5 py-0.2 text-[9px] font-mono rounded-full font-bold ${
                isAdminAuthenticated
                  ? 'bg-black text-white'
                  : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
              }`}>
                {isAdminAuthenticated ? leadsCount + ordersCount : 'Locked'}
              </span>
            </button>
          </div>

          {/* Mobile Buttons Left Align group */}
          <div className="lg:hidden flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setCurrentView(currentView === 'store' ? 'home' : 'store')}
              className="px-2.5 py-1.5 text-orange-400 hover:text-white bg-zinc-900 border border-orange-500/30 rounded-lg flex items-center gap-1 text-xs font-mono whitespace-nowrap shrink-0 cursor-pointer"
              title="Wholesale Store"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="text-[11px] font-bold">Store</span>
            </button>

            <button
              onClick={() => {
                if (currentView === 'crm') {
                  setCurrentView('home');
                } else if (isAdminAuthenticated) {
                  setCurrentView('crm');
                } else {
                  onOpenAdminLogin();
                }
              }}
              className={`px-2 py-1.5 rounded-lg flex items-center gap-1 text-xs font-mono whitespace-nowrap shrink-0 cursor-pointer ${
                isAdminAuthenticated
                  ? 'text-emerald-400 bg-zinc-900 border border-emerald-500/40'
                  : 'text-zinc-400 bg-zinc-900 border border-zinc-800 hover:text-orange-400'
              }`}
              title={isAdminAuthenticated ? "Enterprise Admin Desk" : "Admin Passkey Required"}
            >
              {isAdminAuthenticated ? (
                <Database className="w-3.5 h-3.5" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-orange-500" />
              )}
              <span className="text-[10px] font-mono font-bold bg-zinc-800 px-1.5 py-0.2 rounded-full">
                {isAdminAuthenticated ? leadsCount + ordersCount : '🔒'}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-400 hover:text-orange-500 rounded-lg shrink-0 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 py-4 px-4 space-y-3 shadow-inner">
          <button
            onClick={() => {
              setCurrentView('store');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg bg-orange-500 text-black font-display text-xs font-black uppercase tracking-widest flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Wholesale Market</span>
          </button>

          {/* Secure Admin Option inside Mobile Drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (isAdminAuthenticated) {
                setCurrentView('crm');
              } else {
                onOpenAdminLogin();
              }
            }}
            className="w-full text-left py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-display text-xs font-black uppercase tracking-widest flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {isAdminAuthenticated ? <Database className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-orange-500" />}
              <span>{isAdminAuthenticated ? "Enterprise Admin Desk" : "Admin Panel (Passkey Protected)"}</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-400 bg-black px-1.5 py-0.5 rounded">
              {isAdminAuthenticated ? "UNLOCKED" : "LOCKED"}
            </span>
          </button>

          {navItems.filter(i => i.isAnchor).map((item) => (
            <a
              key={item.label}
              href={currentView === 'home' ? item.href : '#'}
              className="block py-2 text-zinc-300 hover:text-orange-500 font-display text-xs font-black uppercase tracking-widest"
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  setCurrentView('home');
                }
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold bg-zinc-900 text-orange-500 border border-zinc-800 px-2.5 py-0.5 rounded uppercase">
              Rate: 1 BDT/SQFT
            </span>
            <span className="text-xs text-zinc-500">Gazipur • Chittagong • Dhaka</span>
          </div>
        </div>
      )}
    </nav>
  );
}
