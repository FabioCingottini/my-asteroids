import React, {FC, useId} from "react";
import cn from "classnames";

type TextInput = FC<{
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void
  className?: string;
}>;
export const TextInput: TextInput = ({label, placeholder, value, setValue, className}) => {
  const id = useId();

  return (
    <div
      className={cn(
        "flex flex-col",
        className,
      )}
    >
      <label
        htmlFor={id}
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        className={cn(
          "border border-gray-100 rounded-lg",
          "p-4",
          "shadow",
        )}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
