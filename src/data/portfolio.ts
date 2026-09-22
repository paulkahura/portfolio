export const sections = [
  "about",
  "projects",
  "experience",
  "resume",
  "contact",
  "writing",
  "games",
] as const;
export type Section = (typeof sections)[number];

export interface Project {
  id: string;
  name: string;
  category: string;
  summary: string;
  role: string;
  description: string;
  audience: string;
  challenge: string;
  contribution: string;
  flow: string[];
  decisions: { title: string; detail: string }[];
  takeaway: string;
  capabilities: string[];
  stack: string[];
  note?: string;
  image?: { path: string; alt: string; caption: string };
}

export const projects: Project[] = [
  {
    id: "contrast-tivtav",
    name: "Contrast / TIVTAV",
    audience: "Dental practices and multi-practice groups",
    challenge:
      "Dental practices run on operational documents: invoices, payslips, contracts, receipts, bills of works, and more. The information inside them is essential to running a practice, but it is often locked in different formats and disconnected from the questions people need to answer. Making it useful also means keeping each customer's data and credentials separate throughout the system.",
    contribution:
      "I worked across the platform architecture, cloud infrastructure, and document-intelligence pipeline. That included dedicated tenant environments, infrastructure as code, onboarding automation, and the application layer that turns operational documents into data people can actually explore.",
    flow: [
      "Operational document upload",
      "AI classification + extraction",
      "Secure tenant pipeline",
      "Redshift + dbt",
      "Practice intelligence",
    ],
    decisions: [
      {
        title: "Isolation starts with infrastructure",
        detail:
          "Dedicated tenant environments separate networking, identity, storage, and warehousing. Access boundaries are part of the architecture, rather than relying on a tenant filter in every query.",
      },
      {
        title: "Make onboarding repeatable",
        detail:
          "Infrastructure as code and provisioning workflows turn environment setup into a repeatable process. The document pipeline and app middleware then work against the tenant-specific resources.",
      },
    ],
    takeaway:
      "The resulting workflow turns a practice's day-to-day documents into structured, queryable operational data and a practice-facing intelligence experience.",
    category: "CLOUD / DATA PLATFORM",
    summary: "A secure document-intelligence platform for dental practices.",
    role: "Platform architecture & engineering / Shockwolves BV, under Elewa",
    description:
      "TIVTAV is a secure document-intelligence platform for dental practices. It processes operational documents such as invoices, payslips, contracts, receipts, and bills of works, turning them into structured data and useful practice insights inside a dedicated environment for each tenant.",
    capabilities: [
      "Per-tenant AWS environments with dedicated networking, storage, identity, and data warehousing.",
      "Infrastructure as code and automated onboarding workflows.",
      "AI classification and extraction for operational documents with ExtendAI and dbt transformations.",
      "Practice intelligence delivered through React and GraphQL.",
    ],
    stack: [
      "AWS CDK",
      "Python",
      "Redshift",
      "dbt",
      "React",
      "GraphQL",
      "ExtendAI",
    ],
    image: {
      path: "projects/tivtav.png",
      alt: "TIVTAV product logo",
      caption: "TIVTAV / product identity",
    },
  },
  {
    id: "repsafe",
    name: "Repsafe",
    audience: "Crisis communication teams and their reviewers",
    challenge:
      "During a crisis, information changes quickly and several people need to agree on what happens next. Drafting a statement is only one part of the problem: context, responsibilities, versions, and approvals all need a shared home.",
    contribution:
      "My work on the AI crisis platform connected assisted communication workflows with the application and backend. The product brings situation context, draft generation, team coordination, and review into the same working environment.",
    flow: [
      "Situation context",
      "AI-assisted draft",
      "Team review",
      "Approval workflow",
      "Communication output",
    ],
    decisions: [
      {
        title: "Keep people in the decision loop",
        detail:
          "AI-assisted messages sit alongside review and approval workflows. Drafting support becomes one step in a coordinated process, with people responsible for what goes forward.",
      },
      {
        title: "One context, several communication formats",
        detail:
          "Key messages, press statements, social content, and internal briefings share crisis context. GraphQL connects the multilingual client with its cloud services and shared data.",
      },
    ],
    takeaway:
      "Teams can move from understanding a situation to preparing and reviewing a response without treating every document as an isolated task.",
    category: "AI / COMMUNICATIONS",
    summary: "An AI workspace for teams handling crisis communications.",
    role: "AI crisis-platform engineering / Elewa",
    description:
      "A collaborative crisis communication platform that helps teams coordinate a response, draft communications with AI, and move content through structured approvals.",
    capabilities: [
      "A situation room for crisis context and team coordination.",
      "AI-assisted key messages, press statements, and internal briefings.",
      "Multi-step approval workflows and role-based access.",
      "A multilingual application with GraphQL and cloud services.",
    ],
    stack: [
      "Angular",
      "TypeScript",
      "GraphQL",
      "Firebase",
      "Cloud Run",
      "AI workflows",
    ],
    image: {
      path: "projects/repsafe.png",
      alt: "Repsafe product logo",
      caption: "Repsafe / product identity",
    },
  },
  {
    id: "blue-box-ai",
    name: "Blue Box AI",
    audience: "People managing stores, offices, and physical spaces",
    challenge:
      "A camera can record all day without answering a simple question: what actually happened? Reviewing footage is a separate job. Blue Box explores how detection, event records, and conversational access can make those feeds useful in everyday operations.",
    contribution:
      "I designed and built the detection and alerting workflow, connecting camera inputs to computer vision, stored events, background notifications, and WhatsApp queries. A dashboard brings configuration and monitoring into a web interface.",
    flow: [
      "Camera / RTSP",
      "YOLO detection",
      "Event storage",
      "Query or alert",
      "WhatsApp",
    ],
    decisions: [
      {
        title: "Separate seeing from sending",
        detail:
          "Video processing and notification delivery have different jobs. Celery and Redis handle background messages so the detection workflow does not have to wait for a messaging request.",
      },
      {
        title: "Meet users in a familiar interface",
        detail:
          "The WhatsApp webhook connects natural-language questions to event queries, including counts and time ranges. People can ask about activity without navigating a specialist video-analysis dashboard.",
      },
    ],
    takeaway:
      "Camera activity becomes a stream of events that can be counted, queried, and surfaced as notifications. The useful output is an answer, not another hour of footage.",
    category: "COMPUTER VISION / AI",
    summary: "A computer-vision platform for searchable camera activity.",
    role: "Architecture & development / Three Point Devhub",
    description:
      "An AI surveillance analytics system that connects camera feeds to actionable WhatsApp alerts. Built to make camera activity useful to people managing stores, offices, and other physical spaces.",
    capabilities: [
      "YOLO-based person detection from webcam, video, and RTSP sources.",
      "WhatsApp notifications dispatched through background tasks.",
      "Natural-language questions about camera events, counts, and time ranges through WhatsApp.",
      "A Streamlit dashboard for configuration and monitoring.",
      "Event logging with SQLite and task processing with Celery and Redis.",
    ],
    stack: ["Python", "YOLOv8", "OpenCV", "Streamlit", "Celery", "Redis"],
  },
  {
    id: "zuka-safari",
    name: "Zuka Safari",
    audience: "Nairobi passengers and public transport drivers",
    challenge:
      "Public transport is already a network; its information is often scattered. A passenger needs to find a route and understand the fare, while a driver needs to manage a vehicle and a trip. Those are two sides of the same changing picture.",
    contribution:
      "I built the consumer and driver applications, their shared Flutter foundation, and the real-time data services. The platform brings maps, vehicle locations, fare visibility, route discovery, and trip management together around a common set of models.",
    flow: [
      "Driver updates",
      "Firestore sync",
      "Shared services",
      "Live maps",
      "Passenger discovery",
    ],
    decisions: [
      {
        title: "Two apps, one shared foundation",
        detail:
          "Passenger and driver experiences have different priorities. Shared models, providers, and services keep their view of vehicles, routes, and trips consistent without forcing both into the same interface.",
      },
      {
        title: "Leave room for a wider network",
        detail:
          "Adapter interfaces provide a place for external fleet data and CCTV occupancy feeds. The architecture is prepared for those integrations; live provider connections depend on access and implementation.",
      },
    ],
    takeaway:
      "A connected passenger-and-driver experience makes the transport network easier to discover and manage, with an architecture that can accommodate additional data sources.",
    category: "MOBILITY / MOBILE",
    summary: "A real-time public transport platform for Nairobi.",
    role: "Product architecture & full-stack development",
    description:
      "A public transport tracking and aggregation platform built around the way Nairobi moves. Separate passenger and driver apps bring vehicle locations, routes, fares, and trip management into one connected experience.",
    capabilities: [
      "Live vehicle locations and route discovery for passengers.",
      "Driver tools for managing vehicles, trips, and fares.",
      "Firebase authentication and real-time Firestore data sync.",
      "Shared Flutter models and services across both apps.",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Riverpod", "OpenStreetMap", "OSRM"],
    note: "Designed for external fleet and CCTV occupancy integrations. Provider adapters are extension points; their presence does not imply live provider partnerships.",
    image: {
      path: "projects/zuka-app.png",
      alt: "Zuka passenger app sign-in screen with phone and email options",
      caption: "Passenger app / authentication screen",
    },
  },
  {
    id: "socio",
    name: "Socio",
    audience: "People discovering and connecting through short-form video",
    challenge:
      "Most social discovery products reduce people to a few static cards. A more expressive first impression needs fast video, thoughtful discovery controls, and enough safety and moderation around the experience that it remains usable as it grows.",
    contribution:
      "I developed the Flutter mobile product and companion web and admin experiences, bringing together onboarding, video-led profiles, discovery, communication, notifications, and the operational tools needed to support the platform.",
    flow: [
      "Create a video profile",
      "Discover people",
      "Make a connection",
      "Chat or call",
      "Moderate and support",
    ],
    decisions: [
      {
        title: "Make the video the introduction",
        detail:
          "Short-form profile videos make discovery more expressive than a static card. Video preparation and caching help keep that first interaction quick enough to feel natural on a mobile connection.",
      },
      {
        title: "Design the social layer with operations in mind",
        detail:
          "Authentication choices, moderation support, notifications, preferences, and an admin surface are treated as core product concerns. A social product needs more than an attractive feed to earn trust.",
      },
    ],
    takeaway:
      "Socio turns profile discovery into a richer conversation starter, pairing a video-first mobile experience with the web and operational tools that help the product stay manageable behind the scenes.",
    category: "SOCIAL / MOBILE + WEB",
    summary: "A video-led social discovery platform for mobile and web.",
    role: "Mobile + web product development",
    description:
      "A video-led social discovery platform built as a Flutter mobile application alongside companion web and admin experiences. People can introduce themselves with short videos, discover one another, connect, and continue the conversation through messaging and calls.",
    capabilities: [
      "Short-form video profiles and a discovery feed.",
      "Phone, Apple, and Google sign-in paths.",
      "Video and voice calling, notifications, and dynamic links.",
      "Video preparation, caching, and moderation support.",
      "Premium controls, discovery preferences, and admin oversight.",
    ],
    stack: ["Flutter", "Dart", "Firebase", "FFmpeg", "CallKit", "Web"],
  },
  {
    id: "mug-sacco",
    name: "MUG SACCO",
    audience: "SACCO members, branch staff, loan officers, and administrators",
    challenge:
      "A SACCO has to keep savings, loan decisions, transactions, member records, and accounting in agreement while serving people with very different responsibilities. A member needs a clear account view; staff need controlled workflows, reporting, and an audit trail behind every financial action.",
    contribution:
      "I built the platform across the member and staff mobile applications, the web back office, and the Django REST backend. The work connects savings and lending workflows with accounting records, role-aware operations, notifications, and payment-reconciliation paths.",
    flow: [
      "Member profile + KYC",
      "Savings or loan request",
      "Staff review",
      "Ledger + schedule",
      "Member notification",
    ],
    decisions: [
      {
        title: "Give members and operations teams the right view",
        detail:
          "The Flutter applications distinguish member and staff workflows, while a React and TypeScript dashboard gives the back office a focused place to manage members, savings, loans, transactions, accounting, reports, and audit history.",
      },
      {
        title: "Treat financial events as accountable events",
        detail:
          "Loan and savings workflows create double-entry journal records, while role-based permissions and audit trails make the operational history reviewable. Payment callbacks are reconciled against member accounts instead of being treated as isolated messages.",
      },
    ],
    takeaway:
      "MUG brings the member experience and SACCO operations into one platform, with a structure designed for day-to-day financial work rather than a collection of disconnected spreadsheets and messages.",
    category: "FINTECH / SACCO PLATFORM",
    summary: "A member and operations platform for SACCO management.",
    role: "Product architecture & full-stack development",
    description:
      "MUG is a SACCO management platform with Flutter member and staff apps, a React back-office dashboard, and a Django REST backend. It brings together member onboarding, savings, loans, transactions, accounting, reports, notifications, and operational controls.",
    capabilities: [
      "Member and staff experiences for savings, loan applications, account activity, and operational work.",
      "A React and TypeScript back office for members, loans, transactions, accounting, reports, and audit trails.",
      "Loan review, approvals, amortization schedules, guarantor records, and disbursement workflows.",
      "Savings accounts, transaction records, double-entry journals, and M-Pesa payment-reconciliation paths.",
      "Role-based access, local biometric support, secure storage, push notifications, and background tasks.",
    ],
    stack: [
      "Flutter",
      "Dart",
      "React",
      "TypeScript",
      "Django REST",
      "PostgreSQL",
      "Redis + Celery",
      "Firebase",
    ],
    image: {
      path: "projects/mug-logo.png",
      alt: "MUG SACCO product mark with growth arrows",
      caption: "MUG SACCO / product identity",
    },
  },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}
export const experience: Experience[] = [
  {
    company: "Shockwolves BV / under Elewa",
    role: "Engineering & technical leadership",
    period: "JAN 2026 - PRESENT",
    description:
      "Enterprise data platforms, isolated AWS tenant environments, document extraction, and automated provisioning.",
  },
  {
    company: "Elewa / Italanta",
    role: "Full Stack Software Engineer",
    period: "AUG 2023 - PRESENT",
    description:
      "AI-driven education, conversational tools, FarmBetter voice systems, and crisis communications.",
  },
  {
    company: "Three Point Devhub",
    role: "Lead Software Engineer / Co-founder",
    period: "VENTURE BUILDING",
    description:
      "Full-cycle product delivery across mobility, surveillance analytics, and retail data intelligence.",
  },
  {
    company: "Netbot Solutions",
    role: "Full Stack Software Engineer",
    period: "OCT 2022 - JUL 2023",
    description:
      "Property and visitor management with Django APIs, Flutter applications, authentication, and reporting.",
  },
  {
    company: "Novatta Africa",
    role: "Web Developer",
    period: "2019 - 2024",
    description:
      "Client-facing web applications, e-commerce experiences, payment integrations, and accessible interfaces.",
  },
];

export interface OtherProject {
  name: string;
  category: string;
  description: string;
}

export const otherProjects: OtherProject[] = [
  {
    name: "Payola",
    category: "FINTECH / MOBILE",
    description:
      "A cross-platform crypto payments product with biometric authentication, built across a Flutter app and web dashboard.",
  },
  {
    name: "Haba",
    category: "COMMERCE / AI",
    description:
      "An AI-enabled group-buying marketplace connecting a mobile shopping experience with logistics and operations tooling.",
  },
  {
    name: "Cory",
    category: "HEALTH / COMPUTER VISION",
    description:
      "A skin-analysis product combining a mobile experience, computer vision, and a clinician-facing review dashboard.",
  },
  {
    name: "FarmBetter IVR",
    category: "AGRICULTURE / VOICE AI",
    description:
      "Agricultural advice over a phone call, connecting Twilio, Azure TTS, and Google Cloud Functions.",
  },
  {
    name: "MCP Router",
    category: "AI / DEVELOPER TOOLS",
    description:
      "A Python routing layer that connects MCP clients with specialized AI agents for engineering workflows.",
  },
  {
    name: "Elewa Content Engine",
    category: "CONTENT / WEB PLATFORM",
    description:
      "An Astro website and Keystatic CMS within a broader marketing content and agent workflow.",
  },
  {
    name: "Smart Sustainability",
    category: "IOT / CIRCULAR ECONOMY",
    description:
      "A connected recycling and sustainability concept designed around collection data, participation, and operational visibility.",
  },
  {
    name: "Building Management System",
    category: "PROPERTY / MOBILE",
    description:
      "Tenant, visitor, security, and reporting workflows brought together through Django APIs and Flutter applications.",
  },
];

export const contact = {
  email: "paulkoimbori@gmail.com",
  github: "https://github.com/paulkahura",
  linkedin: "https://www.linkedin.com/in/paul-kahura/",
};
