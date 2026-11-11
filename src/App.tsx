/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ApprenticeHeader } from './components/ApprenticeHeader';
import { ModuleIdentity } from './components/ModuleIdentity';
import { ModuleRegulations } from './components/ModuleRegulations';
import { ModuleCaseSimulator } from './components/ModuleCaseSimulator';
import { ModuleQuizzes } from './components/ModuleQuizzes';
import { CertificateModal } from './components/CertificateModal';
import { EditProfileModal } from './components/EditProfileModal';
import { VideoManualModal } from './components/VideoManualModal';
import { InstructorView } from './components/InstructorView';
import { RoleSelectionLanding } from './components/RoleSelectionLanding';
import { ApprenticeProfile, Badge, ModuleId, ModuleProgress } from './types/induction';
import { INITIAL_BADGES, CASE_STUDIES } from './data/senaData';
import { soundManager } from './utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';

const DEFAULT_PROFILE: ApprenticeProfile = {
  id: 'sena-user-1',
  fullName: 'Alejandro Morales Restrepo',
  documentType: 'CC',
  documentNumber: '1020485923',
  email: 'aprendizsenaant@gmail.com',
  ficha: '2894512',
  programName: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  regional: 'Antioquia',
  trainingCenter: 'Centro de Servicios y Gestión Empresarial',
  startedAt: '2026-11-01',
  avatarSeed: 'AM',
};

const DEFAULT_PROGRESS: ModuleProgress = {
  identity: {
    visitedSymbols: ['logo-simbolo'],
    listenedAnthem: false,
    exploredHistory: false,
    completed: false,
  },
  regulations: {
    reviewedRights: false,
    reviewedDuties: false,
    reviewedProhibitions: false,
    reviewedSanctions: false,
    reviewedProcedures: false,
    completed: false,
  },
  simulator: {
    resolvedCases: {},
    score: 0,
    completed: false,
  },
  quizzes: {
    identityQuizScore: 0,
    regulationsQuizScore: 0,
    matchGameCompleted: false,
    completed: false,
  },
};

