
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  
  const handleImageError = () => {
    if (project.imageUrls && imgIndex < project.imageUrls.length - 1) {
      setImgIndex(prev => prev + 1);
    }
  };

  const currentImageUrl = project.imageUrls && project.imageUrls.length > 0 ? project.imageUrls[imgIndex] : undefined;

  return (
    <div className="group flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-gray-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-900 border-b border-[var(--color-border)] relative overflow-hidden">
        {currentImageUrl ? (
          <img 
            src={currentImageUrl} 
            alt={project.title} 
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-700">No Image Available</div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">
              {project.type}
            </span>
            <span className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded-md">
              {project.year}
            </span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-md ${project.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
            {project.status}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto pt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {(project.technologies || []).slice(0, 4).map(tech => (
              <span key={tech} className="text-xs text-gray-400 font-medium">
                #{tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-2 border-t border-[var(--color-border)]">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                <FaGithub size={16} /> Code
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
