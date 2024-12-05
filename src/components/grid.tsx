import {ComponentProps, FC} from "react";
import cn from "classnames";

export const Grid: FC<ComponentProps<'div'>> = (props) => {
  return (
    <div
      {...props}
      className={cn(
        "grid",
        "grid-cols-2 md:grid-cols-6 xl:grid-cols-12",
        "gap-6 md:gap-6 xl:gap-6",
        "px-4 md:px-8",
        "w-full max-w-[75rem]",
        "mx-auto",
        props.className
      )}
    />
  );
}
