import { Badge, CaseStudy, QuizQuestion, RegulationItem } from '../types/induction';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-explorer',
    title: 'Pionero Institucional',
    description: 'Exploraste la historia de Rodolfo Martínez Tono y la fundación del SENA.',
    icon: 'Compass',
    unlocked: false,
  },
  {
    id: 'badge-symbols',
    title: 'Guardián de los Símbolos',
    description: 'Descubriste el significado del Escudo, Bandera y Logo-símbolo del SENA.',
    icon: 'Shield',
    unlocked: false,
  },
  {
    id: 'badge-anthem',
    title: 'Voz del Aprendiz',
    description: 'Escuchaste e interpretaste el Himno institucional del SENA.',
    icon: 'Music',
    unlocked: false,
  },
  {
    id: 'badge-regulations',
    title: 'Maestro del Reglamento',
    description: 'Revisaste a fondo los Derechos, Deberes y Prohibiciones del Aprendiz.',
    icon: 'BookOpen',
    unlocked: false,
  },
  {
    id: 'badge-ethics',
    title: 'Estratega Normativo',
    description: 'Resolviste exitosamente todos los casos prácticos del simulador ético.',
    icon: 'Scale',
    unlocked: false,
  },
  {
    id: 'badge-expert',
    title: 'Orgullo SENA Certificado',
    description: 'Completaste el 100% de la inducción y aprobaste los cuestionarios.',
    icon: 'Award',
    unlocked: false,
  },
];

export const SENA_HISTORY = {
  founder: 'Dr. Rodolfo Martínez Tono',
  foundationDate: '21 de junio de 1957',
  decree: 'Decreto Ley 118 de 1957',
  visionOrigin:
    'Surgió durante una conversación a orillas del Lago Lemán en Suiza entre Rodolfo Martínez Tono y Francis Blanchard (Director de la OIT), concibiendo una entidad tripartita (Gobierno, Trabajadores y Empleadores) para capacitar técnica y tecnológicamente a la fuerza laboral de Colombia.',
  milestones: [
    {
      year: '1957',
      title: 'Nacimiento del SENA',
      desc: 'El 21 de junio nace el Servicio Nacional de Aprendizaje mediante el Decreto Ley 118, bajo la junta militar de gobierno.',
    },
    {
      year: '1960',
      title: 'Expansión de Centros',
      desc: 'Se construyen los primeros centros de formación en las principales ciudades del país con apoyo de la OIT y expertos internacionales.',
    },
    {
      year: '1970 - 1980',
      title: 'Innovación Metodológica e Identidad',
      desc: 'Se consolida la imagen corporativa del SENA y programas de capacitación rural y de sectores agropecuario, industrial y comercial.',
    },
    {
      year: '2000 - Actualidad',
      title: 'Virtualización y Ecosistema Digital',
      desc: 'Llegada de plataformas virtuales (SofiaPlus, Zajuna), semilleros de investigación SENNOVA, tecnoparques, laboratorio de IA y habilidades 4.0.',
    },
  ],
};

export const SENA_SYMBOLS = [
  {
    id: 'logo-simbolo',
    name: 'El Logo-símbolo Oficial',
    tagline: 'El camino hacia el futuro y el conocimiento',
    description:
      'Representa de forma gráfica a un ser humano (el aprendiz) que marcha con determinación por un camino abierto hacia el horizonte del conocimiento y la superación personal.',
    details: [
      'La figura central representa al aprendiz en constante crecimiento técnico y personal.',
      'El camino inferior simboliza las oportunidades de proyección laboral e innovación.',
      'El círculo superior representa la mente abierta y el desarrollo humano integral.',
      'La estructura heráldica condensa los tres sectores productivos: Industria/Construcción, Comercio/Servicios y Agropecuario.',
    ],
    color: '#39A900',
  },
  {
    id: 'escudo',
    name: 'El Escudo Institucional',
    tagline: 'Los tres pilares de la economía colombiana',
    description:
      'Condensa en su heráldica los tres sectores económicos en los que el SENA aporta talento humano calificado para el desarrollo del país.',
    details: [
      'Rueda dentada (piñón): Simboliza el sector industrial, la fuerza motriz, la técnica y la construcción.',
      'Caduceo de Mercurio: Representa el sector del comercio, los servicios, la administración y las finanzas.',
      'Rama de café y trigo: Simboliza el sector primario y agropecuario, la riqueza del campo colombiano y la soberanía alimentaria.',
    ],
    color: '#00324D',
  },
  {
    id: 'bandera',
    name: 'La Bandera del SENA',
    tagline: 'Paz, tranquilidad y transparencia',
    description:
      'La bandera del SENA presenta un lienzo de fondo blanco con el logo-símbolo verde institucional en el centro.',
    details: [
      'Color Blanco: Representa la paz, la serenidad, la transparencia, la armonía y la convivencia pacífica en todos los centros de formación.',
      'Color Verde (#39A900): Simboliza la esperanza, el crecimiento productivo, la innovación, la naturaleza viva y la juventud colombiana.',
      'Se iza en actos cívicos, ceremonias de certificación e inducción en todas las regionales del país.',
    ],
    color: '#1E293B',
  },
];

