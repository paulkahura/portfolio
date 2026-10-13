import { useEffect, useRef } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { ArrowDown, ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, Monitor } from "lucide-react";
import { contact, experience, otherProjects, projects } from "../data/portfolio";
import type { Project } from "../data/portfolio";
import { blogPosts } from "../data/blogPosts";
import { SeoMeta } from "./SeoMeta";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const projectUrl = (project: Project) => `/?section=projects&project=${project.id}`;

function ProjectVisual({ project }: { project: Project }) {
  return <div className={`ed-visual ed-visual-${project.id}`}>
    {project.image ? <img src={asset(project.image.path)} alt={project.image.alt} loading="lazy" /> :
      project.id === "blue-box-ai" ? <div className="ed-vision"><span className="ed-visual-label">BLUE BOX / COMPUTER VISION</span><div className="ed-detection"><span>Activity → insight</span><b>See more.<br />Understand more.</b></div><span className="ed-visual-label">DETECT / QUERY / NOTIFY</span></div> :
      <div className="ed-socio"><span className="ed-visual-label">SOCIAL DISCOVERY / MOBILE + WEB</span><b>socio<span>↗</span></b><p>A little more human.</p><span className="ed-visual-label">VIDEO → CONNECTION → CONVERSATION</span></div>}
    <span className="ed-visual-caption">{project.image?.caption ?? "Product workflow / editorial illustration"}</span>
  </div>;
}

