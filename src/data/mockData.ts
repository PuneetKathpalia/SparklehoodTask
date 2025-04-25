import { AISafetyIncident } from '../types';

export const mockIncidents: AISafetyIncident[] = [
  {
    id: "1",
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics over others, leading to unfair treatment in content recommendations. This bias was detected in the user engagement metrics and confirmed through A/B testing.",
    severity: "Medium",
    reportedDate: new Date("2025-03-15T10:00:00Z")
  },
  {
    id: "2",
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information during a critical operation, potentially leading to hazardous situations. The model fabricated details about emergency protocols that don't exist in our documentation.",
    severity: "High",
    reportedDate: new Date("2025-04-01T14:30:00Z")
  },
  {
    id: "3",
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata in response to specific query patterns. While no personal information was leaked, the system revealed internal data structures that should remain private.",
    severity: "Low",
    reportedDate: new Date("2025-03-20T09:15:00Z")
  },
  {
    id: "4",
    title: "Adversarial Attack on Image Recognition",
    description: "Image recognition system was fooled by carefully crafted adversarial examples, causing misclassification of critical visual data in a security context. The attack exploited known vulnerabilities in the model architecture.",
    severity: "High",
    reportedDate: new Date("2025-03-10T16:45:00Z")
  },
  {
    id: "5",
    title: "Performance Degradation in Production",
    description: "AI model deployed to production showed unexpected performance degradation after 2 weeks of operation. Response times increased by 300% and accuracy dropped by 15% without any code changes.",
    severity: "Medium",
    reportedDate: new Date("2025-03-05T11:20:00Z")
  }
]; 