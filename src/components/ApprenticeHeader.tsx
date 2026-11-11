import React from 'react';
import { ApprenticeProfile, Badge, ModuleProgress } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import { 
  Award, 
  BookOpen, 
  Compass, 
  CheckCircle2, 
  Edit3, 
  FileText, 
  HelpCircle, 
  Scale, 
  ShieldCheck, 
  Sparkles,
  Music
} from 'lucide-react';

interface ApprenticeHeaderProps {
  profile: ApprenticeProfile;
  badges: Badge[];
  progress: ModuleProgress;
  overallProgress: number;
  onEditProfile: () => void;
  onOpenCertificate: () => void;
  isCertificateEligible: boolean;
}

export const ApprenticeHeader: React.FC<ApprenticeHeaderProps> = ({
  profile,
  badges,
  progress,
  overallProgress,
  onEditProfile,
  onOpenCertificate,
  isCertificateEligible,
}) => {
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-4 h-4" />;
      case 'Shield':
        return <ShieldCheck className="w-4 h-4" />;
      case 'Music':
        return <Music className="w-4 h-4" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" />;
      case 'Scale':
        return <Scale className="w-4 h-4" />;
      case 'Award':
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#00263a] to-[#00324D] text-white rounded-2xl shadow-lg border border-slate-700/60 p-5 sm:p-6 mb-8 overflow-hidden relative">
      {/* Decorative background watermark */}
      <div className="absolute right-0 -bottom-10 opacity-5 pointer-events-none w-72 h-72 flex items-center justify-center text-white">
        <SenaLogo variant="logo" className="w-72 h-72" color="#FFFFFF" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        {/* Left: Apprentice Identity Details */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#39A900] to-emerald-400 p-0.5 shadow-md flex items-center justify-center text-slate-900 font-bold text-2xl">
              <div className="w-full h-full bg-[#00324D] rounded-[14px] flex items-center justify-center text-white">
                {profile.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('') || 'AP'}
              </div>
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#39A900] rounded-full border-2 border-[#00324D] flex items-center justify-center text-[10px]"
              title="Aprendiz Activo en Inducción"
            >
              ✓
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {profile.fullName}
              </h1>
              <button
                onClick={onEditProfile}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition cursor-pointer"
                title="Editar información del aprendiz"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-300 mt-1">
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[#96e072] font-semibold">
                Ficha: {profile.ficha}
              </span>
              <span>•</span>
              <span className="font-medium text-slate-200">{profile.programName}</span>
              <span>•</span>
              <span className="text-slate-400">
                {profile.documentType} {profile.documentNumber}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap gap-x-3">
              <span>{profile.trainingCenter}</span>
              <span>-</span>
              <span className="text-slate-300 font-medium">Regional {profile.regional}</span>
            </div>
          </div>
        </div>

        {/* Right: Actions, Overall Progress, Badges */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
          {/* Progress gauge card */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[210px]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
                Avance General
              </span>
              <span className="text-sm font-bold font-mono text-[#96e072]">
                {overallProgress}%
              </span>
            </div>
            <div className="w-full bg-slate-700/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-400 to-[#39A900] h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
              <span>{overallProgress === 100 ? '¡Inducción Finalizada!' : 'En progreso formativo'}</span>
              <span>{unlockedBadgesCount} / {badges.length} insignias</span>
            </div>
          </div>

          {/* Certificate action button */}
          <div className="flex flex-col gap-1.5">
            <button
              onClick={onOpenCertificate}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs transition cursor-pointer ${
                isCertificateEligible
                  ? 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-lg shadow-[#39A900]/30 animate-bounce'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>{isCertificateEligible ? 'Descargar Constancia SENA' : 'Revisar Requisitos Constancia'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Module Milestone Micro-indicators */}
      <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
          <Compass className={`w-4 h-4 shrink-0 ${progress.identity.completed ? 'text-[#39A900]' : 'text-slate-400'}`} />
          <div className="truncate">
            <p className="font-semibold text-slate-200 truncate">1. Identidad SENA</p>
            <p className="text-[10px] text-slate-400">
              {progress.identity.completed ? 'Completado' : 'Pendiente'}
            </p>
          </div>
          {progress.identity.completed && <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] ml-auto shrink-0" />}
        </div>

        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
          <BookOpen className={`w-4 h-4 shrink-0 ${progress.regulations.completed ? 'text-[#39A900]' : 'text-slate-400'}`} />
          <div className="truncate">
            <p className="font-semibold text-slate-200 truncate">2. Reglamento</p>
            <p className="text-[10px] text-slate-400">
              {progress.regulations.completed ? 'Completado' : 'Pendiente'}
            </p>
          </div>
          {progress.regulations.completed && <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] ml-auto shrink-0" />}
        </div>

        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
          <Scale className={`w-4 h-4 shrink-0 ${progress.simulator.completed ? 'text-[#39A900]' : 'text-slate-400'}`} />
          <div className="truncate">
            <p className="font-semibold text-slate-200 truncate">3. Casos Reales</p>
            <p className="text-[10px] text-slate-400">
              {Object.keys(progress.simulator.resolvedCases).length} / 5 resueltos
            </p>
          </div>
          {progress.simulator.completed && <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] ml-auto shrink-0" />}
        </div>

        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
          <HelpCircle className={`w-4 h-4 shrink-0 ${progress.quizzes.completed ? 'text-[#39A900]' : 'text-slate-400'}`} />
          <div className="truncate">
            <p className="font-semibold text-slate-200 truncate">4. Cuestionarios</p>
            <p className="text-[10px] text-slate-400">
              {progress.quizzes.completed ? 'Aprobados' : 'Por evaluar'}
            </p>
          </div>
          {progress.quizzes.completed && <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] ml-auto shrink-0" />}
        </div>
      </div>

      {/* Badges strip */}
      <div className="mt-4 pt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mr-1 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          Insignias Obtenidas:
        </span>
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
              badge.unlocked
                ? 'bg-amber-400/15 border-amber-400/40 text-amber-300 shadow-xs'
                : 'bg-white/5 border-white/5 text-slate-500 opacity-60'
            }`}
            title={`${badge.title}: ${badge.description}`}
          >
            {renderBadgeIcon(badge.icon)}
            <span className="text-[11px]">{badge.title}</span>
            {badge.unlocked && <span className="text-[10px] text-amber-400 font-bold">★</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
