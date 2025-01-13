import { cn } from '../../lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', href, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
      'disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-primary text-white hover:bg-primary/90': variant === 'default',
        'border border-primary bg-transparent hover:bg-primary/10': variant === 'outline',
        'hover:bg-accent': variant === 'ghost',
        'h-9 px-4 py-2': size === 'default',
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-8': size === 'lg',
      },
      className
    );

    if (href) {
      return (
        <Link to={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };