import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar as CalendarIcon,
  Mail,
  Home,
  ChevronRight,
  Github,
  Linkedin,
  Instagram,
  MapPin,
  Clock,
  Info,
  ExternalLink,
  Cpu,
  Heart,
  Globe,
  MessageSquare,
  Layout,
  Loader2,
} from "lucide-react";

/**
 * IEEE EMBS at UCF - Local Vite Project Setup
 * * ENVIRONMENT VARIABLE ACCESS:
 * We use a conditional check to ensure compatibility across different build environments.
 * Ensure your .env file in the root directory contains:
 * VITE_APP_GOOGLE_CALENDAR_ID=your_id@gmail.com
 * VITE_APP_GOOGLE_API_KEY=your_api_key
 */

const GOOGLE_CALENDAR_ID =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_APP_GOOGLE_CALENDAR_ID) ||
  "primary";
const GOOGLE_API_KEY =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_APP_GOOGLE_API_KEY) ||
  "";

const App = () => {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Events State
  const [gbmEvents, setGbmEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const logoUrl =
    "https://media.discordapp.net/attachments/1359619958879027432/1412109304051531846/image.png?ex=6980ce45&is=697f7cc5&hm=af2ce83d20c572431648d9d0cf6863686e3098e0e2519fafcd76a0e0c9b0f345&=&format=webp&quality=lossless&width=954&height=954";

  // Fetch GBMs from Google Calendar
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      if (!GOOGLE_API_KEY) {
        console.warn("Google API Key is missing. GBM cards will not load.");
        setEventsLoading(false);
        return;
      }
      try {
        const now = new Date().toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events?key=${GOOGLE_API_KEY}&timeMin=${now}&singleEvents=true&orderBy=startTime`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
          const gbms = data.items
            .filter((item) => item.summary?.toUpperCase().includes("GBM"))
            .slice(0, 4)
            .map((item) => ({
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
          setGbmEvents(gbms);
        }
      } catch (error) {
        console.error("Error fetching calendar:", error);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchCalendarEvents();
  }, []);

  const officers = [
    {
      name: "Eren Siegman",
      role: "President",
      major: "Computer Engineering",
      image: "",
    },
    {
      name: "Megan Laffey",
      role: "Vice President",
      major: "Mechanical Engineering",
      image: "",
    },
    {
      name: "Rachel Ostrow",
      role: "Treasurer",
      major: "Photonics Engineering",
      image: "",
    },
    {
      name: "Erin Weidel",
      role: "Secretary",
      major: "Electrical Engineering",
      image: "",
    },
    {
      name: "Samuel Lane",
      role: "Workshop Chair",
      major: "Electrical Engineering",
      image: "",
    },
    {
      name: "Louis Cosentini",
      role: "Project Chair",
      major: "Electrical Engineering",
      image: "",
    },
    {
      name: "Aidan Cobb",
      role: "Outreach Chair",
      major: "Mechanical Engineering",
      image: "",
    },
  ];

  const features = [
    {
      title: "Industry & Academic Insight",
      desc: "We host guest lectures from UCF faculty and industry leaders to provide a direct look into groundbreaking research and the medical device marketplace.",
      img: "https://media.discordapp.net/attachments/1377397966402355220/1412601644062998558/20250902_190700.jpg?ex=6981474c&is=697ff5cc&hm=61f26a634835e8572d582d4e6a22e6c7e4754ca94f135c1e31f1016185e244dc&=&format=webp&width=637&height=850",
    },
    {
      title: "Technical Mastery",
      desc: "Gain hands-on experience through student-led technical projects and skill-building workshops designed to bridge the gap between classroom theory and real-world application.",
      img: "https://media.discordapp.net/attachments/1377397966402355220/1422739736870653993/20250930_200019.jpg?ex=69813f22&is=697feda2&hm=ca8f30daf86c4ef6d437344b4853c4a60178caa81dabfbb5f2ea3dbba15bbbd7&=&format=webp&width=637&height=850",
    },
    {
      title: "Professional Foundation",
      desc: "As a chapter of the world’s largest biomedical engineering society, we connect you to a massive international community and exclusive professional resources.",
      img: "https://media.discordapp.net/attachments/1377397966402355220/1440400287750819891/IMG_2860.jpg?ex=6980e54d&is=697f93cd&hm=eea4e5b6f963523561f8a1fcac0baa1291d4d8b36a61c4ab2e9b65aacb0f9854&=&format=webp&width=775&height=850",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActivePage("home")}
          >
            <img
              src={logoUrl}
              alt="EMBS Logo"
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold text-blue-900 leading-tight uppercase tracking-tight">
                IEEE EMBS
              </span>
              <span className="text-xs font-semibold text-yellow-600 tracking-widest">
                UCF CHAPTER
              </span>
            </div>
          </div>
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {[
              ["home", Home, "Home"],
              ["officers", Users, "Officers"],
              ["events", CalendarIcon, "Events"],
              ["contact", Mail, "Contact"],
            ].map(([id, Icon, label]) => (
              <button
                key={id}
                onClick={() => setActivePage(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${activePage === id ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Layout size={24} />
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {[
            ["home", Home, "Home"],
            ["officers", Users, "Officers"],
            ["events", CalendarIcon, "Events"],
            ["contact", Mail, "Contact"],
          ].map(([id, Icon, label]) => (
            <button
              key={id}
              onClick={() => {
                setActivePage(id);
                setMobileMenuOpen(false);
              }}
              className={`flex w-full items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activePage === id ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <Icon size={20} />
              <span className="font-bold">{label}</span>
            </button>
          ))}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activePage === "home" && (
          <div className="space-y-24 animate-in fade-in duration-500">
            <section className="rounded-3xl bg-gradient-to-br from-blue-900 to-black text-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl">
              <div className="md:w-1/2 space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
                  Where Engineering Meets{" "}
                  <span className="text-blue-400">Medicine</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300">
                  Advancing technology for humanity through healthcare and
                  engineering principles locally at UCF.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button
                    onClick={() => setActivePage("events")}
                    className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-full transition-all hover:bg-yellow-400 hover:scale-105 active:scale-95 shadow-lg"
                  >
                    Join an Event
                  </button>
                  <button
                    onClick={() => setActivePage("contact")}
                    className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
              <img
                src={logoUrl}
                alt="Logo"
                className="h-64 w-64 md:h-96 md:w-96 mt-12 md:mt-0 object-contain drop-shadow-[0_20px_50px_rgba(30,58,138,0.5)]"
              />
            </section>

            <section className="space-y-24">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 lg:gap-20`}
                >
                  <div className="md:w-1/2 overflow-hidden rounded-3xl shadow-2xl border border-slate-100">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <div className="flex items-center gap-3">
                      {f.icon}
                      <h3 className="text-3xl font-bold text-blue-900 tracking-tight">
                        {f.title}
                      </h3>
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {f.desc}
                    </p>
                    <button
                      onClick={() => setActivePage("events")}
                      className="text-blue-600 font-bold flex items-center group text-lg"
                    >
                      Learn more{" "}
                      <ChevronRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        {activePage === "officers" && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
                The Executive Board
              </h2>
              <p className="text-slate-600 text-lg">
                Meet the students leading IEEE EMBS at UCF for the 2025-2026
                year.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {officers.map((o, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="h-64 bg-slate-200 overflow-hidden border-b border-slate-50">
                    <img
                      src={o.image}
                      alt={o.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-slate-800">
                      {o.name}
                    </h3>
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-wide">
                      {o.role}
                    </p>
                    <p className="text-xs text-slate-400 mt-3 tracking-widest uppercase font-medium">
                      {o.major}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage === "events" && (
          <div className="space-y-16 animate-in fade-in duration-500">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-blue-900">
                Events Calendar
              </h2>
              <div className="bg-white p-2 rounded-3xl shadow-xl border border-slate-100 overflow-hidden aspect-video min-h-[500px]">
                <iframe
                  src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(GOOGLE_CALENDAR_ID)}&ctz=America%2FNew_York&bgcolor=%23ffffff&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1`}
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
              {eventsLoading ? (
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
                          <CalendarIcon
                            size={16}
                            className="mr-3 text-blue-500"
                          />
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
                  <button
                    onClick={() => setActivePage("contact")}
                    className="mt-4 text-blue-600 font-bold hover:underline"
                  >
                    Notify us of an error
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activePage === "contact" && (
          <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
                Get in Touch
              </h2>
              <p className="text-xl text-slate-600">
                Have questions? Join our community or email us.
              </p>
            </div>

            <div className="flex justify-center">
              <a
                href="mailto:ieee.embs.ucf@gmail.com"
                className="w-full max-w-md p-10 bg-white rounded-[2rem] border border-slate-100 shadow-xl flex flex-col items-center text-center space-y-6 group transition-all hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                  <Mail size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Email Us
                  </h3>
                  <p className="text-slate-500 font-medium">
                    For inquiries, membership, or partnerships.
                  </p>
                </div>
                <span className="text-2xl font-black text-blue-600 group-hover:text-blue-700 underline decoration-blue-100 underline-offset-8">
                  ieee.embs.ucf@gmail.com
                </span>
              </a>
            </div>

            <div className="space-y-8">
              <h3 className="text-xs font-black text-center text-slate-400 uppercase tracking-[0.5em]">
                Connect Online
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Discord",
                    icon: MessageSquare,
                    color: "bg-[#5865F2]",
                    link: "#",
                  },
                  {
                    name: "LinkedIn",
                    icon: Linkedin,
                    color: "bg-[#0077b5]",
                    link: "#",
                  },
                  {
                    name: "Instagram",
                    icon: Instagram,
                    color:
                      "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
                    link: "#",
                  },
                  {
                    name: "GitHub",
                    icon: Github,
                    color: "bg-slate-900",
                    link: "#",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    className={`flex items-center justify-center space-x-3 p-5 ${social.color} text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300`}
                  >
                    <social.icon size={24} />
                    <span className="font-black text-lg">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 text-center mt-20">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex justify-center items-center space-x-3 opacity-80">
            <img
              src={logoUrl}
              alt="EMBS"
              className="h-8 w-8 grayscale brightness-200"
            />
            <span className="text-white font-bold text-lg tracking-tighter">
              IEEE EMBS UCF
            </span>
          </div>
          <p className="text-sm font-medium">
            © Copyright {new Date().getFullYear()} IEEE – All rights reserved.
            A public charity, IEEE is the world’s largest technical professional
            organization dedicated to advancing technology for the benefit of
            humanity.
          </p>
          <div className="flex justify-center gap-8 opacity-20 text-[10px] font-black uppercase tracking-[0.6em]">
            <span>Engineering</span>
            <span>Medicine</span>
            <span>Biology</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
