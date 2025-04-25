import { AISafetyIncident } from '../types';

export const mockIncidents: AISafetyIncident[] = [
  {
    id: '1',
    title: 'AI Model Making Biased Decisions',
    description: 'An AI model used for hiring decisions showed significant bias against certain demographic groups. The model was trained on historical hiring data that contained inherent biases.',
    severity: 'High',
    reportedDate: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'Data Privacy Breach in AI Training',
    description: 'Sensitive user data was inadvertently included in the training dataset without proper anonymization.',
    severity: 'Medium',
    reportedDate: new Date('2024-03-10'),
  },
  {
    id: '3',
    title: 'AI System Performance Degradation',
    description: 'AI system showed unexpected performance degradation in edge cases, leading to incorrect predictions.',
    severity: 'Low',
    reportedDate: new Date('2024-03-05'),
  },
  {
    id: '4',
    title: 'Unauthorized Model Access',
    description: 'Unauthorized access attempt detected for a sensitive AI model. No data was compromised.',
    severity: 'Medium',
    reportedDate: new Date('2024-03-01'),
  },
]; 