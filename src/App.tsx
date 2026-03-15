import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Download, 
  Terminal, 
  Cpu, 
  Zap, 
  Layers, 
  ExternalLink,
  Code2,
  Users,
  Award,
  Globe
} from 'lucide-react';

// --- Typewriter Hook ---

const useTypewriter = (words: string[], speed: number = 100, delay: number = 2000) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed, delay]);

  return words[index].substring(0, subIndex);
};

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
} as const;

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as const;

// --- Reusable Components ---

const SectionWrapper: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={revealVariants}
    className={className}
  >
    {children}
  </motion.section>
);

const BrutalistCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  bgColor?: string;
  hasMockup?: boolean;
}> = ({ children, className = "", bgColor = "bg-white", hasMockup = false }) => (
  <motion.div 
    whileHover={{ x: -2, y: -2, boxShadow: "8px 8px 0px #000000" }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className={`p-6 border-2 border-black rounded-xl shadow-[6px_6px_0px_#000000] text-black ${bgColor} ${className}`}
  >
    {hasMockup && (
      <div className="aspect-video bg-white/40 border-2 border-black rounded-lg mb-6 flex items-center justify-center shadow-inner overflow-hidden">
        <span className="text-black/30 font-black text-xl uppercase tracking-tighter italic">Mockup Placeholder</span>
      </div>
    )}
    {children}
  </motion.div>
);

const PastelCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  bgColor?: string;
}> = ({ children, className = "", bgColor = "bg-blue-50/50" }) => (
  <div className={`p-8 rounded-[2rem] ${bgColor} ${className}`}>
    {children}
  </div>
);

const SkillPill: React.FC<{ name: string }> = ({ name }) => (
  <motion.span 
    whileHover={{ scale: 1.05, backgroundColor: "#E8F0FE", borderColor: "#4285F4" }}
    className="px-4 py-2 bg-white border-2 border-black rounded-xl text-sm font-bold font-jakarta shadow-[3px_3px_0px_#000000] cursor-default"
  >
    {name}
  </motion.span>
);

