import { z } from "zod";
import type { SectionSchema } from "./cms.types";

// Zod Validation Schemas for Server-Side Validation
export const ProfileZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameLines: z.array(z.string()),
  tagline: z.string().min(1, "Tagline is required"),
  subTagline: z.string().min(1, "Sub-tagline is required"),
  location: z.string(),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  availability: z.string(),
  email: z.string().email("Valid email required"),
  phone: z.string(),
  linkedin: z.string().url("Valid LinkedIn URL required"),
  github: z.string().url("Valid GitHub URL required"),
});

export const StatItemZodSchema = z.object({
  value: z.number(),
  display: z.string(),
  label: z.string(),
});

export const EducationZodSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  period: z.string(),
  cgpa: z.string(),
});

export const ExperienceItemZodSchema = z.object({
  period: z.string(),
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string(),
  bullets: z.array(z.string()),
});

export const ProjectItemZodSchema = z.object({
  index: z.string(),
  title: z.string().min(1),
  category: z.string(),
  tags: z.array(z.string()),
  awards: z.array(z.string()),
  github: z.string(),
  bullets: z.array(z.string()),
});

export const PodcastItemZodSchema = z.object({
  ep: z.string(),
  title: z.string().min(1),
  duration: z.string(),
  url: z.string(),
});

export const GalleryItemZodSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  meta: z.string(),
  description: z.string(),
  img: z.string().url("Image must be a valid URL"),
});

export const SkillCategoryZodSchema = z.object({
  number: z.string(),
  category: z.string().min(1),
  items: z.array(z.string()),
});

export const AwardItemZodSchema = z.object({
  index: z.string(),
  title: z.string().min(1),
  scope: z.string(),
  description: z.string(),
});

export const PortfolioContentZodSchema = z.object({
  profile: ProfileZodSchema,
  stats: z.array(StatItemZodSchema),
  education: EducationZodSchema,
  certifications: z.array(z.string()),
  experience: z.array(ExperienceItemZodSchema),
  projects: z.array(ProjectItemZodSchema),
  podcastEpisodes: z.array(PodcastItemZodSchema),
  galleryItems: z.array(GalleryItemZodSchema),
  skills: z.array(SkillCategoryZodSchema),
  skillContributions: z.record(z.string(), z.string()),
  awards: z.array(AwardItemZodSchema),
});