export const SENA_ANTHEM = {
  authorLyrics: 'Luis Alfredo Osorio',
  authorMusic: 'Daniel Gotlib',
  chorus: `Estudiantes del SENA, ¡adelante!
Por Colombia luchad con amor,
con el ánimo noble y radiante,
transformemos la patria en fervor.`,
  stanzas: [
    {
      number: 'I',
      text: `De la patria el futuro destino,
en las manos del joven está,
el trabajo es seguro camino,
que la paz y el progreso nos da.`,
      meaning:
        'Resalta el papel protagónico del aprendiz como constructor activo del progreso nacional a través de su esfuerzo y trabajo digno.',
    },
    {
      number: 'II',
      text: `En la forja del SENA se aprende,
con tesón la nobleza y lealtad,
y la llama bendita se enciende,
que ilumina a la gran sociedad.`,
      meaning:
        'El SENA como taller formativo donde no solo se adquieren destrezas técnicas sino valores éticos esenciales para transformar la sociedad.',
    },
    {
      number: 'III',
      text: `Avanzad con firmeza y decoro,
hacia metas de luz y verdad,
encontrando en el arte el tesoro,
del trabajo y la fraternidad.`,
      meaning:
        'Llamado a la perseverancia, la fraternidad solidaria y el amor al conocimiento para superar cualquier adversidad.',
    },
  ],
};

export const SENA_MISSION_VISION = {
  mission:
    'El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
  vision:
    'Para el año 2026, el SENA se consolidará como una entidad referente de formación profesional integral, innovadora, pertinente y articulada con las políticas de inclusión, transición energética y reindustrialización del país, facilitando la inserción laboral y el emprendimiento.',
  values: [
    {
      name: 'Respeto',
      desc: 'Reconocer, valorar y tratar con dignidad a todos los miembros de la comunidad educativa sin distingo alguno.',
    },
    {
      name: 'Integridad',
      desc: 'Actuar siempre con honestidad, coherencia ética, veracidad y rectitud en cada una de las acciones.',
    },
    {
      name: 'Compromiso',
      desc: 'Asumir con responsabilidad y entusiasmo el proceso de formación personal, laboral y social.',
    },
    {
      name: 'Solidaridad',
      desc: 'Apoyar desinteresadamente a compañeros y a la sociedad, promoviendo el trabajo colaborativo.',
    },
    {
      name: 'Liderazgo',
      desc: 'Ser agente de cambio positivo en su entorno familiar, productivo y comunitario.',
    },
    {
      name: 'Cuidado del Medio Ambiente',
      desc: 'Promover prácticas sostenibles y el uso responsable de los recursos de nuestro entorno.',
    },
  ],
};

