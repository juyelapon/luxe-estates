import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Menu, X, PhoneCall } from "lucide-react";

const NAV_LINKS = [
  { label: "Buy", href: "#properties", filterType: "Buy" },
  { label: "Rent", href: "#properties", filterType: "Rent" },
  { label: "Agents", href: "#why-choose-us" },
  { label: "About", href: "#footer" },
];

export default function Navbar({ onSelectListingType, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileOpen(false);
    if (link.filterType && onSelectListingType) {
      onSelectListingType(link.filterType);
    }
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/70 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              scrolled
                ? "bg-slate-800 text-emerald-400"
                : "bg-white/15 backdrop-blur-md text-emerald-400 border border-white/25"
            }`}
          >
            <Building2 className="w-5 h-5" />
          </div>
          <span
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-slate-800" : "text-white"
            }`}
          >
            Luxe<span className="text-emerald-500">Estates</span>
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-emerald-500 ${
                scrolled ? "text-slate-600" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenContact()}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
              scrolled
                ? "bg-slate-800 text-white hover:bg-emerald-600"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            Contact Agent
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label="Toggle Menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled
              ? "text-slate-800 hover:bg-slate-100"
              : "text-white hover:bg-white/15"
          }`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-lg overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-base font-medium text-slate-700 hover:text-emerald-600 py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenContact();
                }}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                Contact Agent
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
