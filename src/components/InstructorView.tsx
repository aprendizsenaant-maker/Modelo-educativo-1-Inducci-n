import React, { useState } from 'react';
import { ApprenticeProfile } from '../types/induction';
import { 
  Users, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  BarChart3, 
  FileSpreadsheet, 
  TrendingUp, 
  Award,
  Filter
} from 'lucide-react';

interface MockStudent {
  id: string;
  name: string;
  doc: string;
  progress: number;
  status: 'completado' | 'en_progreso' | 'pendiente';
  regScore: number;
  identityScore: number;
  completedAt?: string;
}

const MOCK_COHORT: MockStudent[] = [
  { id: '1', name: 'Laura Marcela Gómez Pérez', doc: '1023847591', progress: 100, status: 'completado', regScore: 100, identityScore: 100, completedAt: '2026-11-09' },
  { id: '2', name: 'Mateo Alejandro Torres Silva', doc: '1035987123', progress: 100, status: 'completado', regScore: 88, identityScore: 100, completedAt: '2026-11-10' },
  { id: '3', name: 'Valentina Restrepo Castro', doc: '1017482910', progress: 75, status: 'en_progreso', regScore: 75, identityScore: 88 },
  { id: '4', name: 'Carlos Andrés Benítez Mora', doc: '1098472911', progress: 50, status: 'en_progreso', regScore: 62, identityScore: 75 },
  { id: '5', name: 'Daniela Sofía Vargas Quintana', doc: '1039485712', progress: 100, status: 'completado', regScore: 100, identityScore: 88, completedAt: '2026-11-08' },
  { id: '6', name: 'Sebastián Morales Cardona', doc: '1029384756', progress: 25, status: 'en_progreso', regScore: 0, identityScore: 75 },
  { id: '7', name: 'Camila Andrea Ospina Cruz', doc: '1038475910', progress: 0, status: 'pendiente', regScore: 0, identityScore: 0 },
];

interface InstructorViewProps {
  currentProfile: ApprenticeProfile;
  currentProgress: number;
  currentRegScore: number;
  currentIdentityScore: number;
  onSelectApprentice?: (profile: ApprenticeProfile) => void;
}

export const InstructorView: React.FC<InstructorViewProps> = ({
  currentProfile,
  currentProgress,
  currentRegScore,
  currentIdentityScore,
}) => {
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completado' | 'en_progreso' | 'pendiente'>('all');

  // Include current active apprentice in the list
  const fullRoster: MockStudent[] = [
    {
      id: 'current-user',
      name: `${currentProfile.fullName} (Tú / En Sesión)`,
      doc: currentProfile.documentNumber,
      progress: currentProgress,
      status: currentProgress === 100 ? 'completado' : currentProgress > 0 ? 'en_progreso' : 'pendiente',
      regScore: currentRegScore,
      identityScore: currentIdentityScore,
      completedAt: currentProgress === 100 ? 'Hoy' : undefined,
    },
    ...MOCK_COHORT,
  ];

  const filteredStudents = fullRoster.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(filterQuery.toLowerCase()) || s.doc.includes(filterQuery);
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalStudents = fullRoster.length;
  const completedCount = fullRoster.filter((s) => s.status === 'completado').length;
  const completionRate = Math.round((completedCount / totalStudents) * 100);
  const avgRegScore = Math.round(
    fullRoster.reduce((acc, curr) => acc + curr.regScore, 0) / totalStudents
  );

  const handleExportCSV = () => {
    const headers = 'ID,Nombre,Documento,Progreso,Estado,Puntaje_Reglamento,Puntaje_Identidad,Fecha_Finalizacion\n';
    const rows = fullRoster
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.doc}",${s.progress}%,"${s.status}",${s.regScore}%,${s.identityScore}%,"${s.completedAt || 'Pendiente'}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SENA_Seguimiento_Induccion_Ficha_${currentProfile.ficha}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Instructor Hero Banner */}
      <div className="bg-gradient-to-r from-[#00324D] via-[#003c5d] to-[#00324D] text-white rounded-2xl p-6 shadow-md border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#96e072] uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Panel de Coordinación e Instructor Líder</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Seguimiento de Inducción | Ficha {currentProfile.ficha}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Programa: <strong className="text-white">{currentProfile.programName}</strong> | Regional {currentProfile.regional}
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-xl text-xs font-bold transition shadow-md shadow-[#39A900]/25 cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Exportar Planilla CSV</span>
        </button>
      </div>

      {/* Cohort KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Total Aprendices en Ficha</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 font-mono">{totalStudents}</span>
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Cohorte 2026</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Tasa de Certificación</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#39A900] font-mono">{completionRate}%</span>
            <Award className="w-5 h-5 text-[#39A900]" />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">{completedCount} de {totalStudents} finalizados</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Promedio en Normativa</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#00324D] font-mono">{avgRegScore}%</span>
            <TrendingUp className="w-5 h-5 text-[#00324D]" />
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Meta institucional: &gt;75%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Casos Prácticos Resueltos</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-amber-600 font-mono">92%</span>
            <BarChart3 className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Alta apropiación ética</span>
        </div>
      </div>

      {/* Roster & Search Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Buscar por nombre o cédula..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39A900]"
            />
          </div>

          <div className="flex gap-1.5 w-full sm:w-auto">
            {(['all', 'completado', 'en_progreso', 'pendiente'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#00324D] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status === 'all' ? 'Todos' : status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Avance</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-center">Test Reglamento</th>
                <th className="py-3 px-4 text-center">Test Identidad</th>
                <th className="py-3 px-4">Fecha Certificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {student.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {student.doc}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#39A900] h-full rounded-full"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-600 font-semibold">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        student.status === 'completado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.status === 'en_progreso'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {student.status === 'completado' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {student.status === 'en_progreso' && <Clock className="w-3 h-3 text-amber-600" />}
                      {student.status === 'pendiente' && <AlertCircle className="w-3 h-3 text-slate-400" />}
                      <span className="capitalize">{student.status.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold">
                    <span className={student.regScore >= 70 ? 'text-emerald-700' : 'text-slate-500'}>
                      {student.regScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold">
                    <span className={student.identityScore >= 70 ? 'text-emerald-700' : 'text-slate-500'}>
                      {student.identityScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {student.completedAt || 'En inducción'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
