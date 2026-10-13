import React, { useState } from 'react';
import { SCHEDULE_DATA } from '../data/conferenceData';
import { Calendar, Clock, Sun, Moon, Award, Download, Users, CheckCircle2 } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const activeDay = SCHEDULE_DATA[selectedDayIndex];

  // Helper to generate and download an .ICS calendar file for the conference
  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CCTI//Parenting Conference 3.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:CCTI Virtual Parenting Conference 3.0: Mothering & Motherhood
DESCRIPTION:Christian Children Training Institute presents Annual Virtual Parenting Conference 3.0. Live on Telegram.
STATUS:CONFIRMED
DTSTART:20261015T090000Z
DTEND:20261018T203000Z
LOCATION:Telegram Live Broadcast (https://t.me/+PQ5s9UlPuz1lZGI8)
URL:https://t.me/+PQ5s9UlPuz1lZGI8
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CCTI_Parenting_Conference_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section id="schedule" className="py-20 bg-[#FDFBF7] text-slate-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full mb-3">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Program Outline &amp; Timetable</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Four Days of Restoration
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-sans">
              Two powerful broadcast sessions daily: Mornings for foundational biblical teaching; Evenings for inner healing, prayer warfare, and parental empowerment.
            </p>
          </div>

          <button
            onClick={handleDownloadCalendar}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white border border-stone-300 hover:border-amber-500 text-slate-800 hover:text-amber-900 shadow-sm transition-all shrink-0"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>Download .ICS Calendar</span>
          </button>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-3 mb-8 no-scrollbar">
          {SCHEDULE_DATA.map((dayItem, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={dayItem.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-5 py-3 rounded-2xl text-left border transition-all shrink-0 duration-200 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                }`}
              >
                <span className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                  Day {idx + 1}
                </span>
                <span className="block font-serif text-base sm:text-lg font-bold">
                  {dayItem.day}
                </span>
                <span className={`block text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {dayItem.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Day Schedule Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Morning Plenary Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>Morning Session</span>
                </span>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{activeDay.morning.time}</span>
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-950 leading-snug">
                {activeDay.morning.theme}
              </h3>

              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                {activeDay.morning.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400">
                <Users className="w-3.5 h-3.5" />
                <span>Ministers Assigned</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeDay.morning.speakers.map((spk) => (
                  <span
                    key={spk}
                    className="text-xs font-semibold text-slate-800 bg-stone-100 px-3 py-1 rounded-full border border-stone-200"
                  >
                    {spk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Evening Plenary Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col justify-between space-y-6 ${
              activeDay.evening.isHighlight
                ? 'bg-gradient-to-br from-amber-50 via-white to-amber-100/50 border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                : 'bg-white border-stone-200/90'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    activeDay.evening.isHighlight
                      ? 'text-amber-900 bg-amber-400/30 border-amber-500'
                      : 'text-indigo-900 bg-indigo-50 border-indigo-200'
                  }`}
                >
                  {activeDay.evening.isHighlight ? (
                    <>
                      <Award className="w-3.5 h-3.5 text-amber-700" />
                      <span>Grand Closing Celebration &amp; Awards</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Evening Session</span>
                    </>
                  )}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{activeDay.evening.time}</span>
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-950 leading-snug">
                {activeDay.evening.theme}
              </h3>

              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                {activeDay.evening.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400">
                <Users className="w-3.5 h-3.5" />
                <span>Ministers Assigned</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeDay.evening.speakers.map((spk) => (
                  <span
                    key={spk}
                    className="text-xs font-semibold text-slate-800 bg-stone-100 px-3 py-1 rounded-full border border-stone-200"
                  >
                    {spk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Delivery Notification */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-900 gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              All sessions broadcast live on the official Telegram room with audio recording archives available to registered attendees.
            </span>
          </div>
          <a
            href="https://t.me/+PQ5s9UlPuz1lZGI8"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-2 shrink-0 hover:text-amber-950"
          >
            Open Telegram Channel →
          </a>
        </div>
      </div>
    </section>
  );
};
