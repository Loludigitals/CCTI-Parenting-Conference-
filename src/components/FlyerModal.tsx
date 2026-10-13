import React from 'react';
import { X, Download, Share2, Sparkles, Send } from 'lucide-react';

interface FlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  flyerImage: string;
}

export const FlyerModal: React.FC<FlyerModalProps> = ({
  isOpen,
  onClose,
  flyerImage,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = flyerImage;
    link.download = 'CCTI_Parenting_Conference_Flyer_2026.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    const text = 'Check out the official flyer for CCTI Annual Virtual Parenting Conference 3.0: Mothering & Motherhood (15-18 Oct 2026)!';
    if (navigator.share) {
      navigator.share({ title: 'CCTI Conference Flyer', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert('Conference flyer link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-amber-400/30 shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-serif font-bold text-base sm:text-lg">
              Official Conference Flyer
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-amber-300">Edition 3.0</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close flyer modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Showcase */}
        <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-slate-950/60">
          <div className="relative rounded-2xl overflow-hidden border border-amber-400/40 shadow-2xl max-h-[70vh]">
            <img
              src={flyerImage}
              alt="CCTI Annual Virtual Parenting Conference 3.0 Official Flyer"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Flyer</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Share</span>
            </button>
          </div>

          <a
            href="https://t.me/+PQ5s9UlPuz1lZGI8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Join Telegram Room</span>
          </a>
        </div>
      </div>
    </div>
  );
};
