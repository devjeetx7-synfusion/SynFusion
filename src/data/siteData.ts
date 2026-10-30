import { NavLink, ServiceItem, ProcessStep, PrincipleItem, FAQItem } from "@/types";

export const BRAND_ASSETS = {
  logo: "https://i.postimg.cc/7PNN0DMg/file-000000006e788243a3aaf94a91b6f9db.png",
  name: "SynFusion",
  tagline: "We Build. We Innovate. We Scale.",
  handle: "@getsynfusion",
};

export const SOCIAL_LINKS = {
  github: "https://github.com/devjeetx7-synfusion",
  instagram: "https://www.instagram.com/getsynfusion/",
  facebook: "https://www.facebook.com/getsynfusion",
  youtube: "https://www.youtube.com/@getsynfusion",
  telegram: "https://t.me/getsynfusion",
  whatsapp: "https://wa.me/919334603912",
};

export const CONTACT_INFO = {
  phone: "+91 9334603912",
  phoneDisplay: "+91 93346 03912",
  email: "dharmjeetsingh958@gmail.com",
  whatsappUrl: "https://wa.me/919334603912?text=Hi%20SynFusion,%20I%20would%20like%20to%20discuss%20a%20project.",
  githubUsername: "devjeetx7-synfusion",
};

export const NAV_LINKS: NavLink[] = [
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Process", href: "#process" },
  { name: "Why Us", href: "#why-us" },
  { name: "Blog", href: "#blog" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const TRUST_PILLARS = [
  { title: "Modern Development", desc: "Latest tech stack & clean architecture" },
  { title: "User-Focused Design", desc: "Intuitive, accessible UI/UX design" },
  { title: "Scalable Solutions", desc: "Built to expand with your business" },
  { title: "Reliable Delivery", desc: "Agile, transparent & timely execution" },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "android-app-development",
    title: "Android App Development",
    description:
      "High-performance native and cross-platform Android applications crafted with Kotlin and Flutter for seamless mobile user experiences.",
    icon: "Smartphone",
    capabilities: [
      "Native Kotlin & Jetpack Compose",
      "Flutter Cross-Platform",
      "Offline Sync & Local Database",
      "Play Store Publishing & Optimization",
    ],
    href: "#contact",
  },
  {
    id: "website-development",
    title: "Website Development",
    description:
      "Lightning-fast, highly modern responsive websites designed to convert visitors and elevate your brand presence globally.",
    icon: "Globe",
    capabilities: [
      "Next.js & React Architecture",
      "Tailwind CSS & GSAP Animations",
      "SEO & Core Web Vitals Optimized",
      "Headless CMS Integration",
    ],
    href: "#contact",
  },
  {
    id: "web-application-development",
    title: "Web Application Development",
    description:
      "Robust, scalable web applications with rich front-end interactivity, real-time sync, and secure cloud API backends.",
    icon: "LayoutGrid",
    capabilities: [
      "Full-Stack React & Node.js/Python",
      "SaaS Architecture & Auth",
      "Real-Time Data Streams & Sockets",
      "RESTful & GraphQL API Design",
    ],
    href: "#contact",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Human-centered design systems, interactive prototypes, and conversion-oriented visual interfaces crafted for web and mobile.",
    icon: "Palette",
    capabilities: [
      "User Journey & Wireframing",
      "Interactive Figma Prototypes",
      "Custom Design Systems",
      "Usability Testing & Micro-Interactions",
    ],
    href: "#contact",
  },
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    description:
      "Tailored enterprise software and internal workflow tools built specifically to automate operations and solve complex business problems.",
    icon: "Code",
    capabilities: [
      "Custom Enterprise Backends",
      "Legacy Code Modernization",
      "Database Optimization & Architecture",
      "Third-Party API Integrations",
    ],
    href: "#contact",
  },
  {
    id: "ai-powered-applications",
    title: "AI-Powered Applications",
    description:
      "Next-generation applications leveraging Large Language Models, generative AI, automated workflows, and intelligent analytics.",
    icon: "Bot",
    capabilities: [
      "LLM & OpenAI/Claude API Integration",
      "Custom RAG & Vector Search",
      "Intelligent Chatbots & Assistants",
      "Predictive Analytics & Automation",
    ],
    href: "#contact",
  },
];

