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

type Step = "preferences" | "suggestions" | "generating" | "itinerary" | "refining";

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
  category: string;
}

interface Day {
  dayNumber: number;
  date: string;
  activityOptions: Activity[]; // Multiple options per day
}

interface FlightOption {
  id: string;
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
}

interface HotelOption {
  id: string;
  name: string;
  rating: number;
  image: string;
  amenities: string[];
  pricePerNight: number;
}

const destinations = [
  { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&q=80", tags: ["culture", "beach", "culinary", "nightlife"] },
  { name: "Amalfi Coast, Italy", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80", tags: ["culture", "beach", "culinary", "art"] },
  { name: "Maldives", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80", tags: ["beach", "wellness", "adventure"] },
  { name: "Swiss Alps", image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80", tags: ["adventure", "wellness", "culture"] },
  { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", tags: ["culture", "culinary", "shopping", "nightlife", "art"] },
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", tags: ["beach", "wellness", "culture", "adventure"] },
  { name: "I'm not sure", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80", tags: [] },
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

// Match interests to destination tags
const getDestinationSuggestions = (selectedInterests: string[]): typeof destinations => {
  const interestTags = selectedInterests.map(interest => {
    if (interest.includes("Culture")) return "culture";
    if (interest.includes("Adventure")) return "adventure";
    if (interest.includes("Beach")) return "beach";
    if (interest.includes("Culinary")) return "culinary";
    if (interest.includes("Art")) return "art";
    if (interest.includes("Shopping")) return "shopping";
    if (interest.includes("Nightlife")) return "nightlife";
    if (interest.includes("Wellness")) return "wellness";
    return "";
  }).filter(Boolean) as string[];

  // Score each destination by matching tags
  const scored = destinations
    .filter(d => d.name !== "I'm not sure")
    .map(dest => ({
      ...dest,
      score: dest.tags.filter(tag => interestTags.includes(tag as string)).length
    }))
    .sort((a, b) => b.score - a.score);

  // Return top 3 destinations
  return scored.slice(0, 3);
};

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
  const [flightOptions, setFlightOptions] = useState<FlightOption[]>([]);
  const [hotelOptions, setHotelOptions] = useState<HotelOption[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<Set<string>>(new Set());
  const [selectedFlight, setSelectedFlight] = useState<string>("");
  const [selectedHotel, setSelectedHotel] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [suggestedDestinations, setSuggestedDestinations] = useState<typeof destinations>([]);

  const handlePreferencesNext = () => {
    if (preferences.destination === "I'm not sure") {
      // Generate suggestions based on interests
      const suggestions = getDestinationSuggestions(preferences.interests);
      setSuggestedDestinations(suggestions);
      setStep("suggestions");
    } else {
      startGeneration();
    }
  };

  const startGeneration = () => {
    setStep("generating");

    // Simulate AI generation
    setTimeout(() => {
      const generatedItinerary = generateItinerary(preferences);
      const flights = generateFlightOptions();
      const hotels = generateHotelOptions(preferences.destination);

      setItinerary(generatedItinerary);
      setFlightOptions(flights);
      setHotelOptions(hotels);

      // Auto-select first flight and hotel
      setSelectedFlight(flights[0].id);
      setSelectedHotel(hotels[0].id);

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
      activityOptions: generateDayActivityOptions(i + 1, prefs),
    }));
  };

  const generateDayActivityOptions = (dayNum: number, prefs: Preferences): Activity[] => {
    const activityPool = {
      "Santorini, Greece": [
        { title: "Oia Sunset Tour", description: "Watch the world-famous sunset from the white cliffs", duration: "3h", price: 45, category: "Culture", time: "6:00 PM" },
        { title: "Wine Tasting Experience", description: "Sample local Assyrtiko wines at a vineyard", duration: "2h", price: 65, category: "Culinary", time: "2:00 PM" },
        { title: "Catamaran Cruise", description: "Sail around the caldera with lunch included", duration: "5h", price: 120, category: "Adventure", time: "10:00 AM" },
        { title: "Ancient Akrotiri Tour", description: "Explore the preserved Minoan Bronze Age settlement", duration: "2h", price: 35, category: "Culture", time: "9:00 AM" },
        { title: "Beach Day at Red Beach", description: "Relax on the famous red sand beach", duration: "4h", price: 0, category: "Beach", time: "11:00 AM" },
        { title: "Traditional Greek Dinner", description: "Enjoy authentic Greek cuisine with sea views", duration: "2h", price: 55, category: "Culinary", time: "7:00 PM" },
      ],
      "Amalfi Coast, Italy": [
        { title: "Positano Walking Tour", description: "Stroll through colorful clifftop streets", duration: "3h", price: 40, category: "Culture", time: "9:00 AM" },
        { title: "Cooking Class", description: "Learn authentic Italian cuisine from a local chef", duration: "4h", price: 95, category: "Culinary", time: "3:00 PM" },
        { title: "Boat Tour to Capri", description: "Visit the Blue Grotto and stunning coastline", duration: "6h", price: 150, category: "Adventure", time: "10:00 AM" },
        { title: "Limoncello Tasting", description: "Sample local lemon liqueur at a family farm", duration: "1.5h", price: 25, category: "Culinary", time: "2:00 PM" },
        { title: "Spa & Wellness Day", description: "Relax at a luxury spa overlooking the coast", duration: "3h", price: 85, category: "Wellness", time: "11:00 AM" },
        { title: "Sunset Dinner in Ravello", description: "Fine dining with panoramic coast views", duration: "2.5h", price: 75, category: "Culinary", time: "7:30 PM" },
      ],
    };

    const activities = activityPool[prefs.destination as keyof typeof activityPool] || activityPool["Santorini, Greece"];
    const dest = destinations.find(d => d.name === prefs.destination);

    return activities.map((act, i) => ({
      id: `${dayNum}-${i}`,
      time: act.time,
      title: act.title,
      description: act.description,
      duration: act.duration,
      price: act.price,
      category: act.category,
      image: dest?.image || destinations[0].image,
    }));
  };

  const generateFlightOptions = (): FlightOption[] => {
    return [
      { id: "flight-1", airline: "British Airways", departure: "10:30 AM", arrival: "3:45 PM", duration: "3h 15m", price: 285, stops: 0 },
      { id: "flight-2", airline: "EasyJet", departure: "6:15 AM", arrival: "11:30 AM", duration: "3h 15m", price: 189, stops: 0 },
      { id: "flight-3", airline: "Ryanair", departure: "2:20 PM", arrival: "8:15 PM", duration: "4h 55m", price: 145, stops: 1 },
    ];
  };

  const generateHotelOptions = (destination: string): HotelOption[] => {
    const hotelPools = {
      "Santorini, Greece": [
        {
          id: "hotel-1",
          name: "Canaves Oia Suites",
          rating: 5,
          image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80",
          amenities: ["Infinity Pool", "Spa", "Sea View", "Restaurant"],
          pricePerNight: 450,
        },
        {
          id: "hotel-2",
          name: "Astra Suites",
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
          amenities: ["Pool", "Breakfast", "Balcony", "WiFi"],
          pricePerNight: 280,
        },
        {
          id: "hotel-3",
          name: "Santorini View Hotel",
          rating: 4,
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80",
          amenities: ["WiFi", "Breakfast", "Terrace"],
          pricePerNight: 165,
        },
      ],
      "Amalfi Coast, Italy": [
        {
          id: "hotel-1",
          name: "Belmond Hotel Caruso",
          rating: 5,
          image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80",
          amenities: ["Infinity Pool", "Michelin Restaurant", "Spa", "Gardens"],
          pricePerNight: 520,
        },
        {
          id: "hotel-2",
          name: "Hotel Santa Caterina",
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80",
          amenities: ["Beach Access", "Pool", "Restaurant", "Sea View"],
          pricePerNight: 340,
        },
        {
          id: "hotel-3",
          name: "Positano Inn",
          rating: 4,
          image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80",
          amenities: ["WiFi", "Breakfast", "Central Location"],
          pricePerNight: 195,
        },
      ],
    };

    return hotelPools[destination as keyof typeof hotelPools] || hotelPools["Santorini, Greece"];
  };

  // Dynamic price calculation based on selections
  useEffect(() => {
    if (itinerary.length === 0) return;

    const activitiesTotal = itinerary.reduce((sum, day) => {
      return sum + day.activityOptions
        .filter(act => selectedActivities.has(act.id))
        .reduce((daySum, act) => daySum + act.price, 0);
    }, 0);

    const selectedFlightOption = flightOptions.find(f => f.id === selectedFlight);
    const flightTotal = selectedFlightOption ? selectedFlightOption.price * preferences.travelers : 0;

    const selectedHotelOption = hotelOptions.find(h => h.id === selectedHotel);
    const hotelTotal = selectedHotelOption ? selectedHotelOption.pricePerNight * itinerary.length : 0;

    setTotalPrice(activitiesTotal + flightTotal + hotelTotal);
  }, [selectedActivities, selectedFlight, selectedHotel, itinerary, flightOptions, hotelOptions, preferences.travelers]);

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
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
                onNext={handlePreferencesNext}
              />
            )}

            {step === "suggestions" && (
              <DestinationSuggestions
                suggestions={suggestedDestinations}
                preferences={preferences}
                setPreferences={setPreferences}
                onNext={startGeneration}
              />
            )}

            {step === "generating" && <GeneratingAnimation />}

            {step === "itinerary" && (
              <ItineraryDisplay
                itinerary={itinerary}
                flightOptions={flightOptions}
                hotelOptions={hotelOptions}
                selectedActivities={selectedActivities}
                selectedFlight={selectedFlight}
                selectedHotel={selectedHotel}
                totalPrice={totalPrice}
                preferences={preferences}
                onToggleActivity={toggleActivity}
                onSelectFlight={setSelectedFlight}
                onSelectHotel={setSelectedHotel}
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
                {dest.name === "I'm not sure" ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-sunset-400 via-purple-500 to-blue-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-white text-sm font-medium">{dest.name}</p>
                      <p className="text-white/80 text-xs mt-1">We'll help you choose</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${dest.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-medium">{dest.name}</p>
                    </div>
                  </>
                )}
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

function DestinationSuggestions({
  suggestions,
  preferences,
  setPreferences,
  onNext,
}: {
  suggestions: typeof destinations;
  preferences: Preferences;
  setPreferences: (p: Preferences) => void;
  onNext: () => void;
}) {
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleSelect = (destName: string) => {
    setSelectedDestination(destName);
    setPreferences({ ...preferences, destination: destName });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
    >
      <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold mb-4">
        Perfect! Based on Your <span className="italic font-normal text-sunset-500">Interests</span>
      </h2>
      <p className="text-text-secondary text-lg mb-8">
        We think you'd love these destinations. Pick your favorite to continue:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {suggestions.map((dest) => (
          <motion.button
            key={dest.name}
            onClick={() => handleSelect(dest.name)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`relative h-64 rounded-2xl overflow-hidden transition-all duration-300 ${
              selectedDestination === dest.name
                ? "ring-4 ring-sunset-500"
                : "hover:shadow-xl"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${dest.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-2xl font-bold mb-2">{dest.name}</h3>
              <div className="flex flex-wrap gap-2">
                {dest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {selectedDestination === dest.name && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-10 h-10 bg-sunset-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selectedDestination}
        className={`w-full py-5 rounded-full font-bold text-lg transition-all ${
          selectedDestination
            ? "bg-sunset-500 text-white hover:bg-sunset-600 hover:scale-105 hover:shadow-xl"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Continue with {selectedDestination || "Selected Destination"} →
      </button>
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
  flightOptions,
  hotelOptions,
  selectedActivities,
  selectedFlight,
  selectedHotel,
  totalPrice,
  preferences,
  onToggleActivity,
  onSelectFlight,
  onSelectHotel,
}: {
  itinerary: Day[];
  flightOptions: FlightOption[];
  hotelOptions: HotelOption[];
  selectedActivities: Set<string>;
  selectedFlight: string;
  selectedHotel: string;
  totalPrice: number;
  preferences: Preferences;
  onToggleActivity: (id: string) => void;
  onSelectFlight: (id: string) => void;
  onSelectHotel: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header with Dynamic Price */}
      <div className="bg-gradient-to-br from-sunset-500 to-rose-500 rounded-3xl p-8 text-white">
        <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold mb-4">
          Customize Your Perfect {preferences.destination} Adventure!
        </h2>
        <p className="text-white/90 text-lg mb-6">
          Select your flights, hotel, and activities to build your dream trip
        </p>

        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5" />
            <span>{preferences.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <span>{preferences.travelers} {preferences.travelers === 1 ? 'Traveler' : 'Travelers'}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="text-2xl">💰</span>
            <div>
              <div className="text-xs text-white/80">Total Trip Cost</div>
              <div className="text-3xl font-bold">£{totalPrice.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-6 flex items-center gap-3">
          ✈️ Choose Your Flight
        </h3>
        <div className="space-y-4">
          {flightOptions.map((flight) => (
            <button
              key={flight.id}
              onClick={() => onSelectFlight(flight.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedFlight === flight.id
                  ? "border-sunset-500 bg-sunset-50"
                  : "border-gray-200 hover:border-sunset-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-bold text-lg">{flight.airline}</span>
                    {flight.stops === 0 && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Direct
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>{flight.departure} → {flight.arrival}</span>
                    <span>•</span>
                    <span>{flight.duration}</span>
                    {flight.stops > 0 && (
                      <>
                        <span>•</span>
                        <span>{flight.stops} stop{flight.stops > 1 ? 's' : ''}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-sunset-600">£{flight.price}</div>
                  <div className="text-xs text-text-muted">per person</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-6 flex items-center gap-3">
          🏨 Choose Your Hotel
        </h3>
        <div className="space-y-4">
          {hotelOptions.map((hotel) => (
            <button
              key={hotel.id}
              onClick={() => onSelectHotel(hotel.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedHotel === hotel.id
                  ? "border-sunset-500 bg-sunset-50"
                  : "border-gray-200 hover:border-sunset-300"
              }`}
            >
              <div className="flex gap-4">
                <div
                  className="w-24 h-24 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url('${hotel.image}')` }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-lg">{hotel.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        <span className="text-sm text-text-muted ml-1">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-sunset-600">£{hotel.pricePerNight}</div>
                      <div className="text-xs text-text-muted">per night</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hotel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Activities Selection */}
      <div className="space-y-6">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold flex items-center gap-3">
          📅 Select Your Activities
        </h3>
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

            <div className="space-y-3">
              {day.activityOptions.map((activity) => {
                const isSelected = selectedActivities.has(activity.id);
                return (
                  <button
                    key={activity.id}
                    onClick={() => onToggleActivity(activity.id)}
                    className={`w-full text-left flex gap-4 p-4 rounded-xl transition-all ${
                      isSelected
                        ? "bg-sunset-50 border-2 border-sunset-500"
                        : "bg-warm-50 border-2 border-transparent hover:border-sunset-200"
                    }`}
                  >
                    <div className="flex items-start pt-1">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? "bg-sunset-500 border-sunset-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div
                      className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url('${activity.image}')` }}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 bg-sunset-100 text-sunset-700 rounded-full font-medium">
                              {activity.category}
                            </span>
                            <span className="text-sm text-sunset-500 font-medium">{activity.time}</span>
                          </div>
                          <h4 className="font-semibold text-lg">{activity.title}</h4>
                        </div>
                        <span className="text-lg font-bold text-sunset-600">
                          {activity.price === 0 ? "Free" : `£${activity.price}`}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{activity.description}</p>
                      <span className="text-xs text-text-muted">Duration: {activity.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-warm-100 to-sunset-100 rounded-2xl p-8 text-center border-2 border-sunset-200">
        <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold mb-4">
          Ready to Book Your £{totalPrice.toLocaleString()} Adventure?
        </h3>
        <p className="text-text-secondary text-lg mb-6">
          Contact us to finalize your booking and make any additional customizations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:07932619108"
            className="px-10 py-5 bg-sunset-500 text-white font-bold text-lg rounded-full hover:bg-sunset-600 transition-all hover:scale-105 hover:shadow-xl"
          >
            📞 Call 07932 619108
          </a>
          <a
            href="mailto:invest@awesomeexperiences.com"
            className="px-10 py-5 border-2 border-sunset-500 text-sunset-500 font-bold text-lg rounded-full hover:bg-sunset-50 transition-all hover:scale-105"
          >
            ✉️ Email Us
          </a>
        </div>
      </div>
    </motion.div>
  );
}
