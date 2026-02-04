import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Layout,
  Loader2,
} from "lucide-react";
import { CALENDAR_CONFIG } from "../constants";
import CountdownClock from "../components/CountdownClock";

const Events = () => {
  const [gbmEvents, setGbmEvents] = useState([]);
  const [nextEventRaw, setNextEventRaw] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { API_KEY, ID, FILTER_KEYWORD, MAX_GBMS } = CALENDAR_CONFIG;

      if (!API_KEY) {
        console.warn("Google API Key is missing. GBM cards will not load.");
        setLoading(false);
        return;
      }

      try {
        const now = new Date().toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          ID,
        )}/events?key=${API_KEY}&timeMin=${now}&singleEvents=true&orderBy=startTime`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.items) {
          // Filter for GBMs specifically
          const filtered = data.items.filter((item) =>
            item.summary?.toUpperCase().includes(FILTER_KEYWORD),
          );

          // 1. Set data for the Countdown Clock (first upcoming GBM)
          if (filtered.length > 0) {
            setNextEventRaw({
              title: filtered[0].summary,
              start: filtered[0].start.dateTime || filtered[0].start.date,
            });
          }

          // 2. Format the list for the GBM Grid (limit to MAX_GBMS)
          const formatted = filtered.slice(0, MAX_GBMS).map((item) => ({
            title: item.summary,
            date: new Date(
              item.start.dateTime || item.start.date,
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            time: item.start.dateTime
              ? new Date(item.start.dateTime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "All Day",
            loc: item.location || "TBA",
          }));

          setGbmEvents(formatted);
        }
      } catch (err) {
        console.error("Error fetching calendar:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      {!loading && nextEventRaw && (
        <CountdownClock
          targetDate={nextEventRaw.start}
          eventTitle={nextEventRaw.title}
        />
      )}

      <div className="space-y-6">
        <h2 className="text-4xl font-extrabold text-blue-900">
          Events Calendar
        </h2>
        <div className="bg-white p-2 rounded-3xl shadow-xl border border-slate-100 overflow-hidden aspect-video min-h-[500px]">
          <iframe
            src={CALENDAR_CONFIG.getEMBED_URL(CALENDAR_CONFIG.ID)}
            className="w-full h-full rounded-2xl border-0"
            title="Google Calendar"
          ></iframe>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center space-x-3">
          <Layout className="text-blue-600" size={32} />
          <h3 className="text-3xl font-extrabold text-blue-900">
            Upcoming GBMs
          </h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-24 text-blue-600 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="text-slate-500 font-medium">
              Syncing live schedule from Google...
            </p>
          </div>
        ) : gbmEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gbmEvents.map((e, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border-t-4 border-t-blue-600 shadow-lg transition-all hover:shadow-2xl hover:scale-[1.03]"
              >
                <div className="flex items-center space-x-2 text-blue-600 mb-4">
                  <Users size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Official GBM
                  </span>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-6 leading-tight h-12 overflow-hidden">
                  {e.title}
                </h4>
                <div className="space-y-3 text-sm text-slate-500 font-medium">
                  <div className="flex items-center">
                    <CalendarIcon size={16} className="mr-3 text-blue-500" />
                    <span>{e.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-3 text-blue-500" />
                    <span>{e.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-3 text-blue-500" />
                    <span>{e.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 italic text-lg">
              No upcoming GBMs found in the calendar feed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
