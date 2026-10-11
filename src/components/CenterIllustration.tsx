export default function CenterIllustration() {
  const line = '#8E9BF2'
  const star = 'M0 -9 C1 -3 3 -1 9 0 C3 1 1 3 0 9 C-1 3 -3 1 -9 0 C-3 -1 -1 -3 0 -9Z'
  return (
    <div className="flex flex-col items-center justify-center select-none py-2 pointer-events-none">
      <div className="relative w-[240px] h-[126px] sm:w-[300px] sm:h-[158px] lg:w-[330px] lg:h-[174px]">
        <svg viewBox="0 0 440 232" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* ground shadow */}
          <ellipse cx="220" cy="196" rx="205" ry="13" fill="#E8EBF8" opacity="0.8" />

          {/* sparkles & dots */}
          <path d={star} transform="translate(296 52)" fill="#FBD36B" />
          <path d={star} transform="translate(412 178) scale(0.7)" fill="#FBD36B" />
          <path d={star} transform="translate(34 160) scale(0.7)" fill="#FBD36B" opacity="0.8" />
          <circle cx="132" cy="88" r="4" fill="#BFC8FA" />
          <circle cx="394" cy="136" r="3.5" fill="#CBD2FB" />
          <path d="M327 78c-3-6-12-3-9 4 2 4 9 8 9 8s7-4 9-8c3-7-6-10-9-4z" stroke={line} strokeWidth="1.8" fill="#F4F6FF" transform="translate(0 -4)" />

          {/* speech bubble with heart */}
          <path d="M186 6c-19 0-33 12-33 28 0 11 7 20 17 25l-3 13 17-11c1 0 2 0 2 0 19 0 33-12 33-27S205 6 186 6z" fill="#F4F6FF" stroke={line} strokeWidth="2" strokeLinejoin="round" />
          <path d="M186 48l-12-11c-5-5-2-13 5-13 3 0 6 2 7 4 1-2 4-4 7-4 7 0 10 8 5 13z" fill="#8B98FA" />

          {/* plant */}
          <g stroke={line} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            <path d="M52 168l4 24h32l4-24z" fill="#F4F6FF" />
            <path d="M50 162h46v6H50z" fill="#E3E7FD" />
            <path d="M72 162c-2-18-1-34 8-48" />
            <path d="M80 114c14 2 20 14 16 28-14-2-20-14-16-28z" fill="#C7EBD8" />
            <path d="M74 146c-12-2-20-10-20-22 12 0 20 8 20 22z" fill="#B6E4CA" />
          </g>

          {/* books */}
          <g stroke={line} strokeWidth="2" strokeLinejoin="round">
            <rect x="96" y="172" width="70" height="20" rx="3" fill="#FDE9A6" />
            <rect x="100" y="152" width="66" height="20" rx="3" fill="#B9C3FA" />
            <path d="M108 152v20M104 172v20" strokeWidth="1.5" />
          </g>

          {/* cushion */}
          <ellipse cx="228" cy="172" rx="108" ry="30" fill="#C9D6FB" stroke={line} strokeWidth="2" />
          <path d="M150 176c40 18 118 18 156 0" stroke="#A9BBF7" strokeWidth="2" strokeLinecap="round" />

          {/* cloud mascot */}
          <path d="M170 168h116c20 0 33-14 33-32 0-16-12-28-27-30-3-20-21-34-41-34-14 0-26 6-33 16-6-4-13-6-21-6-22 0-38 16-38 36-12 4-18 14-18 26 0 14 11 24 29 24z" fill="#FFFFFF" stroke={line} strokeWidth="2.4" strokeLinejoin="round" />
          <ellipse cx="212" cy="132" rx="4.5" ry="8" fill="#3A3F9E" />
          <ellipse cx="256" cy="132" rx="4.5" ry="8" fill="#3A3F9E" />
          <circle cx="213.5" cy="128.5" r="1.5" fill="#fff" />
          <circle cx="257.5" cy="128.5" r="1.5" fill="#fff" />
          <ellipse cx="193" cy="143" rx="10" ry="6" fill="#FFB7CF" opacity="0.9" />
          <ellipse cx="275" cy="143" rx="10" ry="6" fill="#FFB7CF" opacity="0.9" />
          <path d="M227 141q7 7 14 0" stroke="#3A3F9E" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="204" cy="168" rx="13" ry="7" fill="#fff" stroke={line} strokeWidth="2" />
          <ellipse cx="264" cy="168" rx="13" ry="7" fill="#fff" stroke={line} strokeWidth="2" />

          {/* mug */}
          <g stroke={line} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M366 138c-4-6 3-10-1-16M376 140c-4-6 3-10-1-16" stroke="#BFC8FA" />
            <rect x="352" y="148" width="40" height="42" rx="10" fill="#fff" />
            <path d="M392 156c10 0 14 6 14 12s-4 12-14 12" />
            <circle cx="364" cy="166" r="1.8" fill="#3A3F9E" stroke="none" />
            <circle cx="380" cy="166" r="1.8" fill="#3A3F9E" stroke="none" />
            <path d="M368 172q4 4 8 0" stroke="#3A3F9E" />
          </g>
        </svg>
      </div>

      {/* caption */}
      <div className="mt-3 text-center space-y-0.5">
        <p className="font-hand text-sm sm:text-base text-[#3B47A8] dark:text-[#C7D2FE] tracking-[0.08em]">Kamu nggak sendiri,</p>
        <p className="font-hand text-sm sm:text-base text-[#3B47A8] dark:text-[#C7D2FE] tracking-[0.08em]">aku selalu ada di sini.</p>
        <div className="flex items-center justify-center gap-2 pt-1.5">
          <span className="w-5 h-px bg-[#C3CBF3]" />
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#8B98FA]"><path d="M12 21l-1.5-1.4C5.4 15 2 12 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.100 3.800 14.800 3 16.500 3 19.600 3 22 5.400 22 8.500c0 3.500-3.400 6.500-8.500 11.100L12 21z" /></svg>
          <span className="w-5 h-px bg-[#C3CBF3]" />
        </div>
      </div>
    </div>
  )
}
