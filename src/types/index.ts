// ============ Navigation Types ============
export interface NavLink {
  href: string;
  label: string;
}

// ============ Project Types ============
export interface ProjectTag {
  name: string;
  id?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tags: ProjectTag[];
  featured?: boolean;
  category?: string;
  link?: string;
  year?: number;
}

export interface FeaturedProject extends Project {
  category: string;
  imageAlt: string;
}

// ============ Skill Types ============
export interface Skill {
  name: string;
  icon?: string;
  level?: number; // 1-100
  category?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface SkillStat {
  value: string;
  label: string;
}

// ============ Contact Form Types ============
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// ============ Download CV Types ============
export type DownloadStatus = 'idle' | 'downloading' | 'success' | 'error';

export interface DownloadCVButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
}

// ============ Social Link Types ============
export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
  username?: string;
}

// ============ Footer Types ============
export interface FooterLink {
  label: string;
  url: string;
  icon?: string;
}

// ============ Section/Ref Types ============
export type SectionRef = HTMLElement | null;

export interface SectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

// ============ Theme Types ============
export interface ThemeColors {
  primary: string;
  surface: string;
  background: string;
  onSurface: string;
  onPrimary: string;
  [key: string]: string;
}

// ============ Component Props Types ============
export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

// ============ API Response Types ============
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DownloadCVResponse {
  url?: string;
  filename?: string;
  error?: string;
}

// ============ Utility Types ============
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type WithChildren<T = {}> = T & {
  children?: React.ReactNode;
};

export type ClassName = string | undefined | null;

// ============ Animation/Transition Types ============
export interface AnimationState {
  isVisible: boolean;
  hasAnimated: boolean;
}

export type AnimationVariant = 'fade' | 'slide' | 'scale' | 'float';

// ============ Scroll/Intersection Types ============
export interface ScrollSection {
  id: string;
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
  hasAnimated: boolean;
}

// ============ Form Event Types ============
export type FormChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

// ============ Mouse Event Types ============
export type MouseMoveEvent = React.MouseEvent<HTMLElement>;
export type MouseEnterEvent = React.MouseEvent<HTMLElement>;
export type MouseLeaveEvent = React.MouseEvent<HTMLElement>;

// ============ DOM Ref Types ============
export type ElementRef<T extends HTMLElement = HTMLElement> = React.RefObject<T>;
export type MutableElementRef<T extends HTMLElement = HTMLElement> = React.MutableRefObject<T | null>;

// ============ Hook Return Types ============
export interface UseDownloadCVReturn {
  downloadCV: () => Promise<void>;
  status: DownloadStatus;
  error: string | null;
  progress: number;
}