import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, ChevronRight } from 'lucide-react';
import { weddingData } from '../../weddingData';

export default function DetailsSection({ onNext }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(weddingData.event.targetDateISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const startDate = '20261218T193000';
    const endDate = '20261218T235900';
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:Wedding of ${weddingData.bride.name} & ${weddingData.groom.name}`,
      `DESCRIPTION:Wedding celebration invitation for ${weddingData.guest.name}.`,
      `LOCATION:${weddingData.event.venueName}, ${weddingData.event.venueAddress}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-invitation.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="section-scroll-content">
      <div className="chapter-crest-wrap">
        <span className="sub-flourish">Tareekh & Jagah</span>
      </div>

      <h2 className="section-title">
        <span className="title-pre">Shaadi Ki Details</span>
        <span className="title-main">{weddingData.event.ceremony}</span>
      </h2>

      {/* Countdown Card */}
      <div className="countdown-card">
        <div className="countdown-header">
          <span className="clock-icon">⏳</span>
          <span className="countdown-title">Shaadi Ka Countdown</span>
        </div>

        <div className="countdown-grid" aria-live="polite">
          <div className="time-box">
            <span className="time-number">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="time-label">Dinn</span>
          </div>
          <div className="time-sep">:</div>
          <div className="time-box">
            <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="time-label">Ghantay</span>
          </div>
          <div className="time-sep">:</div>
          <div className="time-box">
            <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="time-label">Minutes</span>
          </div>
          <div className="time-sep">:</div>
          <div className="time-box">
            <span className="time-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="time-label">Seconds</span>
          </div>
        </div>
      </div>

      {/* Event Details Grid */}
      <div className="event-details-grid">
        <div className="event-info-box">
          <div className="info-icon-badge">
            <Calendar size={20} className="text-gold" />
          </div>
          <div className="info-content">
            <span className="info-tag">Tareekh</span>
            <h4 className="info-value">{weddingData.event.dateDisplay}</h4>
            <p className="info-sub">Friday Ki Shaam</p>
          </div>
        </div>

        <div className="event-info-box">
          <div className="info-icon-badge">
            <Clock size={20} className="text-gold" />
          </div>
          <div className="info-content">
            <span className="info-tag">Waqt</span>
            <h4 className="info-value">{weddingData.event.timeDisplay}</h4>
            <p className="info-sub">Dinner & Celebrations</p>
          </div>
        </div>

        <div className="event-info-box venue-box">
          <div className="info-icon-badge">
            <MapPin size={20} className="text-gold" />
          </div>
          <div className="info-content">
            <span className="info-tag">Venue</span>
            <h4 className="info-value">{weddingData.event.venueName}</h4>
            <p className="info-sub">{weddingData.event.venueAddress}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="venue-action-buttons">
        <a
          href={weddingData.event.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-cta-btn venue-map-link"
        >
          <ExternalLink size={18} />
          <span>Google Maps Par Kholiye</span>
        </a>

        <button onClick={handleAddToCalendar} className="secondary-gold-btn">
          <CalendarPlus size={18} />
          <span>Calendar Mein Save Karein</span>
        </button>
      </div>

      {/* Next CTA */}
      <div className="section-bottom-action">
        <button className="gold-cta-btn" onClick={onNext}>
          <span>Humari Yaadein & RSVP</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
