import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sparkles,
  BookOpen,
  Film,
  CheckCircle2,
  SkipForward,
  SkipBack,
  Monitor,
  GraduationCap,
  Users,
  Award
} from 'lucide-react';

interface VideoManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Chapter {
  id: string;
  title: string;
  timeSeconds: number;
  timeFormatted: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'intro',
    title: '1. Introducción y Selección de Rol',
    timeSeconds: 0,
    timeFormatted: '00:00',
    description: 'Conoce cómo funciona el portal para aprendices e instructores SENA.',
    icon: Monitor,
  },
  {
    id: 'registro',
    title: '2. Registro de Perfil del Aprendiz',
    timeSeconds: 15,
    timeFormatted: '00:15',
    description: 'Diligencia tus datos, ficha de formación, centro y regional.',
    icon: GraduationCap,
  },
  {
    id: 'simbolos',
    title: '3. Símbolos e Himno SENA con Karaoke',
    timeSeconds: 30,
    timeFormatted: '00:30',
    description: 'Explora escudo, bandera e himno con audio y letras sincronizadas.',
    icon: BookOpen,
  },
  {
    id: 'reglamento',
    title: '4. Reglamento (Acuerdo 0007 e IA Ética)',
    timeSeconds: 45,
    timeFormatted: '00:45',
    description: 'Estudia derechos, deberes, prohibiciones, Zajuna LMS y normas de SST.',
    icon: Sparkles,
  },
  {
    id: 'simulador',
    title: '5. Simulador de Casos y Evaluaciones',
    timeSeconds: 60,
    timeFormatted: '01:00',
    description: 'Resuelve escenarios éticos reales y aprueba los cuestionarios.',
    icon: CheckCircle2,
  },
  {
    id: 'instructor',
    title: '6. Vista del Instructor Encargado',
    timeSeconds: 75,
    timeFormatted: '01:15',
    description: 'Acceso seguro y consolidado de ficha para instructores SENA.',
    icon: Users,
  },
  {
    id: 'certificado',
    title: '7. Descarga de Constancia Oficial',
    timeSeconds: 90,
    timeFormatted: '01:30',
    description: 'Obtén tu certificado digital con código QR de verificación.',
    icon: Award,
  },
];

const TOTAL_DURATION = 105; // 1:45 mins simulation

