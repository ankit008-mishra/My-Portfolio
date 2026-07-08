import React, { useState } from 'react';
import { Code2, Server, Database, Cloud, Terminal, Shield, Workflow, Cpu } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

interface SkillItem {
  name: string;
  level: number;
  icon: React.ReactNode;
  desc: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export default function TechStack() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      title: 'Frontend Architecture',
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      skills: [
        { name: 'TypeScript', level: 95, icon: <Code2 className="w-4 h-4 text-blue-400" />, desc: 'Modern strict type systems, interfaces, custom generics.' },
        { name: 'React 19 / Next.js', level: 90, icon: <Workflow className="w-4 h-4 text-sky-400" />, desc: 'Server Actions, custom hooks, dynamic rendering models.' },
        { name: 'TailwindCSS v4', level: 95, icon: <Cpu className="w-4 h-4 text-indigo-400" />, desc: 'Fluid utility layout, native nested themes, customized theme maps.' },
      ],
    },
    {
      title: 'Backend & Operations',
      icon: <Server className="w-5 h-5 text-violet-400" />,
      skills: [
        { name: 'Node.js / Express', level: 90, icon: <Server className="w-4 h-4 text-violet-400" />, desc: 'Async middleware pipelines, cluster threads, REST/WebSocket servers.' },
        { name: 'PostgreSQL / SQL', level: 85, icon: <Database className="w-4 h-4 text-emerald-400" />, desc: 'Relational design, indexing, transaction bounds, schema migration.' },
        { name: 'Docker / DevOps', level: 75, icon: <Cloud className="w-4 h-4 text-indigo-400" />, desc: 'Multi-stage builds, container isolation, environment pipelines.' },
      ],
    },
  ];

  return (
    <div id="tech-stack" className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            {/* Category Header */}
            <div className="flex items-center gap-2.5 px-2">
              {cat.icon}
              <h3 className="text-base font-sans font-bold text-slate-200 uppercase tracking-wider">
                {cat.title}
              </h3>
            </div>

            {/* Grid of 3D Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cat.skills.map((skill, skillIdx) => (
                <ThreeDCard
                  key={skillIdx}
                  maxRotation={10}
                  scaleOnHover={1.03}
                  glowColor="rgba(59, 130, 246, 0.12)"
                  className="bg-slate-900/40 border border-slate-800/80 p-5 flex flex-col justify-between h-[155px] hover:border-blue-500/30 transition-colors"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="space-y-2">
                    {/* Icon and Name */}
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                        {skill.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">{skill.level}%</span>
                    </div>

                    <h4 className="text-sm font-sans font-bold text-slate-100 tracking-tight mt-1.5">
                      {skill.name}
                    </h4>
                    
                    <p className="text-[10px] text-slate-400 leading-normal font-sans line-clamp-2 transition-all duration-300">
                      {skill.desc}
                    </p>
                  </div>

                  {/* Level bar */}
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: hoveredSkill === skill.name ? `${skill.level}%` : '15%' }}
                    />
                  </div>
                </ThreeDCard>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Engineering Tools / Info board */}
      <div className="bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500">Methodology & Tooling Matrix</span>
          <p className="text-slate-300">
            Git, CI/CD Actions, Vite Builder, esbuild, REST Architecture, SOLID Principles, Agile workflows.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded border border-slate-800 text-blue-400 font-bold">
          <Terminal className="w-3.5 h-3.5" />
          <span>EST. LATENCY: LOW</span>
        </div>
      </div>
    </div>
  );
}
