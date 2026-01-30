export interface ComponentItem {
  name: string;
  quantity: string;
  purpose: string;
}

export interface ProjectProposal {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  problemStatement: string;
  solutionOverview: string;
  hardwareList: ComponentItem[];
  circuitLogic: string;
  codeSnippet: string;
  researchSignificance: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}