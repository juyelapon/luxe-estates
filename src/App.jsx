import { useState, useMemo } from "react";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  CheckCircle2,
  Calendar,
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PropertyGrid from "./components/PropertyGrid";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/Footer";
import { PROPERTIES } from "./data/properties";

export default function App() {
  const [listingFilter, setListingFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState({
    location: "",
    propertyType: "All Types",
  });
  const [savedIds, setSavedIds] = useState([1]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((item) => {
      if (listingFilter !== "All" && item.listingType !== listingFilter) {
        return false;
      }
      if (
        searchQuery.propertyType !== "All Types" &&
        item.propertyType !== searchQuery.propertyType
      ) {
        return false;
      }
      if (searchQuery.location) {
        const q = searchQuery.location.toLowerCase();
        const matchesLocation = item.location.toLowerCase().includes(q);
        const matchesTitle = item.title.toLowerCase().includes(q);
        if (!matchesLocation && !matchesTitle) return false;
      }
      return true;
    });
  }, [listingFilter, searchQuery]);

  const handleToggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setListingFilter("All");
    setSearchQuery({ location: "", propertyType: "All Types" });
  };

  const handleOpenContact = (propertyTitle = "") => {
    setContactSubject(propertyTitle);
    setContactSubmitted(false);
    setContactForm({
      name: "",
      email: "",
      phone: "",
      message: propertyTitle
        ? `I would like to schedule a private viewing for ${propertyTitle}.`
        : "",
    });
    setContactOpen(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
        <Navbar
          onSelectListingType={setListingFilter}
          onOpenContact={() => handleOpenContact()}
        />

        <main className="flex-1">
          <Hero onSearch={setSearchQuery} />

          <PropertyGrid
            properties={filteredProperties}
            listingFilter={listingFilter}
            onListingFilterChange={setListingFilter}
            searchQuery={searchQuery}
            onResetFilters={handleResetFilters}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectProperty={setSelectedProperty}
          />

          <WhyChooseUs onOpenContact={() => handleOpenContact()} />
        </main>

        <Footer />

        {/* Property Detail Modal */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProperty(null)}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
              >
                <div className="relative h-64 sm:h-80">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Close modal"
                    onClick={() => setSelectedProperty(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-sm">
                      For {selectedProperty.listingType} &middot;{" "}
                      {selectedProperty.propertyType}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {selectedProperty.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        {selectedProperty.location}
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600">
                      {selectedProperty.price}
                    </p>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {selectedProperty.description}
                  </p>

                  <div className="mt-6 py-4 border-y border-slate-100 flex items-center gap-8 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold">
                        {selectedProperty.beds}
                      </span>{" "}
                      Beds
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold">
                        {selectedProperty.baths}
                      </span>{" "}
                      Baths
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold">
                        {selectedProperty.sqft}
                      </span>{" "}
                      Sqft
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const title = selectedProperty.title;
                        setSelectedProperty(null);
                        handleOpenContact(title);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule Private Viewing
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProperty(null)}
                      className="px-6 py-3.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Agent Modal */}
        <AnimatePresence>
          {contactOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative"
              >
                <button
                  type="button"
                  aria-label="Close contact dialog"
                  onClick={() => setContactOpen(false)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {contactSubmitted ? (
                  <div className="py-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-slate-800">
                      Inquiry Received
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                      Thank you, {contactForm.name}. A senior LuxeEstates
                      advisor will reach out to you within 2 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setContactOpen(false)}
                      className="mt-6 px-8 py-3 rounded-full bg-slate-800 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                      Private Concierge
                    </span>
                    <h3 className="mt-1.5 text-2xl font-bold text-slate-800">
                      {contactSubject
                        ? `Inquire About ${contactSubject}`
                        : "Connect With an Advisor"}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500">
                      Share your preferences and our senior team will arrange a
                      tailored consultation.
                    </p>

                    <form
                      onSubmit={handleContactSubmit}
                      className="mt-6 space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Elena Vance"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                email: e.target.value,
                              })
                            }
                            placeholder="elena@domain.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={contactForm.phone}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+1 (310) 555-0192"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                          Message
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              message: e.target.value,
                            })
                          }
                          placeholder="Tell us about your ideal residence or preferred viewing times..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        Send Private Inquiry
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
