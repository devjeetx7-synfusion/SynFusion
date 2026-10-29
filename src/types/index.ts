export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  href: string;
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  category: "Mobile Apps" | "Websites" | "Web Applications";
  categoryKey: "mobile" | "website" | "webapp";
  description: string;
  fullDescription: string;
  technologies: string[];
  isConcept?: boolean;
  highlight: string;
  link?: string;
  metrics?: string[];
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavLink {
  name: string;
  href: string;
}
