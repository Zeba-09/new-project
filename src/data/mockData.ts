import { User, Assessment, TaraSession } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@student.edu',
    name: 'John Doe',
    role: 'student',
    createdAt: '2024-01-15T10:00:00Z',
    wellnessScore: 78,
    lastAssessmentDate: '2024-01-20T14:30:00Z',
    assessmentsCompleted: 3,
    taraSessionsAttended: 2
  },
  {
    id: '2',
    email: 'jane.smith@student.edu',
    name: 'Jane Smith',
    role: 'student',
    createdAt: '2024-01-10T09:00:00Z',
    wellnessScore: 85,
    lastAssessmentDate: '2024-01-22T11:15:00Z',
    assessmentsCompleted: 2,
    taraSessionsAttended: 4
  },
  {
    id: '3',
    email: 'mike.johnson@student.edu',
    name: 'Mike Johnson',
    role: 'student',
    createdAt: '2024-01-12T16:00:00Z',
    wellnessScore: 62,
    lastAssessmentDate: '2024-01-18T09:45:00Z',
    assessmentsCompleted: 1,
    taraSessionsAttended: 1
  },
  {
    id: '4',
    email: 'admin@wellness.edu',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockAssessments: Assessment[] = [
  {
    id: '1',
    userId: '1',
    type: 'anxiety',
    title: 'SCA Children Anxiety Scale',
    score: 18,
    maxScore: 30,
    completedAt: '2024-01-20T14:30:00Z',
    responses: []
  },
  {
    id: '2',
    userId: '1',
    type: 'peer-pressure',
    title: 'Peer Pressure Questionnaire',
    score: 12,
    maxScore: 24,
    completedAt: '2024-01-19T10:15:00Z',
    responses: []
  },
  {
    id: '3',
    userId: '2',
    type: 'depression-anxiety',
    title: 'Depression & Anxiety Assessment',
    score: 8,
    maxScore: 24,
    completedAt: '2024-01-22T11:15:00Z',
    responses: []
  },
  {
    id: '4',
    userId: '2',
    type: 'anxiety',
    title: 'SCA Children Anxiety Scale',
    score: 15,
    maxScore: 30,
    completedAt: '2024-01-21T16:20:00Z',
    responses: []
  },
  {
    id: '5',
    userId: '3',
    type: 'peer-pressure',
    title: 'Peer Pressure Questionnaire',
    score: 16,
    maxScore: 24,
    completedAt: '2024-01-18T09:45:00Z',
    responses: []
  }
];

export const mockTaraSessions: TaraSession[] = [
  {
    id: '1',
    userId: '1',
    startedAt: '2024-01-20T15:00:00Z',
    duration: 25,
    completed: true
  },
  {
    id: '2',
    userId: '1',
    startedAt: '2024-01-22T10:30:00Z',
    duration: 30,
    completed: true
  },
  {
    id: '3',
    userId: '2',
    startedAt: '2024-01-19T14:15:00Z',
    duration: 20,
    completed: true
  },
  {
    id: '4',
    userId: '2',
    startedAt: '2024-01-21T11:45:00Z',
    duration: 35,
    completed: true
  },
  {
    id: '5',
    userId: '2',
    startedAt: '2024-01-23T09:20:00Z',
    duration: 28,
    completed: true
  },
  {
    id: '6',
    userId: '2',
    startedAt: '2024-01-24T16:10:00Z',
    duration: 22,
    completed: true
  },
  {
    id: '7',
    userId: '3',
    startedAt: '2024-01-18T13:30:00Z',
    duration: 18,
    completed: true
  }
];