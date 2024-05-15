import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  extraTopPadding?: boolean;
}

interface ContainerHeaderProps extends React.HTMLProps<HTMLHeadingElement> {}

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  extraTopPadding,
  ...props
}) => {
  return (
    <section
      className={cn('container py-10', extraTopPadding && 'pt-20', className)}
      {...props}>
      {children}
    </section>
  );
};

export const ContainerHeader: React.FC<ContainerHeaderProps> = ({
  className,
  children,
  ...props
}) => (
  <h1
    className={cn(
      'text-2xl sm:text-4xl font-bold text-primary pb-10',
      className,
    )}
    {...props}>
    {children}
  </h1>
);

export default Container;
