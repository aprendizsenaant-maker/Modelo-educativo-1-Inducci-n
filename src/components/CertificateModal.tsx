import React, { useState } from 'react';
import { ApprenticeProfile } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import { Printer, Download, Check, X, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  overallScore: number;
  isEligible: boolean;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  profile,
  overallScore,
  isEligible,
}) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  if (!isOpen) return null;

  const issueDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const certificateCode = `SENA-IND-2026-${profile.ficha.slice(-4)}-${profile.documentNumber.slice(-4)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(certificateCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8 print:my-0 print:border-none print:shadow-none">
        {/* Modal Top Bar (Hidden on print) */}
        <div className="print:hidden bg-[#00324D] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-300" />
            <span className="font-bold text-sm tracking-wide">
              {isEligible ? 'Constancia Oficial de Inducción SENA' : 'Requisitos de Certificación'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isEligible && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-lg text-xs font-bold transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / PDF</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not eligible warning if apprentice hasn't completed */}
        {!isEligible ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              ¡Casi logras tu constancia de inducción!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Para desbloquear y descargar tu certificado oficial, debes completar las actividades de:
            </p>
            <ul className="text-xs text-left max-w-sm mx-auto space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <li className="flex items-center gap-2">
                <span className="text-[#39A900] font-bold">1.</span>
                <span>Explorar símbolos, historia y entonar el himno del SENA.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#39A900] font-bold">2.</span>
                <span>Revisar los artículos del Reglamento del Aprendiz (Acuerdo 0007).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#39A900] font-bold">3.</span>
                <span>Resolver los 5 casos normativos del simulador.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#39A900] font-bold">4.</span>
                <span>Aprobar los cuestionarios de conocimiento con mínimo 70%.</span>
              </li>
            </ul>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#00324D] text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer"
            >
              Continuar con la Inducción
            </button>
          </div>
        ) : (
          /* ACTUAL DIPLOMA / CERTIFICATE CANVAS */
          <div className="p-6 sm:p-10 relative bg-gradient-to-b from-white via-slate-50/40 to-white text-slate-800 selection:bg-transparent">
            {/* Certificate Outer Border Frame */}
            <div className="border-4 border-double border-[#00324D] p-6 sm:p-8 rounded-xl relative overflow-hidden bg-white shadow-inner">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#39A900]" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#39A900]" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#39A900]" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#39A900]" />

              {/* Watermark in center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]">
                <SenaLogo variant="escudo" className="w-96 h-96" />
              </div>

              {/* Certificate Header */}
              <div className="relative z-10 flex flex-col items-center text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <SenaLogo variant="logo" className="w-14 h-14" />
                </div>
                <h4 className="text-[11px] font-black tracking-widest text-[#00324D] uppercase font-mono">
                  Servicio Nacional de Aprendizaje - SENA
                </h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  Ministerio del Trabajo | República de Colombia
                </p>
                <div className="w-24 h-0.5 bg-[#39A900] my-3" />
                <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#00324D] uppercase">
                  Constancia de Inducción Formativa
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Normativa, Imagen Institucional & Valores del Aprendiz SENA
                </p>
              </div>

              {/* Certificate Body Text */}
              <div className="relative z-10 text-center max-w-2xl mx-auto space-y-4 my-6">
                <p className="text-xs text-slate-600">
                  La Subdirección de Centro y la Coordinación Misional certifican que:
                </p>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight font-serif uppercase border-b border-slate-200 pb-2">
                  {profile.fullName}
                </h2>

                <p className="text-xs text-slate-700 leading-relaxed">
                  Identificado(a) con <strong>{profile.documentType} No. {profile.documentNumber}</strong>,
                  perteneciente a la <strong>Ficha de Caracterización {profile.ficha}</strong> del programa de formación profesional:
                </p>

                <div className="bg-emerald-50/70 border border-emerald-200/80 p-3 rounded-xl">
                  <p className="text-sm font-black text-[#00324D] uppercase">
                    {profile.programName}
                  </p>
                  <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                    {profile.trainingCenter} - Regional {profile.regional}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed text-justify sm:text-center">
                  Ha culminado satisfactoriamente el programa de inducción institucional, demostrando dominio pleno
                  en la apropiación de los <strong>Símbolos Institucionales</strong>, la <strong>Historia y Filosofía del SENA</strong>,
                  los <strong>Derechos, Deberes y Prohibiciones</strong> contemplados en el <strong>Reglamento del Aprendiz (Acuerdo 0007 de 2012)</strong>,
                  así como la resolución de casos prácticos de convivencia y ética laboral.
                </p>
              </div>

              {/* Bottom Details, Signatures & QR */}
              <div className="relative z-10 pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* QR Code and verification */}
                <div className="flex items-center gap-3 text-left">
                  <div className="w-16 h-16 bg-slate-900 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                    {/* Simulated SVG QR */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-full h-full">
                      <rect x="3" y="3" width="6" height="6" fill="white" />
                      <rect x="15" y="3" width="6" height="6" fill="white" />
                      <rect x="3" y="15" width="6" height="6" fill="white" />
                      <path d="M15 15h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">CÓDIGO DE VERIFICACIÓN:</span>
                    <span className="text-xs font-mono font-bold text-[#00324D]">
                      {certificateCode}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Expedido en Colombia: {issueDate}
                    </span>
                  </div>
                </div>

                {/* Simulated Signatures */}
                <div className="flex gap-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-32 border-b border-slate-400 pb-1 mb-1 font-serif text-xs text-slate-500 italic">
                      Subdirección Centro
                    </div>
                    <span className="text-[10px] font-bold text-slate-800">Subdirector(a) de Centro</span>
                    <span className="text-[9px] text-slate-400">SENA Regional {profile.regional}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-32 border-b border-slate-400 pb-1 mb-1 font-serif text-xs text-slate-500 italic">
                      Firma Digital Validadora
                    </div>
                    <span className="text-[10px] font-bold text-slate-800">Coordinación Misional</span>
                    <span className="text-[9px] text-slate-400">Formación Profesional Integral</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside modal */}
            <div className="print:hidden mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                <span>Documento emitido con validez académica para archivo de Ficha.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer"
                >
                  {copiedCode ? '¡Código Copiado!' : 'Copiar Código de Verificación'}
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-1.5 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  Imprimir / Guardar en PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
