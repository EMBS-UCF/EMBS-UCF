import React from "react";
import { Linkedin } from "lucide-react";
import { OFFICERS, FACULTY_ADVISOR, ASSETS } from "../constants";

const Officers = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          The Executive Board
        </h1>
        <p className="text-slate-600 text-lg">
          Meet the students leading IEEE EMBS at UCF for the 2025-2026 year.
        </p>
      </div>

      {/* Grid of Officer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {OFFICERS.map((o, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="h-64 bg-slate-200 overflow-hidden border-b border-slate-50">
              {o.image ? (
                <img
                  src={o.image}
                  alt={o.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  onError={(e) => {
                    // Fallback to placeholder if the R2 link fails
                    e.target.src = ASSETS.FALLBACK_OFFICER;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold italic">
                  No Image
                </div>
              )}
            </div>

            {/* Officer Details */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-slate-800">{o.name}</h3>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-wide">
                {o.role}
              </p>
              <p className="text-xs text-slate-400 mt-3 tracking-widest uppercase font-medium">
                {o.major}
              </p>
              <a
                href={o.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!o.linkedin}
                onClick={(e) => {
                  if (!o.linkedin) e.preventDefault();
                }}
                className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                  o.linkedin
                    ? "bg-[#0077b5] text-white hover:bg-[#006299]"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>

      <section className="pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900">Faculty Advisor</h2>
          <p className="text-slate-600">
            Guidance and mentorship supporting the chapter mission.
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md">
            <div className="h-64 bg-slate-200 overflow-hidden border-b border-slate-50">
              {FACULTY_ADVISOR.image ? (
                <img
                  src={FACULTY_ADVISOR.image}
                  alt={FACULTY_ADVISOR.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = ASSETS.FALLBACK_OFFICER;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold italic">
                  No Image
                </div>
              )}
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-slate-800">
                {FACULTY_ADVISOR.name}
              </h3>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-wide">
                {FACULTY_ADVISOR.role}
              </p>
              <p className="text-xs text-slate-400 mt-3 tracking-wide uppercase font-medium">
                {FACULTY_ADVISOR.major}
              </p>
              <a
                href={FACULTY_ADVISOR.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!FACULTY_ADVISOR.linkedin}
                onClick={(e) => {
                  if (!FACULTY_ADVISOR.linkedin) e.preventDefault();
                }}
                className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                  FACULTY_ADVISOR.linkedin
                    ? "bg-[#0077b5] text-white hover:bg-[#006299]"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Officers;
