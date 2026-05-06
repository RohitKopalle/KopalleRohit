import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { sendContactMessage } from '../utils/api';

const socialLinks = [
  { name: 'Email', icon: FiMail, href: 'mailto:rohitkopalle@gmail.com', color: '#EF4444', label: 'rohitkopalle@gmail.com' },
  { name: 'GitHub', icon: FiGithub, href: 'https://github.com/rohitkopalle', color: '#fff', label: 'github.com/rohitkopalle' },
  { name: 'LinkedIn', icon: FiLinkedin, href: 'https://linkedin.com/in/rohitkopalle', color: '#0A66C2', label: 'linkedin.com/in/rohitkopalle' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });
    try {
      await sendContactMessage(form);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to send. Try again.' });
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'rgba(17, 24, 39, 0.6)',
    border: '1px solid #1e293b',
    borderRadius: '10px',
    color: '#f1f5f9',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <section id="contact" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ display: 'inline-block' }}>Get In Touch</h2>
          <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>Have a project in mind or want to connect? Feel free to reach out.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
          {/* Social Links */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '1.5rem' }}>Contact Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: '#94a3b8', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#f1f5f9'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                  >
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(37,99,235,0.1)', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} style={{ color: link.color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '2px' }}>{link.name}</p>
                      <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{link.label}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <input type="text" name="name" autoComplete="name" placeholder="Your Name" value={form.name} onChange={handleChange} required style={inputStyle} onFocus={(e) => { e.target.style.borderColor = '#2563EB'; }} onBlur={(e) => { e.target.style.borderColor = '#1e293b'; }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input type="email" name="email" autoComplete="email" placeholder="Your Email" value={form.email} onChange={handleChange} required style={inputStyle} onFocus={(e) => { e.target.style.borderColor = '#2563EB'; }} onBlur={(e) => { e.target.style.borderColor = '#1e293b'; }} />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} onFocus={(e) => { e.target.style.borderColor = '#2563EB'; }} onBlur={(e) => { e.target.style.borderColor = '#1e293b'; }} />
            </div>

            {status.message && (
              <p style={{ fontSize: '0.85rem', marginBottom: '1rem', color: status.type === 'success' ? '#3ECF8E' : '#EF4444' }}>{status.message}</p>
            )}

            <button type="submit" className="btn-primary" disabled={sending} style={{ width: '100%', justifyContent: 'center', opacity: sending ? 0.7 : 1 }}>
              {sending ? 'Sending...' : 'Send Message'} <FiSend />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
