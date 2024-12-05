import React, {FC, useId} from "react";
import cn from "classnames";

export const DatePicker: FC<{
  label: string;
  value: string;
  setValue: (value: string) => void
  min?: string;
  max?: string;
  className?: string;
}> = ({label, value, setValue, min, max, className}) => {
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
        className={cn(
          "border border-gray-100 rounded-lg",
          "p-4",
          "shadow",
        )}
        id={id}
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min={min}
        max={max}
      />
    </div>
  );
}
