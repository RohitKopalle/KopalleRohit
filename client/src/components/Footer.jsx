import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #1e293b',
      padding: '2rem 1.5rem',
      textAlign: 'center',
      background: 'linear-gradient(180deg, transparent, rgba(17,24,39,0.5))',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { icon: FiGithub, href: 'https://github.com/rohitkopalle', label: 'GitHub' },
            { icon: FiLinkedin, href: 'https://linkedin.com/in/rohitkopalle', label: 'LinkedIn' },
            { icon: FiMail, href: 'mailto:rohitkopalle@gmail.com', label: 'Email' },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ color: '#64748b', transition: 'color 0.2s, transform 0.2s', display: 'flex' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          © {new Date().getFullYear()} Kopalle Indhra Kumar Rohit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
