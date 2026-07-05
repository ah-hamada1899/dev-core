// Navigation types
export interface NavLink {
  href: string;
  label: string;
}

// Project types
export interface ProjectTag {
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: ProjectTag[];
  featured?: boolean;
  category?: string;
  link?: string;
}

// Skill types
export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

// Theme types
export interface ThemeColors {
  primary: string;
  surface: string;
  background: string;
  onSurface: string;
  onPrimary: string;
  // Add other color properties as needed
}

// Section reference types
export type SectionRef = (HTMLElement | null);

// Social link types
export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

// Footer link types
export interface FooterLink {
  label: string;
  url: string;
}