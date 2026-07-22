import { motion } from 'framer-motion';
import { useGithubProjects } from '../../hooks/useGithubProjects';

const Stats = () => {
  const { projects } = useGithubProjects();

  // Calculate dynamic stats
  const totalProjects = projects.length > 0 ? projects.length : 10;
  
  // Count unique technologies/tags
  const uniqueTechs = new Set(projects.flatMap(p => p.tags));
  const techCount = uniqueTechs.size > 0 ? uniqueTechs.size : 15;

  // Calculate years of experience dynamically (assuming started in 2022/2023)
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - startYear;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-[var(--color-border)] my-8 bg-[var(--color-surface)]/30 rounded-2xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <span className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-2">{totalProjects}+</span>
        <span className="text-sm md:text-base font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Total Projects</span>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center text-center"
      >
        <span className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-2">{techCount}+</span>
        <span className="text-sm md:text-base font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Technologies</span>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center text-center"
      >
        <span className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-2">{yearsExperience}</span>
        <span className="text-sm md:text-base font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Years Experience</span>
      </motion.div>
    </section>
  );
};

export default Stats;
