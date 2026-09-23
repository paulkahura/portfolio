export const blogPosts = [
  {
    id: "tenant-isolation-is-a-product-decision",
    title: "Tenant Isolation Is a Product Decision, Not a Database Filter",
    date: "August 26, 2026",
    readTime: "6 min read",
    tags: ["Architecture", "AWS", "Data Platforms"],
    excerpt:
      "The decision behind giving every TIVTAV customer a dedicated environment for operational documents and practice intelligence.",
    content: `
      <h2>The tempting shortcut</h2>
      <p>When a product serves several organisations, it is tempting to start with one shared environment and a tenant identifier on every record. That can be the right trade-off for some products. For TIVTAV, the work starts with sensitive operational documents: payslips, contracts, invoices, receipts, and bills of works. The separation model needed to be part of the product promise, not a convention that every future query had to remember.</p>

      <h2>Start the boundary lower down</h2>
      <p>The platform uses dedicated tenant environments across networking, identity, storage, and data warehousing. This makes the access boundary concrete. It also means a practice can understand where its data is processed without translating an application-level filtering strategy into a security story.</p>

      <h2>Make the expensive decision repeatable</h2>
      <p>Dedicated environments only remain practical when provisioning is repeatable. Infrastructure as code and onboarding workflows turn the environment into a product capability: create the tenant resources, connect the document pipeline, and give the application its tenant-specific services.</p>

      <h2>The lesson</h2>
      <p>Isolation creates more infrastructure work up front. In return, it reduces ambiguity in the places where ambiguity is costly: credentials, storage, analytics, and customer trust. Architecture is not separate from the product when the product handles a company's operational memory.</p>
    `,
  },
  {
    id: "ai-drafts-need-a-decision-loop",
    title: "AI Drafts Need a Decision Loop",
    date: "June 12, 2026",
    readTime: "5 min read",
    tags: ["AI Workflows", "Product Design", "Crisis Communications"],
    excerpt:
      "Why the Repsafe workflow treats AI-generated communication as the beginning of review, not the end of responsibility.",
    content: `
      <h2>A good draft is not a final decision</h2>
      <p>In crisis communication, a quick draft can be valuable. It can turn scattered context into a starting point for a statement, briefing, or key message. But speed is not the same thing as accountability. The important question is not whether a model can write a plausible paragraph; it is whether the team can understand, review, and own what happens next.</p>

      <h2>Keep the context with the work</h2>
      <p>Repsafe brings situation context, AI-assisted drafting, team review, and approvals into one workspace. This avoids treating a generated document as an isolated artefact that gets passed around without its source material, versions, or responsible reviewers.</p>

      <h2>One situation, several outputs</h2>
      <p>A response may need an internal briefing, a press statement, key messages, and social copy. Those formats should share a source of truth while still moving through the right review path. The product choice was to make the human decision loop explicit instead of hiding it behind a generate button.</p>

      <h2>The lesson</h2>
      <p>The useful unit of AI assistance is not a piece of text. It is a workflow that gives people more time to make a considered decision, with a clear history of who reviewed what and why.</p>
    `,
  },
  {
    id: "turning-camera-feeds-into-questions",
    title: "Turning Camera Feeds Into Questions People Can Ask",
    date: "April 2, 2026",
    readTime: "6 min read",
    tags: ["Computer Vision", "Systems Design", "WhatsApp"],
    excerpt:
      "The Blue Box AI design choice: separate detection from delivery so camera events become useful answers instead of more footage.",
    content: `
      <h2>Video is not an answer</h2>
      <p>A camera feed can capture a lot while answering very little. Someone managing a store or office rarely wants to scrub through hours of footage to answer a simple operational question. The goal for Blue Box AI was to turn activity into events that could be counted, searched, and surfaced at the right moment.</p>

      <h2>Separate seeing from sending</h2>
      <p>Computer vision, event storage, and notifications have different jobs. Detection should be able to keep processing a camera source without waiting for a message to be delivered. Background tasks with Celery and Redis keep the notification path from becoming a bottleneck in the visual pipeline.</p>

      <h2>Use the interface people already know</h2>
      <p>A dashboard is useful for setup and monitoring, but a question such as “what happened this afternoon?” should not require a specialist interface. The WhatsApp integration was designed to connect natural-language questions to stored events, counts, and time ranges.</p>

      <h2>The lesson</h2>
      <p>Computer vision becomes operationally useful when its output is expressed in the language of the person asking. The product is not the detection model alone; it is the path from a frame to a decision.</p>
    `,
  },
  {
    id: "shared-models-two-transport-apps",
    title: "Two Transport Apps, One Changing Picture",
    date: "February 11, 2026",
    readTime: "5 min read",
    tags: ["Flutter", "Mobility", "Real-time Systems"],
    excerpt:
      "How Zuka Safari balances separate passenger and driver experiences with shared models for routes, vehicles, fares, and trips.",
    content: `
      <h2>Different jobs, shared reality</h2>
      <p>A passenger wants to discover a route, understand a fare, and see where a vehicle is. A driver needs to manage a vehicle and a trip. Those experiences should not look the same, but they cannot disagree about the same bus, route, or fare.</p>

      <h2>Share the domain, not the whole interface</h2>
      <p>Zuka Safari uses a shared Flutter foundation for models, providers, and services while keeping the passenger and driver applications focused on their own priorities. The shared layer keeps real-time vehicle, route, and trip data consistent without forcing both audiences into a compromised interface.</p>

      <h2>Design the seam before the integration arrives</h2>
      <p>The architecture includes adapter interfaces for possible fleet data and CCTV occupancy sources. That does not claim a live partnership; it creates a deliberate place for those sources when access and implementation are available.</p>

      <h2>The lesson</h2>
      <p>Real-time products need a stable shared vocabulary. When that vocabulary is designed well, each audience can have an interface that feels specific without producing competing versions of reality.</p>
    `,
  },
  {
    id: "financial-events-need-an-audit-story",
    title: "Financial Events Need an Audit Story",
    date: "December 9, 2025",
    readTime: "7 min read",
    tags: ["Fintech", "Django", "Product Architecture"],
    excerpt:
      "The MUG SACCO platform decision to treat savings, lending, approvals, and payment callbacks as accountable events rather than disconnected screens.",
    content: `
      <h2>A financial workflow is more than a form</h2>
      <p>A savings deposit, loan application, approval, disbursement, and payment callback each affect more than the screen where they begin. They need to be visible to the right person, reflected in the right account, and traceable later by someone who was not present when the action happened.</p>

      <h2>Make the history part of the system</h2>
      <p>For MUG SACCO, member and staff workflows are separate, while the underlying system connects savings and lending actions to double-entry journal records, role-based permissions, and audit trails. The intent is not simply to show a balance; it is to retain the operational story behind it.</p>

      <h2>Reconcile messages with accounts</h2>
      <p>Payment callbacks are useful signals, not finished financial records by themselves. Reconciliation paths connect them back to member accounts and the surrounding workflow so that a message from a payment provider is not mistaken for the whole accounting event.</p>

      <h2>The lesson</h2>
      <p>Financial product design has to answer “what happened?” as confidently as it answers “what is the current total?” Building for review from the start creates a calmer operation when exceptions inevitably arrive.</p>
    `,
  },
  {
    id: "video-first-needs-operational-design",
    title: "A Video-First Social Product Still Needs Operations",
    date: "October 18, 2025",
    readTime: "5 min read",
    tags: ["Flutter", "Social Products", "Product Operations"],
    excerpt:
      "The product decisions behind Socio: keeping discovery expressive while treating moderation, preferences, and support as core features.",
    content: `
      <h2>The first impression is the feature</h2>
      <p>Socio was built around a simple observation: static cards do not always give people enough to start a real conversation. Short profile videos make discovery more expressive, but they also introduce work around preparation, caching, connection quality, and safety.</p>

      <h2>Do not leave operations for later</h2>
      <p>Authentication, discovery preferences, notifications, moderation support, and an admin surface were treated as product concerns alongside the mobile experience. A social feed can be visually polished and still become difficult to run if its operational layer is an afterthought.</p>

      <h2>Design for the conversation after discovery</h2>
      <p>Profiles, matching, messaging, and calling form one experience rather than isolated features. The aim was to make a richer introduction useful only when it could lead naturally into a connection people felt able to manage.</p>

      <h2>The lesson</h2>
      <p>Expressive interfaces matter, but trust is built in the less glamorous parts of the product. Product operations are not the back office of a social platform; they are part of the user experience.</p>
    `,
  },
  {
    id: 'ivr-system-architecture',
    title: "Scaling Voice: Architecting the FarmBetter IVR System",
    date: "August 15, 2024",
    readTime: "8 min read",
    tags: ["System Architecture", "Azure", "Twilio"],
    excerpt: "How we built a resilient voice response system handling thousands of concurrent calls for farmers in low-connectivity regions using Azure TTS and Google Cloud Functions.",
    content: `
      <h2>The Challenge</h2>
      <p>Providing vital agricultural information to farmers in remote areas presented a unique challenge: internet connectivity is often unreliable or non-existent, but mobile network coverage for voice calls is widespread. We needed a solution that could deliver personalized, AI-driven advice through a standard phone call.</p>

      <h2>Architecture Overview</h2>
      <p>The system architecture relies on a tightly integrated trio of services:</p>
      <ul>
        <li><strong>Twilio Programmable Voice:</strong> Handles the telephony layer, managing inbound calls and gathering user input via DTMF tones.</li>
        <li><strong>Google Cloud Functions:</strong> Serves as the serverless backend logic, processing user inputs and orchestrating the flow of information.</li>
        <li><strong>Azure Text-to-Speech (TTS):</strong> Provides high-quality, natural-sounding voice synthesis in local dialects, crucial for user trust and understanding.</li>
      </ul>

      <h2>Key Learnings</h2>
      <p>One of the biggest hurdles was latency. Generating audio on the fly can be slow. We implemented a tiered caching strategy where common responses are pre-generated and stored in a CDN, while dynamic, personalized content is generated in real-time but optimized for stream delivery.</p>
    `
  },
  {
    id: 'iot-sustainability',
    title: "IoT & Sustainability: Building the Smart Recycling Ecosystem",
    date: "July 22, 2024",
    readTime: "6 min read",
    tags: ["IoT", "Sustainability", "Real-time"],
    excerpt: "Connecting physical recycling bins to the cloud. A deep dive into the MQTT protocols and sensor networks that power our smart deposit refund system.",
    content: `
      <h2>Bridging Physical and Digital</h2>
      <p>The Smart Sustainability System isn't just about software; it's about physical interactions. Users deposit a cup, and the system must instantly recognize it, validate it, and process a refund. This required a robust IoT network.</p>

      <h2>Sensor Integration</h2>
      <p>We utilized a combination of weight sensors and computer vision (running on edge devices) to identify deposited items. The data is transmitted via MQTT to our backend, ensuring lightweight and reliable messaging even on unstable networks.</p>
      
      <h2>Real-time Feedback</h2>
      <p>Users receive instant feedback on a built-in display and through a mobile app notification. This loop—action, verification, reward—gamifies the recycling process and has led to a 40% increase in user engagement compared to traditional bins.</p>
    `
  },
  {
    id: 'crisis-ai-sentiment',
    title: "AI in Crisis Management: Real-time Sentiment Analysis",
    date: "June 10, 2024",
    readTime: "10 min read",
    tags: ["AI", "NLP", "Crisis Management"],
    excerpt: "Leveraging LLMs to analyze public sentiment during emergencies. How we fine-tuned models to detect urgency and emotion in real-time social streams.",
    content: `
      <h2>Information Overload</h2>
      <p>During a crisis, information flows rapidly and chaotically. Decision-makers need to cut through the noise. Our platform aggregates data from social media, news feeds, and direct reports, but the volume is overwhelming for humans to process manually.</p>

      <h2>The AI Engine</h2>
      <p>We integrated a pipeline of NLP models. First, a lightweight classifier filters for relevance. Then, a more complex sentiment analysis model (fine-tuned on crisis-specific datasets) determines the emotional tone: panic, anger, relief, etc. Finally, an LLM summarizes clusters of related reports into actionable intelligence.</p>

      <h2>Impact</h2>
      <p>This system allows responders to identify hotspots of distress that might not yet be reported through official channels, reducing response times significantly.</p>
    `
  },
  {
    id: 'building-access-control',
    title: "Secure & Seamless: Rethinking Building Access Control",
    date: "May 05, 2024",
    readTime: "7 min read",
    tags: ["Security", "Mobile Dev", "Flutter"],
    excerpt: "Moving beyond keycards. Implementing a QR-based dynamic access system with Flutter and Django that balances high security with user convenience.",
    content: `
      <h2>The Friction of Access</h2>
      <p>Traditional physical access cards are easily lost and hard to manage. We wanted a system where the user's phone is the key, but security could not be compromised.</p>

      <h2>Dynamic QR Codes</h2>
      <p>We implemented a time-based dynamic QR code system (TOTP-like) within our Flutter app. The code regenerates every 30 seconds, preventing screenshot sharing. The scanner at the door validates this token against the Django backend in real-time.</p>

      <h2>Visitor Management</h2>
      <p>Tenants can issue temporary, restricted passes to visitors. This feature required complex permission logic in our backend to ensure tenants could only grant access to their specific designated areas and times.</p>
    `
  },
  {
    id: 'nextjs-performance',
    title: "Optimizing Next.js for High-Traffic Dashboards",
    date: "April 12, 2024",
    readTime: "5 min read",
    tags: ["Next.js", "Performance", "Frontend"],
    excerpt: "Techniques for reducing bundle size and improving First Contentful Paint (FCP) on data-heavy analytic dashboards.",
    content: `
      <h2>The Data Problem</h2>
      <p>Our analytics dashboard was fetching megabytes of JSON data on initial load, leading to a sluggish experience. We needed to rethink our data fetching strategy.</p>

      <h2>Server Components & Streaming</h2>
      <p>Migrating to React Server Components allowed us to move heavy data processing to the server. We also implemented streaming for the chart components, allowing the UI shell to load instantly while the complex visualizations pop in as data becomes available.</p>
      
      <h2>Result</h2>
      <p>We reduced the initial JS bundle size by 35% and improved LCP scores from 2.5s to 0.8s, making the application feel instantaneous even on 4G networks.</p>
    `
  }
];
