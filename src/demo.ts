#!/usr/bin/env node

/**
 * Demo script showing how to use the transaction classification system
 * 
 * Note: This will fail until the classify method is implemented in the Classifier class
 * 
 * Run this after building the project: npm run build
 */

import { Classifier } from "./classifier";
import { Transaction } from "./types";
import { formatCurrency } from "./utils";

async function runDemo() {
  console.log('🚀 Rise Exercise - Transaction Classification Demo\n');
  
  const classifier = new Classifier();
  
  // Sample transactions to test
  const sampleTransactions = [
    { title: 'Flight to Paris - Air France', amount: 1200 },
    { title: 'Amazon purchase - Electronics', amount: 250 },
    { title: 'Restaurant dinner - Italian', amount: 85 },
    { title: 'Movie tickets - Avengers', amount: 45 },
    { title: 'Electricity bill - January', amount: 120 },
    { title: 'Uber ride to airport', amount: 35 },
    { title: 'Online clothing store', amount: 180 },
    { title: 'Coffee shop - Starbucks', amount: 12 },
    { title: 'Hotel booking for weekend', amount: 350 },
    { title: 'Miscellaneous expense', amount: 75 }
  ];
  
  console.log('🔍 Classifying sample transactions...\n');
  
  for (const sample of sampleTransactions) {
    try {
      // Create a transaction object
      const transaction: Transaction = {
        id: 'demo',
        title: sample.title,
        amount: sample.amount,
        timestamp: new Date()
      };

      // Classify the transaction
      const result = await classifier.classify(transaction);
      
      console.log(`✅ ${sample.title}`);
      console.log(`   Amount: ${formatCurrency(sample.amount)}`);
      console.log(`   Category: ${result.category}`);
      console.log(`   Risk Level: ${result.riskLevel}`);
      console.log('');
      
    } catch (error) {
      console.log(`❌ ${sample.title}`);
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.log('');
    }
  }
  
  console.log('🎯 Demo completed!');
  console.log('\nTo run this demo successfully, implement the classify method in src/classifier.ts');
}

// Run the demo
runDemo().catch(console.error);