export default function App() {
  // Navigation view mode: 'landing' | 'apprentice' | 'instructor'
  const [viewMode, setViewMode] = useState<'landing' | 'apprentice' | 'instructor'>('landing');

  // Profile and Progress states
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_apprentice_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [progress, setProgress] = useState<ModuleProgress>(() => {
    try {
      const saved = localStorage.getItem('sena_module_progress');
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('sena_badges');
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  const [currentModule, setCurrentModule] = useState<ModuleId>('identity');
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isVideoManualOpen, setIsVideoManualOpen] = useState<boolean>(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_module_progress', JSON.stringify(progress));
    } catch {}
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_badges', JSON.stringify(badges));
    } catch {}
  }, [badges]);

  // Calculate Overall Progress (0 to 100%)
  const calculateOverallProgress = (): number => {
    let score = 0;

    // Module 1: Identity (25%)
    let idSubscore = 0;
    if (progress.identity.visitedSymbols.length >= 3) idSubscore += 10;
    else idSubscore += progress.identity.visitedSymbols.length * 3;
    if (progress.identity.listenedAnthem) idSubscore += 8;
    if (progress.identity.exploredHistory) idSubscore += 7;
    if (progress.identity.completed) idSubscore = 25;
    score += Math.min(25, idSubscore);

    // Module 2: Regulations (25%)
    let regSubscore = 0;
    if (progress.regulations.reviewedRights) regSubscore += 5;
    if (progress.regulations.reviewedDuties) regSubscore += 5;
    if (progress.regulations.reviewedProhibitions) regSubscore += 5;
    if (progress.regulations.reviewedSanctions) regSubscore += 5;
    if (progress.regulations.reviewedProcedures) regSubscore += 5;
    if (progress.regulations.completed) regSubscore = 25;
    score += Math.min(25, regSubscore);

    // Module 3: Simulator (25%)
    const resolvedCount = Object.keys(progress.simulator.resolvedCases).length;
    let simSubscore = Math.round((resolvedCount / CASE_STUDIES.length) * 25);
    if (progress.simulator.completed) simSubscore = 25;
    score += Math.min(25, simSubscore);

    // Module 4: Quizzes (25%)
    let quizSubscore = 0;
    if (progress.quizzes.identityQuizScore >= 70) quizSubscore += 10;
    if (progress.quizzes.regulationsQuizScore >= 70) quizSubscore += 10;
    if (progress.quizzes.matchGameCompleted) quizSubscore += 5;
    if (progress.quizzes.completed) quizSubscore = 25;
    score += Math.min(25, quizSubscore);

    return Math.min(100, score);
  };

  const overallProgress = calculateOverallProgress();
  const isCertificateEligible = overallProgress === 100;

  // Badge unlock evaluation
  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId && !b.unlocked) {
          soundManager.playSuccessSound();
          confetti({ particleCount: 30, spread: 50 });
          return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
        }
        return b;
      })
    );
  };

  // Module 1 Handlers
  const handleVisitSymbol = (symbolId: string) => {
    setProgress((prev) => {
      const visited = prev.identity.visitedSymbols.includes(symbolId)
        ? prev.identity.visitedSymbols
        : [...prev.identity.visitedSymbols, symbolId];
      if (visited.length >= 3) {
        unlockBadge('badge-symbols');
      }
      return {
        ...prev,
        identity: { ...prev.identity, visitedSymbols: visited },
      };
    });
  };

  const handleFinishAnthem = () => {
    setProgress((prev) => ({
      ...prev,
      identity: { ...prev.identity, listenedAnthem: true },
    }));
    unlockBadge('badge-anthem');
  };

  const handleExploreHistory = () => {
    setProgress((prev) => ({
      ...prev,
      identity: { ...prev.identity, exploredHistory: true },
    }));
    unlockBadge('badge-explorer');
  };

  const handleCompleteIdentityModule = () => {
    setProgress((prev) => ({
      ...prev,
      identity: { ...prev.identity, completed: true },
    }));
  };

  // Module 2 Handlers
  const handleMarkRegulationCategory = (category: string) => {
    setProgress((prev) => {
      const updated = { ...prev.regulations };
      if (category === 'derechos') updated.reviewedRights = true;
      if (category === 'deberes') updated.reviewedDuties = true;
      if (category === 'prohibiciones') updated.reviewedProhibitions = true;
      if (category === 'sanciones') updated.reviewedSanctions = true;
      if (category === 'tramites' || category === 'medidas') updated.reviewedProcedures = true;

      if (
        updated.reviewedRights &&
        updated.reviewedDuties &&
        updated.reviewedProhibitions &&
        updated.reviewedSanctions
      ) {
        unlockBadge('badge-regulations');
      }

      return { ...prev, regulations: updated };
    });
  };

  const handleCompleteRegulationsModule = () => {
    setProgress((prev) => ({
      ...prev,
      regulations: {
        ...prev.regulations,
        reviewedRights: true,
        reviewedDuties: true,
        reviewedProhibitions: true,
        reviewedSanctions: true,
        reviewedProcedures: true,
        completed: true,
      },
    }));
    unlockBadge('badge-regulations');
  };

  // Module 3 Handlers
  const handleResolveCase = (caseId: string, isCorrect: boolean) => {
    setProgress((prev) => {
      const updatedResolved = { ...prev.simulator.resolvedCases, [caseId]: isCorrect };
      const allPassed = CASE_STUDIES.every((c) => updatedResolved[c.id] === true);
      if (allPassed) {
        unlockBadge('badge-ethics');
      }
      return {
        ...prev,
        simulator: {
          ...prev.simulator,
          resolvedCases: updatedResolved,
          completed: allPassed,
        },
      };
    });
  };

  const handleCompleteSimulatorModule = () => {
    setProgress((prev) => ({
      ...prev,
      simulator: { ...prev.simulator, completed: true },
    }));
    unlockBadge('badge-ethics');
  };

  // Module 4 Handlers
  const handleUpdateIdentityScore = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizzes: { ...prev.quizzes, identityQuizScore: score },
    }));
  };

  const handleUpdateRegulationsScore = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizzes: { ...prev.quizzes, regulationsQuizScore: score },
    }));
  };

  const handleCompleteMatchGame = () => {
    setProgress((prev) => ({
      ...prev,
      quizzes: { ...prev.quizzes, matchGameCompleted: true },
    }));
  };

  const handleCompleteQuizzesModule = () => {
    setProgress((prev) => ({
      ...prev,
      quizzes: { ...prev.quizzes, completed: true },
    }));
    unlockBadge('badge-expert');
  };

  // Trigger celebration if reaching 100%
  useEffect(() => {
    if (overallProgress === 100) {
      unlockBadge('badge-expert');
    }
  }, [overallProgress]);

  // Handle Role Selection from Landing Page
  const handleSelectRole = (role: 'aprendiz' | 'instructor') => {
    if (role === 'aprendiz') {
      setViewMode('apprentice');
    } else {
      setViewMode('instructor');
    }
  };

  // If currently in landing view, render Role Selection Landing Page
  if (viewMode === 'landing') {
    return (
      <>
        <RoleSelectionLanding
          profile={profile}
          onSaveProfile={(updated) => setProfile(updated)}
          onSelectRole={handleSelectRole}
          onOpenVideoManual={() => setIsVideoManualOpen(true)}
          overallProgress={overallProgress}
        />
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          profile={profile}
          onSaveProfile={(updated) => setProfile(updated)}
        />
        <VideoManualModal
          isOpen={isVideoManualOpen}
          onClose={() => setIsVideoManualOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        currentModule={currentModule}
        onSelectModule={(mod) => setCurrentModule(mod)}
        isInstructorMode={viewMode === 'instructor'}
        onToggleInstructorMode={() =>
          setViewMode(viewMode === 'instructor' ? 'apprentice' : 'instructor')
        }
        onGoToLanding={() => setViewMode('landing')}
        overallProgress={overallProgress}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenProfile={() => setIsEditProfileOpen(true)}
        onOpenVideoManual={() => setIsVideoManualOpen(true)}
        isCertificateEligible={isCertificateEligible}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If in Instructor Mode, show Cohort Tracking Dashboard */}
        {viewMode === 'instructor' ? (
          <InstructorView
            currentProfile={profile}
            currentProgress={overallProgress}
            currentRegScore={progress.quizzes.regulationsQuizScore}
            currentIdentityScore={progress.quizzes.identityQuizScore}
          />
        ) : (
          /* Apprentice Induction View */
          <div>
            {/* Apprentice Profile & Progress Banner */}
            <ApprenticeHeader
              profile={profile}
              badges={badges}
              progress={progress}
              overallProgress={overallProgress}
              onEditProfile={() => setIsEditProfileOpen(true)}
              onOpenCertificate={() => setIsCertificateOpen(true)}
              isCertificateEligible={isCertificateEligible}
            />

            {/* Active Induction Module */}
            <div className="transition-all duration-300">
              {currentModule === 'identity' && (
                <ModuleIdentity
                  visitedSymbols={progress.identity.visitedSymbols}
                  listenedAnthem={progress.identity.listenedAnthem}
                  exploredHistory={progress.identity.exploredHistory}
                  onVisitSymbol={handleVisitSymbol}
                  onFinishAnthem={handleFinishAnthem}
                  onExploreHistory={handleExploreHistory}
                  onCompleteModule={handleCompleteIdentityModule}
                  isCompleted={progress.identity.completed}
                />
              )}

              {currentModule === 'regulations' && (
                <ModuleRegulations
                  onCompleteModule={handleCompleteRegulationsModule}
                  isCompleted={progress.regulations.completed}
                  reviewedRights={progress.regulations.reviewedRights}
                  reviewedDuties={progress.regulations.reviewedDuties}
                  reviewedProhibitions={progress.regulations.reviewedProhibitions}
                  reviewedSanctions={progress.regulations.reviewedSanctions}
                  reviewedProcedures={progress.regulations.reviewedProcedures}
                  onMarkCategoryRead={handleMarkRegulationCategory}
                />
              )}

              {currentModule === 'simulator' && (
                <ModuleCaseSimulator
                  resolvedCases={progress.simulator.resolvedCases}
                  onResolveCase={handleResolveCase}
                  onCompleteModule={handleCompleteSimulatorModule}
                  isCompleted={progress.simulator.completed}
                />
              )}

              {currentModule === 'quizzes' && (
                <ModuleQuizzes
                  identityScore={progress.quizzes.identityQuizScore}
                  regulationsScore={progress.quizzes.regulationsQuizScore}
                  matchGameCompleted={progress.quizzes.matchGameCompleted}
                  onUpdateIdentityScore={handleUpdateIdentityScore}
                  onUpdateRegulationsScore={handleUpdateRegulationsScore}
                  onCompleteMatchGame={handleCompleteMatchGame}
                  onCompleteModule={handleCompleteQuizzesModule}
                  isCompleted={progress.quizzes.completed}
                />
              )}
            </div>

            {/* Bottom Next Module Guide */}
            <div className="mt-10 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#39A900] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#00324D]">
                    {currentModule === 'identity'
                      ? 'Paso siguiente: Conoce tus Deberes y Derechos en el Reglamento'
                      : currentModule === 'regulations'
                      ? 'Paso siguiente: Pon a prueba tus decisiones en el Simulador de Casos'
                      : currentModule === 'simulator'
                      ? 'Paso siguiente: Evalúa tu conocimiento en los Cuestionarios'
                      : '¡Culmina con éxito y obtén tu Constancia de Inducción!'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Avance actual: {overallProgress}% de 100% requerido para la certificación.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {currentModule !== 'quizzes' ? (
                  <button
                    onClick={() => {
                      if (currentModule === 'identity') setCurrentModule('regulations');
                      else if (currentModule === 'regulations') setCurrentModule('simulator');
                      else if (currentModule === 'simulator') setCurrentModule('quizzes');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00324D] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    <span>Continuar al Siguiente Módulo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCertificateOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs rounded-xl shadow-md shadow-[#39A900]/25 cursor-pointer"
                  >
                    <span>Ver Estado de Certificación</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-[#00324D] text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-mono font-bold text-white tracking-wider text-sm">SENA</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <p>Servicio Nacional de Aprendizaje - Dirección de Formación Profesional Integral</p>
          </div>
          <div className="text-center sm:text-right text-[11px] text-slate-400">
            Reglamento del Aprendiz (Acuerdo 0007 de 2012) • República de Colombia
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        profile={profile}
        overallScore={overallProgress}
        isEligible={isCertificateEligible}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={profile}
        onSaveProfile={(updated) => setProfile(updated)}
      />

      <VideoManualModal
        isOpen={isVideoManualOpen}
        onClose={() => setIsVideoManualOpen(false)}
      />
    </div>
  );
}
