import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

// ============================================================================
// INPUT VARIANTS
// ============================================================================

const inputVariants = cva(
  [
    'flex w-full transition-all duration-200',
    'bg-background text-foreground',
    'border border-input rounded-lg',
    'placeholder:text-muted-foreground',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-muted border-transparent focus-visible:bg-background focus-visible:border-input',
        ghost: 'border-transparent hover:border-input focus-visible:border-input',
      },
      size: {
        sm: 'h-9 px-3 py-2 text-sm',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
      validation: {
        none: '',
        error: 'border-error focus-visible:ring-error',
        success: 'border-success focus-visible:ring-success',
        warning: 'border-warning focus-visible:ring-warning',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      validation: 'none',
    },
  }
)

// ============================================================================
// INPUT COMPONENT
// ============================================================================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  helperText?: string
  errorText?: string
  successText?: string
  warningText?: string
  maxCharacters?: number
  showCharacterCount?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      size,
      validation,
      startIcon,
      endIcon,
      clearable = false,
      onClear,
      helperText,
      errorText,
      successText,
      warningText,
      maxCharacters,
      showCharacterCount = false,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      (value as string) || ''
    )

    const currentValue = value !== undefined ? (value as string) : internalValue
    const hasValue = currentValue && currentValue.length > 0

    // Determine validation state
    const validationState = errorText
      ? 'error'
      : successText
      ? 'success'
      : warningText
      ? 'warning'
      : validation

    const feedbackText = errorText || successText || warningText || helperText

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value

      // Enforce max characters
      if (maxCharacters && newValue.length > maxCharacters) {
        return
      }

      setInternalValue(newValue)
      onChange?.(e)
    }

    const handleClear = () => {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>

      setInternalValue('')
      onClear?.()
      onChange?.(event)
    }

    const showClearButton = clearable && hasValue && !disabled

    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {/* Start Icon */}
          {startIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
              {startIcon}
            </div>
          )}

          {/* Input */}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size, validation: validationState }),
              startIcon && 'pl-10',
              (endIcon || showClearButton || showCharacterCount) && 'pr-10',
              className
            )}
            ref={ref}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />

          {/* End Content (Clear Button, End Icon, or Character Count) */}
          <div className="absolute right-3 flex items-center gap-1">
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-sm hover:bg-muted"
                tabIndex={-1}
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {endIcon && !showClearButton && (
              <div className="flex items-center pointer-events-none text-muted-foreground">
                {endIcon}
              </div>
            )}

            {showCharacterCount && maxCharacters && (
              <span
                className={cn(
                  'text-xs tabular-nums',
                  currentValue.length >= maxCharacters
                    ? 'text-error'
                    : 'text-muted-foreground'
                )}
              >
                {currentValue.length}/{maxCharacters}
              </span>
            )}
          </div>
        </div>

        {/* Helper/Error/Success/Warning Text */}
        {feedbackText && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              errorText && 'text-error',
              successText && 'text-success',
              warningText && 'text-warning',
              !errorText && !successText && !warningText && 'text-muted-foreground'
            )}
          >
            {feedbackText}
          </p>
        )}

        {/* Character Count (when not inline) */}
        {!showCharacterCount && maxCharacters && !feedbackText && (
          <p className="mt-1.5 text-xs text-muted-foreground tabular-nums">
            {currentValue.length}/{maxCharacters}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// ============================================================================
// INPUT GROUP - For combining inputs with addons
// ============================================================================

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-stretch', className)}
      {...props}
    >
      {children}
    </div>
  )
)

InputGroup.displayName = 'InputGroup'

// ============================================================================
// INPUT ADDON - Prefix/Suffix text or icons
// ============================================================================

export interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  position?: 'start' | 'end'
}

const InputAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, children, position = 'start', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center px-3 bg-muted border border-input text-sm text-muted-foreground whitespace-nowrap',
        position === 'start' && 'rounded-l-lg border-r-0',
        position === 'end' && 'rounded-r-lg border-l-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

InputAddon.displayName = 'InputAddon'

// ============================================================================
// EXPORTS
// ============================================================================

export { Input, InputGroup, InputAddon, inputVariants }
