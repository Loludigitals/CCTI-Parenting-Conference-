import React from 'react';
import { CONVENER_DATA } from '../data/conferenceData';
import { BookMarked, Music, GraduationCap, Heart, Sparkles, Quote } from 'lucide-react';

interface ConvenerSectionProps {
  onRegisterClick: () => void;
  onOpenImageManager?: () => void;
  convenerImage: string;
}

export const ConvenerSection: React.FC<ConvenerSectionProps> = ({
  onRegisterClick,
  convenerImage,
}) => {
  return (
    <section id="convener" className="py-20 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-300 bg-amber-500/20 border border-amber-400/30 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Convener &amp; Vision Bearer</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Mary Omotosho
          </h2>
          <p className="mt-2 text-base text-amber-200/90 font-serif italic">
            President &amp; Founder, Christian Children Training Institute (CCTI)
          </p>
        </div>

        {/* 2-Column Convener Bio & Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Photo & Identity Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-stone-950 group">
              <img
                src={convenerImage}
                alt={CONVENER_DATA.name}
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/4] sm:aspect-[4/4] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'p-12', 'text-center');
                    target.parentElement.innerHTML = `<span class="font-serif text-2xl font-bold text-amber-300">${CONVENER_DATA.name}</span>`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                  CCTI Convener
                </span>
                <span className="font-serif text-xl font-bold text-white block">
                  Mary Omotosho
                </span>
              </div>
            </div>
          </div>

          {/* Biography & Message Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-stone-300 leading-relaxed text-sm sm:text-base font-sans">
              <p>
                For over 15 years, Mary Omotosho has poured her life into one singular, burning mandate: helping children, teens, and families carry God’s Word in their hearts and live it out loud in an increasingly distracted culture.
              </p>
              <p>
                She founded the Christian Children Training Institute (CCTI) to raise purpose-driven children through Christ-centered education, sound moral training, and spiritual mentorship—shaping “walking Bibles” who live out Joshua 1:8 and make a tangible, godly impact across nations.
              </p>
            </div>

            {/* Quote Callout Card */}
            <div className="p-6 rounded-2xl bg-amber-400/10 border border-amber-400/30 relative">
              <Quote className="w-8 h-8 text-amber-400/30 absolute top-4 right-4 pointer-events-none" />
              <p className="font-serif text-base sm:text-lg italic text-amber-200 leading-relaxed">
                "{CONVENER_DATA.quote}"
              </p>
            </div>

            {/* Personal Pastoral Letter to Mothers */}
            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span>Her Heart for Every Mother</span>
              </div>
              <p className="text-sm sm:text-base text-stone-200 italic font-serif leading-relaxed">
                "{CONVENER_DATA.personalMessage}"
              </p>
            </div>
          </div>
        </div>

        {/* 3 Bento Feature Cards: Publications, Ministry, Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Books */}
          <div className="p-6 rounded-2xl bg-stone-800/60 border border-stone-700/70 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <BookMarked className="w-4 h-4" />
              <span>Published Works</span>
            </div>
            <div className="space-y-3">
              {CONVENER_DATA.books.map((book) => (
                <div key={book.title} className="border-b border-stone-700/60 pb-2.5 last:border-0 last:pb-0">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                    {book.title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {book.subtitle}
                  </p>
                  <span className="inline-block mt-1 text-[10px] uppercase font-bold text-amber-300/80 bg-amber-950/60 px-2 py-0.5 rounded">
                    {book.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Music Ministry */}
          <div className="p-6 rounded-2xl bg-stone-800/60 border border-stone-700/70 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Music className="w-4 h-4" />
              <span>Music &amp; Prophetic Sound</span>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              {CONVENER_DATA.musicMinistry}
            </p>
            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-amber-200">
              Monthly prophetic gathering releasing spiritual atmosphere over children and families worldwide.
            </div>
          </div>

          {/* Training & Background */}
          <div className="p-6 rounded-2xl bg-stone-800/60 border border-stone-700/70 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <GraduationCap className="w-4 h-4" />
              <span>Academic &amp; Ministry Training</span>
            </div>
            <div className="space-y-2.5 text-xs text-stone-300">
              {CONVENER_DATA.credentials.map((cred) => (
                <div key={cred.category} className="space-y-0.5">
                  <span className="font-semibold text-amber-300 block">
                    {cred.category}:
                  </span>
                  <span className="text-stone-400 block leading-relaxed">
                    {cred.details}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={onRegisterClick}
            className="px-8 py-3.5 rounded-full text-sm sm:text-base font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
          >
            Join Mary Omotosho &amp; Ministers at Conference 3.0 →
          </button>
        </div>
      </div>
    </section>
  );
};
