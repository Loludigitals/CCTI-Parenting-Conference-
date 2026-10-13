import React, { useState } from 'react';
import { CORE_PILLARS, TARGET_AUDIENCE } from '../data/conferenceData';
import { Heart, Sparkles, Award, Shield, CheckCircle2, ArrowRight, Download, Maximize2, FileText } from 'lucide-react';

interface PillarsSectionProps {
  onLearnMoreClick: () => void;
  celebrationImage: string;
  flyerImage?: string;
  onOpenFlyerModal?: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({
  onLearnMoreClick,
  celebrationImage,
  flyerImage,
  onOpenFlyerModal,
}) => {
  const [activeAudienceIndex, setActiveAudienceIndex] = useState(0);

  return (
    <section id="conference" className="py-20 bg-[#FDFBF7] text-slate-900 border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 bg-amber-100/60 px-3.5 py-1.5 rounded-full mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>The Heart of the Conference</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Mother, your story matters.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Behind the calm smiles are countless silent sacrifices, midnight prayers, and unspoken maternal anxieties. For four days, you step into a judgment-free sanctuary to be heard, nourished, and spiritually restored.
          </p>
        </div>

        {/* 4 Pillars - Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CORE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="group p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-md hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl font-bold text-amber-500/40 group-hover:text-amber-600 transition-colors block mb-3">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-3">
                  {pillar.lead}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-amber-800 group-hover:text-amber-600">
                <span>Core Pillar Focus</span>
                <Sparkles className="w-3.5 h-3.5 ml-1.5 opacity-60 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Official Conference Flyer Card */}
        {flyerImage && (
          <div className="rounded-3xl overflow-hidden bg-white border border-amber-300/80 shadow-lg p-6 sm:p-10 mb-16 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Official Conference Flyer &amp; Program Guide</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 leading-snug">
                  CCTI Annual Virtual Parenting Conference 3.0
                </h3>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
                  The complete official flyer detailing the theme, scripture grounding, daily broadcast hours, and speaker roster for the 2026 conference. Share with your family, church women's fellowship, and parenting groups!
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {onOpenFlyerModal && (
                    <button
                      type="button"
                      onClick={onOpenFlyerModal}
                      className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                    >
                      <Maximize2 className="w-4 h-4 text-amber-400" />
                      <span>View Full-Size Flyer</span>
                    </button>
                  )}

                  <a
                    href={flyerImage}
                    download="CCTI_Parenting_Conference_Flyer_2026.jpg"
                    className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Poster</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div
                  onClick={onOpenFlyerModal}
                  className="w-full max-w-sm rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-xl cursor-pointer group relative bg-slate-950"
                >
                  <img
                    src={flyerImage}
                    alt="Official CCTI Parenting Conference 3.0 Flyer"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('/src/assets/images/')) {
                        target.src = target.src.replace('/src/assets/images/', '/assets/images/');
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold transition-opacity flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to Enlarge</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Showcase: Sunday Mother's Appreciation & Awards */}
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-[#2E0F1B] to-slate-900 text-white border border-amber-400/30 p-8 sm:p-12 mb-16 shadow-xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Sunday Special Highlight · Oct 18, 7:00 PM</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
                Mother’s Appreciation &amp; National Awards
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Motherhood is society’s most vital cornerstone, yet too often taken for granted. On our grand closing evening, we pause to celebrate, honor, and shower God-honoring appreciation on mothers, grandmothers, and maternal leaders who faithfully hold homes and communities together.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-amber-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Special Motherhood Citations &amp; Recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Prophetic Blessing over Maternal Bloodlines</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Inspiring Real-Life Transformation Stories</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Special Worship &amp; Dedication Music</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl relative group">
                <img
                  src={celebrationImage}
                  alt="Mother's Appreciation and Awards Celebration"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/src/assets/images/')) {
                      target.src = target.src.replace('/src/assets/images/', '/assets/images/');
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <p className="text-xs text-amber-200 font-medium italic">
                    "Honor her for all that her hands have done, and let her works bring her praise at the city gate." — Proverbs 31:31
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Who Should Attend: Interactive Audience Cards */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Everyone with a Stake in the Next Generation
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Who is this conference prepared for?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Whether you are currently raising babies, mentoring teenagers, or preparing for future motherhood, your presence is vital.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {TARGET_AUDIENCE.map((item, idx) => {
              const isSelected = activeAudienceIndex === idx;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveAudienceIndex(idx)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-slate-950 shadow-sm'
                      : 'bg-white border-stone-200 hover:border-amber-300 text-slate-700'
                  }`}
                >
                  <span className="block font-semibold text-sm sm:text-base text-slate-900 mb-1">
                    {item.label}
                  </span>
                  <span className="block text-xs text-slate-500 leading-snug">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
