import React, { useMemo } from 'react'

interface MarkdownContentProps {
  content: string
  className?: string
}

interface InlineToken {
  type: 'text' | 'bold_italic' | 'bold' | 'italic' | 'code' | 'strike'
  content: string
}

interface OrderedListItem {
  number: string
  title: string
  body: string[]
}

interface BulletListItem {
  title: string
  body: string[]
}

type Block =
  | { type: 'paragraph'; lines: string[] }
  | { type: 'heading'; level: number; content: string }
  | { type: 'quote'; content: string }
  | { type: 'ordered_list'; items: OrderedListItem[] }
  | { type: 'bullet_list'; items: BulletListItem[] }
  | { type: 'code_block'; language: string; code: string }

function parseInlineTokens(text: string): InlineToken[] {
  if (!text) return []
  const tokens: InlineToken[] = []

  // Matches:
  // 1. ***bold italic***
  // 2. **bold** or __bold__
  // 3. *italic* or _italic_
  // 4. `code`
  // 5. ~~strike~~
  // 6. Unclosed ** or * at the end of the text (supports active streaming seamlessly)
  const regex = /(\*\*\*[^*]+?\*\*\*|\*\*[^*]+?\*\*|__[^_]+?__|(?<!\*)\*[^*\n]+?\*(?!\*)|(?<!_)_[^_\n]+?_(?!_)|`[^`]+`|~~[^~]+~~|\*\*[^*]+$|\*[^*\n]+$)/g

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }

    const m = match[0]
    if (m.startsWith('***') && m.endsWith('***') && m.length >= 6) {
      tokens.push({ type: 'bold_italic', content: m.slice(3, -3) })
    } else if (((m.startsWith('**') && m.endsWith('**')) || (m.startsWith('__') && m.endsWith('__'))) && m.length >= 4) {
      tokens.push({ type: 'bold', content: m.slice(2, -2) })
    } else if (m.startsWith('**')) {
      // Streaming unclosed bold
      tokens.push({ type: 'bold', content: m.slice(2) })
    } else if (((m.startsWith('*') && m.endsWith('*')) || (m.startsWith('_') && m.endsWith('_'))) && m.length >= 2) {
      tokens.push({ type: 'italic', content: m.slice(1, -1) })
    } else if (m.startsWith('*')) {
      // Streaming unclosed italic
      tokens.push({ type: 'italic', content: m.slice(1) })
    } else if (m.startsWith('`') && m.endsWith('`') && m.length >= 2) {
      tokens.push({ type: 'code', content: m.slice(1, -1) })
    } else if (m.startsWith('~~') && m.endsWith('~~') && m.length >= 4) {
      tokens.push({ type: 'strike', content: m.slice(2, -2) })
    } else {
      tokens.push({ type: 'text', content: m })
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return tokens
}

function renderInline(text: string): React.ReactNode {
  const tokens = parseInlineTokens(text)
  return tokens.map((token, idx) => {
    switch (token.type) {
      case 'bold_italic':
        return (
          <strong key={idx} className="font-bold italic text-[#1B2361] dark:text-white">
            {token.content}
          </strong>
        )
      case 'bold':
        return (
          <strong key={idx} className="font-bold text-[#1B2361] dark:text-white">
            {token.content}
          </strong>
        )
      case 'italic':
        return (
          <em key={idx} className="italic text-[#37429D] dark:text-[#E2E8F0]">
            {token.content}
          </em>
        )
      case 'code':
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded-md bg-[#E2E7FD] dark:bg-indigo-950/70 text-[#4F5BD5] dark:text-[#A5B4FC] font-mono text-[13px]"
          >
            {token.content}
          </code>
        )
      case 'strike':
        return (
          <del key={idx} className="line-through text-[#8E95AF]">
            {token.content}
          </del>
        )
      default:
        return <React.Fragment key={idx}>{token.content}</React.Fragment>
    }
  })
}

function parseBlocks(text: string): Block[] {
  // Split code blocks first
  const parts = text.split(/(```[\s\S]*?```)/g)
  const blocks: Block[] = []

  for (const part of parts) {
    if (!part) continue
    if (part.startsWith('```') && part.endsWith('```')) {
      const firstLineEnd = part.indexOf('\n')
      let language = ''
      let code = ''
      if (firstLineEnd !== -1) {
        language = part.slice(3, firstLineEnd).trim()
        code = part.slice(firstLineEnd + 1, -3)
      } else {
        code = part.slice(3, -3)
      }
      blocks.push({ type: 'code_block', language, code })
      continue
    }

    // Split text into paragraphs by 2 or more newlines
    const paragraphs = part.split(/\n\n+/)
    for (const para of paragraphs) {
      const trimmed = para.trim()
      if (!trimmed) continue

      // Headings
      if (/^#{1,3}\s+/.test(trimmed)) {
        const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)/s)
        if (headingMatch) {
          blocks.push({
            type: 'heading',
            level: headingMatch[1].length,
            content: headingMatch[2],
          })
          continue
        }
      }

      // Blockquote
      if (trimmed.startsWith('> ') || trimmed.startsWith('>\n')) {
        const content = trimmed.replace(/^>\s?/gm, '')
        blocks.push({ type: 'quote', content })
        continue
      }

      // Ordered list check
      const lines = trimmed.split('\n')
      const isOrderedList = /^\d+[\.\)]\s+/.test(lines[0])
      const isBulletList = /^[\-\*\•]\s+/.test(lines[0])

      if (isOrderedList) {
        const items: OrderedListItem[] = []
        let currentItem: OrderedListItem | null = null

        for (const line of lines) {
          const match = line.match(/^(\d+)[\.\)]\s+(.*)/)
          if (match) {
            if (currentItem) items.push(currentItem)
            currentItem = { number: match[1], title: match[2], body: [] }
          } else if (currentItem) {
            if (line.trim()) currentItem.body.push(line.trim())
          } else {
            items.push({ number: '', title: line, body: [] })
          }
        }
        if (currentItem) items.push(currentItem)
        blocks.push({ type: 'ordered_list', items })
        continue
      }

      if (isBulletList) {
        const items: BulletListItem[] = []
        let currentItem: BulletListItem | null = null

        for (const line of lines) {
          const match = line.match(/^[\-\*\•]\s+(.*)/)
          if (match) {
            if (currentItem) items.push(currentItem)
            currentItem = { title: match[1], body: [] }
          } else if (currentItem) {
            if (line.trim()) currentItem.body.push(line.trim())
          } else {
            items.push({ title: line, body: [] })
          }
        }
        if (currentItem) items.push(currentItem)
        blocks.push({ type: 'bullet_list', items })
        continue
      }

      // Normal paragraph
      blocks.push({ type: 'paragraph', lines })
    }
  }

  return blocks
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  const blocks = useMemo(() => parseBlocks(content), [content])

  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            if (block.level === 1) {
              return (
                <h1 key={idx} className="text-lg font-bold text-[#1B2361] dark:text-white mt-3 mb-1">
                  {renderInline(block.content)}
                </h1>
              )
            }
            if (block.level === 2) {
              return (
                <h2 key={idx} className="text-base font-bold text-[#1B2361] dark:text-white mt-2.5 mb-1">
                  {renderInline(block.content)}
                </h2>
              )
            }
            return (
              <h3 key={idx} className="text-[15px] font-semibold text-[#1B2361] dark:text-white mt-2 mb-0.5">
                {renderInline(block.content)}
              </h3>
            )
          }

          case 'quote':
            return (
              <blockquote
                key={idx}
                className="border-l-3 border-[#7886FA] pl-3.5 py-1 my-2 bg-[#EEF2FF]/40 dark:bg-indigo-950/30 rounded-r-xl italic text-[#4A5580] dark:text-[#CBD5E1]"
              >
                {renderInline(block.content)}
              </blockquote>
            )

          case 'code_block':
            return (
              <div
                key={idx}
                className="my-2.5 overflow-hidden rounded-xl border border-[#DDE3FA] dark:border-[#2D3748] bg-[#1E2238] text-white shadow-sm"
              >
                {block.language && (
                  <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#171A2B] text-[11px] font-mono text-[#94A3B8] border-b border-[#2D3748]/70">
                    <span>{block.language}</span>
                  </div>
                )}
                <pre className="p-3.5 overflow-x-auto text-xs font-mono leading-relaxed text-[#E2E8F0]">
                  <code>{block.code}</code>
                </pre>
              </div>
            )

          case 'ordered_list':
            return (
              <div key={idx} className="space-y-2.5 my-2">
                {block.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-2.5">
                    {item.number ? (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E2E7FD] dark:bg-indigo-950/80 text-[11px] font-bold text-[#5563E6] dark:text-[#939BFB] mt-0.5 select-none">
                        {item.number}
                      </span>
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7886FA] mt-2 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1B2361] dark:text-white leading-relaxed">
                        {renderInline(item.title)}
                      </div>
                      {item.body.map((bodyLine, bodyIdx) => (
                        <p
                          key={bodyIdx}
                          className="text-sm sm:text-[15px] text-[#4A5580] dark:text-[#C7D2FE] leading-relaxed mt-1"
                        >
                          {renderInline(bodyLine)}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )

          case 'bullet_list':
            return (
              <ul key={idx} className="space-y-2 my-2">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7886FA] mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="leading-relaxed">
                        {renderInline(item.title)}
                      </div>
                      {item.body.map((bodyLine, bodyIdx) => (
                        <p
                          key={bodyIdx}
                          className="text-sm sm:text-[15px] text-[#4A5580] dark:text-[#C7D2FE] leading-relaxed mt-0.5"
                        >
                          {renderInline(bodyLine)}
                        </p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )

          case 'paragraph':
          default:
            return (
              <p key={idx} className="mb-2.5 last:mb-0 leading-[1.65]">
                {block.lines.map((line, lineIdx) => {
                  const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ')
                  const cleanLine = isBullet ? line.trim().replace(/^[\-\*]\s+/, '') : line
                  return (
                    <span
                      key={lineIdx}
                      className={isBullet ? 'flex items-start gap-2 pl-1 my-1' : 'block'}
                    >
                      {isBullet && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#7886FA] mt-2 shrink-0" />
                      )}
                      <span className="flex-1">{renderInline(cleanLine)}</span>
                    </span>
                  )
                })}
              </p>
            )
        }
      })}
    </div>
  )
}
