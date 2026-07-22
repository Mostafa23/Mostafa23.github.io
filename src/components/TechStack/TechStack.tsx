import { BrainCircuit, Code2, Layout, Server, Database, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    title: 'AI & Deep Learning',
    icon: BrainCircuit,
    items: ['PyTorch', 'TensorFlow', 'Transformers', 'Hugging Face', 'Scikit-learn', 'OpenCV', 'YOLO', 'NLTK', 'Spacy']
  },
  {
    title: 'Languages',
    icon: Code2,
    items: ['Python', 'C++', 'Java', 'C#', 'JavaScript', 'TypeScript']
  },
  {
    title: 'Frontend Development',
    icon: Layout,
    items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap']
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    items: ['FastAPI', 'Node.js', 'MongoDB', 'REST APIs']
  },
  {
    title: 'Data Science',
    icon: Database,
    items: ['Pandas', 'NumPy', 'Data Visualization', 'Time Series']
  },
  {
    title: 'Systems & Tools',
    icon: Wrench,
    items: ['Git/GitHub', 'Docker', 'Postman', 'VS Code', 'Arduino', 'CCNA']
  }
];

const TechStack = () => {
  return (
    <section id="skills" className="space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-8"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center">Technical Skills</h2>
        <div className="w-16 h-1 bg-blue-500 mt-4 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-emerald-500/0 group-hover:from-blue-500/5 group-hover:to-emerald-500/5 transition-colors duration-500" />
              
              <div className="relative flex items-center gap-4 mb-6">
                <div className="p-3 bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] group-hover:border-blue-500/50 group-hover:scale-110 transition-all">
                  <Icon className="text-blue-500" size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{category.title}</h3>
              </div>
              
              <div className="relative flex flex-wrap gap-2">
                {category.items.map(skill => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] group-hover:border-gray-500 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;