export const VideoManualModal: React.FC<VideoManualModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Auto-tick simulation playback when open & playing
  useEffect(() => {
    if (!isOpen) return;

    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + delta * playbackRate;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          return next;
        });
      }
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, isPlaying, playbackRate]);

  if (!isOpen) return null;

  const currentChapter =
    [...CHAPTERS].reverse().find((ch) => currentTime >= ch.timeSeconds) || CHAPTERS[0];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  const handleJumpToChapter = (chap: Chapter) => {
    setCurrentTime(chap.timeSeconds);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Floating Window Shell */}
      <div
        ref={containerRef}
        className="w-full max-w-5xl bg-slate-900 border-2 border-[#39A900]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] relative"
      >
        {/* Floating Window Header Bar */}
        <div className="bg-[#00324D] px-4 py-3 flex items-center justify-between border-b border-slate-700 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#39A900] flex items-center justify-center text-white shadow-xs">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-white tracking-tight">
                  Video Manual de Uso - Portal de Inducción SENA
                </h3>
                <span className="text-[10px] bg-[#39A900] text-slate-900 font-bold px-2 py-0.5 rounded uppercase font-mono">
                  Guía Interactiva
                </span>
              </div>
              <p className="text-[11px] text-sky-200">
                Aprende a navegar por los roles de Aprendiz e Instructor en 2 minutos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                showSubtitles
                  ? 'bg-[#39A900] text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
              title="Activar/Desactivar Subtítulos"
            >
              CC {showSubtitles ? 'On' : 'Off'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-white transition cursor-pointer"
              title="Cerrar Ventana Flotante"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Screen + Sidebar Chapters */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-950">
          {/* Main Video Screen Area */}
          <div className="flex-1 flex flex-col justify-between relative bg-black group overflow-hidden">
            {/* Visual Canvas / Interactive Screen Frame */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden min-h-[300px] sm:min-h-[420px]">
              {/* Animated Screen Background Graphic */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00324D]/60 via-slate-950 to-emerald-950/40 opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(#39A900_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

              {/* Dynamic Screen Content based on Current Time */}
              <div className="relative z-10 max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
                {/* Chapter Icon Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#39A900]/20 border border-[#39A900]/50 rounded-full text-[#96e072] text-xs font-bold font-mono shadow-md">
                  <currentChapter.icon className="w-4 h-4 text-[#39A900]" />
                  <span>{currentChapter.title}</span>
                </div>

                {/* Animated Mock Interface Preview Frame */}
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur text-left space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono text-slate-400 ml-2">
                        portal-induccion.sena.edu.co
                      </span>
                    </div>
                    <span className="text-[10px] text-[#39A900] font-bold px-2 py-0.5 bg-[#39A900]/10 rounded">
                      ENVIVO
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-white">{currentChapter.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentChapter.description}
                  </p>

                  {/* Step specific highlight inside screen */}
                  {currentTime < 15 && (
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#39A900] text-white flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Selecciona tu Rol</p>
                        <p className="text-[11px] text-slate-400">
                          Elige "Soy Aprendiz" para iniciar tu inducción o "Soy Instructor" para supervisar.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentTime >= 15 && currentTime < 30 && (
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Formulario de Perfil SENA:</span>
                        <span className="text-[#96e072] font-mono">100% Limpio</span>
                      </div>
                      <div className="text-[11px] text-slate-400 grid grid-cols-2 gap-2">
                        <div className="bg-slate-900 p-2 rounded">✓ Nombres & Documento</div>
                        <div className="bg-slate-900 p-2 rounded">✓ No. Ficha & Centro</div>
                      </div>
                    </div>
                  )}

                  {currentTime >= 30 && currentTime < 45 && (
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00324D] text-sky-400 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Símbolos e Himno SENA</p>
                        <p className="text-[11px] text-slate-400">
                          Escucha la melodía sintética y sigue las letras en formato karaoke dinámico.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentTime >= 45 && currentTime < 60 && (
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 space-y-1">
                      <p className="text-xs font-bold text-[#96e072]">Acuerdo 0007 de 2012 & Actualizaciones</p>
                      <p className="text-[11px] text-slate-300">
                        Derechos, Deberes, Sanciones, Inteligencia Artificial ética, Zajuna LMS y Ley 1562 SST.
                      </p>
                    </div>
                  )}

                  {currentTime >= 60 && currentTime < 75 && (
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Casos Prácticos & Quizzes</p>
                        <p className="text-[11px] text-slate-400">
                          Responde escenarios éticos con retroalimentación inmediata del reglamento.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentTime >= 75 && currentTime < 90 && (
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-sky-400/40 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00324D] text-sky-300 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Consolidado del Instructor</p>
                        <p className="text-[11px] text-slate-400">
                          Acceso genérico seguro (<span className="font-mono text-sky-300">instructor@sena.edu.co</span> / <span className="font-mono text-sky-300">sena2026</span>).
                        </p>
                      </div>
                    </div>
                  )}

                  {currentTime >= 90 && (
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-amber-400/40 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center shrink-0 font-bold">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Certificación Digital Oficial</p>
                        <p className="text-[11px] text-slate-400">
                          Expedición inmediata con código QR de validación al completar el 100%.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Subtitles Overlay */}
              {showSubtitles && (
                <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                  <div className="inline-block bg-black/80 border border-white/20 text-white text-xs sm:text-sm px-4 py-2 rounded-xl font-medium shadow-lg backdrop-blur max-w-xl mx-auto">
                    💬 {currentChapter.description}
                  </div>
                </div>
              )}
            </div>

            {/* CUSTOM VIDEO PLAYER CONTROL BAR */}
            <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-3 space-y-2 select-none">
              {/* Progress Scrubber Bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={TOTAL_DURATION}
                  step={0.5}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#39A900]"
                />
                <span className="text-xs font-mono text-slate-400 w-10">
                  {formatTime(TOTAL_DURATION)}
                </span>
              </div>

              {/* Buttons and Volume controls row */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Play / Pause */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white flex items-center justify-center shadow-md transition cursor-pointer"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  {/* Skip 10s Backward */}
                  <button
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Retroceder 10 segundos"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  {/* Skip 10s Forward */}
                  <button
                    onClick={() => setCurrentTime(Math.min(TOTAL_DURATION, currentTime + 10))}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Adelantar 10 segundos"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  {/* Replay */}
                  <button
                    onClick={() => setCurrentTime(0)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Reiniciar Video"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Volume Toggle */}
                  <div className="hidden sm:flex items-center gap-2 ml-2 border-l border-slate-700 pl-3">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#96e072]" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        if (isMuted) setIsMuted(false);
                      }}
                      className="w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#39A900]"
                    />
                  </div>
                </div>

                {/* Right controls: Speed & Fullscreen */}
                <div className="flex items-center gap-2">
                  {/* Playback speed menu */}
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                    className="px-2 py-1 bg-slate-800 border border-slate-700 text-white rounded-lg text-xs font-mono focus:outline-none cursor-pointer"
                  >
                    <option value={0.75}>0.75x</option>
                    <option value={1.0}>1.0x (Normal)</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2.0}>2.0x</option>
                  </select>

                  {/* Fullscreen toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title={isFullscreen ? 'Salir de Pantalla Completa' : 'Pantalla Completa'}
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Chapter Selector */}
          <div className="w-full md:w-80 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 p-4 overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                Índice de Capítulos ({CHAPTERS.length})
              </span>
              <span className="text-[11px] font-mono text-[#39A900] font-bold">
                Total: 01:45
              </span>
            </div>

            <div className="space-y-1.5">
              {CHAPTERS.map((chap) => {
                const Icon = chap.icon;
                const isActive = currentChapter.id === chap.id;

                return (
                  <button
                    key={chap.id}
                    onClick={() => handleJumpToChapter(chap)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? 'bg-[#39A900]/15 border border-[#39A900] text-white shadow-xs'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-[#39A900] text-white font-bold'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold truncate ${
                            isActive ? 'text-[#96e072]' : 'text-slate-200'
                          }`}
                        >
                          {chap.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 ml-1">
                          {chap.timeFormatted}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                        {chap.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
