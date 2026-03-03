"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  SpeedIcon,
  ValueIcon,
  ControlIcon,
  ExcellenceIcon,
  ProfessionalIcon,
  WorldIcon,
  ShieldIcon,
  DreamIcon,
  AIIcon,
  RefineIcon,
  ChevronDownIcon,
  MailIcon,
  PhoneIcon,
  ArrowDownIcon,
  StarIcon,
  PlaneIcon,
  MapPinIcon,
  PlayIcon,
} from "@/components/Icons";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const benefits = [
  {
    icon: SpeedIcon,
    title: "Speed",
    desc: "Research, tailor and book bespoke trips of a lifetime up to 20x faster than any other way.",
  },
  {
    icon: ValueIcon,
    title: "Value",
    desc: "Prices 10-15% below traditional operators because our advanced technology minimises administration costs.",
  },
  {
    icon: ControlIcon,
    title: "Control",
    desc: "Complete control with no unwelcome upselling and fully transparent pricing. Adjust every detail to match your vision.",
  },
  {
    icon: ExcellenceIcon,
    title: "Excellence",
    desc: "All itineraries are exclusive to AX and designed to be more awesome from the very start.",
  },
  {
    icon: ProfessionalIcon,
    title: "Built for Professionals",
    desc: "High quality, time efficient and flexible itineraries blending culture, learning, excitement and relaxation.",
  },
  {
    icon: WorldIcon,
    title: "Worldwide Access",
    desc: "Multi-currency, multi-language platform accessible from anywhere in the world.",
  },
  {
    icon: ShieldIcon,
    title: "Peace of Mind",
    desc: "ATOL protection, externally approved health and safety, 24/7 overseas support, ethical and environmental standards.",
  },
];

