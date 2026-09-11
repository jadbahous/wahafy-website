import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative isolate overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-full text-[15px] font-medium ring-offset-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf] text-black border border-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:from-white hover:via-[#f3f6ff] hover:to-[#d5def2] hover:shadow-[inset_0_1px_0_#fff,0_0_22px_rgba(186,208,255,0.35),0_8px_18px_rgba(255,255,255,0.12)]',
        white: 'bg-white text-ink hover:bg-white/90',
        outline:
          'border border-white/25 text-white bg-white/[0.04] backdrop-blur-md hover:border-white/50 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(170,200,255,0.18)]',
        ghost: 'text-white hover:bg-white/10',
        link: 'text-gold underline-offset-4 hover:underline hover:text-white',
        gradient:
          'bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf] text-black border border-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:from-white hover:via-[#f3f6ff] hover:to-[#d5def2] hover:shadow-[inset_0_1px_0_#fff,0_0_26px_rgba(186,208,255,0.4),0_8px_18px_rgba(255,255,255,0.14)] active:scale-[0.98]',
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
