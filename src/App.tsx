import React, { useState } from 'react';
import { Terminal, Github, Linkedin, Mail, Cpu, Layers, ExternalLink, Box, Code, Sparkles, Server, Download, Briefcase, Instagram, Send } from 'lucide-react';
import ThreeDCard from './components/ThreeDCard';
import InteractiveTerminal from './components/InteractiveTerminal';
import CurrentProject from './components/CurrentProject';
import TechStack from './components/TechStack';
import WorkTimeline from './components/WorkTimeline';
import ContactSection from './components/ContactSection';
import ProfileAvatar from './components/ProfileAvatar';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollReveal from './components/ScrollReveal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'visual'>('terminal');
  const [isLoading, setIsLoading] = useState(true);

  const handleDownloadResume = () => {
    // Generate a simple valid minimal PDF representing Ankit Mishra's Resume
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 500 >>
stream
BT
/F2 24 Tf
50 780 Td
(ANKIT MISHRA) Tj
/F1 12 Tf
0 -30 Td
(Software Engineer | Systems Developer) Tj
0 -20 Td
(Email: conatct.ankit0mi@gmail.com | GitHub: github.com/ankit008-mishra) Tj
0 -40 Td
/F2 14 Tf
(PROFESSIONAL SUMMARY) Tj
/F1 11 Tf
0 -20 Td
(Engineering highly responsive, performant full-stack web architectures.) Tj
0 -15 Td
(Deep focus in decentralized communication brokers, low-latency API routes,) Tj
0 -15 Td
(and stateful interactive 3D frontend paradigms using React, TypeScript, and TailwindCSS.) Tj
0 -35 Td
/F2 14 Tf
(TECHNICAL SKILLS) Tj
/F1 11 Tf
0 -20 Td
(- Languages: TypeScript, JavaScript, SQL) Tj
0 -15 Td
(- Frameworks: React, Next.js, Node.js, Express, TailwindCSS) Tj
0 -15 Td
(- Tooling: Docker, Git, WebSockets, Vite, esbuild) Tj
0 -35 Td
/F2 14 Tf
(ACTIVE PROJECT: PROJECT NEBULA) Tj
/F1 11 Tf
0 -20 Td
(Autonomous Micro-Agent Orchestrator delivering decentralized task-load) Tj
0 -15 Td
(distributions across server networks under low operational latency constraints.) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000113 00000 n
0000000346 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
910
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ankit_Mishra_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div id="portfolio-app" className={`min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200 transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
      <CustomCursor />
      
      {/* 3D Moving Perspective Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:40px_40px] origin-top animate-grid-move"
          style={{
            transform: 'perspective(500px) rotateX(60deg) translateY(-30%) scale(1.6)',
            height: '150%',
          }}
        />
        {/* Dynamic Light Orbs */}
        <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-[45%] right-[10%] w-[420px] h-[420px] rounded-full bg-violet-600/10 blur-[130px] animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
        <div className="absolute bottom-[10%] left-[20%] w-80 h-80 rounded-full bg-indigo-600/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: '5s' }} />
      </div>

      {/* Modern High-Contrast Top Navigation Bar */}
      <nav id="navbar" className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer transition-all duration-300">
            <img 
              src="https://github.com/ankit008-mishra.png" 
              alt="Ankit Mishra Logo" 
              className="w-8 h-8 rounded-lg object-cover shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500/50 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] group-hover:scale-105"
            />
            <span className="font-mono text-sm tracking-tight font-bold text-slate-200 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
              ankitmishra<span className="text-blue-500 transition-colors duration-300 group-hover:text-blue-300">.dev</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 shadow-lg backdrop-blur-xl">
            <a href="#about-hero" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300">About</a>
            <a href="#current-project-section" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300">Work</a>
            <a href="#skills-section" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300">Skills</a>
            <a href="#experience-section" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300">Experience</a>
            <a href="#contact-section-anchor" className="px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 hover:text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-300">Connect</a>
          </div>

          {/* Social Links Quick Access */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/ankit008-mishra" 
              target="_blank" 
              rel="noopener noreferrer" 
              referrerPolicy="no-referrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a 
              href="https://linkedin.com/in/ankitmishra-eng" 
              target="_blank" 
              rel="noopener noreferrer" 
              referrerPolicy="no-referrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a 
              href="https://instagram.com/your_username" 
              target="_blank" 
              rel="noopener noreferrer" 
              referrerPolicy="no-referrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="Instagram Profile"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a 
              href="https://t.me/your_username" 
              target="_blank" 
              rel="noopener noreferrer" 
              referrerPolicy="no-referrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="Telegram Contact"
            >
              <Send className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-24 md:space-y-36">
        
        {/* HERO SECTION */}
        <ScrollReveal>
        <section id="about-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Bio with 3D Depth */}
          <div className="lg:col-span-5 space-y-6 text-left flex flex-col items-start">
            <div className="mb-4">
              <ProfileAvatar size="lg" />
            </div>

            <div className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-900/60 px-3 py-1 rounded-full text-xs font-mono text-blue-400">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Available for Collaborative Initiatives</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-sans font-extrabold text-slate-100 tracking-tight leading-none">
                Ankit Mishra
              </h1>
              <p className="text-lg md:text-xl font-sans text-blue-400 font-semibold tracking-tight">
                Software Engineer
              </p>
            </div>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans max-w-lg">
              I specialize in creating highly responsive, performant, and visual computing solutions. Over the years, I have architected decentralized message clusters and stateful Web interfaces utilizing strict type definitions and optimal rendering strategies.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#current-project-section" 
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all border border-blue-400/20 shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>EXAMINE ACTIVE PROJECT</span>
              </a>
              <button 
                onClick={handleDownloadResume}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition-all border border-indigo-400/20 shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
                title="Download Ankit's Resume PDF"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </button>
              <a 
                href="#contact-section-anchor" 
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all border border-slate-800 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>CONNECT</span>
              </a>
            </div>
          </div>

          {/* Hero Right: Interactive 3D Terminal */}
          <div className="lg:col-span-7 w-full">
            <InteractiveTerminal />
          </div>

        </section>
        </ScrollReveal>

        {/* ACTIVE PROJECT SPOTLIGHT SECTION */}
        <ScrollReveal delay={100}>
        <section id="current-project-section" className="space-y-10 scroll-mt-24">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest block">
              01. CURRENT COMMITTED INITIATIVE
            </span>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
              <Box className="w-6 h-6 text-blue-500 animate-float" />
              Under Development Spotlight
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded" />
          </div>

          <CurrentProject />
        </section>
        </ScrollReveal>

        {/* CORE COMPETENCY GRID SECTION */}
        <ScrollReveal delay={100}>
        <section id="skills-section" className="space-y-10 scroll-mt-24">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono font-bold text-violet-500 uppercase tracking-widest block">
              02. ENGINEERING TOOLKIT
            </span>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
              <Code className="w-6 h-6 text-violet-500 animate-float-reverse" />
              Technology Vector Grid
            </h2>
            <div className="w-12 h-1 bg-violet-600 rounded" />
          </div>

          <TechStack />
        </section>
        </ScrollReveal>

        {/* INTERACTIVE EXPERIENCE TIMELINE SECTION */}
        <ScrollReveal delay={100}>
        <section id="experience-section" className="space-y-10 scroll-mt-24">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest block">
              03. PROFESSIONAL MILESTONES
            </span>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-500 animate-float" />
              Experience Chronology
            </h2>
            <div className="w-12 h-1 bg-indigo-600 rounded" />
          </div>

          <WorkTimeline />
        </section>
        </ScrollReveal>

        {/* INTERACTIVE CONNECTION POINT */}
        <ScrollReveal delay={100}>
        <section id="contact-section-anchor" className="space-y-12 scroll-mt-24 text-center">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest block">
              04. DIRECT SECURE LINK
            </span>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-100 tracking-tight justify-center flex items-center gap-2">
              <Server className="w-6 h-6 text-emerald-500" />
              Establish Socket Communication
            </h2>
            <div className="w-12 h-1 bg-emerald-600 rounded mx-auto" />
            <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto pt-2">
              Generate a digital handshake by flipping the visual ID card below to transmit an encrypted query block directly into my dashboard index.
            </p>
          </div>

          <ContactSection />
        </section>
        </ScrollReveal>

      </main>

      {/* Standard Elegant Workspace Footer */}
      <footer id="footer" className="bg-slate-950 border-t border-slate-900 py-10 mt-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            <span>© 2026 Ankit Mishra. All systems operational.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Built with React 19 + TypeScript + Tailwind CSS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="System Live" />
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