// Section Definitions driving the Admin CMS Forms
export const CMS_SECTIONS: SectionSchema[] = [
  {
    id: "profile",
    title: "HERO & PERSONAL PROFILE",
    description: "Header branding, title headline, location, and social links",
    visualTarget: "#hero",
    fields: [
      { key: "name", label: "Full Name", type: "text", placeholder: "SIDDHANT VASHISTH" },
      { key: "tagline", label: "Main Tagline", type: "textarea", helpText: "Displayed under hero headline" },
      { key: "subTagline", label: "Sub-tagline", type: "textarea", helpText: "Secondary hero text" },
      { key: "location", label: "Location", type: "text", placeholder: "GUNA, MADHYA PRADESH, IN" },
      { key: "availability", label: "Availability Status", type: "text", placeholder: "OPEN · Q4 2026" },
      { key: "email", label: "Email Address", type: "text" },
      { key: "phone", label: "Phone Number", type: "text" },
      { key: "linkedin", label: "LinkedIn URL", type: "text" },
      { key: "github", label: "GitHub URL", type: "text" },
    ],
  },
  {
    id: "stats",
    title: "HERO METRICS & STATS",
    description: "Numeric telemetry counters shown in hero card deck",
    visualTarget: "#hero-stats",
    fields: [
      {
        key: "stats",
        label: "Metrics List",
        type: "list",
        itemSchema: [
          { key: "value", label: "Numeric Target Value", type: "number" },
          { key: "display", label: "Formatted Display Label", type: "text", placeholder: "6,200+" },
          { key: "label", label: "Stat Label Text", type: "text", placeholder: "COMPETITORS OUTRANKED" },
        ],
      },
    ],
  },
  {
    id: "experience",
    title: "EXPERIENCE & INTERNSHIPS",
    description: "Work experience history with accomplishments & bullet points",
    visualTarget: "#experience",
    fields: [
      {
        key: "experience",
        label: "Work Experience List",
        type: "list",
        itemSchema: [
          { key: "company", label: "Company Name", type: "text" },
          { key: "role", label: "Role Title", type: "text" },
          { key: "period", label: "Time Period", type: "text", placeholder: "JUN 2025 — AUG 2025" },
          { key: "location", label: "Location", type: "text", placeholder: "REMOTE or LUCKNOW, UP" },
          { key: "bullets", label: "Key Accomplishments", type: "tags", helpText: "Add bullet points describing achievements" },
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "FEATURED PROJECTS & VENTURES",
    description: "Portfolio ventures, tech stacks, hackathon awards & GitHub links",
    visualTarget: "#projects",
    fields: [
      {
        key: "projects",
        label: "Projects List",
        type: "list",
        itemSchema: [
          { key: "index", label: "Project Index", type: "text", placeholder: "01" },
          { key: "title", label: "Project Title", type: "text" },
          { key: "category", label: "Category Subtitle", type: "text", placeholder: "IOT & AI AGRITECH" },
          { key: "tags", label: "Tech Stack Tags", type: "tags" },
          { key: "awards", label: "Awards / Rank Labels", type: "tags" },
          { key: "github", label: "GitHub Repo Link", type: "text" },
          { key: "bullets", label: "Key Achievements & ROI", type: "tags" },
        ],
      },
    ],
  },
  {
    id: "gallery",
    title: "MOMENTS & GALLERY PHOTOS",
    description: "Hackathon photos, awards, and event highlights with CDN image URLs",
    visualTarget: "#gallery",
    fields: [
      {
        key: "galleryItems",
        label: "Gallery Photo Items",
        type: "list",
        itemSchema: [
          { key: "title", label: "Moment Title", type: "text" },
          { key: "meta", label: "Meta / Location Subtitle", type: "text" },
          { key: "img", label: "Image URL", type: "image", helpText: "Upload or paste WebP/JPEG CDN image URL" },
          { key: "description", label: "Detailed Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "skills",
    title: "SKILLS MATRIX & CONTRIBUTIONS",
    description: "Categorized skills list and specific achievement descriptions",
    visualTarget: "#skills",
    fields: [
      {
        key: "skills",
        label: "Skill Categories List",
        type: "list",
        itemSchema: [
          { key: "number", label: "Category Index", type: "text", placeholder: "01" },
          { key: "category", label: "Category Name", type: "text", placeholder: "BUSINESS" },
          { key: "items", label: "Skill Pills", type: "tags" },
        ],
      },
    ],
  },
  {
    id: "education",
    title: "EDUCATION & CERTIFICATIONS",
    description: "Degree details, institution, CGPA, and professional certificates",
    visualTarget: "#about",
    fields: [
      { key: "institution", label: "Institution Name", type: "text" },
      { key: "degree", label: "Degree & Specialization", type: "text" },
      { key: "period", label: "Enrollment Period", type: "text" },
      { key: "cgpa", label: "CGPA / Grade", type: "text" },
      { key: "certifications", label: "Certifications List", type: "tags" },
    ],
  },
  {
    id: "awards",
    title: "HONORS & AWARDS",
    description: "Hackathon wins, ideathons, and conference publications",
    visualTarget: "#awards",
    fields: [
      {
        key: "awards",
        label: "Awards List",
        type: "list",
        itemSchema: [
          { key: "index", label: "Index", type: "text", placeholder: "01" },
          { key: "title", label: "Award Title", type: "text" },
          { key: "scope", label: "Scope Badge", type: "text", placeholder: "INTERNATIONAL" },
          { key: "description", label: "Detailed Award Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "podcast",
    title: "PODCAST EPISODES",
    description: "Audio episodes, title labels, duration, and media file URLs",
    visualTarget: "#podcast",
    fields: [
      {
        key: "podcastEpisodes",
        label: "Podcast Episodes List",
        type: "list",
        itemSchema: [
          { key: "ep", label: "Episode Label", type: "text", placeholder: "EP 01" },
          { key: "title", label: "Episode Title", type: "text" },
          { key: "duration", label: "Duration", type: "text", placeholder: "32 MIN" },
          { key: "url", label: "Audio File URL", type: "text" },
        ],
      },
    ],
  },
];
