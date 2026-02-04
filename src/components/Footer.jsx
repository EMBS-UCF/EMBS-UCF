import React from "react";
import { ASSETS, ORG_INFO } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 text-center mt-20">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex justify-center items-center space-x-3 opacity-80">
          <img
            src={ASSETS.LOGO_URL}
            alt={`${ORG_INFO.NAME} Logo`}
            className="h-8 w-8 grayscale brightness-200"
          />
          <span className="text-white font-bold text-lg tracking-tighter uppercase">
            {ORG_INFO.NAME} {ORG_INFO.CHAPTER}
          </span>
        </div>

        <p className="text-sm font-medium">
          © Copyright {currentYear} IEEE – All rights reserved. A public
          charity, IEEE is the world’s largest technical professional
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
  );
};

export default Footer;
