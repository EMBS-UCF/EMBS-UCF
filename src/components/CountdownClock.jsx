import React, { useState, useEffect } from "react";
import { Clock, CalendarClock } from "lucide-react";

const CountdownClock = ({ targetDate, eventTitle }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      // Ensure targetDate is valid before calculating
      const target = new Date(targetDate).getTime();
      if (isNaN(target)) return;

      const distance = target - now;

      if (distance < 0) {
        // Stop timer if date passed, zero out info
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
      {/* Header Section */}
      <div className="space-y-3 text-center lg:text-left relative z-10 max-w-md">
        <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-600 uppercase tracking-widest font-black text-sm">
          <CalendarClock size={20} className="animate-pulse" />
          <span>Next Event Countdown</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 leading-tight line-clamp-2">
          {eventTitle || "Upcoming Meeting"}
        </h3>
      </div>

      {/* The Timer Digits */}
      <div className="flex gap-3 md:gap-6 relative z-10">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center bg-blue-50/80 border border-blue-100 rounded-2xl py-4 px-3 md:px-6 min-w-[70px] md:min-w-[90px] shadow-sm transition-transform hover:-translate-y-1"
          >
            <span className="text-3xl md:text-5xl font-black tabular-nums text-blue-900">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-2">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-80 h-80 bg-gradient-to-br from-yellow-200/20 to-blue-400/10 blur-3xl rounded-full -z-10 pointer-events-none"></div>
    </div>
  );
};

export default CountdownClock;
