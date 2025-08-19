# Rise Exercise - Transaction Classification

This is an exercise project for testing coding skills. The project involves building a transaction classification system with a command-line interface.

## Project Structure

```
src/
├── index.ts              # Main CLI entry point
├── types.ts              # Type definitions
├── classifier.ts         # Transaction classification logic (to be implemented)
├── service.ts            # Transaction service
└── utils.ts              # Utility functions
```

## Features

- **Transaction Classification**: Categorize transactions based on title keywords
- **Risk Assessment**: Calculate risk levels based on amount and category
- **Command Line Interface**: Built with Commander.js
- **TypeScript**: Full type safety
- **Testing**: Jest test suite with existing tests
- **Docker Support**: Run without installing Node.js locally
- **AI Integration**: Optional Anthropic Claude API integration

## Categories

The system supports the following transaction categories:
- **Travel**: Flights, hotels, transportation
- **E-commerce**: Online shopping, retail
- **Food**: Restaurants, groceries, dining
- **Entertainment**: Movies, games, events
- **Utilities**: Bills, services, subscriptions
- **Other**: Uncategorized transactions

## Risk Levels

Risk levels are calculated based on transaction amount and category:
- **Low**: Small amounts, low-risk categories
- **Medium**: Moderate amounts, medium-risk categories
- **High**: Large amounts, high-risk categories

## Environment Setup

### Anthropic API (Optional)

If you want to use the AI classification features, you'll need an Anthropic API key:

1. **Get an API key** from [Anthropic Console](https://console.anthropic.com/)
2. **Create a `.env` file** in the project root:
   ```bash
   cp env.example .env
   ```
3. **Add your API key** to the `.env` file:
   ```bash
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

## Installation & Setup

### Option 1: Local Installation

```bash
npm install
```

### Option 2: Docker

```bash
# Build Docker images
./docker-run.sh build

# Run the application
./docker-run.sh run

# Classify a transaction
./docker-run.sh classify "Flight to Paris" 1200

# Run tests
./docker-run.sh test

# Open shell in container
./docker-run.sh shell
```

## Development

### Local Development

```bash
# Build the project
npm run build

# Watch mode for development
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Docker Development

```bash
# Build and run development environment
./docker-run.sh dev

# Run tests in Docker
./docker-run.sh test

# Open development shell
./docker-run.sh shell-dev
```

## Usage

### Local Usage

```bash
# Classify a transaction
npm start classify --title "Flight to Paris" --amount 1200

# Or run directly
node dist/index.js classify --title "Hotel booking" --amount 300
```

### Docker Usage

```bash
# Using the helper script
./docker-run.sh classify "Restaurant dinner" 85

# Direct Docker commands
docker-compose run --rm rise-exercise node dist/index.js classify --title "Uber ride" --amount 35
```

## Exercise

The main exercise is to implement the `classify` method in `src/classifier.ts`. This method should:

1. Analyze the transaction title to determine the category
2. Calculate the risk level based on amount and category
3. Return a `ClassifierResult` object

The implementation should pass the existing tests and follow the classification rules described in the documentation.

## Testing

### Local Testing

```bash
npm test
```

### Docker Testing

```bash
./docker-run.sh test
```

The tests will verify that:
- Travel transactions are properly categorized
- Risk levels are calculated correctly for different amounts and categories

## Docker Commands Reference

| Command | Description |
|---------|-------------|
| `./docker-run.sh build` | Build Docker images |
| `./docker-run.sh run` | Start production service |
| `./docker-run.sh dev` | Start development service |
| `./docker-run.sh test` | Run tests in Docker |
| `./docker-run.sh classify "Title" amount` | Classify a transaction |
| `./docker-run.sh shell` | Open shell in production container |
| `./docker-run.sh shell-dev` | Open shell in development container |
| `./docker-run.sh clean` | Remove containers and images |
| `./docker-run.sh help` | Show help message |
