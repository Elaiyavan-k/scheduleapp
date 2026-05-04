/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Download, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Bookmark, 
  Globe, 
  ChevronRight, 
  Menu, 
  X, 
  ShieldAlert, 
  Smartphone,
  ExternalLink,
  ArrowRight,
  Share2
} from "lucide-react";
import { useState } from "react";

// Asset paths - pointing to /public/ folder for easy local replacement
// You can replace these files in your public folder to update the mockup images!
const ASSETS = {
  icon: "assets/images/schedule_app_icon_1777878762042.png",
  hero: "mockups/hero.png",
  attendance: "mockups/attendance.png",
  schedule: "mockups/schedule.png",

  heroFallback: "assets/images/hero_mockup_1777878780771.png",
  attendanceFallback: "assets/images/attendance_screenshot_1777878800693.png",
  scheduleFallback: "assets/images/schedule_screenshot_1777878819563.png",
};

const FEATURES = [
  {
    icon: <Calendar className="w-6 h-6 text-blue-500" />,
    title: "View Schedule",
    description: "Access your daily and weekly class schedules with a single tap. No more digging through emails."
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
    title: "Check Attendance",
    description: "Keep track of your attendance percentage in real-time. Stay on top of your academic record."
  },
  {
    icon: <FileText className="w-6 h-6 text-purple-500" />,
    title: "Apply Leave",
    description: "Submit leave applications directly from the app. Simple, fast, and hassle-free."
  },
  {
    icon: <Bookmark className="w-6 h-6 text-orange-500" />,
    title: "Book Resources",
    description: "Quickly book library seats, labs, or other campus resources whenever you need them."
  },
  {
    icon: <Globe className="w-6 h-6 text-cyan-500" />,
    title: "All-in-One App",
    description: "Your entire college portal, wrapped in a smooth mobile experience. No browser switching required."
  }
];

