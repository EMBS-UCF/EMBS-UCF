import React from "react";
import { ArrowRight, BookOpenText, GraduationCap, BriefcaseBusiness } from "lucide-react";
import { RESOURCE_SECTIONS } from "../constants";

const icons = [BookOpenText, GraduationCap, BriefcaseBusiness];

const Resources = () => {
  return (
    <div className="space-y-14 animate-in fade-in duration-500">
      <section className="rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white p-8 md:p-12 shadow-2xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">
          Chapter resources
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-3">
          Resources for your EMBS path
        </h1>
        <p className="text-lg text-blue-100 mt-4 max-w-3xl">
          A central place for biomedical-related course references, scholarships,
          and professional opportunities.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {RESOURCE_SECTIONS.map((section, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article
              key={section.title}
              className="bg-white rounded-3xl border border-slate-200 shadow-md p-7 space-y-5"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Icon size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                <p className="text-slate-600 mt-2">{section.description}</p>
              </div>

              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href === "#") e.preventDefault();
                      }}
                      className={`inline-flex items-center gap-2 font-semibold ${
                        link.href === "#"
                          ? "text-slate-400 cursor-not-allowed"
                          : "text-blue-700 hover:text-blue-900"
                      }`}
                    >
                      {link.label}
                      <ArrowRight size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Resources;