const steps = [
  {
    num: "01",
    icon: DreamIcon,
    title: "Tell Us Your Dream",
    desc: "Describe your ideal trip. The destinations, the pace, the experiences you crave. Our platform listens.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    num: "02",
    icon: AIIcon,
    title: "AI Builds Your Itinerary",
    desc: "Our AI Trip Builder creates a fully personalised plan, drawing from exclusive partnerships and local expertise.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
  },
  {
    num: "03",
    icon: RefineIcon,
    title: "Refine and Book",
    desc: "Adjust accommodation, activities and duration with full transparency then book with absolute confidence.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  },
];

const faqs = [
  {
    q: "What does AX do that AI alone cannot?",
    a: "AX uses both Large Language Models and Machine Learning to create personalised travel experiences. But crafting true trips of a lifetime also requires expert knowledge and in-resort connections to access unique, in-demand experiences, and the human support we provide whilst you're overseas.",
  },
  {
    q: "What's special about your team?",
    a: "AX is led by true travel industry experts, supported by an Advisory Panel of six. Our founders bring deep expertise in online travel, and the investment in our first-generation platform provides the foundation to deliver our Gen 2 vision faster than anyone starting from scratch.",
  },
  {
    q: "Can I call AX if I need advice?",
    a: "Absolutely. We provide full telephone support and a concierge service for any specific needs. But because you can do so much yourself through our platform, your need for phone support is hugely reduced compared to traditional operators.",
  },
  {
    q: "When is the re-launch?",
    a: "We've built a fully online bookable showcase of AX Gen 2 featuring our new AI Trip Builder. We're raising a further £200k under EIS to complete everything for the Summer 2026 season.",
  },
  {
    q: "Where can I learn more?",
    a: "We'd love to hear from you. Email invest@awesomeexperiences.com or call 07932 619108 to learn more about AX and our investment opportunity.",
  },
];

const trustItems = [
  { icon: ShieldIcon, label: "ATOL Protected" },
  { icon: PhoneIcon, label: "24/7 Overseas Support" },
  { icon: StarIcon, label: "Health & Safety Approved" },
  { icon: WorldIcon, label: "Ethical & Environmental" },
];

const destinations = [
  {
    image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&q=80",
    name: "Santorini",
    tag: "Culture & Romance",
  },
  {
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80",
    name: "Amalfi Coast",
    tag: "Adventure & Relaxation",
  },
  {
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80",
    name: "Maldives",
    tag: "Luxury & Serenity",
  },
  {
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80",
    name: "Swiss Alps",
    tag: "Excitement & Wonder",
  },
];

const videoSections = [
  { title: "Platform Overview", id: "platform" },
  { title: "Products Overview", id: "products" },
  { title: "Itineraries", id: "itineraries" },
  { title: "Hotel Selection", id: "hotels" },
  { title: "Booking & Payment", id: "booking" },
  { title: "Promotional Videos", id: "promo" },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Business Executive",
    location: "London",
    rating: 5,
    text: "The AI Trip Builder saved me hours of research. Within 20 minutes I had a fully personalised Italian itinerary that was absolutely perfect. The price was 12% lower than quotes from traditional agents!",
    image: "https://i.pravatar.cc/150?img=47"
  },
  {
    name: "James Patterson",
    role: "Consultant",
    location: "Manchester",
    rating: 5,
    text: "As a busy professional, I don't have time to plan complex trips. AX made it effortless - the quality of hotels and experiences exceeded my expectations. Will definitely use again!",
    image: "https://i.pravatar.cc/150?img=12"
  },
  {
    name: "Emma Rodriguez",
    role: "Tech Founder",
    location: "Edinburgh",
    rating: 5,
    text: "The perfect blend of AI efficiency and human expertise. My Maldives trip was flawlessly executed with 24/7 support. Worth every penny and more!",
    image: "https://i.pravatar.cc/150?img=45"
  }
];

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <DestinationsSection />
      <BenefitsSection />
      <HowItWorksSection />
      <ParallaxBreak />
      <TrustSection />
      <TestimonialsSection />
      <FAQSection />
      <VideoSection />
      <InvestorSection />
      <Footer />
    </main>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#" },
    { label: "Trip Builder", href: "/trip-builder", special: "primary" },
    { label: "Destinations", href: "#destinations" },
    { label: "Benefits", href: "#benefits" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Videos", href: "#videos" },
    { label: "Invest", href: "#investor", special: "secondary" },
  ];

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${scrolled ? 'bg-sunset-500/20' : 'bg-white/20 backdrop-blur-sm'} flex items-center justify-center`}>
              <PlaneIcon className={`w-5 h-5 ${scrolled ? 'text-sunset-400' : 'text-white'}`} />
            </div>
            <span
              className={`font-[family-name:var(--font-heading)] text-lg font-bold transition-colors duration-300 ${
                scrolled ? "text-text-primary" : "text-white"
              }`}
            >
              Awesome Experiences
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const isPrimary = link.special === "primary";
              const isSecondary = link.special === "secondary";

              if (isPrimary) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-bold tracking-wide transition-all duration-300 px-6 py-2.5 rounded-full ${
                      scrolled
                        ? "bg-sunset-500 text-white hover:bg-sunset-600 hover:scale-105 shadow-md hover:shadow-lg"
                        : "bg-white text-sunset-500 hover:bg-white/90 hover:scale-105 shadow-lg"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              }

              if (isSecondary) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => handleClick(link.href)}
                    className={`text-sm font-medium tracking-wide transition-all duration-300 px-5 py-2 rounded-full ${
                      scrolled
                        ? "bg-sunset-500/10 text-sunset-600 hover:bg-sunset-500/20"
                        : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-sunset-400 ${
                    scrolled ? "text-text-secondary" : "text-white/80"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                mobileOpen
                  ? (scrolled ? "bg-text-primary rotate-45 translate-y-2" : "bg-white rotate-45 translate-y-2")
                  : (scrolled ? "bg-text-primary" : "bg-white")
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                mobileOpen
                  ? "opacity-0"
                  : (scrolled ? "bg-text-primary" : "bg-white")
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                mobileOpen
                  ? (scrolled ? "bg-text-primary -rotate-45 -translate-y-2" : "bg-white -rotate-45 -translate-y-2")
                  : (scrolled ? "bg-text-primary" : "bg-white")
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => {
                const isPrimary = link.special === "primary";

                if (isPrimary) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-white bg-sunset-500 font-[family-name:var(--font-heading)] text-2xl font-bold py-5 px-6 rounded-2xl hover:bg-sunset-600 transition-all mb-4 text-center shadow-lg"
                    >
                      {link.label} →
                    </a>
                  );
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => handleClick(link.href)}
                    className="text-text-primary font-[family-name:var(--font-heading)] text-2xl font-semibold py-4 border-b border-border hover:text-sunset-500 transition-colors"
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="mailto:invest@awesomeexperiences.com"
                  className="text-center py-4 bg-sunset-500 text-white font-medium tracking-wide rounded-full"
                >
                  invest@awesomeexperiences.com
                </a>
                <a
                  href="tel:07932619108"
                  className="text-center py-4 border border-sunset-500 text-sunset-500 font-medium tracking-wide rounded-full"
                >
                  07932 619108
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Beautiful Unsplash travel image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85')`,
        }}
      />
      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-sunset-500/10 via-transparent to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/70 tracking-[0.4em] uppercase text-sm font-medium mb-6"
        >
          Awesome Experiences
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6 text-white"
        >
          Your World,
          <br />
          <span className="italic font-normal text-sunset-300">Your Way</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Personalised trips of a lifetime, crafted by AI and refined by experts. 
          The freedom to travel exactly how you want.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/trip-builder"
            className="px-12 py-5 bg-white text-text-primary font-bold text-lg rounded-full hover:shadow-[0_10px_40px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            Start Planning Now →
          </Link>
          <a
            href="#how-it-works"
            className="px-12 py-5 border-2 border-white/50 text-white font-bold text-lg rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white"
          >
            How It Works
          </a>
        </motion.div>

        {/* Trust Badges in Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-16"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <ShieldIcon className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">ATOL Protected</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <PhoneIcon className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <StarIcon className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">5★ Rated</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <ArrowDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
        >
          The fastest and easiest way to book{" "}
          <span className="italic font-normal text-sunset-500">personalised trips of a lifetime</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          Powered by AI, guided by experts, and designed for busy professionals 
          who refuse to settle for ordinary. Your next adventure starts here.
        </motion.p>
      </motion.div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section id="destinations" className="py-20 md:py-28 px-6 bg-warm-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-sunset-500 tracking-[0.25em] uppercase text-sm font-medium mb-4">
            Explore
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold">
            Where Will You Go?
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              variants={fadeUp}
              custom={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${dest.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-sm font-medium mb-1">{dest.tag}</p>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">
                  {dest.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mt-16"
        >
          <p className="text-text-secondary text-lg mb-6">
            Ready to explore these destinations and more?
          </p>
          <a
            href="/trip-builder"
            className="inline-block px-12 py-5 bg-sunset-500 text-white font-bold text-lg rounded-full hover:bg-sunset-600 hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Build Your Custom Trip →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="benefits" className="py-28 md:py-36 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <p className="text-sunset-500 tracking-[0.25em] uppercase text-sm font-medium mb-4">
            The AX Advantage
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold">
            Why Choose <span className="italic font-normal text-sunset-500">AX</span>?
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              custom={i}
              className={`group relative p-8 rounded-2xl bg-warm-50 hover:bg-white hover:shadow-xl hover:shadow-sunset-500/5 hover:-translate-y-1 transition-all duration-500 ${
                i === 6 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-sunset-400 to-rose-400 flex items-center justify-center shadow-md">
                  <b.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2">
                    {b.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-[15px]">
                    {b.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 md:py-36 px-6 bg-warm-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <p className="text-sunset-500 tracking-[0.25em] uppercase text-sm font-medium mb-4">
            Simple as 1, 2, 3
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold">
            How It <span className="italic font-normal text-sunset-500">Works</span>
          </h2>
        </motion.div>

        <div className="space-y-20">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}
            >
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${s.image}')` }}
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-sunset-500">
                      {s.num}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-sunset-400 to-rose-400 mb-6 shadow-lg">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4">
                  {s.title}
                </h3>
                <p className="text-text-secondary text-lg leading-relaxed max-w-md">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mt-20"
        >
          <a
            href="/trip-builder"
            className="inline-block px-12 py-5 bg-sunset-500 text-white font-bold text-lg rounded-full hover:bg-sunset-600 hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Try the AI Trip Builder Now →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ParallaxBreak() {
  return (
    <section
      className="parallax-bg relative h-[50vh] md:h-[60vh] flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=85')`,
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="relative z-10 text-center px-6"
      >
        <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          Life is Short.
        </h2>
        <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl italic text-white/80 font-light mb-8">
          Make every trip count.
        </p>
        <a
          href="/trip-builder"
          className="inline-block px-12 py-5 bg-white text-sunset-500 font-bold text-lg rounded-full hover:bg-white/90 hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          Start Planning Your Trip
        </a>
      </motion.div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-20 px-6 bg-white border-y border-border">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="max-w-5xl mx-auto"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-center text-text-muted tracking-[0.25em] uppercase text-sm font-medium mb-12"
        >
          Trusted and Protected
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-warm-50 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-sunset-500" />
              </div>
              <span className="text-text-secondary text-sm font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-28 md:py-36 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <p className="text-sunset-500 tracking-[0.25em] uppercase text-sm font-medium mb-4">
            Client Stories
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold">
            Loved by <span className="italic font-normal text-sunset-500">Professionals</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              variants={fadeUp}
              custom={i}
              className="bg-warm-50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-sunset-500 fill-current" />
                ))}
              </div>
              <p className="text-text-secondary leading-relaxed mb-6 text-[15px]">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-[family-name:var(--font-heading)] font-semibold text-text-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-text-muted">
                    {testimonial.role} · {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 md:py-36 px-6 bg-warm-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-sunset-500 tracking-[0.25em] uppercase text-sm font-medium mb-4">
            Got Questions?
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold">
            We&apos;ve Got <span className="italic font-normal text-sunset-500">Answers</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-[family-name:var(--font-heading)] text-lg font-medium pr-4">
                  {faq.q}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-sunset-500 flex-shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  open === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-text-secondary leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section id="videos" className="py-28 md:py-36 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-sunset-500 tracking-[0.25em] uppercase text-sm font-medium mb-4">
            See It In Action
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold">
            Watch How <span className="italic font-normal text-sunset-500">AX Works</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videoSections.map((video, i) => (
            <motion.div
              key={video.id}
              variants={fadeUp}
              custom={i}
              className="group relative bg-gradient-to-br from-sunset-400/20 to-rose-400/10 aspect-video rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sunset-500/10 to-rose-500/5 group-hover:from-sunset-500/20 group-hover:to-rose-500/10 transition-all duration-500" />
              <div className="relative z-10 text-center px-6">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <PlayIcon className="w-7 h-7 text-sunset-500" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-text-primary text-base font-semibold">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function InvestorSection() {
  return (
    <section id="investor" className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=85')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <motion.div variants={fadeUp} custom={0}>
          <MapPinIcon className="w-8 h-8 text-sunset-300 mx-auto mb-6" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-sunset-300 tracking-[0.25em] uppercase text-sm font-medium mb-4"
        >
          Investment Opportunity
        </motion.p>

        <motion.h2
          variants={fadeUp}
          custom={2}
          className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white"
        >
          Join the <span className="italic font-normal text-sunset-300">Journey</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="text-white/80 text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Our Gen 2 platform with AI Trip Builder is built and proven. We&apos;re
          raising a final £200k under the Enterprise Investment Scheme to launch
          for Summer 2026 and we&apos;d love to have you on board.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="mailto:invest@awesomeexperiences.com"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-text-primary font-semibold rounded-full hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <MailIcon className="w-5 h-5" />
            invest@awesomeexperiences.com
          </a>
          <a
            href="tel:07932619108"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            <PhoneIcon className="w-5 h-5" />
            07932 619108
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-deep-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sunset-500/20 flex items-center justify-center">
            <PlaneIcon className="w-4 h-4 text-sunset-400" />
          </div>
          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold">
            Awesome Experiences
          </span>
        </div>

        <div className="flex items-center gap-8 text-sm text-white/60">
          <a
            href="mailto:invest@awesomeexperiences.com"
            className="hover:text-sunset-400 transition-colors"
          >
            Contact
          </a>
          <a href="#faq" className="hover:text-sunset-400 transition-colors">
            FAQ
          </a>
          <a href="#benefits" className="hover:text-sunset-400 transition-colors">
            About
          </a>
        </div>

        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} Awesome Experiences Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