const INSTALL_STEPS = [
  { step: 1, title: "Download APK", desc: "Click the download button to get the latest scheduleapp.apk file." },
  { step: 2, title: "Open File", desc: "Locate the downloaded file in your notifications or file manager." },
  { step: 3, title: "Enable Unknown Apps", desc: "If prompted, allow your browser to 'Install unknown apps' in settings." },
  { step: 4, title: "Install and Use", desc: "Follow the on-screen instructions to finish installation and start using." }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ScheduleApp - Your college portal, simplified',
          text: 'Check out ScheduleApp for Saveetha college portal!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      // Fallback for browsers that don't support share
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const ImageWithFallback = ({ src, fallback, alt, className }: { src: string, fallback: string, alt: string, className?: string }) => {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallback;
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">ScheduleApp</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo('why')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Why ScheduleApp?</button>
              <button onClick={() => scrollTo('features')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Features</button>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-slate-400">v1.0 • 5.2 MB</span>
                <button onClick={() => scrollTo('download')} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-sm shadow-md transition-all active:scale-95">Download APK</button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-blue-100 px-4 pt-2 pb-6 flex flex-col gap-4 shadow-xl"
          >
            <button onClick={() => scrollTo('why')} className="text-left py-2 font-semibold text-slate-600">Why ScheduleApp?</button>
            <button onClick={() => scrollTo('features')} className="text-left py-2 font-semibold text-slate-600">Features</button>
            <button onClick={() => scrollTo('download')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-center shadow-lg shadow-blue-200">Download APK</button>
          </motion.div>
        )}
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" className="relative py-20 lg:py-32 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                Personal Convenience Tool
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Your college portal, <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">simplified.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                Tired of navigating the clunky mobile web? Access attendance, leave applications, and your schedule in one native experience. Built specifically for Saveetha students.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="scheduleapp.apk" 
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group active:scale-95"
                >
                  <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
                  Download APK
                </a>
                <button 
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-white text-slate-900 border border-blue-50 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                >
                  <Share2 className="w-5 h-5 text-blue-600" />
                  Share App
                </button>
              </div>
            </motion.div>

            <div className="lg:col-span-7 flex justify-center lg:justify-end items-center px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 w-full max-w-[320px] aspect-[9/18] bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl border-[8px] border-slate-800">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-800 rounded-b-3xl z-20"></div>
                  <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col relative">
                    <ImageWithFallback src={ASSETS.hero} fallback={ASSETS.heroFallback} alt="App Mockup" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-blue-200/40 rounded-full -z-10 blur-3xl" />
                <div className="absolute -top-10 -left-10 w-56 h-56 bg-indigo-200/30 rounded-full -z-10 blur-3xl animate-pulse" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why This App Section */}
        <section id="why" className="py-24 px-4 bg-white/50 backdrop-blur-sm border-y border-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeIn}>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Why ScheduleApp?</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Wraps <a href="https://learner.saveetha.in/" target="_blank" className="text-blue-600 font-bold hover:underline">learner.saveetha.in</a> into a fast, mobile-first interface. Everything in one place without the need for constant browser switching or session timeouts.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-blue-50 shadow-sm flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Designed for Mobile</h4>
                      <p className="text-sm text-slate-500">The desktop portal is clunky on phones. ScheduleApp is built for your screen.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-blue-50 shadow-sm flex gap-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Native Experience</h4>
                      <p className="text-sm text-slate-500">Fast navigation and smooth transitions let you find what you need in seconds.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex gap-6">
                <div className="flex-1 p-8 bg-white border border-blue-50 rounded-[2rem] text-center shadow-lg shadow-blue-100/20">
                  <div className="text-xs text-slate-400 uppercase font-extrabold tracking-widest mb-2">Status</div>
                  <div className="text-2xl font-black text-emerald-600">Stable v1.0</div>
                  <div className="w-full h-1 bg-emerald-100 rounded-full mt-4">
                    <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 p-8 bg-white border border-blue-50 rounded-[2rem] text-center shadow-lg shadow-indigo-100/20">
                  <div className="text-xs text-slate-400 uppercase font-extrabold tracking-widest mb-2">File Size</div>
                  <div className="text-2xl font-black text-slate-900">5.2 MB</div>
                  <div className="text-xs text-slate-500 mt-2">Space Optimized</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeIn} className="text-center mb-16 px-4">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Everything you need, <br className="sm:hidden" /><span className="text-blue-600">better.</span></h2>
              <p className="text-slate-500 max-w-2xl mx-auto font-medium">Native features that make managing college life effortless.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  key={idx}
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-white border border-blue-50 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-200/40 transition-all group"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="py-24 bg-white/30 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 lg:order-2">
                <motion.div {...fadeIn}>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">Interface <br /><span className="text-indigo-600">Spotlight</span></h2>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Designed by students, for students. We prioritized readability and speed so you can get in, check your attendance, and get out.
                  </p>
                  <button onClick={() => scrollTo('download')} className="group flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all">
                    Start Using Now <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>

              <div className="lg:col-span-8 lg:order-1">
                <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
                  <motion.div 
                    {...fadeIn}
                    className="w-full max-w-[220px] aspect-[9/18] bg-slate-900 rounded-[2.5rem] border-[4px] border-slate-700 shadow-2xl relative overflow-hidden mt-12"
                  >
                    <ImageWithFallback src={ASSETS.attendance} fallback={ASSETS.attendanceFallback} alt="Attendance" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </motion.div>
                  <motion.div 
                    {...fadeIn} 
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-[240px] aspect-[9/18] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden"
                  >
                    <ImageWithFallback src={ASSETS.hero} fallback={ASSETS.heroFallback} alt="Home" className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div 
                    {...fadeIn} 
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-[220px] aspect-[9/18] bg-slate-900 rounded-[2.5rem] border-[4px] border-slate-700 shadow-2xl relative overflow-hidden mt-12"
                  >
                    <ImageWithFallback src={ASSETS.schedule} fallback={ASSETS.scheduleFallback} alt="Schedule" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation & Download Combined */}
        <section id="download" className="py-24 px-4 bg-blue-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-indigo-700 -z-0" 
            style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }} />
          
          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">Get Started in Seconds</h2>
              <p className="text-blue-50 text-lg mb-8 leading-relaxed max-w-lg">
                Join thousands of students who have simplified their college portal access. Download the APK and follow the guide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="scheduleapp.apk"
                  className="bg-white text-blue-700 px-10 py-4 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/30 active:scale-95 flex items-center justify-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  Download APK
                </a>
                <button 
                  onClick={handleShare}
                  className="bg-blue-500/20 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-xl hover:bg-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <Share2 className="w-6 h-6" />
                  Share Link
                </button>
              </div>

              <div className="flex gap-8 text-xs font-bold text-white/70 uppercase tracking-widest">
                <div className="flex flex-col">
                  <span>Version</span>
                  <span className="text-white text-sm font-black">v1.0 (Stable)</span>
                </div>
                <div className="flex flex-col">
                  <span>Size</span>
                  <span className="text-white text-sm font-black">5.2 MB</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn} 
              className="bg-slate-800 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-2xl border border-white/5"
            >
              <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
                How to Install
              </h4>
              <div className="space-y-6">
                {INSTALL_STEPS.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <span className="text-sm font-mono text-slate-500 group-hover:text-blue-400 transition-colors mt-1 font-bold">0{item.step}.</span>
                    <div>
                      <h5 className="font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-700">
                <p className="text-xs text-slate-500 font-medium">Safe & Secure: ScheduleApp never stores your credentials. It connects directly to the official portal.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Disclaimer section */}
        <section className="py-20 px-4 bg-white/50 border-t border-blue-50">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeIn} className="text-center">
              <ShieldAlert className="w-10 h-10 text-slate-400 mx-auto mb-4" />
              <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-6">Transparency Report</div>
              <div className="space-y-4 text-slate-500 text-xs leading-relaxed max-w-xl mx-auto font-medium">
                <p>
                  <strong>Non-Official Tool:</strong> This is a personal convenience application developed for the benefit of the student community. It is not affiliated with, endorsed by, or sponsored by Saveetha Engineering College.
                </p>
                <p>
                  <strong>Website Wrapper:</strong> The app behaves as a specialized web-view container for <a href="https://learner.saveetha.in/" className="text-blue-600 underline">learner.saveetha.in</a>. All functionality, content, and trademarks belong to their respective institution owners.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-md py-8 px-8 border-t border-blue-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-[10px] font-bold">S</div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">ScheduleApp</span>
          </div>
          
          <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold text-center">
            Built with ❤️ by <span className="text-blue-600">ELXI (@elxiyxvxn)</span>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-blue-50 transition-colors pointer-events-none opacity-50">
               <Globe className="w-4 h-4 text-slate-400" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-blue-50 transition-colors pointer-events-none opacity-50">
               <Smartphone className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
