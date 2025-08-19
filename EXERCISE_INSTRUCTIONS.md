# 🎯 Rise Exercise - Implementation Instructions

## Overview

You have been given a transaction classification system with missing implementations. Your task is to complete **two main tasks** to make the system fully functional.

## Task 1: Implement Basic Classification

**File:** `src/classifier.ts`  
**Method:** `public classify(transaction: Transaction): ClassifierResult`

### What You Need to Do

1. **Implement the `classify` method** in the `Classifier` class
2. **Use the available helper method** `calculateRiskLevel(amount: number, category: TransactionCategory)`
3. **Return a `ClassifierResult`** with:
   - `category`: The determined transaction category
   - `riskLevel`: The calculated risk level (low/medium/high)

### Implementation Hints

- Create `findCategory()` helper method to determine the category
- Use the existing `calculateRiskLevel()` helper method to determine risk level
- The method should call both helpers and return the result

### Expected Behavior

Based on the existing tests, your implementation should:

1. **Classify travel transactions correctly:**
   - "Flight to Paris - Air France" → Travel category, High risk (amount > $1000)

2. **Classify e-commerce transactions correctly:**
   - "Amazon purchase - Electronics" → E-commerce category, High risk (amount > $200)

3. **Handle edge cases:**
   - Transactions with no keyword matches → Other category
   - Risk levels calculated at threshold boundaries

## Task 2: Implement AI-Powered Classification

**File:** `src/classifier.ts`  
**Method:** `public async classifyAI(transaction: Transaction): Promise<ClassifierResult>`

**File:** `src/index.ts`  
**New Command:** `classify-ai`

### What You Need to Do

1. **Implement the `classifyAI` method:**
   - Use Claude Haiku model (`claude-3-haiku-20240307`)
   - Use the existing `callAnthropic()` helper method in `src/utils.ts`
   - Ask Claude to determine the category only (not risk level)
   - Use the existing `calculateRiskLevel()` helper for risk calculation

2. **Add new CLI command `classify-ai`:**
   - Takes the same parameters as `classify` (title and amount)
   - Uses AI for category determination
   - Shows both AI category and calculated risk level

## Testing Your Implementation

### Option 1: Local Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

### Option 2: Docker

1. **Build Docker images:**
   ```bash
   ./docker-run.sh build
   ```

2. **Run tests:**
   ```bash
   ./docker-run.sh test
   ```

3. **All tests should pass** if your implementation is correct (task 1)

## Environment Setup for AI Features

To use the AI classification features, you'll need an Anthropic API key:

1. **Get an API key** from [Anthropic Console](https://console.anthropic.com/)
2. **Create a `.env` file** in the project root:
   ```bash
   cp env.example .env
   ```
3. **Add your API key** to the `.env` file:
   ```bash
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

## Available Commands

### Local Commands
- `npm test` - Run all tests
- `npm test:watch` - Run tests in watch mode
- `npm run build` - Build the project
- `npm start` - Run the CLI application

### Docker Commands
- `./docker-run.sh test` - Run tests in Docker
- `./docker-run.sh classify "Title" amount` - Test basic classification
- `./docker-run.sh classify-ai "Title" amount` - Test AI classification
- `./docker-run.sh shell` - Open shell in container
- `./docker-run.sh help` - Show all available commands

## CLI Usage Examples

Once implemented, you can test both classification methods:

### Basic Classification
```bash
# Local usage
npm start classify --title "Flight to Paris" --amount 1200

# Docker usage
./docker-run.sh classify "Hotel booking" 300
```

### AI Classification
```bash
# Local usage
npm start classify-ai --title "Flight to Paris" --amount 1200

# Docker usage
./docker-run.sh classify-ai "Restaurant dinner" 85
```

## Success Criteria

### Task 1: Basic Classification ✅
- **All tests pass**
- **Travel transactions are classified correctly**
- **E-commerce transactions are classified correctly**
- **Risk levels are calculated correctly**
- **Edge cases are handled properly**

### Task 2: AI Classification ✅
- **AI classification works with valid API key**
- **Claude Haiku determines categories somewhat reasonably**
- **Risk levels calculated using existing helper**
- **New `classify-ai` CLI command works**
- **Graceful fallback when AI fails**

## Getting Help

- Check the `docs/CLASSIFICATION_RULES.md` file for detailed rules
- Review the existing test files to understand expected behavior
- Look at the helper methods in the `Classifier` class
- Use `./docker-run.sh help` to see all available Docker commands

## Good Luck! 🚀

Take your time to understand the requirements and implement both tasks. The existing code structure, helper methods, and tests should guide you to the correct implementation.

**Pro Tip:** Use Docker if you don't have Node.js installed locally - it's the easiest way to get started!
