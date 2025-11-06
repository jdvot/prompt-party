import Image from 'next/image'

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main gradient Indigo to Violet */}
        <linearGradient id="logoMainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* Cyan accent */}
        <linearGradient id="logoAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      {/* Graduation Cap - Simplified for header */}

      {/* Cap Top (mortarboard) - diamond/square rotated */}
      <rect x="156" y="156" width="200" height="200"
            rx="12"
            transform="rotate(45 256 256)"
            fill="url(#logoMainGradient)"/>

      {/* Cap base shadow for depth */}
      <ellipse cx="256" cy="300" rx="100" ry="20"
               fill="url(#logoMainGradient)" opacity="0.2"/>

      {/* Book pages integrated into design */}
      <rect x="206" y="320" width="100" height="130"
            rx="8"
            fill="url(#logoMainGradient)" opacity="0.15"/>

      {/* Book spine/divider */}
      <rect x="254" y="320" width="4" height="130"
            rx="2"
            fill="url(#logoMainGradient)" opacity="0.3"/>

      {/* Tassel - simple line + circle (Cyan accent) */}
      <line x1="340" y1="220" x2="365" y2="275"
            stroke="url(#logoAccentGradient)"
            strokeWidth="6"
            strokeLinecap="round"/>

      <circle cx="365" cy="280" r="10"
              fill="url(#logoAccentGradient)"/>

      {/* Small decorative dots (sparkle effect) */}
      <circle cx="180" cy="180" r="6" fill="#22D3EE" opacity="0.6"/>
      <circle cx="332" cy="180" r="6" fill="#22D3EE" opacity="0.6"/>
      <circle cx="256" cy="140" r="8" fill="#22D3EE" opacity="0.8"/>
    </svg>
  )
}

export function LogoText({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent ${className}`}>
      Prompt Academy
    </span>
  )
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/branding/logo/logo-full.svg"
      alt="Prompt Academy"
      width={200}
      height={60}
      className={className}
      priority
    />
  )
}
