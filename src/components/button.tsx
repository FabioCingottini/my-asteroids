import {ComponentProps, FC} from "react";
import cn from "classnames";

export const Button: FC<ComponentProps<"button">> = (props) => {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex flex-row",
        "px-4 py-2",
        "text-white",
        "bg-blue-500",
        "rounded-md",
        "hover:bg-blue-600",
        "focus:outline-none",
        "focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        "disabled:bg-gray-400 disabled:cursor-not-allowed",
        props.className
      )}
    />
  );
}
