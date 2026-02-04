import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ASSETS, HOME_FEATURES } from "../constants";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-900 to-black text-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Where Engineering Meets{" "}
            <span className="text-blue-400">Medicine</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Advancing technology for humanity through healthcare and engineering
            principles locally at UCF.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/events")}
              className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-full transition-all hover:bg-yellow-400 hover:scale-105 active:scale-95 shadow-lg"
            >
              Join an Event
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
        <img
          src={ASSETS.LOGO_URL}
          alt="EMBS Logo"
          className="h-64 w-64 md:h-96 md:w-96 mt-12 md:mt-0 object-contain drop-shadow-[0_20px_50px_rgba(30,58,138,0.5)] rounded-2xl"
        />
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
                onClick={() => navigate("/events")}
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
  );
};

export default Home;
