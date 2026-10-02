import * as React from "react"
import { cn } from "cn"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

function Container({ as, className, children, ...props }: ContainerProps) {
  const Component = as ?? "div"
  return (
    <Component
      data-slot="container"
      className={cn("mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-10", className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export { Container }
