import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Home,
  Power,
  ScanLine,
  X,
} from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import { projects, sections } from "../data/portfolio";
import type { Section } from "../data/portfolio";
import { PortfolioSection } from "./PortfolioSection";
import { CrtLens } from "./CrtLens";
import { AnimatedIntro } from "./AnimatedIntro";
import { arcadeGames } from "../data/arcade";
import type { ArcadeGame } from "../data/arcade";

const labels: Record<Section, string> = {
  about: "About me",
  projects: "Projects",
  experience: "Experience",
  resume: "Resume",
  contact: "Contact",
  writing: "Writing",
  games: "Games",
};
const descriptions: Record<Section, string> = {
  about: "The person behind the code",
  projects: "Selected things I have built",
  experience: "Where I have made my mark",
  resume: "The full story, on paper",
  contact: "Start a conversation",
  writing: "Notes from the workbench",
  games: "A small arcade break",
};

export function MainContent() {
  const [params] = useSearchParams();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const requestedSection = params.get("section");
  const section = sections.find((value) => value === requestedSection);
  const projectId = params.get("project");
  const requestedGame = params.get("game");
  const game = arcadeGames.find((value) => value === requestedGame);
  const project =
    section === "projects"
      ? projects.find((value) => value.id === projectId)
      : undefined;
  const post = id ? blogPosts.find((value) => value.id === id) : undefined;
  const missing =
    (location.pathname !== "/" && !post) ||
    (!!requestedSection && !section) ||
    (section === "projects" && !!projectId && !project) ||
    (section === "games" && !!requestedGame && !game);
  const isHome = !section && !id && !missing;
  const displayPath = [
    "C:",
    "PAUL",
    section?.toUpperCase() || (id ? "WRITING" : ""),
    project?.id.toUpperCase(),
  ]
    .filter(Boolean)
    .join(String.fromCharCode(92));
  const [command, setCommand] = useState("");
  const [feedback, setFeedback] = useState("");
  const [scanlines, setScanlines] = useState(true);
  const [powered, setPowered] = useState(true);
  const [booting, setBooting] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const viewport = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    viewport.current?.scrollTo(0, 0);
    window.scrollTo(0, 0);
    if (!firstLoad.current) heading.current?.focus({ preventScroll: true });
    firstLoad.current = false;
    document.title = `${project?.name || post?.title || (section ? labels[section] : "Software Engineer")} | Koimburi`;
  }, [location.key, project?.name, post?.title, section]);

  const go = (value?: Section) => {
    setFeedback("");
    setCommand("");
    setBooting(false);
    navigate(value ? `/?section=${value}` : "/");
  };

  const play = (value: ArcadeGame) => {
    setFeedback("");
    setCommand("");
    setBooting(false);
    navigate(`/?section=games&game=${value}`);
  };

  function submitCommand(event: FormEvent) {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    setCommand("");
    if (!value) return;
    if (value === "home" || value === "clear" || value === "cls") {
      go();
      return;
    }
    if (value === "back") {
      go(project ? "projects" : id ? "writing" : undefined);
      return;
    }
    if (value === "help" || value === "?") {
      setFeedback(
        "Navigation: about, projects, experience, resume, contact, writing, games. System: dir, whoami, status, date, time, home, back. Arcade: play snake, play signal, play mines.",
      );
      return;
    }
    if (value === "dir" || value === "ls") {
      setFeedback(`DIRECTORIES: ${sections.join(" / ")}`);
      return;
    }
    if (value === "whoami") {
      setFeedback("KOIMBURI / SOFTWARE ENGINEER / BUILDER / CURIOUS HUMAN");
      return;
    }
    if (value === "status" || value === "ver" || value === "version") {
      setFeedback("TERMINAL 2.0 / CRT ONLINE / ALL SYSTEMS NOMINAL");
      return;
    }
    if (value === "date") {
      setFeedback(new Intl.DateTimeFormat("en-KE", { dateStyle: "full" }).format(new Date()));
      return;
    }
    if (value === "time") {
      setFeedback(new Intl.DateTimeFormat("en-KE", { timeStyle: "medium", timeZone: "Africa/Nairobi" }).format(new Date()));
      return;
    }
    if (value === "sudo" || value.startsWith("sudo ")) {
      setFeedback("NICE TRY. THIS WORKSTATION RUNS ON CURIOSITY, NOT ROOT ACCESS.");
      return;
    }
    const gameCommand = arcadeGames.find(
      (item) => value === item || value === `play ${item}` || value === `game ${item}`,
    );
    if (gameCommand) {
      play(gameCommand);
      return;
    }
    const target = sections.find(
      (item) =>
        item === value ||
        `open ${item}` === value ||
        (item === "projects" && (value === "work" || value === "portfolio")) ||
        (item === "resume" && (value === "cv" || value === "open cv")),
    );
    if (target) {
      go(target);
      return;
    }
    const selected = projects.find(
      (item) => item.id === value || item.name.toLowerCase() === value,
    );
    if (selected) {
      setFeedback("");
      navigate(`/?section=projects&project=${selected.id}`);
      return;
    }
    setFeedback(
      `Command not found: ${value.slice(0, 50)}. Enter help for available commands.`,
    );
  }

  return (
    <div className="workstation">
      <CrtLens />
      <a className="skip-link" href="#screen-content">
        Skip to content
      </a>
      <header className="desk-header">
        <span>
          <span className="tiny-cross">+</span> KOIMBURI / PERSONAL
          WORKSTATION
        </span>
        <span>
          NAIROBI, KE <span className="desk-dot" />
        </span>
      </header>
      <main className="monitor" aria-label="Koimburi portfolio">
        <div className={`screen-bezel ${!powered ? "is-asleep" : ""}`}>
          <div className={`crt-glass ${scanlines ? "has-scanlines" : ""}`}>
            {powered ? (
              <div className="screen-interface">
                <header className="system-bar">
                  <span>
                    TERMINAL <span className="muted">[Version 2.0]</span>
                  </span>
                  <span className="system-ready">
                    <span /> SYSTEM READY
                  </span>
                </header>
                <nav
                  className="screen-navigation"
                  aria-label="Portfolio navigation"
                >
                  <div className="navigation-buttons">
                    <button
                      className="icon-button"
                      aria-label="Home"
                      title="Home"
                      onClick={() => go()}
                    >
                      <Home size={16} />
                    </button>
                    {!isHome && (
                      <button
                        className="icon-button"
                        aria-label="Back"
                        title="Back"
                        onClick={() =>
                          go(project ? "projects" : id ? "writing" : undefined)
                        }
                      >
                        <ArrowLeft size={16} />
                      </button>
                    )}
                    <span className="path">{displayPath}&gt;</span>
                  </div>
                  <span className="read-only-label">PERSONAL ARCHIVE</span>
                </nav>
                <div
                  className={`screen-viewport ${isHome ? "home-viewport" : ""} ${section === "games" ? "games-viewport" : ""}`}
                  ref={viewport}
                  id="screen-content"
                  tabIndex={-1}
                >
                  {missing ? (
                    <section className="content-page">
                      <p className="eyebrow">ERROR / 404</p>
                      <h1 ref={heading} tabIndex={-1}>
                        File not found.
                      </h1>
                      <p>This address does not point to a portfolio entry.</p>
                      <button className="text-link" onClick={() => go()}>
                        Return home <ArrowRight size={16} />
                      </button>
                    </section>
                  ) : isHome ? (
                    <section className="home-page">
                      <div className="intro-line">
                        <span>ENGINEER. BUILDER. CURIOUS HUMAN.</span>
                        <span className="edition">EST. KENYA</span>
                      </div>
                      <AnimatedIntro headingRef={heading} />
                      <div className="home-directory">
                        <nav aria-label="Main menu" className="directory">
                          <p className="section-label">01 / DIRECTORY</p>
                          {sections.map((value, index) => (
                            <Link
                              key={value}
                              to={`/?section=${value}`}
                              className="directory-link"
                            >
                              <span className="menu-number">0{index + 1}</span>
                              <span className="menu-copy">
                                <strong>{labels[value]}</strong>
                                <span>{descriptions[value]}</span>
                              </span>
                              <ArrowUpRight size={18} />
                            </Link>
                          ))}
                        </nav>
                        <aside className="selected-work">
                          <p className="section-label">02 / SELECTED WORK</p>
                          {projects.map((item, index) => (
                            <Link
                              className="work-link"
                              key={item.id}
                              to={`/?section=projects&project=${item.id}`}
                            >
                              <span className="work-index">
                                [{String(index + 1).padStart(2, "0")}]
                              </span>
                              <span>
                                <strong>{item.name}</strong>
                                <small>{item.category}</small>
                              </span>
                              <ArrowUpRight size={15} />
                            </Link>
                          ))}
                        </aside>
                      </div>
                    </section>
                  ) : post ? (
                    <article className="content-page article">
                      <p className="eyebrow">WRITING / {post.date}</p>
                      <h1 ref={heading} tabIndex={-1}>
                        {post.title}
                      </h1>
                      <p className="muted">
                        {post.readTime} / {post.tags.join(" / ")}
                      </p>
                      <div
                        className="article-body"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                      <Link className="text-link" to="/?section=writing">
                        <ArrowLeft size={16} /> All writing
                      </Link>
                    </article>
                  ) : section ? (
                    <section
                      className={`content-page ${section === "games" ? "games-page" : ""}`}
                    >
                      <p className="eyebrow">
                        {String(sections.indexOf(section) + 1).padStart(2, "0")}{" "}
                        / {section.toUpperCase()}
                        {project ? " / PROJECT FILE" : ""}
                      </p>
                      <h1 ref={heading} tabIndex={-1}>
                        {project?.name || labels[section]}
                      </h1>
                      <PortfolioSection
                        key={section}
                        section={section}
                        project={project}
                        game={game}
                      />
                    </section>
                  ) : null}
                </div>
                <footer className="terminal-footer">
                  {feedback && (
                    <p className="command-feedback" role="status">
                      {feedback}
                    </p>
                  )}
                  <form className="command-line" onSubmit={submitCommand}>
                    <label htmlFor="command">C:\PAUL&gt;</label>
                    <input
                      id="command"
                      aria-label="Terminal command"
                      autoComplete="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      maxLength={100}
                      placeholder="_"
                      value={command}
                      onChange={(event) => setCommand(event.target.value)}
                    />
                    <button
                      className="icon-button"
                      type="submit"
                      title="Run command"
                      aria-label="Run command"
                    >
                      <ArrowRight size={18} />
                    </button>
                    <span className="terminal-status">
                      {booting ? (
                        <button
                          onClick={() => setBooting(false)}
                          type="button"
                          className="boot-skip"
                          aria-label="Skip startup"
                        >
                          INITIALIZING <X size={12} />
                        </button>
                      ) : (
                        "ALL SYSTEMS NOMINAL"
                      )}
                    </span>
                  </form>
                  <div className="screen-bottom">
                    <span>
                      {sections.length} DIRECTORIES{" "}
                      <span className="muted">/</span> {projects.length}{" "}
                      FEATURED PROJECTS
                    </span>
                    <span>MADE WITH INTENTION.</span>
                  </div>
                </footer>
              </div>
            ) : (
              <div className="standby">
                <p>DISPLAY IN STANDBY</p>
                <button className="text-link" onClick={() => setPowered(true)}>
                  Wake display <Power size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
        <footer className="monitor-chin">
          <div className="vents" aria-hidden="true" />
          <div className="hardware-controls">
            <button
              className={`hardware-button ${scanlines ? "active" : ""}`}
              aria-label="CRT scanlines"
              aria-pressed={scanlines}
              title="Toggle CRT scanlines"
              onClick={() => setScanlines((value) => !value)}
            >
              <ScanLine size={19} />
            </button>
            <span className={`power-led ${powered ? "on" : ""}`} />
            <button
              className="power-button"
              aria-label={powered ? "Put display to sleep" : "Wake display"}
              title={powered ? "Put display to sleep" : "Wake display"}
              aria-pressed={powered}
              onClick={() => setPowered((value) => !value)}
            >
              <Power size={20} />
            </button>
          </div>
        </footer>
      </main>
      <div className="monitor-foot" aria-hidden="true" />
      <footer className="desk-footer">
        <span>BUILT IN THE PRESENT. A NOD TO THE PAST.</span>
        <span>&copy; {new Date().getFullYear()} KOIMBURI</span>
      </footer>
    </div>
  );
}
