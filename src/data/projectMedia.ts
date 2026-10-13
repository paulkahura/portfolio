export interface ProjectSlide {
  path: string;
  title: string;
  caption: string;
  format: "web" | "mobile";
}

export interface ProjectGallery {
  title: string;
  description: string;
  slides: ProjectSlide[];
}

const shot = (name: string) => `projects/showcase/${name}.png`;

export const projectGalleries: Record<string, ProjectGallery[]> = {
  socio: [
    {
      title: "A conversation, with context.",
      description: "The web product: discovery, rich conversations, and a path from a message to a scheduled session. Rendered from the application's React components with sample content. Client identity is masked in the exported images.",
      slides: [
        { path: shot("socio-web-chat"), title: "Chat & image attachments", caption: "Web / image sharing, replies, and the message composer. Sample conversation.", format: "web" },
        { path: shot("socio-web-booking"), title: "Find a time to connect", caption: "Web / voice and video booking slots. Sample availability.", format: "web" },
        { path: shot("socio-web-sessions"), title: "Sessions, in one place", caption: "Web / proposals, approved rooms, and session history. Sample appointments.", format: "web" },
        { path: shot("socio-web-feed"), title: "The discovery feed", caption: "Web / the original feed components, populated with sample media.", format: "web" },
        { path: shot("socio-web-profile"), title: "A creator's corner", caption: "Web / profile, media grid, and communication actions. Sample profile.", format: "web" },
      ],
    },
    {
      title: "Built to go with you.",
      description: "Native Flutter onboarding alongside the web product at phone size. The captions distinguish the two, so you can see both the app and the responsive experience.",
      slides: [
        { path: shot("socio-native-signin"), title: "A familiar way in", caption: "Native Flutter / sign-in screen rendered from the app's widgets. Client name masked.", format: "mobile" },
        { path: shot("socio-responsive-chat"), title: "Attachments on the move", caption: "Responsive web / the chat and image attachment view at phone size. Sample conversation.", format: "mobile" },
        { path: shot("socio-responsive-booking"), title: "Make space for a conversation", caption: "Responsive web / choosing a voice or video session on a phone. Sample availability.", format: "mobile" },
        { path: shot("socio-native-signup"), title: "Join the community", caption: "Native Flutter / registration rendered from the app's widgets. Client name masked.", format: "mobile" },
        { path: shot("socio-native-account"), title: "The right account for you", caption: "Native Flutter / individual and organisation account selection.", format: "mobile" },
      ],
    },
  ],
  repsafe: [{
    title: "A new name. The same critical first hour.",
    description: "Previously Repsafe, now FirstHour.ai. This capture shows the public website and current identity; my contribution was to the crisis-communication platform described below.",
    slides: [{path:shot("firsthour-website"),title:"FirstHour.ai",caption:"Public website capture / firsthour.ai / October 2026.",format:"web"}],
  }],
  "blue-box-ai": [{
    title: "From footage to a useful answer.",
    description: "An interface study illustrating the camera, event, and query workflows in Blue Box AI. The layout and values below are illustrative sample content, not a production screenshot or performance claim.",
    slides: [{path:shot("bluebox-interface"),title:"Camera operations",caption:"Interface concept / sample camera frame, event counts, and activity.",format:"web"}],
  }],
};

export const projectCovers: Record<string, string> = {
  socio: shot("socio-web-chat"),
  repsafe: shot("firsthour-website"),
  "blue-box-ai": shot("bluebox-interface"),
};
