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

import { FEATURES, PRICING_PLANS, VALUE_PROPS } from "../constants/landing";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-text-primary overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="bg-surface pt-20 pb-16 lg:pt-32 lg:pb-28 relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left z-10">
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
                  Get Started for Free <ArrowRight size={20} />
                </Link>
                <Link
                  to="/demo"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-text-secondary border border-border rounded-xl font-medium hover:bg-gray-50 hover:text-primary transition-all flex items-center justify-center gap-2 group shadow-sm"
                >
                  <Play
                    size={20}
                    className="fill-current text-gray-400 group-hover:text-primary"
                  />
                  View Demo
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10">
              <div className="relative rounded-2xl bg-white border border-white/40 shadow-2xl overflow-hidden backdrop-blur-sm">
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src="/assets/landing/hero.png"
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden lg:block">
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

      {/* --- FEATURES SECTION (MAPPED) --- */}
      <section className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-primary font-bold uppercase text-sm mb-3">
            Key Features
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text-primary">
            Everything you need to be productive
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="bg-surface p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-primary">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-text-primary mb-3">
                  {feature.title}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION (MAPPED) --- */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-primary font-bold uppercase text-sm mb-3">
            Pricing Plans
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text-primary">
            Choose the plan that fits your needs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16 items-start">
            {PRICING_PLANS.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl flex flex-col transition-all duration-300 ${
                  plan.isHighlighted
                    ? "bg-white border-2 border-primary shadow-2xl relative z-10 md:-translate-y-4"
                    : "bg-background border border-border hover:border-gray-300"
                }`}
              >
                <div className="mb-4 text-left">
                  <h4
                    className={`text-xl font-bold ${plan.isHighlighted ? "text-primary text-2xl" : "text-text-primary"}`}
                  >
                    {plan.name}
                  </h4>
                  <p className="text-text-secondary text-sm mt-1">
                    {plan.description}
                  </p>
                </div>
                <div className="mb-6 flex items-baseline gap-1">
                  <span
                    className={`font-extrabold text-text-primary ${plan.isHighlighted ? "text-5xl" : "text-4xl"}`}
                  >
                    ${plan.price}
                  </span>
                  <span className="text-text-secondary">/month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1 text-left">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <Check
                        className={`w-5 h-5 shrink-0 ${plan.isHighlighted ? "text-primary" : "text-success"}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.link}
                  className={`w-full py-3 px-4 font-bold rounded-xl transition-all text-center ${
                    plan.isHighlighted
                      ? "bg-primary text-white shadow-lg shadow-blue-500/30 hover:bg-secondary"
                      : "bg-white border border-border text-text-primary hover:bg-gray-50"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION (MAPPED) --- */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2 order-2 lg:order-1 text-left">
              <h3 className="text-3xl font-bold text-text-primary mb-6">
                Designed for the way you work
              </h3>
              <p className="text-text-secondary mb-8 text-lg">
                Prioritix adapts to your workflow, not the other way around.
              </p>
              <ul className="space-y-6">
                {VALUE_PROPS.map((prop, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-success" size={14} />
                    </div>
                    <span className="text-text-secondary text-lg">{prop}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  to="/features"
                  className="text-primary font-bold hover:text-secondary inline-flex items-center gap-1 group"
                >
                  Learn more about features{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 w-full">
              <div className="w-full aspect-video bg-gradient-to-bl from-blue-50 to-indigo-50 rounded-3xl border border-white shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/landing/dashboard.png')] bg-cover bg-center opacity-40 mix-blend-multiply"></div>
                <div className="relative bg-white/80 backdrop-blur px-8 py-4 rounded-2xl shadow-sm border border-white/50">
                  <p className="font-bold text-primary text-xl">
                    Access Everywhere
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-surface border-t border-border text-center">
        <div className="max-w-4xl mx-auto px-4">
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
              className="px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl hover:bg-secondary transition-all"
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
