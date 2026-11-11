import React, { useState } from 'react';
import { 
  IDENTITY_QUIZ_QUESTIONS, 
  REGULATIONS_QUIZ_QUESTIONS, 
  MATCHING_PAIRS 
} from '../data/senaData';
import { QuizQuestion } from '../types/induction';
import { soundManager } from '../utils/soundEffects';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Award, 
  Layers, 
  Dices,
  Trophy,
  ArrowRight,
  Shield,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ModuleQuizzesProps {
  identityScore: number;
  regulationsScore: number;
  matchGameCompleted: boolean;
  onUpdateIdentityScore: (score: number) => void;
  onUpdateRegulationsScore: (score: number) => void;
  onCompleteMatchGame: () => void;
  onCompleteModule: () => void;
  isCompleted: boolean;
}

export const ModuleQuizzes: React.FC<ModuleQuizzesProps> = ({
  identityScore,
  regulationsScore,
  matchGameCompleted,
  onUpdateIdentityScore,
  onUpdateRegulationsScore,
  onCompleteMatchGame,
  onCompleteModule,
  isCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'regulations' | 'match' | 'roulette'>('identity');

  // Quiz state for Identity
  const [identityIndex, setIdentityIndex] = useState<number>(0);
  const [identityAnswers, setIdentityAnswers] = useState<{ [qId: string]: number }>({});
  const [showIdentityReview, setShowIdentityReview] = useState<boolean>(false);

  // Quiz state for Regulations
  const [regIndex, setRegIndex] = useState<number>(0);
  const [regAnswers, setRegAnswers] = useState<{ [qId: string]: number }>({});
  const [showRegReview, setShowRegReview] = useState<boolean>(false);

  // Match game state
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchAttempts, setMatchAttempts] = useState<number>(0);

  // Roulette state
  const [rouletteQuestion, setRouletteQuestion] = useState<QuizQuestion | null>(null);
  const [rouletteAnswer, setRouletteAnswer] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Identity quiz handlers
  const currentIdentityQ = IDENTITY_QUIZ_QUESTIONS[identityIndex];
  const handleAnswerIdentity = (optionIdx: number) => {
    const updated = { ...identityAnswers, [currentIdentityQ.id]: optionIdx };
    setIdentityAnswers(updated);

    if (optionIdx === currentIdentityQ.correctAnswer) {
      soundManager.playSuccessSound();
    } else {
      soundManager.playErrorSound();
    }
  };

  const handleFinishIdentityQuiz = () => {
    let correct = 0;
    IDENTITY_QUIZ_QUESTIONS.forEach((q) => {
      if (identityAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const percentage = Math.round((correct / IDENTITY_QUIZ_QUESTIONS.length) * 100);
    onUpdateIdentityScore(percentage);
    setShowIdentityReview(true);
    if (percentage >= 70) {
      soundManager.playFanfare();
      confetti({ particleCount: 50, spread: 70 });
    }
  };

  // Regulations quiz handlers
  const currentRegQ = REGULATIONS_QUIZ_QUESTIONS[regIndex];
  const handleAnswerReg = (optionIdx: number) => {
    const updated = { ...regAnswers, [currentRegQ.id]: optionIdx };
    setRegAnswers(updated);

    if (optionIdx === currentRegQ.correctAnswer) {
      soundManager.playSuccessSound();
    } else {
      soundManager.playErrorSound();
    }
  };

  const handleFinishRegQuiz = () => {
    let correct = 0;
    REGULATIONS_QUIZ_QUESTIONS.forEach((q) => {
      if (regAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const percentage = Math.round((correct / REGULATIONS_QUIZ_QUESTIONS.length) * 100);
    onUpdateRegulationsScore(percentage);
    setShowRegReview(true);
    if (percentage >= 70) {
      soundManager.playFanfare();
      confetti({ particleCount: 50, spread: 70 });
    }
  };

  // Match game handlers
  const handlePickConcept = (conceptId: string) => {
    if (matchedPairs.includes(conceptId)) return;
    setSelectedConcept(conceptId);
    if (selectedMatch) {
      checkMatch(conceptId, selectedMatch);
    }
  };

  const handlePickMatch = (matchId: string) => {
    if (matchedPairs.includes(matchId)) return;
    setSelectedMatch(matchId);
    if (selectedConcept) {
      checkMatch(selectedConcept, matchId);
    }
  };

  const checkMatch = (conceptId: string, matchId: string) => {
    setMatchAttempts((prev) => prev + 1);
    if (conceptId === matchId) {
      soundManager.playSuccessSound();
      const updated = [...matchedPairs, conceptId];
      setMatchedPairs(updated);
      setSelectedConcept(null);
      setSelectedMatch(null);

      if (updated.length === MATCHING_PAIRS.length) {
        onCompleteMatchGame();
        soundManager.playFanfare();
        confetti({ particleCount: 60, spread: 80 });
      }
    } else {
      soundManager.playErrorSound();
      setTimeout(() => {
        setSelectedConcept(null);
        setSelectedMatch(null);
      }, 700);
    }
  };

  // Roulette handler
  const handleSpinRoulette = () => {
    setIsSpinning(true);
    setRouletteAnswer(null);
    const allQuestions = [...IDENTITY_QUIZ_QUESTIONS, ...REGULATIONS_QUIZ_QUESTIONS];

    let count = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * allQuestions.length);
      setRouletteQuestion(allQuestions[randomIdx]);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 120);
  };

  const canCompleteOverallModule = identityScore >= 70 && regulationsScore >= 70;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Módulo 4 de Inducción</span>
          </div>
          <h2 className="text-2xl font-black text-[#00324D] tracking-tight">
            Cuestionarios Interactivos & Desafíos de Conocimiento
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Demuestra lo aprendido sobre la imagen institucional, símbolos, historia y el Reglamento del Aprendiz.
            Aprueba con un mínimo del 70% en cada cuestionario para certificar tu inducción.
          </p>
        </div>

        <button
          onClick={() => {
            onCompleteModule();
            confetti({ particleCount: 70, spread: 80 });
          }}
          disabled={!canCompleteOverallModule || isCompleted}
          className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
            isCompleted
              ? 'bg-[#39A900]/15 text-[#39A900] border border-[#39A900]/30 cursor-default'
              : canCompleteOverallModule
              ? 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-md shadow-[#39A900]/25 animate-pulse'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>{isCompleted ? 'Evaluaciones Aprobadas' : 'Certificar Módulo (Min. 70%)'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('identity')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'identity'
              ? 'border-[#39A900] text-[#00324D] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4 text-[#39A900]" />
          <span>Test: Identidad & Símbolos</span>
          {identityScore > 0 && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold font-mono ${
              identityScore >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {identityScore}%
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('regulations')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'regulations'
              ? 'border-[#39A900] text-[#00324D] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#00324D]" />
          <span>Test: Reglamento del Aprendiz</span>
          {regulationsScore > 0 && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold font-mono ${
              regulationsScore >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {regulationsScore}%
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('match')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'match'
              ? 'border-[#39A900] text-[#00324D] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-[#FF6C0C]" />
          <span>Minijuego: Emparejamiento Rápido</span>
          {matchedPairs.length === MATCHING_PAIRS.length && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              ✓ Ganado
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('roulette')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'roulette'
              ? 'border-[#39A900] text-[#00324D] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Dices className="w-4 h-4 text-purple-600" />
          <span>Ruleta Aleatoria de Preguntas</span>
        </button>
      </div>

      {/* TAB 1: CUESTIONARIO IDENTIDAD */}
      {activeTab === 'identity' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {!showIdentityReview ? (
            <div>
              {/* Question header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold bg-[#39A900]/15 text-[#39A900] px-3 py-1 rounded-md">
                  Pregunta {identityIndex + 1} de {IDENTITY_QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400">
                  Respondidas: {Object.keys(identityAnswers).length} / {IDENTITY_QUIZ_QUESTIONS.length}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-6">
                {currentIdentityQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentIdentityQ.options.map((option, idx) => {
                  const isSelected = identityAnswers[currentIdentityQ.id] === idx;
                  const hasAnswered = identityAnswers[currentIdentityQ.id] !== undefined;

                  return (
                    <div
                      key={idx}
                      onClick={() => handleAnswerIdentity(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? idx === currentIdentityQ.correctAnswer
                            ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
                            : 'bg-rose-50 border-rose-300 ring-2 ring-rose-200'
                          : hasAnswered && idx === currentIdentityQ.correctAnswer
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-slate-800">
                          {option}
                        </span>
                        {hasAnswered && (
                          <span>
                            {idx === currentIdentityQ.correctAnswer ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : isSelected ? (
                              <XCircle className="w-4 h-4 text-rose-500" />
                            ) : null}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation if answered */}
              {identityAnswers[currentIdentityQ.id] !== undefined && (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl mb-6 text-xs text-slate-600">
                  <span className="font-bold text-[#00324D]">Explicación: </span>
                  {currentIdentityQ.explanation}
                </div>
              )}

              {/* Stepper buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIdentityIndex((prev) => Math.max(0, prev - 1))}
                  disabled={identityIndex === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                >
                  ← Anterior
                </button>

                {identityIndex < IDENTITY_QUIZ_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setIdentityIndex((prev) => prev + 1)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishIdentityQuiz}
                    disabled={Object.keys(identityAnswers).length < IDENTITY_QUIZ_QUESTIONS.length}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs shadow-md shadow-[#39A900]/25 disabled:opacity-50 cursor-pointer"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Calificar Cuestionario</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Review Screen */
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-emerald-100 text-emerald-700">
                <Trophy className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1">
                Puntaje Obtenido: {identityScore}%
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {identityScore >= 70
                  ? '¡Excelente! Has demostrado un conocimiento sólido de los símbolos y la historia del SENA.'
                  : 'No alcanzaste el mínimo aprobatorio del 70%. Repasa el Módulo 1 y reintenta el cuestionario.'}
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowIdentityReview(false);
                    setIdentityIndex(0);
                    setIdentityAnswers({});
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repetir Cuestionario</span>
                </button>
                <button
                  onClick={() => setActiveTab('regulations')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#39A900] hover:bg-[#2e8800] text-white cursor-pointer"
                >
                  <span>Continuar con Test de Reglamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CUESTIONARIO REGLAMENTO */}
      {activeTab === 'regulations' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {!showRegReview ? (
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold bg-[#00324D] text-white px-3 py-1 rounded-md">
                  Pregunta {regIndex + 1} de {REGULATIONS_QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400">
                  Respondidas: {Object.keys(regAnswers).length} / {REGULATIONS_QUIZ_QUESTIONS.length}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-6">
                {currentRegQ.question}
              </h3>

              <div className="space-y-3 mb-6">
                {currentRegQ.options.map((option, idx) => {
                  const isSelected = regAnswers[currentRegQ.id] === idx;
                  const hasAnswered = regAnswers[currentRegQ.id] !== undefined;

                  return (
                    <div
                      key={idx}
                      onClick={() => handleAnswerReg(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? idx === currentRegQ.correctAnswer
                            ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
                            : 'bg-rose-50 border-rose-300 ring-2 ring-rose-200'
                          : hasAnswered && idx === currentRegQ.correctAnswer
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-slate-800">
                          {option}
                        </span>
                        {hasAnswered && (
                          <span>
                            {idx === currentRegQ.correctAnswer ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : isSelected ? (
                              <XCircle className="w-4 h-4 text-rose-500" />
                            ) : null}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {regAnswers[currentRegQ.id] !== undefined && (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl mb-6 text-xs text-slate-600">
                  <span className="font-bold text-[#00324D]">
                    {currentRegQ.normativeReference ? `[${currentRegQ.normativeReference}] ` : ''}
                    Fundamento Jurídico:
                  </span>{' '}
                  {currentRegQ.explanation}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setRegIndex((prev) => Math.max(0, prev - 1))}
                  disabled={regIndex === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                >
                  ← Anterior
                </button>

                {regIndex < REGULATIONS_QUIZ_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setRegIndex((prev) => prev + 1)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishRegQuiz}
                    disabled={Object.keys(regAnswers).length < REGULATIONS_QUIZ_QUESTIONS.length}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs shadow-md shadow-[#39A900]/25 disabled:opacity-50 cursor-pointer"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Calificar Cuestionario</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-emerald-100 text-emerald-700">
                <Trophy className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1">
                Puntaje de Reglamento: {regulationsScore}%
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {regulationsScore >= 70
                  ? '¡Felicitaciones! Conoces con precisión las normas, derechos y deberes del aprendiz SENA.'
                  : 'Puntaje insuficiente. Vuelve al Módulo 2 para reforzar artículos clave como justificación de inasistencias y aplazamiento.'}
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowRegReview(false);
                    setRegIndex(0);
                    setRegAnswers({});
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reintentar Cuestionario</span>
                </button>
                <button
                  onClick={() => setActiveTab('match')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#39A900] hover:bg-[#2e8800] text-white cursor-pointer"
                >
                  <span>Probar Minijuego de Parejas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MINIJUEGO DE EMPAREJAMIENTO RÁPIDO */}
      {activeTab === 'match' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Emparejamiento Rápido de Conceptos y Normas
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Selecciona un concepto de la columna izquierda y luego su definición correspondiente a la derecha.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold font-mono">
              <span className="bg-slate-100 px-3 py-1 rounded-md text-slate-700">
                Parejas: {matchedPairs.length} / {MATCHING_PAIRS.length}
              </span>
              <span className="bg-slate-100 px-3 py-1 rounded-md text-slate-700">
                Intentos: {matchAttempts}
              </span>
            </div>
          </div>

          {matchedPairs.length === MATCHING_PAIRS.length ? (
            <div className="text-center py-10 bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
              <Sparkles className="w-12 h-12 text-[#39A900] mx-auto mb-3" />
              <h4 className="text-xl font-black text-emerald-900">
                ¡Emparejamiento 100% Completado!
              </h4>
              <p className="text-xs text-emerald-700 mt-1 mb-4">
                Has conectado con éxito todos los símbolos y artículos del SENA.
              </p>
              <button
                onClick={() => {
                  setMatchedPairs([]);
                  setMatchAttempts(0);
                  setSelectedConcept(null);
                  setSelectedMatch(null);
                }}
                className="px-5 py-2 bg-[#39A900] text-white font-bold text-xs rounded-xl hover:bg-[#2e8800] cursor-pointer"
              >
                Jugar de Nuevo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Concepts */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Conceptos / Símbolos / Artículos:
                </h4>
                {MATCHING_PAIRS.map((pair) => {
                  const isMatched = matchedPairs.includes(pair.id);
                  const isSelected = selectedConcept === pair.id;

                  return (
                    <button
                      key={pair.id}
                      onClick={() => handlePickConcept(pair.id)}
                      disabled={isMatched}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                          : isSelected
                          ? 'bg-blue-50 border-[#00324D] ring-2 ring-[#00324D]/20 text-[#00324D]'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <span>{pair.concept}</span>
                      {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Right: Matches (in a randomized/different order) */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Significados / Consecuencias:
                </h4>
                {[...MATCHING_PAIRS]
                  .sort((a, b) => (a.id > b.id ? -1 : 1))
                  .map((pair) => {
                    const isMatched = matchedPairs.includes(pair.id);
                    const isSelected = selectedMatch === pair.id;

                    return (
                      <button
                        key={pair.id}
                        onClick={() => handlePickMatch(pair.id)}
                        disabled={isMatched}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                            : isSelected
                            ? 'bg-amber-50 border-[#FF6C0C] ring-2 ring-[#FF6C0C]/20 text-slate-900'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <span>{pair.match}</span>
                        {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: RULETA ALEATORIA DE PREGUNTAS */}
      {activeTab === 'roulette' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center">
          <div className="max-w-xl mx-auto">
            <Dices className="w-12 h-12 text-[#39A900] mx-auto mb-3" />
            <h3 className="text-xl font-black text-slate-900">
              Ruleta de Repaso Relámpago
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Pon a prueba tus reflejos. Gira la ruleta y responde una pregunta aleatoria de cualquier módulo.
            </p>

            <button
              onClick={handleSpinRoulette}
              disabled={isSpinning}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                isSpinning
                  ? 'bg-slate-300 text-slate-600 cursor-not-allowed animate-pulse'
                  : 'bg-[#FF6C0C] hover:bg-orange-600 text-white shadow-orange-500/25'
              }`}
            >
              {isSpinning ? '¡Girando Ruleta...!' : 'Girar Ruleta Normativa'}
            </button>

            {rouletteQuestion && (
              <div className="mt-8 text-left bg-slate-50 rounded-2xl border border-slate-200 p-6">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#00324D] text-white">
                  Pregunta Aleatoria
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 mt-2 mb-4">
                  {rouletteQuestion.question}
                </h4>

                <div className="space-y-2 mb-4">
                  {rouletteQuestion.options.map((opt, idx) => {
                    const isSelected = rouletteAnswer === idx;
                    const isCorrect = idx === rouletteQuestion.correctAnswer;
                    const hasAnswered = rouletteAnswer !== null;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setRouletteAnswer(idx);
                          if (idx === rouletteQuestion.correctAnswer) {
                            soundManager.playSuccessSound();
                          } else {
                            soundManager.playErrorSound();
                          }
                        }}
                        disabled={hasAnswered}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition cursor-pointer ${
                          hasAnswered
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold'
                              : isSelected
                              ? 'bg-rose-100 border-rose-400 text-rose-900'
                              : 'bg-white border-slate-200 opacity-60'
                            : 'bg-white border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {rouletteAnswer !== null && (
                  <div className="text-xs bg-white p-3 rounded-lg border border-slate-200 text-slate-600">
                    <strong>Explicación:</strong> {rouletteQuestion.explanation}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
