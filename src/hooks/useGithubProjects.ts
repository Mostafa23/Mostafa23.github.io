import { useState, useEffect } from 'react';
import type { Project } from '../types';
import { fallbackProjects } from '../data/projects';

// Metadata overrides for repositories that may lack description/topics on GitHub or need custom titles
interface RepoMetadataOverride {
  title?: string;
  description?: string;
  tags?: string[];
  technologies?: string[];
  imageUrl?: string;
  demoUrl?: string;
}

const repoMetadataOverrides: Record<string, RepoMetadataOverride> = {
  'call-agent': {
    title: 'Voice Arbitrator (Call Agent)',
    description: 'Autonomous Real-Time Voice Fact-Checking & Epistemic Arbitration Agent for Discord Voice Channels built for the AssemblyAI Hackathon using AssemblyAI Universal-3.5 Pro, Groq LPU, Tavily Search, and FastAPI.',
    tags: ['ai-agents', 'voice-ai', 'assemblyai', 'groq', 'fastapi', 'realtime-audio'],
    technologies: ['AssemblyAI', 'Groq LPU', 'FastAPI', 'Tavily', 'Edge-TTS', 'Python'],
    imageUrl: 'https://opengraph.githubassets.com/1/Mostafa23/call-agent'
  },
  'Smart-Home-Energy-Forecaster': {
    title: 'Smart Home & Weather Energy Forecaster',
    description: 'An end-to-end Deep Learning pipeline integrating Smart Home Energy Consumption and Weather Type Classification. Builds 1D CNN models with CodeCarbon tracking, FLOPs analysis, and Keras.',
    tags: ['deep-learning', 'cnn', 'time-series', 'tensorflow', 'green-ai'],
    technologies: ['1D-CNN', 'TensorFlow', 'Keras', 'CodeCarbon', 'Python'],
    imageUrl: 'https://opengraph.githubassets.com/1/Mostafa23/Smart-Home-Energy-Forecaster'
  },
  'ClipFast-Simple-FFmpeg-Video-Cutter': {
    title: 'ClipFast Lossless FFmpeg Video Cutter',
    description: 'A lightweight, ultra-fast desktop application built with Python and PySide6 for lossless video cutting powered by FFmpeg with drag-and-drop support.',
    tags: ['desktop-app', 'pyside6', 'ffmpeg', 'python', 'video-processing'],
    technologies: ['Python', 'PySide6', 'FFmpeg', 'GUI'],
    imageUrl: 'https://opengraph.githubassets.com/1/Mostafa23/ClipFast-Simple-FFmpeg-Video-Cutter'
  },
  'Simple-Distributed-Notification-System': {
    title: 'Real-time Notification & Chat System',
    description: 'A real-time WebSocket-based distributed communication system built using FastAPI backend and interactive frontend dashboard for live messaging and subscriber tracking.',
    tags: ['fastapi', 'websockets', 'realtime', 'python', 'distributed-systems'],
    technologies: ['FastAPI', 'WebSockets', 'Python', 'JavaScript'],
    imageUrl: 'https://opengraph.githubassets.com/1/Mostafa23/Simple-Distributed-Notification-System'
  },
  'AI-Maze-Search-Algoritms': {
    title: 'AI Maze Search Algorithms',
    description: 'Maze Navigation BFS, DFS, and UCS Search Algorithms implemented in Python.',
    tags: ['algorithms', 'artificial-intelligence', 'search-algorithms'],
    technologies: ['BFS', 'DFS', 'UCS', 'Python']
  },
  'Ratatouille_3_Micromouse': {
    title: 'Ratatouille 3 Micromouse Robot',
    description: "Remi 3 — micromouse autonomous maze robot that won 2nd place at IEEE Mansoura's Victories 4 micromouse competition. Includes PCB schematics, fabrication files, CAD models, and firmware.",
    tags: ['robotics', 'embedded', 'hardware', 'c', 'ieee'],
    technologies: ['C', 'Robotics', 'PCB Design', 'CAD', 'Firmware'],
    imageUrl: 'https://opengraph.githubassets.com/1/yousseftamer-eng/Ratatouille_3_Micromouse'
  },
  'Mostafa23.github.io': {
    imageUrl: 'https://Mostafa23.github.io/banner.jpg'
  }
};

