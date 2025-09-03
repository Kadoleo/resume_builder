export type BasicInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type ProjectItem = {
  name: string;
  role: string;
  impact: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export type ResumeFormData = {
  basicInfo: BasicInfo;
  skills: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
};

export type ResumeTemplate = "classic" | "modern" | "minimal" | "sidebar" | "mono";

