
import * as React from "react"

export interface CheckProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

const Check = React.forwardRef<SVGSVGElement, CheckProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        ref={ref}
        {...props}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
);
Check.displayName = "Check";

export { Check };
