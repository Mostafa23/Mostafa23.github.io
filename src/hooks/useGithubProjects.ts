import { useState, useEffect } from 'react';
import type { Project } from '../types';

export const useGithubProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // You can easily override the automatic GitHub image by adding the repo name and your custom image URL here.
  const imageOverrides: Record<string, string> = {
    'Mostafa23.github.io': 'https://Mostafa23.github.io/banner.jpg',
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const cachedData = localStorage.getItem('githubProjectsCache');
        const cachedTime = localStorage.getItem('githubProjectsTime');
        const cacheExpiry = 60 * 60 * 1000; // 1 hour

        if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime) < cacheExpiry)) {
          setProjects(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const response = await fetch('https://api.github.com/users/Mostafa23/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch from GitHub');
        }
        
        const repos = await response.json();
        
        // Filter out forks, and repos without a description
        const validRepos = repos.filter((repo: any) => 
          !repo.fork && 
          repo.name !== 'portfolio-v2' &&
          repo.description && 
          repo.description.trim() !== ''
        );

        // Fetch additional team/contributed repositories
        const additionalRepos = [
          'Aethea-Project/Aethea',
          'JoeTamer/Ratatouille_3_Micromouse',
          'Tickety-ORG/TicketyProject'
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

          // Generate fallback image URLs (Custom Override -> Repo banner.jpg -> Repo banner.png -> OpenGraph)
          const fallbackUrls = [];
          if (imageOverrides[repo.name]) {
            fallbackUrls.push(imageOverrides[repo.name]);
          }
          
          const defaultBranch = repo.default_branch || 'main';
          fallbackUrls.push(`https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${defaultBranch}/assets/banner.jpg`);
          fallbackUrls.push(`https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${defaultBranch}/assets/banner.png`);
          fallbackUrls.push(`https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`);
          
          return {
            id: repo.name,
            title: repo.name.replace(/-/g, ' '),
            description: repo.description,
            imageUrls: fallbackUrls,
            tags: repo.topics && repo.topics.length > 0 ? repo.topics : ['project'],
            technologies: (repo.topics || []).slice(0, 5),
            type: isTeamProject ? 'Team' : 'Personal',
            status: 'Completed',
            year: new Date(repo.created_at).getFullYear(),
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            demoUrl: repo.homepage,
            githubUrl: repo.html_url,
          };
        });

        // Sort by creation date descending (newest projects first)
        githubProjects.sort((a, b) => {
          const dateA = new Date(a.createdAt!).getTime();
          const dateB = new Date(b.createdAt!).getTime();
          return dateB - dateA;
        });

        // Save to cache
        localStorage.setItem('githubProjectsCache', JSON.stringify(githubProjects));
        localStorage.setItem('githubProjectsTime', Date.now().toString());

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