export const PRINCIPLES_DATA: PrincipleItem[] = [
  {
    number: "01",
    title: "Purposeful Design",
    description:
      "Every pixel, color, and interaction is crafted with intent. We prioritize clarity and functionality to create intuitive interfaces users love.",
  },
  {
    number: "02",
    title: "Reliable Development",
    description:
      "We write maintainable, well-tested code following best practices. Security, performance, and stability are built in from day one.",
  },
  {
    number: "03",
    title: "Future-Ready Solutions",
    description:
      "Our architectures are designed to scale cleanly with your business, allowing seamless feature expansions without costly rewrites.",
  },
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    step: "01",
    number: "1",
    title: "Discover",
    description:
      "We dive deep into your target audience, core business goals, product vision, and technical requirements.",
    details: [
      "Requirement Analysis",
      "User Persona Definition",
      "Feasibility Study",
      "Project Roadmap",
    ],
  },
  {
    step: "02",
    number: "2",
    title: "Plan",
    description:
      "We define the technical architecture, data structures, milestone timeline, and feature scope for delivery.",
    details: [
      "System Architecture Design",
      "Tech Stack Selection",
      "Database Schema",
      "Sprint Milestone Planning",
    ],
  },
  {
    step: "03",
    number: "3",
    title: "Design",
    description:
      "We create wireframes, interactive UI prototypes, and high-fidelity mockups centered on user experience.",
    details: [
      "UX Wireframes",
      "Interactive Figma Prototypes",
      "UI Design System",
      "Design Review & Approval",
    ],
  },
  {
    step: "04",
    number: "4",
    title: "Develop",
    description:
      "We build production-grade code, integrate APIs, and perform continuous testing across target platforms.",
    details: [
      "Agile Development Sprints",
      "Frontend & Backend Coding",
      "Automated & Manual QA",
      "Performance Optimization",
    ],
  },
  {
    step: "05",
    number: "5",
    title: "Launch",
    description:
      "We deploy your application to production servers or app stores with smooth, zero-downtime execution and ongoing support.",
    details: [
      "Deployment & App Store Submission",
      "Security Audits",
      "Post-Launch Monitoring",
      "Agreed Support & Maintenance",
    ],
  },
];

export const WHY_SYNFUSION_POINTS = [
  {
    title: "Clean & Maintainable Code",
    desc: "We write strict TypeScript and clean architecture that your team can easily scale and maintain.",
  },
  {
    title: "Responsive User Experiences",
    desc: "Flawless rendering and layout stability tested across mobile, tablet, and desktop viewports.",
  },
  {
    title: "Thoughtful UI/UX",
    desc: "Interfaces engineered for intuitiveness, high conversion rates, and accessibility compliance.",
  },
  {
    title: "Performance-Conscious",
    desc: "Optimized asset loads, minimal bundle sizes, and lightning-fast Core Web Vitals performance.",
  },
  {
    title: "Transparent Communication",
    desc: "Clear milestone tracking, honest feedback, and zero unexpected technical surprises.",
  },
  {
    title: "Solutions Designed to Scale",
    desc: "Architectures built from day one to handle user growth and business evolution effortlessly.",
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "services-provided",
    question: "What services does SynFusion provide?",
    answer:
      "SynFusion specializes in Android app development, custom website development, modern web applications, UI/UX design systems, custom backend software, and AI-powered feature integration.",
  },
  {
    id: "development-process",
    question: "How does the development process work?",
    answer:
      "We follow a structured 5-step process: Discover (understanding goals), Plan (scope & architecture), Design (UI/UX prototypes), Develop (agile coding & QA), and Launch (deployment & agreed support).",
  },
  {
    id: "project-timeline",
    question: "How long does a project take?",
    answer:
      "Project timelines depend on the scope, features, and target platforms. Simple websites may take a few weeks, while complex full-stack web or mobile applications can take several months. We establish clear milestone schedules during discovery.",
  },
  {
    id: "pricing-determination",
    question: "How is project pricing determined?",
    answer:
      "Pricing is calculated based on technical complexity, total feature scope, design requirements, and integration depth. We provide custom tailored quotes with transparent milestone schedules after the initial consultation.",
  },
  {
    id: "improve-existing-app",
    question: "Can you improve an existing application?",
    answer:
      "Yes. We perform code audits, UI/UX redesigns, performance optimizations, and feature expansions for existing Web and Android applications.",
  },
  {
    id: "maintenance-support",
    question: "Do you provide maintenance and support?",
    answer:
      "Yes. We offer post-launch support and maintenance agreements to ensure system security, OS update compatibility, and continuous optimization.",
  },
];
