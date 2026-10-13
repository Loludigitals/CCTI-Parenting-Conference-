import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PillarsSection } from './components/PillarsSection';
import { SpeakersSection } from './components/SpeakersSection';
import { SpeakerDetailModal } from './components/SpeakerDetailModal';
import { ScheduleSection } from './components/ScheduleSection';
import { ConvenerSection } from './components/ConvenerSection';
import { RegistrationSection } from './components/RegistrationSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ImageManagerModal } from './components/ImageManagerModal';
import { PrayerModal } from './components/PrayerModal';
import { FlyerModal } from './components/FlyerModal';
import { IntegrationHubModal } from './components/IntegrationHubModal';
import { INITIAL_SPEAKERS, CONVENER_DATA, Speaker } from './data/conferenceData';
import { ArrowUp, Send, Sparkles, MessageCircle, Heart, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState(false);
  const [isIntegrationHubOpen, setIsIntegrationHubOpen] = useState(false);
  const [targetMinisterForPrayer, setTargetMinisterForPrayer] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Dynamic image state allows the user to swap any image via the in-app Photo Manager
  const [speakers, setSpeakers] = useState<Speaker[]>(INITIAL_SPEAKERS);
  const [convenerImage, setConvenerImage] = useState(CONVENER_DATA.image);
  const [heroImage, setHeroImage] = useState('/src/assets/images/hero_motherhood_embrace_1791819001800.jpg');
  const [celebrationImage] = useState('/src/assets/images/mothers_appreciation_celebration_1791819013404.jpg');
  const [flyerImage, setFlyerImage] = useState('/src/assets/images/ccti_conference_flyer_poster_1791825647313.jpg');

  // Monitor scroll for back to top button & active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 450);

      const sections = ['home', 'conference', 'speakers', 'schedule', 'registration', 'about', 'convener'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleUpdateSpeakerImage = (speakerId: string, newUrl: string) => {
    setSpeakers((prev) =>
      prev.map((s) => (s.id === speakerId ? { ...s, image: newUrl } : s))
    );
  };

  const handleUpdateSpeakerName = (speakerId: string, newName: string) => {
    setSpeakers((prev) =>
      prev.map((s) => (s.id === speakerId ? { ...s, name: newName } : s))
    );
    if (selectedSpeaker && selectedSpeaker.id === speakerId) {
      setSelectedSpeaker((prev) => (prev ? { ...prev, name: newName } : null));
    }
  };

  const handleResetAllImages = () => {
    setSpeakers(INITIAL_SPEAKERS);
    setConvenerImage(CONVENER_DATA.image);
    setHeroImage('/src/assets/images/hero_motherhood_embrace_1791819001800.jpg');
    setFlyerImage('/src/assets/images/ccti_conference_flyer_poster_1791825647313.jpg');
  };

  const openPrayerModalWithMinister = (ministerName = '') => {
    setTargetMinisterForPrayer(ministerName);
    setIsPrayerModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col antialiased">
      {/* Top Banner Notice */}
      <aside aria-label="Announcement" className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-2 text-center text-xs font-bold tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>CCTI Virtual Parenting Conference 3.0 · October 15–18, 2026</span>
        <span className="hidden sm:inline">· Free Live Access on Telegram</span>
        <button
          onClick={() => scrollToSection('registration')}
          className="ml-2 underline underline-offset-2 hover:text-white transition-colors"
        >
          Register Free →
        </button>
      </aside>

      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenImageManager={() => setIsImageManagerOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <div id="home">
          <HeroSection
            onRegisterClick={() => scrollToSection('registration')}
            onExploreClick={() => scrollToSection('conference')}
            onPrayerClick={() => openPrayerModalWithMinister()}
            heroImage={heroImage}
            flyerImage={flyerImage}
            onOpenFlyerModal={() => setIsFlyerModalOpen(true)}
          />
        </div>

        {/* Pillars & Why You Should Be There */}
        <PillarsSection
          onLearnMoreClick={() => scrollToSection('schedule')}
          celebrationImage={celebrationImage}
          flyerImage={flyerImage}
          onOpenFlyerModal={() => setIsFlyerModalOpen(true)}
        />

        {/* Speakers Section */}
        <SpeakersSection
          speakers={speakers}
          onSelectSpeaker={(spk) => setSelectedSpeaker(spk)}
          onOpenConvener={() => scrollToSection('convener')}
        />

        {/* Detailed Timetable / Schedule */}
        <ScheduleSection />

        {/* The Convener: Mary Omotosho */}
        <ConvenerSection
          onRegisterClick={() => scrollToSection('registration')}
          convenerImage={convenerImage}
        />

        {/* Complimentary Registration Form */}
        <RegistrationSection
          onOpenIntegrationHub={() => setIsIntegrationHubOpen(true)}
        />

        {/* About CCTI: Vision & Mission */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenPrayerModal={() => openPrayerModalWithMinister()}
      />

      {/* Modals & Popups */}
      {/* 1. Speaker Detail Modal */}
      <SpeakerDetailModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
        onOpenQuestionModal={(ministerName) => openPrayerModalWithMinister(ministerName)}
      />

      {/* 2. Custom Photo & Image Manager Modal (allows user to upload/paste their pictures) */}
      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
        speakers={speakers}
        onUpdateSpeakerImage={handleUpdateSpeakerImage}
        onUpdateSpeakerName={handleUpdateSpeakerName}
        convenerImage={convenerImage}
        onUpdateConvenerImage={setConvenerImage}
        heroImage={heroImage}
        onUpdateHeroImage={setHeroImage}
        flyerImage={flyerImage}
        onUpdateFlyerImage={setFlyerImage}
        onResetAllImages={handleResetAllImages}
      />

      {/* 3. Prayer Request / Question Modal */}
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
        targetMinister={targetMinisterForPrayer}
      />

      {/* 4. Full Conference Flyer Lightbox Modal */}
      <FlyerModal
        isOpen={isFlyerModalOpen}
        onClose={() => setIsFlyerModalOpen(false)}
        flyerImage={flyerImage}
      />

      {/* 5. Organizer Integration & Attendee Registry Modal */}
      <IntegrationHubModal
        isOpen={isIntegrationHubOpen}
        onClose={() => setIsIntegrationHubOpen(false)}
        organizerEmail="cctioffice14@gmail.com"
        organizerWhatsApp="+2347053905107"
        telegramChannelLink="https://t.me/+PQ5s9UlPuz1lZGI8"
      />

      {/* Floating Action Strip (Bottom-Right) */}
      <aside aria-label="Quick actions" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Floating Quick Register Button */}
        <button
          onClick={() => scrollToSection('registration')}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-950 text-white border border-amber-400/50 shadow-xl hover:bg-slate-900 transition-all text-xs font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Register</span>
        </button>

        {/* Floating Telegram Quick Link */}
        <a
          href="https://t.me/+PQ5s9UlPuz1lZGI8"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105"
          title="Join live on Telegram"
          aria-label="Join live on Telegram"
        >
          <Send className="w-5 h-5 -translate-x-0.5" />
        </a>

        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-white border border-stone-300 text-slate-800 shadow-xl flex items-center justify-center hover:bg-stone-100 transition-all"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </aside>
    </div>
  );
}
