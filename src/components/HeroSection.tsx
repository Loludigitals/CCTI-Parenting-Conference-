import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Send, ShieldCheck, HeartHandshake, Sparkles, ChevronRight, Share2, HelpCircle, Maximize2, FileText, Image as ImageIcon } from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
  onPrayerClick: () => void;
  heroImage: string;
  flyerImage?: string;
  onOpenFlyerModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreClick,
  onPrayerClick,
  heroImage,
  flyerImage,
  onOpenFlyerModal,
}) => {
  const [activeView, setActiveView] = useState<'flyer' | 'theme'>('flyer');
  // Countdown to 15th October 2026 10:00 AM WAT (GMT+1)
  const targetDate = new Date('2026-10-15T10:00:00+01:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasStarted: false,
  });

  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, hasStarted: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        hasStarted: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleShare = () => {
    const text = 'Join me at the CCTI Annual Virtual Parenting Conference 3.0: Mothering & Motherhood (15th-18th October 2026)! Free registration live on Telegram.';
    if (navigator.share) {
      navigator.share({ title: 'CCTI Parenting Conference 3.0', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#180A10] to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-amber-900/20">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-rose-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Kicker bar */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Christian Children Training Institute presents</span>
          <span className="text-amber-400/50">·</span>
          <span className="text-amber-200">Edition 3.0</span>
        </div>

        {/* 2-Column Responsive Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Column 1: Editorial Heading & Context */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Mothering &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 italic">
                Motherhood
              </span>
            </h1>

            <p className="font-serif text-lg sm:text-xl text-amber-200/90 italic tracking-wide">
              One mission: to restore, to inspire.
            </p>

            <p className="text-base sm:text-lg text-slate-300 font-sans max-w-xl leading-relaxed">
              Behind every loving mother are untold stories of quiet sacrifice, hidden tears, and burdens carried in silence. For four life-changing days, you will not be condemned—you will be heard, healed, and revived by God’s Word.
            </p>

            {/* Event Key Details Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="font-medium text-white">15th – 18th October 2026</span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>10 AM &amp; 7 PM (WAT) Daily</span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                <Send className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-blue-200">Live on Telegram</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onRegisterClick}
                className="px-6 py-3.5 rounded-full text-sm sm:text-base font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Register For Free</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="https://t.me/+PQ5s9UlPuz1lZGI8"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 hover:border-blue-400 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-blue-400" />
                <span>Join on Telegram</span>
              </a>

              <button
                onClick={onPrayerClick}
                className="px-4 py-3.5 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Send Prayer/Question</span>
              </button>

              <button
                onClick={handleShare}
                className="p-3.5 rounded-full text-slate-400 hover:text-amber-300 hover:bg-white/5 border border-white/10 transition-colors"
                title="Share conference link"
                aria-label="Share conference link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {copiedShare && (
              <p className="text-xs text-amber-300 animate-fade-in">
                Conference invitation link copied to clipboard!
              </p>
            )}

            {/* Trust Assurance Strip */}
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Free Virtual Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Interactive Q&amp;A &amp; Prayer</span>
              </div>
            </div>
          </div>

          {/* Column 2: Visual Card + Live Countdown Box */}
          <div className="lg:col-span-5 space-y-4">
            {/* View Switcher Controls */}
            <div className="flex items-center justify-between px-1">
              <div className="inline-flex p-1 rounded-full bg-slate-900 border border-white/10 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveView('flyer')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    activeView === 'flyer'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Conference Flyer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('theme')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    activeView === 'theme'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Motherhood Photo</span>
                </button>
              </div>

              {onOpenFlyerModal && (
                <button
                  type="button"
                  onClick={onOpenFlyerModal}
                  className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium underline underline-offset-4"
                  title="View full-size flyer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Flyer</span>
                </button>
              )}
            </div>

            {/* Visual Card with Image & Overlays */}
            <div
              onClick={() => activeView === 'flyer' && onOpenFlyerModal ? onOpenFlyerModal() : undefined}
              className={`relative rounded-2xl overflow-hidden border border-amber-400/30 bg-slate-900/60 shadow-2xl shadow-black/60 group ${
                activeView === 'flyer' ? 'cursor-pointer' : ''
              }`}
            >
              <div className={activeView === 'flyer' ? 'aspect-[3/4] sm:aspect-[3/4] w-full overflow-hidden bg-slate-950 flex items-center justify-center' : 'aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden'}>
                <img
                  src={activeView === 'flyer' ? (flyerImage || heroImage) : heroImage}
                  alt={activeView === 'flyer' ? "CCTI Parenting Conference 3.0 Official Flyer" : "Mother with her children - CCTI Parenting Conference 3.0"}
                  referrerPolicy="no-referrer"
                  className={activeView === 'flyer' ? "w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500" : "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"}
                />
              </div>

              {/* Gradient scrim for theme view */}
              {activeView === 'theme' && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
              )}

              {/* Floating badges on image */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-amber-400/30 px-3 py-1 rounded-full text-[11px] font-semibold text-amber-300">
                {activeView === 'flyer' ? 'Official Event Flyer' : 'Live Broadcast'}
              </div>

              <div className="absolute top-3 right-3 bg-rose-950/80 backdrop-blur-md border border-rose-500/30 px-3 py-1 rounded-full text-[11px] font-semibold text-rose-200">
                {activeView === 'flyer' ? 'Tap to Zoom' : 'Oct 15 - 18, 2026'}
              </div>

              {activeView === 'theme' && (
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-amber-300 uppercase tracking-wider font-semibold">
                    Theme Focus
                  </p>
                  <p className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                    Discover · Heal · Restore · Revive · Inspire
                  </p>
                </div>
              )}
            </div>

            {/* Countdown Clock Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-amber-500/30 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Conference Countdown
                  </span>
                </div>
                <span className="text-xs text-slate-400">Time to Opening Session</span>
              </div>

              {timeLeft.hasStarted ? (
                <div className="py-4 text-center">
                  <p className="font-serif text-xl font-bold text-amber-400">
                    The Conference is Live!
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Connect directly to the Telegram room now.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-amber-400/20">
                    <span className="block text-2xl sm:text-3xl font-serif font-black text-amber-300 tabular-nums">
                      {timeLeft.days}
                    </span>
                    <span className="block text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-sans">
                      Days
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-amber-400/20">
                    <span className="block text-2xl sm:text-3xl font-serif font-black text-white tabular-nums">
                      {timeLeft.hours}
                    </span>
                    <span className="block text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-sans">
                      Hours
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-amber-400/20">
                    <span className="block text-2xl sm:text-3xl font-serif font-black text-white tabular-nums">
                      {timeLeft.minutes}
                    </span>
                    <span className="block text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-sans">
                      Mins
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-amber-400/20">
                    <span className="block text-2xl sm:text-3xl font-serif font-black text-amber-400 tabular-nums">
                      {timeLeft.seconds}
                    </span>
                    <span className="block text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-sans">
                      Secs
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Morning: 10:00 AM – 12:00 PM</span>
                <span>Evening: 7:00 PM – 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
