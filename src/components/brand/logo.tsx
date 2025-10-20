export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Main circle background */}
      <circle cx="100" cy="100" r="90" fill="url(#logoGradient)" opacity="0.1" />

      {/* Speech bubble shape */}
      <path
        d="M140 60 C160 60 170 70 170 85 L170 115 C170 130 160 140 140 140 L75 140 L55 160 L55 140 C40 140 30 130 30 115 L30 85 C30 70 40 60 55 60 Z"
        fill="url(#logoGradient)"
      />

      {/* Sparkle stars inside */}
      <circle cx="70" cy="90" r="4" fill="white" opacity="0.9" />
      <circle cx="100" cy="85" r="5" fill="white" opacity="0.9" />
      <circle cx="130" cy="95" r="4" fill="white" opacity="0.9" />

      {/* Small star accent top right */}
      <path
        d="M155 50 L157 55 L162 57 L157 59 L155 64 L153 59 L148 57 L153 55 Z"
        fill="#F59E0B"
      />

      {/* Small star accent bottom left */}
      <path
        d="M45 150 L47 155 L52 157 L47 159 L45 164 L43 159 L38 157 L43 155 Z"
        fill="#EC4899"
      />
    </svg>
  )
}

export function LogoText({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 bg-clip-text text-transparent ${className}`}>
      Prompt Party
    </span>
  )
}
