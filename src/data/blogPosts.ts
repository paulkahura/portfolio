export const blogPosts = [
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

