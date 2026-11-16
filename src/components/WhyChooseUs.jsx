import { motion } from "framer-motion";
import { Compass, Award, FileCheck2, ShieldCheck } from "lucide-react";

const TRUST_FEATURES = [
  {
    icon: Compass,
    title: "Premium Locations",
    metric: "35+ Global Markets",
    description:
      "Exclusive access to trophy estates in Beverly Hills, Tribeca, Malibu, Aspen, and waterfront enclaves.",
  },
  {
    icon: Award,
    title: "Top Rated Agents",
    metric: "99.2% Client Satisfaction",
    description:
      "Dedicated senior advisors with deep market intelligence and discreet, white-glove representation.",
  },
  {
    icon: FileCheck2,
    title: "Fast Paperwork",
    metric: "14-Day Avg. Closing",
    description:
      "Streamlined digital escrow, vetted legal counsel, and concierge coordination from offer to keys.",
  },
  {
    icon: ShieldCheck,
    title: "Private Off-Market",
    metric: "40% Pocket Listings",
    description:
      "Gain early entry to architectural residences and private estates never listed on public portals.",
  },
];

export default function WhyChooseUs({ onOpenContact }) {
  return (
    <section
      id="why-choose-us"
      className="py-20 sm:py-28 bg-white border-y border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
            The LuxeEstates Standard
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Why Discerning Buyers{" "}
            <span className="font-serif italic font-medium text-slate-600">
              Choose Us
            </span>
          </h2>
          <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
            We combine architectural expertise, private market reach, and
            effortless execution to make every acquisition seamless.
          </p>
        </motion.div>

        {/* 4-Column Trust Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group p-7 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  {item.metric}
                </p>
                <h3 className="mt-1.5 text-lg font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Advisory Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 rounded-3xl bg-slate-800 px-6 py-10 sm:px-12 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl"
        >
          <div className="text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Looking for an off-market residence?
            </h3>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
              Connect with a senior LuxeEstates advisor for private viewings and
              bespoke portfolio curation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact()}
            className="px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
          >
            Schedule a Private Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
