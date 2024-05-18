import { cn } from '@/lib/utils';
import React from 'react';

interface ErrorLabelProps extends React.HTMLProps<HTMLSpanElement> {}

const ErrorLabel: React.FC<ErrorLabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'text-destructive text-left block text-sm py-2 px-4 bg-destructive/20 my-2 rounded',
        className,
      )}
      {...props}>
      {children}
    </span>
  );
};

export default ErrorLabel;
