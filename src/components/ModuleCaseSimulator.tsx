import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/senaData';
import { CaseStudy } from '../types/induction';
import { soundManager } from '../utils/soundEffects';
import { 
  Scale, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  Sparkles,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ModuleCaseSimulatorProps {
  resolvedCases: { [caseId: string]: boolean };
  onResolveCase: (caseId: string, isCorrect: boolean) => void;
  onCompleteModule: () => void;
  isCompleted: boolean;
}

export const ModuleCaseSimulator: React.FC<ModuleCaseSimulatorProps> = ({
  resolvedCases,
  onResolveCase,
  onCompleteModule,
  isCompleted,
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const activeCase: CaseStudy = CASE_STUDIES[currentCaseIndex];
  const isCaseAlreadyResolved = !!resolvedCases[activeCase.id];

  const handleSelectOption = (optionId: string) => {
    if (hasEvaluated) return;
    setSelectedOptionId(optionId);
  };

  const handleEvaluate = () => {
    if (!selectedOptionId) return;
    const chosenOption = activeCase.options.find((o) => o.id === selectedOptionId);
    if (!chosenOption) return;

    setHasEvaluated(true);
    const isCorrect = chosenOption.isCorrect;

    if (isCorrect) {
      soundManager.playSuccessSound();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    } else {
      soundManager.playErrorSound();
    }

    onResolveCase(activeCase.id, isCorrect);
  };

  const handleNextCase = () => {
    setSelectedOptionId(null);
    setHasEvaluated(false);
    if (currentCaseIndex < CASE_STUDIES.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
    }
  };

  const handleResetCurrentCase = () => {
    setSelectedOptionId(null);
    setHasEvaluated(false);
  };

  const totalResolved = Object.keys(resolvedCases).length;
  const allResolvedCorrectly = CASE_STUDIES.every((c) => resolvedCases[c.id] === true);

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Módulo 3 de Inducción</span>
          </div>
          <h2 className="text-2xl font-black text-[#00324D] tracking-tight">
            Simulador de Casos Prácticos & Toma de Decisiones
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Enfrenta situaciones reales que viven los aprendices en su día a día. Evalúa dilemas normativos,
            identifica la falta según el Reglamento y aplica las medidas formativas y el debido proceso.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 font-mono">
            Casos: {totalResolved} / {CASE_STUDIES.length}
          </div>
          <button
            onClick={() => {
              onCompleteModule();
              confetti({ particleCount: 60, spread: 75 });
            }}
            disabled={!allResolvedCorrectly || isCompleted}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              isCompleted
                ? 'bg-[#39A900]/15 text-[#39A900] border border-[#39A900]/30 cursor-default'
                : allResolvedCorrectly
                ? 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-md shadow-[#39A900]/25 animate-pulse'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{isCompleted ? 'Casos Aprobados' : 'Finalizar Módulo'}</span>
          </button>
        </div>
      </div>

      {/* Case Navigator Stepper */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {CASE_STUDIES.map((c, idx) => {
          const isResolved = resolvedCases[c.id];
          const isCurrent = idx === currentCaseIndex;

          return (
            <button
              key={c.id}
              onClick={() => {
                setCurrentCaseIndex(idx);
                setSelectedOptionId(null);
                setHasEvaluated(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isCurrent
                  ? 'bg-[#00324D] text-white shadow-xs ring-2 ring-[#00324D]/30'
                  : isResolved
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Caso {idx + 1}</span>
              {isResolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* Active Case Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#00324D] text-white px-2.5 py-1 rounded-md">
              CASO {currentCaseIndex + 1} de {CASE_STUDIES.length}
            </span>
            <span className="text-xs font-bold text-[#FF6C0C] bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-md">
              Ámbito: {activeCase.category}
            </span>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Acuerdo 0007 de 2012
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-3">
          {activeCase.title}
        </h3>

        {/* Situation box */}
        <div className="bg-slate-50 border-l-4 border-[#39A900] p-4 rounded-r-xl mb-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900 mb-1">Hechos Ocurridos:</p>
          <p>{activeCase.situation}</p>
          <p className="mt-2 text-slate-500 italic text-xs">
            Contexto: {activeCase.context}
          </p>
        </div>

        {/* Question prompt */}
        <div className="mb-5">
          <h4 className="text-sm font-extrabold text-[#00324D] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#39A900]" />
            <span>{activeCase.question}</span>
          </h4>
        </div>

        {/* Interactive Options */}
        <div className="space-y-3 mb-6">
          {activeCase.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const showOutcome = hasEvaluated;
            const isCorrect = option.isCorrect;

            let cardStyles = 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50';

            if (isSelected && !showOutcome) {
              cardStyles = 'bg-emerald-50/30 border-[#39A900] shadow-xs ring-2 ring-[#39A900]/20';
            }

            if (showOutcome) {
              if (isCorrect) {
                cardStyles = 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300';
              } else if (isSelected && !isCorrect) {
                cardStyles = 'bg-rose-50 border-rose-300 ring-2 ring-rose-200';
              } else {
                cardStyles = 'opacity-60 bg-slate-50 border-slate-200';
              }
            }

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${cardStyles}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {showOutcome ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300" />
                      )
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#39A900] bg-[#39A900]' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      {option.text}
                    </p>

                    {showOutcome && isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 text-xs">
                        <p className={`font-semibold ${isCorrect ? 'text-emerald-800' : 'text-rose-700'}`}>
                          {option.feedback}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Acción consecuente: {option.actionTaken}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory Citation Box (Visible after answering) */}
        {hasEvaluated && (
          <div className="bg-[#00324D]/5 border border-[#00324D]/20 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00324D] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-[#39A900]" />
              <span>Sustento Legal en el Reglamento del Aprendiz:</span>
            </div>
            <p className="font-bold text-xs text-[#00324D]">{activeCase.normativeArticle}</p>
            <p className="text-xs text-slate-600 italic mt-1 font-serif">
              "{activeCase.legalQuote}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {!hasEvaluated ? (
              <button
                onClick={handleEvaluate}
                disabled={!selectedOptionId}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  selectedOptionId
                    ? 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-md shadow-[#39A900]/25'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Evaluar Respuesta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleResetCurrentCase}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reintentar Caso</span>
              </button>
            )}
          </div>

          {currentCaseIndex < CASE_STUDIES.length - 1 && (
            <button
              onClick={handleNextCase}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
            >
              <span>Siguiente Caso ({currentCaseIndex + 2} de {CASE_STUDIES.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
