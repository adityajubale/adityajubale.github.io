import './fonts.css';
import asset0 from "./assets/lp-23-hero.png";

import React from 'react';
import { ArrowRight, Wine, Leaf, Droplets } from 'lucide-react';

export default function Lp23() {
  return (
    <div style={{ width: "100%", height: "100%" }} className="overflow-hidden bg-[#F4F2EE] text-[#2C2C2B] relative flex flex-col font-['DM_Sans']">
      {/* Header */}
      <header className="flex justify-between items-center px-16 py-8 absolute top-0 left-0 right-0 z-10">
        <div className="font-['Playfair_Display'] text-2xl font-bold tracking-widest uppercase">
          CELLAR.
        </div>
        <nav className="flex gap-12 text-sm uppercase tracking-widest">
          <a href="#" className="hover:opacity-60 transition-opacity">Curations</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Vignerons</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Journal</a>
        </nav>
        <button className="text-sm uppercase tracking-widest border border-[#F4F2EE]/50 text-[#F4F2EE] px-6 py-3 hover:bg-[#F4F2EE] hover:text-[#2C2C2B] transition-colors">
          Join the Club
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex mt-0 h-full">
        {/* Left Column */}
        <div className="w-[55%] h-full flex flex-col justify-center px-16 pt-24 pb-12 z-10 relative">
          <div className="mb-6 flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#8B2332]"></span>
            <span className="text-[#8B2332] uppercase tracking-[0.2em] text-xs font-semibold">Limited Allocation</span>
          </div>
          <h1 className="font-['Playfair_Display'] text-[84px] leading-[0.95] mb-8 text-[#1A1A1A]">
            Living wine,<br />
            <span className="text-[#8B2332] italic">bottled poetry.</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-md mb-12 text-[#4A4A4A]">
            Discover the world's most expressive low-intervention wines. Sourced directly from independent cellars, delivered to your door every month.
          </p>
          
          <div className="flex items-center gap-6 mb-16">
            <button className="bg-[#8B2332] text-white px-10 py-5 uppercase tracking-widest text-sm font-medium hover:bg-[#6A1A25] transition-colors flex items-center gap-3">
              Start your journey <ArrowRight size={18} />
            </button>
            <button className="px-10 py-5 uppercase tracking-widest text-sm font-medium border-b border-transparent hover:border-[#2C2C2B] transition-all">
              View past boxes
            </button>
          </div>

          <div className="flex gap-12 border-t border-[#E5E1D8] pt-10">
            <div className="flex flex-col gap-2">
              <Leaf className="text-[#8B2332]" size={24} />
              <h3 className="font-semibold text-sm uppercase tracking-widest">Organic</h3>
              <p className="text-xs text-[#6A6A6A]">Farmed without chemicals</p>
            </div>
            <div className="flex flex-col gap-2">
              <Droplets className="text-[#8B2332]" size={24} />
              <h3 className="font-semibold text-sm uppercase tracking-widest">Unfined</h3>
              <p className="text-xs text-[#6A6A6A]">Bottled with its soul</p>
            </div>
            <div className="flex flex-col gap-2">
              <Wine className="text-[#8B2332]" size={24} />
              <h3 className="font-semibold text-sm uppercase tracking-widest">Curated</h3>
              <p className="text-xs text-[#6A6A6A]">Sommelier selected</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[45%] h-full relative">
          <div className="absolute inset-0 bg-[#3a201b]">
            <img 
              src={asset0} 
              alt="Natural wine pouring" 
              className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#F4F2EE] to-transparent to-[28%]" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1A0F0C]/45 to-transparent to-[40%]" />
          {/* Badge overlay */}
          <div className="absolute bottom-12 left-[-60px] bg-[#F4F2EE]/95 backdrop-blur-sm p-8 pt-10 max-w-[300px] border border-[#E5E1D8] shadow-2xl">
            <span aria-hidden="true" className="absolute -top-6 left-7 font-['Playfair_Display'] text-7xl leading-none text-[#8B2332]">&ldquo;</span>
            <p className="font-['Playfair_Display'] italic text-[22px] leading-snug mb-3 text-[#1A1A1A]">The best curation of natural wine available online.</p>
            <p className="uppercase text-[10px] tracking-widest font-bold text-[#8B2332]">— The Wine Journal</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Lp23 as "lp-23" };
