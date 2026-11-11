import React, { useState } from 'react';
import { SenaLogo } from './SenaLogo';
import { ApprenticeProfile } from '../types/induction';
import { 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Save, 
  UserCheck, 
  Edit3, 
  Info, 
  RotateCcw, 
  Lock, 
  KeyRound, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Sparkles,
  CheckCircle2,
  Video,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  X,
  Film,
  ChevronUp,
  ChevronDown,
  BookOpen,
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Compass,
  Scale,
  HelpCircle,
  FileText
} from 'lucide-react';

interface RoleSelectionLandingProps {
  profile: ApprenticeProfile;
  onSaveProfile: (updatedProfile: ApprenticeProfile) => void;
  onSelectRole: (role: 'aprendiz' | 'instructor') => void;
  onOpenVideoManual: () => void;
  overallProgress: number;
}

const EMPTY_PROFILE: ApprenticeProfile = {
  id: '',
  fullName: '',
  documentType: 'CC',
  documentNumber: '',
  email: '',
  ficha: '',
  programName: '',
  regional: '',
  trainingCenter: '',
  startedAt: new Date().toISOString().split('T')[0],
  avatarSeed: '',
};

const SAMPLE_PROFILE: ApprenticeProfile = {
  id: 'sena-sample-1',
  fullName: 'Laura Sofía Martínez López',
  documentType: 'CC',
  documentNumber: '1020485923',
  email: 'laura.martinez@misena.edu.co',
  ficha: '2894512',
  programName: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  regional: 'Antioquia',
  trainingCenter: 'Centro de Servicios y Gestión Empresarial',
  startedAt: '2026-11-01',
  avatarSeed: 'LM',
};

// Generic instructor credentials
const INSTRUCTOR_GENERIC_CREDENTIALS = {
  username: 'instructor@sena.edu.co',
  password: 'sena2026',
};

