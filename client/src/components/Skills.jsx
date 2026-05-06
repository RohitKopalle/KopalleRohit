import { motion } from 'framer-motion';
import {
  FaJava,
  FaPython,
  FaCss3Alt,
  FaHtml5,
  FaGitAlt,
  FaDatabase,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiChartdotjs,
  SiMysql,
  SiFirebase,
  SiSupabase,
  SiGithub,
  SiRender,
  SiVercel,
  SiMongodb,
} from 'react-icons/si';
import { TbApi, TbLetterC } from 'react-icons/tb';

const categories = [
  { title: 'Languages', skills: [
    { name: 'Java', icon: FaJava, color: '#ED8B00' },
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'C', icon: TbLetterC, color: '#A8B9CC' },
  ]},
  { title: 'Web', skills: [
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
  ]},
  { title: 'Frameworks & Libraries', skills: [
    { name: 'React.js', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#fff' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Chart.js', icon: SiChartdotjs, color: '#FF6384' },
  ]},
  { title: 'Backend & Database', skills: [
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
    { name: 'REST APIs', icon: TbApi, color: 'var(--color-blue-light)' },
  ]},
  { title: 'Tools', skills: [
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', icon: SiGithub, color: '#fff' },
    { name: 'Render', icon: SiRender, color: '#46E3B7' },
    { name: 'Vercel', icon: SiVercel, color: '#fff' },
  ]},
];

export default function Skills() {
  return (
    <section id="skills" style={{ position: 'relative' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ display: 'inline-block' }}>Skills & Technologies</h2>
          <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>Tools and technologies I use to bring ideas to life.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat, ci) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: ci * 0.1 }} className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-blue-light)', marginBottom: '1.25rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{cat.title}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                {cat.skills.map((s, si) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.name} whileHover={{ scale: 1.05, backgroundColor: 'rgba(13,148,136,0.1)' }} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', borderRadius: '10px', cursor: 'default' }}>
                      <Icon size={20} style={{ color: s.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: '#f1f5f9', fontWeight: 500 }}>{s.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
