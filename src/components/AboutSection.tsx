import React from 'react';
import { BookOpen, Target, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white text-slate-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-800 bg-amber-100 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Christian Children Training Institute</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Raising Generations of Walking Bibles
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
            Every child is born carrying a divine blueprint. CCTI exists to partner with parents, educators, and churches to build spiritual scaffolding around young hearts from infancy to adulthood.
          </p>
        </div>

        {/* 3 Core Pillars: Mission, Vision, Mandate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {/* Mission */}
          <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-950">
                Our Mission
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                To raise godly, purpose-driven children and teens through Christ-centered education, sound scriptural mentorship, and unwavering moral grounding.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-200/60 text-xs font-semibold text-amber-800">
              Christ-Centered Foundation
            </div>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-stone-50 border border-amber-300 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-800 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-950">
                Our Vision
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                Generations of "walking Bibles"—young people who embody God's Word in thought, speech, and deed (Joshua 1:8), influencing their peers and positively transforming their nations.
              </p>
            </div>
            <div className="pt-4 border-t border-amber-200/60 text-xs font-semibold text-amber-900">
              Joshua 1:8 Mandate
            </div>
          </div>

          {/* Mandate */}
          <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-950">
                Our Mandate
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                To equip mothers, fathers, guardians, and children's workers with practical, biblical strategies to build home sanctuaries where children flourish in truth, love, and godliness.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-200/60 text-xs font-semibold text-rose-800">
              Equipping Caregivers
            </div>
          </div>
        </div>

        {/* Scriptural Anchor Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 text-white border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Biblical Cornerstone</span>
            </div>
            <p className="font-serif text-lg sm:text-xl font-bold text-white max-w-2xl leading-relaxed">
              "This Book of the Law shall not depart from your mouth, but you shall meditate in it day and night, that you may observe to do according to all that is written in it."
            </p>
            <p className="text-xs text-amber-300 font-semibold tracking-wide">
              — Joshua 1:8 (NKJV)
            </p>
          </div>

          <div className="shrink-0 text-center">
            <span className="block text-3xl font-serif font-black text-amber-400">
              15+
            </span>
            <span className="text-xs text-stone-300 uppercase tracking-wider">
              Years of Faithful Impact
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
