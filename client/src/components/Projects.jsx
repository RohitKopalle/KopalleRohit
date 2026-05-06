import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProjects } from '../utils/api';
import ProjectCard from './ProjectCard';

/**
 * Projects section — fetches from backend API and renders responsive grid.
 */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <section id="projects" style={{ position: 'relative' }}>
      {/* Section background accent */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          maxWidth: '100vw',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="section-title" style={{ display: 'inline-block' }}>
            Projects
          </h2>
          <p
            className="section-subtitle"
            style={{ margin: '0.75rem auto 0' }}
          >
            A selection of projects I've built — from full-stack applications to
            developer tools.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="skeleton"
                style={{ height: '240px', borderRadius: '16px' }}
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '3rem',
            }}
          >
            <p
              style={{
                color: 'var(--color-text-secondary)',
                marginBottom: '1rem',
              }}
            >
              Could not load projects. Please try again.
            </p>
            <button onClick={loadProjects} className="btn-primary">
              Retry
            </button>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id || index}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              padding: '3rem',
            }}
          >
            No projects yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}
