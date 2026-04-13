import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail, MapPin, MessageCircleHeart, Users } from "lucide-react";
import { ORG_INFO, CONTACT_SOCIALS } from "../constants";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-500">
      <section className="rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              Contact IEEE EMBS at UCF
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Let&apos;s build something meaningful
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Questions about membership, projects, sponsorship, or collaboration?
              Reach out and our team will connect with you.
            </p>
            <a
              href={`mailto:${ORG_INFO.EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-black text-blue-900 hover:bg-blue-50 transition-colors"
            >
              Email the chapter
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4">
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin size={17} />
                <p className="text-xs font-black uppercase tracking-[0.2em]">
                  Location
                </p>
              </div>
              <p className="text-sm mt-2">{ORG_INFO.LOCATION}</p>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4">
              <div className="flex items-center gap-2 text-blue-100">
                <Users size={17} />
                <p className="text-xs font-black uppercase tracking-[0.2em]">
                  Best for
                </p>
              </div>
              <p className="text-sm mt-2">
                Membership questions, project onboarding, and chapter partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <a
          href={`mailto:${ORG_INFO.EMAIL}`}
          className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-8 group transition-all hover:shadow-2xl hover:-translate-y-1"
        >
          <div className="space-y-5">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Mail size={30} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Email Us</h3>
              <p className="text-slate-500 mt-1">
                For inquiries, memberships, outreach, and partnerships.
              </p>
            </div>
            <p className="text-lg md:text-xl font-black text-blue-700 break-all">
              {ORG_INFO.EMAIL}
            </p>
          </div>
        </a>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-8 space-y-5">
          <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center">
            <MessageCircleHeart size={30} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Need a quick start?</h3>
            <p className="text-slate-500 mt-1">
              Jump directly to key chapter pages while you wait for a response.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/events")}
              className="rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700 text-left hover:bg-slate-50"
            >
              View events
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700 text-left hover:bg-slate-50"
            >
              Explore projects
            </button>
            <button
              onClick={() => navigate("/officers")}
              className="rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700 text-left hover:bg-slate-50"
            >
              Meet officers
            </button>
            <button
              onClick={() => navigate("/")}
              className="rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700 text-left hover:bg-slate-50"
            >
              Go to homepage
            </button>
          </div>
        </div>
      </section>

      {/* Social Media Grid */}
      <div className="space-y-8">
        <h3 className="text-xs font-black text-center text-slate-400 uppercase tracking-[0.35em]">
          Connect Online
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_SOCIALS.map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center space-x-3 p-5 ${social.color} text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-95 transition-all duration-300`}
            >
              <social.icon size={24} />
              <span className="font-black text-lg">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
