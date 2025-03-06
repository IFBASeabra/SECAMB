import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    mask?: (e: string) => string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, ...props }, ref) => {
    const [data, setData] = React.useState('')

    React.useEffect(() => {
      if (mask) {
        setData(mask(data))
      }
    }, [mask])

    return (
      <input
        {...props}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        onChange={({target}) => {
          console.log('input: ', target.value)
          mask ? setData(mask(target.value)) : setData(target.value)}
        }
        value={data}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
