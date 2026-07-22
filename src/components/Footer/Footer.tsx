

const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-border)] mt-20">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[var(--color-text-secondary)] text-sm">
          © {new Date().getFullYear()} Mostafa. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm font-medium text-[var(--color-text-secondary)]">
          <a href="https://github.com/Mostafa23" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/mostafa%D9%90abdallah/" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors">LinkedIn</a>
          <a href="mailto:tofa201714@gmail.com" className="hover:text-[var(--color-text-primary)] transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
