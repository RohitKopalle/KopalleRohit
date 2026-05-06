require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

/**
 * Replace the projects in this array with your actual projects!
 */
const seedProjects = [
  {
    name: 'FutureYou',
    description: 'An AI-powered personal growth platform that gamifies habit tracking with streaks, XP systems, real-time analytics, and intelligent insights to help users build consistency and discipline.',
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Chart.js', 'Mistral AI', 'OpenRouter', 'Render'],
    githubUrl: 'https://github.com/RohitKopalle/FutureYou',
    liveUrl: 'https://futureyou-avnd.onrender.com/',
  },
  {
    name: 'TalktoData',
    description: 'An AI-powered analytics platform that transforms natural language questions into instant insights and interactive visualizations from uploaded datasets.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Chart.js', 'FastAPI', 'Pandas', 'Uvicorn', 'Gemini 1.5 Flash'],
    githubUrl: 'https://github.com/RohitKopalle/TalktoData',
    liveUrl: 'https://talktodata-psi.vercel.app/',
  },
  {
    name: 'ConclaveAI',
    description: 'A multi-agent AI collaboration platform where specialized LLM agents critique, refine, and synthesize responses using real-time web intelligence for more reliable problem-solving.',
    techStack: ['Next.js','Next.js Route Handlers', 'Supabase', 'Featherless AI', 'Mistral-Nemo', 'Qwen2.5', 'Bright Data'],
    githubUrl: 'https://github.com/RohitKopalle/ConclaveAI',
    liveUrl: 'https://conclave-ai-xais.vercel.app/',
  }

];

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in .env');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing projects before seeding
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    if (seedProjects.length > 0) {
      await Project.insertMany(seedProjects);
      console.log(`✅ Seeded ${seedProjects.length} projects`);
    } else {
      console.log('ℹ️  No projects defined in seedProjects array. Database is empty.');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
