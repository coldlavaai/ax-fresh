"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  PlaneIcon,
  MapPinIcon,
  StarIcon,
  AIIcon,
  RefineIcon,
  SpeedIcon,
} from "@/components/Icons";

type Step = "preferences" | "generating" | "itinerary" | "refining";

interface Preferences {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  interests: string[];
  pace: "relaxed" | "moderate" | "packed";
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

interface Day {
  dayNumber: number;
  date: string;
  activities: Activity[];
}

const destinations = [
  { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&q=80" },
  { name: "Amalfi Coast, Italy", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80" },
  { name: "Maldives", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80" },
  { name: "Swiss Alps", image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80" },
  { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" },
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
];

const interests = [
  "🏛️ Culture & History",
  "🏔️ Adventure & Hiking",
  "🏖️ Beach & Relaxation",
  "🍽️ Culinary Experiences",
  "🎨 Art & Museums",
  "🛍️ Shopping",
  "🌃 Nightlife",
  "🧘 Wellness & Spa",
];

export default function TripBuilderPage() {
  const [step, setStep] = useState<Step>("preferences");
  const [preferences, setPreferences] = useState<Preferences>({
    destination: "",
    startDate: "",
    endDate: "",
    budget: 3000,
    travelers: 2,
    interests: [],
    pace: "moderate",
  });
  const [itinerary, setItinerary] = useState<Day[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const startGeneration = () => {
    setStep("generating");

    // Simulate AI generation
    setTimeout(() => {
      const generatedItinerary = generateItinerary(preferences);
      setItinerary(generatedItinerary);
      calculateTotalPrice(generatedItinerary);
      setStep("itinerary");
    }, 4000);
  };

  const generateItinerary = (prefs: Preferences): Day[] => {
    const days = Math.ceil(
      (new Date(prefs.endDate).getTime() - new Date(prefs.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 5;

    return Array.from({ length: days }, (_, i) => ({
      dayNumber: i + 1,
      date: new Date(
        new Date(prefs.startDate).getTime() + i * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      activities: generateDayActivities(i + 1, prefs),
    }));
  };

  const generateDayActivities = (dayNum: number, prefs: Preferences): Activity[] => {
    const activityPool = {
      "Santorini, Greece": [
        { title: "Oia Sunset Tour", description: "Watch the world-famous sunset from the white cliffs", duration: "3h", price: 45 },
        { title: "Wine Tasting Experience", description: "Sample local Assyrtiko wines at a vineyard", duration: "2h", price: 65 },
        { title: "Catamaran Cruise", description: "Sail around the caldera with lunch included", duration: "5h", price: 120 },
        { title: "Ancient Akrotiri Tour", description: "Explore the preserved Minoan Bronze Age settlement", duration: "2h", price: 35 },
      ],
      "Amalfi Coast, Italy": [
        { title: "Positano Walking Tour", description: "Stroll through colorful clifftop streets", duration: "3h", price: 40 },
        { title: "Cooking Class", description: "Learn authentic Italian cuisine from a local chef", duration: "4h", price: 95 },
        { title: "Boat Tour to Capri", description: "Visit the Blue Grotto and stunning coastline", duration: "6h", price: 150 },
        { title: "Limoncello Tasting", description: "Sample local lemon liqueur at a family farm", duration: "1.5h", price: 25 },
      ],
    };

    const activities = activityPool[prefs.destination as keyof typeof activityPool] || activityPool["Santorini, Greece"];
    const selectedActivities = activities.slice(0, prefs.pace === "relaxed" ? 2 : prefs.pace === "moderate" ? 3 : 4);

    return selectedActivities.map((act, i) => ({
      id: `${dayNum}-${i}`,
      time: i === 0 ? "9:00 AM" : i === 1 ? "2:00 PM" : i === 2 ? "6:00 PM" : "8:00 PM",
      title: act.title,
      description: act.description,
      duration: act.duration,
      price: act.price,
      image: destinations.find(d => d.name === prefs.destination)?.image || destinations[0].image,
    }));
  };

  const calculateTotalPrice = (days: Day[]) => {
    const activitiesTotal = days.reduce(
      (sum, day) => sum + day.activities.reduce((daySum, act) => daySum + act.price, 0),
      0
    );
    const accommodation = days.length * 120; // $120/night average
    const flights = 450 * preferences.travelers;
    setTotalPrice(activitiesTotal + accommodation + flights);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sunset-500/20 flex items-center justify-center">
              <PlaneIcon className="w-5 h-5 text-sunset-400" />
            </div>
            <span className="font-[family-name:var(--font-heading)] text-lg font-bold">
              Awesome Experiences
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-text-secondary hover:text-sunset-500 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-sunset-50 via-white to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sunset-500/10 rounded-full mb-6"
          >
            <AIIcon className="w-5 h-5 text-sunset-500" />
            <span className="text-sunset-600 text-sm font-medium">AI-Powered Trip Builder</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Build Your Perfect Trip in{" "}
            <span className="italic font-normal text-sunset-500">Minutes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          >
            Tell us your dream, watch our AI build your personalized itinerary, then refine every detail to perfection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <SpeedIcon className="w-5 h-5 text-sunset-500" />
              <span className="text-text-secondary">20x Faster</span>
            </div>
            <div className="flex items-center gap-2">
              <RefineIcon className="w-5 h-5 text-sunset-500" />
              <span className="text-text-secondary">Fully Customizable</span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-sunset-500" />
              <span className="text-text-secondary">10-15% Cheaper</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {step === "preferences" && (
              <PreferencesForm
                preferences={preferences}
                setPreferences={setPreferences}
                onNext={startGeneration}
              />
            )}

            {step === "generating" && <GeneratingAnimation />}

            {step === "itinerary" && (
              <ItineraryDisplay
                itinerary={itinerary}
                totalPrice={totalPrice}
                preferences={preferences}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function PreferencesForm({
  preferences,
  setPreferences,
  onNext,
}: {
  preferences: Preferences;
  setPreferences: (p: Preferences) => void;
  onNext: () => void;
}) {
  const isValid =
    preferences.destination &&
    preferences.startDate &&
    preferences.endDate &&
    preferences.interests.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
    >
      <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold mb-8">
        Step 1: Tell Us Your <span className="italic font-normal text-sunset-500">Dream</span>
      </h2>

      <div className="space-y-8">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold mb-4">Where do you want to go?</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {destinations.map((dest) => (
              <button
                key={dest.name}
                onClick={() => setPreferences({ ...preferences, destination: dest.name })}
                className={`relative h-32 rounded-xl overflow-hidden transition-all duration-300 ${
                  preferences.destination === dest.name
                    ? "ring-4 ring-sunset-500 scale-105"
                    : "hover:scale-105"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${dest.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium">{dest.name}</p>
                </div>
                {preferences.destination === dest.name && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-sunset-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-3">Start Date</label>
            <input
              type="date"
              value={preferences.startDate}
              onChange={(e) => setPreferences({ ...preferences, startDate: e.target.value })}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-sunset-500 focus:ring-4 focus:ring-sunset-500/10 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-3">End Date</label>
            <input
              type="date"
              value={preferences.endDate}
              onChange={(e) => setPreferences({ ...preferences, endDate: e.target.value })}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-sunset-500 focus:ring-4 focus:ring-sunset-500/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Budget & Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-3">
              Budget: £{preferences.budget.toLocaleString()}
            </label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={preferences.budget}
              onChange={(e) =>
                setPreferences({ ...preferences, budget: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-3">Number of Travelers</label>
            <select
              value={preferences.travelers}
              onChange={(e) =>
                setPreferences({ ...preferences, travelers: parseInt(e.target.value) })
              }
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-sunset-500 focus:ring-4 focus:ring-sunset-500/10 outline-none transition-all"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Person" : "People"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold mb-4">
            What interests you? (Select at least one)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  const newInterests = preferences.interests.includes(interest)
                    ? preferences.interests.filter((i) => i !== interest)
                    : [...preferences.interests, interest];
                  setPreferences({ ...preferences, interests: newInterests });
                }}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  preferences.interests.includes(interest)
                    ? "border-sunset-500 bg-sunset-50 text-sunset-600"
                    : "border-border hover:border-sunset-300"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Pace */}
        <div>
          <label className="block text-sm font-semibold mb-4">Trip Pace</label>
          <div className="grid grid-cols-3 gap-4">
            {(["relaxed", "moderate", "packed"] as const).map((pace) => (
              <button
                key={pace}
                onClick={() => setPreferences({ ...preferences, pace })}
                className={`px-6 py-4 rounded-xl border-2 font-medium capitalize transition-all ${
                  preferences.pace === pace
                    ? "border-sunset-500 bg-sunset-50 text-sunset-600"
                    : "border-border hover:border-sunset-300"
                }`}
              >
                {pace}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`w-full py-5 rounded-full font-bold text-lg transition-all ${
            isValid
              ? "bg-sunset-500 text-white hover:bg-sunset-600 hover:scale-105 hover:shadow-xl"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Generate My Perfect Trip →
        </button>
      </div>
    </motion.div>
  );
}

function GeneratingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Analyzing your preferences...",
    "Searching 10,000+ curated experiences...",
    "Matching with local experts...",
    "Optimizing your itinerary...",
    "Building your perfect trip...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh]"
    >
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-8 border-sunset-500/20 rounded-full" />
        <div className="absolute inset-0 border-8 border-transparent border-t-sunset-500 rounded-full animate-spin" />
        <div className="absolute inset-4 border-8 border-transparent border-t-rose-400 rounded-full animate-spin animation-delay-150" />
        <AIIcon className="absolute inset-0 m-auto w-12 h-12 text-sunset-500" />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-medium text-text-primary"
        >
          {steps[currentStep]}
        </motion.p>
      </AnimatePresence>

      <div className="mt-6 flex gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentStep ? "bg-sunset-500 w-8" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ItineraryDisplay({
  itinerary,
  totalPrice,
  preferences,
}: {
  itinerary: Day[];
  totalPrice: number;
  preferences: Preferences;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-sunset-500 to-rose-500 rounded-3xl p-8 text-white">
        <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold mb-4">
          Your Perfect {preferences.destination} Adventure!
        </h2>
        <p className="text-white/90 text-lg mb-6">
          {itinerary.length} days of curated experiences tailored just for you
        </p>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5" />
            <span>{preferences.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <span>{preferences.travelers} {preferences.travelers === 1 ? 'Traveler' : 'Travelers'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-2xl font-bold">£{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Itinerary Days */}
      <div className="space-y-6">
        {itinerary.map((day, dayIndex) => (
          <motion.div
            key={day.dayNumber}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: dayIndex * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-sunset-500 rounded-full flex items-center justify-center text-white font-bold">
                {day.dayNumber}
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">
                  Day {day.dayNumber}
                </h3>
                <p className="text-text-muted text-sm">{day.date}</p>
              </div>
            </div>

            <div className="space-y-4">
              {day.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-4 p-4 bg-warm-50 rounded-xl hover:shadow-md transition-all"
                >
                  <div
                    className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url('${activity.image}')` }}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-sunset-500 font-medium">{activity.time}</p>
                        <h4 className="font-semibold">{activity.title}</h4>
                      </div>
                      <span className="text-sm font-bold text-sunset-600">£{activity.price}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{activity.description}</p>
                    <span className="text-xs text-text-muted">Duration: {activity.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-warm-50 rounded-2xl p-8 text-center">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-4">
          Love this itinerary?
        </h3>
        <p className="text-text-secondary mb-6">
          Contact us to refine, customize, and book your perfect trip
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:07932619108"
            className="px-8 py-4 bg-sunset-500 text-white font-bold rounded-full hover:bg-sunset-600 transition-all"
          >
            📞 Call 07932 619108
          </a>
          <a
            href="mailto:invest@awesomeexperiences.com"
            className="px-8 py-4 border-2 border-sunset-500 text-sunset-500 font-bold rounded-full hover:bg-sunset-50 transition-all"
          >
            ✉️ Email Us
          </a>
        </div>
      </div>
    </motion.div>
  );
}
