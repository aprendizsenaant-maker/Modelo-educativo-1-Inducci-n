# Manual de la Inducción - Portal de Inducción Institucional SENA

## 📌 1. Introducción y Propósito

El **Portal de Inducción Institucional SENA** es una plataforma web interactiva diseñada para guiar a los nuevos aprendices del Servicio Nacional de Aprendizaje (SENA) en su proceso de incorporación a la institución. 

La herramienta combina aprendizaje interactivo, simulaciones de casos reales basados en el **Reglamento del Aprendiz (Acuerdo 0007 de 2012 y sus actualizaciones vigentes)**, síntesis sonora del Himno SENA con karaoke en tiempo real, evaluaciones de conocimiento y un panel de gestión centralizado para el Instructor.

---

## 👥 2. Roles del Sistema

La plataforma cuenta con dos roles claramente diferenciados:

### A. Rol de Aprendiz
* **Acceso:** Libre y directo mediante formulario de registro de datos personales y de formación.
* **Objetivo:** Recorrer los módulos de inducción, interactuar con los símbolos del SENA, estudiar el reglamento vigente, resolver casos prácticos, aprobar las evaluaciones y obtener su **Certificado Digital de Inducción SENA**.
* **Persistencia:** Sus datos y progreso se guardan localmente en el navegador para continuar la inducción en cualquier momento.

### B. Rol de Instructor
* **Acceso:** Mediante credenciales genéricas protegidas.
  * **Correo Electrónico:** `instructor@sena.edu.co`
  * **Contraseña:** `sena2026` *(la contraseña se encuentra oculta por seguridad en la interfaz)*
* **Objetivo:** Monitorear el avance, puntaje, respuestas y certificaciones de todos los aprendices registrados en las diferentes fichas de formación.

---

## 🚀 3. Flujo de Trabajo del Aprendiz

### Paso 1: Selección de Rol y Registro de Datos
1. En la pantalla inicial de bienvenida, el aprendiz selecciona el botón **"Soy Aprendiz"**.
2. Se despliega el formulario de registro con campos limpios y sugerencias de llenado (placeholders):
   * **Nombres y Apellidos**
   * **Tipo y Número de Documento** (CC, TI, CE, PEP, PPT)
   * **Número de Ficha** (Ej: `2671940`)
   * **Programa de Formación** (Ej: *Análisis y Desarrollo de Software - ADSO*)
   * **Regional SENA** (Ej: *Regional Antioquia*)
   * **Centro de Formación** (Ej: *Centro de Diseño y Manufactura del Cuero*)
3. Al hacer clic en **"Guardar Perfil y Continuar"**, la información se almacena y el aprendiz accede directamente al entorno de inducción.

### Paso 2: Recorrido por Módulos Temáticos
El aprendiz debe completar cuatro (4) módulos interactivos:

#### 🟢 Módulo 1: Identidad SENA
* Conocimiento de los símbolos institucionales: Escudo, Bandera y Logo oficial.
* **Reproductor del Himno SENA:** Reproductor interactivo con síntesis de sonido en tiempo real (Web Audio API) y sistema de letra sincronizada en formato karaoke.

#### 🟢 Módulo 2: Reglamento del Aprendiz (Normativa Vigente)
* Estudio detallado del **Acuerdo 0007 de 2012** y sus normativas complementarias vigentes:
  * **Derechos y Deberes del Aprendiz**
  * **Prohibiciones y Clasificación de Faltas** (Leves, Graves y Gravísimas)
  * **Uso Ético de la Inteligencia Artificial y Herramientas Digitales**
  * **Normas en Entornos Virtuales (Plataforma Zajuna / SofiaPlus)**
  * **Seguridad y Salud en el Trabajo (SST - Ley 1562)**
  * **Las 6 Alternativas de Etapa Productiva** (Contrato de aprendizaje, vínculo laboral, proyecto productivo, pasantía, monitoría y unidad productiva)
  * **Debido Proceso y Comité de Evaluación y Seguimiento**

#### 🟢 Módulo 3: Simulador de Casos Prácticos
* Enfrontamiento a escenarios y situaciones de la vida real en el SENA.
* Retroalimentación explicativa inmediata según los artículos aplicables del reglamento para afianzar la toma de decisiones éticas y normativas.

#### 🟢 Módulo 4: Evaluación y Quizzes
* Prueba de conocimiento interactiva tipo opción múltiple.
* Actividades de emparejamiento de conceptos normativos.
* Calificación automática en porcentaje.

### Paso 3: Obtención de Certificado
* Al alcanzar el 100% de los módulos o aprobar las evaluaciones, el aprendiz puede generar su **Certificado Digital de Inducción SENA**.
* El certificado incluye un **código QR de verificación**, fecha de emisión, firma del centro de formación y una animación conmemorativa de confeti.

---

## 👨‍🏫 4. Panel del Instructor (Instructor Dashboard)

El instructor cuenta con una herramienta centralizada para revisar la información de todos los aprendices:

1. **Ingreso:** Seleccionar **"Soy Instructor"** en la página principal e ingresar las credenciales (`instructor@sena.edu.co` / `sena2026`).
2. **Métricas Generales:**
   * Total de aprendices registrados.
   * Aprendices con inducción completada.
   * Promedio general de calificación en quizzes.
3. **Filtros y Búsquedas:**
   * Filtrar la lista por número de Ficha de formación.
   * Buscador por nombre, apellidos o número de documento.
4. **Detalle por Aprendiz:**
   * Avance porcentual en la inducción.
   * Módulos completados.
   * Visualización directa del certificado emitido.

---

## 🛠️ 5. Especificaciones Técnicas del Proyecto

* **Lenguaje & Framework:** React 18, TypeScript, Vite.
* **Estilos & UI:** Tailwind CSS v4, Lucide React (iconografía oficial).
* **Audio & Efectos:** Web Audio API (síntesis del Himno SENA), `canvas-confetti` (celebración de certificado).
* **Identidad Gráfica SENA:**
  * Verde Institucional SENA: `#39A900`
  * Azul Institucional SENA: `#00324D`
  * Logo Oficial SENA en formato vectorial SVG.

---

## 📄 6. Archivos Principales del Código Fuente

* `/src/App.tsx` - Controlador principal de navegación y vistas de la aplicación.
* `/src/components/RoleSelectionLanding.tsx` - Landing page de selección de rol e inicio de sesión.
* `/src/components/ApprenticeHeader.tsx` - Formulario de registro y perfil del aprendiz.
* `/src/components/ModuleIdentity.tsx` - Módulo de símbolos e Himno SENA.
* `/src/components/ModuleRegulations.tsx` - Módulo del Reglamento del Aprendiz.
* `/src/components/ModuleCaseSimulator.tsx` - Módulo del simulador de casos reales.
* `/src/components/ModuleQuizzes.tsx` - Módulo de quizzes y emparejamiento.
* `/src/components/InstructorView.tsx` - Panel de control y gestión del instructor.
* `/src/components/CertificateModal.tsx` - Generador y visor del Certificado de Inducción.
* `/src/data/senaData.ts` - Base de datos normativa, casos, quizzes y alternativas de etapa productiva.
* `/src/utils/soundEffects.ts` - Motor de audio Web Audio API para el Himno SENA.

---
*Manual de la Inducción SENA - Versión 2.0 (Normativa Vigente y Plataforma Digital)*
