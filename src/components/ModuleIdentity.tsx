import React, { useState } from 'react';
import { 
  SENA_HISTORY, 
  SENA_SYMBOLS, 
  SENA_ANTHEM, 
  SENA_MISSION_VISION 
} from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import { soundManager } from '../utils/soundEffects';
import { 
  Compass, 
  Shield, 
  Music, 
  Play, 
  Square, 
  CheckCircle, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Info,
  Calendar,
  Volume2,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ModuleIdentityProps {
  visitedSymbols: string[];
  listenedAnthem: boolean;
  exploredHistory: boolean;
  onVisitSymbol: (symbolId: string) => void;
  onFinishAnthem: () => void;
  onExploreHistory: () => void;
  onCompleteModule: () => void;
  isCompleted: boolean;
}

export const ModuleIdentity: React.FC<ModuleIdentityProps> = ({
  visitedSymbols,
  listenedAnthem,
  exploredHistory,
  onVisitSymbol,
  onFinishAnthem,
  onExploreHistory,
  onCompleteModule,
  isCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'symbols' | 'anthem' | 'history' | 'values'>('symbols');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('logo-simbolo');
  const [isAnthemPlaying, setIsAnthemPlaying] = useState<boolean>(false);
  const [currentAnthemLyric, setCurrentAnthemLyric] = useState<string>('');
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(-1);

  const selectedSymbol = SENA_SYMBOLS.find((s) => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  const handleSelectSymbol = (id: string) => {
    setSelectedSymbolId(id);
    onVisitSymbol(id);
  };

  const handleToggleAnthem = () => {
    if (isAnthemPlaying) {
      soundManager.stopAnthem();
      setIsAnthemPlaying(false);
      setCurrentAnthemLyric('');
      setCurrentNoteIndex(-1);
    } else {
      setIsAnthemPlaying(true);
      soundManager.playAnthem(
        (noteIndex, lyric) => {
          setCurrentNoteIndex(noteIndex);
          setCurrentAnthemLyric(lyric);
        },
        () => {
          setIsAnthemPlaying(false);
          setCurrentAnthemLyric('');
          setCurrentNoteIndex(-1);
          onFinishAnthem();
          soundManager.playSuccessSound();
          confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
        }
      );
    }
  };

  const handleStopAnthem = () => {
    soundManager.stopAnthem();
    setIsAnthemPlaying(false);
    setCurrentAnthemLyric('');
    setCurrentNoteIndex(-1);
  };

  // Check overall submodule requirements
  const allSymbolsVisited = SENA_SYMBOLS.every((s) => visitedSymbols.includes(s.id));
  const canFinalize = allSymbolsVisited && (listenedAnthem || isCompleted) && (exploredHistory || isCompleted);

  return (
    <div className="space-y-6">
      {/* Module Title & Hero */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Módulo 1 de Inducción</span>
          </div>
          <h2 className="text-2xl font-black text-[#00324D] tracking-tight">
            Imagen Institucional y Cultura SENA
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Conoce el legado de Rodolfo Martínez Tono, los símbolos heráldicos que nos representan a nivel mundial,
            el Himno institucional con su reproductor interactivo y los principios éticos que guían tu formación integral.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              if (canFinalize) {
                onCompleteModule();
                confetti({ particleCount: 60, spread: 80 });
              }
            }}
            disabled={isCompleted || !canFinalize}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              isCompleted
                ? 'bg-[#39A900]/15 text-[#39A900] border border-[#39A900]/30 cursor-default'
                : canFinalize
                ? 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-md shadow-[#39A900]/25 animate-pulse'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? 'Módulo Completado' : canFinalize ? 'Marcar Módulo como Completado' : 'Explora los contenidos para completar'}</span>
          </button>
        </div>
      </div>

      {/* Internal Navigation Subtabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('symbols')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'symbols'
              ? 'border-[#39A900] text-[#00324D] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4 text-[#39A900]" />
          <span>Símbolos Institucionales</span>
          {allSymbolsVisited && <Check className="w-3.5 h-3.5 text-[#39A900]" />}
        </button>

        <button
          onClick={() => setActiveTab('anthem')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'anthem'
              ? 'border-[#39A900] text-[#00324D] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Music className="w-4 h-4 text-[#FF6C0C]" />
          <span>Himno del SENA (Audio Interactivo)</span>
          {listenedAnthem && <Check className="w-3.5 h-3.5 text-[#39A900]" />}
        </button>

        <button
          onClick={() => {
            setActiveTab('history');
            onExploreHistory();
          }}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-[#39A900] text-[#00324D] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#00324D]" />
          <span>Historia & Fundación (1957)</span>
          {exploredHistory && <Check className="w-3.5 h-3.5 text-[#39A900]" />}
        </button>

        <button
          onClick={() => setActiveTab('values')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'values'
              ? 'border-[#39A900] text-[#00324D] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-emerald-600" />
          <span>Misión, Visión & Valores</span>
        </button>
      </div>

      {/* SUBTAB 1: SÍMBOLOS INSTITUCIONALES */}
      {activeTab === 'symbols' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Symbol Selectors */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Selecciona un símbolo para examinar su heráldica:
            </h3>

            {SENA_SYMBOLS.map((symbol) => {
              const isSelected = symbol.id === selectedSymbolId;
              const isVisited = visitedSymbols.includes(symbol.id);

              return (
                <div
                  key={symbol.id}
                  onClick={() => handleSelectSymbol(symbol.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#39A900] shadow-md ring-2 ring-[#39A900]/20'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center p-1.5">
                        {symbol.id === 'escudo' ? (
                          <SenaLogo variant="escudo" className="w-7 h-7" />
                        ) : symbol.id === 'bandera' ? (
                          <div className="w-7 h-5 bg-white border border-slate-300 rounded-xs flex items-center justify-center shadow-xs">
                            <div className="w-2.5 h-2.5 bg-[#39A900] rounded-xs" />
                          </div>
                        ) : (
                          <SenaLogo variant="logo" className="w-7 h-7" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{symbol.name}</h4>
                        <p className="text-xs text-slate-500">{symbol.tagline}</p>
                      </div>
                    </div>

                    {isVisited && (
                      <span className="w-5 h-5 rounded-full bg-[#39A900]/15 text-[#39A900] flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Colors callout */}
            <div className="bg-slate-900 text-white rounded-xl p-4 mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
                Paleta Cromática Oficial del SENA
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-[#39A900] shrink-0 border border-white/20" />
                  <div className="text-xs">
                    <p className="font-bold text-[#96e072]">Verde SENA (#39A900)</p>
                    <p className="text-slate-400 text-[11px]">Esperanza, juventud, naturaleza viva y productividad.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-white shrink-0 border border-slate-300" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Blanco Institucional</p>
                    <p className="text-slate-400 text-[11px]">Paz, rectitud ética, serenidad y transparencia.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-[#00324D] shrink-0 border border-white/20" />
                  <div className="text-xs">
                    <p className="font-bold text-sky-400">Azul Nocturno (#00324D)</p>
                    <p className="text-slate-400 text-[11px]">Solidez, ciencia, técnica y conocimiento riguroso.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Interactive Inspector of Selected Symbol */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider">
                    Análisis Heráldico
                  </span>
                  <h3 className="text-xl font-extrabold text-[#00324D]">
                    {selectedSymbol.name}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#39A900] border border-emerald-200">
                  {selectedSymbol.tagline}
                </span>
              </div>

              {/* Symbol Visual Showcase */}
              <div className="py-8 my-4 bg-slate-50/80 rounded-xl border border-slate-200/60 flex flex-col items-center justify-center relative overflow-hidden">
                {selectedSymbol.id === 'escudo' ? (
                  <div className="w-36 h-44 drop-shadow-md transition-transform hover:scale-105 duration-300">
                    <SenaLogo variant="escudo" className="w-full h-full" />
                  </div>
                ) : selectedSymbol.id === 'bandera' ? (
                  <div className="w-64 h-40 bg-white border-2 border-slate-300 rounded shadow-md flex items-center justify-center p-3 relative transition-transform hover:scale-105 duration-300">
                    {/* Mast line */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-slate-400" />
                    <SenaLogo variant="logo" className="w-20 h-20" />
                  </div>
                ) : (
                  <div className="w-36 h-36 drop-shadow-md transition-transform hover:scale-105 duration-300">
                    <SenaLogo variant="logo" className="w-full h-full" />
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-4 italic">
                  Representación vectorial oficial para el proceso de inducción
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                {selectedSymbol.description}
              </p>

              {/* Detailed Bullet Points */}
              <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#39A900]" />
                  Elementos y Significado Formativo:
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {selectedSymbol.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Símbolo institucional oficial del SENA</span>
              <button
                onClick={() => {
                  const nextIndex = (SENA_SYMBOLS.findIndex((s) => s.id === selectedSymbolId) + 1) % SENA_SYMBOLS.length;
                  handleSelectSymbol(SENA_SYMBOLS[nextIndex].id);
                }}
                className="text-[#39A900] font-bold hover:underline cursor-pointer"
              >
                Ver siguiente símbolo →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: HIMNO DEL SENA CON AUDIO INTERACTIVO */}
      {activeTab === 'anthem' && (
        <div className="space-y-6">
          {/* Audio Synthesizer Karaoke Banner */}
          <div className="bg-gradient-to-r from-[#00324D] via-[#00476e] to-[#00324D] text-white rounded-2xl p-6 shadow-md border border-slate-700 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#96e072] uppercase tracking-wider mb-1">
                  <Volume2 className="w-4 h-4" />
                  <span>Sintetizador de Audio Solemne SENA</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight text-white">
                  Himno del Servicio Nacional de Aprendizaje
                </h3>
                <p className="text-slate-300 text-xs mt-1">
                  Letra: <strong className="text-white">{SENA_ANTHEM.authorLyrics}</strong> | Música: <strong className="text-white">{SENA_ANTHEM.authorMusic}</strong>
                </p>
                <p className="text-slate-400 text-xs mt-2 max-w-xl">
                  Escucha la melodía sintetizada en tiempo real mediante Web Audio API mientras sigues la letra sincronizada.
                </p>
              </div>

              {/* Audio Controls */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleAnthem}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg cursor-pointer ${
                      isAnthemPlaying
                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-amber-500/25 animate-pulse'
                        : 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-[#39A900]/30'
                    }`}
                  >
                    {isAnthemPlaying ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        <span>Detener Melodía</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Reproducir Himno</span>
                      </>
                    )}
                  </button>

                  {isAnthemPlaying && (
                    <button
                      onClick={handleStopAnthem}
                      className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                      title="Reiniciar"
                    >
                      <Square className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isAnthemPlaying && (
                  <div className="flex items-center gap-1.5 text-xs text-[#96e072]">
                    <span className="w-2 h-2 rounded-full bg-[#39A900] animate-ping" />
                    <span>Reproduciendo melodía marcial...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Karaoke live line prompt */}
            {isAnthemPlaying && (
              <div className="mt-5 pt-4 border-t border-white/15 text-center">
                <span className="text-xs uppercase text-slate-400 tracking-widest font-semibold block mb-1">
                  Entonación en Curso:
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono tracking-wide drop-shadow">
                  {currentAnthemLyric || '¡Iniciando acordes!'}
                </span>
              </div>
            )}
          </div>

          {/* Anthem Lyrics and Pedagogical Meaning */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Chorus highlight */}
            <div className="md:col-span-5 bg-white rounded-2xl border-2 border-[#39A900] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-[#39A900]/15 text-[#39A900] font-black text-xs uppercase tracking-wider">
                  Coro Principal (Obligatorio en Actos Oficiales)
                </span>
                <Music className="w-4 h-4 text-[#39A900]" />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 mb-4">
                <p className="text-slate-800 text-sm font-semibold leading-relaxed whitespace-pre-line italic font-serif">
                  {SENA_ANTHEM.chorus}
                </p>
              </div>

              <div className="text-xs text-slate-600 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
                <p className="font-bold text-[#00324D] mb-1">Significado Pedagógico del Coro:</p>
                <p>
                  Es una proclama al entusiasmo, la nobleza y la pasión con la que el aprendiz colombiano asume
                  su oficio técnico o tecnológico como motor de transformación social.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-500">
                  💡 <em>Nota cívica:</em> Durante la interpretación del himno del SENA en auditorios o ceremonias,
                  los aprendices deben ponerse de pie con postura digna, retirar gorras o sombreros y cantar con orgullo patrio.
                </p>
              </div>
            </div>

            {/* Stanzas */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Estrofas del Himno Institucional y su Reflexión:
              </h4>

              {SENA_ANTHEM.stanzas.map((stanza) => (
                <div key={stanza.number} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 text-xs">
                      Estrofa {stanza.number}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Compás 4/4</span>
                  </div>

                  <p className="text-slate-700 text-xs font-medium whitespace-pre-line mb-3 italic font-serif">
                    {stanza.text}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 text-xs text-slate-600">
                    <span className="font-semibold text-[#00324D]">Reflexión formativa: </span>
                    {stanza.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: HISTORIA Y FUNDACIÓN (1957) */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Founder Hero Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00324D] to-[#39A900] p-1 mb-3 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white text-3xl font-extrabold font-serif">
                  RMT
                </div>
              </div>
              <h3 className="font-extrabold text-base text-[#00324D]">
                Dr. Rodolfo Martínez Tono
              </h3>
              <p className="text-xs text-slate-500 font-medium">1927 - 2015 | Cartagena de Indias</p>
              <div className="mt-2 bg-[#39A900]/15 text-[#39A900] text-[11px] font-bold px-2 py-0.5 rounded-full">
                Fundador y Primer Director General
              </div>
            </div>

            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>21 de Junio de 1957 • Decreto Ley 118</span>
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">
                La Idea que Transformó a los Trabajadores de Colombia
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {SENA_HISTORY.visionOrigin}
              </p>
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-[#00324D]">
                <strong>Naturaleza Tripartita:</strong> El SENA nació con la participación conjunta del Estado,
                los trabajadores organizados y los empleadores, financiado por aportes parafiscales para garantizar
                capacitación gratuita de por vida a los colombianos.
              </div>
            </div>
          </div>

          {/* Interactive Historical Milestones Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
              Hitos Históricos en la Trayectoria del SENA:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SENA_HISTORY.milestones.map((m, idx) => (
                <div key={idx} className="relative p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/40 hover:border-[#39A900]/40 transition group">
                  <span className="text-lg font-black font-mono text-[#39A900] block mb-1">
                    {m.year}
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs mb-1.5 group-hover:text-[#00324D]">
                    {m.title}
                  </h5>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: MISIÓN, VISIÓN Y VALORES */}
      {activeTab === 'values' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Misión */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#39A900] block mb-1">
                  Razón de Ser Institucional
                </span>
                <h3 className="text-lg font-extrabold text-[#00324D] mb-3">
                  Misión del SENA
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {SENA_MISSION_VISION.mission}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Inversión en capital humano, empleabilidad e innovación técnica.
              </div>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6C0C] block mb-1">
                  Proyección al Futuro
                </span>
                <h3 className="text-lg font-extrabold text-[#00324D] mb-3">
                  Visión Institucional 2026
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {SENA_MISSION_VISION.vision}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Transición digital, reindustrialización, equidad territorial y sostenibilidad.
              </div>
            </div>
          </div>

          {/* Ethical Values Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Valores Éticos del Aprendiz SENA:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SENA_MISSION_VISION.values.map((val, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-[#39A900] hover:shadow-xs transition">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{val.name}</h5>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
