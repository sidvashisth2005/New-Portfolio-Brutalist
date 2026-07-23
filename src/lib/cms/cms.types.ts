export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "list"
  | "tags"
  | "select"
  | "object";

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  itemSchema?: FieldSchema[]; // For list types
}

export interface SectionSchema {
  id: string;
  title: string;
  description: string;
  visualTarget: string; // DOM selector or screenshot hint (e.g. "#hero", "#projects")
  fields: FieldSchema[];
}

export interface ProfileContent {
  name: string;
  nameLines: string[];
  tagline: string;
  subTagline: string;
  location: string;
  coords: { lat: number; lng: number };
  availability: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface StatItem {
  value: number;
  display: string;
  label: string;
}

export interface EducationContent {
  institution: string;
  degree: string;
  period: string;
  cgpa: string;
}

export interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  location: string;
  bullets: string[];
}

export interface ProjectItem {
  index: string;
  title: string;
  category: string;
  tags: string[];
  awards: string[];
  github: string;
  bullets: string[];
}

export interface PodcastItem {
  ep: string;
  title: string;
  duration: string;
  url: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  meta: string;
  description: string;
  img: string;
}

export interface SkillCategoryItem {
  number: string;
  category: string;
  items: string[];
}

export interface AwardItem {
  index: string;
  title: string;
  scope: string;
  description: string;
}

export interface PortfolioContentData {
  profile: ProfileContent;
  stats: StatItem[];
  education: EducationContent;
  certifications: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  podcastEpisodes: PodcastItem[];
  galleryItems: GalleryItem[];
  skills: SkillCategoryItem[];
  skillContributions: Record<string, string>;
  awards: AwardItem[];
}
