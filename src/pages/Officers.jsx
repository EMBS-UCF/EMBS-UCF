import React from "react";
import { OFFICERS, ASSETS } from "../constants";

const Officers = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          The Executive Board
        </h2>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Officers;
