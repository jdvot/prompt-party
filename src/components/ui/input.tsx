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
        // Premium variants (POR-63)
        premium: 'input-premium',
        glow: 'input-glow',
        underline: 'input-underline',
      },
      size: {
        sm: 'h-9 px-3 py-2 text-sm',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
        xl: 'h-14 px-5 py-4 text-lg',
      },
      validation: {
        none: '',
        error: 'border-error focus-visible:ring-error input-error',
        success: 'border-success focus-visible:ring-success input-success',
        warning: 'border-warning focus-visible:ring-warning input-warning',
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
// FLOATING LABEL INPUT - Premium variant (POR-63)
// ============================================================================

export interface FloatingLabelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'placeholder'> {
  label: string
  helperText?: string
  errorText?: string
  successText?: string
  startIcon?: React.ReactNode
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  (
    {
      className,
      label,
      helperText,
      errorText,
      successText,
      startIcon,
      value,
      onChange,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      (value as string) || ''
    )
    const generatedId = React.useId()
    const inputId = id || generatedId

    const currentValue = value !== undefined ? (value as string) : internalValue
    const hasValue = currentValue && currentValue.length > 0

    const validationState = errorText ? 'error' : successText ? 'success' : 'none'
    const feedbackText = errorText || successText || helperText

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    return (
      <div className="w-full">
        <div
          className={cn(
            'input-floating-container',
            hasValue && 'has-value',
            startIcon && 'input-group-premium'
          )}
        >
          {/* Start Icon */}
          {startIcon && (
            <div className="input-icon-wrapper input-icon-wrapper-left">
              {startIcon}
            </div>
          )}

          {/* Input */}
          <input
            id={inputId}
            className={cn(
              'input-floating',
              startIcon && 'input-with-icon-left',
              validationState === 'error' && 'input-error',
              validationState === 'success' && 'input-success',
              className
            )}
            ref={ref}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            placeholder=" "
            {...props}
          />

          {/* Floating Label */}
          <label
            htmlFor={inputId}
            className={cn(
              'floating-label',
              startIcon && 'left-10'
            )}
          >
            {label}
          </label>
        </div>

        {/* Helper/Error/Success Text */}
        {feedbackText && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              errorText && 'text-error',
              successText && 'text-success',
              !errorText && !successText && 'text-muted-foreground'
            )}
          >
            {feedbackText}
          </p>
        )}
      </div>
    )
  }
)

FloatingLabelInput.displayName = 'FloatingLabelInput'

// ============================================================================
// PREMIUM TEXTAREA - Premium variant (POR-63)
// ============================================================================

export interface PremiumTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'premium' | 'glow'
  helperText?: string
  errorText?: string
  successText?: string
  maxCharacters?: number
  showCharacterCount?: boolean
}

const PremiumTextarea = React.forwardRef<HTMLTextAreaElement, PremiumTextareaProps>(
  (
    {
      className,
      variant = 'premium',
      helperText,
      errorText,
      successText,
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
    const validationState = errorText ? 'error' : successText ? 'success' : 'none'
    const feedbackText = errorText || successText || helperText

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value

      if (maxCharacters && newValue.length > maxCharacters) {
        return
      }

      setInternalValue(newValue)
      onChange?.(e)
    }

    const variantClasses = {
      default: '',
      premium: 'textarea-premium',
      glow: 'input-glow min-h-[120px] resize-y',
    }

    return (
      <div className="w-full">
        <textarea
          className={cn(
            variantClasses[variant],
            validationState === 'error' && 'input-error',
            validationState === 'success' && 'input-success',
            className
          )}
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />

        {/* Footer with helper text and character count */}
        <div className="flex items-center justify-between mt-1.5">
          {feedbackText && (
            <p
              className={cn(
                'text-xs',
                errorText && 'text-error',
                successText && 'text-success',
                !errorText && !successText && 'text-muted-foreground'
              )}
            >
              {feedbackText}
            </p>
          )}

          {showCharacterCount && maxCharacters && (
            <span
              className={cn(
                'text-xs tabular-nums ml-auto',
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
    )
  }
)

PremiumTextarea.displayName = 'PremiumTextarea'

// ============================================================================
// PREMIUM SELECT - Premium variant (POR-63)
// ============================================================================

export interface PremiumSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  helperText?: string
  errorText?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
  placeholder?: string
}

const PremiumSelect = React.forwardRef<HTMLSelectElement, PremiumSelectProps>(
  (
    {
      className,
      helperText,
      errorText,
      options,
      placeholder,
      disabled,
      ...props
    },
    ref
  ) => {
    const feedbackText = errorText || helperText

    return (
      <div className="w-full">
        <select
          className={cn(
            'select-premium',
            errorText && 'input-error',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {feedbackText && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              errorText ? 'text-error' : 'text-muted-foreground'
            )}
          >
            {feedbackText}
          </p>
        )}
      </div>
    )
  }
)

PremiumSelect.displayName = 'PremiumSelect'

// ============================================================================
// PREMIUM CHECKBOX - Premium variant (POR-63)
// ============================================================================

export interface PremiumCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

const PremiumCheckbox = React.forwardRef<HTMLInputElement, PremiumCheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId()
    const checkboxId = id || generatedId

    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={checkboxId}
          className={cn('checkbox-premium mt-0.5', className)}
          ref={ref}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-muted-foreground mt-0.5">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

PremiumCheckbox.displayName = 'PremiumCheckbox'

// ============================================================================
// PREMIUM RADIO - Premium variant (POR-63)
// ============================================================================

export interface PremiumRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

const PremiumRadio = React.forwardRef<HTMLInputElement, PremiumRadioProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId()
    const radioId = id || generatedId

    return (
      <div className="flex items-start gap-3">
        <input
          type="radio"
          id={radioId}
          className={cn('radio-premium mt-0.5', className)}
          ref={ref}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={radioId}
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-muted-foreground mt-0.5">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

PremiumRadio.displayName = 'PremiumRadio'

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Input,
  InputGroup,
  InputAddon,
  FloatingLabelInput,
  PremiumTextarea,
  PremiumSelect,
  PremiumCheckbox,
  PremiumRadio,
  inputVariants,
}
