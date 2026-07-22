import { useState, useEffect } from 'react';
import type { Project } from '../types';
import { projectsData as localProjects } from '../data/projects';

export const useGithubProjects = () => {
  const [projects, setProjects] = useState<Project[]>(localProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Mostafa23/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch from GitHub');
        }
        
        const repos = await response.json();
        
        // Filter out forks, the portfolio repo, and repos without a description
        const validRepos = repos.filter((repo: any) => 
          !repo.fork && 
          repo.name !== 'Mostafa23.github.io' &&
          repo.name !== 'portfolio-v2' &&
          repo.description && 
          repo.description.trim() !== ''
        );

        const githubProjects: Project[] = validRepos.map((repo: any) => {
          // Check if this project already exists in our local data to keep its image
          const existingProject = localProjects.find(
            p => p.githubUrl?.toLowerCase() === repo.html_url.toLowerCase() || p.title.toLowerCase() === repo.name.toLowerCase()
          );

          return {
            id: repo.name,
            title: repo.name.replace(/-/g, ' '),
            description: repo.description || 'No description provided.',
            // Use local image if exists, otherwise use a generated beautiful GitHub OG image
            imageUrl: existingProject?.imageUrl || `https://opengraph.githubassets.com/1/Mostafa23/${repo.name}`,
            tags: repo.topics && repo.topics.length > 0 ? repo.topics : ['project'],
            technologies: existingProject?.technologies || (repo.topics || []).slice(0, 5),
            type: existingProject?.type || 'Personal',
            status: existingProject?.status || 'Completed',
            year: existingProject?.year || new Date(repo.created_at).getFullYear(),
            updatedAt: repo.updated_at,
            demoUrl: repo.homepage || existingProject?.demoUrl,
            githubUrl: repo.html_url,
          };
        });

        // Merge local projects that might not be on GitHub (e.g., private or different source)
        const finalProjects = [...githubProjects];
        localProjects.forEach(localP => {
          if (!finalProjects.find(fp => fp.title.toLowerCase() === localP.title.toLowerCase())) {
            finalProjects.push(localP);
          }
        });

        // Sort by last modified date descending (newest first)
        finalProjects.sort((a, b) => {
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : new Date(a.year.toString()).getTime();
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : new Date(b.year.toString()).getTime();
          return dateB - dateA;
        });

        setProjects(finalProjects);
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Fallback to local projects if API fails
        setProjects(localProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { projects, loading };
};
