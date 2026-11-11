import React, { useState } from 'react';
import { ApprenticeProfile } from '../types/induction';
import { X, Save, User, RefreshCw, GraduationCap } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onSaveProfile: (profile: ApprenticeProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>({ ...profile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  const handleResetDefaults = () => {
    setFormData({
      id: 'default-user',
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
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#00324D] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#39A900]" />
            <h3 className="font-bold text-sm tracking-wide">
              Configurar Datos del Aprendiz
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-500">
            Personaliza tus datos institucionales para que aparezcan reflejados en tu carné de avance
            y en la Constancia de Inducción SENA oficial.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nombre Completo del Aprendiz *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#39A900] focus:ring-1 focus:ring-[#39A900]"
              placeholder="Ej: Laura Sofía Martínez López"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipo Doc.
              </label>
              <select
                value={formData.documentType}
                onChange={(e) =>
                  setFormData({ ...formData, documentType: e.target.value as ApprenticeProfile['documentType'] })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#39A900]"
              >
                <option value="CC">C.C.</option>
                <option value="TI">T.I.</option>
                <option value="CE">C.E.</option>
                <option value="PEP">P.E.P.</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Número de Identificación *
              </label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#39A900]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                No. Ficha *
              </label>
              <input
                type="text"
                required
                value={formData.ficha}
                onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-[#00324D] focus:outline-none focus:border-[#39A900]"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Regional SENA *
              </label>
              <input
                type="text"
                required
                value={formData.regional}
                onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#39A900]"
                placeholder="Ej: Antioquia, Valle, Distrito Capital..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Programa de Formación *
            </label>
            <input
              type="text"
              required
              value={formData.programName}
              onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#39A900]"
              placeholder="Ej: Tecnología en Análisis y Desarrollo de Software (ADSO)"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Centro de Formación *
            </label>
            <input
              type="text"
              required
              value={formData.trainingCenter}
              onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#39A900]"
              placeholder="Ej: Centro de Servicios y Gestión Empresarial"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer Ejemplo</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs shadow-md shadow-[#39A900]/25 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
