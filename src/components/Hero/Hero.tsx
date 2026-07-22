import { ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Hero = () => {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center pt-24 pb-10 min-h-[80vh]" id="home"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 w-full">
        
        {/* Left Column: Image and Badge */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 shrink-0">
          <img 
            src="https://github.com/Mostafa23.png" 
            alt="Mostafa Abdallah" 
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-blue-500/20 object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
          />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium hover:border-gray-500 transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            Available for new opportunities
          </div>
        </motion.div>

        {/* Right Column: Text and Buttons */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Building End-to-End <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              AI Applications.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mb-10 leading-relaxed">
            I am an <strong>AI Engineer & Full-Stack Developer</strong> specializing in Machine Learning, Deep Learning, NLP, and Computer Vision. I build scalable intelligence and the robust web architectures that deliver them.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#projects" className="flex items-center gap-2 bg-[var(--color-text-primary)] text-[var(--color-background)] px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#" className="flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] px-8 py-3.5 rounded-full font-bold hover:scale-105 hover:border-gray-500 transition-all shadow-lg">
              <FileText size={18} /> Download CV
            </a>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
};

export default Hero;
