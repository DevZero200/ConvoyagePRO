import { cn } from '../../lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          className={cn(
            'w-4 h-4 text-primary border-text/20 focus:ring-primary',
            className
          )}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <span className="text-secondary">{label}</span>
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export { Radio };