import React from "react";
import { Mail } from "lucide-react";
import { ORG_INFO, CONTACT_SOCIALS } from "../constants";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          Get in Touch
        </h2>
        <p className="text-xl text-slate-600">
          Have questions? Join our community or email us.
        </p>
      </div>

      {/* Primary Email Action */}
      <div className="flex justify-center">
        <a
          href={`mailto:${ORG_INFO.EMAIL}`}
          className="w-full max-w-md p-10 bg-white rounded-[2rem] border border-slate-100 shadow-xl flex flex-col items-center text-center space-y-6 group transition-all hover:shadow-2xl hover:-translate-y-2"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
            <Mail size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-800">Email Us</h3>
            <p className="text-slate-500 font-medium">
              For inquiries, membership, or partnerships.
            </p>
          </div>
          <span className="text-xl md:text-2xl font-black text-blue-600 group-hover:text-blue-700 underline decoration-blue-100 underline-offset-8 break-all">
            {ORG_INFO.EMAIL}
          </span>
        </a>
      </div>

      {/* Social Media Grid */}
      <div className="space-y-8">
        <h3 className="text-xs font-black text-center text-slate-400 uppercase tracking-[0.5em]">
          Connect Online
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_SOCIALS.map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center space-x-3 p-5 ${social.color} text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300`}
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
