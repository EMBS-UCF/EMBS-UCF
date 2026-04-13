import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Wrench,
  Network,
  CircleCheckBig,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";
import { ASSETS, CALENDAR_CONFIG, HOME_FEATURES, ORG_INFO } from "../constants";

const Home = () => {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventLoading, setEventLoading] = useState(true);
  const [eventNotice, setEventNotice] = useState("");

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const { API_KEY, ID } = CALENDAR_CONFIG;

      if (!API_KEY) {
        setEventNotice("Add the calendar API key to show live upcoming events.");
        setEventLoading(false);
        return;
      }

      try {
        const now = new Date().toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          ID,
        )}/events?key=${API_KEY}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=3`;

        const res = await fetch(url);
        const data = await res.json();
        const items = data.items?.filter((item) => item.start) || [];

        if (items.length === 0) {
          setEventNotice("No upcoming events are scheduled right now.");
          setEventLoading(false);
          return;
        }

        setUpcomingEvents(
          items.map((item) => {
            const rawStart = item.start.dateTime || item.start.date;
            const startDate = new Date(rawStart);
            const isAllDay = !item.start.dateTime;

            return {
              title: item.summary || "Upcoming Event",
              date: startDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              time: isAllDay
                ? "All Day"
                : startDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
              location: item.location || "Location TBA",
            };
          }),
        );
      } catch (error) {
        console.error("Failed to fetch upcoming events:", error);
        setEventNotice("Couldn't load upcoming events right now.");
      } finally {
        setEventLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const growthPath = [
    {
      title: "Attend a GBM",
      desc: "Meet the chapter, hear updates, and learn where current opportunities are.",
      cta: "View events",
      path: "/events",
    },
    {
      title: "Join a project track",
      desc: "Pick a build or research stream and start learning through hands-on work.",
      cta: "See projects",
      path: "/projects",
    },
    {
      title: "Grow your network",
      desc: "Connect with officers, student teams, faculty, and partner communities.",
      cta: "Meet officers",
      path: "/officers",
    },
  ];

  return (
    <div className="space-y-24 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-900 to-black text-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl gap-10">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <span className="inline-flex items-center rounded-full border border-blue-300/60 bg-blue-500/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
            IEEE Engineering in Medicine and Biology Society
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Where Engineering Meets{" "}
            <span className="text-blue-400">Medicine</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            {ORG_INFO.TAGLINE} Join students building practical biomedical skills
            through projects, workshops, and collaborative events.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/events")}
              className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-full transition-all hover:bg-yellow-400 hover:scale-105 active:scale-95 shadow-lg"
            >
              View events
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all"
            >
              Contact us
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src={ASSETS.LOGO_URL}
            alt="EMBS Logo"
            className="h-64 w-64 md:h-80 md:w-80 mx-auto object-contain drop-shadow-[0_20px_50px_rgba(30,58,138,0.5)] rounded-2xl"
          />
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-slate-200 p-8 md:p-10 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
              Upcoming events
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Next on the chapter calendar
            </h2>
          </div>
          <button
            onClick={() => navigate("/events")}
            className="inline-flex items-center text-blue-700 font-bold hover:text-blue-900 transition-colors"
          >
            Open full calendar
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-6">
          {eventLoading ? (
            <p className="text-slate-500">Loading upcoming events...</p>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={`${event.title}-${event.date}-${index}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 space-y-2"
                >
                  <h3 className="text-lg font-bold text-blue-900">{event.title}</h3>
                  <p className="inline-flex items-center gap-2 text-slate-600">
                    <CalendarDays size={16} className="text-blue-600" />
                    {event.date}
                  </p>
                  <p className="inline-flex items-center gap-2 text-slate-600">
                    <Clock3 size={16} className="text-blue-600" />
                    {event.time}
                  </p>
                  <p className="inline-flex items-center gap-2 text-slate-600">
                    <MapPin size={16} className="text-blue-600" />
                    {event.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">{eventNotice}</p>
          )}
        </div>
      </section>

      {/* alternating Features Section */}
      <section className="space-y-24">
        {HOME_FEATURES.map((f, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-12 lg:gap-20`}
          >
            <div className="md:w-1/2 overflow-hidden rounded-3xl shadow-2xl border border-slate-100">
              <img
                src={f.img}
                alt={f.title}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-3xl font-bold text-blue-900 tracking-tight">
                {f.title}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">{f.desc}</p>
              <button
                onClick={() => navigate(f.path)}
                className="text-blue-600 font-bold flex items-center group text-lg"
              >
                {f.ctaLabel}
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-slate-950 text-white p-8 md:p-12 shadow-2xl">
        <div className="space-y-8">
          <div className="space-y-3 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
              Why EMBS at UCF
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Learn by building, not just by listening
            </h2>
            <p className="text-blue-100 text-lg">
              We emphasize practical skill growth with mentorship, technical depth,
              and a collaborative culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-3">
              <Brain className="text-blue-300" size={22} />
              <h3 className="text-xl font-bold">Biomedical context</h3>
              <p className="text-slate-300">
                Understand how engineering decisions map to real healthcare use
                cases.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-3">
              <Wrench className="text-blue-300" size={22} />
              <h3 className="text-xl font-bold">Hands-on execution</h3>
              <p className="text-slate-300">
                Build systems end-to-end through projects, workshops, and team
                problem solving.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-3">
              <Network className="text-blue-300" size={22} />
              <h3 className="text-xl font-bold">Professional growth</h3>
              <p className="text-slate-300">
                Build a network across students, officers, and collaborators beyond
                campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
            Your path in the chapter
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            A clear way to get started
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {growthPath.map((step, i) => (
            <div
              key={step.title}
              className="rounded-3xl bg-white border border-slate-200 p-7 shadow-md space-y-4"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Step {i + 1}
              </p>
              <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
              <button
                onClick={() => navigate(step.path)}
                className="inline-flex items-center text-blue-700 font-bold hover:text-blue-900 transition-colors"
              >
                {step.cta}
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-blue-50 border border-blue-100 p-8 md:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900">
              Ready to plug in this week?
            </h2>
            <p className="text-blue-900/80 text-lg">
              Start with one event, then message us to find the best project fit
              for your interests and availability.
            </p>
          </div>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-700 text-white font-black hover:bg-blue-800 transition-colors"
          >
            <CircleCheckBig size={18} />
            Get matched to a team
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
