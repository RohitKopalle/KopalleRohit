import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Defer the scroll slightly to allow the mobile menu's collapse animation 
    // to start. Otherwise, the DOM height shift interrupts the native smooth scroll.
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        background: isScrolled
          ? 'rgba(2, 6, 23, 0.85)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(13, 148, 136, 0.2)'
          : '1px solid transparent',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease',
      }}
    >
      <div
        className="py-5 flex items-center justify-between w-full"
        style={{
          paddingLeft: 'clamp(1rem, 4vw, 3rem)',
          paddingRight: 'clamp(1rem, 4vw, 3rem)',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-blue-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
        >
          Rohit
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10" style={{ marginLeft: 'auto' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-sm font-medium no-underline transition-colors duration-200"
              style={{
                color:
                  activeSection === link.href.slice(1)
                    ? 'var(--color-blue-light)'
                    : 'var(--color-text-secondary)',
              }}
            >
              {link.name}
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                  style={{
                    background: 'var(--color-blue-light)',
                    boxShadow: '0 0 10px var(--color-blue)',
                  }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(2, 6, 23, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(13, 148, 136, 0.2)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-base font-medium no-underline py-2"
                  style={{
                    color:
                      activeSection === link.href.slice(1)
                        ? '#f1f5f9'
                        : '#94a3b8',
                    borderLeft:
                      activeSection === link.href.slice(1)
                        ? '2px solid var(--color-blue)'
                        : '2px solid transparent',
                    paddingLeft: '12px',
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
