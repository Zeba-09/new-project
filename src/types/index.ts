export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  createdAt: string;
  wellnessScore?: number;
  lastAssessmentDate?: string;
  assessmentsCompleted?: number;
  taraSessionsAttended?: number;
}

export interface Assessment {
  id: string;
  userId: string;
  type: 'anxiety' | 'peer-pressure' | 'depression-anxiety';
  title: string;
  score: number;
  maxScore: number;
  completedAt: string;
  responses: AssessmentResponse[];
}

export interface AssessmentResponse {
  questionId: string;
  question: string;
  answer: string;
  score: number;
}

export interface TaraSession {
  id: string;
  userId: string;
  startedAt: string;
  duration?: number;
  completed: boolean;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: AssessmentOption[];
}

export interface AssessmentOption {
  text: string;
  score: number;
}

export interface AssessmentConfig {
  type: 'anxiety' | 'peer-pressure' | 'depression-anxiety';
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  maxScore: number;
}