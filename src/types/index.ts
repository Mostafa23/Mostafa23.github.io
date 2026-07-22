export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  technologies: string[];
  type: 'Personal' | 'Team';
  status: 'Completed' | 'In Progress';
  year: number;
  githubUrl?: string;
  demoUrl?: string;
}
