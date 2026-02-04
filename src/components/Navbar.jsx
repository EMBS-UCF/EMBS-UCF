import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Layout as LayoutIcon } from "lucide-react";
import { ASSETS, ORG_INFO, NAV_LINKS } from "../constants";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const activeStyle = "bg-blue-600 text-white shadow-md";
  const inactiveStyle = "text-gray-600 hover:bg-gray-100";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Branding / Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={ASSETS.LOGO_URL}
            alt={`${ORG_INFO.NAME} Logo`}
            className="h-12 w-12 object-contain"
          />
          <div className="flex flex-col text-left">
            <span className="text-xl font-bold text-blue-900 leading-tight uppercase tracking-tight">
              {ORG_INFO.NAME}
            </span>
            <span className="text-xs font-semibold text-yellow-600 tracking-widest">
              {ORG_INFO.CHAPTER}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1 lg:space-x-2">
          {NAV_LINKS.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive ? activeStyle : inactiveStyle
                }`
              }
            >
              <Icon size={18} />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <LayoutIcon size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex w-full items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? activeStyle : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-bold">{label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
