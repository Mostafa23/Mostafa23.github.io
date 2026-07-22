import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ChevronDown } from 'lucide-react';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-8"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center">About Me</h2>
        <div className="w-16 h-1 bg-blue-500 mt-4 rounded-full"></div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-[var(--color-text-secondary)] leading-relaxed space-y-6 text-lg"
        >
          <p>
            I am a Software Engineering student at the Egyptian Chinese University with a solid foundation in Computer Science and hands-on experience in both full-stack development and Artificial Intelligence.
          </p>
          <p>
            My technical expertise spans across C++, Python, and modern web frameworks, but my true passion lies in building scalable machine learning models and intelligent software architectures. I thrive in environments where I can leverage my strong background in data structures and algorithms to solve complex, real-world problems.
          </p>
        </motion.div>

        {/* Right Side: Education Card */}
        <motion.div 
          layout
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 cursor-pointer hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
        >
          <motion.div layout className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="text-blue-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Education</h3>
            <p className="font-semibold text-[var(--color-text-primary)]">Bachelor of Science in Software Engineering</p>
            <p className="text-[var(--color-text-secondary)] mt-1">Egyptian Chinese University</p>
            <p className="text-sm text-gray-500 mt-2 font-medium">2021 - 2026 | Grade: Very Good</p>
            
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="mt-4 text-gray-400 group-hover:text-blue-500">
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>

          {/* Expanded Details: Certifications */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-[var(--color-border)] mt-6 pt-6"
              >
                <div className="flex items-center justify-center gap-2 mb-4 text-emerald-400">
                  <Award size={20} />
                  <h4 className="font-bold text-lg">Certifications & Courses</h4>
                </div>
                <ul className="space-y-4 text-sm text-left">
                  <li className="flex flex-col">
                    <span className="font-bold text-[var(--color-text-primary)]">Machine Learning Specialization</span>
                    <span className="text-gray-500">DeepLearning.AI & Stanford University</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="font-bold text-[var(--color-text-primary)]">Deep Learning Specialization</span>
                    <span className="text-gray-500">DeepLearning.AI</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="font-bold text-[var(--color-text-primary)]">Full-Stack Web Development</span>
                    <span className="text-gray-500">React, Node.js & Databases</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