export const REGULATIONS_DATA: RegulationItem[] = [
  // DERECHOS
  {
    id: 'der-1',
    article: 'Art. 7 - Numeral 1',
    title: 'Formación Profesional Integral de Calidad',
    category: 'derechos',
    importance: 'esencial',
    description: 'Recibir formación profesional integral de calidad acorde con el programa formativo.',
    details: [
      'Acceso a instructores calificados y metodologías pedagógicas actualizadas.',
      'Uso de ambientes de aprendizaje, laboratorios, maquinaria, herramientas y tecnologías digitales (Zajuna/SofiaPlus).',
      'Acompañamiento pedagógico constante durante la etapa lectiva y la etapa productiva.',
    ],
    keyInsight: 'El aprendiz tiene derecho a exigir excelencia académica y recursos formativos idóneos.',
  },
  {
    id: 'der-2',
    article: 'Art. 7 - Numeral 2',
    title: 'Inducción y Reconocimiento Institucional',
    category: 'derechos',
    importance: 'esencial',
    description: 'Recibir oportunamente la inducción institucional y pedagógica completa.',
    details: [
      'Conocer el Reglamento del Aprendiz (Acuerdo 0007), el modelo pedagógico y las instalaciones del Centro.',
      'Identificar la estructura organizativa del SENA y canales de atención de Bienestar al Aprendiz.',
      'Conocer los planes de estudio y las competencias a desarrollar en su programa.',
    ],
    keyInsight: 'La inducción es una etapa obligatoria de bienvenida y contextualización normativa.',
  },
  {
    id: 'der-3',
    article: 'Art. 7 - Numeral 4',
    title: 'Portar el Carné Institucional y Credenciales',
    category: 'derechos',
    importance: 'esencial',
    description: 'Disponer de un carné institucional (físico o digital) que acredite la calidad de Aprendiz SENA.',
    details: [
      'El carné debe ser suministrado por el Centro de Formación o expedido digitalmente.',
      'Permite el ingreso a instalaciones, préstamo bibliotecario y convenios institucionales.',
      'En caso de pérdida, el aprendiz puede tramitar su duplicado con el soporte respectivo.',
    ],
    keyInsight: 'El carné es tu cédula estudiantil institucional.',
  },
  {
    id: 'der-4',
    article: 'Art. 7 - Numeral 6',
    title: 'Debido Proceso y Derecho a la Defensa',
    category: 'derechos',
    importance: 'critica',
    description: 'Ser escuchado en descargos ante cualquier informe disciplinario o académico.',
    details: [
      'Notificación oportuna de cualquier informe de queja o presunta falta.',
      'Término de tres (3) días hábiles para presentar pruebas y alegatos de defensa.',
      'Presunción de inocencia mientras no se demuestre lo contrario y derecho a recurso de reposición.',
    ],
    keyInsight: 'Nadie puede ser sancionado sin previa notificación y derecho a ser escuchado.',
  },
  {
    id: 'der-5',
    article: 'Art. 7 - Numeral 8',
    title: 'Servicios de Bienestar al Aprendiz',
    category: 'derechos',
    importance: 'preventiva',
    description: 'Acceder a los programas de apoyo socioeconómico, salud, deporte, arte y cultura.',
    details: [
      'Postulación a apoyos de sostenimiento (SENA o FIC para construcción).',
      'Atención de primeros auxilios y acompañamiento psicoorientador.',
      'Participación en torneos deportivos, semilleros SENNOVA y liderazgo.',
    ],
    keyInsight: 'Bienestar al Aprendiz te respalda integralmente durante toda tu estancia formativa.',
  },

  // DEBERES
  {
    id: 'deb-1',
    article: 'Art. 9 - Numeral 1',
    title: 'Cumplimiento en Actividades Presenciales y Virtuales',
    category: 'deberes',
    importance: 'critica',
    description: 'Participar puntualmente en clases presenciales y sesiones sincrónicas o asincrónicas en Zajuna.',
    details: [
      'Asistir puntualmente a clases presenciales, talleres o sesiones sincrónicas virtuales.',
      'Entregar evidencias de aprendizaje en los plazos fijados por el equipo ejecutor.',
      'Mantener una actitud proactiva y ética en entornos virtuales y de simulación.',
    ],
    keyInsight: 'La puntualidad y el cumplimiento de evidencias garantizan tu estado formativo activo.',
  },
  {
    id: 'deb-2',
    article: 'Art. 9 - Numeral 2',
    title: 'Portar el Carné en Lugar Visible',
    category: 'deberes',
    importance: 'esencial',
    description: 'Portar el documento de identificación institucional en todo momento dentro del Centro.',
    details: [
      'Llevar el carné sobre la prenda en zona visible para el personal de seguridad y comunidad.',
      'Presentarlo al momento de ingresar o cuando sea requerido por instructores o directivos.',
      'Es un documento personal e intransferible; no se puede prestar a terceros.',
    ],
    keyInsight: 'Garantiza la seguridad y control de acceso en los campus y sedes del SENA.',
  },
  {
    id: 'deb-3',
    article: 'Art. 9 - Numeral 3',
    title: 'Uso de Elementos de Protección Personal (EPP) y SST',
    category: 'deberes',
    importance: 'critica',
    description: 'Utilizar la indumentaria de seguridad industrial (Ley 1562 SST) según la especialidad.',
    details: [
      'Gafas, botas con puntera, guantes, overol, cofia o protectores auditivos según el taller.',
      'Cumplir estrictamente con los protocolos de Seguridad y Salud en el Trabajo (SST).',
      'No ingresar a talleres o laboratorios sin la indumentaria reglamentaria bajo ninguna excusa.',
    ],
    keyInsight: 'El no uso de EPP pone en riesgo tu vida y constituye una falta disciplinaria grave.',
  },
  {
    id: 'deb-4',
    article: 'Art. 9 - Numeral 7',
    title: 'Justificación Oportuna de Inasistencias (3 días hábiles)',
    category: 'deberes',
    importance: 'critica',
    description: 'Justificar ausencias dentro de los tres (3) días hábiles siguientes al hecho.',
    details: [
      'Presentar soporte legal válido: incapacidad médica expedida por EPS, calamidad doméstica o fuerza mayor.',
      'Radicar el soporte ante el instructor líder de ficha o coordinación misional.',
      'Tres inasistencias injustificadas consecutivas pueden conllevar a deserción y cancelación.',
    ],
    keyInsight: 'Tienes máximo 3 días hábiles para radicar tu incapacidad o justificación formal.',
  },
  {
    id: 'deb-5',
    article: 'Art. 9 - Numeral 14',
    title: 'Uso Ético de Inteligencia Artificial y Tecnologías Digitales',
    category: 'deberes',
    importance: 'critica',
    description: 'Utilizar las herramientas de IA, software e internet como apoyo pedagógico ético.',
    details: [
      'Citación explicita de fuentes de código o texto generadas mediante herramientas de IA o internet.',
      'Aplicar juicio crítico y análisis propio en todas las evidencias técnicas entregadas.',
      'Respetar las políticas de ciberseguridad y propiedad intelectual del SENA.',
    ],
    keyInsight: 'La IA es una herramienta de apoyo, no un sustituto de tu aprendizaje e integridad técnica.',
  },

  // PROHIBICIONES
  {
    id: 'pro-1',
    article: 'Art. 10 - Numeral 1',
    title: 'Plagio, Fraude y Suplantación con IA o Evidencias',
    category: 'prohibiciones',
    importance: 'critica',
    description: 'Copiar, falsificar o presentar evidencias generadas por terceros o IA sin citación.',
    details: [
      'Copiar evidencias o código de compañeros o internet sin la debida citación APA.',
      'Generar respuestas automáticas por IA presentándolas como autoría propia sin análisis personal.',
      'Suplantar identidad en plataformas virtuales (Zajuna) o evaluaciones presenciales.',
    ],
    keyInsight: 'El fraude y la suplantación atentan contra la ética y constituyen falta gravísima.',
  },
  {
    id: 'pro-2',
    article: 'Art. 10 - Numeral 2',
    title: 'Sustancias Psicoactivas y Alcohol',
    category: 'prohibiciones',
    importance: 'critica',
    description: 'Ingresar o consumir bebidas embriagantes o sustancias psicoactivas en el SENA.',
    details: [
      'Presentarse bajo los efectos de alcohol o estupefacientes en ambientes de aprendizaje.',
      'Comercializar, portar o distribuir sustancias ilícitas dentro o en alrededores inmediatos.',
      'Fumar o vapear en áreas cerradas o abiertas no autorizadas.',
    ],
    keyInsight: 'Causa inmediata de apertura de proceso disciplinario sancionatorio gravísimo.',
  },
  {
    id: 'pro-3',
    article: 'Art. 10 - Numeral 5',
    title: 'Porte de Armas u Objetos Peligrosos',
    category: 'prohibiciones',
    importance: 'critica',
    description: 'Ingresar armas de fuego, cortopunzantes o artefactos explosivos.',
    details: [
      'Salvo herramientas de trabajo técnico autorizadas por el instructor para la práctica formativa.',
      'Pone en riesgo inminente la integridad física de toda la comunidad educativa.',
    ],
    keyInsight: 'Tolerancia cero institucional con armas o agresiones físicas.',
  },
  {
    id: 'pro-4',
    article: 'Art. 10 - Numeral 7',
    title: 'Ciberacoso, Difamación y Violencia de Género',
    category: 'prohibiciones',
    importance: 'critica',
    description: 'Cometer actos de intimidación, ciberacoso o agresiones en canales físicos o virtuales.',
    details: [
      'Discriminación por motivos de género, raza, credo religioso, orientación o condición física.',
      'Comentarios difamatorios o memes en redes sociales, grupos de WhatsApp o aulas virtuales.',
      'Acoso sexual o comportamientos indecorosos en cualquier espacio formativo.',
    ],
    keyInsight: 'El SENA promueve un entorno de convivencia armónica y respeto irrestricto.',
  },

  // MEDIDAS FORMATIVAS
  {
    id: 'med-1',
    article: 'Capítulo X - Art. 27',
    title: 'Llamado de Atención Verbal',
    category: 'medidas',
    importance: 'preventiva',
    description: 'Diálogo reflexivo del instructor ante una conducta no reiterativa.',
    details: [
      'No queda consignado en la hoja de vida académica del aprendiz.',
      'Busca que el aprendiz reflexione y corrija su actitud de manera voluntaria e inmediata.',
      'Se utiliza en faltas académicas o disciplinarias leves iniciales.',
    ],
    keyInsight: 'Es pedagógico y busca orientar antes de escalar a sanciones formales.',
  },
  {
    id: 'med-2',
    article: 'Capítulo X - Art. 28',
    title: 'Plan de Mejoramiento Académico o Disciplinario',
    category: 'medidas',
    importance: 'esencial',
    description: 'Medida concertada por escrito para superar deficiencias de aprendizaje o conducta.',
    details: [
      'Se fija por escrito entre el instructor y el aprendiz con fechas y entregables claros.',
      'Tiene un plazo máximo acordado para su cumplimiento y evaluación.',
      'Si se aprueba satisfactoriamente, el aprendiz continúa normalmente su formación.',
    ],
    keyInsight: 'Oportunidad de nivelación formativa para alcanzar las competencias pendientes.',
  },

  // SANCIONES
  {
    id: 'san-1',
    article: 'Capítulo XI - Art. 29',
    title: 'Llamado de Atención Escrito',
    category: 'sanciones',
    importance: 'esencial',
    description: 'Comunicación formal emitida por la Subdirección de Centro.',
    details: [
      'Se incorpora a la hoja de vida del aprendiz en el sistema de gestión académica.',
      'Se genera por reiteración de faltas leves o tras incumplimiento de plan de mejoramiento.',
      'Se notifica formalmente al aprendiz y a sus acudientes si es menor de edad.',
    ],
    keyInsight: 'Queda como antecedente en tu historial de formación.',
  },
  {
    id: 'san-2',
    article: 'Capítulo XI - Art. 30',
    title: 'Condicionamiento de Matrícula',
    category: 'sanciones',
    importance: 'critica',
    description: 'Estado de advertencia previa a la pérdida definitiva del cupo.',
    details: [
      'Implica la firma de un compromiso formal con plan de mejoramiento riguroso.',
      'Cualquier nueva falta durante el periodo conllevará a la cancelación de matrícula.',
      'El Comité de Evaluación hace seguimiento periódico.',
    ],
    keyInsight: 'Última oportunidad antes de la desvinculación institucional.',
  },
  {
    id: 'san-3',
    article: 'Capítulo XI - Art. 31',
    title: 'Cancelación de Matrícula e Inhabilidad (6 meses a 3 años)',
    category: 'sanciones',
    importance: 'critica',
    description: 'Sanción máxima que retira la calidad de aprendiz e inhabilita para nuevos ingresos.',
    details: [
      'Pérdida definitiva de la matrícula en el programa de formación.',
      'Genera una inhabilidad de ingreso al SENA que oscila entre seis (6) meses y tres (3) años.',
      'Aplica ante faltas gravísimas o deserción no justificada.',
    ],
    keyInsight: 'Sanción más severa del reglamento; te impide estudiar en el SENA por hasta 3 años.',
  },

  // TRÁMITES Y ETAPA PRODUCTIVA
  {
    id: 'tra-1',
    article: 'Capítulo VIII - Art. 21',
    title: 'Traslado de Ficha, Jornada o Centro',
    category: 'tramites',
    importance: 'esencial',
    description: 'Solicitud formal para cambiar de jornada, centro de formación o programa afín.',
    details: [
      'Debe haber cursado al menos el primer trimestre del programa de formación.',
      'Requiere disponibilidad de cupo en la ficha receptora y justificación motivada.',
      'El Subdirector del centro receptor toma la decisión final.',
    ],
    keyInsight: 'Facilita la continuidad si cambias de ciudad o empleo.',
  },
  {
    id: 'tra-2',
    article: 'Capítulo VIII - Art. 22',
    title: 'Aplazamiento de la Formación (Máx. 6 meses)',
    category: 'tramites',
    importance: 'esencial',
    description: 'Suspensión temporal del proceso formativo por causas debidamente justificadas.',
    details: [
      'Se puede solicitar hasta por un tiempo máximo de seis (6) meses.',
      'Prorrogable por otros seis (6) meses únicamente por causas de fuerza mayor o servicio militar.',
      'El aprendiz debe radicar la solicitud formal antes de ausentarse.',
    ],
    keyInsight: 'Evita la deserción solicitando aplazamiento cuando se te presenten imprevistos mayores.',
  },
  {
    id: 'tra-3',
    article: 'Capítulo V - Art. 11 a 14',
    title: 'Alternativas Vigentes de Etapa Productiva',
    category: 'tramites',
    importance: 'esencial',
    description: 'Opciones normativas para desarrollar la práctica y lograr la titulación.',
    details: [
      'Contrato de Aprendizaje (Ley 789 de 2002).',
      'Vinculación Laboral o contractual directa con funciones afines al programa.',
      'Proyecto Productivo en I+D+i o emprendimiento con acompañamiento de Fondo Emprender.',
      'Pasantía institucional, en Pyme o apoyo a unidad productiva familiar.',
      'Monitoría en el SENA aprobada por resolución del Centro.',
    ],
    keyInsight: 'Debes registrar y aprobar tu alternativa de etapa productiva para poder certificarte.',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'El Proyecto Final y el Generador de IA sin Citación',
    category: 'Académica',
    situation:
      'Camilo, aprendiz de Desarrollo de Software, debía entregar la documentación de arquitectura del proyecto final. Para ahorrar tiempo, ingresó el requerimiento a una herramienta de Inteligencia Artificial, copió todo el código y texto generado en un archivo PDF, le colocó su nombre y lo entregó sin revisar ni colocar notas bibliográficas.',
    context:
      'En la sustentación, el instructor le pidió explicar la lógica de una función compleja y Camilo no supo responder qué hacía el código que entregó.',
    question: '¿Cómo evalúa el Reglamento actualizado del Aprendiz (Art. 10 num. 1 e IA ética) esta situación?',
    options: [
      {
        id: 'opt-1a',
        text: 'No hay ninguna falta porque el uso de IA es obligatorio en tecnología y no requiere revisión humana.',
        isCorrect: false,
        feedback:
          'Incorrecto. La IA es una herramienta de apoyo, pero presentar contenidos automáticos sin análisis ni atribución es fraude ético.',
        actionTaken: 'Desconocimiento de la norma ética digital.',
      },
      {
        id: 'opt-1b',
        text: 'Es una falta académica y ética por suplantación de autoría y plagio no citado. Se debe acordar un Plan de Mejoramiento o remitir al Comité de Evaluación respetando el debido proceso.',
        isCorrect: true,
        feedback:
          '¡Correcto! El uso ético de la IA exige citar las fuentes generadas y aplicar juicio crítico personal. Presentar respuestas automáticas sin comprenderlas constituye falta académica.',
        actionTaken: 'Apertura de Plan de Mejoramiento o informe a Comité.',
      },
      {
        id: 'opt-1c',
        text: 'El instructor puede expulsar a Camilo inmediatamente de la institución sin escucharlo.',
        isCorrect: false,
        feedback:
          'Incorrecto. Ningún instructor puede sancionar o desvincular sin garantizar el debido proceso (Art. 7 num. 6).',
        actionTaken: 'Violación del debido proceso.',
      },
    ],
    normativeArticle: 'Artículo 10 Numeral 1 - Prohibiciones / Uso Ético de IA y Tecnologías',
    legalQuote:
      'Se prohíbe cometer plagio o suplantación en evidencias de aprendizaje presentadas para la evaluación, incluyendo el uso no declarado ni atribuido de tecnologías de generación automática.',
  },
  {
    id: 'case-2',
    title: 'Incapacidad Médica Urgente e Inasistencia',
    category: 'Trámites',
    situation:
      'Andrea sufrió una emergencia médica quirúrgica y fue hospitalizada durante 8 días. La EPS le expidió su incapacidad formal.',
    context:
      'Andrea no pudo asistir a sus actividades formativas presenciales y teme quedar reportada en deserción.',
    question: '¿Cuál es el término reglamentario vigente para radicar la justificación médica?',
    options: [
      {
        id: 'opt-2a',
        text: 'Esperar un mes hasta que se recupere totalmente y mostrarle la fotocopia al celador.',
        isCorrect: false,
        feedback:
          'Incorrecto. Superar el plazo normativo de 3 días hábiles expone al aprendiz a reporte de deserción en SofiaPlus/Zajuna.',
        actionTaken: 'Extemporaneidad y riesgo de deserción.',
      },
      {
        id: 'opt-2b',
        text: 'Radicar la incapacidad médica formal dentro de los tres (3) días hábiles siguientes a la ocurrencia ante el instructor líder o coordinación, directamente o mediante un familiar.',
        isCorrect: true,
        feedback:
          '¡Exacto! El Art. 9 num. 7 fija el término perentorio de 3 días hábiles para justificar ausencias con soporte legal válido.',
        actionTaken: 'Justificación aprobada y reprogramación de entregables.',
      },
      {
        id: 'opt-2c',
        text: 'Solicitar retiro voluntario inmediato porque enfermarse invalida el proceso.',
        isCorrect: false,
        feedback:
          'Falso. El SENA ampara el derecho a la salud y reprograma actividades formativas.',
        actionTaken: 'Desinformación sobre derechos.',
      },
    ],
    normativeArticle: 'Artículo 9 Numeral 7 - Deberes del Aprendiz',
    legalQuote:
      'Justificar las inasistencias a las actividades de formación dentro de los tres (3) días hábiles siguientes a su ocurrencia con los soportes legales respectivos.',
  },
  {
    id: 'case-3',
    title: 'Taller Práctico sin Elementos de Protección Personal (EPP)',
    category: 'Disciplinaria',
    situation:
      'Felipe ingresó al laboratorio técnico sin sus botas de seguridad industrial ni gafas protectoras reglamentarias (Norma SST Ley 1562). Para no perder tiempo, intentó encender la maquinaria de pruebas.',
    context:
      'El instructor suspendió de inmediato la maniobra para prevenir un riesgo de descarga o atrapamiento.',
    question: '¿Qué principio normativo aplica ante el no uso de EPP?',
    options: [
      {
        id: 'opt-3a',
        text: 'El uso de EPP y cumplimiento de la normatividad de Seguridad y Salud en el Trabajo (SST) es deber obligatorio de autocuidado (Art. 9 num. 3); no se permite operar sin ellos.',
        isCorrect: true,
        feedback:
          '¡Muy bien! El autocuidado y cumplimiento de protocolos de SST en talleres es obligatorio y constituye falta si se omite.',
        actionTaken: 'Suspensión del uso de máquina y llamado preventivo.',
      },
      {
        id: 'opt-3b',
        text: 'El instructor debió dejarlo operar para que aprenda con la experiencia del accidente.',
        isCorrect: false,
        feedback:
          'Peligroso e inaceptable. Ningún instructor puede poner en riesgo la integridad física del aprendiz.',
        actionTaken: 'Violación grave de normas de seguridad industrial.',
      },
      {
        id: 'opt-3c',
        text: 'Los EPP son voluntarios y el aprendiz decide si los usa.',
        isCorrect: false,
        feedback:
          'Falso. Son obligatorios bajo reglamentos de centro y normatividad nacional de SST.',
        actionTaken: 'Infracción a normas de seguridad.',
      },
    ],
    normativeArticle: 'Artículo 9 Numeral 3 - Deberes / Seguridad y Salud en el Trabajo (SST)',
    legalQuote:
      'Portar el uniforme de manera decorosa y los elementos de protección personal exigidos para cada una de las actividades de formación.',
  },
  {
    id: 'case-4',
    title: 'Intimidación y Ciberacoso en Redes Institucionales',
    category: 'Disciplinaria',
    situation:
      'Un aprendiz publicó en redes sociales y grupos de WhatsApp institucionales comentarios injuriosos y fotomontajes de burla contra una compañera de clase, vulnerando su tranquilidad.',
    context:
      'La aprendiza afectada presentó captura de pantalla ante Bienestar al Aprendiz e Instructor Vocero.',
    question: '¿Cómo tipifica el Reglamento la conducta de ciberacoso o violencia digital?',
    options: [
      {
        id: 'opt-4a',
        text: 'No aplica sanción porque las redes sociales son del ámbito privado y el SENA no interviene.',
        isCorrect: false,
        feedback:
          'Falso. El ciberacoso y hostigamiento entre miembros de la comunidad educativa quebranta la convivencia y es sancionable independientemente del canal.',
        actionTaken: 'Interpretación errónea sobre convivencia digital.',
      },
      {
        id: 'opt-4b',
        text: 'Es una falta disciplinaria gravísima (Art. 10 num. 7). Se activa protocolo de convivencia, acompañamiento psicológico y remisión al Comité de Evaluación.',
        isCorrect: true,
        feedback:
          '¡Correcto! El SENA aplica tolerancia cero ante el acoso, ciberacoso, violencia digital o discriminación.',
        actionTaken: 'Acompañamiento a la víctima y proceso disciplinario sancionatorio.',
      },
      {
        id: 'opt-4c',
        text: 'Obligar a la víctima a pedir perdón por sentirse ofendida.',
        isCorrect: false,
        feedback:
          'Inadmisible. La víctima jamás debe ser revictimizada.',
        actionTaken: 'Vulneración de derechos fundamentales.',
      },
    ],
    normativeArticle: 'Artículo 10 Numeral 7 - Prohibiciones / Convivencia y Respeto Digital',
    legalQuote:
      'Se prohíbe proferir expresiones soeces, amenazantes, calumniosas o injuriosas contra miembros de la comunidad educativa por cualquier medio presencial o virtual.',
  },
  {
    id: 'case-5',
    title: 'Selección de Alternativa de Etapa Productiva',
    category: 'Trámites',
    situation:
      'Mateo finalizó su etapa lectiva de formación y fue seleccionado por una empresa patrocinadora para firmar un Contrato de Aprendizaje (Ley 789). Él desea formalizar su alternativa ante el SENA.',
    context:
      'Mateo pregunta cuál es el procedimiento normativo para registrar legalmente su etapa productiva y lograr la titulación.',
    question: '¿Qué exige el Reglamento del Aprendiz respecto a la Etapa Productiva?',
    options: [
      {
        id: 'opt-5a',
        text: 'El aprendiz debe seleccionar y registrar formalmente una alternativa aprobada (Contrato de Aprendizaje, Vinculación Laboral, Proyecto Productivo, Pasantía o Monitoría) e ingresar su bitácora en Zajuna.',
        isCorrect: true,
        feedback:
          '¡Excelente! La etapa productiva es requisito indispensable para la titulación y debe registrarse con seguimiento de bitácoras del instructor asignado.',
        actionTaken: 'Registro formal de la alternativa y seguimiento de bitácoras.',
      },
      {
        id: 'opt-5b',
        text: 'Trabajar en cualquier lugar de manera informal sin reportar nada al SENA y esperar el título.',
        isCorrect: false,
        feedback:
          'Incorrecto. Sin registro formal y seguimiento de bitácoras académicas no es posible certificar la competencia de la etapa productiva.',
        actionTaken: 'Incumplimiento de requisitos de titulación.',
      },
      {
        id: 'opt-5c',
        text: 'Pagar a una persona externa para que le firme la bitácora.',
        isCorrect: false,
        feedback:
          'Grave falta disciplinaria por falsedad documental y fraude en evidencias.',
        actionTaken: 'Cancelación de matrícula por fraude en etapa productiva.',
      },
    ],
    normativeArticle: 'Capítulo V - Artículos 11 a 14 / Alternativas de Etapa Productiva',
    legalQuote:
      'La etapa productiva es aquella en la cual el aprendiz aplica, complementa y consolida sus competencias; debe ser concertada y evaluada mediante el seguimiento de bitácoras periódicas.',
  },
];

