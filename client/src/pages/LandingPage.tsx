import { Link } from "react-router";
import {
  CheckCircle2,
  ArrowRight,
  Layout,
  Zap,
  BarChart3,
  Check,
  Play,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-text-primary overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="bg-surface pt-20 pb-16 lg:pt-32 lg:pb-28 relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Column: Text & CTA */}
            <div className="flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-wide mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                New v2.0 is live
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-[1.15]">
                Master Your Priorities, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                  Achieve Goals Faster.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A modern task management platform designed to help you organize
                focus, boost productivity, and get things done without the
                stress.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:bg-secondary hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Get Started for Free
                  <ArrowRight size={20} />
                </Link>

                {/* View Demo Button */}
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-text-secondary border border-border rounded-xl font-medium hover:bg-gray-50 hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center gap-2 group shadow-sm">
                  <Play
                    size={20}
                    className="fill-current text-gray-400 group-hover:text-primary transition-colors"
                  />
                  View Demo
                </button>
              </div>
            </div>

            {/* Right Column: Visual Image */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10">
              <div className="relative rounded-2xl bg-white border border-white/40 shadow-2xl overflow-hidden backdrop-blur-sm">
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden group">
                  <img
                    src="/assets/landing/hero.png"
                    alt="Productivity Dashboard Illustration"
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-bounce-slow hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Task Completed
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      Project Launch
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">
              Key Features
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary">
              Everything you need to be productive
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Layout size={28} />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">
                Intuitive Interface
              </h4>
              <p className="text-text-secondary leading-relaxed">
                Clean and easy-to-use design helps you focus on your tasks, not
                on how to use the app.
              </p>
            </div>

            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Zap size={28} />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">
                Smart Priority System
              </h4>
              <p className="text-text-secondary leading-relaxed">
                Categorize tasks by urgency and impact. Our algorithms help you
                decide what to do first.
              </p>
            </div>

            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-primary">
                <BarChart3 size={28} />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">
                Progress Analytics
              </h4>
              <p className="text-text-secondary leading-relaxed">
                Track your productivity with visual charts. See how much you've
                accomplished every week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">
              Pricing Plans
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary">
              Choose the plan that fits your needs
            </h3>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto text-lg">
              Simple, transparent pricing. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {/* Free Plan */}
            <div className="bg-background rounded-2xl border border-border p-8 flex flex-col hover:border-gray-300 transition-colors">
              <div className="mb-4">
                <h4 className="text-xl font-bold text-text-primary">Free</h4>
                <p className="text-text-secondary text-sm mt-1">
                  For individuals just starting out.
                </p>
              </div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-text-primary">
                  $0
                </span>
                <span className="text-text-secondary">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Up to 5 projects",
                  "Basic task management",
                  "7-day history",
                  "Community support",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                  >
                    <Check className="w-5 h-5 text-success shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="w-full py-3 px-4 bg-white border border-border text-text-primary font-bold rounded-xl hover:bg-gray-50 transition-colors text-center shadow-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="bg-white rounded-2xl border-2 border-primary shadow-2xl p-8 flex flex-col relative z-10 transform md:-translate-y-4">
              <div className="absolute top-0 right-0 left-0 bg-primary/10 h-1 rounded-t-xl"></div>
              <div className="mb-4">
                <h4 className="text-2xl font-bold text-primary">Pro</h4>
                <p className="text-text-secondary text-sm mt-1">
                  For power users and freelancers.
                </p>
              </div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-text-primary">
                  $12
                </span>
                <span className="text-text-secondary">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Unlimited projects",
                  "Advanced analytics",
                  "Unlimited history",
                  "Priority support",
                  "Custom tags & filters",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-text-primary font-medium"
                  >
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup?plan=pro"
                className="w-full py-4 px-4 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-colors text-center shadow-lg shadow-blue-500/30"
              >
                Try Pro Free
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-background rounded-2xl border border-border p-8 flex flex-col hover:border-gray-300 transition-colors">
              <div className="mb-4">
                <h4 className="text-xl font-bold text-text-primary">Premium</h4>
                <p className="text-text-secondary text-sm mt-1">
                  For teams and organizations.
                </p>
              </div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-text-primary">
                  $29
                </span>
                <span className="text-text-secondary">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Everything in Pro",
                  "Team collaboration",
                  "Admin controls",
                  "API Access",
                  "Dedicated account manager",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                  >
                    <Check className="w-5 h-5 text-success shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="w-full py-3 px-4 bg-white border border-border text-text-primary font-bold rounded-xl hover:bg-gray-50 transition-colors text-center shadow-sm"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION --- */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-text-primary mb-6 leading-tight">
                Designed for the way you work
              </h3>
              <p className="text-text-secondary mb-8 text-lg">
                Prioritix adapts to your workflow, not the other way around.
                Customize your experience and focus on what matters.
              </p>
              <ul className="space-y-6">
                {[
                  "Structured task organization with folders and tags.",
                  "High-level data security with end-to-end encryption.",
                  "Access anywhere, real-time sync across devices.",
                  "Comfortable dark mode for working at night.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-success" size={14} />
                    </div>
                    <span className="text-text-secondary text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  to="/features"
                  className="text-primary font-bold hover:text-secondary inline-flex items-center gap-1 group"
                >
                  Learn more about features
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              {/* Illustration Placeholder */}
              <div className="w-full aspect-square bg-gradient-to-bl from-blue-50 to-indigo-50 rounded-3xl border border-white shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/800x800/f1f5f9/cbd5e1?text=Mobile+App+Sync')] bg-cover bg-center opacity-40 mix-blend-multiply"></div>
                <div className="relative bg-white/80 backdrop-blur px-8 py-4 rounded-2xl shadow-sm border border-white/50">
                  <p className="font-bold text-primary text-xl">
                    Cross-Platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Join thousands of other productive users. Sign up now and feel the
            difference immediately.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl hover:bg-secondary hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              Create Free Account
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-background text-text-secondary border border-border rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