export const useGithubProjects = () => {
  // Initialize with cached projects or fallback projects so UI renders immediately
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const cached = localStorage.getItem('githubProjectsCache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // localStorage may fail in private mode
    }
    return fallbackProjects;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const cachedData = localStorage.getItem('githubProjectsCache');
        const cachedTime = localStorage.getItem('githubProjectsTime');
        const cacheExpiry = 60 * 60 * 1000; // 1 hour

        if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime) < cacheExpiry)) {
          const parsed = JSON.parse(cachedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjects(parsed);
            return;
          }
        }

        const response = await fetch('https://api.github.com/users/Mostafa23/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error(`GitHub API returned status ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter out forks, portfolio repos, and empty practice repos
        const validRepos = repos.filter((repo: any) => {
          if (repo.fork) return false;
          if (repo.name === 'portfolio-v2' || repo.name === 'Mostafa23.github.io') return false;
          
          // Allow if has description or custom override
          const hasDesc = Boolean(repo.description && repo.description.trim() !== '');
          const hasOverride = Boolean(repoMetadataOverrides[repo.name]);
          return hasDesc || hasOverride;
        });

        // Fetch additional team/contributed repositories
        const additionalRepos = [
          'Aethea-Project/Aethea',
          'yousseftamer-eng/Ratatouille_3_Micromouse',
          'Tickety-ORG/TicketyProject'
        ];
        
        const additionalResponses = await Promise.allSettled(
          additionalRepos.map(repo => fetch(`https://api.github.com/repos/${repo}`))
        );
        
        const additionalData: any[] = [];
        for (const res of additionalResponses) {
          if (res.status === 'fulfilled' && res.value.ok) {
            try {
              const data = await res.value.json();
              additionalData.push(data);
            } catch {
              // Ignore json parse error for single repo
            }
          }
        }

        // Combine all repos
        const allRepos = [...validRepos, ...additionalData];

        const githubProjects: Project[] = allRepos.map((repo: any) => {
          const override = repoMetadataOverrides[repo.name] || {};
          const isTeamProject = repo.owner && repo.owner.login !== 'Mostafa23';

          // Generate fallback image URLs (Custom Override -> Repo banner.jpg -> Repo banner.png -> OpenGraph)
          const fallbackUrls: string[] = [];
          if (override.imageUrl) {
            fallbackUrls.push(override.imageUrl);
          }
          
          const defaultBranch = repo.default_branch || 'main';
          const ownerLogin = repo.owner?.login || 'Mostafa23';
          fallbackUrls.push(`https://raw.githubusercontent.com/${ownerLogin}/${repo.name}/${defaultBranch}/assets/banner.jpg`);
          fallbackUrls.push(`https://raw.githubusercontent.com/${ownerLogin}/${repo.name}/${defaultBranch}/assets/banner.png`);
          fallbackUrls.push(`https://opengraph.githubassets.com/1/${ownerLogin}/${repo.name}`);
          
          const title = override.title || repo.name.replace(/[-_]/g, ' ');
          const description = override.description || repo.description || 'Open source project by Mostafa Abdallah.';
          const tags = override.tags || (repo.topics && repo.topics.length > 0 ? repo.topics : ['project']);
          const technologies = override.technologies || (repo.topics || []).slice(0, 5);

          return {
            id: repo.name,
            title,
            description,
            imageUrls: fallbackUrls,
            tags,
            technologies,
            type: isTeamProject ? 'Team' : 'Personal',
            status: 'Completed',
            year: new Date(repo.created_at || Date.now()).getFullYear(),
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            demoUrl: override.demoUrl || repo.homepage || undefined,
            githubUrl: repo.html_url,
          };
        });

        // Sort by creation date descending (newest projects first)
        githubProjects.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });

        // Save to cache
        if (githubProjects.length > 0) {
          localStorage.setItem('githubProjectsCache', JSON.stringify(githubProjects));
          localStorage.setItem('githubProjectsTime', Date.now().toString());
          setProjects(githubProjects);
        }
      } catch (error) {
        console.warn('Could not refresh GitHub projects dynamically, using cached/fallback projects:', error);
        // If state is empty for some reason, ensure fallbackProjects is set
        setProjects(prev => (prev.length > 0 ? prev : fallbackProjects));
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { projects, loading };
};
