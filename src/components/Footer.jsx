import React from "react";
import { Link } from "react-router-dom";
import { ASSETS, ORG_INFO, NAV_LINKS } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">
              Quick links
            </h4>
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm font-medium hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">
              Contact
            </h4>
            <a
              href={`mailto:${ORG_INFO.EMAIL}`}
              className="block text-sm font-medium hover:text-white transition-colors"
            >
              {ORG_INFO.EMAIL}
            </a>
            <p className="text-sm">{ORG_INFO.LOCATION}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">
              Social
            </h4>
            <a
              href={ORG_INFO.SOCIALS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={ORG_INFO.SOCIALS.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={ORG_INFO.SOCIALS.DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium hover:text-white transition-colors"
            >
              Discord
            </a>
          </div>
        </div>

        <p className="text-sm font-medium text-center">
          © {currentYear} IEEE EMBS at UCF. IEEE is the world’s largest
          technical professional organization dedicated to advancing technology
          for the benefit of humanity.
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
