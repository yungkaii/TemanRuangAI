interface CloudMascotProps {
  className?: string
  size?: number
  variant?: 'logo' | 'avatar' | 'sleeping'
}

export default function CloudMascot({
  className = '',
  size = 48,
  variant = 'logo',
}: CloudMascotProps) {
  if (variant === 'avatar') {
    return (
      <div
        className={`relative flex items-center justify-center rounded-full bg-[#E3E7FD] dark:bg-indigo-950/50 text-[#7380FA] overflow-hidden p-1 ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 70"
          className="w-4/5 h-4/5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud Body */}
          <path
            d="M26 58H76C87.0457 58 96 49.0457 96 38C96 27.5332 87.9734 18.9419 77.7126 18.0864C75.2946 9.07172 67.043 2.5 57.25 2.5C48.9189 2.5 41.6706 7.27976 38.3842 14.2882C35.2536 12.1895 31.4725 11 27.4 11C16.6858 11 8 19.6858 8 30.4C8 32.2359 8.25488 34.0125 8.73038 35.698C4.78772 38.8688 2.25 43.8398 2.25 49.4C2.25 54.1497 5.90025 58 10.4 58H26Z"
            fill="#FFFFFF"
            stroke="#3B4BB8"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          
          {/* Dot Eyes */}
          <circle cx="38" cy="36" r="3.4" fill="#2B3590" />
          <circle cx="62" cy="36" r="3.4" fill="#2B3590" />
          {/* Blushing Cheeks */}
          <ellipse cx="28" cy="42" rx="4.5" ry="2.5" fill="#FFA3C2" />
          <ellipse cx="71" cy="42" rx="4.5" ry="2.5" fill="#FFA3C2" />
          {/* Cute Smile */}
          <path
            d="M47 42C48.5 45 52 45 53.5 42"
            stroke="#2E335B"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    )
  }

  // Logo variant
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size * 0.75 }}
    >
      <svg
        viewBox="0 0 100 70"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow */}
        <ellipse cx="50" cy="62" rx="36" ry="5" fill="#E2E8F0" opacity="0.4" />

        {/* Cloud Body */}
        <path
          d="M26 56H76C87.0457 56 96 47.0457 96 36C96 25.5332 87.9734 16.9419 77.7126 16.0864C75.2946 7.07172 67.043 0.5 57.25 0.5C48.9189 0.5 41.6706 5.27976 38.3842 12.2882C35.2536 10.1895 31.4725 9 27.4 9C16.6858 9 8 17.6858 8 28.4C8 30.2359 8.25488 32.0125 8.73038 33.698C4.78772 36.8688 2.25 41.8398 2.25 47.4C2.25 52.1497 5.90025 56 10.4 56H26Z"
          fill="#FFFFFF"
          stroke="#3B4BB8"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        

        {/* Dot Eyes */}
          <circle cx="38" cy="36" r="3.4" fill="#2B3590" />
          <circle cx="62" cy="36" r="3.4" fill="#2B3590" />
          {/* Blushing Cheeks */}
        <ellipse cx="26" cy="38" rx="5" ry="3" fill="#FFB1CB" />
        <ellipse cx="73" cy="38" rx="5" ry="3" fill="#FFB1CB" />

        {/* Happy Mouth */}
        <path
          d="M47 38C48.8 41.5 52.5 41.5 54.5 38"
          stroke="#2E335B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
