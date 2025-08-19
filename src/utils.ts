/**
 * Generates a unique ID for transactions
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Formats currency amounts
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/**
 * Formats dates for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Validates transaction input
 */
export function validateTransactionInput(title: string, amount: number): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!title || title.trim().length === 0) {
    errors.push('Transaction title is required');
  }

  if (title && title.trim().length > 100) {
    errors.push('Transaction title must be less than 100 characters');
  }

  if (typeof amount !== 'number' || isNaN(amount)) {
    errors.push('Amount must be a valid number');
  }

  if (amount < 0) {
    errors.push('Amount cannot be negative');
  }

  if (amount > 1000000) {
    errors.push('Amount cannot exceed $1,000,000');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Interface for Anthropic API request
 */
export interface AnthropicRequest {
  model: string;
  max_tokens: number;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  system?: string;
}

/**
 * Interface for Anthropic API response
 */
export interface AnthropicResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Calls Anthropic's Claude API
 * 
 * @param prompt - The user prompt to send to Claude
 * @param systemPrompt - Optional system prompt to set context
 * @param model - The model to use (default: claude-3-haiku-20240307)
 * @param maxTokens - Maximum tokens for response (default: 200)
 * @param temperature - Response creativity (0.0-1.0, default: 0.7)
 * @returns Promise with Claude's response
 */
export async function callAnthropic(
  prompt: string,
  systemPrompt?: string,
  model: string = 'claude-3-haiku-20240307',
  maxTokens: number = 200,
  temperature: number = 0.7
): Promise<string> {  
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  const request: AnthropicRequest = {
    model,
    max_tokens: maxTokens,
    temperature,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  };

  if (systemPrompt) {
    request.system = systemPrompt;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: AnthropicResponse = await response.json();
    
    if (data.content && data.content.length > 0) {
      return data.content[0].text;
    } else {
      throw new Error('No content received from Anthropic API');
    }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to call Anthropic API: ${error.message}`);
    } else {
      throw new Error('Failed to call Anthropic API: Unknown error');
    }
  }
}