// --- Section Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
    <div className="container mx-auto max-w-6xl">
      <div className="bg-white/70 backdrop-blur-xl border-2 border-black rounded-full px-6 py-3 flex justify-between items-center shadow-[4px_4px_0px_#000000]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#4285F4] border-2 border-black flex items-center justify-center text-white font-bold shadow-[2px_2px_0px_#000000]">PS</div>
          <span className="font-outfit font-bold text-black hidden sm:block tracking-tight">PRIYAM.SRI</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-jakarta font-bold text-black">
          <a href="#" className="hover:text-[#4285F4] transition-colors">Home</a>
          <a href="#projects" className="hover:text-[#4285F4] transition-colors">Work</a>
          <a href="#experience" className="hover:text-[#4285F4] transition-colors">Experience</a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:itspriyamsri@gmail.com" 
            className="px-5 py-2 bg-[#4285F4] text-white rounded-full border-2 border-black shadow-[2px_2px_0px_#000000]"
          >
            Contact
          </motion.a>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const typewriterText = useTypewriter([
    "Priyam Srivastava.", 
    "a Systems Engineer.", 
    "a Full-Stack Developer.", 
    "a Linux Enthusiast."
  ]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="min-h-[95vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 relative overflow-hidden bg-slate-50 border-b-4 border-black"
    >
      {/* Spotlight Grid Reveal Layer - Punchier Physics */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0) 80%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0) 80%)`,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 max-w-5xl pointer-events-none"
      >
        <motion.span 
          variants={itemVariants}
          className="inline-block px-4 py-1.5 mb-8 text-xs font-black tracking-[0.2em] text-black uppercase bg-[#F7D046] border-2 border-black rounded-full font-jakarta shadow-[3px_3px_0px_#000000]"
        >
          Available for 2026 Internships
        </motion.span>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-outfit font-bold text-black mb-8 leading-[1] tracking-tighter"
        >
          <span className="block">Hi, I am</span>
          <span className="block text-[#4285F4]">{typewriterText}<span className="animate-pulse">|</span></span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl font-jakarta font-bold text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          "Bridging the gap between clean user interfaces and low-level system architecture. Passionate about Linux internals, scalable AI, and writing both the paint and the plumbing."
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 pointer-events-auto"
        >
          <motion.a 
            whileHover={{ x: -2, y: -2, boxShadow: "8px 8px 0px #000000" }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/itspriyamsri" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-4 bg-[#4285F4] text-white border-2 border-black rounded-xl font-bold font-jakarta flex items-center gap-3 shadow-[4px_4px_0px_#000000] transition-all"
          >
            <Github size={22} /> View GitHub
          </motion.a>
          <motion.a 
            whileHover={{ x: -2, y: -2, boxShadow: "8px 8px 0px #000000" }}
            whileTap={{ scale: 0.95 }}
            href="mailto:itspriyamsri@gmail.com"
            className="px-10 py-4 bg-white text-black border-2 border-black rounded-xl font-bold font-jakarta flex items-center gap-3 shadow-[4px_4px_0px_#000000] transition-all"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

const TheJourney = () => (
  <SectionWrapper className="py-24 px-12 container mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <h2 className="text-5xl md:text-6xl font-outfit font-bold text-black tracking-tight leading-none">
          The <span className="text-[#E878A8]">Journey</span>
        </h2>
        <div className="space-y-6 text-xl font-jakarta text-gray-800 leading-relaxed">
          <p>
            B.Tech CSE at AKTU (2027). I work from Linux internals and C++ systems all the way up to full-stack MERN apps and AI integrations — not as separate tracks, but as one way of thinking. I lead GDG on Campus SRMCEM, where I've run 15+ events and scaled a hackathon to 6 venues across Lucknow. I like understanding how things work at every layer, and then building on top of that.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {[
              { title: "🥉 3rd Place @ HackCBS 8.0", sub: "India's largest student-run hackathon", color: "bg-[#FFF0F0]" },
              { title: "🌐 Top 105 @ Solution Challenge 2025", sub: "Among 3000+ teams nationwide", color: "bg-[#DDF4FD]" },
              { title: "🐧 Linux & Systems Engineering", sub: "C++, Python, CLI lover", color: "bg-[#E6FEEA]" },
              { title: "📅 Lead community of 1500+ developers", sub: "GDG on Campus SRMCEM", color: "bg-[#FEFCE8]" },
            ].map((metric, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`${metric.color} px-6 py-4 rounded-full border-2 border-black/5 flex flex-col items-center justify-center text-center shadow-sm`}
              >
                <span className="font-outfit font-bold text-base text-black leading-tight">{metric.title}</span>
                <span className="font-jakarta text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">{metric.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ rotate: 0 }}
        whileInView={{ rotate: 2 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ 
          rotate: { duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        viewport={{ once: true }}
        className="relative group max-w-[95%] mx-auto"
      >
        <div className="aspect-square bg-[#F7D046] border-4 border-black rounded-[2.5rem] shadow-[12px_12px_0px_#000000] flex items-center justify-center overflow-hidden">
          <Code2 size={120} className="text-black/20 absolute -bottom-4 -right-4 rotate-12" />
          <Terminal size={120} className="text-black/10 absolute top-10 left-10 -rotate-12" />
          <div className="p-12 text-center relative z-10">
            <span className="text-8xl">🚀</span>
            <p className="mt-6 font-outfit font-bold text-2xl uppercase tracking-widest text-black">Keep Moving Forward</p>
          </div>
        </div>
      </motion.div>
    </div>
  </SectionWrapper>
);

const TechnicalExpertise = () => (
  <SectionWrapper className="py-24 px-10 container mx-auto">
    <div className="flex flex-col items-center mb-16">
      <h2 className="text-4xl md:text-5xl font-outfit font-bold text-black mb-4">Technical Expertise</h2>
      <div className="h-2 w-24 bg-[#5FD974] border-2 border-black rounded-full shadow-[2px_2px_0px_#000000]"></div>
    </div>
    
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {[
        { 
          title: "Full-Stack/Frameworks", 
          icon: <Layers size={28} />, 
          color: "bg-[#DDF4FD]", 
          skills: ["React", "TypeScript", "JavaScript", "Node.js", "Express", "Firebase", "Tailwind CSS", "MongoDB", "SQL"] 
        },
        { 
          title: "Automation", 
          icon: <Terminal size={28} />, 
          color: "bg-[#E6FEEA]", 
          skills: ["Python", "Bash", "Shell Scripting", "Docker", "GCP", "Jupyter", "FastAPI", "REST APIs"] 
        },
        { 
          title: "AI & Security", 
          icon: <Zap size={28} />, 
          color: "bg-[#FFF0F0]", 
          skills: ["RAG Systems", "NLP", "LLM Integration", "Perplexity API", "AI Agents", "Prompt Eng", "Gemini API", "LLMs", "Cybersecurity"] 
        },
        { 
          title: "Systems & Tools", 
          icon: <Cpu size={28} />, 
          color: "bg-[#FEFCE8]", 
          skills: ["C++", "C", "Linux Internals", "Networking", "Git/GitHub", "VS Code", "OS Design", "SysAdmin"] 
        }
      ].map((cat, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          <PastelCard bgColor={cat.color} className="h-full border-2 border-black/5 hover:border-black/20 transition-all">
            <div className="flex items-center gap-3 text-black mb-6">
              {cat.icon}
              <h3 className="font-outfit font-bold text-2xl">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map(s => <SkillPill key={s} name={s} />)}
            </div>
          </PastelCard>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

const Projects = () => {
  const [showSandbox, setShowSandbox] = useState(false);

  const mainProjects = [
    {
      name: "CPPCloak",
      desc: "LLVM-Based Code Obfuscator. Features C++ string encryption and a Python FastAPI bridge.",
      tags: ["C++", "LLVM", "FastAPI", "Compiler"],
      color: "bg-[#5BB4E5]",
      badge: "Security"
    },
    {
      name: "Project SHIELD",
      desc: "IP Protection Platform monitoring 100+ sources. Automated DMCA generator via Gemini AI. 3rd Place @ HackCBS.",
      tags: ["TypeScript", "FastAPI", "Gemini AI", "MongoDB"],
      color: "bg-[#5FD974]",
      badge: "Award Winner"
    },
    {
      name: "AetherLearn",
      desc: "AI Learning Platform with Docker containerization and scalable backend. Top 105 GSC.",
      tags: ["Docker", "Firebase", "Node.js", "React"],
      color: "bg-[#E878A8]",
      badge: "Top 105"
    },
    {
      name: "Saksham AI",
      desc: "Intelligent Recommendation Platform using NLP for personalized resource discovery.",
      tags: ["NLP", "Python", "React", "FastAPI"],
      color: "bg-[#F7D046]",
      badge: "AI/NLP"
    }
  ];

  const sandboxProjects = [
    {
      name: "FluxSort",
      desc: "Cross-platform Python automation script with a logging/revert system for intelligent file directory management.",
      tags: ["Python", "Automation", "CLI"],
      color: "bg-[#DDF4FD]"
    },
    {
      name: "Dungeon Escape",
      desc: "Pure C++ CLI-based terminal adventure game featuring custom logic and ASCII art.",
      tags: ["C++", "Game Dev", "CLI"],
      color: "bg-[#E6FEEA]"
    },
    {
      name: "Project Sentinel",
      desc: "Python-based system resource monitor featuring a CLI interface inspired by Linux btop.",
      tags: ["Python", "System", "CLI"],
      color: "bg-[#FDE7F0]"
    },
    {
      name: "AppSentinel",
      desc: "TypeScript front-end prototype designed to scan and match security certificates of banking APKs.",
      tags: ["TypeScript", "Security", "FinTech"],
      color: "bg-[#FFF9E5]"
    }
  ];

  return (
    <SectionWrapper id="projects" className="py-24 px-10 container mx-auto">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-black mb-4">Engineering Projects</h2>
        <div className="h-2 w-24 bg-[#E878A8] border-2 border-black rounded-full shadow-[2px_2px_0px_#000000]"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {mainProjects.map((p, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <BrutalistCard bgColor={p.color} className="h-full flex flex-col" hasMockup>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-outfit font-bold text-black">{p.name}</h3>
                <span className="px-3 py-1 bg-white border-2 border-black text-[10px] font-black rounded-full uppercase tracking-tighter shadow-[2px_2px_0px_#000000]">{p.badge}</span>
              </div>
              <p className="text-black font-jakarta font-semibold mb-6 flex-grow leading-snug">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {p.tags.map(t => (
                  <span key={t} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/50 border border-black rounded">{t}</span>
                ))}
              </div>
              <motion.button 
                whileHover={{ x: 2 }}
                className="flex items-center gap-2 font-black text-black uppercase text-sm tracking-widest group"
              >
                View Repository <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </BrutalistCard>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 flex flex-col items-center">
        <AnimatePresence>
          {showSandbox && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden w-full pb-10 px-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
                {sandboxProjects.map((p, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <BrutalistCard bgColor={p.color} className="h-full flex flex-col">
                      <h4 className="text-xl font-outfit font-bold text-black mb-2">{p.name}</h4>
                      <p className="text-sm font-jakarta font-medium text-gray-800 mb-4 flex-grow">{p.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map(t => (
                          <span key={t} className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/50 border border-black rounded">{t}</span>
                        ))}
                      </div>
                    </BrutalistCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSandbox(!showSandbox)}
          className="mt-10 px-8 py-3 bg-black text-white font-black tracking-widest rounded-full border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
        >
          {showSandbox ? "Show less" : "Explore Other Projects"}
        </motion.button>
      </div>
    </SectionWrapper>
  );
};

const Leadership = () => {
  const experiences = [
    {
      title: "3rd Place Winner | HackCBS 8.0",
      org: "Asia's Largest Student Hackathon",
      period: "Nov 2024",
      color: "bg-[#5BB4E5]",
      cardColor: "bg-[#DDF4FD]",
      icon: <Award size={24} />,
      desc: "Secured 2nd Runner Up at India's largest student-run hackathon, competing as a 2-person team against senior 4-person teams."
    },
    {
      title: "Lead Organizer",
      org: "GDG on Campus SRMCEM",
      period: "2024 - Present",
      color: "bg-[#5FD974]",
      cardColor: "bg-[#E6FEEA]",
      icon: <Users size={24} />,
      desc: "Coordinating 15+ tech events and workshops for a 1000+ student community. Co-organized a city-wide AI hackathon across 6 venues."
    },
    {
      title: "College Qualifier",
      org: "Smart India Hackathon",
      period: "2023 & 2024",
      color: "bg-[#E878A8]",
      cardColor: "bg-[#FDE7F0]",
      icon: <Zap size={24} />,
      desc: "Qualified at the institutional level for two consecutive years with CPPCloak and Saksham AI."
    },
    {
      title: "Top 105 Nationally",
      org: "Google Solution Challenge 2025",
      period: "Jan 2025",
      color: "bg-[#F7D046]",
      cardColor: "bg-[#FFF9E5]",
      icon: <Globe size={24} />,
      desc: "Led a 4-member team among 1000+ submissions with AetherLearn, an AI-powered platform addressing UN SDG #4."
    },
    {
      title: "Technical Co-Head",
      org: "GDG on Campus SRMCEM",
      period: "2023 - 2024",
      color: "bg-[#5BB4E5]",
      cardColor: "bg-[#DDF4FD]",
      icon: <Code2 size={24} />,
      desc: "Managed technical infrastructure for 12+ events and delivered sessions on Gemini and GCP to 800+ developers."
    },
    {
      title: "1st Place",
      org: "Zephyre Hackathon",
      period: "2023",
      color: "bg-[#5FD974]",
      cardColor: "bg-[#E6FEEA]",
      icon: <Award size={24} />,
      desc: "Won first place as a first-year team of two against multi-disciplinary senior teams."
    }
  ];

  return (
    <SectionWrapper id="experience" className="py-24 px-6 container mx-auto">
      <div className="flex flex-col items-center mb-24">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-black mb-4">Experience & Achievements</h2>
        <div className="h-2 w-24 bg-[#5BB4E5] border-2 border-black rounded-full shadow-[2px_2px_0px_#000000]"></div>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        {/* Spine */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 border-l-2 border-dashed border-gray-300 hidden md:block"></div>
        
        <div className="space-y-24">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`relative flex items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 md:gap-0`}>
              
              {/* Timeline Card */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-[45%]"
              >
                <PastelCard bgColor={exp.cardColor} className="hover:scale-[1.02] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_#000000]">
                  <span className="text-xs font-black text-black/40 uppercase tracking-widest mb-2 block font-jakarta">{exp.period}</span>
                  <h3 className="text-2xl font-outfit font-bold text-black mb-1">{exp.title}</h3>
                  <p className="text-lg font-outfit font-bold text-[#4285F4] mb-4">{exp.org}</p>
                  <p className="text-base font-jakarta font-medium text-gray-800 leading-relaxed">
                    {exp.desc}
                  </p>
                </PastelCard>
              </motion.div>

              {/* Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className={`w-14 h-14 rounded-full border-2 border-black ${exp.color} flex items-center justify-center shadow-[4px_4px_0px_#000000]`}
                >
                  {exp.icon}
                </motion.div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const CertificationsGrid = () => {
  const [showDesignCerts, setShowDesignCerts] = useState(false);

  const certColors = [
    { bg: "bg-[#DDF4FD]", icon: "text-[#5BB4E5]", iconBg: "bg-[#5BB4E5]/10" },
    { bg: "bg-[#E6FEEA]", icon: "text-[#5FD974]", iconBg: "bg-[#5FD974]/10" },
    { bg: "bg-[#FDE7F0]", icon: "text-[#E878A8]", iconBg: "bg-[#E878A8]/10" },
    { bg: "bg-[#FFF9E5]", icon: "text-[#F7D046]", iconBg: "bg-[#F7D046]/10" }
  ];

  const mainCerts = [
    "Google IT Automation with Python",
    "Google IT Support Professional",
    "Google Cybersecurity Professional",
    "Google AI & Prompting Essentials"
  ];

  const designCerts = [
    "Build Dynamic UI for Websites",
    "Foundations of UX Design"
  ];

  return (
    <SectionWrapper className="py-24 px-10 container mx-auto">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-black mb-4">Professional training</h2>
        <div className="h-2 w-24 bg-[#F7D046] border-2 border-black rounded-full shadow-[2px_2px_0px_#000000]"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mainCerts.map((cert, idx) => {
          const theme = certColors[idx % certColors.length];
          return (
            <PastelCard key={cert} bgColor={theme.bg} className="flex flex-col gap-6 hover:scale-105 transition-transform border-2 border-black shadow-[4px_4px_0px_#000000] !rounded-2xl h-full">
              <div className={`w-12 h-12 ${theme.iconBg} rounded-xl flex items-center justify-center ${theme.icon} border-2 border-black`}>
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-outfit font-bold text-black text-lg leading-tight">{cert}</h4>
                <p className={`text-sm ${theme.icon} font-black mt-3 font-jakarta uppercase tracking-wider`}>VERIFIED BY COURSERA</p>
              </div>
            </PastelCard>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center">
        <AnimatePresence>
          {showDesignCerts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden w-full pb-10 px-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
                {designCerts.map((cert, idx) => {
                  // Offset by mainCerts.length to continue alternating
                  const theme = certColors[(idx + mainCerts.length) % certColors.length];
                  return (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <PastelCard bgColor={theme.bg} className="flex flex-col gap-6 hover:scale-105 transition-transform border-2 border-black shadow-[4px_4px_0px_#000000] !rounded-2xl h-full">
                        <div className={`w-12 h-12 ${theme.iconBg} rounded-xl flex items-center justify-center ${theme.icon} border-2 border-black`}>
                          <Award size={24} />
                        </div>
                        <div>
                          <h4 className="font-outfit font-bold text-black text-lg leading-tight">{cert}</h4>
                          <p className={`text-sm ${theme.icon} font-black mt-3 font-jakarta uppercase tracking-wider`}>VERIFIED BY COURSERA</p>
                        </div>
                      </PastelCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDesignCerts(!showDesignCerts)}
          className="mt-10 px-8 py-3 bg-black text-white font-black tracking-widest rounded-full border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
        >
          {showDesignCerts ? "Show less" : "Explore Other Certificates"}
        </motion.button>
      </div>
    </SectionWrapper>
  );
};

const Footer = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <footer 
      onMouseMove={handleMouseMove}
      className="relative py-24 border-t-4 border-black bg-slate-50 overflow-hidden"
    >
      {/* Mini Spotlight Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0) 70%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0) 70%)`,
        }}
      />

      <div className="container mx-auto px-10 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20"
        >
          {/* Left Column: Branding */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#4285F4] border-2 border-black flex items-center justify-center text-white font-bold text-xl shadow-[4px_4px_0px_#000000]">P</div>
              <span className="text-3xl font-outfit font-bold text-black tracking-tighter">Priyam Srivastava</span>
            </div>
            <p className="text-gray-600 font-jakarta font-bold text-lg leading-relaxed max-w-sm">
              Building high-performance engines and intuitive interfaces. Bridging the paint and the plumbing.
            </p>
          </motion.div>

          {/* Middle Column: Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="font-outfit font-black uppercase tracking-widest text-black/40 text-sm mb-2">Navigation</h4>
            {[
              { label: "Home", href: "#" },
              { label: "Projects", href: "#projects" },
              { label: "Skills", href: "#skills" },
              { label: "Experience", href: "#experience" }
            ].map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-xl font-outfit font-bold text-black hover:text-[#4285F4] transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Right Column: CTA Card */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="p-8 bg-white border-2 border-black rounded-2xl shadow-[8px_8px_0px_#000000] relative group">
              <h4 className="text-3xl font-outfit font-bold text-black mb-6">Ready to build?</h4>
              <motion.a 
                whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0px #000000" }}
                whileTap={{ scale: 0.95 }}
                href="mailto:itspriyamsri@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-3 bg-[#4285F4] text-white border-2 border-black rounded-xl font-bold font-jakarta shadow-[4px_4px_0px_#000000] transition-all"
              >
                Email Me <Terminal size={20} />
              </motion.a>
            </div>

            <div className="flex gap-4">
              {[
                { icon: <Terminal size={20} />, href: "mailto:itspriyamsri@gmail.com" },
                { icon: <Github size={20} />, href: "https://github.com/itspriyamsri" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/itspriyamsri" }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0px #000000" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  href={social.href}
                  className="p-3 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000] text-black hover:bg-[#F7D046] transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="pt-10 border-t-2 border-black/10 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="text-sm font-jakarta font-black uppercase tracking-widest text-black/40">
            © 2026 PRIYAM SRIVASTAVA
          </div>
          
          <div className="px-4 py-1.5 bg-[#F7D046] border-2 border-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-[3px_3px_0px_#000000]">
            AVAILABLE FOR 2026 INTERNSHIPS
          </div>

          <div className="text-sm font-jakarta font-black uppercase tracking-widest text-black/40">
            Crafted with React, Tailwind & Framer Motion
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-[#4285F4] selection:text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#000 1px, transparent 0)`, backgroundSize: '40px 40px' }}
      ></div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <TheJourney />
        <TechnicalExpertise />
        <Projects />
        <Leadership />
        <CertificationsGrid />
        
        <SectionWrapper className="py-24 px-6 text-center container mx-auto">
          <BrutalistCard bgColor="bg-[#F7D046]" className="max-w-4xl mx-auto py-16">
            <h2 className="text-5xl font-outfit font-bold text-black mb-8 leading-none">Let's build the <span className="underline decoration-black decoration-4 underline-offset-8">Future</span> of Systems.</h2>
            <p className="text-2xl font-jakarta font-bold text-black/80 mb-12 max-w-2xl mx-auto">
              Currently looking for summer internships and collaborative engineering roles.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a 
                whileHover={{ x: -2, y: -2, boxShadow: "8px 8px 0px #000000" }}
                whileTap={{ scale: 0.95 }}
                href="mailto:itspriyamsri@gmail.com"
                className="px-10 py-5 bg-black text-white border-2 border-black rounded-xl font-bold font-jakarta text-lg shadow-[4px_4px_0px_#4285F4] flex items-center gap-3"
              >
                Get in Touch
              </motion.a>
              <motion.button 
                whileHover={{ x: -2, y: -2, boxShadow: "8px 8px 0px #000000" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-transparent text-black border-2 border-black rounded-xl font-bold font-jakarta text-lg shadow-[4px_4px_0px_#000000] flex items-center gap-3"
              >
                <Download size={24} /> Resume
              </motion.button>
            </div>
          </BrutalistCard>
        </SectionWrapper>
      </main>
      
      <Footer />
    </div>
  );
}
