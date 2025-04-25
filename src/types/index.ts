export type Severity = 'Low' | 'Medium' | 'High';

export interface AISafetyIncident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  reportedDate: Date;
}

export type SortOrder = 'newest' | 'oldest'; 