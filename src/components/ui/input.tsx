import { cn } from '../../lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-text/20 bg-white px-3 py-1',
          'text-sm shadow-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };