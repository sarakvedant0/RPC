import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDown, Rocket, ArrowRight, Volume2, VolumeX, Play, Pause, Sparkles, RefreshCw } from 'lucide-react';

interface LaunchPadHeroProps {
  onStartAscent?: () => void;
  scrollFraction?: number;
}

interface Shockwave {
  id: number;
  x: number;
  y: number;
}

export const LaunchPadHero: React.FC<LaunchPadHeroProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [, setVideoLoaded] = useState<boolean>(false);
  const [isRumbling, setIsRumbling] = useState<boolean>(false);
  const [ignitionFlash, setIgnitionFlash] = useState<boolean>(false);
  const [shockwaves, setShockwaves] = useState<Shockwave[]>([]);
  const [missionTime, setMissionTime] = useState<string>('T+00:00:00');
  const [badgeText, setBadgeText] = useState<string>('REAL-TIME LAUNCH FOOTAGE');

  // Core function to trigger the live background animation
  const triggerLiveAnimation = useCallback((clickX?: number, clickY?: number, reason: 'click' | 'scroll' = 'click') => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback resume issue:', err);
        });
    }

    // Trigger launchpad camera rumble tremor
    setIsRumbling(true);
    setTimeout(() => setIsRumbling(false), 700);

    // Trigger rocket ignition atmospheric glow flash
    setIgnitionFlash(true);
    setTimeout(() => setIgnitionFlash(false), 800);

    // Update live badge text
    if (reason === 'click') {
      setBadgeText('LIVE ASCENT RE-IGNITED');
    } else {
      setBadgeText('TOP STAGE RE-ENGAGED');
    }
    setTimeout(() => setBadgeText('REAL-TIME LAUNCH FOOTAGE'), 3500);

    // Determine shockwave spawn coordinates
    let spawnX = clickX;
    let spawnY = clickY;

    if (spawnX === undefined || spawnY === undefined) {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        spawnX = rect.width / 2;
        spawnY = rect.height * 0.72; // Launchpad base location
      } else {
        spawnX = window.innerWidth / 2;
        spawnY = window.innerHeight * 0.72;
      }
    }

    const shockId = Date.now() + Math.random();
    setShockwaves((prev) => [...prev.slice(-4), { id: shockId, x: spawnX, y: spawnY }]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((sw) => sw.id !== shockId));
    }, 950);
  }, []);

  // Ensure video plays smoothly upon opening
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn('Autoplay prevented, will play on user interaction:', err);
        setIsPlaying(false);
      });
  }, [isMuted]);

  // Track live mission timer from video progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        const secs = Math.floor(videoRef.current.currentTime || 0);
        const m = String(Math.floor(secs / 60)).padStart(2, '0');
        const s = String(secs % 60).padStart(2, '0');
        setMissionTime(`T+00:${m}:${s}`);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Listen for scroll: when user scrolls down and returns to top of page, re-trigger live animation
  useEffect(() => {
    let hasScrolledDown = false;
    let debounceTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // User scrolled down into page content past the hero threshold
      if (scrollY > 250) {
        hasScrolledDown = true;
      } 
      // User returned/scrolled back to the very top of home page
      else if (scrollY <= 20 && hasScrolledDown) {
        hasScrolledDown = false;
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          triggerLiveAnimation(undefined, undefined, 'scroll');
        }, 120);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [triggerLiveAnimation]);

  // Click on background of starting home page triggers live animation
  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    // Do not trigger background ignition if user clicked directly on interactive buttons or links
    if (target.closest('button, a, input, select, textarea, [role="button"]')) {
      return;
    }

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      triggerLiveAnimation(x, y, 'click');
    } else {
      triggerLiveAnimation(undefined, undefined, 'click');
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (nextMuted === false && video.paused) {
      video.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleSectionClick}
      title="Click background to re-ignite live launch animation"
      className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 z-20 overflow-hidden cursor-pointer select-none"
    >
      {/* 
        Video Background:
        Strictly uses the rocket launch video as background when website is opened.
        Any watermark, logo, or 'renderfirst' text is completely removed/cropped
        by applying scale-110, overflow-hidden and bottom-safe gradient overlays.
      */}
      <div
        className={`absolute inset-0 -z-10 overflow-hidden bg-black transition-transform duration-300 ${
          isRumbling ? 'animate-launch-rumble' : ''
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          poster="/src/assets/images/hero_launchpad_night_1791403773688.jpg"
          className="w-full h-full object-cover object-center scale-110 sm:scale-108 transition-all duration-700 filter brightness-[0.70] contrast-[1.12]"
        >
          <source src="/videos/rocket_liftoff.mp4" type="video/mp4" />
          <source src="/src/assets/videos/rocket_liftoff.mp4" type="video/mp4" />
          <source src="/videos/launch_bg.mp4" type="video/mp4" />
          <source src="/src/assets/videos/launch_bg.mp4" type="video/mp4" />
        </video>

        {/* Dynamic ignition burst overlay on click / scroll to top */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            ignitionFlash
              ? 'opacity-90 bg-gradient-to-t from-amber-500/35 via-orange-600/20 to-transparent'
              : 'opacity-0'
          }`}
        />

        {/* Cinematic gradient scrims: guarantee zero watermark or text leakage and provide superior typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020306] via-[#020306]/65 to-[#020306]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#020306]/30 to-[#020306]/90 pointer-events-none" />
        
        {/* Bottom edge mask to guarantee any lower watermark is concealed */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#020306] to-transparent pointer-events-none" />

        {/* Interactive shockwave rings spawned on background clicks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {shockwaves.map((sw) => (
            <div
              key={sw.id}
              className="absolute w-32 h-32 rounded-full border-2 border-amber-400/90 shadow-[0_0_60px_rgba(245,158,11,0.8)] animate-shockwave pointer-events-none"
              style={{ left: `${sw.x}px`, top: `${sw.y}px` }}
            />
          ))}
        </div>
      </div>

      {/* Top Credentials Ribbon */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between cursor-auto">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-slate-300 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-800 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>COEP TECHNOLOGICAL UNIVERSITY · EST. 1854</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-sky-400 hidden sm:inline">MECHANICAL ENGINEERING</span>
        </div>

        {/* Ambient Video & Audio Controls + Live Indicator */}
        <div className="flex items-center gap-2">
          {/* Clickable Live Badge */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerLiveAnimation(undefined, undefined, 'click');
            }}
            className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-black/80 hover:bg-black px-3 py-1.5 rounded-lg border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer backdrop-blur-md shadow-sm"
            title="Click to trigger live launch sequence"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">{badgeText}</span>
            <span className="text-slate-500 hidden md:inline">|</span>
            <span className="text-amber-400 hidden md:inline">{missionTime}</span>
            <RefreshCw className="w-3 h-3 text-emerald-400 ml-1 opacity-70 hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black/90 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
            title={isMuted ? 'Unmute launch audio' : 'Mute audio'}
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-[10px]">UNMUTE</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline text-[10px] text-emerald-300">AUDIO ON</span>
              </>
            )}
          </button>

          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black/90 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
            title={isPlaying ? 'Pause launch video' : 'Play launch video'}
            aria-label="Toggle Playback"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline text-[10px]">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-[10px]">PLAY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Center Display Lockup */}
      <div className="max-w-4xl mx-auto w-full text-center my-auto py-8 sm:py-12 cursor-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-sm">
          <Rocket className="w-3.5 h-3.5 text-sky-400" />
          <span>ROCKET PROPULSION CENTRE · COEP TECH</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-white tracking-tight uppercase leading-[1.08] mb-5 text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Reach Beyond The Atmosphere.
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed mb-6 text-balance drop-shadow-md">
          Student-built solid and hybrid sounding rockets, designed, tested, and launched from the ground up by the Rocket Propulsion Centre, COEP Technological University, Pune.
        </p>

        {/* Interactive Cue: Hint for background click animation */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 text-[11px] font-mono text-amber-300 mb-8 backdrop-blur-md animate-pulse">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>CLICK ANYWHERE ON BACKGROUND OR SCROLL TO TOP TO RE-IGNITE LIVE LAUNCH</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="#hardware-slider"
            onClick={(e) => e.stopPropagation()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs font-mono rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 active:scale-95 border border-blue-400/30 cursor-pointer"
          >
            <span>EXPLORE ROCKETS</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#team"
            onClick={(e) => e.stopPropagation()}
            className="px-6 py-3 bg-slate-900/80 hover:bg-slate-800/90 border border-white/20 text-white text-xs font-mono rounded-xl transition-all active:scale-95 backdrop-blur-md flex items-center gap-2 cursor-pointer"
          >
            <span>OUR TEAM</span>
          </a>

          <a
            href="#about"
            onClick={(e) => e.stopPropagation()}
            className="px-6 py-3 bg-black/60 hover:bg-black/80 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono rounded-xl transition-all active:scale-95 backdrop-blur-md cursor-pointer"
          >
            <span>ABOUT RPC</span>
          </a>
        </div>

        {/* Stats Strip: Authentic RPC metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left font-mono text-xs">
          <div className="p-3.5 bg-black/75 backdrop-blur-md border border-slate-800/90 rounded-xl hover:border-slate-700 transition-all">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">FLIGHT LAUNCHES</div>
            <div className="text-white font-bold text-lg sm:text-xl mt-0.5 font-heading">04+</div>
            <div className="text-[10px] text-sky-400">Proving Campaigns</div>
          </div>

          <div className="p-3.5 bg-black/75 backdrop-blur-md border border-slate-800/90 rounded-xl hover:border-slate-700 transition-all">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">ACTIVE PROJECTS</div>
            <div className="text-white font-bold text-lg sm:text-xl mt-0.5 font-heading">03+</div>
            <div className="text-[10px] text-emerald-400">SRAD Solid & Hybrid</div>
          </div>

          <div className="p-3.5 bg-black/75 backdrop-blur-md border border-slate-800/90 rounded-xl hover:border-slate-700 transition-all">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">STUDENT CADRE</div>
            <div className="text-white font-bold text-lg sm:text-xl mt-0.5 font-heading">50+</div>
            <div className="text-[10px] text-cyan-400">Engineers & Researchers</div>
          </div>

          <div className="p-3.5 bg-black/75 backdrop-blur-md border border-slate-800/90 rounded-xl hover:border-slate-700 transition-all">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">INSTITUTION</div>
            <div className="text-white font-bold text-lg sm:text-xl mt-0.5 font-heading">COEP TECH</div>
            <div className="text-[10px] text-amber-400">Est. 1854 Legacy</div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 cursor-auto">
        <a
          href="#hardware-slider"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 hover:text-sky-300 transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE VEHICLES & SUBSYSTEMS</span>
          <ChevronDown className="w-4 h-4 text-sky-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
