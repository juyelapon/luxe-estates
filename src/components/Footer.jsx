import { useState } from "react";
import { Building2, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

const QUICK_LINKS = [
  { label: "Buy", href: "#properties" },
  { label: "Rent", href: "#properties" },
  { label: "Why LuxeEstates", href: "#why-choose-us" },
  { label: "Private Advisory", href: "#why-choose-us" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#hero"
              className="inline-flex items-center gap-2.5 text-white"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Luxe<span className="text-emerald-400">Estates</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              Redefining luxury real estate through architectural curation,
              discreet advisory, and effortless global transactions.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors duration-200"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Offices
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>Beverly Hills, CA</li>
              <li>Tribeca, New York</li>
              <li>Miami Beach, FL</li>
              <li>Aspen, CO</li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Private Market Dispatch
            </h4>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Receive weekly off-market listings and architectural insights
              straight to your inbox.
            </p>

            {subscribed ? (
              <div className="mt-4 flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  You&apos;re subscribed to the LuxeEstates Private Dispatch.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-4 flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors cursor-pointer shrink-0"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} LuxeEstates Realty Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#footer" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#footer" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
