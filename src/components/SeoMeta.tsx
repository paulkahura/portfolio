import { useEffect } from "react";
import type { Project, Section } from "../data/portfolio";

const siteUrl = "https://koimburi.dev";
const defaultDescription =
  "Koimburi is a software engineer and venture builder in Kenya. Explore work in AI, cloud infrastructure, mobility, and enterprise data platforms.";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
};

function setMeta(selector: string, attribute: "name" | "property", content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, selector.match(/="([^"]+)/)?.[1] ?? "");
    document.head.append(element);
  }
  element.content = content;
}

export function SeoMeta({
  section,
  project,
  post,
}: {
  section?: Section;
  project?: Project;
  post?: BlogPost;
}) {
  useEffect(() => {
    const path = post
      ? `/blog/${post.id}`
      : project
        ? `/?section=projects&project=${project.id}`
        : section
          ? `/?section=${section}`
          : "/";
    const title = post
      ? `${post.title} | Koimburi`
      : project
        ? `${project.name} | Koimburi`
        : section
          ? `${section[0].toUpperCase()}${section.slice(1)} | Koimburi`
          : "Koimburi | Software Engineer & Venture Builder";
    const description = post?.excerpt ?? project?.description ?? defaultDescription;
    const canonical = `${siteUrl}${path}`;
    const image = project?.image
      ? `${siteUrl}/${project.image.path}`
      : `${siteUrl}/logo.svg`;
    const pageData = post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description,
          datePublished: new Date(post.date).toISOString(),
          keywords: post.tags.join(", "),
          mainEntityOfPage: canonical,
          author: { "@type": "Person", name: "Koimburi", url: siteUrl },
        }
      : {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: title,
          description,
          url: canonical,
          mainEntity: {
            "@type": "Person",
            name: "Koimburi",
            url: siteUrl,
            jobTitle: "Software Engineer and Venture Builder",
            address: { "@type": "PostalAddress", addressCountry: "KE" },
            sameAs: [
              "https://github.com/paulkahura",
              "https://www.linkedin.com/in/paul-kahura/",
            ],
          },
        };

    document.title = title;
    document.documentElement.lang = "en";
    setMeta('meta[name="description"]', "name", description);
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:url"]', "property", canonical);
    setMeta('meta[property="og:type"]', "property", post ? "article" : "website");
    setMeta('meta[property="og:image"]', "property", image);
    setMeta('meta[name="twitter:title"]', "name", title);
    setMeta('meta[name="twitter:description"]', "name", description);
    setMeta('meta[name="twitter:image"]', "name", image);

    let canonicalTag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.append(canonicalTag);
    }
    canonicalTag.href = canonical;

    let structuredData = document.head.querySelector<HTMLScriptElement>("#seo-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "seo-structured-data";
      structuredData.type = "application/ld+json";
      document.head.append(structuredData);
    }
    structuredData.textContent = JSON.stringify(pageData);
  }, [project, post, section]);

  return null;
}