export const RoleSelectionLanding: React.FC<RoleSelectionLandingProps> = ({
  profile,
  onSaveProfile,
  onSelectRole,
  onOpenVideoManual,
  overallProgress,
}) => {
  // Floating video window on landing page state
  const [isFloatingWidgetVisible, setIsFloatingWidgetVisible] = useState<boolean>(true);
  const [isFloatingWidgetMinimized, setIsFloatingWidgetMinimized] = useState<boolean>(false);
  const [floatingTime, setFloatingTime] = useState<number>(0);
  const [floatingIsPlaying, setFloatingIsPlaying] = useState<boolean>(true);

  // Auto-play floating video widget timer
  React.useEffect(() => {
    let interval: any;
    if (isFloatingWidgetVisible && floatingIsPlaying) {
      interval = setInterval(() => {
        setFloatingTime((prev) => (prev >= 105 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFloatingWidgetVisible, floatingIsPlaying]);

  // Step in landing: 'register-apprentice' | 'login-instructor'
  const [landingStep, setLandingStep] = useState<'register-apprentice' | 'login-instructor'>('register-apprentice');

  // Form state for apprentice initialized clean
  const [formData, setFormData] = useState<ApprenticeProfile>(EMPTY_PROFILE);

  // Form state for instructor login
  const [instructorUsername, setInstructorUsername] = useState<string>('');
  const [instructorPassword, setInstructorPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handlePrefillSampleData = () => {
    setFormData(SAMPLE_PROFILE);
  };

  const handleSaveAndEnterApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    const profileToSave: ApprenticeProfile = {
      ...formData,
      id: formData.id || `sena-user-${Date.now()}`,
      avatarSeed: formData.fullName
        ? formData.fullName
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
        : 'AP',
    };
    onSaveProfile(profileToSave);
    onSelectRole('aprendiz');
  };

  const handleDirectEnterExistingApprentice = () => {
    onSelectRole('aprendiz');
  };

  const handleOpenInstructorLogin = () => {
    setInstructorUsername('');
    setInstructorPassword('');
    setLoginError(null);
    setLandingStep('login-instructor');
  };

  const handleFillDemoInstructorCredentials = () => {
    setInstructorUsername(INSTRUCTOR_GENERIC_CREDENTIALS.username);
    setInstructorPassword(INSTRUCTOR_GENERIC_CREDENTIALS.password);
    setLoginError(null);
  };

  const handleInstructorLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = instructorUsername.trim().toLowerCase();
    const cleanPass = instructorPassword.trim();

    if (
      (cleanUser === 'instructor@sena.edu.co' || cleanUser === 'instructor' || cleanUser === 'instructor.sena') &&
      (cleanPass === 'sena2026' || cleanPass === 'sena1957' || cleanPass === '123456')
    ) {
      setLoginError(null);
      onSelectRole('instructor');
    } else {
      setLoginError('Usuario o contraseña incorrectos. Utiliza las credenciales genéricas proporcionadas.');
    }
  };

  const hasSavedProfile = !!profile.fullName && !!profile.documentNumber;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden selection:bg-[#39A900] selection:text-white">
      {/* Background Watermark */}
      <div className="absolute right-[-10%] top-[-10%] opacity-5 pointer-events-none w-[600px] h-[600px] text-white">
        <SenaLogo variant="logo" className="w-full h-full" color="#FFFFFF" />
      </div>

      {/* Top Header */}
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SenaLogo variant="logo" className="w-12 h-12" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                  SENA
                </span>
                <span className="text-[10px] bg-[#39A900] text-slate-900 font-extrabold px-2 py-0.5 rounded tracking-wide">
                  PORTAL DE INDUCCIÓN 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Servicio Nacional de Aprendizaje • República de Colombia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenVideoManual}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-xl text-xs font-extrabold shadow-md shadow-[#39A900]/25 transition cursor-pointer animate-pulse"
              title="Ver el Video Manual guiado e interactivo de la plataforma"
            >
              <Video className="w-4 h-4 text-white" />
              <span>Ver Video Manual</span>
            </button>

            {landingStep === 'register-apprentice' ? (
              <button
                onClick={handleOpenInstructorLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00324D] hover:bg-sky-900 text-sky-300 rounded-xl text-xs font-semibold border border-sky-400/40 transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>Acceso Instructor Líder</span>
              </button>
            ) : (
              <button
                onClick={() => setLandingStep('register-apprentice')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#39A900]/20 hover:bg-[#39A900]/30 text-[#96e072] rounded-xl text-xs font-semibold border border-[#39A900]/40 transition cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Portal del Aprendiz</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 my-auto w-full">
        {landingStep === 'register-apprentice' ? (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            {/* DASHBOARD HERO KPI BAR */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-semibold">Módulos Formativos</span>
                  <BookOpen className="w-4 h-4 text-[#39A900]" />
                </div>
                <div className="text-2xl font-black text-white font-mono">4 / 4</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Identidad, Reglamento, Casos y Test</div>
              </div>

              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-semibold">Tu Avance Actual</span>
                  <TrendingUp className="w-4 h-4 text-[#96e072]" />
                </div>
                <div className="text-2xl font-black text-[#96e072] font-mono">{overallProgress}%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {overallProgress === 100 ? '¡Constancia desbloqueada!' : 'En proceso formativo'}
                </div>
              </div>

              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-semibold">Normativa Vigente</span>
                  <Scale className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl font-black text-sky-300 font-mono">Acuerdo 0007</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Actualizado con IA & SST 2026</div>
              </div>

              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-semibold">Certificado Oficial</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-300 font-mono">Digital QR</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Validación institucional SENA</div>
              </div>
            </div>

            {/* DASHBOARD 2-COLUMN LAYOUT: FORMULARIO + RESUMEN DE LA INDUCCIÓN */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* COLUMNA IZQUIERDA (7 cols): FORMULARIO DE REGISTRO E INGRESO */}
              <div className="lg:col-span-7 bg-slate-800 border-2 border-[#39A900] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                {/* Top Toolbar inside card */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#39A900] animate-pulse" />
                    <span className="text-xs font-bold text-[#96e072] uppercase tracking-wider">
                      Identificación del Aprendiz SENA
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrefillSampleData}
                    className="flex items-center gap-1.5 text-xs bg-slate-700/80 hover:bg-slate-700 text-[#96e072] px-3 py-1.5 rounded-lg border border-slate-600 font-semibold cursor-pointer"
                    title="Rellenar formulario con un perfil de ejemplo listo para probar"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Cargar Datos de Prueba</span>
                  </button>
                </div>

                {/* Saved Profile Quick Banner if exists */}
                {hasSavedProfile && (
                  <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Perfil Guardado Anteriormente:</span>
                      <p className="font-extrabold text-white text-sm">{profile.fullName}</p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {profile.documentType} {profile.documentNumber} • Ficha {profile.ficha}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDirectEnterExistingApprentice}
                      className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                    >
                      <span>Continuar con mi perfil</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#39A900]/20 border border-[#39A900]/40 flex items-center justify-center text-[#96e072] shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Diligencia tus Datos de Aprendiz
                    </h2>
                    <p className="text-xs text-slate-300">
                      Ingresa tu información para personalizar tu carné de avance y expedir tu <strong>Constancia Oficial de Inducción SENA</strong>.
                    </p>
                  </div>
                </div>

            <form onSubmit={handleSaveAndEnterApprentice} className="space-y-4 mt-6">
              {/* Full name */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Nombre Completo del Aprendiz *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ej: Laura Sofía Martínez López"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#39A900] focus:ring-1 focus:ring-[#39A900]"
                />
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#39A900] shrink-0" />
                  <span>Pista: Escribe tus dos nombres y dos apellidos tal como aparecen en tu cédula o tarjeta de identidad.</span>
                </p>
              </div>

              {/* Document type and number */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Tipo de Documento *
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        documentType: e.target.value as ApprenticeProfile['documentType'],
                      })
                    }
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#39A900]"
                  >
                    <option value="CC">C.C. (Cédula de Ciudadanía)</option>
                    <option value="TI">T.I. (Tarjeta de Identidad)</option>
                    <option value="CE">C.E. (Cédula de Extranjería)</option>
                    <option value="PEP">P.E.P. (Permiso Especial)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Número de Identificación *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    placeholder="Ej: 1020485923"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#39A900]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3 text-[#39A900] shrink-0" />
                    <span>Pista: Digita únicamente los números de tu documento sin puntos ni guiones.</span>
                  </p>
                </div>
              </div>

              {/* Ficha & Regional */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    No. de Ficha *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ficha}
                    onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                    placeholder="Ej: 2894512"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-bold text-[#96e072] placeholder-slate-500 focus:outline-none focus:border-[#39A900]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3 text-[#39A900] shrink-0" />
                    <span>Pista: El código de 7 u 8 dígitos de tu grupo en SofiaPlus/Zajuna.</span>
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Regional SENA *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.regional}
                    onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                    placeholder="Ej: Antioquia, Valle, Distrito Capital..."
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#39A900]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3 text-[#39A900] shrink-0" />
                    <span>Pista: Departamento o sección territorial (ej: Antioquia, Santander, Atlántico).</span>
                  </p>
                </div>
              </div>

              {/* Program Name */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Programa de Formación Profesional *
                </label>
                <input
                  type="text"
                  required
                  value={formData.programName}
                  onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                  placeholder="Ej: Tecnología en Análisis y Desarrollo de Software (ADSO)"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#39A900]"
                />
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#39A900] shrink-0" />
                  <span>Pista: Nombre completo de la especialidad técnica o tecnológica que estás cursando.</span>
                </p>
              </div>

              {/* Training Center */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Centro de Formación *
                </label>
                <input
                  type="text"
                  required
                  value={formData.trainingCenter}
                  onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
                  placeholder="Ej: Centro de Servicios y Gestión Empresarial"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#39A900]"
                />
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#39A900] shrink-0" />
                  <span>Pista: El nombre de la sede o centro al que está adscrita tu ficha de formación.</span>
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(EMPTY_PROFILE)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpiar Campos</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs shadow-lg shadow-[#39A900]/30 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Perfil e Iniciar Inducción</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* COLUMNA DERECHA (5 cols): MEDIDOR INTERACTIVO DEL DASHBOARD DE INDUCCIÓN */}
          <div className="lg:col-span-5 space-y-4">
            {/* Medidor Principal Interactivo de Avance */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#39A900]" />
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    Medidor Interactivo de Inducción
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#96e072] font-bold bg-[#39A900]/10 border border-[#39A900]/30 px-2 py-0.5 rounded-full">
                  {overallProgress}% Total
                </span>
              </div>

              {/* Tacómetro / Medidor Circular Semicircular Interactivo */}
              <div className="relative flex flex-col items-center justify-center pt-2 pb-1">
                <div className="relative w-56 h-32 flex items-end justify-center overflow-hidden">
                  <svg viewBox="0 0 200 110" className="w-56 h-32">
                    {/* Arco de fondo */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#334155"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                    {/* Arco de progreso activo */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="url(#meterGradient)"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * (overallProgress / 100))}
                      className="transition-all duration-700 ease-out"
                    />
                    {/* Gradiente del arco */}
                    <defs>
                      <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#39A900" />
                        <stop offset="100%" stopColor="#96e072" />
                      </linearGradient>
                    </defs>

                    {/* Aguja del indicador */}
                    <g
                      transform={`rotate(${((overallProgress / 100) * 180) - 90}, 100, 100)`}
                      className="transition-transform duration-700 ease-out origin-[100px_100px]"
                    >
                      <polygon points="98,100 102,100 100,24" fill="#ffffff" />
                      <circle cx="100" cy="100" r="7" fill="#39A900" stroke="#ffffff" strokeWidth="2" />
                    </g>
                  </svg>

                  {/* Lectura numérica central */}
                  <div className="absolute bottom-1 flex flex-col items-center text-center">
                    <span className="text-3xl font-black text-white font-mono leading-none tracking-tight">
                      {overallProgress}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">
                      {overallProgress === 100
                        ? '¡Inducción Completada!'
                        : overallProgress >= 75
                        ? 'Fase Final (Quizzes)'
                        : overallProgress >= 50
                        ? 'Mitad de Camino'
                        : overallProgress > 0
                        ? 'En Desarrollo'
                        : 'Listo para Iniciar'}
                    </span>
                  </div>
                </div>

                {/* Marcadores de referencia del tacómetro */}
                <div className="w-full flex justify-between px-6 text-[10px] font-mono text-slate-400 -mt-1 font-semibold">
                  <span>0% Inicio</span>
                  <span>50% Mitad</span>
                  <span>100% Meta</span>
                </div>
              </div>

              {/* Medidores de Avance por Etapa (4 Módulos) */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-300 font-bold mb-1">
                  <span>Nivel por Módulos</span>
                  <span className="text-[11px] font-mono text-[#96e072]">
                    {Math.round((overallProgress / 25))} de 4 Aprobados
                  </span>
                </div>

                {/* Etapa 1 */}
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                      1. Identidad SENA & Himno
                    </span>
                    <span className="font-mono text-[11px] text-[#96e072] font-bold">
                      {overallProgress >= 25 ? '25 / 25 pts' : `${Math.min(25, overallProgress)} / 25 pts`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#39A900] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (overallProgress / 25) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Etapa 2 */}
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      2. Reglamento & Ética IA
                    </span>
                    <span className="font-mono text-[11px] text-sky-300 font-bold">
                      {overallProgress >= 50
                        ? '25 / 25 pts'
                        : `${Math.max(0, Math.min(25, overallProgress - 25))} / 25 pts`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-400 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, ((overallProgress - 25) / 25) * 100))}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Etapa 3 */}
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      3. Simulador de Casos
                    </span>
                    <span className="font-mono text-[11px] text-amber-300 font-bold">
                      {overallProgress >= 75
                        ? '25 / 25 pts'
                        : `${Math.max(0, Math.min(25, overallProgress - 50))} / 25 pts`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, ((overallProgress - 50) / 25) * 100))}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Etapa 4 */}
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      4. Cuestionarios & Retos
                    </span>
                    <span className="font-mono text-[11px] text-emerald-300 font-bold">
                      {overallProgress >= 100
                        ? '25 / 25 pts'
                        : `${Math.max(0, Math.min(25, overallProgress - 75))} / 25 pts`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, ((overallProgress - 75) / 25) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Botón interactivo de atajo */}
              <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Guía en video del recorrido</span>
                <button
                  type="button"
                  onClick={onOpenVideoManual}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#39A900]/20 hover:bg-[#39A900]/30 text-[#96e072] font-bold rounded-xl border border-[#39A900]/40 transition cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Ver Video Manual</span>
                </button>
              </div>
            </div>

            {/* Tarjeta de Certificación y Acceso Rápido */}
            <div className="bg-gradient-to-br from-[#00324D] to-slate-900 border border-sky-500/30 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Constancia Digital de Inducción
                </span>
                <span className="text-[10px] bg-[#39A900] text-slate-900 px-2 py-0.5 rounded font-extrabold font-mono">
                  {overallProgress === 100 ? 'LISTO' : '100% REQUERIDO'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Al culminar con éxito todos los módulos, el sistema emitirá tu constancia oficial con código QR verificable y firma institucional.
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
          /* LOGIN INSTRUCTOR CON USUARIO Y CONTRASEÑA GENÉRICA */
          <div className="max-w-md mx-auto bg-slate-800 border-2 border-sky-400 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setLandingStep('register-apprentice')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 font-semibold cursor-pointer"
            >
              <span>← Volver al Portal del Aprendiz</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Acceso Restringido
                </span>
                <h2 className="text-xl font-black text-white">
                  Autenticación de Instructor
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Ingresa tus credenciales institucionales como Instructor Encargado para gestionar la Ficha.
            </p>

            {/* Instructor Access Security Callout */}
            <div className="bg-slate-900/90 border border-sky-400/30 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-sky-300 font-bold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-sky-400" />
                  Acceso Restringido para Instructor
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoInstructorCredentials}
                  className="text-[11px] bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold px-2.5 py-1 rounded-lg transition cursor-pointer"
                >
                  💡 Autocompletar Credenciales
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-rose-950/60 border border-rose-500/50 rounded-xl p-3 mb-4 text-xs text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleInstructorLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Usuario / Correo Institucional *
                </label>
                <input
                  type="text"
                  required
                  value={instructorUsername}
                  onChange={(e) => setInstructorUsername(e.target.value)}
                  placeholder="instructor@sena.edu.co"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={instructorPassword}
                    onChange={(e) => setInstructorPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLandingStep('register-apprentice')}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00324D] hover:bg-sky-900 text-white font-extrabold text-xs border border-sky-400/40 shadow-lg transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Iniciar Sesión e Ingresar</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer Banner */}
      <footer className="border-t border-white/10 bg-slate-950 py-6 relative z-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <SenaLogo variant="logo" className="w-5 h-5" />
            <span className="font-bold text-slate-300">Servicio Nacional de Aprendizaje - SENA</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            Acuerdo 0007 de 2012 • Reglamento del Aprendiz • Colombia
          </div>
        </div>
      </footer>

      {/* VENTANA FLOTANTE DE VIDEO DENTRO DEL LANDING PAGE */}
      {isFloatingWidgetVisible ? (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-xs sm:max-w-sm w-full bg-slate-900/95 border-2 border-[#39A900] rounded-2xl shadow-2xl p-3 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300 text-white">
          {/* Header de la ventana flotante */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39A900] animate-pulse" />
              <span className="text-xs font-extrabold text-[#96e072] tracking-tight flex items-center gap-1">
                <Film className="w-3.5 h-3.5" />
                Video Manual Flotante
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsFloatingWidgetMinimized(!isFloatingWidgetMinimized)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition cursor-pointer"
                title={isFloatingWidgetMinimized ? "Expandir Ventana" : "Minimizar Ventana"}
              >
                {isFloatingWidgetMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={onOpenVideoManual}
                className="p-1 text-slate-400 hover:text-[#96e072] rounded hover:bg-slate-800 transition cursor-pointer"
                title="Abrir en pantalla completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsFloatingWidgetVisible(false)}
                className="p-1 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition cursor-pointer"
                title="Cerrar Ventana Flotante"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isFloatingWidgetMinimized && (
            <div className="pt-2 space-y-2">
              {/* Pantalla simulada del video en la ventana flotante */}
              <div
                onClick={onOpenVideoManual}
                className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 cursor-pointer group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00324D]/40 to-slate-950 opacity-80" />
                
                <div className="relative z-10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-[#39A900] text-slate-950 font-bold px-1.5 py-0.5 rounded font-mono">
                      {floatingTime < 15 ? '01: INTRODUCCIÓN' : floatingTime < 45 ? '02: REGISTRO & SIMBOLOS' : floatingTime < 75 ? '03: REGLAMENTO & IA' : '04: CASOS & CERTIFICADO'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {Math.floor(floatingTime / 60).toString().padStart(2, '0')}:{(floatingTime % 60).toString().padStart(2, '0')} / 01:45
                    </span>
                  </div>

                  <p className="text-xs font-bold text-white group-hover:text-[#96e072] transition-colors leading-tight">
                    {floatingTime < 15
                      ? 'Bienvenido al Portal de Inducción SENA'
                      : floatingTime < 45
                      ? 'Diligencia tus datos de perfil'
                      : floatingTime < 75
                      ? 'Conoce el Reglamento y ética en IA'
                      : 'Resuelve casos y obtén tu Certificado'}
                  </p>

                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-[#39A900] h-full transition-all duration-300"
                      style={{ width: `${(floatingTime / 105) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Overlaid Play icon on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="w-10 h-10 rounded-full bg-[#39A900] flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Botones de control de la ventana flotante */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setFloatingIsPlaying(!floatingIsPlaying)}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 cursor-pointer"
                >
                  {floatingIsPlaying ? <Pause className="w-3.5 h-3.5 text-[#96e072]" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{floatingIsPlaying ? 'Pausar' : 'Reproducir'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenVideoManual}
                  className="flex items-center gap-1 text-[11px] font-extrabold text-white bg-[#39A900] hover:bg-[#2e8800] px-3 py-1 rounded-lg shadow-xs transition cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Ver Completo</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Botón de reapertura si se cerró la ventana flotante */
        <button
          type="button"
          onClick={() => {
            setIsFloatingWidgetVisible(true);
            setIsFloatingWidgetMinimized(false);
          }}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 bg-slate-900 border border-[#39A900] text-[#96e072] hover:bg-[#39A900] hover:text-white rounded-2xl shadow-xl text-xs font-bold transition cursor-pointer animate-bounce"
        >
          <Film className="w-4 h-4" />
          <span>Abrir Video Manual Flotante</span>
        </button>
      )}
    </div>
  );
};
