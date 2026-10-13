import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, Copy, Sparkles, MessageSquare, Download, AlertCircle, Database, Settings, ShieldCheck } from 'lucide-react';

interface RegistrationSectionProps {
  onOpenIntegrationHub?: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({ onOpenIntegrationHub }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    country: '',
    role: 'Mother',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const roles = [
    'Mother',
    'Mother-to-be',
    'Grandmother',
    'Father / Husband',
    'Teacher / Educator',
    'Children\'s Minister',
    'Caregiver / Guardian',
  ];

  const generateWhatsAppMessage = () => {
    return `Registration: CCTI Virtual Parenting Conference 3.0 (15-18 Oct 2026)\nName: ${formData.name}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\nCountry: ${formData.country}\nCategory: ${formData.role}`;
  };

  const getWhatsAppLink = () => {
    return `https://wa.me/2347053905107?text=${encodeURIComponent(generateWhatsAppMessage())}`;
  };

  const getMailtoLink = () => {
    return `mailto:cctioffice14@gmail.com?subject=${encodeURIComponent(
      'Conference Registration - CCTI 3.0'
    )}&body=${encodeURIComponent(generateWhatsAppMessage())}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const record = {
      id: 'REG-' + Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      whatsapp: formData.whatsapp.trim(),
      country: formData.country.trim(),
      role: formData.role,
      registeredAt: new Date().toISOString(),
    };

    // 1. Save to local browser storage backup
    try {
      const existing = JSON.parse(localStorage.getItem('ccti_registrations') || '[]');
      localStorage.setItem('ccti_registrations', JSON.stringify([record, ...existing]));
    } catch {
      // Ignore storage error
    }

    // 2. Submit to backend API (/api/register)
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Ignore if on static server
    }

    // 3. Dispatch real email notification to cctioffice14@gmail.com via FormSubmit AJAX (Free, no server required)
    try {
      fetch('https://formsubmit.co/ajax/cctioffice14@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New CCTI 3.0 Registration: ${formData.name} (${formData.country})`,
          FullName: formData.name,
          Email: formData.email,
          WhatsApp: formData.whatsapp,
          Country: formData.country,
          Category: formData.role,
        }),
      }).catch(() => {});
    } catch {
      // Ignore
    }

    setSubmitting(false);
    setSubmitted(true);

    // 4. Open WhatsApp directly with pre-formatted message
    const waUrl = getWhatsAppLink();
    try {
      window.open(waUrl, '_blank');
    } catch {
      // Handled by on-screen button
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="registration" className="py-20 bg-gradient-to-b from-stone-900 via-slate-950 to-stone-900 text-white border-b border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-300 bg-amber-500/20 border border-amber-400/30 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Complimentary Registration</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Reserve Your Free Seat
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300 font-sans">
            15th – 18th October 2026 · Daily Mornings (10 AM) &amp; Evenings (7 PM WAT) · Live on Telegram
          </p>

          {/* Organizer Hub Trigger */}
          {onOpenIntegrationHub && (
            <div className="pt-3">
              <button
                type="button"
                onClick={onOpenIntegrationHub}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/80 hover:bg-stone-800 text-amber-300 text-xs font-semibold border border-amber-400/40 shadow-sm transition-all"
                title="View registrations and configure backend connections"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Organizer Hub: View Registrations &amp; Backend Links</span>
              </button>
            </div>
          )}
        </div>

        {/* Registration Card / Container */}
        <div className="bg-stone-900/90 rounded-3xl border border-amber-400/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mrs. Grace Adebayo"
                    className="w-full px-4 py-3 rounded-xl bg-stone-950/80 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm font-sans"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-email" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="grace@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-stone-950/80 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm font-sans"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-phone" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    WhatsApp Number (with country code) *
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+234 803 123 4567"
                    className="w-full px-4 py-3 rounded-xl bg-stone-950/80 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm font-sans"
                  />
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-country" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    Country of Residence *
                  </label>
                  <input
                    id="reg-country"
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Nigeria, United Kingdom, USA"
                    className="w-full px-4 py-3 rounded-xl bg-stone-950/80 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm font-sans"
                  />
                </div>
              </div>

              {/* Attendance Category */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  I am attending primarily as:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {roles.map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setFormData({ ...formData, role: r })}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all ${
                        formData.role === r
                          ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-sm'
                          : 'bg-stone-950/60 text-stone-300 border-stone-700 hover:border-stone-500'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/20 hover:brightness-105 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Submit &amp; Open WhatsApp Confirmation</span>
                </button>

                <p className="text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    Submitting opens WhatsApp with your pre-filled details to notify the organizers.
                  </span>
                </p>
              </div>
            </form>
          ) : (
            /* Successful Registration Step */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Almost Done, {formData.name.split(' ')[0]}!
                </h3>
                <p className="text-sm text-stone-300 mt-2 max-w-lg mx-auto">
                  If WhatsApp opened automatically on your device, simply tap <strong className="text-white">Send</strong> to complete your registration. If not, choose an option below:
                </p>
              </div>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </a>

                <a
                  href={getMailtoLink()}
                  className="flex-1 py-3 px-5 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-medium text-sm border border-stone-600 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send by Email</span>
                </a>
              </div>

              {/* Telegram Channel Direct Box */}
              <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/30 max-w-lg mx-auto text-left flex items-start gap-3">
                <Send className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">
                    Step 2: Join the Live Broadcast Room
                  </h4>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    All conference audio sessions, notes, and prayer guides will be delivered live on the official Telegram room.
                  </p>
                  <a
                    href="https://t.me/+PQ5s9UlPuz1lZGI8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block pt-1 text-xs font-bold text-blue-300 hover:text-white underline underline-offset-2"
                  >
                    Click to Enter Telegram Room Now →
                  </a>
                </div>
              </div>

              {/* Edit Details or Copy Info */}
              <div className="pt-2 flex items-center justify-center gap-4 text-xs text-stone-400">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied to clipboard!' : 'Copy Registration Details'}</span>
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="hover:text-stone-200 underline underline-offset-2"
                >
                  Edit Information
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
