import React, { useState } from 'react';
import { REGULATIONS_DATA } from '../data/senaData';
import { RegulationItem } from '../types/induction';
import { 
  BookOpen, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Filter, 
  Info, 
  ArrowRight,
  Gavel,
  FileCheck2,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ModuleRegulationsProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  reviewedRights: boolean;
  reviewedDuties: boolean;
  reviewedProhibitions: boolean;
  reviewedSanctions: boolean;
  reviewedProcedures: boolean;
  onMarkCategoryRead: (category: string) => void;
}

export const ModuleRegulations: React.FC<ModuleRegulationsProps> = ({
  onCompleteModule,
  isCompleted,
  reviewedRights,
  reviewedDuties,
  reviewedProhibitions,
  reviewedSanctions,
  reviewedProcedures,
  onMarkCategoryRead,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<RegulationItem | null>(null);
  const [readItems, setReadItems] = useState<{ [id: string]: boolean }>({});

  const filterCategories = [
    { id: 'all', label: 'Todos los Artículos', icon: BookOpen },
    { id: 'derechos', label: 'Derechos (Art. 7-8)', icon: ShieldCheck },
    { id: 'deberes', label: 'Deberes (Art. 9)', icon: FileCheck2 },
    { id: 'prohibiciones', label: 'Prohibiciones (Art. 10)', icon: AlertTriangle },
    { id: 'medidas', label: 'Medidas Formativas', icon: Info },
    { id: 'sanciones', label: 'Sanciones (Art. 29-31)', icon: Gavel },
    { id: 'tramites', label: 'Trámites Académicos', icon: Clock },
  ];

  const handleToggleRead = (id: string, category: string) => {
    const updated = { ...readItems, [id]: !readItems[id] };
    setReadItems(updated);
    onMarkCategoryRead(category);
  };

  const filteredItems = REGULATIONS_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      item.title.toLowerCase().includes(query) ||
      item.article.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.details.some((d) => d.toLowerCase().includes(query)) ||
      item.keyInsight.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const allKeySectionsReviewed =
    reviewedRights &&
    reviewedDuties &&
    reviewedProhibitions &&
    reviewedSanctions &&
    reviewedProcedures;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Módulo 2 de Inducción</span>
          </div>
          <h2 className="text-2xl font-black text-[#00324D] tracking-tight">
            Reglamento del Aprendiz SENA (Acuerdo 0007 de 2012)
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Tu carta de navegación normativa: conoce tus derechos fundamentales, compromisos formativos,
            conductas prohibidas, el debido proceso ante el Comité de Evaluación y cómo tramitar traslados o aplazamientos.
          </p>
        </div>

        <button
          onClick={() => {
            onCompleteModule();
            confetti({ particleCount: 50, spread: 70 });
          }}
          disabled={isCompleted}
          className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
            isCompleted
              ? 'bg-[#39A900]/15 text-[#39A900] border border-[#39A900]/30 cursor-default'
              : 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-md shadow-[#39A900]/25'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isCompleted ? 'Módulo Completado' : 'Confirmar Lectura del Reglamento'}</span>
        </button>
      </div>

      {/* Due Process & Committee Visual Workflow Highlight */}
      <div className="bg-gradient-to-r from-[#00324D] to-[#004f7a] text-white rounded-2xl p-6 shadow-md border border-slate-700">
        <div className="flex items-center gap-2 text-xs font-bold text-[#96e072] uppercase tracking-wider mb-1">
          <Gavel className="w-4 h-4" />
          <span>Garantía Constitucional SENA</span>
        </div>
        <h3 className="text-lg font-extrabold text-white mb-2">
          El Debido Proceso y el Comité de Evaluación y Seguimiento
        </h3>
        <p className="text-xs text-slate-300 max-w-3xl mb-4">
          Ningún instructor o directivo puede sancionar a un aprendiz de forma unilateral o inmediata.
          Toda queja o falta debe seguir el conducto regular garantizando el derecho a la defensa:
        </p>

        {/* 5-step Flowchart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="bg-white/10 p-3 rounded-xl border border-white/15">
            <span className="text-[#96e072] font-black text-xs block mb-1">PASO 1</span>
            <p className="font-bold text-white mb-1">Informe o Queja</p>
            <p className="text-[11px] text-slate-300">
              Instructor o coordinador remite informe formal con pruebas de la presunta falta.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/15">
            <span className="text-[#96e072] font-black text-xs block mb-1">PASO 2</span>
            <p className="font-bold text-white mb-1">Notificación Formal</p>
            <p className="text-[11px] text-slate-300">
              Se comunica por escrito al aprendiz los cargos y pruebas que se le imputan.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/15">
            <span className="text-[#96e072] font-black text-xs block mb-1">PASO 3</span>
            <p className="font-bold text-white mb-1">Término de Descargos</p>
            <p className="text-[11px] text-slate-300">
              El aprendiz tiene <strong className="text-amber-300">3 días hábiles</strong> para radicar sus descargos y testimonios.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/15">
            <span className="text-[#96e072] font-black text-xs block mb-1">PASO 4</span>
            <p className="font-bold text-white mb-1">Sesión del Comité</p>
            <p className="text-[11px] text-slate-300">
              Instancia colegiada (vocero, instructores, bienestar) delibera y emite recomendación motivada.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/15">
            <span className="text-[#96e072] font-black text-xs block mb-1">PASO 5</span>
            <p className="font-bold text-white mb-1">Resolución Subdirector</p>
            <p className="text-[11px] text-slate-300">
              El Subdirector de Centro expide acto administrativo con opción de recurso de reposición.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Category Filtering Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por artículo, término clave (ej: 'inasistencia', 'epp', 'plagio', 'carné', 'aplazamiento')..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39A900] focus:ring-2 focus:ring-[#39A900]/20 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Filter Badges */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filterCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id !== 'all') onMarkCategoryRead(cat.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#00324D] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#96e072]' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison: Clasificación de Faltas */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#39A900]" />
          Clasificación y Criterios de Calificación de Faltas (Capítulo IX):
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Faltas Leves */}
          <div className="bg-white p-4 rounded-xl border border-emerald-200">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 mb-2">
              Faltas Leves
            </span>
            <p className="text-slate-600 leading-relaxed">
              Conductas que no causan daño grave a personas ni a bienes públicos y se cometen por primera vez sin dolo o reincidencia.
            </p>
            <p className="mt-2 text-[11px] font-semibold text-emerald-700">
              Medida común: Llamado de atención verbal o concertación pedagógica.
            </p>
          </div>

          {/* Faltas Graves */}
          <div className="bg-white p-4 rounded-xl border border-amber-200">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 mb-2">
              Faltas Graves
            </span>
            <p className="text-slate-600 leading-relaxed">
              Incumplimiento reiterado de deberes, inasistencias injustificadas, desobediencia de normas de seguridad industrial o daño de equipos.
            </p>
            <p className="mt-2 text-[11px] font-semibold text-amber-700">
              Sanción común: Llamado escrito o condicionamiento de matrícula.
            </p>
          </div>

          {/* Faltas Gravísimas */}
          <div className="bg-white p-4 rounded-xl border border-rose-200">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 mb-2">
              Faltas Gravísimas
            </span>
            <p className="text-slate-600 leading-relaxed">
              Plagio/fraude en proyectos, porte de armas, consumo o venta de sustancias psicoactivas, acoso, agresiones o comisión de delitos penales.
            </p>
            <p className="mt-2 text-[11px] font-semibold text-rose-700">
              Sanción común: Cancelación de matrícula con inhabilidad de 6 meses a 3 años.
            </p>
          </div>
        </div>
      </div>

      {/* Regulations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isRead = !!readItems[item.id];
          const isEssential = item.importance === 'esencial';
          const isCritical = item.importance === 'critica';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-5 border transition-all ${
                isRead
                  ? 'border-emerald-300/80 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#00324D] bg-slate-100 px-2 py-0.5 rounded">
                    {item.article}
                  </span>
                  <span
                    className={`ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isCritical
                        ? 'bg-rose-100 text-rose-700'
                        : isEssential
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleRead(item.id, item.category)}
                  className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded transition cursor-pointer ${
                    isRead
                      ? 'bg-[#39A900] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                  title={isRead ? 'Artículo comprendido' : 'Marcar como comprendido'}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isRead ? 'Comprendido' : 'Marcar'}</span>
                </button>
              </div>

              <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">
                {item.title}
              </h4>
              <p className="text-slate-600 text-xs mb-3 leading-relaxed">
                {item.description}
              </p>

              {/* Bullet Details */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  {item.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#39A900] font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pedagogical Key Insight */}
              <div className="bg-emerald-50/70 border border-emerald-200/70 p-2.5 rounded-lg flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-950 font-medium">
                  <strong>Clave para el Aprendiz:</strong> {item.keyInsight}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">No se encontraron artículos con ese criterio.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="text-xs text-[#39A900] font-bold mt-2 hover:underline cursor-pointer"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}
    </div>
  );
};
