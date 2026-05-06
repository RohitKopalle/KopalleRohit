import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiDocumentDownload } from 'react-icons/hi';
import { useIsMobile } from '../hooks/useIsMobile';
import Loader from './Loader';

const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero() {
  const isMobile = useIsMobile();

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 15% 50%, rgba(13, 148, 136, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 75% 45%, rgba(45, 212, 191, 0.1) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
          gap: '2rem',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '6rem 1.5rem 3rem' : '0 2rem',
          zIndex: 1,
        }}
      >
        {/* Left: Text Content */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: 'var(--color-blue)',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Software Development Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? '2.2rem' : '3rem',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: 'var(--color-text-primary)',
            }}
          >
            Hello, I'm{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-blue-light), var(--color-purple-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Kopalle Indhra Kumara Rohit
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: isMobile ? '1rem' : '1.15rem',
              lineHeight: 1.7,
              maxWidth: '460px',
              marginBottom: '2rem',
            }}
          >
            I work on solving complex problems and building efficient, scalable
            software systems, with a focus on performance and clean design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="btn-primary"
            >
              View Work <HiArrowDown />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Resume <HiDocumentDownload />
            </a>
          </motion.div>
        </div>

        {/* Right: 3D Globe */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            width: '100%',
            height: isMobile ? '300px' : '520px',
            minHeight: isMobile ? '300px' : '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Subtle radial glow behind the globe */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(13, 148, 136, 0.12) 0%, rgba(45, 212, 191, 0.04) 40%, transparent 70%)',
                pointerEvents: 'none',
                filter: 'blur(30px)',
              }}
            />
          )}
          <Suspense fallback={<Loader />}>
            <HeroScene isMobile={isMobile} />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
