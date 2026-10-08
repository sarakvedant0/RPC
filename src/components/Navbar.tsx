import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Rockets & Hardware', href: '#hardware-slider' },
    { label: 'Projects', href: '#projects' },
    { label: 'Subsystems', href: '#subsystems' },
    { label: 'Anatomy', href: '#anatomy' },
    { label: 'Propulsion Lab', href: '#propulsion' },
    { label: 'Milestones', href: '#heritage' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#020306]/95 backdrop-blur-xl border-slate-800/80 py-3 shadow-2xl shadow-black/80'
          : 'bg-[#020306]/60 backdrop-blur-md border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md shadow-blue-900/20">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold tracking-tight text-white font-heading leading-tight flex items-center gap-1.5">
              <span>RPC</span>
              <span className="text-slate-500">·</span>
              <span className="text-sky-400">COEP TECH</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 leading-none">
              Rocket Propulsion Centre, Pune
            </div>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-mono font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-sky-400 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-400 transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Quick Action / Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold border border-blue-400/40 text-xs font-mono transition-all shadow-md shadow-blue-900/30 active:scale-95 cursor-pointer"
          >
            Join / Contact
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-300 hover:text-white rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-md cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-sky-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#050811]/98 border-b border-slate-800 px-6 py-5 animate-fade-in backdrop-blur-2xl">
          <nav className="flex flex-col gap-2.5 text-xs font-mono">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-slate-300 hover:text-sky-400 transition-colors border-b border-slate-900/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 text-center py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-900/30"
            >
              Contact RPC COEP
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
