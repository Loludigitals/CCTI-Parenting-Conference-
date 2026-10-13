import React from 'react';
import { X, Calendar, Clock, BookOpen, Send, Sparkles, CheckCircle } from 'lucide-react';
import { Speaker } from '../data/conferenceData';

interface SpeakerDetailModalProps {
  speaker: Speaker | null;
  onClose: () => void;
  onOpenQuestionModal: (speakerName: string) => void;
}

export const SpeakerDetailModal: React.FC<SpeakerDetailModalProps> = ({
  speaker,
  onClose,
  onOpenQuestionModal,
}) => {
  if (!speaker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Speaker Profile
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">CCTI Conference 3.0</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header layout: Photo + Identity */}
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-md shrink-0 bg-stone-100">
              <img
                src={speaker.image}
                alt={speaker.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback styling if image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-amber-100', 'text-amber-800', 'font-serif', 'font-bold');
                    target.parentElement.innerHTML = speaker.name.charAt(0);
                  }
                }}
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-slate-950">
                {speaker.name}
              </h3>
              <p className="text-sm font-medium text-amber-700">
                {speaker.title}
              </p>
              {speaker.role && (
                <p className="text-xs text-stone-500 font-sans">
                  {speaker.role}
                </p>
              )}
              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {speaker.badges.map((b) => (
                  <span
                    key={b}
                    className="inline-block text-[11px] font-medium text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Keynote Topic Focus */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Ministering On</span>
            </div>
            <p className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
              "{speaker.topic}"
            </p>
          </div>

          {/* Full Biography */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Minister's Background &amp; Heart
            </h4>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
              {speaker.bio}
            </p>
          </div>

          {/* Scheduled Sessions */}
          <div className="space-y-2.5 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Session Appearances</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {speaker.sessions.map((sess) => (
                <div
                  key={sess}
                  className="flex items-center gap-2 text-xs font-medium text-slate-800 bg-stone-100 p-3 rounded-xl border border-stone-200/60"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{sess}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onOpenQuestionModal(speaker.name);
              onClose();
            }}
            className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1.5 underline underline-offset-4"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Question / Prayer for {speaker.name.split(' ')[0]}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-colors ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
