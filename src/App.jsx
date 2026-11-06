import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  Code2,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Star,
  Cpu,
  Globe,
  Send,
  Copy,
  Check,
  Sparkles,
  Play,
  Apple,
  Terminal,
  Database,
  CreditCard,
  MapPin,
  Bell,
  Lock,
  TrendingUp,
  ShoppingCart,
  Car,
  Wallet,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Calendar,
  Sliders,
  X,
  Menu,
  Mail,
  PhoneCall,
  RefreshCw,
  Award,
  Clock,
  Flame
} from 'lucide-react';

// --- DATA DEFINITIONS ---

const TECH_CATEGORIES = [
  {
    id: 'cross-platform',
    label: 'Cross-Platform',
    icon: Layers,
    description: 'Single codebase solutions delivering 60/120 FPS native performance on both Android and iOS.',
    skills: [
      { name: 'React Native (New Arch)', level: 'Expert', tag: 'Fabric & TurboModules', exp: 'Primary Stack' },
      { name: 'Expo SDK 52+', level: 'Expert', tag: 'EAS Build & OTA Updates', exp: 'Fast Delivery' },
      { name: 'Flutter & Dart', level: 'Advanced', tag: 'Impeller Engine & Custom UI', exp: 'Pixel Perfect' },
      { name: 'TypeScript', level: 'Expert', tag: 'Strict Type Safety', exp: 'Core Language' },
      { name: 'Zustand & Redux Toolkit', level: 'Expert', tag: 'State Management', exp: 'Scalable State' },
      { name: 'Reanimated 3 & Skia', level: 'Advanced', tag: '60/120fps Fluid Gestures', exp: 'Animations' }
    ]
  },
  {
    id: 'ios',
    label: 'Native iOS',
    icon: Apple,
    description: 'Deep Apple ecosystem integration adhering strictly to Human Interface Guidelines.',
    skills: [
      { name: 'Swift 6', level: 'Advanced', tag: 'Concurrency & Actors', exp: 'Native Core' },
      { name: 'SwiftUI', level: 'Advanced', tag: 'Declarative iOS UI', exp: 'Modern UI' },
      { name: 'UIKit & AutoLayout', level: 'Proficient', tag: 'Legacy & Complex Views', exp: ' Rock Solid' },
      { name: 'TestFlight & App Store Connect', level: 'Expert', tag: 'CI/CD & Review Compliance', exp: 'Zero Rejections' },
      { name: 'CoreData & SwiftData', level: 'Advanced', tag: 'Local Persistence', exp: 'Offline First' },
      { name: 'Apple Pay & StoreKit 2', level: 'Advanced', tag: 'In-App Purchases & Subscriptions', exp: 'Monetization' }
    ]
  },
  {
    id: 'android',
    label: 'Native Android',
    icon: Smartphone,
    description: 'Modern Material You Android engineering built for device fragmentation and speed.',
    skills: [
      { name: 'Kotlin & Coroutines', level: 'Expert', tag: 'Asynchronous Streams & Flow', exp: 'Native Core' },
      { name: 'Jetpack Compose', level: 'Advanced', tag: 'Modern Declarative UI', exp: 'Material 3' },
      { name: 'Android Studio & Gradle', level: 'Expert', tag: 'Build Optimization & ProGuard', exp: 'Performance' },
      { name: 'Room Database & SQLite', level: 'Advanced', tag: 'Offline Caching', exp: 'Local Storage' },
      { name: 'Google Play Console', level: 'Expert', tag: 'Internal Tracks & Staged Rollout', exp: 'Deployment' },
      { name: 'Native Bridges / JNI', level: 'Advanced', tag: 'Hardware SDK Integrations', exp: 'Deep Access' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend & Payments',
    icon: Database,
    description: 'Production-ready cloud backends, real-time databases, and Indian/Global payment gateways.',
    skills: [
      { name: 'Supabase & PostgreSQL', level: 'Expert', tag: 'Realtime, Auth & Row Level Security', exp: 'BaaS Leader' },
      { name: 'Firebase Suite', level: 'Expert', tag: 'Firestore, Crashlytics, FCM Push', exp: 'Google Cloud' },
      { name: 'Razorpay & UPI Intent', level: 'Expert', tag: 'GPay, PhonePe, Paytm Native Flow', exp: 'India Payments' },
      { name: 'Stripe & RevenueCat', level: 'Advanced', tag: 'Global Cards & SaaS Subscriptions', exp: 'Global Payments' },
      { name: 'Node.js & REST / GraphQL', level: 'Advanced', tag: 'Custom API Microservices', exp: 'Custom Backend' },
      { name: 'Google Maps & Mapbox SDK', level: 'Expert', tag: 'Live GPS, Geofencing & Routing', exp: 'Location Tech' }
    ]
  }
];

const CASE_STUDIES = [
  {
    id: 'quickcart',
    title: 'QuickCart Go',
    subtitle: '15-Minute Hyperlocal Grocery & Delivery App',
    category: 'E-Commerce',
    platforms: ['iOS', 'Android'],
    accent: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    icon: ShoppingCart,
    metrics: [
      { label: 'Crash-Free Sessions', value: '99.8%' },
      { label: 'App Store Rating', value: '4.8 ★' },
      { label: 'Cold Start Time', value: '1.1s' }
    ],
    techStack: ['React Native', 'Expo', 'Supabase', 'Razorpay UPI', 'Google Maps SDK', 'Zustand'],
    summary: 'A full-stack hyperlocal delivery platform featuring real-time rider tracking, instant UPI intent checkout, and automated inventory syncing.',
    architecture: [
      'Optimistic UI cart updates with Zustand + MMKV local storage for zero-latency tap response.',
      'WebSockets via Supabase Realtime to stream delivery partner GPS coordinates every 3 seconds.',
      'Native Razorpay SDK integration supporting instant 1-tap UPI apps (GPay, PhonePe) with webhook verification.',
      'Firebase Cloud Messaging (FCM) + APNs for rich interactive order status notifications.'
    ],
    screens: [
      {
        name: 'Storefront & Smart Search',
        desc: 'Category pills, flash deals timer, and instant debounced search.'
      },
      {
        name: '1-Tap UPI Checkout',
        desc: 'Address autofill via GPS pin and native UPI intent sheet.'
      },
      {
        name: 'Live Rider Radar',
        desc: 'Interactive map polyline showing rider approaching in real time.'
      }
    ]
  },
  {
    id: 'drivehost',
    title: 'DriveHost Pro',
    subtitle: 'Self-Drive Vehicle Rental & Smart Fleet Booking',
    category: 'On-Demand / Booking',
    platforms: ['iOS', 'Android'],
    accent: 'from-indigo-500 to-blue-600',
    badgeColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    icon: Car,
    metrics: [
      { label: 'Booking Conversion', value: '+42%' },
      { label: 'App Rating', value: '4.9 ★' },
      { label: 'Frame Rate', value: '120 FPS' }
    ],
    techStack: ['Flutter', 'Firebase', 'Mapbox GL', 'DigiLocker KYC API', 'Stripe & Razorpay', 'BLoC'],
    summary: 'End-to-end vehicle sharing app with instant Aadhaar/License OCR verification, dynamic hourly pricing, and Bluetooth digital key unlock.',
    architecture: [
      'Built with Flutter Impeller engine for silky-smooth custom car carousel transitions.',
      'On-device ML Kit document scanner for instant Driving License & ID verification.',
      'Date-range conflict engine with dynamic surge pricing and security deposit holds.',
      'Bluetooth Low Energy (BLE) module integration for keyless vehicle check-in inspection.'
    ],
    screens: [
      {
        name: '3D Fleet Explorer',
        desc: 'Filter by SUV, EV, or Hatchback with live availability radius.'
      },
      {
        name: 'Instant KYC & Inspection',
        desc: 'Guided 4-corner vehicle photo upload before trip start.'
      },
      {
        name: 'Digital Key & Trip Meter',
        desc: 'BLE lock/unlock toggle, fuel level, and trip extension slider.'
      }
    ]
  },
  {
    id: 'finpulse',
    title: 'FinPulse UPI',
    subtitle: 'Privacy-First Expense, Split Bill & Wealth Tracker',
    category: 'FinTech',
    platforms: ['iOS', 'Android'],
    accent: 'from-cyan-500 to-purple-600',
    badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    icon: Wallet,
    metrics: [
      { label: 'Offline Reliability', value: '100%' },
      { label: 'User Retention', value: '68% D30' },
      { label: 'DB Query Speed', value: '<8ms' }
    ],
    techStack: ['Kotlin', 'SwiftUI', 'SQLite / Room', 'Biometric FaceID', 'Victory Charts', 'CloudKit Sync'],
    summary: 'Native-grade personal finance companion with biometric security, smart group bill splitting, and encrypted offline-first database sync.',
    architecture: [
      '100% Offline-First architecture using encrypted SQLCipher local database with background cloud backup.',
      'Hardware-backed FaceID / TouchID and Android BiometricPrompt security enclave.',
      'Custom 60fps interactive cashflow charts and category budget burn-rate alerts.',
      'One-tap WhatsApp & UPI deep-link payment reminders for settling group splits.'
    ],
    screens: [
      {
        name: 'Net Worth Cockpit',
        desc: 'Monthly burn rate, category breakdown donut, and savings streak.'
      },
      {
        name: 'Group Split Engine',
        desc: 'Split by percentage, shares, or exact amount with UPI settlement links.'
      },
      {
        name: 'Biometric Vault',
        desc: 'FaceID lock screen with recurring subscription renewal radar.'
      }
    ]
  }
];

const ADDON_FEATURES = [
  { id: 'auth', name: 'OTP, Social & Biometric Auth', weeks: 1, inr: 8000, usd: 150, icon: Lock },
  { id: 'payments', name: 'Razorpay / UPI / Stripe Checkout', weeks: 1, inr: 12000, usd: 220, icon: CreditCard },
  { id: 'maps', name: 'Live GPS Tracking & Google Maps', weeks: 1.5, inr: 15000, usd: 280, icon: MapPin },
  { id: 'notifications', name: 'Push Notifications & Real-Time Chat', weeks: 1, inr: 10000, usd: 180, icon: Bell },
  { id: 'admin', name: 'Web Admin Control Dashboard', weeks: 2, inr: 20000, usd: 380, icon: Sliders }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Interactive Wireframes',
    duration: 'Days 1–5',
    desc: 'We lock down your exact user flows, database schema, and clickable Figma mobile prototypes before writing a single line of code.',
    deliverable: 'Clickable Figma Prototype + Technical Scope PDF'
  },
  {
    step: '02',
    title: 'Agile Sprint Builds & Weekly Demos',
    duration: 'Weeks 2–5',
    desc: 'No black-box development. Every Friday you receive an installable Android APK and iOS TestFlight build on your actual phone.',
    deliverable: 'Weekly Installable APK & TestFlight Link'
  },
  {
    step: '03',
    title: 'QA, Offline & Performance Stress Testing',
    duration: 'Week 6',
    desc: 'Rigorous testing across screen sizes, slow 3G/4G networks, battery profiling, payment edge-cases, and crash monitoring.',
    deliverable: '99.5%+ Crash-Free Benchmark Report'
  },
  {
    step: '04',
    title: 'Play Store & App Store Launch + Handover',
    duration: 'Final Week',
    desc: 'Full handling of Google Play Console and Apple App Store review compliance, store screenshots, privacy policies, and 30 days of free support.',
    deliverable: 'Live Published Apps + 100% Source Code Ownership'
  }
];

// --- INTERACTIVE HTML5 CANVAS FIRE EMBER & SPARK PARTICLE ENGINE ---
function FireEmberCanvas({ intensity }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (intensity === 'off') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const emberColors = [
      { r: 255, g: 69, b: 0 },   // Deep Orange Red
      { r: 255, g: 140, b: 0 },  // Vibrant Flame Orange
      { r: 255, g: 200, b: 40 }, // Molten Gold
      { r: 239, g: 68, b: 68 },  // Crimson Core
      { r: 251, g: 191, b: 36 }  // Amber Spark
    ];

    const baseCount = intensity === 'high' ? 95 : 42;
    const particles = [];
    const mouseSparks = [];

    const createParticle = (startAtBottom = false) => {
      const color = emberColors[Math.floor(Math.random() * emberColors.length)];
      const size = Math.random() * (intensity === 'high' ? 3.8 : 2.6) + 1;
      return {
        x: Math.random() * width,
        y: startAtBottom ? height + Math.random() * 60 : Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: -(Math.random() * (intensity === 'high' ? 2.4 : 1.4) + 0.6),
        size,
        alpha: Math.random() * 0.75 + 0.25,
        color,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.04 + 0.015,
        decay: Math.random() * 0.0025 + 0.0008
      };
    };

    for (let i = 0; i < baseCount; i++) {
      particles.push(createParticle(false));
    }

    const handleMouseMove = (e) => {
      const spawnTotal = intensity === 'high' ? 4 : 2;
      for (let i = 0; i < spawnTotal; i++) {
        const color = emberColors[Math.floor(Math.random() * emberColors.length)];
        mouseSparks.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 2.6,
          vy: -(Math.random() * 2.6 + 0.8),
          size: Math.random() * 3.2 + 1.2,
          alpha: 0.95,
          color,
          decay: Math.random() * 0.03 + 0.018
        });
      }
      if (mouseSparks.length > 130) {
        mouseSparks.splice(0, mouseSparks.length - 130);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Bottom ambient hearth heat glow
      const bottomGlow = ctx.createLinearGradient(0, height - 220, 0, height);
      bottomGlow.addColorStop(0, 'rgba(239, 68, 68, 0)');
      bottomGlow.addColorStop(0.6, intensity === 'high' ? 'rgba(234, 88, 12, 0.06)' : 'rgba(234, 88, 12, 0.03)');
      bottomGlow.addColorStop(1, intensity === 'high' ? 'rgba(255, 69, 0, 0.14)' : 'rgba(255, 69, 0, 0.07)');
      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, height - 220, width, 220);

      // Update & draw rising embers
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.55;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.y < -20 || p.alpha <= 0.05) {
          particles[i] = createParticle(true);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `rgba(255, 255, 220, ${p.alpha})`);
        grad.addColorStop(0.35, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.85})`);
        grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & draw interactive mouse ember trail
      for (let i = mouseSparks.length - 1; i >= 0; i--) {
        const s = mouseSparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;
        s.size *= 0.985;

        if (s.alpha <= 0.04) {
          mouseSparks.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3.5);
        grad.addColorStop(0, `rgba(255, 255, 240, ${s.alpha})`);
        grad.addColorStop(0.4, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${s.alpha})`);
        grad.addColorStop(1, `rgba(${s.color.r}, 0, 0, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity]);

  if (intensity === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

export default function App() {
  // Navigation & UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fire Motion Intensity State ('high' | 'low' | 'off')
  const [fireIntensity, setFireIntensity] = useState('high');

  // Hero Interactive Phone State
  const [deviceOS, setDeviceOS] = useState('ios'); // 'ios' | 'android'
  const [miniAppTab, setMiniAppTab] = useState('home'); // 'home' | 'cart' | 'track'
  const [cartCount, setCartCount] = useState(2);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [likedItems, setLikedItems] = useState({ 1: true, 2: false });

  // Tech Stack Filter State
  const [activeTechTab, setActiveTechTab] = useState('cross-platform');

  // Case Studies Filter & Modal State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  // Cost Estimator State
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'
  const [estPlatform, setEstPlatform] = useState('both'); // 'android' | 'ios' | 'both'
  const [estComplexity, setEstComplexity] = useState('standard'); // 'mvp' | 'standard' | 'scale'
  const [selectedAddons, setSelectedAddons] = useState(['auth', 'payments']);
  const [quoteCopied, setQuoteCopied] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter Case Studies
  const filteredStudies = CASE_STUDIES.filter((study) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'iOS & Android') return study.platforms.includes('iOS') && study.platforms.includes('Android');
    return study.category === selectedCategory;
  });

  // Calculate Estimator Totals
  const calculateEstimate = () => {
    const baseComplexity = {
      mvp: { weeks: 3, inr: 35000, usd: 650, label: 'MVP (5–8 Core Screens)' },
      standard: { weeks: 5, inr: 65000, usd: 1200, label: 'Growth App (10–15 Screens)' },
      scale: { weeks: 8, inr: 110000, usd: 2100, label: 'Full Scale (20+ Screens)' }
    }[estComplexity];

    const platformMultiplier = {
      android: { factor: 1, label: 'Android Only' },
      ios: { factor: 1.05, label: 'iOS Only' },
      both: { factor: 1.35, label: 'iOS + Android (Cross-Platform)' }
    }[estPlatform];

    let addonWeeks = 0;
    let addonInr = 0;
    let addonUsd = 0;

    selectedAddons.forEach((id) => {
      const item = ADDON_FEATURES.find((a) => a.id === id);
      if (item) {
        addonWeeks += item.weeks;
        addonInr += item.inr;
        addonUsd += item.usd;
      }
    });

    const totalWeeksMin = Math.ceil((baseComplexity.weeks + addonWeeks) * (estPlatform === 'both' ? 1.1 : 1));
    const totalWeeksMax = totalWeeksMin + 2;

    const rawInr = Math.round((baseComplexity.inr * platformMultiplier.factor + addonInr) / 1000) * 1000;
    const rawUsd = Math.round((baseComplexity.usd * platformMultiplier.factor + addonUsd) / 50) * 50;

    return {
      weeksRange: `${totalWeeksMin} – ${totalWeeksMax} Weeks`,
      minPrice: currency === 'INR' ? `₹${rawInr.toLocaleString('en-IN')}` : `$${rawUsd.toLocaleString('en-US')}`,
      maxPrice:
        currency === 'INR'
          ? `₹${Math.round((rawInr * 1.2) / 1000 * 1000).toLocaleString('en-IN')}`
          : `$${Math.round((rawUsd * 1.2) / 50 * 50).toLocaleString('en-US')}`,
      platformLabel: platformMultiplier.label,
      complexityLabel: baseComplexity.label
    };
  };

  const estimate = calculateEstimate();

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const generateQuoteText = () => {
    const addonNames = selectedAddons
      .map((id) => ADDON_FEATURES.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    return `Hi Siranjeevi, I'm interested in building a mobile app.\n• Platform: ${estimate.platformLabel}\n• Scope: ${estimate.complexityLabel}\n• Key Features: ${addonNames || 'Core features only'}\n• Estimated Budget: ${estimate.minPrice} - ${estimate.maxPrice} (${estimate.weeksRange})`;
  };

  const handleCopyQuoteAndScroll = () => {
    const summary = generateQuoteText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
    }
    setContactForm((prev) => ({ ...prev, projectDetails: summary }));
    setQuoteCopied(true);
    setTimeout(() => setQuoteCopied(false), 3000);
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cycleFireIntensity = () => {
    setFireIntensity((prev) => {
      if (prev === 'high') return 'low';
      if (prev === 'low') return 'off';
      return 'high';
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden relative">
      {/* Custom Fire Keyframe Animations & Magma Hover Styles */}
      <style>{`
        @keyframes flamePulse {
          0%, 100% {
            transform: scale(1) translateY(0px);
            opacity: 0.75;
            filter: hue-rotate(0deg);
          }
          50% {
            transform: scale(1.07) translateY(-8px);
            opacity: 0.98;
            filter: hue-rotate(12deg);
          }
        }
        @keyframes plasmaSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.06); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes heatShimmer {
          0%, 100% { text-shadow: 0 0 18px rgba(249, 115, 22, 0.45), 0 0 36px rgba(239, 68, 68, 0.25); }
          50% { text-shadow: 0 0 28px rgba(251, 191, 36, 0.75), 0 0 54px rgba(249, 115, 22, 0.45); }
        }
        @keyframes emberFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        .fire-aura-active {
          animation: flamePulse 3.6s ease-in-out infinite;
        }
        .plasma-ring-active {
          animation: plasmaSpin 10s linear infinite;
        }
        .fire-text-shimmer {
          animation: heatShimmer 3s ease-in-out infinite;
        }
        .magma-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .magma-card:hover {
          border-color: rgba(249, 115, 22, 0.65) !important;
          box-shadow: 0 12px 35px -10px rgba(234, 88, 12, 0.32), 0 0 20px -5px rgba(251, 191, 36, 0.2) !important;
          transform: translateY(-4px);
        }
        .fire-btn-glow {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .fire-btn-glow:hover {
          box-shadow: 0 0 25px rgba(249, 115, 22, 0.6), 0 0 50px rgba(239, 68, 68, 0.35);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Interactive HTML5 Canvas Fire Ember & Spark System */}
      <FireEmberCanvas intensity={fireIntensity} />

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl transition-colors duration-700 ${
            fireIntensity !== 'off' ? 'bg-orange-600/20' : 'bg-indigo-600/15'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl transition-colors duration-700 ${
            fireIntensity !== 'off' ? 'bg-red-600/15' : 'bg-emerald-500/10'
          }`}
        />
        <div
          className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-700 ${
            fireIntensity !== 'off' ? 'bg-amber-500/15' : 'bg-cyan-500/10'
          }`}
        />
      </div>

      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg font-bold text-white text-lg transition-all ${
                fireIntensity !== 'off'
                  ? 'bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 shadow-orange-500/30'
                  : 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-emerald-500 shadow-indigo-500/25'
              }`}
            >
              SR
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base sm:text-lg flex items-center gap-1.5 leading-none">
                <span>Siranjeevi R</span>
                {fireIntensity !== 'off' && (
                  <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
                )}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Android & iOS Architect
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button onClick={() => scrollToSection('stack')} className="hover:text-orange-400 transition">
              Tech Stack
            </button>
            <button onClick={() => scrollToSection('work')} className="hover:text-orange-400 transition">
              Featured Apps
            </button>
            <button onClick={() => scrollToSection('estimator')} className="hover:text-orange-400 transition flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Cost Estimator
            </button>
            <button onClick={() => scrollToSection('process')} className="hover:text-orange-400 transition">
              Process
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Fire FX Controller Toggle in Navbar */}
            <button
              onClick={cycleFireIntensity}
              title="Click to cycle Fire Motion Effects intensity"
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                fireIntensity === 'high'
                  ? 'bg-orange-500/15 border-orange-500/50 text-orange-300 shadow-lg shadow-orange-500/10'
                  : fireIntensity === 'low'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame
                className={`w-3.5 h-3.5 ${
                  fireIntensity === 'high'
                    ? 'text-orange-400 animate-pulse'
                    : fireIntensity === 'low'
                    ? 'text-amber-400'
                    : 'text-slate-500'
                }`}
              />
              <span>
                Fire FX: {fireIntensity.toUpperCase()}
              </span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`px-4 py-2 rounded-xl text-white font-semibold text-sm shadow-lg transition flex items-center gap-2 ${
                fireIntensity !== 'off'
                  ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 shadow-orange-600/30 fire-btn-glow'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25'
              }`}
            >
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={cycleFireIntensity}
              className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 ${
                fireIntensity !== 'off'
                  ? 'bg-orange-500/15 border-orange-500/40 text-orange-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{fireIntensity.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
            <button onClick={() => scrollToSection('stack')} className="block w-full text-left py-2 text-slate-200 font-medium">
              Tech Stack & Capabilities
            </button>
            <button onClick={() => scrollToSection('work')} className="block w-full text-left py-2 text-slate-200 font-medium">
              Featured Mobile Apps
            </button>
            <button onClick={() => scrollToSection('estimator')} className="block w-full text-left py-2 text-orange-400 font-medium">
              Interactive Cost Estimator
            </button>
            <button onClick={() => scrollToSection('process')} className="block w-full text-left py-2 text-slate-200 font-medium">
              4-Step Delivery Workflow
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-semibold text-center block"
            >
              Book Free Discovery Call
            </button>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-10 pb-20 lg:pt-16 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs sm:text-sm font-medium">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>Available for Freelance Projects • Worldwide & India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Building Blazing-Fast{' '}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  fireIntensity !== 'off'
                    ? 'from-amber-300 via-orange-500 to-red-500 fire-text-shimmer'
                    : 'from-indigo-400 via-cyan-300 to-emerald-400'
                }`}
              >
                Android & iOS Apps
              </span>{' '}
              That Ignite Growth.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Hi, I’m <strong className="text-white font-semibold">Siranjeevi R</strong>. I help startups, founders, and growing businesses forge ideas into polished, revenue-ready mobile apps using{' '}
              <span className="text-orange-300 font-medium">React Native, Flutter, Kotlin, and Swift</span>—from UI/UX architecture to Play Store & App Store launch.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('work')}
                className={`px-6 py-3.5 rounded-xl text-white font-semibold shadow-xl flex items-center gap-2.5 transition transform ${
                  fireIntensity !== 'off'
                    ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 shadow-orange-600/30 fire-btn-glow'
                    : 'bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-indigo-600/25 hover:-translate-y-0.5'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>Explore Featured Apps</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('estimator')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-orange-500/30 hover:border-orange-500/60 font-semibold flex items-center gap-2 transition magma-card"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Estimate Project Cost</span>
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 sm:gap-6 border-t border-slate-800/80 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99.8%</div>
                <div className="text-xs sm:text-sm text-slate-400">Crash-Free Code</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-400">120 FPS</div>
                <div className="text-xs sm:text-sm text-slate-400">Blazing Fluid UI</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
                <div className="text-xs sm:text-sm text-slate-400">Store Approval Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Device Switcher Phone Preview with Animated Fiery Aura */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Device OS Toggle Pill */}
            <div className="mb-5 inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner relative z-20">
              <button
                onClick={() => setDeviceOS('ios')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  deviceOS === 'ios'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>iOS 18 (iPhone 16 Pro)</span>
              </button>
              <button
                onClick={() => setDeviceOS('android')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  deviceOS === 'android'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android 15 (Pixel 9)</span>
              </button>
            </div>

            {/* Fiery Plasma Wrapper Around Phone Mockup */}
            <div className="relative flex items-center justify-center">
              {fireIntensity !== 'off' && (
                <>
                  {/* Outer Pulsing Flame Corona */}
                  <div
                    className={`absolute -inset-6 rounded-[58px] bg-gradient-to-tr from-red-600/35 via-orange-500/30 to-amber-400/35 blur-2xl pointer-events-none fire-aura-active`}
                  />
                  {/* Rotating Molten Plasma Ring */}
                  <div
                    className="absolute -inset-2 rounded-[52px] opacity-60 blur-xl pointer-events-none plasma-ring-active"
                    style={{
                      background:
                        'conic-gradient(from 0deg, rgba(239,68,68,0.55), rgba(249,115,22,0.65), rgba(251,191,36,0.55), rgba(220,38,38,0.2), rgba(239,68,68,0.55))'
                    }}
                  />
                  {/* Floating Flame Badges */}
                  <div
                    className="absolute -left-6 top-16 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-orange-500/50 shadow-lg shadow-orange-500/20 text-[11px] font-bold text-orange-300"
                    style={{ animation: 'emberFloat 4s ease-in-out infinite' }}
                  >
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>Hot Reload Ready</span>
                  </div>
                  <div
                    className="absolute -right-6 bottom-24 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-amber-500/50 shadow-lg shadow-amber-500/20 text-[11px] font-bold text-amber-300"
                    style={{ animation: 'emberFloat 4.5s ease-in-out infinite 1s' }}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>120Hz Native Engine</span>
                  </div>
                </>
              )}

              {/* Phone Mockup Frame */}
              <div
                className={`relative z-10 w-[305px] sm:w-[325px] bg-slate-900 border-[6px] transition-all duration-500 shadow-2xl ${
                  deviceOS === 'ios'
                    ? 'rounded-[46px] border-orange-500/40 shadow-orange-500/25'
                    : 'rounded-[34px] border-amber-500/40 shadow-amber-500/25'
                } overflow-hidden`}
              >
                {/* Top Status Bar & Notch/Punch-hole */}
                <div className="bg-slate-950 px-5 pt-2.5 pb-2 flex items-center justify-between text-[11px] text-slate-300 font-medium relative">
                  <span>9:41</span>
                  {deviceOS === 'ios' ? (
                    <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 border border-orange-500/30">
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                      <span className="text-[9px] text-orange-400 font-semibold">Live Demo</span>
                    </div>
                  ) : (
                    <div className="w-3.5 h-3.5 bg-black rounded-full border border-amber-500/40" />
                  )}
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <div className="w-4 h-2.5 border border-slate-400 rounded-sm p-0.5">
                      <div className="w-full h-full bg-orange-400 rounded-xs" />
                    </div>
                  </div>
                </div>

                {/* Interactive Mini App Screen Content */}
                <div className="p-4 bg-gradient-to-b from-slate-950 to-slate-900 min-h-[430px] flex flex-col justify-between">
                  {/* Mini App Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-orange-400 font-bold block">
                          {deviceOS === 'ios' ? 'SwiftUI / React Native' : 'Jetpack / Flutter'}
                        </span>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1">
                          <span>QuickCart Express</span>
                          <Flame className="w-3.5 h-3.5 text-orange-400" />
                        </h3>
                      </div>
                      <button
                        onClick={() => setMiniAppTab('cart')}
                        className="relative p-2 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 hover:border-orange-400 transition"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                          {cartCount}
                        </span>
                      </button>
                    </div>

                    {/* Interactive Sub-Views inside Phone */}
                    {miniAppTab === 'home' && (
                      <div className="space-y-3">
                        {/* Promo Banner */}
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-semibold">
                              🔥 FLASH 12 MIN DELIVERY
                            </span>
                            <span className="text-[10px] font-mono">UPI READY</span>
                          </div>
                          <p className="text-xs font-bold mt-1.5">Tap items below to test live state!</p>
                        </div>

                        {/* Interactive Product Cards */}
                        {[
                          { id: 1, name: 'Cold Brew Arabica Pack', price: '₹249', time: '11 mins' },
                          { id: 2, name: 'Organic Avocado Box (2pc)', price: '₹199', time: '14 mins' }
                        ].map((item) => (
                          <div
                            key={item.id}
                            className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/80 flex items-center justify-between"
                          >
                            <div>
                              <p className="text-xs font-semibold text-white">{item.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-bold text-amber-400">{item.price}</span>
                                <span className="text-[10px] text-slate-400">• {item.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() =>
                                  setLikedItems((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                                }
                                className={`p-1.5 rounded-lg border text-xs transition ${
                                  likedItems[item.id]
                                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                                    : 'bg-slate-900 border-slate-700 text-slate-400'
                                }`}
                              >
                                ♥
                              </button>
                              <button
                                onClick={() => setCartCount((c) => c + 1)}
                                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs font-semibold transition"
                              >
                                + Add
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Performance Telemetry Pill */}
                        <div className="p-2.5 rounded-xl bg-slate-950/90 border border-orange-500/20 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-orange-400" /> UI Thread:
                          </span>
                          <span className="font-mono text-amber-400 font-semibold">120 FPS • 0 Jank</span>
                        </div>
                      </div>
                    )}

                    {miniAppTab === 'cart' && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300">Items in Cart ({cartCount})</span>
                            <span className="font-bold text-white">₹{cartCount * 220}</span>
                          </div>
                          <div className="flex justify-between text-[11px] text-amber-400">
                            <span>Instant UPI Discount</span>
                            <span>-₹40</span>
                          </div>
                          <div className="border-t border-slate-700 pt-2 flex justify-between text-xs font-bold">
                            <span>Total Payable</span>
                            <span className="text-orange-400">₹{Math.max(0, cartCount * 220 - 40)}</span>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1.5">
                          <div className="font-semibold text-slate-300">Payment Gateway (Razorpay SDK)</div>
                          <div className="flex gap-1.5">
                            <span className="px-2 py-1 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 font-medium">
                              GPay UPI
                            </span>
                            <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">PhonePe</span>
                            <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">Apple Pay</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setOrderPlaced(true);
                            setMiniAppTab('track');
                          }}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20 transition"
                        >
                          Simulate 1-Tap UPI Checkout →
                        </button>
                      </div>
                    )}

                    {miniAppTab === 'track' && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-orange-500/15 border border-orange-500/30 text-center">
                          <CheckCircle2 className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                          <p className="text-xs font-bold text-white">
                            {orderPlaced ? 'Order Confirmed via UPI!' : 'Live GPS Radar Demo'}
                          </p>
                          <p className="text-[10px] text-orange-300">Rider Aarav is 1.2 km away</p>
                        </div>

                        {/* Simulated Map Box */}
                        <div className="h-32 rounded-xl bg-slate-950 border border-slate-800 p-3 relative overflow-hidden flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 z-10">
                            <span className="bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                              📍 Google Maps SDK
                            </span>
                            <span className="text-amber-400 font-mono">ETA: 8 mins</span>
                          </div>
                          {/* Simulated Route Line */}
                          <div className="my-auto flex items-center justify-between px-3 z-10">
                            <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-[10px] font-bold">
                              🏪
                            </div>
                            <div className="flex-1 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 mx-2 rounded-full relative">
                              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-sm animate-bounce">
                                🛵
                              </span>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold">
                              🏠
                            </div>
                          </div>
                          <div className="text-[10px] text-slate-500 text-center z-10">
                            WebSocket Coordinate Stream Active
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Tab Bar inside Phone */}
                  <div className="mt-4 pt-2 border-t border-slate-800 grid grid-cols-3 gap-1 text-[10px]">
                    {[
                      { id: 'home', label: 'Storefront', icon: Layers },
                      { id: 'cart', label: 'UPI Pay', icon: CreditCard },
                      { id: 'track', label: 'Live GPS', icon: MapPin }
                    ].map((t) => {
                      const IconComponent = t.icon;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setMiniAppTab(t.id)}
                          className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 font-semibold transition ${
                            miniAppTab === t.id
                              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="pt-2 flex justify-center">
                    <div
                      className={`h-1 rounded-full bg-slate-600 ${
                        deviceOS === 'ios' ? 'w-28' : 'w-20'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5 relative z-10">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Interactive Demo: Click inside the phone or move your mouse for sparks</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. TECH STACK & CAPABILITIES FILTER */}
      <section id="stack" className="relative z-10 py-20 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 flex items-center justify-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> Full-Cycle Mobile Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              One Developer. Complete Mobile Stack.
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Whether you need a cost-effective cross-platform startup MVP or a low-level native iOS/Android app, I architect solutions tailored to your business goals.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {TECH_CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeTechTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTechTab(cat.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-lg shadow-orange-600/30 scale-[1.02]'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-orange-500/40 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Panel */}
          {TECH_CATEGORIES.map((cat) => {
            if (cat.id !== activeTechTab) return null;
            return (
              <div key={cat.id} className="space-y-6">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center max-w-2xl mx-auto">
                  <p className="text-sm text-slate-300">{cat.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 magma-card group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-white text-base group-hover:text-orange-300 transition">
                          {skill.name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/25">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">{skill.tag}</p>
                      <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
                        <span>Production Focus</span>
                        <span className="text-amber-400 font-medium">{skill.exp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE MOBILE APP SHOWCASE (CASE STUDIES) */}
      <section id="work" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> Proof of Work • Production Ready
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Featured Mobile App Case Studies
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl">
              Explore real-world mobile architectures built with clean code, offline-first caching, and seamless payment integrations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'iOS & Android', 'E-Commerce', 'On-Demand / Booking', 'FinTech'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-lg shadow-orange-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-orange-500/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => {
            const StudyIcon = study.icon;
            return (
              <div
                key={study.id}
                className="rounded-3xl bg-slate-900/70 border border-slate-800/90 magma-card flex flex-col justify-between overflow-hidden group shadow-xl"
              >
                <div>
                  {/* Top Visual Header */}
                  <div className={`p-6 bg-gradient-to-br ${study.accent} relative overflow-hidden`}>
                    <div className="flex items-center justify-between relative z-10">
                      <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-xs font-semibold">
                        {study.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {study.platforms.map((p) => (
                          <span
                            key={p}
                            className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold backdrop-blur-sm"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-4 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-slate-950/90 text-white flex items-center justify-center shadow-lg">
                        <StudyIcon className="w-7 h-7 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-white">{study.title}</h3>
                        <p className="text-xs text-white/85 font-medium">{study.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Bar */}
                  <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/60 py-3 px-4 text-center">
                    {study.metrics.map((m, i) => (
                      <div key={i} className={i !== 2 ? 'border-r border-slate-800/80' : ''}>
                        <div className="text-sm font-extrabold text-white">{m.value}</div>
                        <div className="text-[10px] text-slate-400">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Body Description & Tech Stack */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-300 leading-relaxed">{study.summary}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {study.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button to Open Architecture Modal */}
                <div className="px-6 pb-6">
                  <button
                    onClick={() => {
                      setActiveCaseStudy(study);
                      setActiveScreenIndex(0);
                    }}
                    className="w-full py-3 rounded-xl bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:via-orange-500 group-hover:to-amber-500 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
                  >
                    <span>Inspect Architecture & Screens</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Case Study Interactive Architecture & Screen Drawer Modal */}
        {activeCaseStudy && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${activeCaseStudy.badgeColor}`}>
                    {activeCaseStudy.category} • {activeCaseStudy.platforms.join(' & ')}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mt-2">
                    {activeCaseStudy.title} — Technical Deep Dive
                  </h3>
                  <p className="text-sm text-slate-400">{activeCaseStudy.subtitle}</p>
                </div>
                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Screen Flow Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Interactive Screen Flow Preview
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeCaseStudy.screens.map((scr, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveScreenIndex(idx)}
                      className={`p-3.5 rounded-xl text-left border transition ${
                        activeScreenIndex === idx
                          ? 'bg-indigo-600/20 border-indigo-500 text-white'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-indigo-400">Screen 0{idx + 1}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{scr.name}</div>
                      <div className="text-xs text-slate-400 mt-1">{scr.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Under-the-Hood Engineering Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Architecture & Engineering Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCaseStudy.architecture.map((point, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {activeCaseStudy.techStack.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const title = activeCaseStudy.title;
                    setActiveCaseStudy(null);
                    setContactForm((prev) => ({
                      ...prev,
                      projectDetails: `Hi Siranjeevi, I loved your ${title} case study and want to build a similar app.`
                    }));
                    scrollToSection('contact');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition"
                >
                  Build a Similar App With Me →
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. INTERACTIVE FREELANCE APP COST & TIMELINE ESTIMATOR */}
      <section id="estimator" className="relative z-10 py-20 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Instant Transparent Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Interactive App Cost & Timeline Calculator
              </h2>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl">
                Select your target platforms, screen count, and features to get an instant ballpark estimate for your project.
              </p>
            </div>

            {/* Currency Toggle (INR / USD) */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 self-start">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  currency === 'INR'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ₹ INR (India)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  currency === 'USD'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD (Global)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls (8 cols) */}
            <div className="lg:col-span-8 space-y-8 bg-slate-950/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8">
              {/* Step 1: Platform */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                  1. Select Target Platform
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'android', title: 'Android Only', sub: 'Google Play Store (Kotlin / RN)' },
                    { id: 'ios', title: 'iOS Only', sub: 'Apple App Store (Swift / RN)' },
                    { id: 'both', title: 'iOS + Android (Best Value)', sub: 'Single Codebase (React Native / Flutter)' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setEstPlatform(p.id)}
                      className={`p-4 rounded-2xl border text-left transition ${
                        estPlatform === p.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm">{p.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{p.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: App Size / Complexity */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                  2. App Scope & Complexity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'mvp', title: 'Startup MVP', sub: '5–8 Core Screens, Fast Launch' },
                    { id: 'standard', title: 'Standard Production App', sub: '10–15 Screens, Custom UI & Flows' },
                    { id: 'scale', title: 'Full-Scale Platform', sub: '20+ Screens, Multi-Role / Complex Logic' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setEstComplexity(c.id)}
                      className={`p-4 rounded-2xl border text-left transition ${
                        estComplexity === c.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm">{c.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{c.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Add-on Features */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                  3. Select Integrations & Add-on Modules
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADDON_FEATURES.map((feat) => {
                    const FeatIcon = feat.icon;
                    const isSelected = selectedAddons.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        onClick={() => toggleAddon(feat.id)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between text-left transition ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500/60 text-white'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                              isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            <FeatIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-semibold">{feat.name}</div>
                            <div className="text-[11px] text-slate-400">
                              +{currency === 'INR' ? `₹${feat.inr.toLocaleString('en-IN')}` : `$${feat.usd}`} • +{feat.weeks} wk
                            </div>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            isSelected ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Live Quote Summary Card (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/40 p-6 sm:p-8 shadow-2xl shadow-indigo-500/10 space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    Custom Project Estimate
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{estimate.platformLabel}</h3>
                </div>
                <Clock className="w-6 h-6 text-indigo-400" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-400">Estimated Investment Range</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    {estimate.minPrice} <span className="text-slate-500 text-xl">–</span> {estimate.maxPrice}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    ✓ Split into 3 safe milestone payments (40% / 30% / 30%)
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Estimated Delivery Time</span>
                  <span className="text-sm font-bold text-indigo-300">{estimate.weeksRange}</span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="font-semibold text-white">Included in Every Package:</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Full Source Code Ownership (Code2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Play Store & App Store Deployment Submission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>30 Days Free Post-Launch Bug Warranty</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyQuoteAndScroll}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition"
              >
                {quoteCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Quote Copied & Loaded Below!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Lock Estimate & Book Free Call</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEVELOPMENT PROCESS & MILESTONES */}
      <section id="process" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Zero-Risk Freelance Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            How Your App Goes From Idea to App Store
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Clear milestones, weekly testable builds on your phone, and transparent communication throughout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/90 hover:border-indigo-500/40 transition flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-400 font-medium">
                    {item.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                  Milestone Deliverable
                </span>
                <span className="text-xs font-semibold text-slate-200 mt-0.5 block">
                  {item.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT & QUICK PITCH SECTION */}
      <section id="contact" className="relative z-10 py-20 bg-slate-900/70 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Pitch & Direct Connect Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fast Response Within 4 Hours</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Let’s Build Your Mobile App Together.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Have a rough idea, an existing Figma design, or an app that needs performance rescue? Send a message or reach out directly on WhatsApp or Email for a free 20-minute architecture consultation.
              </p>

              {/* Direct Quick Contact Cards */}
              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/919876543210?text=Hi%20Siranjeevi,%20I%20would%20like%20to%20discuss%20a%20mobile%20app%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                        WhatsApp Quick Chat
                      </div>
                      <div className="text-xs text-slate-400">Instant discussion & voice notes</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                </a>

                <a
                  href="mailto:click2sira@gmail.com"
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition">
                        click2sira@gmail.com
                      </div>
                      <div className="text-xs text-slate-400">Send RFP, wireframes or scope docs</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                </a>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://Code2.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Code2 Profile</span>
                  </a>
                  <a
                    href="https://Globe.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>Globe</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Interactive Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Send a Project Inquiry</h3>
                <button
                  type="button"
                  onClick={() =>
                    setContactForm((prev) => ({
                      ...prev,
                      projectDetails: generateQuoteText()
                    }))
                  }
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Load Calculator Summary</span>
                </button>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white">Inquiry Received, {contactForm.name || 'Friend'}!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. Siranjeevi R will review your app requirements and reply within 4 hours with a tailored roadmap.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Rahul Sharma"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      WhatsApp / Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Project Brief / Estimator Summary *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell me about your app idea, target users, or click 'Load Calculator Summary' above..."
                      value={contactForm.projectDetails}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, projectDetails: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Brief & Book Discovery Call</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Siranjeevi R</span>
            <span>• Freelance Android & iOS App Developer</span>
          </div>
          <div>
            Built with React & Tailwind CSS • Ready for Play Store & App Store Launches
          </div>
        </div>
      </footer>
    </div>
  );
}
