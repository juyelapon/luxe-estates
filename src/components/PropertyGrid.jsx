import { motion } from "framer-motion";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Heart,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";

const LISTING_TABS = ["All", "Buy", "Rent"];

export default function PropertyGrid({
  properties,
  listingFilter,
  onListingFilterChange,
  searchQuery,
  onResetFilters,
  savedIds,
  onToggleSave,
  onSelectProperty,
}) {
  const hasActiveSearch =
    Boolean(searchQuery.location) ||
    (searchQuery.propertyType && searchQuery.propertyType !== "All Types") ||
    listingFilter !== "All";

  return (
    <section
      id="properties"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
            Featured Portfolio
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Curated Luxury{" "}
            <span className="font-serif italic font-medium text-slate-600">
              Residences
            </span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl text-sm sm:text-base">
            Hand-selected architectural homes offering uncompromising privacy,
            timeless craftsmanship, and premier locations.
          </p>
        </div>

        {/* Listing Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 rounded-full bg-white border border-slate-200 shadow-sm">
            {LISTING_TABS.map((tab) => {
              const active = listingFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => onListingFilterChange(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab === "All" ? "All Properties" : `For ${tab}`}
                </button>
              );
            })}
          </div>

          {hasActiveSearch && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </motion.div>

      {/* Grid or Empty State */}
      {properties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm"
        >
          <p className="text-lg font-semibold text-slate-800">
            No residences match your current search criteria.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Try adjusting your location or property type filter to explore our
            full portfolio.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            View All Properties
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => {
            const isSaved = savedIds.includes(property.id);
            return (
              <motion.article
                key={property.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => onSelectProperty(property)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Container with Zoom-on-Hover */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={property.image}
                    alt={property.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
                      For {property.listingType} &middot; {property.propertyType}
                    </span>

                    <button
                      type="button"
                      aria-label={
                        isSaved ? "Remove from saved" : "Save property"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(property.id);
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                        isSaved
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-white/85 text-slate-700 hover:bg-white hover:text-emerald-600"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                      {property.price}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                        {property.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  {/* Specs Flex Row: Beds, Baths, Sqft */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">
                        {property.beds}
                      </span>
                      <span className="text-slate-400">Beds</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">
                        {property.baths}
                      </span>
                      <span className="text-slate-400">Baths</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">
                        {property.sqft}
                      </span>
                      <span className="text-slate-400">Sqft</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}