export function EditorialPortfolio() {
  const [params] = useSearchParams();
  const { id } = useParams();
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  const project = projects.find(item => item.id === params.get("project"));
  const post = blogPosts.find(item => item.id === id);
  const missing = (!!params.get("project") && !project) || (!!id && !post) || (location.pathname !== "/" && !id);
  const section = params.get("section");

  useEffect(() => {
    document.documentElement.classList.add("editorial-mode");
    return () => document.documentElement.classList.remove("editorial-mode");
  }, []);

  useEffect(() => {
    const target = location.hash.slice(1) || (section === "projects" ? "work" : section === "resume" ? "about" : section === "games" ? "play" : section);
    const frame = requestAnimationFrame(() => {
      if (!project && !post && target) document.getElementById(target)?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
      if (project || post || missing) main.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.hash, project, post, section, missing]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".ed-reveal").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [location.key]);

  return <div className="editorial">
    <SeoMeta project={project} post={post} />
    <a className="ed-skip" href="#ed-main">Skip to content</a>
    <header className="ed-header">
      <Link to="/" className="ed-wordmark" aria-label="Koimburi home">koimburi<span>↗</span></Link>
      <nav aria-label="Main navigation"><Link to="/#work">Work</Link><Link to="/#about">About</Link><Link to="/#writing">Notes</Link><a href={`mailto:${contact.email}`}>Let's talk <ArrowUpRight size={15} /></a></nav>
    </header>
    <main id="ed-main" ref={main} tabIndex={-1}>
      {missing ? <section className="ed-detail"><p className="ed-eyebrow">404 / A WRONG TURN</p><h1>Nothing here.<br />Plenty over there.</h1><Link className="ed-link" to="/">Back to the portfolio <ArrowRight /></Link></section> : project ?
        <article className="ed-detail" key={project.id}>
          <Link className="ed-link" to="/#work"><ArrowLeft size={18} /> All work</Link>
          <p className="ed-eyebrow">{project.category}</p><h1>{project.name}</h1><p className="ed-detail-lead">{project.summary}</p>
          <ProjectVisual project={project} />
          <div className="ed-case-grid"><aside><p className="ed-eyebrow">MY ROLE</p><p>{project.role}</p><p className="ed-eyebrow">BUILT FOR</p><p>{project.audience}</p><p className="ed-eyebrow">TOOLKIT</p><p>{project.stack.join(" · ")}</p></aside><div>
            <h2>The problem worth solving.</h2><p>{project.challenge}</p><h2>My part in the work.</h2><p>{project.contribution}</p>
            <h2>How it comes together.</h2><ol className="ed-flow">{project.flow.map(step => <li key={step}>{step}</li>)}</ol>
            {project.decisions.map(decision => <section key={decision.title}><h2>{decision.title}</h2><p>{decision.detail}</p></section>)}
            <h2>What the product makes possible.</h2><ul>{project.capabilities.map(item => <li key={item}>{item}</li>)}</ul><p>{project.takeaway}</p>{project.note && <p className="ed-note">{project.note}</p>}
          </div></div>
          <Link className="ed-next" to={projectUrl(projects[(projects.indexOf(project) + 1) % projects.length])}><span className="ed-eyebrow">NEXT PROJECT</span><span>{projects[(projects.indexOf(project) + 1) % projects.length].name}<ArrowUpRight /></span></Link>
        </article> : post ?
        <article className="ed-article" key={post.id}><Link className="ed-link" to="/#writing"><ArrowLeft size={18} /> All notes</Link><p className="ed-eyebrow">{post.date} / {post.readTime}</p><h1>{post.title}</h1><p className="ed-detail-lead">{post.excerpt}</p><div className="ed-prose" dangerouslySetInnerHTML={{ __html: post.content }} /></article> : <>
          <section className="ed-intro">
            <div className="ed-intro-meta"><span>SOFTWARE ENGINEER & VENTURE BUILDER</span><span>BASED IN KENYA / BUILDING EVERYWHERE</span></div>
            <h1>Koimburi<span className="ed-name-dot">.</span></h1>
            <div className="ed-intro-bottom"><p>I turn complex problems<br />into things people can use.</p><p>From the first idea to the systems behind it.<br />AI, cloud, web, and mobile.</p><a href="#work" aria-label="Explore selected work" className="ed-down"><ArrowDown size={25} /></a></div>
          </section>
          <section id="work" className="ed-work"><div className="ed-section-heading"><h2>Selected work</h2><span>01—06 / A FEW THINGS I'VE BUILT</span></div>
            {projects.map((item, index) => <Link className={`ed-project ed-reveal ed-project-${index % 2}`} key={item.id} to={projectUrl(item)}>
              <div className="ed-project-number">0{index + 1}</div><ProjectVisual project={item} /><div className="ed-project-copy"><span className="ed-eyebrow">{item.category}</span><div><h3>{item.name}</h3><p>{item.summary}</p><span className="ed-project-action">Explore the project <ArrowUpRight size={19} /></span></div></div>
            </Link>)}
          </section>
          <section className="ed-other ed-reveal"><div className="ed-section-heading"><h2>And a few more.</h2><span>THE WIDER BODY OF WORK</span></div><div className="ed-other-grid">{otherProjects.map((item, index) => <details key={item.name}><summary><span className="ed-eyebrow">{String(index + 7).padStart(2,"0")}</span><span>{item.name}<small>{item.category}</small></span><span className="ed-expand" aria-hidden="true">+</span></summary><p>{item.description}</p></details>)}</div></section>
          <section id="about" className="ed-about ed-reveal"><p className="ed-eyebrow">THE PERSON BEHIND THE WORK</p><div className="ed-about-grid"><h2>Curious by nature.<br />Engineer by practice.</h2><div><p>I'm Paul Koimburi Kahura, a software engineer and venture builder based in Kenya. I work across the whole product: the experience people touch and the infrastructure that makes it possible.</p><p>My work spans dental-practice intelligence, crisis communications, public transport, social discovery, and financial operations. Different problems, the same interest: making useful things that hold together.</p><a className="ed-link" href={asset("paul-kahura-resume.pdf")} download>Download my resume <ArrowDownToLine size={18} /></a></div></div>
            <div id="experience" className="ed-experience">{experience.map(item => <div key={item.company}><span className="ed-eyebrow">{item.period}</span><h3>{item.company}<small>{item.role}</small></h3><p>{item.description}</p></div>)}</div>
          </section>
          <section id="writing" className="ed-writing ed-reveal"><div className="ed-section-heading"><h2>Notes from the work.</h2><span>DECISIONS, SYSTEMS & THINGS LEARNED</span></div>{blogPosts.map(item => <Link key={item.id} to={`/blog/${item.id}`}><span className="ed-eyebrow">{item.date}</span><h3>{item.title}</h3><ArrowUpRight size={22} /></Link>)}</section>
          <section id="play" className="ed-play ed-reveal"><Monitor size={27} /><div><h2>There's another side to this.</h2><p>A little nostalgia. A few games. The original portfolio.</p></div><a className="ed-link" href={asset("crt/")}>Enter CRT mode <ArrowUpRight size={18} /></a></section>
        </>}
    </main>
    <footer id="contact" className="ed-footer"><p className="ed-eyebrow">HAVE SOMETHING IN MIND?</p><a className="ed-contact" href={`mailto:${contact.email}`}>Let's build it.<ArrowUpRight /></a><div className="ed-footer-bottom"><span>© {new Date().getFullYear()} Koimburi</span><div><a href={contact.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a><a href={asset("crt/")}>CRT mode <Monitor size={14} /></a></div><span className="ed-intention">Made with intention / <img src={asset("intention-mark.png")} alt="Intention mark" /></span></div></footer>
  </div>;
}
