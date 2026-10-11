import { gateway } from 'ai'
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import type { LanguageModel } from 'ai'

export interface ModelResolution {
  model: LanguageModel | null
  providerName: string | null
  modelId: string | null
  isConfigured: boolean
  error?: string
}

export function resolveAIModel(): ModelResolution {
  const env = process.env

  // 1. Check Vercel AI Gateway
  const gatewayKey = env.AI_GATEWAY_API_KEY
  if (gatewayKey) {
    const modelId = env.AI_MODEL || 'anthropic/claude-3-5-sonnet-20241022'
    return {
      model: gateway(modelId) as unknown as LanguageModel,
      providerName: 'Vercel AI Gateway',
      modelId,
      isConfigured: true,
    }
  }

  // 2. Check OpenAI API Key
  const openAiKey = env.OPENAI_API_KEY
  if (openAiKey) {
    const modelId = env.AI_MODEL || 'gpt-4o-mini'
    return {
      model: openai(modelId) as unknown as LanguageModel,
      providerName: 'OpenAI',
      modelId,
      isConfigured: true,
    }
  }

  // 3. Check Google Generative AI / Gemini API Key
  const googleKey = env.GOOGLE_GENERATIVE_AI_API_KEY || env.GEMINI_API_KEY
  if (googleKey) {
    const modelId = env.AI_MODEL || 'gemini-3.5-flash'
    return {
      model: google(modelId) as unknown as LanguageModel,
      providerName: 'Google Gemini',
      modelId,
      isConfigured: true,
    }
  }

  // 4. Missing API Configuration
  return {
    model: null,
    providerName: null,
    modelId: null,
    isConfigured: false,
    error:
      'API Key belum dikonfigurasi di server. Silakan sediakan salah satu dari: AI_GATEWAY_API_KEY, OPENAI_API_KEY, atau GOOGLE_GENERATIVE_AI_API_KEY di dalam file .env.',
  }
}
