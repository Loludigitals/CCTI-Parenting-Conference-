import React, { useState } from 'react';
import { X, Send, Heart, CheckCircle2, MessageSquare } from 'lucide-react';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetMinister?: string;
}

export const PrayerModal: React.FC<PrayerModalProps> = ({
  isOpen,
  onClose,
  targetMinister = '',
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Prayer Request');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);

    const prayerBody = `CCTI Conference 3.0 - ${category}\nFrom: ${
      isAnonymous ? 'Anonymous Mother' : name || 'A Mother'
    }\nAttention: ${targetMinister || 'General Ministry Team'}\n\nMessage/Request:\n${message}`;

    const waLink = `https://wa.me/2347053905107?text=${encodeURIComponent(prayerBody)}`;

    try {
      window.open(waLink, '_blank');
    } catch {
      // User can use the button
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Mother’s Prayer &amp; Question Sanctuary
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                You do not have to carry the burden alone. Submit your private prayer request or honest parenting question for our pastoral ministers to lift in prayer and address during the live conference sessions.
              </p>

              {targetMinister && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
                  Targeted Minister: {targetMinister}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  disabled={isAnonymous}
                  value={isAnonymous ? '' : name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAnonymous ? 'Submitting Anonymously' : 'Your name or initials'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-sm text-slate-900 focus:outline-none focus:border-amber-500 disabled:opacity-60"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anon-check"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="anon-check" className="text-xs text-stone-600 cursor-pointer">
                  Keep my name strictly confidential / anonymous
                </label>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Message Type
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Prayer Request', 'Parenting Question'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-3 rounded-xl border font-semibold text-center transition-all ${
                        category === cat
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  What is on your heart? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your prayer point, current struggle with your child, or question for the panel..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Send to Pastoral Team</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl font-bold text-slate-900">
                Received with Love
              </h4>
              <p className="text-sm text-stone-600 max-w-sm mx-auto">
                Your request has been prepared for the pastoral intercessors. God sees your heart and answers prayer!
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-slate-900 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
