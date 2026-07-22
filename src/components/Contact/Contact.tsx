import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <motion.section 
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="text-blue-400" size={28} />
          <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
        </div>
        <p className="text-[var(--color-text-secondary)] max-w-2xl text-lg">
          I am actively seeking new opportunities to apply my expertise in Machine Learning and Software Engineering. Let's connect and discuss how we can build something impactful together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a 
          href="mailto:tofa201714@gmail.com" 
          className="flex flex-col items-center justify-center p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-gray-500 hover:bg-[var(--color-surface-hover)] transition-colors group"
        >
          <Mail size={32} className="mb-4 text-gray-400 group-hover:text-[var(--color-text-primary)] transition-colors" />
          <span className="font-semibold">Email Me</span>
        </a>

        <a 
          href="https://www.linkedin.com/in/mostafa%D9%90abdallah/" 
          target="_blank" 
          rel="noreferrer"
          className="flex flex-col items-center justify-center p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-gray-500 hover:bg-[var(--color-surface-hover)] transition-colors group"
        >
          <FaLinkedin size={32} className="mb-4 text-gray-400 group-hover:text-[#0077b5] transition-colors" />
          <span className="font-semibold">LinkedIn</span>
        </a>

        <a 
          href="https://github.com/Mostafa23" 
          target="_blank" 
          rel="noreferrer"
          className="flex flex-col items-center justify-center p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-gray-500 hover:bg-[var(--color-surface-hover)] transition-colors group"
        >
          <FaGithub size={32} className="mb-4 text-gray-400 group-hover:text-[var(--color-text-primary)] transition-colors" />
          <span className="font-semibold">GitHub</span>
        </a>
      </div>
    </motion.section>
  );
};

export default Contact;
