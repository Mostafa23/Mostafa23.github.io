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

  // Calculate total GitHub stars across all repos
  // We can fetch this from github API, but since we didn't store stars in the hook yet,
  // we'll leave it as a placeholder or we can update the hook.
  // For now, let's use "Core Domains" as 4, or we can use GitHub Stars if we update the hook.

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-[var(--color-border)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col"
      >
        <span className="text-3xl font-bold text-[var(--color-text-primary)]">{totalProjects}+</span>
        <span className="text-sm text-[var(--color-text-secondary)] mt-1">Total Projects</span>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col"
      >
        <span className="text-3xl font-bold text-[var(--color-text-primary)]">{techCount}+</span>
        <span className="text-sm text-[var(--color-text-secondary)] mt-1">Technologies</span>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-start"
      >
        <img 
          src="https://komarev.com/ghpvc/?username=Mostafa23&style=flat-square&color=blue&label=VIEWS" 
          alt="Profile Views" 
          className="h-8 object-contain mb-1"
        />
        <span className="text-sm text-[var(--color-text-secondary)] mt-1">Profile Views</span>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col"
      >
        <span className="text-3xl font-bold text-[var(--color-text-primary)]">{yearsExperience}</span>
        <span className="text-sm text-[var(--color-text-secondary)] mt-1">Years Experience</span>
      </motion.div>
    </section>
  );
};

export default Stats;
