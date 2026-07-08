import React, { useState, useEffect } from 'react';
import { Cpu, Server, Layers, GitBranch, Terminal as TermIcon, CheckCircle2, CircleDot, Activity, RefreshCw } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function CurrentProject() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [telemetry, setTelemetry] = useState({
    activeNodes: 12,
    cpuLoad: 34,
    memUsage: 58,
    reqSec: 24.5,
    lastEvent: 'Broker handshake initialized.',
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate active live telemetry stream
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const nextNodes = Math.max(8, Math.min(24, prev.activeNodes + (Math.random() > 0.5 ? 1 : -1)));
        const nextCpu = Math.max(15, Math.min(85, Math.round(prev.cpuLoad + (Math.random() - 0.5) * 10)));
        const nextMem = Math.max(40, Math.min(95, Math.round(prev.memUsage + (Math.random() - 0.5) * 4)));
        const nextReq = parseFloat((prev.reqSec + (Math.random() - 0.5) * 3).toFixed(1));

        const systemEvents = [
          'Handshake successful on Node-A5.',
          'Distributed task pipeline cached.',
          'Model vector-search latency: 32ms.',
          'Flushed inactive telemetry sockets.',
          'Syncing neural model weights...',
          'Payload compressed with esbuild GZIP.',
        ];
        const randomEvent = systemEvents[Math.floor(Math.random() * systemEvents.length)];

        return {
          activeNodes: nextNodes,
          cpuLoad: nextCpu,
          memUsage: nextMem,
          reqSec: Math.max(2.0, nextReq),
          lastEvent: randomEvent,
        };
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const manualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setTelemetry((prev) => ({
        ...prev,
        cpuLoad: Math.round(35 + Math.random() * 20),
        reqSec: parseFloat((22 + Math.random() * 5).toFixed(1)),
        lastEvent: 'Forced telemetry synchronization sequence.',
      }));
    }, 800);
  };

  const layers = [
    {
      id: 3,
      name: 'Client Portal & Visualization',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500/40 bg-indigo-950/25',
      tech: 'React 19, TailwindCSS, Motion, Recharts',
      desc: 'High-fidelity, responsive control panel utilizing stateful views and spatial perspective rendering.',
    },
    {
      id: 2,
      name: 'Distributed Broker & Event Router',
      icon: <Server className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/40 bg-blue-950/25',
      tech: 'TypeScript ESM, Express, WebSockets, Node Cluster',
      desc: 'Centralized async telemetry aggregator ensuring reliable task serialization and packet delivery.',
    },
    {
      id: 1,
      name: 'Autonomous Vector Engine',
      icon: <Cpu className="w-5 h-5 text-violet-400" />,
      color: 'border-violet-500/40 bg-violet-950/25',
      tech: '@google/genai, HNSW VectorDB, Python Core',
      desc: 'Sub-second vector lookup and real-time query parsing for multi-agent autonomous tasks.',
    },
  ];

  return (
    <div id="current-project" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual representation: 3D stacked diagram */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[440px] px-4 py-8 bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />

        <div className="text-center mb-8 z-10">
          <h3 className="text-lg font-sans font-semibold text-slate-100 flex items-center justify-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            3D System Stack Topology
          </h3>
          <p className="text-xs text-slate-400 mt-1">Hover over layers to inspect structural architecture details</p>
        </div>

        {/* 3D Stack Container */}
        <div className="relative w-full max-w-[280px] h-[280px] flex items-center justify-center perspective-1000 select-none">
          {layers.map((layer, idx) => {
            // Stack transform rules
            // base transform translates layers along the Z-axis in 3D space
            const isTargeted = activeLayer === layer.id;
            const translateZValue = (3 - idx) * 45;
            const hoverTranslateZ = isTargeted ? translateZValue + 25 : translateZValue;

            const layerStyle: React.CSSProperties = {
              transform: `rotateX(55deg) rotateZ(-38deg) translateZ(${hoverTranslateZ}px)`,
              zIndex: 10 + idx,
            };

            return (
              <div
                key={layer.id}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                style={layerStyle}
                className={`absolute w-full h-[120px] rounded-xl border-2 p-4 flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer shadow-lg hover:shadow-2xl hover:brightness-110 ${layer.color} ${
                  isTargeted ? 'border-blue-400 shadow-blue-500/10' : ''
                }`}
              >
                {/* Layer content */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {layer.icon}
                    <span className="text-xs font-mono font-bold text-slate-100">{layer.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-950/40 border border-slate-800">
                    L{layer.id}
                  </span>
                </div>

                <div className="mt-2">
                  <p className="text-[10px] text-slate-400 font-mono line-clamp-1">{layer.tech}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Layer Info Panel (Dynamic depending on hover) */}
        <div className="w-full mt-6 px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800/60 min-h-[82px] flex flex-col justify-center transition-all duration-300">
          {activeLayer ? (
            (() => {
              const selected = layers.find((l) => l.id === activeLayer);
              return (
                <div className="animate-fade-in">
                  <h4 className="text-xs font-bold text-slate-200 font-mono flex items-center gap-1.5">
                    {selected?.icon}
                    {selected?.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-normal font-sans">{selected?.desc}</p>
                </div>
              );
            })()
          ) : (
            <div className="text-center text-xs text-slate-500 italic">
              Hover over a 3D structural plate above to inspect physical tech layers.
            </div>
          )}
        </div>
      </div>

      {/* Narrative details: Current active features and metrics */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950/50 border border-blue-900/50">
                ACTIVE ENGINEERING MISSION
              </span>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Build Phase: v0.8.2</span>
              </div>
            </div>

            <h3 className="text-2xl font-sans font-bold text-slate-100 tracking-tight">
              Project Nebula
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Currently engineering an autonomous micro-agent orchestrator that distributes task-load parameters across server-side networks securely. Built with high-speed async middleware pipelines to reduce operational roundtrip latency to milliseconds.
            </p>
          </div>

          {/* Simulated Live System Node Monitor */}
          <div className="mt-6 bg-slate-950 border border-slate-800/80 rounded-xl p-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                Live Node Diagnostics
              </span>
              <button
                onClick={manualRefresh}
                disabled={isRefreshing}
                className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 hover:bg-slate-900 px-1.5 py-0.5 rounded cursor-pointer"
                title="Force refresh diagnostics"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>SYNC</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div>
                <span className="text-slate-500 block">Orchestrator Nodes</span>
                <span className="text-sm font-bold text-emerald-400">{telemetry.activeNodes} Nodes Online</span>
              </div>
              <div>
                <span className="text-slate-500 block">Telemetry Traffic</span>
                <span className="text-sm font-bold text-blue-400">{telemetry.reqSec} req/sec</span>
              </div>
              <div>
                <span className="text-slate-500 block">Broker CPU Usage</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-1000"
                      style={{ width: `${telemetry.cpuLoad}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-300 min-w-[28px] text-right">{telemetry.cpuLoad}%</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block">Buffer Memory Allocation</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 transition-all duration-1000"
                      style={{ width: `${telemetry.memUsage}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-300 min-w-[28px] text-right">{telemetry.memUsage}%</span>
                </div>
              </div>
            </div>

            <div className="mt-3.5 border-t border-slate-800/60 pt-2.5 flex items-center gap-2 text-slate-400 text-[10px]">
              <span className="text-indigo-400 uppercase font-bold">LOG_AGNT:</span>
              <span className="truncate">{telemetry.lastEvent}</span>
            </div>
          </div>

          {/* Task Timeline / Feature Completed list */}
          <div className="mt-6">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">
              Task Deliverables
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Asynchronous Broker Middleware</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">Engineered type-safe server router compiling with Node ESM standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CircleDot className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <span className="font-semibold text-slate-200">Interactive Visual HUD</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">Constructing responsive control grid featuring 3D perspective tilts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
