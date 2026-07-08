export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'In Development' | 'Active' | 'Completed';
  progress: number;
  techStack: string[];
  features: string[];
  metrics?: { label: string; value: string; trend?: string }[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Frontend' | 'Backend' | 'DevOps & Tools' | 'Specialized';
  iconName: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
  colorClass: string;
}

export interface TimelineEvent {
  year: string;
  role: string;
  company: string;
  description: string;
  iconName: string;
}
