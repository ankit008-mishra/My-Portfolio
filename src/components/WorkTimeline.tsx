import React, { useState } from 'react';
import { Briefcase, Calendar, Award, GraduationCap, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'work' | 'education' | 'achievement';
  description: string;
  bullets: string[];
  tags: string[];
}

export default function WorkTimeline() {
  const [activeItem, setActiveItem] = useState<string | null>('exp-1');

  const timelineData: TimelineItem[] = [
    {
      id: 'exp-1',
      role: 'Full-Stack Software Engineer',
      company: 'High-Scale Systems Lab',
      period: '2024 - Present',
      location: 'Remote / Bangalore',
      type: 'work',
      description: 'Engineering resilient decentralized micro-brokers and multi-user visualization pipelines.',
      bullets: [
        'Designed asynchronous router interfaces reducing end-to-end telemetry synchronization delay by 45ms.',
        'Successfully migrated legacy single-instance systems to load-balanced node clusters handling 20k+ concurrent packets.',
        'Pioneered interactive telemetry grids in React 19 and custom 3D web panels using hardware-accelerated shaders.'
      ],
      tags: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Vite', 'Docker']
    },
    {
      id: 'exp-2',
      role: 'Software Systems Intern',
      company: 'CloudScale Infrastructure Corp',
      period: '2023 - 2024',
      location: 'Bangalore, India',
      type: 'work',
      description: 'Worked on automated continuous integration templates and container orchestration tooling.',
      bullets: [
        'Built automated esbuild compile steps that reduced container build times by 30%.',
        'Engineered type-safe database migrations and client validation hooks with PostgreSQL.',
        'Collaborated on high-availability web service clusters with automated failure failovers.'
      ],
      tags: ['TypeScript', 'esbuild', 'PostgreSQL', 'Docker', 'CI/CD']
    },
    {
      id: 'exp-3',
      role: 'Bachelor of Technology in Computer Science',
      company: 'Technical University',
      period: '2020 - 2024',
      location: 'India',
      type: 'education',
      description: 'Focused on algorithms, data structures, and secure cloud networking concepts.',
      bullets: [
        'Graduated with honors in Computer Science Engineering.',
        'Developed a final year project on automated visual clustering using lightweight vector lookups.',
        'Led the student technology club, organizing workshops on responsive web layout and modern standard tooling.'
      ],
      tags: ['Data Structures', 'Distributed Systems', 'Algorithms', 'Cloud Computing']
    }
  ];

  return (
    <div id="work-timeline" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Timeline Nav List (Left Column) */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        {timelineData.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                isActive
                  ? 'bg-blue-950/40 border-blue-500/50 text-slate-100 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'bg-slate-900/10 border-slate-800/80 hover:bg-slate-900/30 hover:border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 border transition-colors ${
                isActive ? 'bg-blue-900/40 border-blue-500/30 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}>
                {item.type === 'work' ? (
                  <Briefcase className="w-4 h-4" />
                ) : (
                  <GraduationCap className="w-4 h-4" />
                )}
              </div>

              <div className="space-y-1 overflow-hidden">
                <div className="flex items-center gap-1.5 justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                    {item.period}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 truncate max-w-[100px]">
                    {item.location}
                  </span>
                </div>
                <h4 className="text-xs font-sans font-bold text-slate-100 truncate">
                  {item.role}
                </h4>
                <p className="text-[11px] font-mono text-slate-400 truncate">
                  {item.company}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Timeline Detail Card (Right Column) */}
      <div className="lg:col-span-8">
        {(() => {
          const item = timelineData.find((i) => i.id === activeItem);
          if (!item) return null;

          return (
            <ThreeDCard
              maxRotation={6}
              scaleOnHover={1.01}
              glowColor="rgba(147, 51, 234, 0.12)"
              className="bg-slate-900/30 border border-slate-800 p-6 md:p-8 flex flex-col justify-between h-full min-h-[360px]"
            >
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-xl font-sans font-extrabold text-slate-100 tracking-tight">
                      {item.role}
                    </h3>
                    <p className="text-sm font-mono text-blue-400 font-semibold mt-0.5">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded">
                      <Calendar className="w-3 h-3 text-violet-400" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 text-left">
                  <p className="text-slate-300 text-sm leading-relaxed font-sans font-medium italic">
                    "{item.description}"
                  </p>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                      KEY DELIVERABLES
                    </span>
                    <ul className="space-y-2.5">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Tags Footer */}
              <div className="mt-8 pt-4 border-t border-slate-800/40">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800/80 px-2.5 py-1 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </ThreeDCard>
          );
        })()}
      </div>

    </div>
  );
}
