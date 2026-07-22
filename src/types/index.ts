export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  tags: string[];
  technologies: string[];
  type: 'Personal' | 'Team';
  status: 'Completed' | 'In Progress';
  year: number;
  createdAt?: string;
  updatedAt?: string;
  githubUrl?: string;
  demoUrl?: string;
}
