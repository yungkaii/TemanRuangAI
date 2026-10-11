import { createFileRoute } from '@tanstack/react-router'
import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  smoothStream,
  type UIMessage,
} from 'ai'
import { z } from 'zod'
import { buildSystemPrompt, type ConversationMode } from '../../server/ai-personality'
import { resolveAIModel } from '../../server/ai-provider'

const chatRequestSchema = z.object({
  messages: z.array(z.any()).min(1, 'Daftar pesan tidak boleh kosong').max(50, 'Riwayat pesan melebihi batas (maksimal 50)'),
  mode: z.enum(['listen', 'advice', 'solution']).optional().default('listen'),
})

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const parseResult = chatRequestSchema.safeParse(body)

          if (!parseResult.success) {
            return new Response(
              JSON.stringify({
                error: 'VALIDATION_ERROR',
                message: 'Format permintaan tidak valid.',
                details: parseResult.error.format(),
              }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
              }
            )
          }

          const { messages, mode } = parseResult.data

          // Protect against excessive message sizes
          const lastMsg = messages[messages.length - 1]
          const lastText =
            typeof lastMsg?.text === 'string'
              ? lastMsg.text
              : Array.isArray(lastMsg?.parts)
              ? lastMsg.parts
                  .map((p: any) => (p?.type === 'text' ? p.text : ''))
                  .join('')
              : ''

          if (lastText.length > 4000) {
            return new Response(
              JSON.stringify({
                error: 'MESSAGE_TOO_LONG',
                message: 'Pesan terlalu panjang. Maksimal 4000 karakter per pesan untuk kenyamanan membaca.',
              }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
              }
            )
          }

          // Resolve model from environment
          const { model, isConfigured } = resolveAIModel()

          if (!isConfigured || !model) {
            return new Response(
              JSON.stringify({
                error: 'API_KEY_MISSING',
                message:
                  'Kunci API (API Key) belum dikonfigurasi di server. Silakan sediakan salah satu dari: AI_GATEWAY_API_KEY, OPENAI_API_KEY, atau GOOGLE_GENERATIVE_AI_API_KEY di dalam file .env.',
                supportedProviders: [
                  'AI_GATEWAY_API_KEY (Vercel AI Gateway)',
                  'OPENAI_API_KEY (OpenAI - misal gpt-4o-mini)',
                  'GOOGLE_GENERATIVE_AI_API_KEY / GEMINI_API_KEY (Google Gemini)',
                ],
                instructions:
                  'Salin file .env.example menjadi .env, lalu tambahkan API key yang valid.',
              }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
              }
            )
          }

          const systemPrompt = buildSystemPrompt(mode as ConversationMode)
          const modelMessages = await convertToModelMessages(messages as UIMessage[])

          const result = streamText({
            model,
            system: systemPrompt,
            messages: modelMessages,
            experimental_transform: smoothStream({
              chunking: 'word',
            }),
          })

          return createUIMessageStreamResponse({
            stream: toUIMessageStream({
              stream: result.stream,
              onError: (error: any) => {
                const msg = error?.message || String(error)
                console.error('[TemanRuang AI] Stream error:', error)
                if (
                  msg.includes('credit card') ||
                  msg.includes('customer_verification_required')
                ) {
                  return 'Vercel AI Gateway memerlukan verifikasi kartu kredit di akun Vercel Anda untuk mengaktifkan free credits (kunjungi https://vercel.com/ai). Alternatif mudah & gratis tanpa kartu kredit: Gunakan Google Gemini API Key dari https://aistudio.google.com/.'
                }
                return msg
              },
            }),
          })
        } catch (err: any) {
          console.error('[TemanRuang AI] Error in /api/chat:', err)
          return new Response(
            JSON.stringify({
              error: 'SERVER_ERROR',
              message:
                err?.message ||
                'Terjadi kesalahan internal saat memproses percakapan dengan AI.',
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            }
          )
        }
      },
    },
  },
})
