export enum TransactionCategory {
  TRAVEL = 'travel',
  ECOMMERCE = 'ecommerce',
  FOOD = 'food',
  ENTERTAINMENT = 'entertainment',
  UTILITIES = 'utilities',
  OTHER = 'other'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  timestamp: Date;
}

export interface ClassifierResult {
  category: TransactionCategory;
  riskLevel: RiskLevel;
}

export interface ClassificationRule {
  category: TransactionCategory;
  keywords: string[];
  amountThresholds: {
    low: number;
    medium: number;
    high: number;
  };
}