export const IDENTITY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'id-q1',
    category: 'identity',
    question: '¿Quién fue el visionario fundador e impulsor de la creación del SENA en 1957?',
    options: ['Alberto Lleras Camargo', 'Rodolfo Martínez Tono', 'Gabriel García Márquez', 'Rafael Núñez'],
    correctAnswer: 1,
    explanation:
      'El economista y abogado cartagenero Dr. Rodolfo Martínez Tono concibió el SENA y fue su primer director general durante casi dos décadas.',
  },
  {
    id: 'id-q2',
    category: 'identity',
    question: '¿Qué simbolizan los tres sectores representados en el Escudo del SENA?',
    options: [
      'Tierra, Fuego y Agua',
      'Industria/Construcción (piñón), Comercio/Servicios (caduceo) y Agropecuario (café/trigo)',
      'Bogotá, Medellín y Cali',
      'Gobierno, Militares y Sindicatos',
    ],
    correctAnswer: 1,
    explanation:
      'El escudo contiene la rueda dentada (industria), el caduceo de Mercurio (comercio y servicios) y las ramas de café y trigo (agropecuario).',
  },
  {
    id: 'id-q3',
    category: 'identity',
    question: '¿Cuál es el significado del color blanco predominante en la Bandera del SENA?',
    options: [
      'Ausencia de colores institucionales',
      'La riqueza mineral del territorio',
      'Paz, tranquilidad, transparencia y convivencia pacífica',
      'El frío de las cordilleras colombianas',
    ],
    correctAnswer: 2,
    explanation:
      'El fondo blanco de la bandera del SENA representa la paz, serenidad y transparencia que debe reinar en toda la comunidad educativa.',
  },
  {
    id: 'id-q4',
    category: 'identity',
    question: 'En el Logo-símbolo del SENA, ¿qué representa la figura estilizada que avanza?',
    options: [
      'Un deportista corriendo una maratón',
      'El aprendiz que avanza con paso firme hacia el futuro por el camino del conocimiento',
      'Un compás de dibujo técnico arquitectónico',
      'Un avión despegando hacia otros países',
    ],
    correctAnswer: 1,
    explanation:
      'El logo-símbolo representa al hombre que se capacita y marcha con determinación hacia el horizonte de oportunidades y desarrollo.',
  },
  {
    id: 'id-q5',
    category: 'identity',
    question: '¿Quién escribió la letra solemne del Himno del SENA?',
    options: ['Luis Alfredo Osorio', 'José Barros', 'Daniel Gotlib', 'Jorge Villamil'],
    correctAnswer: 0,
    explanation:
      'La letra fue compuesta por el poeta Luis Alfredo Osorio, mientras que la música fue obra del maestro Daniel Gotlib.',
  },
  {
    id: 'id-q6',
    category: 'identity',
    question: '¿Cuál es el primer verso del coro del Himno del SENA?',
    options: [
      'Gloria inmarcesible, ¡oh júbilo inmortal!',
      'Estudiantes del SENA, ¡adelante! Por Colombia luchad con amor...',
      'Hacia las cumbres del saber marchemos...',
      'Somos la fuerza obrera de la nación...',
    ],
    correctAnswer: 1,
    explanation:
      'El coro abre con el enérgico llamado: "Estudiantes del SENA, ¡adelante! Por Colombia luchad con amor, con el ánimo noble y radiante, transformemos la patria en fervor."',
  },
  {
    id: 'id-q7',
    category: 'identity',
    question: '¿Qué tipo de entidad pública es el SENA en la estructura del Estado Colombiano?',
    options: [
      'Una empresa privada con ánimo de lucro',
      'Un establecimiento público del orden nacional, adscrito al Ministerio del Trabajo',
      'Una dependencia directa de la Presidencia de la República',
      'Una ONG internacional sin vinculación legal estatal',
    ],
    correctAnswer: 1,
    explanation:
      'El SENA es un establecimiento público del orden nacional con personería jurídica, patrimonio propio e independencia administrativa, adscrito al Ministerio del Trabajo.',
  },
  {
    id: 'id-q8',
    category: 'identity',
    question: '¿Cuál es el color corporativo e institucional insignia del SENA?',
    options: ['Azul marino intenso', 'Verde SENA (#39A900)', 'Rojo carmesí', 'Amarillo canario'],
    correctAnswer: 1,
    explanation:
      'El Verde SENA es el color institucional por excelencia, representativo de la esperanza, el progreso y la juventud formadora.',
  },
];

