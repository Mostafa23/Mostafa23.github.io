import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useGithubProjects } from '../../hooks/useGithubProjects';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const { projects, loading } = useGithubProjects();

  // Dynamically generate top filters based on tags frequency
  const tagCounts: { [key: string]: number } = {};
  projects.forEach(p => {
    p.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  // Get top 6 tags by frequency
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(entry => entry[0]);

  const filters = ['All', ...topTags];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'All' ? true : project.tags.includes(activeFilter)
  );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="projects" className="space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-8"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-4">Projects</h2>
        <p className="text-[var(--color-text-secondary)] text-center max-w-2xl">A selection of my recent open-source work and technical contributions.</p>
        <div className="w-16 h-1 bg-blue-500 mt-6 rounded-full"></div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter 
                    ? 'bg-blue-600 text-white border border-blue-600' 
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-white border border-[var(--color-border)] hover:border-gray-500 hover:bg-gray-800'
                }`}
              >
                {filter === 'All' ? 'All Projects' : filter}
              </button>
            ))}
          </div>

          {filteredProjects.length > 0 ? (
            <>
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {displayedProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              
              {filteredProjects.length > 3 && (
                <motion.div layout className="flex justify-center mt-8 pt-4">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-8 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full font-bold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                  >
                    {showAll ? 'Show Less' : `View All GitHub Projects (${filteredProjects.length})`}
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-[var(--color-text-secondary)] border border-dashed border-[var(--color-border)] rounded-xl">
              No projects found for the selected filter.
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Projects;
