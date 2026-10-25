import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative isolate overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-full text-[15px] font-medium ring-offset-bg transition-[box-shadow,transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'btn-primary',
        white: 'bg-fg text-bg hover:bg-fg/90',
        outline: 'btn-secondary',
        ghost: 'text-fg hover:bg-fg/10',
        link: 'text-muted underline-offset-4 hover:underline hover:text-fg',
        gradient: 'btn-primary',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-[52px] px-7 text-[15px]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
