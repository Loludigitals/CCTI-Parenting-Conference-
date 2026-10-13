import React from 'react';
import { Mail, Phone, Send, Heart, BookOpen, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrayerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrayerModal }) => {
  return (
    <footer className="bg-slate-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Mandate */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-serif font-black text-lg">
                C
              </div>
              <span className="font-serif font-bold text-xl text-white">
                Christian Children Training Institute
              </span>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed font-sans max-w-sm">
              Raising Generations of Walking Bibles: purpose-driven children and teenagers equipped through Christ-centered education, biblical discipline, and moral training.
            </p>

            <div className="text-xs text-amber-300/90 font-serif italic pt-1">
              "Train up a child in the way he should go, and when he is old he will not depart from it." — Proverbs 22:6
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Conference Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Home &amp; Keynote Focus
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('conference')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Why You Should Attend
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('speakers')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Guest Ministers &amp; Bios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Full 4-Day Timetable
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('convener')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Meet Convener Mary Omotosho
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrayerModal}
                  className="text-amber-300 hover:text-amber-200 transition-colors font-medium flex items-center gap-1.5 pt-1"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>Submit Prayer Request</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Community */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Get in Touch &amp; Connect
            </h4>
            <div className="space-y-2.5 text-sm text-stone-400">
              <a
                href="mailto:cctioffice14@gmail.com"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>cctioffice14@gmail.com</span>
              </a>

              <a
                href="tel:+2347053905107"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+234 705 390 5107 (Call / WhatsApp)</span>
              </a>

              <a
                href="https://t.me/+PQ5s9UlPuz1lZGI8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-blue-300 hover:text-blue-200 transition-colors"
              >
                <Send className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Join Official Telegram Channel</span>
              </a>

              <div className="flex items-center gap-2.5 pt-1 text-xs text-stone-500">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Facebook &amp; WhatsApp: Christian Children Training Institute</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Christian Children Training Institute (CCTI). All rights reserved.</p>
          <p className="flex items-center gap-1 text-stone-400">
            <span>Annual Virtual Parenting Conference 3.0</span>
            <span>·</span>
            <span>Mothering &amp; Motherhood</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
