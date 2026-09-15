import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import {
  Anchor,
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  Circle,
  Compass,
  Crown,
  Eye,
  Flame,
  Menu,
  Shield,
  Sparkles,
  Waves,
  X,
} from "lucide-react";

const ART_FIRE_FIST = "/images/ace-fire-fist.png";
const ART_FUTURISTIC = "/images/ace-futuristic-wallpaper.png";

const chapters = [
  {
    number: "01",
    title: "The fire within",
    copy: "Portgas D. Ace carried a flame that never asked permission to burn. This is an interactive tribute to the will that keeps moving forward.",
    icon: Flame,
    accent: "ember",
  },
  {
    number: "02",
    title: "A sea of possibility",
    copy: "Every horizon is a dare. Every current is a choice. Set your course through a world built for the fearless.",
    icon: Waves,
    accent: "gold",
  },
  {
    number: "03",
    title: "Leave a legend",
    copy: "The strongest treasure is the mark you leave behind — not the crown, but the people who sail because you did.",
    icon: Crown,
    accent: "ember",
  },
];

const sparks = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${6 + ((index * 17) % 90)}%`,
  top: `${10 + ((index * 29) % 82)}%`,
  delay: `${(index % 7) * 0.55}s`,
  duration: `${4 + (index % 4)}s`,
  size: `${2 + (index % 3)}px`,
}));
const lightningBolts = [
  {
    id: 1,
    className: "lightning-bolt lightning-bolt-one",
    d: "M 0 38 L 18 25 L 13 20 L 42 0",
  },
  {
    id: 2,
    className: "lightning-bolt lightning-bolt-two",
    d: "M 8 4 L 25 20 L 20 27 L 48 43",
  },
  {
    id: 3,
    className: "lightning-bolt lightning-bolt-three",
    d: "M 38 8 L 29 19 L 34 24 L 12 48",
  },
  {
    id: 4,
    className: "lightning-bolt lightning-bolt-four",
    d: "M 5 27 L 19 22 L 24 29 L 45 17",
  },
];
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [mouse, setMouse] = useState({ x: 52, y: 44 });
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const chapter = document.getElementById("chapter-02");
      if (chapter) {
        const rect = chapter.getBoundingClientRect();
        setActiveChapter(rect.top < window.innerHeight * 0.55 ? 1 : 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const updateMouse = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <main className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className={`site-nav ${loaded ? "is-ready" : ""}`}>
        <button className="brand" onClick={() => scrollToSection("top")} aria-label="Back to top">
          <span className="brand-mark"><Flame size={18} strokeWidth={2.5} /></span>
          <span>FIRE FIST<span className="brand-dot">.</span></span>
        </button>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <button className="nav-link active" onClick={() => { scrollToSection("top"); setMenuOpen(false); }}>Home</button>
          <button className="nav-link" onClick={() => { scrollToSection("story"); setMenuOpen(false); }}>The story</button>
          <button className="nav-link" onClick={() => { scrollToSection("crew"); setMenuOpen(false); }}>The crew</button>
          <button className="nav-link" onClick={() => { scrollToSection("manifesto"); setMenuOpen(false); }}>Manifesto</button>
        </nav>
        <button className="nav-cta" onClick={() => scrollToSection("manifesto")}>
          <span>Start the voyage</span><ArrowUpRightIcon />
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section
        id="top"
        ref={heroRef}
        className={`hero ${loaded ? "is-loaded" : ""}`}
        style={{ "--mx": `${mouse.x}%`, "--my": `${mouse.y}%` } as CSSProperties}
        onPointerMove={updateMouse}
        onPointerLeave={() => setMouse({ x: 52, y: 44 })}
      >
        <img className="hero-art hero-art-dim" src={ART_FUTURISTIC} alt="Futuristic artwork of Portgas D. Ace surrounded by fire" onLoad={() => setLoaded(true)} />
        <img className="hero-art hero-art-reveal" src={ART_FIRE_FIST} alt="" aria-hidden="true" />
        <div className="hero-vignette" />
        <div className="hero-grid" />

        <div className="cursor-glow" aria-hidden="true" />

        <div className="lightning-cursor" aria-hidden="true">
          <div className="lightning-core" />

          {lightningBolts.map((bolt) => (
            <svg
              key={bolt.id}
              className={bolt.className}
              viewBox="0 0 50 50"
              preserveAspectRatio="none"
            >
              <path d={bolt.d} />
            </svg>
          ))}

          <span className="lightning-spark spark-a" />
          <span className="lightning-spark spark-b" />
          <span className="lightning-spark spark-c" />
          <span className="lightning-spark spark-d" />
        </div>

        <div className="spark-field" aria-hidden="true">
          {sparks.map((spark) => <span key={spark.id} className="spark" style={{ left: spark.left, top: spark.top, animationDelay: spark.delay, animationDuration: spark.duration, width: spark.size, height: spark.size } as CSSProperties} />)}
        </div>
        <div className="hero-content container">
          <div className="hero-kicker"><span className="eyebrow-line" /> THE WILL OF FIRE <span className="eyebrow-line" /></div>
          <p className="hero-index">01 / 03 <span>Scroll to sail</span></p>
          <h1><span>Burn</span><em>brighter.</em></h1>
          <p className="hero-deck">A digital tribute to the ones who choose their own tide — built from flame, freedom, and an unbreakable promise.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollToSection("story")}>
              Enter the story <ArrowRight size={16} />
            </button>
            <button className="button button-ghost" onClick={() => scrollToSection("crew")}>
              <Eye size={17} /> Explore the world
            </button>
          </div>
        </div>
        <div className="hero-aside">
          <span className="vertical-label">PORTGAS D. ACE / 17.08.2026</span>
          <div className="aside-rule" />
          <span className="vertical-label muted">THE FIRE NEVER DIES</span>
        </div>
        <button className="scroll-cue" onClick={() => scrollToSection("story")}>
          <span className="scroll-cue-ring"><ChevronDown size={17} /></span>
          <span>Discover below</span>
        </button>
      </section>

      <section className="signal-strip" aria-label="Experience highlights">
        <div className="container signal-inner">
          <div className="signal-item"><span className="signal-icon"><Sparkles size={15} /></span><span>Interactive art direction</span></div>
          <div className="signal-item"><span className="signal-icon"><Compass size={15} /></span><span>Built for the fearless</span></div>
          <div className="signal-item"><span className="signal-icon"><Anchor size={15} /></span><span>Always find your north</span></div>
          <div className="signal-tag">MOVE WITH THE CURRENT <ArrowDownRight size={14} /></div>
        </div>
      </section>

      <section id="story" className="story-section section-pad">
        <div className="container story-layout">
          <div className="section-intro reveal-up">
            <p className="section-label"><span>02</span> / THE STORY</p>
            <h2>Some fires<br /><i>choose</i> to stay.</h2>
            <p className="section-copy">There is a certain kind of strength in refusing to go quietly. In the Grand Line, the people who matter most are the ones who turn their conviction into a beacon.</p>
            <button className="text-link" onClick={() => scrollToSection("manifesto")}>Read the full manifesto <ArrowRight size={16} /></button>
          </div>
          <div className="story-card reveal-up" style={{ transitionDelay: "100ms" }}>
            <div className="story-card-art"><img src={ART_FIRE_FIST} alt="Ace surrounded by fire" /></div>
            <div className="story-card-overlay" />
            <div className="story-card-meta"><span>THE FLAME WITHIN</span><span>EST. 1997</span></div>
            <div className="story-card-caption"><span className="caption-number">01</span><div><p>“I don’t want to conquer anything.</p><p>It’s just that the person with the most freedom on the sea is the Pirate King.”</p></div></div>
          </div>
        </div>
      </section>

      <section id="crew" className="chapters-section section-pad">
        <div className="container">
          <div className="section-head">
            <div><p className="section-label"><span>03</span> / CHAPTERS</p><h2>Find your <i>current.</i></h2></div>
            <p className="section-head-copy">Three signals for the journey ahead. Pick one, then make it yours.</p>
          </div>
          <div className="chapter-grid">
            {chapters.map((chapter, index) => {
              const Icon = chapter.icon;
              return <button key={chapter.number} id={index === 1 ? "chapter-02" : undefined} className={`chapter-card ${activeChapter === index ? "is-active" : ""} ${chapter.accent}`} onClick={() => setActiveChapter(index)}>
                <div className="chapter-top"><span className="chapter-number">{chapter.number}</span><Icon size={20} strokeWidth={1.5} /></div>
                <div className="chapter-bottom"><h3>{chapter.title}</h3><p>{chapter.copy}</p><span className="chapter-arrow"><ArrowUpRightIcon /></span></div>
              </button>;
            })}
          </div>
        </div>
      </section>

      <section id="manifesto" className="manifesto-section section-pad">
        <div className="manifesto-orbit orbit-one" /><div className="manifesto-orbit orbit-two" />
        <div className="container manifesto-inner">
          <div className="manifesto-mark"><Circle size={9} fill="currentColor" /><span>FIRE FIST ARCHIVE / 001</span></div>
          <h2>Keep the flame.<br /><span>Make waves.</span></h2>
          <p>Take the first step into a world where the sea is wide, the rules are optional, and the next chapter is waiting for your name.</p>
          <button className="button button-primary" onClick={() => scrollToSection("top")}>Set sail <ArrowRight size={16} /></button>
          <div className="manifesto-stamp"><Shield size={19} /><span>NO REGRETS<br /><small>ONLY HORIZONS</small></span></div>
        </div>
      </section>

      <footer className="site-footer">
  <div className="container footer-inner">
    <div className="footer-brand">
      <span className="brand-mark">
        <Flame size={17} />
      </span>
      FIRE FIST <span className="brand-dot">.</span>
    </div>

    <div className="footer-credit">
      <p>
         Created & maintained by <strong>Anirban Bhowmik</strong>
      </p>
      <small>
        Original website code & design by Anirban Bhowmik · Fan-made interactive
        experience inspired by One Piece.
      </small>
    </div>
  
    <div className="footer-links">
      <button onClick={() => scrollToSection("top")}>
        Back to top <ArrowUpRightIcon size={14} />
      </button>

      <span>© 2026 Anirban Bhowmik</span>
    </div>
  </div>
</footer>
    </main>
  );
}

function ArrowUpRightIcon({ size = 16 }: { size?: number }) {
  return <ArrowDownRight size={size} className="arrow-up-right" />;
}
