import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

/**
 * Individual project card with glass-morphism, gradient border, and hover effects.
 * Memoized to prevent unnecessary re-renders.
 */
const ProjectCard = memo(function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card gradient-border"
      style={{
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Project header with title and links */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            flex: 1,
          }}
        >
          {project.name}
        </h3>

        <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '1rem' }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.name}`}
              style={{
                color: 'var(--color-text-muted)',
                transition: 'color 0.2s ease, transform 0.2s ease',
                display: 'flex',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#2563EB';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FiGithub size={20} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.name}`}
              style={{
                color: 'var(--color-text-muted)',
                transition: 'color 0.2s ease, transform 0.2s ease',
                display: 'flex',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8B5CF6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          flex: 1,
          marginBottom: '1.25rem',
        }}
      >
        {project.description}
      </p>

      {/* Tech stack tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              background: 'rgba(37, 99, 235, 0.1)',
              color: '#3b82f6',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

export default ProjectCard;
