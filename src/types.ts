export interface User {
  id: string;
  name: string;
  email: string;
  profession: string;
  isPro: boolean;
  promptsUsed: number;
  promptsLimit: number;
}

export interface Variable {
  name: string;
  example?: string;
  defaultValue?: string;
  required?: boolean;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  profession: string;
  category: string;
  tone: string;
  variables: Variable[];
  rating?: number;
  usageCount?: number;
  createdAt: Date;
  author?: string;
  isPersonal?: boolean;
  isFavorited?: boolean;
}

export interface AppState {
  currentScreen: string;
  user: User | null;
  selectedPrompt: Prompt | null;
}

export interface JobDetection {
  id: string;
  job: string;
  confidence: number;
}

export interface PromptExecution {
  id: string;
  promptId: string;
  variables: Record<string, any>;
  result: string;
  createdAt: Date;
}
