import React from "react";

declare global {
  interface Window {
    Swiper: any;
  }
}

export type PageView =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "blog"
  | "blogdetails"
  | "contact"
  | "casestudy"
  | "angelmonkey"
  | "plationathome"
  | "cms"
  | "tripatakaland"
  | "resume";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  fullCaseStudy?: {
    challenge: string;
    solution: string;
    results: { label: string; value: string }[];
    gallery: string[];
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  sourceUrl?: string;
  publishedDate?: string;
  fullContent?: string; // Full HTML content from RSS
  author?: string; // Author name if available
  sourceName?: string; // Source name (e.g., "Dev.to", "Hacker News")
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features?: string[];
  priceRange?: string;
  icon: React.ElementType;
}

export interface Skill {
  name: string;
  icon: React.ElementType;
  category: "frontend" | "backend" | "devops";
}

export interface Stat {
  value: string;
  label: string;
}
