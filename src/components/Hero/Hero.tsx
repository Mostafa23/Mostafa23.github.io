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
        
        {/* Left Column: Text and Buttons */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 order-2 lg:order-1">
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 whitespace-nowrap">
              Mostafa Abdallah
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mb-10 leading-relaxed font-medium">
            <span className="block mb-1">AI & Machine Learning Engineer</span>
            <span className="block mb-1 text-[var(--color-text-primary)]">Computer Vision & Deep Learning Specialist</span>
            <span className="text-blue-400 font-semibold">Python, PyTorch, MLOps</span>
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <a 
              href="#contact"
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2 group"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="/Mostafa_CV.pdf" 
              download="Mostafa_CV.pdf"
              className="px-8 py-3 bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-full font-medium border border-[var(--color-border)] hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Right Column: Image and Badge */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 shrink-0 order-1 lg:order-2">
          <img 
            src="https://github.com/Mostafa23.png" 
            alt="Mostafa Abdallah" 
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-blue-500/20 object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
          />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium hover:border-gray-500 transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            Available for new opportunities
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Hero;
