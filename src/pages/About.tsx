import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function About() {
  const values = [
    {
      Icon: Target,
      title: 'Our Mission',
      desc: 'To make premium shopping accessible to everyone by offering high-quality products at honest prices, backed by exceptional service.',
    },
    {
      Icon: Eye,
      title: 'Our Vision',
      desc: 'To become India\u2019s most loved e-commerce platform, known for trust, quality, and a shopping experience that feels effortless.',
    },
    {
      Icon: Heart,
      title: 'Our Values',
      desc: 'Customer-first thinking, transparency in everything we do, and a relentless pursuit of quality in every product we deliver.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '24+', label: 'Premium Products' },
    { value: '6', label: 'Categories' },
    { value: '4.8\u2605', label: 'Average Rating' },
  ];

  const features = [
    { Icon: Truck, title: 'Fast Delivery', desc: '2-5 day shipping across India' },
    { Icon: ShieldCheck, title: 'Secure Shopping', desc: '100% protected payments' },
    { Icon: RotateCcw, title: 'Easy Returns', desc: '7-day hassle-free returns' },
    { Icon: Headphones, title: '24/7 Support', desc: 'Always here to help you' },
  ];

  return (
    <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-primary-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl" />
        </div>
        <div className="section-container relative py-16 lg:py-24 text-center">
          <ScrollReveal>
            <span className="badge bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 mb-5">
              <Sparkles className="w-3 h-3" /> About Cartiva
            </span>
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-neutral-900 dark:text-white mb-5 text-balance">
              Redefining the Way India Shops
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Cartiva is a modern e-commerce platform built with a simple belief: shopping should be
              smart, seamless, and satisfying. We curate the best products, deliver them fast, and
              stand behind every purchase.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-neutral-900">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 80}>
                <div className="text-center">
                  <p className="font-display font-extrabold text-3xl lg:text-4xl text-primary-700 dark:text-primary-400">
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-4">
                Our Story
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-5">
                From a Simple Idea to a Shopping Revolution
              </h2>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <p>
                  Cartiva was born from a simple frustration: online shopping in India deserved
                  better. Better product curation, better prices, better design, and above all,
                  better trust.
                </p>
                <p>
                  Founded by a team passionate about technology and retail, we set out to build a
                  platform that feels premium without being expensive. Every product on Cartiva is
                  hand-selected, every category thoughtfully curated, and every interaction
                  designed to make you smile.
                </p>
                <p>
                  Today, Cartiva serves thousands of happy customers across India, and we\u2019re
                  just getting started.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
                <img
                  src="https://images.pexels.com/photos/6567651/pexels-photo-6567651.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Shopping experience"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-16 lg:py-20 bg-white dark:bg-neutral-900">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-3">
                What drives us
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white">
                Our Purpose
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 100}>
                <div className="card p-8 h-full group hover:shadow-card-hover transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <value.Icon className="w-8 h-8 text-primary-700 dark:text-primary-400" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-neutral-800 dark:text-neutral-100 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cartiva */}
      <section className="py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-3">
                Why choose us
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-3">
                Why Customers Love Cartiva
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
                We go beyond selling products \u2014 we deliver an experience you\u2019ll want to
                come back to.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 80}>
                <div className="card p-6 text-center group hover:shadow-card-hover transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.Icon className="w-7 h-7 text-primary-700 dark:text-primary-400" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-neutral-800 dark:text-neutral-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer-first approach */}
      <section className="py-16 lg:py-20 bg-white dark:bg-neutral-900">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover order-2 lg:order-1">
                <img
                  src="https://images.pexels.com/photos/5585841/pexels-photo-5585841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Customer first approach"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="order-1 lg:order-2">
                <span className="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-4">
                  <Users className="w-3 h-3" /> Customer-First Approach
                </span>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-5">
                  Every Decision Starts with You
                </h2>
                <div className="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  <p>
                    At Cartiva, we don\u2019t just sell products \u2014 we build relationships. Every
                    feature on our platform, every policy we write, and every product we curate is
                    designed with one question in mind: <em>does this make shopping better for our
                    customers?</em>
                  </p>
                  <p>
                    From our intuitive interface to our 7-day return policy, from free shipping on
                    orders above \u20b9999 to our responsive support team \u2014 everything is built
                    to earn and keep your trust.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Trusted Quality</span>
                  </div>
                  <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-700" />
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">10K+ Customers</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="section-container">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-800 to-primary-600 dark:from-primary-900 dark:to-primary-700 p-8 lg:p-14 text-center text-white">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="font-display font-extrabold text-3xl lg:text-4xl mb-3">
                  Ready to Start Shopping?
                </h2>
                <p className="text-lg text-primary-100 mb-7 max-w-md mx-auto">
                  Explore our premium collection and discover products you\u2019ll love.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 active:scale-[0.98] transition-all duration-200 shadow-soft"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
