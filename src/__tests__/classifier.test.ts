import { Classifier } from '../classifier';
import { Transaction, TransactionCategory, RiskLevel } from '../types';

describe('Classifier', () => {
  let classifier: Classifier;

  beforeEach(() => {
    classifier = new Classifier();
  });

  describe('classify', () => {
    it('should classify travel transactions correctly', async () => {
      // Test case 1: Flight transaction with high amount
      const flightTransaction: Transaction = {
        id: '1',
        title: 'Flight to Paris - Air France',
        amount: 1200,
        timestamp: new Date()
      };

      const result = await classifier.classify(flightTransaction);

      // Should be classified as travel
      expect(result.category).toBe(TransactionCategory.TRAVEL);
      
      // Should be high risk due to amount > $1000
      expect(result.riskLevel).toBe(RiskLevel.HIGH);
    });

    it('should classify e-commerce transactions with appropriate risk levels', async () => {
      // Test case 2: Online purchase with medium amount
      const onlinePurchase: Transaction = {
        id: '2',
        title: 'Amazon purchase - Electronics',
        amount: 250,
        timestamp: new Date()
      };

      const result = await classifier.classify(onlinePurchase);

      // Should be classified as e-commerce
      expect(result.category).toBe(TransactionCategory.ECOMMERCE);
      
      // Should be high risk since $250 > $200 threshold for e-commerce
      expect(result.riskLevel).toBe(RiskLevel.HIGH);
    });

    it('should handle transactions with no keyword matches', async () => {
      const unknownTransaction: Transaction = {
        id: '3',
        title: 'Miscellaneous expense',
        amount: 75,
        timestamp: new Date()
      };

      const result = await classifier.classify(unknownTransaction);

      // Should default to OTHER category when no keywords match
      expect(result.category).toBe(TransactionCategory.OTHER);
      
      // Should be low risk since $75 <= $100 threshold for OTHER
      expect(result.riskLevel).toBe(RiskLevel.LOW);
    });

    it('should calculate risk levels correctly for different amounts', async () => {
      // Test low risk travel transaction
      const lowRiskTravel: Transaction = {
        id: '4',
        title: 'Uber ride to airport',
        amount: 45,
        timestamp: new Date()
      };

      const lowResult = await classifier.classify(lowRiskTravel);
      expect(lowResult.category).toBe(TransactionCategory.TRAVEL);
      expect(lowResult.riskLevel).toBe(RiskLevel.LOW);

      // Test medium risk travel transaction
      const mediumRiskTravel: Transaction = {
        id: '5',
        title: 'Hotel booking for weekend',
        amount: 350,
        timestamp: new Date()
      };

      const mediumResult = await classifier.classify(mediumRiskTravel);
      expect(mediumResult.category).toBe(TransactionCategory.TRAVEL);
      expect(mediumResult.riskLevel).toBe(RiskLevel.MEDIUM);

      // Test high risk travel transaction
      const highRiskTravel: Transaction = {
        id: '6',
        title: 'International flight booking',
        amount: 1500,
        timestamp: new Date()
      };

      const highResult = await classifier.classify(highRiskTravel);
      expect(highResult.category).toBe(TransactionCategory.TRAVEL);
      expect(highResult.riskLevel).toBe(RiskLevel.HIGH);
    });

    it('should handle edge cases at threshold boundaries', async () => {
      // Test exactly at low threshold
      const atLowThreshold: Transaction = {
        id: '7',
        title: 'Restaurant dinner',
        amount: 25, // Exactly at low threshold for food
        timestamp: new Date()
      };

      const lowResult = await classifier.classify(atLowThreshold);
      expect(lowResult.category).toBe(TransactionCategory.FOOD);
      expect(lowResult.riskLevel).toBe(RiskLevel.LOW);

      // Test exactly at medium threshold
      const atMediumThreshold: Transaction = {
        id: '8',
        title: 'Online shopping spree',
        amount: 200, // Exactly at medium threshold for e-commerce
        timestamp: new Date()
      };

      const mediumResult = await classifier.classify(atMediumThreshold);
      expect(mediumResult.category).toBe(TransactionCategory.ECOMMERCE);
      expect(mediumResult.riskLevel).toBe(RiskLevel.MEDIUM);
    });
  });
});
