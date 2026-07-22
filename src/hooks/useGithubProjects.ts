import { useState, useEffect } from 'react';
import type { Project } from '../types';

export const useGithubProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
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

        // Fetch additional team/contributed repositories
        const additionalRepos = [
          'Aethea-Project/Aethea',
          'JoeTamer/Ratatouille_3_Micromouse'
        ];
        
        const additionalResponses = await Promise.all(
          additionalRepos.map(repo => fetch(`https://api.github.com/repos/${repo}`))
        );
        
        const additionalData = await Promise.all(
          additionalResponses.filter(res => res.ok).map(res => res.json())
        );

        // Combine all repos
        const allRepos = [...validRepos, ...additionalData];

        const githubProjects: Project[] = allRepos.map((repo: any) => {
          // If the repo doesn't belong to Mostafa23, consider it a Team project
          const isTeamProject = repo.owner.login !== 'Mostafa23';
          
          return {
            id: repo.name,
            title: repo.name.replace(/-/g, ' '),
            description: repo.description,
            // Automatically generate GitHub OpenGraph Image
            imageUrl: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
            tags: repo.topics && repo.topics.length > 0 ? repo.topics : ['project'],
            technologies: (repo.topics || []).slice(0, 5),
            type: isTeamProject ? 'Team' : 'Personal',
            status: 'Completed',
            year: new Date(repo.updated_at).getFullYear(),
            updatedAt: repo.updated_at,
            demoUrl: repo.homepage,
            githubUrl: repo.html_url,
          };
        });

        // Sort by last modified date descending (newest first)
        githubProjects.sort((a, b) => {
          const dateA = new Date(a.updatedAt!).getTime();
          const dateB = new Date(b.updatedAt!).getTime();
          return dateB - dateA;
        });

        setProjects(githubProjects);
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { projects, loading };
};
