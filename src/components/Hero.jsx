import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Search, Sparkles } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2071&q=85";

const PROPERTY_TYPES = [
  "All Types",
  "Villa",
  "Penthouse",
  "Modern Estate",
  "Waterfront",
];

export default function Hero({ onSearch }) {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location: location.trim(), propertyType });
    const target = document.querySelector("#properties");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Modern luxury villa with infinity pool at twilight"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/65 via-slate-900/45 to-slate-900/75" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl w-full mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-emerald-300 text-xs sm:text-sm font-medium tracking-wide uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Curated Architectural Residences
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
        >
          Find Your Dream Home{" "}
          <span className="font-serif italic font-medium text-emerald-400">
            Today
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200/90 font-normal leading-relaxed mb-10"
        >
          Discover extraordinary villas, waterfront sanctuaries, and skyline
          penthouses across the world&apos;s most coveted neighborhoods.
        </motion.p>

        {/* Floating Glassmorphic Search Bar */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="max-w-4xl mx-auto bg-white/85 backdrop-blur-xl border border-white/60 rounded-2xl sm:rounded-full p-3 sm:p-2.5 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0"
        >
          {/* Location Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 sm:py-2 sm:border-r border-slate-200/80">
            <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="w-full text-left">
              <label
                htmlFor="hero-location"
                className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500"
              >
                Location
              </label>
              <input
                id="hero-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Beverly Hills, Miami, Tribeca..."
                className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Property Type Select */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 sm:py-2">
            <Home className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="w-full text-left">
              <label
                htmlFor="hero-property-type"
                className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500"
              >
                Property Type
              </label>
              <select
                id="hero-property-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type} className="text-slate-800">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full shadow-lg shadow-emerald-500/25 transition-all duration-200 cursor-pointer shrink-0"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </motion.form>

        {/* Subtle Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white/85 text-xs sm:text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            $2.4B+ Portfolio Sold
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            180+ Exclusive Estates
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Private Off-Market Access
          </div>
        </motion.div>
      </div>
    </section>
  );
}
