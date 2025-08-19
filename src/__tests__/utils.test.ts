import { generateId, formatCurrency, formatDate, validateTransactionInput } from '../utils';

describe('Utils', () => {
  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
    });

    it('should generate IDs with reasonable length', () => {
      const id = generateId();
      expect(id.length).toBeGreaterThan(10);
      expect(id.length).toBeLessThan(30);
    });
  });

  describe('formatCurrency', () => {
    it('should format positive amounts correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(100)).toBe('$100.00');
      expect(formatCurrency(0.99)).toBe('$0.99');
    });

    it('should format large amounts correctly', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
      expect(formatCurrency(999999.99)).toBe('$999,999.99');
    });
  });

  describe('formatDate', () => {
    it('should format dates correctly', () => {
      const testDate = new Date('2023-12-25T15:30:00');
      const formatted = formatDate(testDate);
      
      expect(formatted).toContain('Dec');
      expect(formatted).toContain('25');
      expect(formatted).toContain('2023');
      expect(formatted).toContain('3:30');
    });

    it('should handle different date formats', () => {
      const date1 = new Date('2023-01-01T00:00:00');
      const date2 = new Date('2023-12-31T23:59:59');
      
      expect(formatDate(date1)).toContain('Jan 1, 2023');
      expect(formatDate(date2)).toContain('Dec 31, 2023');
    });
  });

  describe('validateTransactionInput', () => {
    it('should validate correct input', () => {
      const result = validateTransactionInput('Valid transaction', 100);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty title', () => {
      const result = validateTransactionInput('', 100);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Transaction title is required');
    });

    it('should reject whitespace-only title', () => {
      const result = validateTransactionInput('   ', 100);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Transaction title is required');
    });

    it('should reject title that is too long', () => {
      const longTitle = 'A'.repeat(101);
      const result = validateTransactionInput(longTitle, 100);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Transaction title must be less than 100 characters');
    });

    it('should reject invalid amount types', () => {
      const result1 = validateTransactionInput('Valid title', NaN);
      const result2 = validateTransactionInput('Valid title', 'invalid' as any);
      
      expect(result1.isValid).toBe(false);
      expect(result1.errors).toContain('Amount must be a valid number');
      
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Amount must be a valid number');
    });

    it('should reject negative amounts', () => {
      const result = validateTransactionInput('Valid title', -100);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Amount cannot be negative');
    });

    it('should reject amounts that are too high', () => {
      const result = validateTransactionInput('Valid title', 1000001);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Amount cannot exceed $1,000,000');
    });

    it('should handle multiple validation errors', () => {
      const result = validateTransactionInput('', -100);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain('Transaction title is required');
      expect(result.errors).toContain('Amount cannot be negative');
    });

    it('should accept edge case amounts', () => {
      const result1 = validateTransactionInput('Valid title', 0);
      const result2 = validateTransactionInput('Valid title', 1000000);
      
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
    });
  });
});
