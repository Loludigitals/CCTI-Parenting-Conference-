import React, { useState, useEffect } from 'react';
import { X, Mail, MessageSquare, Send, Database, Download, Check, Copy, ExternalLink, HelpCircle, Table, RefreshCw, Key } from 'lucide-react';

interface RegistrationRecord {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  role: string;
  registeredAt: string;
}

interface IntegrationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizerEmail: string;
  organizerWhatsApp: string;
  telegramChannelLink: string;
}

export const IntegrationHubModal: React.FC<IntegrationHubModalProps> = ({
  isOpen,
  onClose,
  organizerEmail,
  organizerWhatsApp,
  telegramChannelLink,
}) => {
  const [activeTab, setActiveTab] = useState<'attendees' | 'email' | 'whatsapp' | 'telegram' | 'sheets'>('attendees');
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Fetch attendees from backend API and localStorage
  const loadAttendees = async () => {
    setLoading(true);
    let apiList: RegistrationRecord[] = [];
    try {
      const res = await fetch('/api/registrations');
      if (res.ok) {
        const data = await res.json();
        apiList = data.registrations || [];
      }
    } catch {
      // Backend not running (e.g. static host)
    }

    let localList: RegistrationRecord[] = [];
    try {
      const stored = localStorage.getItem('ccti_registrations');
      if (stored) {
        localList = JSON.parse(stored);
      }
    } catch {
      // Ignore
    }

    // Merge and deduplicate by ID or email
    const mergedMap = new Map<string, RegistrationRecord>();
    [...apiList, ...localList].forEach((item) => {
      const key = item.id || item.email;
      if (!mergedMap.has(key)) {
        mergedMap.set(key, item);
      }
    });

    setRegistrations(Array.from(mergedMap.values()));
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadAttendees();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Export registrations to CSV
  const exportToCSV = () => {
    if (registrations.length === 0) {
      alert('No registrations yet to export.');
      return;
    }

    const headers = ['ID', 'Full Name', 'Email', 'WhatsApp', 'Country', 'Category', 'Registration Date'];
    const rows = registrations.map((r) => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.whatsapp.replace(/"/g, '""')}"`,
      `"${r.country.replace(/"/g, '""')}"`,
      `"${r.role.replace(/"/g, '""')}"`,
      `"${new Date(r.registeredAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CCTI_Conference_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredRegistrations = registrations.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.whatsapp.includes(searchTerm) ||
      r.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const googleAppsScriptCode = `// Google Apps Script to save CCTI Conference Registrations directly to Google Sheets
// 1. Open Google Sheets -> Extensions -> Apps Script
// 2. Paste this code and click Deploy -> New Deployment -> Web App (Set Who has access to "Anyone")
// 3. Copy your Web App URL into your form webhook

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Full Name", "Email", "WhatsApp", "Country", "Category"]);
    }
    
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.whatsapp || "",
      data.country || "",
      data.role || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({result: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-amber-400/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Organizer Integration &amp; Registration Hub
              </h3>
              <p className="text-xs text-stone-400">
                Manage backend database, email delivery, WhatsApp routing &amp; Telegram alerts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-1 px-6 pt-3 border-b border-stone-800 bg-slate-950/50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('attendees')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'attendees'
                ? 'bg-stone-800 text-amber-300 border-t-2 border-amber-400'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Table className="w-4 h-4 text-amber-400" />
            <span>Attendee Registry ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'email'
                ? 'bg-stone-800 text-amber-300 border-t-2 border-amber-400'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Real Email Linking</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'whatsapp'
                ? 'bg-stone-800 text-amber-300 border-t-2 border-amber-400'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-green-400" />
            <span>WhatsApp Linking</span>
          </button>

          <button
            onClick={() => setActiveTab('telegram')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'telegram'
                ? 'bg-stone-800 text-amber-300 border-t-2 border-amber-400'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4 text-blue-400" />
            <span>Telegram Channel / Bot</span>
          </button>

          <button
            onClick={() => setActiveTab('sheets')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'sheets'
                ? 'bg-stone-800 text-amber-300 border-t-2 border-amber-400'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-amber-400" />
            <span>Google Sheets</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: ATTENDEE DATABASE */}
          {activeTab === 'attendees' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <input
                  type="text"
                  placeholder="Search attendee by name, email, country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-72 px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 font-sans"
                />

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={loadAttendees}
                    disabled={loading}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300 flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export to CSV / Excel</span>
                  </button>
                </div>
              </div>

              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-12 bg-stone-950/60 rounded-2xl border border-stone-800 space-y-2">
                  <Table className="w-8 h-8 text-stone-600 mx-auto" />
                  <p className="text-sm font-semibold text-stone-400">No registrations found</p>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    When visitors submit the registration form, their details automatically appear here and are stored both on the backend and in your browser.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-900 text-amber-300 font-bold border-b border-stone-800">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">WhatsApp</th>
                        <th className="p-3">Country</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 text-stone-300">
                      {filteredRegistrations.map((item) => (
                        <tr key={item.id} className="hover:bg-stone-900/60 transition-colors">
                          <td className="p-3 font-semibold text-white">{item.name}</td>
                          <td className="p-3">
                            <a href={`mailto:${item.email}`} className="text-blue-400 hover:underline">
                              {item.email}
                            </a>
                          </td>
                          <td className="p-3">
                            <a
                              href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:underline"
                            >
                              {item.whatsapp}
                            </a>
                          </td>
                          <td className="p-3">{item.country}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60 text-[10px] font-semibold">
                              {item.role}
                            </span>
                          </td>
                          <td className="p-3 text-stone-500">
                            {new Date(item.registeredAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REAL EMAIL LINKING */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-emerald-200">
                  <h4 className="font-bold text-sm text-white">How Real Email Delivery Works</h4>
                  <p>
                    Every registration is configured to forward directly to your designated email: <strong className="text-white">{organizerEmail}</strong>.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 text-xs text-stone-300">
                <h5 className="font-bold text-amber-300 text-sm">3 Easy Options for Email Delivery:</h5>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                    <p className="font-bold text-white mb-1">Option 1: FormSubmit (Pre-Configured, Free, 0 Server Setup)</p>
                    <p className="text-stone-400 leading-relaxed">
                      The form posts directly to <code className="text-amber-300">https://formsubmit.co/cctioffice14@gmail.com</code>. The very first time a registration is submitted, FormSubmit sends a 1-time activation link to <code className="text-white">{organizerEmail}</code>. You click activate once, and every future registration immediately lands in your Gmail inbox!
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                    <p className="font-bold text-white mb-1">Option 2: Web3Forms (Access Key)</p>
                    <p className="text-stone-400 leading-relaxed">
                      Visit <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">web3forms.com</a>, enter your email <code className="text-white">{organizerEmail}</code>, and copy your free Access Key. All submissions go straight to your inbox without redirects.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                    <p className="font-bold text-white mb-1">Option 3: Full-Stack Express Server (Built Into This Project!)</p>
                    <p className="text-stone-400 leading-relaxed">
                      This app now runs on a full Express backend with the route <code className="text-amber-300">POST /api/register</code>. All submissions are automatically saved to <code className="text-white">data/registrations.json</code> on your server!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WHATSAPP LINKING */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4 text-xs text-stone-300">
              <div className="p-4 rounded-2xl bg-green-950/40 border border-green-500/30 flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-green-200">
                  <h4 className="font-bold text-sm text-white">Current WhatsApp Destination</h4>
                  <p>
                    Configured Organizer Phone Number: <strong className="text-white">{organizerWhatsApp}</strong>
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <h5 className="font-bold text-amber-300 text-sm">How WhatsApp Direct Registration Works:</h5>
                <p className="leading-relaxed text-stone-400">
                  WhatsApp links do not require a paid API or server! When an attendee clicks "Submit &amp; Open WhatsApp Confirmation", it opens the official WhatsApp link:
                </p>
                <div className="p-3 rounded-xl bg-stone-900 font-mono text-[11px] text-amber-300 break-all border border-stone-800">
                  https://wa.me/2347053905107?text=Registration:%20CCTI%20Virtual%20Parenting%20Conference...
                </div>
                <p className="leading-relaxed text-stone-400">
                  This opens WhatsApp with their Name, Email, WhatsApp number, and Country already pre-typed. Once they press <strong>Send</strong>, the message arrives directly on your phone!
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: TELEGRAM LINKING */}
          {activeTab === 'telegram' && (
            <div className="space-y-4 text-xs text-stone-300">
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
                <Send className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-blue-200">
                  <h4 className="font-bold text-sm text-white">Telegram Broadcast Room</h4>
                  <p>
                    Official Channel Link: <strong className="text-white">{telegramChannelLink}</strong>
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <h5 className="font-bold text-amber-300 text-sm">Want Automatic Telegram Alerts When Someone Registers?</h5>
                <ol className="list-decimal pl-4 space-y-1.5 text-stone-400">
                  <li>Open Telegram and message <strong>@BotFather</strong> to create a free bot (e.g. <code>@CCTIRegistrationBot</code>) and copy the Bot Token.</li>
                  <li>Create a private Telegram Group with your team and add the bot.</li>
                  <li>Get your Group Chat ID from <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code>.</li>
                  <li>Whenever a registration occurs, sending an HTTP GET or POST to:
                    <div className="p-2 my-1 rounded bg-stone-900 font-mono text-[10px] text-blue-300 break-all">
                      https://api.telegram.org/bot&lt;TOKEN&gt;/sendMessage?chat_id=&lt;CHAT_ID&gt;&amp;text=New%20Registration%20...
                    </div>
                    will instantly buzz your phone with the attendee's details!
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 5: GOOGLE SHEETS */}
          {activeTab === 'sheets' && (
            <div className="space-y-4 text-xs text-stone-300">
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3">
                <Database className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-amber-200">
                  <h4 className="font-bold text-sm text-white">Auto-Record Every Registration in Google Sheets</h4>
                  <p>
                    You can copy this free 10-line Google Apps Script to have every registration automatically create a new row in your private Google Sheet.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Google Apps Script Code:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(googleAppsScriptCode);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedCode ? 'Copied Code!' : 'Copy Script'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-[11px] text-amber-200/90 font-mono overflow-x-auto leading-relaxed max-h-56">
                  {googleAppsScriptCode}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Registered Attendees: <strong className="text-amber-400">{registrations.length}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-full transition-colors"
          >
            Close Hub
          </button>
        </div>
      </div>
    </div>
  );
};
