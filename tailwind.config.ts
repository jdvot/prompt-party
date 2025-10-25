import type { Config } from "tailwindcss";
import { spacing, shadows, zIndex, animation } from "./src/lib/design-tokens";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
        // Design System Colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Brand Colors - Modern Premium Palette
        brand: {
          primary: 'hsl(var(--brand-primary))',
          'primary-light': 'hsl(var(--brand-primary-light))',
          'primary-dark': 'hsl(var(--brand-primary-dark))',
          secondary: 'hsl(var(--brand-secondary))',
          'secondary-light': 'hsl(var(--brand-secondary-light))',
          'secondary-dark': 'hsl(var(--brand-secondary-dark))',
          accent: 'hsl(var(--brand-accent))',
          'accent-light': 'hsl(var(--brand-accent-light))',
        },

        // Gray Scale
        gray: {
          50: 'hsl(var(--gray-50))',
          100: 'hsl(var(--gray-100))',
          200: 'hsl(var(--gray-200))',
          300: 'hsl(var(--gray-300))',
          400: 'hsl(var(--gray-400))',
          500: 'hsl(var(--gray-500))',
          600: 'hsl(var(--gray-600))',
          700: 'hsl(var(--gray-700))',
          800: 'hsl(var(--gray-800))',
          900: 'hsl(var(--gray-900))',
          950: 'hsl(var(--gray-950))',
        },

        // Surface Colors
        surface: {
          base: 'hsl(var(--surface-base))',
          raised: 'hsl(var(--surface-raised))',
          overlay: 'hsl(var(--surface-overlay))',
        },

        // Legacy Shadcn Colors (for compatibility)
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },

        // Semantic Colors
        success: {
          DEFAULT: 'hsl(var(--color-success))',
          light: 'hsl(var(--color-success-light))',
          bg: 'hsl(var(--color-success-bg))',
          foreground: 'hsl(210, 40%, 98%)'
        },
        error: {
          DEFAULT: 'hsl(var(--color-error))',
          light: 'hsl(var(--color-error-light))',
          bg: 'hsl(var(--color-error-bg))',
          foreground: 'hsl(210, 40%, 98%)'
        },
        warning: {
          DEFAULT: 'hsl(var(--color-warning))',
          light: 'hsl(var(--color-warning-light))',
          bg: 'hsl(var(--color-warning-bg))',
          foreground: 'hsl(222.2, 84%, 4.9%)'
        },
        info: {
          DEFAULT: 'hsl(var(--color-info))',
          light: 'hsl(var(--color-info-light))',
          bg: 'hsl(var(--color-info-bg))',
          foreground: 'hsl(210, 40%, 98%)'
        }
      },

      // Enhanced Shadows
      boxShadow: {
        ...shadows,
        'elevation-0': 'none',
        'elevation-1': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'elevation-2': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'elevation-3': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'elevation-4': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'elevation-5': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'elevation-6': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'glow-primary': '0 0 30px hsl(var(--brand-primary) / 0.4)',
        'glow-secondary': '0 0 30px hsl(var(--brand-secondary) / 0.4)',
        'glow-accent': '0 0 30px hsl(var(--brand-accent) / 0.4)',
      },

      // Z-Index
      zIndex: {
        hide: '-1',
        base: '0',
        sticky: '1100',
        fixed: '1200',
        modalBackdrop: '1300',
        modal: '1400',
        popover: '1500',
        tooltip: '1600',
        dropdown: '9999'
      },

      // Border Radius
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 12px)',
      },

      // Typography
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },

      // Animation Durations
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
      },

      // Animation Easing
      transitionTimingFunction: {
        'ease-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // Keyframes
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-2rem)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(2rem)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px hsl(var(--brand-primary) / 0.4)' },
          '50%': { boxShadow: '0 0 40px hsl(var(--brand-primary) / 0.6)' }
        }
      },

      // Animations
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'gradient': 'gradient-shift 6s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },

      // Spacing (if not already in design-tokens)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },

      // Max Width
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};
export default config;
