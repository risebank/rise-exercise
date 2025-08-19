#!/usr/bin/env node

// Load environment variables for AI features
import 'dotenv/config';

import { Command } from 'commander';
import { Classifier } from './classifier';
import { validateTransactionInput, formatCurrency } from './utils';
import { Transaction } from './types';

const program = new Command();
const classifier = new Classifier();

program
  .name('rise-exercise')
  .description('Transaction classification exercise for potential employees')
  .version('1.0.0');

program
  .command('classify')
  .description('Classify a transaction by title and amount using rule-based classification')
  .requiredOption('-t, --title <title>', 'Transaction title')
  .requiredOption('-a, --amount <amount>', 'Transaction amount')
  .action(async (options) => {
    const amount = parseFloat(options.amount);
    
    const validation = validateTransactionInput(options.title, amount);
    if (!validation.isValid) {
      console.error('Validation errors:');
      validation.errors.forEach(error => console.error(`  - ${error}`));
      process.exit(1);
    }

    try {
      // Create a transaction object
      const transaction: Transaction = {
        id: 'temp',
        title: options.title,
        amount: amount,
        timestamp: new Date()
      };

      // Classify the transaction using rule-based classification
      const result = await classifier.classify(transaction);
      
      console.log('\n🔍 Transaction Classification Result (Rule-based)');
      console.log('===============================================');
      console.log(`📝 Title: ${transaction.title}`);
      console.log(`💰 Amount: ${formatCurrency(transaction.amount)}`);
      console.log(`🏷️  Category: ${result.category}`);
      console.log(`⚠️  Risk Level: ${result.riskLevel}`);
      
    } catch (error) {
      console.error('❌ Error classifying transaction:', error);
      process.exit(1);
    }
  });

program
  .command('classify-ai')
  .description('Classify a transaction using Claude AI for category determination')
  .requiredOption('-t, --title <title>', 'Transaction title')
  .requiredOption('-a, --amount <amount>', 'Transaction amount')
  .action(async (options) => {
    const amount = parseFloat(options.amount);
    
    const validation = validateTransactionInput(options.title, amount);
    if (!validation.isValid) {
      console.error('Validation errors:');
      validation.errors.forEach(error => console.error(`  - ${error}`));
      process.exit(1);
    }

    try {
      // Create a transaction object
      const transaction: Transaction = {
        id: 'temp',
        title: options.title,
        amount: amount,
        timestamp: new Date()
      };

      // TODO: Implement classifyAI method in Classifier class
      console.log('🤖 AI classification not yet implemented');
      console.log('💡 Please implement the classifyAI method in src/classifier.ts');
      
      // For now, use rule-based classification
      const result = await classifier.classifyAnthropic(transaction);
      
      console.log('\n🔄 Using Rule-based Classification (AI not implemented yet)');
      console.log('=========================================================');
      console.log(`📝 Title: ${transaction.title}`);
      console.log(`💰 Amount: ${formatCurrency(transaction.amount)}`);
      console.log(`🏷️  Category: ${result.category}`);
      console.log(`⚠️  Risk Level: ${result.riskLevel}`);
      
    } catch (error) {
      console.error('❌ Error classifying transaction:', error);
      process.exit(1);
    }
  });

// Handle unknown commands
program.on('command:*', () => {
  console.error('❌ Invalid command. Use --help for available commands.');
  process.exit(1);
});

// Show help if no arguments provided
if (process.argv.length === 2) {
  program.help();
}

// Load environment variables when CLI actually runs
// loadDotenv(); // This line is removed as per the edit hint

program.parse();
