// ===== Home Page =====
// Landing page with welcome message, feature highlights, and CTA buttons.

import { Link } from "react-router-dom";
import { MdShield, MdMap, MdNotificationsActive, MdEmergency, MdStar, MdPeople } from "react-icons/md";

const features = [
  {
    icon: <MdMap className="text-3xl" />,
    title: "Live Safety Map",
    desc: "Real-time map showing safe zones, police stations, hospitals, and risk areas.",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: <MdNotificationsActive className="text-3xl" />,
    title: "Instant Alerts",
    desc: "Get notified about nearby dangers, road closures, and safety warnings.",
    color: "text-amber-600 bg-amber-100",
  },
  {
    icon: <MdEmergency className="text-3xl" />,
    title: "SOS Emergency",
    desc: "One-tap emergency button sends your location to authorities instantly.",
    color: "text-red-600 bg-red-100",
  },
  {
    icon: <MdStar className="text-3xl" />,
    title: "Safety Score",
    desc: "Know how safe your current area is with our AI-powered safety rating.",
    color: "text-green-600 bg-green-100",
  },
];

const stats = [
  { value: "10K+", label: "Tourists Protected" },
  { value: "50+", label: "Cities Covered" },
  { value: "99.9%", label: "Uptime" },
  { value: "< 30s", label: "SOS Response" },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MdShield className="text-4xl text-cyan-300" />
              <span className="text-cyan-300 font-medium tracking-wide uppercase text-sm">Tourist Safety Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Travel Safely,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                Explore Fearlessly
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed">
              Real-time safety maps, instant alerts, and emergency SOS — everything you
              need to stay safe while exploring new cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-lg hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-200"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H0V50Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ===== Stats Section ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-blue-700">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Everything You Need to Stay Safe
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Powerful tools designed to keep tourists safe and authorities informed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <MdPeople className="text-5xl mx-auto mb-4 text-blue-200" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Thousands of Safe Travelers</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Sign up today and explore new cities with confidence. Your safety is our priority.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-lg hover:bg-blue-50 shadow-lg transition-all duration-200"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-slate-900 text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MdShield className="text-2xl text-blue-400" />
            <span className="text-white font-semibold text-lg">SafeTourist</span>
          </div>
          <p className="text-sm">© 2026 Tourist Safety App. Built for safer travel experiences.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
