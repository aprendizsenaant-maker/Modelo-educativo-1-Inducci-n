export interface ApprenticeProfile {
  id: string;
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  email: string;
  ficha: string;
  programName: string;
  regional: string;
  trainingCenter: string;
  startedAt: string;
  avatarSeed: string;
}

export type ModuleId = 'identity' | 'regulations' | 'simulator' | 'quizzes';

export interface ModuleProgress {
  identity: {
    visitedSymbols: string[];
    listenedAnthem: boolean;
    exploredHistory: boolean;
    completed: boolean;
  };
  regulations: {
    reviewedRights: boolean;
    reviewedDuties: boolean;
    reviewedProhibitions: boolean;
    reviewedSanctions: boolean;
    reviewedProcedures: boolean;
    completed: boolean;
  };
  simulator: {
    resolvedCases: { [caseId: string]: boolean };
    score: number;
    completed: boolean;
  };
  quizzes: {
    identityQuizScore: number;
    regulationsQuizScore: number;
    matchGameCompleted: boolean;
    completed: boolean;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface QuizQuestion {
  id: string;
  category: 'identity' | 'regulations';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  normativeReference?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'Académica' | 'Disciplinaria' | 'Trámites';
  situation: string;
  context: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    actionTaken: string;
  }[];
  normativeArticle: string;
  legalQuote: string;
}

export interface RegulationItem {
  id: string;
  article: string;
  title: string;
  category: 'derechos' | 'deberes' | 'prohibiciones' | 'medidas' | 'sanciones' | 'tramites';
  description: string;
  details: string[];
  keyInsight: string;
  importance: 'esencial' | 'critica' | 'preventiva';
}
