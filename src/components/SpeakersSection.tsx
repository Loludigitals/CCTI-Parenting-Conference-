import React from 'react';
import { Speaker } from '../data/conferenceData';
import { Sparkles, ArrowUpRight, BookOpen, Calendar } from 'lucide-react';

interface SpeakersSectionProps {
  speakers: Speaker[];
  onSelectSpeaker: (speaker: Speaker) => void;
  onOpenConvener: () => void;
  onOpenImageManager?: () => void;
}

export const SpeakersSection: React.FC<SpeakersSectionProps> = ({
  speakers,
  onSelectSpeaker,
  onOpenConvener,
}) => {
  return (
    <section id="speakers" className="py-20 bg-stone-100/60 text-slate-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 bg-amber-200/50 px-3.5 py-1.5 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Seven Voices · One Heart for Mothers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Meet the Guest Ministers
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
              Seasoned pastors, family builders, medical professionals, and prophetic intercessors carrying divine answers for your home. Tap any speaker for their full biography and keynote topics.
            </p>
          </div>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {speakers.map((spk) => {
            return (
              <div
                key={spk.id}
                onClick={() => onSelectSpeaker(spk)}
                className="group cursor-pointer rounded-2xl bg-white border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={spk.image}
                    alt={spk.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('/src/assets/images/')) {
                        target.src = target.src.replace('/src/assets/images/', '/assets/images/');
                        return;
                      }
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-amber-100', 'to-rose-100', 'text-amber-900');
                        target.parentElement.innerHTML = `<span class="font-serif text-3xl font-bold">${spk.name.charAt(0)}</span>`;
                      }
                    }}
                  />

                  {/* Gradient subtle shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  {/* Session pill on top right */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-800 shadow-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    <span>{spk.sessions[0].split('(')[0].trim()}</span>
                  </div>

                  {/* Name on image bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-lg sm:text-xl font-bold drop-shadow-sm group-hover:text-amber-300 transition-colors">
                      {spk.name}
                    </h3>
                    <p className="text-xs text-amber-200/90 font-medium line-clamp-1">
                      {spk.title}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start gap-1.5 text-xs text-amber-800 font-semibold">
                      <BookOpen className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                      <span className="line-clamp-2">Topic: "{spk.topic}"</span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 font-sans">
                      {spk.bio}
                    </p>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-600">
                    <span>View Full Profile &amp; Sessions</span>
                    <div className="w-6 h-6 rounded-full bg-amber-100 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Callout Banner to Convener */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-transparent border border-amber-400/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Vision Bearer &amp; Conference Convener
            </p>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Meet Mary Omotosho (President, CCTI)
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              Educator, Christian author, music minister, and family life counselor with over 15 years dedicated to raising generations of walking Bibles.
            </p>
          </div>

          <button
            onClick={onOpenConvener}
            className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all shrink-0 whitespace-nowrap"
          >
            Read Convener Story →
          </button>
        </div>
      </div>
    </section>
  );
};

