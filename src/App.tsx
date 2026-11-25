import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BentoShowcase } from './components/BentoShowcase';
import { AppCatalog } from './components/AppCatalog';
import { PrivacySection } from './components/PrivacySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppDetailModal, PrivacyPolicyModal } from './components/Modals';
import { AlulApp } from './data/apps';
import { Language, TRANSLATIONS } from './i18n/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [selectedApp, setSelectedApp] = useState<AlulApp | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = TRANSLATIONS[lang].pageTitle;
  }, [lang]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0B0C10] text-zinc-100 flex flex-col">
        <Navbar
          lang={lang}
          onChangeLang={setLang}
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />

        <main className="flex-1">
          <HeroSection
            lang={lang}
            onOpenPrivacy={() => setPrivacyModalOpen(true)}
          />
          <BentoShowcase
            lang={lang}
            onSelectApp={(app) => setSelectedApp(app)}
          />
          <AppCatalog
            lang={lang}
            onSelectApp={(app) => setSelectedApp(app)}
          />
          <PrivacySection
            lang={lang}
            onOpenPrivacy={() => setPrivacyModalOpen(true)}
          />
          <ContactSection lang={lang} />
        </main>

        <Footer
          lang={lang}
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />

        <AppDetailModal
          lang={lang}
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />
        <PrivacyPolicyModal
          lang={lang}
          open={privacyModalOpen}
          onClose={() => setPrivacyModalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