export const REGULATIONS_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'reg-q1',
    category: 'regulations',
    question: '¿Cuál es el plazo máximo reglamentario para justificar una inasistencia a la formación?',
    options: ['El mismo día antes de las 12', 'Tres (3) días hábiles siguientes al hecho', 'Quince días calendario', 'No hay límite de tiempo'],
    correctAnswer: 1,
    explanation:
      'El Art. 9 num. 7 estipula claramente tres (3) días hábiles con soporte válido (médico EPS, calamidad, citación judicial).',
    normativeReference: 'Artículo 9 Numeral 7',
  },
  {
    id: 'reg-q2',
    category: 'regulations',
    question: 'Respecto al uso de Inteligencia Artificial (IA) en las evidencias de aprendizaje, ¿qué establece la normativa vigente?',
    options: [
      'Está totalmente prohibido utilizar computadores',
      'Se permite como apoyo ético siempre que se citen las fuentes y se aplique análisis y criterio propio del aprendiz',
      'Se permite copiar textos generados por IA haciéndolos pasar por propios',
      'El SENA realiza todas las tareas con IA sin intervención humana',
    ],
    correctAnswer: 1,
    explanation:
      'Las herramientas de IA son recursos pedagógicos de apoyo, pero presentar contenidos automáticos sin citación ni comprensión personal vulnera la honestidad académica.',
    normativeReference: 'Artículo 9 Numeral 14 / Ética Digital',
  },
  {
    id: 'reg-q3',
    category: 'regulations',
    question: '¿Por cuánto tiempo máximo se puede solicitar el trámite de Aplazamiento de la formación?',
    options: ['Hasta por seis (6) meses prorrogables por justa causa', 'Máximo 2 semanas', 'Cinco años consecutivos', 'Indefinidamente'],
    correctAnswer: 0,
    explanation:
      'El Artículo 22 fija el periodo máximo de aplazamiento en seis (6) meses, con prórroga excepcional de otros seis meses en casos de fuerza mayor comprobada o servicio militar.',
    normativeReference: 'Artículo 22',
  },
  {
    id: 'reg-q4',
    category: 'regulations',
    question: '¿Qué órgano institucional colegiado se encarga de analizar los casos disciplinarios y académicos de los aprendices?',
    options: [
      'El Comité de Evaluación y Seguimiento',
      'La Fiscalía General de la Nación',
      'El Sindicato de Trabajadores',
      'El Centro de Conciliación Judicial',
    ],
    correctAnswer: 0,
    explanation:
      'El Comité de Evaluación y Seguimiento es la instancia colegiada (instructores, voceros, bienestar, coordinación) que garantiza el debido proceso.',
    normativeReference: 'Capítulo IX',
  },
  {
    id: 'reg-q5',
    category: 'regulations',
    question: '¿Qué sanción máxima extingue la condición de aprendiz y genera inhabilidad para ingresar al SENA de 6 meses a 3 años?',
    options: ['Llamado de atención verbal', 'Cancelación de Matrícula', 'Plan de mejoramiento disciplinario', 'Felicitación pública'],
    correctAnswer: 1,
    explanation:
      'La Cancelación de Matrícula (Art. 31) es la sanción definitiva que genera inhabilidad para estudiar en el SENA entre 6 meses y 3 años.',
    normativeReference: 'Artículo 31',
  },
  {
    id: 'reg-q6',
    category: 'regulations',
    question: '¿Cuántos días tiene el aprendiz para presentar descargos y pruebas tras ser notificado formalmente por el Comité?',
    options: ['Un (1) día calendario', 'Tres (3) días hábiles', 'Treinta (30) días', 'No tiene derecho a presentar descargos'],
    correctAnswer: 1,
    explanation:
      'El derecho al debido proceso otorga un término perentorio de tres (3) días hábiles contados a partir del recibo de la comunicación para presentar descargos.',
    normativeReference: 'Capítulo X - Debido Proceso',
  },
  {
    id: 'reg-q7',
    category: 'regulations',
    question: '¿Cuál de las siguientes opciones constituye una alternativa reglamentaria válida para realizar la Etapa Productiva?',
    options: [
      'Contrato de Aprendizaje, Vinculación Laboral, Proyecto Productivo, Pasantía o Monitoría',
      'Trabajo informático en casas de apuestas sin contrato ni reporte',
      'Pagar una suma de dinero a un tercero para que firme la bitácora',
      'Esperar en casa sin registrar alternativa',
    ],
    correctAnswer: 0,
    explanation:
      'El Capítulo V del Reglamento (Art. 11 a 14) establece las opciones legales para desarrollar y aprobar la Etapa Productiva.',
    normativeReference: 'Capítulo V - Artículos 11 a 14',
  },
  {
    id: 'reg-q8',
    category: 'regulations',
    question: 'Si un aprendiz decide no continuar su programa, ¿cuál es el trámite correcto para evitar deserción y sanciones mayores?',
    options: [
      'Simplemente apagar el celular y no volver',
      'Radicar formalmente la solicitud de Retiro Voluntario por escrito ante la Subdirección de Centro',
      'Bloquear a los instructores de redes sociales',
      'Esperar a ser sancionado sin avisar',
    ],
    correctAnswer: 1,
    explanation:
      'El retiro voluntario formal (Art. 24) genera una inhabilidad controlada de 6 meses, a diferencia de la deserción que afecta negativamente el récord histórico del aprendiz.',
    normativeReference: 'Artículo 24',
  },
];

export const MATCHING_PAIRS = [
  { id: 'm1', concept: 'Rueda Dentada (Escudo)', match: 'Sector Industrial y Construcción' },
  { id: 'm2', concept: 'Caduceo (Escudo)', match: 'Sector Comercio y Servicios' },
  { id: 'm3', concept: 'Ramas de Café y Trigo', match: 'Sector Agropecuario y Campo' },
  { id: 'm4', concept: '3 días hábiles', match: 'Plazo para radicar incapacidad médica o descargos' },
  { id: 'm5', concept: 'Uso ético de IA', match: 'Citación explícita y aplicación de criterio propio' },
  { id: 'm6', concept: 'Plan de Mejoramiento', match: 'Medida formativa concertada para nivelar competencias' },
  { id: 'm7', concept: 'Etapa Productiva', match: 'Contrato de Aprendizaje, Pasantía, Proyecto o Vinculación' },
  { id: 'm8', concept: 'Cancelación de Matrícula', match: 'Sanción máxima con inhabilidad de 6 meses a 3 años' },
];
