import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BACKGROUND_IMAGES } from '../data/apps';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onOpenPrivacy: () => void;
}

export function Navbar({ lang, onChangeLang, onOpenPrivacy }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.showcase, href: '#showcase' },
    { label: t.catalog, href: '#katalog' },
    { label: t.privacy, href: '#privasi' },
    { label: t.support, href: '#kontak' },
  ];

  const handleMobileNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#0B0C10]/80 backdrop-blur-xl border-b border-white/[0.08]'
          : 'bg-[#0B0C10]/45 backdrop-blur-md border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand icon + single-line wordmark */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
        >
          {!logoFailed ? (
            <img
              src={BACKGROUND_IMAGES.gradientLogo}
              alt="Alul Tech Logo"
              referrerPolicy="no-referrer"
              onError={() => setLogoFailed(true)}
              className="w-8 h-8 rounded-lg object-cover border border-white/15 shrink-0"
            />
          ) : (
            <span className="w-8 h-8 rounded-lg accent-gradient-btn flex items-center justify-center font-display text-sm font-bold text-white shrink-0">
              A
            </span>
          )}
          <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            Alul Tech
          </span>
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-white transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-gradient-to-r after:from-blue-400 after:to-violet-400 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Switcher + Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            role="group"
            aria-label={t.langLabel}
            className="inline-flex items-center p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.1]"
          >
            <button
              type="button"
              onClick={() => onChangeLang('id')}
              aria-pressed={lang === 'id'}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                lang === 'id'
                  ? 'accent-gradient-btn text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => onChangeLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                lang === 'en'
                  ? 'accent-gradient-btn text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="#kontak"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white rounded-lg accent-gradient-btn hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
          >
            {t.contactBtn}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0B0C10]/95 backdrop-blur-2xl px-4 py-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleMobileNavClick(item.href)}
              className="w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenPrivacy();
              }}
              className="w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-indigo-300 hover:bg-white/[0.05] transition-colors"
            >
              {t.privacyDoc}
            </button>
            <button
              type="button"
              onClick={() => handleMobileNavClick('#kontak')}
              className="w-full px-4 py-3 rounded-lg text-sm font-semibold text-white accent-gradient-btn text-center"
            >
              {t.contactBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
