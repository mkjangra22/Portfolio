import { useEffect, useRef, useState, MouseEvent } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { Mail, Check, Copy, Twitter, Linkedin, Dribbble, Github, Instagram } from "lucide-react";

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // 1. Initialize HLS Video (flipped scale-y-[-1])
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log("HLS Play failed:", err));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.log("Native Play failed:", err));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // 2. Initialize GSAP Infinite Scrolling Marquee
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const animation = gsap.to(marquee, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  // Copy email helper
  const handleCopy = async (e: MouseEvent) => {
    e.preventDefault();

    const email = "mayankjangra2015@gmail.com";

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: unknown) {
      console.error("Failed to copy email:", err);

      // Still show feedback so user knows something happened
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const socials = [
    { label: "Instagram", url: "https://www.instagram.com/mkjangra22/", icon: <Instagram className="w-4 h-4" /> },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mkjangra22/", icon: <Linkedin className="w-4 h-4" /> },
    { label: "GitHub", url: "https://github.com/mkjangra22", icon: <Github className="w-4 h-4" /> },
  ];

  return (
    <footer
      id="contact"
      className="relative pt-24 pb-8 md:pb-12 bg-bg border-t border-stroke overflow-hidden"
    >
      {/* Background flipped HLS video with heavier overlays */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-25 scale-y-[-1]"
        />
        {/* Dark overlay (heavier bg-black/60) */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        {/* Top fade transition */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* GSAP Infinite Marquee Ribbon */}
        <div className="w-full overflow-hidden border-t border-b border-stroke/40 py-5 bg-surface/5 backdrop-blur-sm mb-16 sm:mb-20">
          <div className="flex whitespace-nowrap w-[200%] md:w-[200%]" ref={marqueeRef}>
            {/* Set 1 */}
            <div className="flex justify-around min-w-full font-display italic text-2xl sm:text-4xl md:text-5xl uppercase tracking-wider text-text-primary/70">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={`dup1-${i}`} className="inline-flex items-center gap-6">
                  <span>BUILDING THE FUTURE</span>
                  <span className="text-[#89AACC]">•</span>
                </span>
              ))}
            </div>
            {/* Set 2 (duplicates first set exactly for continuous loop) */}
            <div className="flex justify-around min-w-full font-display italic text-2xl sm:text-4xl md:text-5xl uppercase tracking-wider text-text-primary/70">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={`dup2-${i}`} className="inline-flex items-center gap-6">
                  <span>BUILDING THE FUTURE</span>
                  <span className="text-[#89AACC]">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Core CTA */}
        <div className="max-w-xl text-center px-6 flex flex-col items-center mb-16 sm:mb-24">
          <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-mono mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-text-primary mb-8 font-sans">
            Let's start the <span className="font-display italic">journey</span>
          </h2>

          {/* Email button with gradient hover border ring */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <a
              id="cta-email-mailto"
href="mailto:mayankjangra2015@gmail.com"
              className="group relative inline-flex items-center gap-3 bg-surface border border-stroke text-text-primary text-sm font-semibold rounded-full px-8 py-4 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
            >
              {/* Outer gradient hover border ring */}
              <span className="absolute -inset-[1.5px] bg-transparent rounded-full group-hover:accent-gradient -z-10 transition-all duration-300" />
              <Mail className="w-4 h-4 text-[#89AACC]" />
              <span>mayankjangra2015@gmail.com</span>
            </a>

            {/* Quick copy convenience button */}
            <button
              id="cta-email-copy"
              onClick={handleCopy}
              className="group flex p-4 rounded-full border border-stroke bg-surface/50 hover:bg-surface text-muted hover:text-text-primary transition-all duration-300 scale-90 hover:scale-100 cursor-pointer shadow-lg"
              title="Copy email to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400 animate-pulse" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {copied && (
            <span className="text-[10px] text-green-400 font-mono mt-3 animate-fade-in">
              Email copied to clipboard successfully!
            </span>
          )}
        </div>

        {/* Footer Bar */}
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Leftside: Pulser availability */}
          <div className="flex items-center gap-2.5" id="footer-availability">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-muted tracking-tight">
              Available for AI/ML & Development projects
            </span>
          </div>

          {/* Centered copyright/details */}
          <div className="text-muted/40 font-mono text-[9px] text-center sm:text-left">
            © mkjangra22. ALL RIGHTS RESERVED.
          </div>

          {/* Rightside: Socials */}
          <div className="flex items-center gap-3" id="footer-social-links">
            {socials.map((soc) => (
              <a
                key={soc.label}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-8 h-8 rounded-full border border-stroke/70 bg-surface/25 flex items-center justify-center text-muted hover:text-text-primary hover:border-stroke hover:bg-surface transition-all duration-300"
                title={soc.label}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
