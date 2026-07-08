import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, RotateCw, CheckCircle, ShieldAlert, Wifi, Instagram } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';

export default function ContactSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmissionStatus, setTransmissionStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/ankit008-mishra',
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-950/20',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/ankitmishra-eng', // professional-looking placeholder link
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-950/20',
    },
    {
      name: 'Email',
      url: 'mailto:conatct.ankit0mi@gmail.com',
      icon: <Mail className="w-5 h-5" />,
      color: 'hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-950/20',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/your_username',
      icon: <Instagram className="w-5 h-5" />,
      color: 'hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-950/20',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/your_username',
      icon: <Send className="w-5 h-5" />,
      color: 'hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-950/20',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('All telemetry fields must be populated.');
      return;
    }

    setTransmissionStatus('transmitting');
    setProgress(0);

    // Simulate multi-packet secure transmission
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTransmissionStatus('success');
          setFormData({ name: '', email: '', message: '' });
          // Automatically flip back after a brief delay
          setTimeout(() => {
            setIsFlipped(false);
            setTransmissionStatus('idle');
          }, 3500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div id="contact-wrapper" className="flex flex-col items-center justify-center max-w-lg mx-auto w-full min-h-[460px]">
      
      {/* 3D Fliping Container */}
      <div className="w-full relative h-[420px] perspective-2000">
        <div
          className={`w-full h-full duration-700 preserve-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* CARD FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-slate-900/45 border border-slate-800 p-8 flex flex-col justify-between shadow-2xl backface-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />

            {/* Top info and status */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-bold">
                COMM_LINK v3.2
              </span>
              <div className="flex items-center gap-1 bg-emerald-950/40 border border-emerald-900/60 text-[10px] px-2 py-0.5 rounded text-emerald-400 font-mono">
                <Wifi className="w-3 h-3" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Middle Profile Bio Card */}
            <div className="mt-4 text-center">
              <div className="flex justify-center mb-4">
                <ProfileAvatar size="md" interactive={false} />
              </div>
              <h3 className="text-xl font-sans font-extrabold text-slate-100">Ankit Mishra</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">Software Engineer • Systems Dev</p>
              
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-4 leading-relaxed font-sans">
                Open to collaboration, new projects, and system design challenges. Feel free to connect via social links or transmit an direct digital query card.
              </p>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className={`p-2.5 rounded-xl border border-slate-800 text-slate-400 transition-all duration-300 ${social.color}`}
                  title={`Open Ankit's ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Flip control trigger */}
            <button
              onClick={handleFlip}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border border-blue-400/20 shadow-lg hover:shadow-blue-500/20 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>TRANSMIT DIRECT PACKET</span>
            </button>
          </div>

          {/* CARD BACK SIDE (Flip 180deg) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-slate-950/95 border border-slate-800 p-8 flex flex-col justify-between shadow-2xl backface-hidden rotate-y-180">
            {transmissionStatus === 'idle' || transmissionStatus === 'transmitting' ? (
              <form onSubmit={handleTransmit} className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                    <span className="text-xs font-mono font-bold text-slate-300">SECURE COMMUNICATIONS</span>
                    <button
                      type="button"
                      onClick={handleFlip}
                      className="text-slate-500 hover:text-slate-300 transition-colors text-[10px] font-mono cursor-pointer"
                    >
                      [CANCEL]
                    </button>
                  </div>

                  <div className="space-y-3 text-left">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                        SENDER_NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={transmissionStatus === 'transmitting'}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                        REPLY_ADDRESS
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={transmissionStatus === 'transmitting'}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                        placeholder="e.g. client@domain.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                        PAYLOAD_CONTENT
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={transmissionStatus === 'transmitting'}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-mono resize-none"
                        placeholder="Type message block..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submitting Status OR Action Button */}
                {transmissionStatus === 'transmitting' ? (
                  <div className="font-mono text-xs space-y-2 mt-4">
                    <div className="flex items-center justify-between text-[10px] text-blue-400">
                      <span>SYNCING TUNNEL PATHWAY...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
                      <div className="h-full bg-blue-500 transition-all duration-150" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border border-emerald-400/20 mt-4 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>EMIT SECURE PACKET</span>
                  </button>
                )}
              </form>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center font-mono space-y-4">
                <CheckCircle className="w-14 h-14 text-emerald-400 animate-pulse" />
                <div>
                  <h4 className="text-emerald-400 font-bold text-sm">TRANSMISSION COMPLETED</h4>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                    Packets parsed & recorded in index
                  </p>
                </div>
                <p className="text-xs text-slate-300 max-w-xs mt-2 font-sans">
                  Thank you! Ankit's inbox has successfully aggregated your message parameters. Handshake complete.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
