# Transaction Classification Rules

This document describes how the transaction classification system works, including the rules for categorizing transactions and calculating risk levels.

## Overview

The classification system analyzes transaction titles using keyword matching and calculates risk levels based on transaction amounts. Each category has its own set of keywords and amount thresholds.

## Categories and Keywords

### 1. Travel
**Keywords:** flight, hotel, airline, booking, reservation, trip, vacation, travel, transport, uber, lyft, taxi

**Description:** Transactions related to transportation, accommodation, and travel services.

**Examples:**
- "Flight to Paris - Air France" → Travel
- "Hotel booking for weekend" → Travel
- "Uber ride to airport" → Travel
- "Car rental - Enterprise" → Travel

### 2. E-commerce
**Keywords:** amazon, ebay, shop, store, online, purchase, order, buy, retail, marketplace

**Description:** Online shopping and retail transactions.

**Examples:**
- "Amazon purchase - Electronics" → E-commerce
- "Online clothing store" → E-commerce
- "Ebay auction win" → E-commerce
- "Online marketplace purchase" → E-commerce

### 3. Food
**Keywords:** restaurant, cafe, food, dining, meal, lunch, dinner, breakfast, groceries, supermarket, takeout

**Description:** Food and beverage related transactions.

**Examples:**
- "Restaurant dinner - Italian" → Food
- "Coffee shop - Starbucks" → Food
- "Grocery shopping - Whole Foods" → Food
- "Takeout delivery - Pizza" → Food

### 4. Entertainment
**Keywords:** movie, theater, concert, show, game, entertainment, ticket, event, festival, cinema

**Description:** Entertainment and leisure activities.

**Examples:**
- "Movie tickets - Avengers" → Entertainment
- "Concert - Taylor Swift" → Entertainment
- "Theater show - Hamilton" → Entertainment
- "Gaming subscription" → Entertainment

### 5. Utilities
**Keywords:** bill, electricity, water, gas, internet, phone, utility, service, subscription, payment

**Description:** Essential services and recurring bills.

**Examples:**
- "Electricity bill - January" → Utilities
- "Internet service payment" → Utilities
- "Phone bill - Verizon" → Utilities
- "Water utility payment" → Utilities

### 6. Other
**Keywords:** None (default category)

**Description:** Transactions that don't match any of the above categories.

**Examples:**
- "Miscellaneous expense" → Other
- "Unknown transaction" → Other
- "General purchase" → Other

## Risk Level Calculation

Risk levels are calculated based on transaction amounts, with different thresholds for each category. The thresholds reflect typical spending patterns and risk profiles for each category.

### Risk Level Thresholds

| Category | Low Risk | Medium Risk | High Risk |
|----------|----------|-------------|-----------|
| Travel | ≤ $100 | ≤ $500 | > $500 |
| E-commerce | ≤ $50 | ≤ $200 | > $200 |
| Food | ≤ $25 | ≤ $75 | > $75 |
| Entertainment | ≤ $30 | ≤ $100 | > $100 |
| Utilities | ≤ $50 | ≤ $150 | > $150 |
| Other | ≤ $100 | ≤ $500 | > $500 |

### Risk Level Logic

```typescript
if (amount <= lowThreshold) return RiskLevel.LOW;
if (amount <= mediumThreshold) return RiskLevel.MEDIUM;
return RiskLevel.HIGH;
```

### Examples

**Travel:**
- $45 Uber ride → Low Risk
- $350 hotel booking → Medium Risk
- $1200 flight → High Risk

**E-commerce:**
- $30 online purchase → Low Risk
- $150 electronics → Medium Risk
- $250 clothing → High Risk

**Food:**
- $20 restaurant lunch → Low Risk
- $60 dinner → Medium Risk
- $100 fancy dinner → High Risk

## Implementation Notes

1. **Keyword Matching:** Keywords are matched case-insensitively against the transaction title.

2. **Category Selection:** The first category with matching keywords is selected. If multiple categories have keywords that match, the first one in the rules array is chosen.

3. **Default Category:** If no keywords match any category, the transaction is classified as "Other".

4. **Risk Calculation:** Risk levels are calculated using the thresholds for the selected category.

5. **Edge Cases:** Transactions exactly at threshold amounts are classified as the lower risk level (e.g., $100 travel transaction = Low Risk).

## Testing Requirements

The implementation should pass the following test scenarios:

1. **Travel Classification:** Flight transactions should be classified as Travel with appropriate risk levels.
2. **E-commerce Classification:** Online purchases should be classified as E-commerce with appropriate risk levels.
3. **No Matches:** Transactions with no keyword matches should default to Other category.
4. **Risk Level Boundaries:** Risk levels should be calculated correctly at threshold boundaries.

## Example Implementation

```typescript
public classify(transaction: Transaction): ClassifierResult {
  // Find the best matching category
  const category = this.findCategory(transaction.title);
  
  // Calculate risk level based on amount and category
  const riskLevel = this.calculateRiskLevel(transaction.amount, category);
  
  return {
    category,
    riskLevel
  };
}
```

This implementation should provide accurate classification and risk assessment for all transaction types while maintaining good performance and readability.
