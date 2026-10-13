import React, { useState } from 'react';
import { X, Upload, Check, RefreshCw, Sparkles, Image as ImageIcon, HelpCircle } from 'lucide-react';
import { Speaker } from '../data/conferenceData';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  speakers: Speaker[];
  onUpdateSpeakerImage: (speakerId: string, newImageUrl: string) => void;
  onUpdateSpeakerName?: (speakerId: string, newName: string) => void;
  convenerImage: string;
  onUpdateConvenerImage: (newImageUrl: string) => void;
  heroImage: string;
  onUpdateHeroImage: (newImageUrl: string) => void;
  flyerImage: string;
  onUpdateFlyerImage: (newImageUrl: string) => void;
  onResetAllImages: () => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  speakers,
  onUpdateSpeakerImage,
  onUpdateSpeakerName,
  convenerImage,
  onUpdateConvenerImage,
  heroImage,
  onUpdateHeroImage,
  flyerImage,
  onUpdateFlyerImage,
  onResetAllImages,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('convener');
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [customNameInput, setCustomNameInput] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      applyImageUpdate(result);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    applyImageUpdate(customUrlInput.trim());
    setCustomUrlInput('');
  };

  const applyImageUpdate = (imgUrl: string) => {
    if (selectedTarget === 'hero') {
      onUpdateHeroImage(imgUrl);
      setSuccessMessage('Hero image updated successfully!');
    } else if (selectedTarget === 'convener') {
      onUpdateConvenerImage(imgUrl);
      setSuccessMessage('Mary Omotosho portrait updated successfully!');
    } else if (selectedTarget === 'flyer') {
      onUpdateFlyerImage(imgUrl);
      setSuccessMessage('Official conference flyer updated successfully!');
    } else {
      onUpdateSpeakerImage(selectedTarget, imgUrl);
      const speaker = speakers.find((s) => s.id === selectedTarget);
      setSuccessMessage(`Photo for ${speaker?.name || 'speaker'} updated successfully!`);
    }

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Preview target
  let currentPreview = '';
  let targetLabel = '';
  if (selectedTarget === 'hero') {
    currentPreview = heroImage;
    targetLabel = 'Hero Motherhood Banner';
  } else if (selectedTarget === 'convener') {
    currentPreview = convenerImage;
    targetLabel = 'Convener (Mary Omotosho)';
  } else if (selectedTarget === 'flyer') {
    currentPreview = flyerImage;
    targetLabel = 'Official Conference Flyer';
  } else {
    const spk = speakers.find((s) => s.id === selectedTarget);
    currentPreview = spk?.image || '';
    targetLabel = spk?.name || 'Speaker Photo';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Update Conference Images &amp; Photos
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
            aria-label="Close photo manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Select any speaker, the convener, or the hero banner to upload your own photos directly from your device or paste an image link. Changes appear live instantly!
            </p>
          </div>

          {/* Select Target */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              1. Choose who or what to update:
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-slate-900 text-sm font-sans focus:outline-none focus:border-amber-500"
            >
              <optgroup label="Conference Key Highlights">
                <option value="convener">Mary Omotosho (Convener Portrait)</option>
                <option value="hero">Hero Motherhood Banner</option>
                <option value="flyer">Official Conference Flyer</option>
              </optgroup>
              <optgroup label="Guest Ministers">
                {speakers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.title})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Current Preview */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-200 border border-amber-400/40 shrink-0">
              <img
                src={currentPreview}
                alt="Current Preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 block">
                Currently Selected
              </span>
              <span className="font-serif font-bold text-base text-slate-900 block">
                {targetLabel}
              </span>
              <span className="text-xs text-stone-500">
                Ready for replacement or new photo
              </span>
            </div>
          </div>

          {/* Optional: Change Speaker Name */}
          {selectedTarget !== 'convener' && selectedTarget !== 'hero' && selectedTarget !== 'flyer' && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-300 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                Rename this Speaker:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customNameInput}
                  onChange={(e) => setCustomNameInput(e.target.value)}
                  placeholder={`New name for ${targetLabel}`}
                  className="flex-1 px-4 py-2 rounded-xl border border-stone-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-sans"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customNameInput.trim() && onUpdateSpeakerName) {
                      onUpdateSpeakerName(selectedTarget, customNameInput.trim());
                      setSuccessMessage(`Speaker renamed to "${customNameInput.trim()}"!`);
                      setCustomNameInput('');
                      setTimeout(() => setSuccessMessage(''), 3000);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-colors shrink-0"
                >
                  Save Name
                </button>
              </div>
            </div>
          )}

          {/* Upload Method 1: Local File */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              2. Upload image file from your device:
            </label>
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-2xl bg-stone-50/50 hover:bg-amber-50/20 cursor-pointer transition-colors group">
              <Upload className="w-7 h-7 text-stone-400 group-hover:text-amber-600 transition-colors mb-2" />
              <span className="text-sm font-semibold text-slate-800">
                Click to browse photo from phone or computer
              </span>
              <span className="text-xs text-stone-400 mt-0.5">
                Supports JPG, PNG, WEBP files
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Upload Method 2: Image URL */}
          <form onSubmit={handleUrlSubmit} className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              Or paste an Image Web URL:
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-sans"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shrink-0"
              >
                Apply URL
              </button>
            </div>
          </form>

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetAllImages}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Images to Default</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-full transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
