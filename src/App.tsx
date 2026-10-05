/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Dialog } from "@/src/components/ui/dialog.tsx";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Studio", href: "#studio" },
  { name: "About", href: "#about" },
  { name: "Journal", href: "#journal" },
  { name: "Reach Us", href: "#contact" },
];

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [journeyModalOpen, setJourneyModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may need user gesture in strict browsers
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleNavClick = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveNav(name);
    setMobileMenuOpen(false);

    if (name === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveModalTab(name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 4000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#002238] text-foreground font-sans">
      {/* Fullscreen Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Navigation Bar */}
      <header className="relative z-10 w-full">
        <nav
          className="relative z-10 flex row justify-between items-center px-8 py-6 max-w-7xl mx-auto"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav("Home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-3xl tracking-tight text-foreground transition-opacity hover:opacity-90 select-none flex items-baseline"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Velorah<sup className="text-xs">®</sup>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeNav === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.name, e)}
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Actions: CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setJourneyModalOpen(true);
              }}
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
            >
              Begin Journey
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden liquid-glass rounded-full p-2.5 text-foreground hover:scale-[1.05] transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 px-6 py-5 bg-[#001726]/90 backdrop-blur-xl border-b border-white/10 z-20 animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col space-y-4 max-w-sm mx-auto">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={(e) => handleNavClick(link.name, e)}
                  className={`text-left text-base py-2 transition-colors ${
                    activeNav === link.name
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] max-w-7xl mx-auto my-auto">
        {/* H1 Heading */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise select-none"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-muted-foreground">dreams</em> rise{" "}
          <em className="not-italic text-muted-foreground">through the silence.</em>
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          We're designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        {/* Hero CTA button */}
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setJourneyModalOpen(true);
          }}
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2"
        >
          Begin Journey
        </button>
      </main>

      {/* Discreet Ambient Video Controls in bottom-right corner */}
      <footer className="relative z-10 w-full px-8 py-5 flex justify-between items-center text-xs text-muted-foreground/80 pointer-events-none">
        <span className="hidden sm:inline-block tracking-widest uppercase text-[10px] text-muted-foreground/60">
          Crafted for the quiet era
        </span>
        <div className="flex items-center gap-3 pointer-events-auto ml-auto">
          <button
            type="button"
            onClick={togglePlay}
            className="liquid-glass rounded-full px-3 py-1.5 text-xs text-foreground/80 hover:text-foreground flex items-center gap-1.5 transition-all"
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isPlaying ? "Live Motion" : "Paused"}</span>
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className="liquid-glass rounded-full p-2 text-foreground/80 hover:text-foreground transition-all"
            title={isMuted ? "Unmute audio track" : "Mute audio track"}
            aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </footer>

      {/* "Begin Journey" Interactive Modal Dialog */}
      <Dialog open={journeyModalOpen} onOpenChange={setJourneyModalOpen}>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90">
              <Sparkles className="w-3.5 h-3.5" /> Early Access Initiation
            </span>
            <h2
              className="text-4xl tracking-tight text-white pt-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Step into the Silence
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Velorah is opening private realms for architects, writers, and visionaries. Enter your email to receive early invitations.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-medium text-white">Your journey has commenced</h3>
              <p className="text-xs text-muted-foreground">
                We have recorded <strong className="text-white">{email}</strong>. Watch for an invitation sealed in quiet elegance.
              </p>
              <button
                type="button"
                onClick={() => setJourneyModalOpen(false)}
                className="liquid-glass rounded-full px-6 py-2 text-xs text-white hover:scale-[1.03] mt-2 inline-block"
              >
                Return to Sanctuary
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-foreground text-left">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="creator@velorah.studio"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full liquid-glass rounded-full py-3.5 text-sm text-white font-medium hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Request Key to Velorah</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-muted-foreground/70">
                Pure encryption. Zero spam. Complete tranquility.
              </p>
            </form>
          )}
        </div>
      </Dialog>

      {/* Nav Link Information Dialog (Studio, About, Journal, Reach Us) */}
      <Dialog
        open={activeModalTab !== null}
        onOpenChange={(open) => {
          if (!open) setActiveModalTab(null);
        }}
      >
        {activeModalTab === "Studio" && (
          <div className="space-y-4">
            <h2
              className="text-4xl tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Velorah Studio
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our studio crafts bespoke digital environments where deep concentration thrives. We strip away notification clutter, algorithmic friction, and visual noise to leave only pure creative flow.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-semibold text-white">Monolith Engine</div>
                <div className="text-[11px] text-muted-foreground mt-1">Zero-latency thinking canvas</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-semibold text-white">Aura Sync</div>
                <div className="text-[11px] text-muted-foreground mt-1">Biometric focus harmonics</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveModalTab(null);
                setJourneyModalOpen(true);
              }}
              className="liquid-glass rounded-full px-6 py-2.5 text-xs text-white hover:scale-[1.03] mt-2 inline-block w-full text-center"
            >
              Join the Studio Waitlist
            </button>
          </div>
        )}

        {activeModalTab === "About" && (
          <div className="space-y-4">
            <h2
              className="text-4xl tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Our Philosophy
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In an era dominated by relentless stimuli, the greatest luxury is sustained attention. Velorah was founded on the belief that profound ideas require quiet, intentional spaces.
            </p>
            <blockquote className="border-l-2 border-white/30 pl-4 py-1 italic text-white/90 text-sm">
              "Silence is not the absence of sound; it is the presence of clarity."
            </blockquote>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We construct digital sanctuaries where visionaries can shape their finest masterworks without interruption.
            </p>
          </div>
        )}

        {activeModalTab === "Journal" && (
          <div className="space-y-4">
            <h2
              className="text-4xl tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              The Journal
            </h2>
            <div className="space-y-3 text-left">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Vol. IV — Focus</span>
                <div className="text-sm font-medium text-white">The Architecture of Stillness</div>
                <p className="text-xs text-muted-foreground mt-1">
                  How minimal acoustic and visual friction rewires creative momentum.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Vol. III — Craft</span>
                <div className="text-sm font-medium text-white">Tactile Interfaces in a Flat World</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Refining micro-interactions with glassmorphic depth and analog warmth.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeModalTab === "Reach Us" && (
          <div className="space-y-4">
            <h2
              className="text-4xl tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Reach Us
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We welcome private inquiries, architectural collaborations, and thoughtful dialogues from creators worldwide.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Direct Desk:</span>
                <span className="text-white font-mono">sanctuary@velorah.studio</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="text-white">Zurich / Kyoto / Cloud</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveModalTab(null);
                setJourneyModalOpen(true);
              }}
              className="liquid-glass rounded-full px-6 py-2.5 text-xs text-white hover:scale-[1.03] mt-2 inline-block w-full text-center"
            >
              Dispatch a Message
            </button>
          </div>
        )}
      </Dialog>
    </div>
  );
}
