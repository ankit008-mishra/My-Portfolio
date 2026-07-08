import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Play, Cpu, Shield, Globe } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
}

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'AnkitMishra OS v1.4.0-production initialized.', type: 'system' },
    { text: 'Type "help" or click the shortcuts below to query the database.', type: 'system' },
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandShortcuts = ['about', 'project', 'skills', 'socials', 'clear'];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

    const newLines: TerminalLine[] = [
      { text: `ankit-mishra@workspace:~$ ${cmd}`, type: 'input' }
    ];

    switch (trimmedCmd) {
      case 'help':
        newLines.push(
          { text: 'Available Command Matrix:', type: 'system' },
          { text: '  about    - Reveal professional background and focus', type: 'output' },
          { text: '  project  - Show details of the active project under development', type: 'output' },
          { text: '  skills   - Render skill vectors and engineering tools', type: 'output' },
          { text: '  socials  - List github profiles and communication channels', type: 'output' },
          { text: '  clear    - Flush the terminal buffer', type: 'output' }
        );
        break;

      case 'about':
        newLines.push(
          { text: 'SYSTEM RECORD: Ankit Mishra', type: 'success' },
          { text: 'ROLE: Software Engineer & Cloud Architect', type: 'output' },
          { text: 'FOCUS: Full Stack Web Systems, Interactive 3D UIs, and Distributed Systems.', type: 'output' },
          { text: 'BIO: Passionate about solving complex technical problems with high-efficiency algorithms and clean structural architectures. Currently building next-generation modular platforms.', type: 'output' }
        );
        break;

      case 'project':
        newLines.push(
          { text: 'CURRENT ACTIVE ENGAGEMENT:', type: 'success' },
          { text: '  NAME: Project Nebula: Autonomous Decentralized AI Orchestrator', type: 'output' },
          { text: '  STATUS: [In Development - Build v0.8.2]', type: 'system' },
          { text: '  TECH: React 19, TypeScript, Express, @google/genai, TailwindCSS v4', type: 'output' },
          { text: '  METRIC: Query latency < 45ms, System load factor 0.12', type: 'success' },
          { text: '  GOAL: To provide a highly robust, low-latency node network enabling secure visual collaboration and multi-agent operations.', type: 'output' }
        );
        break;

      case 'skills':
        newLines.push(
          { text: 'CORE TECHNOLOGY MATRIX:', type: 'success' },
          { text: '  TypeScript / JS  ████████████████████  95%', type: 'output' },
          { text: '  React / Next.js  ██████████████████░░  90%', type: 'output' },
          { text: '  Node.js/Express  ██████████████████░░  90%', type: 'output' },
          { text: '  Docker / DevOps  ██████████████░░░░░░  70%', type: 'output' },
          { text: '  Data Struct/Algo ██████████████████░░  90%', type: 'output' }
        );
        break;

      case 'socials':
        newLines.push(
          { text: 'COMMUNICATION PROTOCOLS:', type: 'success' },
          { text: '  GitHub:   https://github.com/ankit008-mishra', type: 'output' },
          { text: '  Email:    conatct.ankit0mi@gmail.com', type: 'output' },
          { text: '  LinkedIn: https://linkedin.com/in/ankitmishra-eng', type: 'output' },
          { text: '  Instagram: https://instagram.com/your_username', type: 'output' },
          { text: '  Telegram:  https://t.me/your_username', type: 'output' }
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newLines.push({
          text: `Command not found: "${trimmedCmd}". Type "help" to view diagnostic commands.`,
          type: 'error',
        });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      id="terminal-container"
      onClick={focusInput}
      className="w-full bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden font-mono shadow-2xl flex flex-col h-[380px] hover:border-blue-500/30 transition-all duration-300"
    >
      {/* Terminal Title Bar */}
      <div className="bg-slate-900/95 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer" />
        </div>
        <div className="text-xs text-slate-400 flex items-center space-x-1.5">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span>ankit@workspace:~ (bash)</span>
        </div>
        <div className="w-14" /> {/* spacer for center alignment */}
      </div>

      {/* Terminal Output */}
      <div className="p-4 flex-1 overflow-y-auto space-y-2 text-sm leading-relaxed text-slate-300">
        {history.map((line, idx) => {
          let textStyle = 'text-slate-300';
          if (line.type === 'input') textStyle = 'text-blue-400 font-medium';
          if (line.type === 'system') textStyle = 'text-slate-500 text-xs';
          if (line.type === 'error') textStyle = 'text-rose-400 font-medium';
          if (line.type === 'success') textStyle = 'text-emerald-400 font-medium';

          return (
            <div key={idx} className={`whitespace-pre-wrap ${textStyle}`}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Shortcuts Selector */}
      <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-900 flex flex-wrap items-center gap-1.5 select-none">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mr-1">Shortcuts:</span>
        {commandShortcuts.map((shortcut) => (
          <button
            key={shortcut}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(shortcut);
            }}
            className="text-xs px-2.5 py-0.5 rounded bg-slate-800 hover:bg-blue-900/30 border border-slate-700/60 hover:border-blue-500/40 text-slate-300 hover:text-blue-400 transition-all duration-200 cursor-pointer"
          >
            {shortcut}
          </button>
        ))}
      </div>

      {/* Terminal Input Form */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center"
      >
        <span className="text-blue-400 mr-2 font-bold select-none">~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help' to examine metrics..."
          className="bg-transparent text-slate-200 outline-none flex-1 font-mono text-sm border-none ring-0 placeholder-slate-600 focus:outline-none"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
          title="Submit command"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
