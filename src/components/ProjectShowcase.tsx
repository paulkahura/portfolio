import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, X, ZoomIn } from "lucide-react";
import { projectGalleries } from "../data/projectMedia";
import type { ProjectGallery } from "../data/projectMedia";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function Gallery({ gallery, index }: { gallery: ProjectGallery; index: number }) {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const slide = gallery.slides[selected];
  const multiple = gallery.slides.length > 1;
  const move = (direction: number) => {
    setPlaying(false);
    setSelected(value => (value + direction + gallery.slides.length) % gallery.slides.length);
  };

  useEffect(() => {
    if (!playing || paused || expanded || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setSelected(value => (value + 1) % gallery.slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [playing, paused, expanded, gallery.slides.length]);

  useEffect(() => {
    if (expanded) dialog.current?.showModal();
    else dialog.current?.close();
  }, [expanded]);

  return <section className={`ed-gallery ed-gallery-${index % 2} ed-gallery-${slide.format}`} aria-label={gallery.title}>
    <div className="ed-gallery-intro"><p className="ed-eyebrow">IN THE PRODUCT / {String(index + 1).padStart(2, "0")}</p><h2>{gallery.title}</h2><p>{gallery.description}</p></div>
    <div className="ed-gallery-viewer" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <button className="ed-slide-stage" onClick={() => setExpanded(true)} aria-label={`Enlarge ${slide.title}`}>
        <img key={slide.path} src={asset(slide.path)} alt={slide.title} loading="lazy" />
        <span className="ed-zoom"><ZoomIn size={18} /> Enlarge</span>
      </button>
      <div className="ed-slide-toolbar"><div aria-live={playing ? "off" : "polite"}><span className="ed-eyebrow">{String(selected + 1).padStart(2, "0")} / {String(gallery.slides.length).padStart(2, "0")}</span><h3>{slide.title}</h3></div>{multiple && <div className="ed-slide-controls"><button onClick={() => move(-1)} aria-label={`Previous screen in ${gallery.title}`} title="Previous screen"><ChevronLeft size={19} /></button><button onClick={() => setPlaying(value => !value)} aria-label={playing ? "Pause slideshow" : "Play slideshow"} title={playing ? "Pause slideshow" : "Play slideshow"}>{playing ? <Pause size={16} /> : <Play size={16} />}</button><button onClick={() => move(1)} aria-label={`Next screen in ${gallery.title}`} title="Next screen"><ChevronRight size={19} /></button></div>}</div>
      <p className="ed-slide-caption">{slide.caption}</p>
      {multiple && <div className="ed-slide-thumbnails" aria-label="Choose a screen">{gallery.slides.map((item, itemIndex) => <button key={item.path} onClick={() => { setPlaying(false); setSelected(itemIndex); }} aria-label={item.title} aria-pressed={itemIndex === selected}><img src={asset(item.path)} alt="" loading="lazy" /><span>{String(itemIndex + 1).padStart(2, "0")}</span></button>)}</div>}
    </div>
    <dialog className="ed-lightbox" ref={dialog} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }} onKeyDown={event => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }} aria-label={slide.title}>
      <header><span>{slide.title}</span><button autoFocus onClick={() => setExpanded(false)} aria-label="Close enlarged screen" title="Close"><X size={23} /></button></header>
      <div className="ed-lightbox-image"><img src={asset(slide.path)} alt={slide.title} /></div>
      <footer>{multiple && <button onClick={() => move(-1)} aria-label="Previous enlarged screen"><ChevronLeft /></button>}<p>{slide.caption}</p>{multiple && <button onClick={() => move(1)} aria-label="Next enlarged screen"><ChevronRight /></button>}</footer>
    </dialog>
  </section>;
}

export function ProjectShowcase({ projectId }: { projectId: string }) {
  return <>{projectGalleries[projectId]?.map((gallery, index) => <Gallery key={`${projectId}-${index}`} gallery={gallery} index={index} />)}</>;
}
