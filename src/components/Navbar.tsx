import React from 'react';
import { SenaLogo } from './SenaLogo';
import { ModuleId } from '../types/induction';
import { 
  Compass, 
  BookOpen, 
  Scale, 
  HelpCircle, 
  Award, 
  UserCheck, 
  Users, 
  GraduationCap,
  Home,
  Video
} from 'lucide-react';

interface NavbarProps {
  currentModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  isInstructorMode: boolean;
  onToggleInstructorMode: () => void;
  onGoToLanding: () => void;
  overallProgress: number;
  onOpenCertificate: () => void;
  onOpenProfile: () => void;
  onOpenVideoManual: () => void;
  isCertificateEligible: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentModule,
  onSelectModule,
  isInstructorMode,
  onToggleInstructorMode,
  onGoToLanding,
  overallProgress,
  onOpenCertificate,
  onOpenProfile,
  onOpenVideoManual,
  isCertificateEligible,
}) => {
  const navItems: { id: ModuleId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'identity', label: '1. Imagen & Identidad', icon: Compass },
    { id: 'regulations', label: '2. Reglamento del Aprendiz', icon: BookOpen },
    { id: 'simulator', label: '3. Simulador de Casos', icon: Scale },
    { id: 'quizzes', label: '4. Cuestionarios & Desafíos', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Top micro bar with Colombia & SENA motto */}
      <div className="bg-[#00324D] text-white text-xs py-1 px-4 flex justify-between items-center tracking-wide">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#39A900] animate-pulse"></span>
          <span className="font-medium text-slate-200 hidden sm:inline">Servicio Nacional de Aprendizaje - SENA</span>
          <span className="text-slate-400">|</span>
          <span className="text-[#96e072] font-semibold">Proceso de Inducción Formativa 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenVideoManual}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#39A900] hover:bg-[#2e8800] text-white shadow-xs transition cursor-pointer"
            title="Ver Video Manual interactivo de la plataforma"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Manual</span>
          </button>

          <button
            onClick={onGoToLanding}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-slate-200 transition cursor-pointer"
            title="Volver a la pantalla de Selección de Rol"
          >
            <Home className="w-3.5 h-3.5 text-[#96e072]" />
            <span>Inicio / Roles</span>
          </button>

          <button
            onClick={onToggleInstructorMode}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              isInstructorMode
                ? 'bg-[#FF6C0C] text-white shadow-xs'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            {isInstructorMode ? (
              <>
                <Users className="w-3.5 h-3.5" />
                <span>Vista Instructor Encargado</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Cambiar a Vista Instructor</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isInstructorMode) onToggleInstructorMode();
                onSelectModule('identity');
              }}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <SenaLogo variant="logo" className="w-10 h-10 transition-transform group-hover:scale-105" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-[#00324D] font-mono">
                    SENA
                  </span>
                  <span className="text-xs bg-[#39A900]/15 text-[#39A900] font-bold px-1.5 py-0.5 rounded">
                    INDUCCIÓN
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-none">
                  Normativa & Cultura Institucional
                </p>
              </div>
            </button>
          </div>

          {/* Module Nav Links (Desktop) */}
          {!isInstructorMode && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectModule(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#00324D] shadow-xs border border-slate-200/80 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#39A900]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {isInstructorMode && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-200 rounded-xl text-xs text-[#00324D] font-bold">
              <Users className="w-4 h-4 text-sky-600" />
              <span>Panel de Control & Consolidado del Instructor</span>
            </div>
          )}

          {/* Right Action: Progress Pill & Certificate Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Progress indicator */}
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <span>Progreso:</span>
                <span className="text-[#39A900] font-extrabold font-mono">{overallProgress}%</span>
              </div>
              <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-[#39A900] transition-all duration-500 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            {/* Certificate CTA */}
            <button
              onClick={onOpenCertificate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isCertificateEligible
                  ? 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-md shadow-[#39A900]/25 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
              title={
                isCertificateEligible
                  ? '¡Felicidades! Tu certificado de inducción está listo para descargar.'
                  : `Completa los módulos y cuestionarios para desbloquear tu certificado (${overallProgress}% / 100%).`
              }
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">
                {isCertificateEligible ? 'Ver Constancia' : 'Certificado'}
              </span>
            </button>

            {/* Profile trigger */}
            <button
              onClick={onOpenProfile}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="Configurar datos del Aprendiz (Ficha, Programa, Centro)"
            >
              <GraduationCap className="w-5 h-5 text-[#00324D]" />
            </button>
          </div>
        </div>

        {/* Mobile Module Subnav */}
        {!isInstructorMode && (
          <div className="md:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 text-xs no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                    isActive
                      ? 'bg-[#39A900] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
