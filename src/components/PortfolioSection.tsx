import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import {
  contact,
  experience,
  otherProjects,
  projects,
} from "../data/portfolio";
import type { Project, Section } from "../data/portfolio";
import { ArcadeCabinet } from "./ArcadeCabinet";
import type { ArcadeGame } from "../data/arcade";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export function PortfolioSection({
  section,
  project,
  game,
}: {
  section: Section;
  project?: Project;
  game?: ArcadeGame;
}) {
  const [copyStatus, setCopyStatus] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopyStatus("Email copied.");
    } catch {
      setCopyStatus(`Copy this address: ${contact.email}`);
    }
  }

  if (section === "games") return <ArcadeCabinet game={game} />;

  if (section === "about")
    return (
      <>
        <p className="lead">
          Software that connects people,
          <br className="desktop-break" /> systems, and the real world.
        </p>
        <div className="prose">
          <p>
            I'm Paul Koimburi Kahura, a software engineer and venture builder
            based in Kiambu County, Kenya. I work across full-stack
            applications, mobile products, AI integrations, and cloud
            infrastructure.
          </p>
          <p>
            I enjoy the whole journey: understanding a problem, shaping the
            architecture, and getting a useful product into people's hands. My
            work spans public transport, enterprise analytics, computer vision,
            and tools that make information more accessible.
          </p>
        </div>
        <h2>My working toolkit</h2>
        <dl className="toolkit">
          <div>
            <dt>APPLICATIONS</dt>
            <dd>React, Angular, Vue, Flutter, TypeScript, Dart</dd>
          </div>
          <div>
            <dt>BACKEND</dt>
            <dd>Python, Node.js, Django, FastAPI, GraphQL</dd>
          </div>
          <div>
            <dt>CLOUD &amp; DATA</dt>
            <dd>AWS, GCP, Redshift, dbt, PostgreSQL, Firebase</dd>
          </div>
          <div>
            <dt>INTELLIGENCE</dt>
            <dd>LLM integration, computer vision, RAG, MCP</dd>
          </div>
        </dl>
        <h2>Foundations</h2>
        <p>
          BSc Mathematics and Computer Science
          <br />
          <span className="muted">
            Jomo Kenyatta University of Agriculture and Technology
          </span>
        </p>
        <Link className="text-link" to="/?section=experience">
          Explore my experience <ArrowRight size={16} />
        </Link>
      </>
    );

  if (section === "projects")
    return project ? (
      <>
        <p className="lead">{project.summary}</p>
        <p className="project-role">{project.role}</p>
        <p className="project-audience">
          <span>BUILT FOR</span> {project.audience}
        </p>
        <div
          className={
            project.image ? "project-detail with-media" : "project-detail"
          }
        >
          <div>
            <p>{project.description}</p>
            <h2>
              <span className="case-number">01</span> The problem
            </h2>
            <p>{project.challenge}</p>
            <h2>
              <span className="case-number">02</span> My part
            </h2>
            <p>{project.contribution}</p>
          </div>
          {project.image && (
            <figure
              className={`project-media ${project.id === "zuka-safari" ? "phone-capture" : "brand-capture"}`}
            >
              <a
                href={asset(project.image.path)}
                target="_blank"
                rel="noreferrer"
                title="Open full image"
              >
                <img src={asset(project.image.path)} alt={project.image.alt} />
              </a>
              <figcaption>{project.image.caption}</figcaption>
            </figure>
          )}
        </div>
        <section className="case-section">
          <h2>
            <span className="case-number">03</span> How it comes together
          </h2>
          <ol className="system-flow" aria-label="System workflow">
            {project.flow.map((step, index) => (
              <li key={step}>
                <span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {step}
                </span>
                {index < project.flow.length - 1 && (
                  <ArrowRight size={16} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
          <ul className="capability-list">
            {project.capabilities.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </section>
        <section className="case-section">
          <h2>
            <span className="case-number">04</span> Engineering decisions
          </h2>
          <div className="decision-list">
            {project.decisions.map((decision) => (
              <article key={decision.title}>
                <h3>{decision.title}</h3>
                <p>{decision.detail}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="case-section">
          <h2>
            <span className="case-number">05</span> Why it matters
          </h2>
          <p>{project.takeaway}</p>
          {project.note && <p className="project-note">{project.note}</p>}
          <p className="stack">
            <span className="section-label">TOOLKIT / </span>
            {project.stack.join(" / ")}
          </p>
        </section>
        <nav className="project-sequence" aria-label="Project navigation">
          <Link className="text-link" to="/?section=projects">
            <ArrowLeft size={16} /> All projects
          </Link>
          <Link
            className="text-link"
            to={`/?section=projects&project=${projects[(projects.indexOf(project) + 1) % projects.length].id}`}
          >
            Next:{" "}
            {projects[(projects.indexOf(project) + 1) % projects.length].name}{" "}
            <ArrowRight size={16} />
          </Link>
        </nav>
      </>
    ) : (
      <>
        <p className="lead">Featured work. Real-world problems.</p>
        <p className="collection-label">FEATURED PROJECTS / {String(projects.length).padStart(2, "0")}</p>
        <div className="project-list">
          {projects.map((item, index) => (
            <Link
              to={`/?section=projects&project=${item.id}`}
              key={item.id}
              className="project-row"
            >
              <span className="menu-number">0{index + 1}</span>
              <div>
                <small>{item.category}</small>
                <h2>{item.name}</h2>
                <p>{item.summary}</p>
                <span className="project-stack">
                  {item.stack.slice(0, 4).join(" / ")}
                </span>
              </div>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
        <section className="other-projects" aria-labelledby="other-projects-heading">
          <p className="collection-label">OTHER PROJECTS / {String(otherProjects.length).padStart(2, "0")}</p>
          <h2 id="other-projects-heading" className="more-heading">More from the workbench</h2>
          <p className="collection-intro">
            A wider collection of products, prototypes, and systems across commerce, property, agriculture, and applied AI.
          </p>
          <div className="other-project-grid">
            {otherProjects.map((item) => (
              <article className="other-project" key={item.name}>
                <small>{item.category}</small>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </>
    );

  if (section === "experience")
    return (
      <>
        <p className="lead">From first principles to production.</p>
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.company}>
              <p className="eyebrow">{item.period}</p>
              <h2>{item.company}</h2>
              <p className="role">{item.role}</p>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </>
    );

  if (section === "resume")
    return (
      <>
        <p className="lead">The full story, on paper.</p>
        <div className="resume-file">
          <span className="file-extension">PDF</span>
          <div>
            <h2>Paul Koimburi Kahura</h2>
            <p>
              Senior Software Engineer
              <br />
              Forward Deployed Engineer
            </p>
          </div>
        </div>
        <p>
          Experience, technical skills, education, and selected projects in one
          document.
        </p>
        <div className="action-links">
          <a
            className="solid-link"
            href={asset("paul-kahura-resume.pdf")}
            download
          >
            <ArrowDownToLine size={18} /> Download resume
          </a>
          <a
            className="text-link"
            href={asset("paul-kahura-resume.pdf")}
            target="_blank"
            rel="noreferrer"
          >
            Open PDF <ArrowUpRight size={18} />
          </a>
        </div>
      </>
    );

  if (section === "contact")
    return (
      <>
        <p className="lead">Good work starts with a conversation.</p>
        <p className="prose">
          Have a product to build, a problem to untangle, or an interesting
          idea? Let's talk.
        </p>
        <div className="contact-list">
          <div className="contact-row">
            <Mail size={20} />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <button
              className="icon-button"
              onClick={copyEmail}
              title="Copy email"
              aria-label="Copy email"
            >
              {copyStatus === "Email copied." ? (
                <Check size={18} />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
          <a
            className="contact-row"
            href={contact.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={20} />
            <span>github.com/paulkahura</span>
            <ArrowUpRight size={18} />
          </a>
          <a
            className="contact-row"
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={20} />
            <span>LinkedIn / Paul Kahura</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
        <p className="location-note">BASED IN KENYA / WORKING ACROSS BORDERS</p>
        <p role="status">{copyStatus}</p>
      </>
    );

  return (
    <>
      <p className="lead">Notes from the workbench.</p>
      <div className="writing-list">
        {blogPosts.map((item) => (
          <Link key={item.id} to={`/blog/${item.id}`}>
            <span className="eyebrow">
              {item.date} / {item.readTime}
            </span>
            <h2>
              {item.title} <ArrowUpRight size={18} />
            </h2>
            <p>{item.excerpt}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
