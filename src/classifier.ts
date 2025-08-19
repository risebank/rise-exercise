import { Transaction, ClassifierResult, TransactionCategory, RiskLevel, ClassificationRule } from './types';
import { callAnthropic } from './utils';

export class Classifier {

  private defaultAmountThresholds: { low: number, medium: number, high: number } = { low: 100, medium: 500, high: 1000 };

  private classificationRules: ClassificationRule[] = [
    {
      category: TransactionCategory.TRAVEL,
      keywords: ['flight', 'hotel', 'airline', 'booking', 'reservation', 'trip', 'vacation', 'travel', 'transport', 'uber', 'lyft', 'taxi'],
      amountThresholds: { low: 100, medium: 500, high: 1000 }
    },
    {
      category: TransactionCategory.ECOMMERCE,
      keywords: ['amazon', 'ebay', 'shop', 'store', 'online', 'purchase', 'order', 'buy', 'retail', 'marketplace'],
      amountThresholds: { low: 50, medium: 200, high: 500 }
    },
    {
      category: TransactionCategory.FOOD,
      keywords: ['restaurant', 'cafe', 'food', 'dining', 'meal', 'lunch', 'dinner', 'breakfast', 'groceries', 'supermarket', 'takeout'],
      amountThresholds: { low: 25, medium: 75, high: 150 }
    },
    {
      category: TransactionCategory.ENTERTAINMENT,
      keywords: ['movie', 'theater', 'concert', 'show', 'game', 'entertainment', 'ticket', 'event', 'festival', 'cinema'],
      amountThresholds: { low: 30, medium: 100, high: 300 }
    },
    {
      category: TransactionCategory.UTILITIES,
      keywords: ['bill', 'electricity', 'water', 'gas', 'internet', 'phone', 'utility', 'service', 'subscription', 'payment'],
      amountThresholds: { low: 50, medium: 150, high: 400 }
    }
  ];

  /**
   * Classifies a transaction and returns a ClassifierResult
   * 
   * This method should:
   * 1. Analyze the transaction title to determine the category based on keywords
   * 2. Calculate the risk level based on amount and category thresholds
   * 3. Return a ClassifierResult with category and riskLevel
   * 
   * @param transaction - The transaction to classify
   * @returns ClassifierResult with category and riskLevel
   */
  public async classify(transaction: Transaction): Promise<ClassifierResult> {
    // @todo: Implement classification logic
    // 1. Find matching category based on title keywords (first category with at least one matching keyword)
    // 2. Determine risk level based on amount and category thresholds, you can use existing method to do this
    // 3. Return ClassifierResult

    throw new Error('Method not implemented');
  }

  public async classifyAI(transaction: Transaction): Promise<ClassifierResult> {
    throw new Error('Method not implemented');
  }

  /**
   * Helper method to find the best matching category for a transaction title
   * @param title - The transaction title to classify
   * @returns The best matching category
   */
  private findCategory(title: string): TransactionCategory {
    throw new Error('Method not implemented');
  }

  /**
   * Helper method to determine risk level based on amount and category
   * @param amount - The amount of the transaction
   * @param category - The category of the transaction
   * @returns The risk level
   */
  private calculateRiskLevel(amount: number, category: TransactionCategory): RiskLevel {
    const rule = this.classificationRules.find(r => r.category === category);
    
    if (!rule) {
      // Default thresholds for OTHER category
      if (amount <= this.defaultAmountThresholds.low) return RiskLevel.LOW;
      if (amount <= this.defaultAmountThresholds.medium) return RiskLevel.MEDIUM;
      return RiskLevel.HIGH;
    }

    if (amount <= rule.amountThresholds.low) return RiskLevel.LOW;
    if (amount <= rule.amountThresholds.medium) return RiskLevel.MEDIUM;
    return RiskLevel.HIGH;
  }
}
