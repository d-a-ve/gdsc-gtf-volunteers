/* eslint-disable react/no-unknown-property */
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef,
  forwardRef,
} from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "relative px-3 py-2 flex items-center justify-center gap-3 rounded-md transition-all select-none text-base border-solid border-2 w-full",
  {
    variants: {
      variant: {
        default: "border-gray-300 bg-transparent focus-within:bg-green-100",
      },
      inputSize: {
        sm: "py-1.5 px-3",
        md: "py-2 px-4",
        lg: "py-3 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "sm",
    },
  }
);

export interface InputVariants
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof inputVariants> {}

interface TextInputProps extends InputVariants {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeHolder?: string;
  isPasswordVisible?: boolean;
}

export const Input = forwardRef(function Input(
  {
    className,
    leftIcon,
    rightIcon,
    type,
    isLoading,
    disabled,
    onChange,
    placeHolder,
    variant,
    inputSize,
    ...props
  }: TextInputProps,
  ref: LegacyRef<HTMLInputElement>
) {
  const classNames = cn(
    inputVariants({ variant, inputSize }),
    className,
    disabled || isLoading ? "opacity-[.8] cursor-not-allowed" : ""
  );
  return (
    <div className={classNames}>
      {leftIcon && (
        <span className="inline-flex space-x-3">
          {leftIcon}
          <span className="block w-0.5 bg-clr-gray" aria-hidden="true"></span>
        </span>
      )}
      <input
        onChange={onChange}
        type={type}
        className={cn(
          "placeholder:text-gray-400 w-full bg-transparent outline-none",
          disabled ?? isLoading ? "cursor-not-allowed" : ""
        )}
        placeholder={placeHolder ?? "Placeholder"}
        disabled={isLoading ?? disabled}
        ref={ref}
        {...props}
      />
      {rightIcon && rightIcon}
    </div>
  );
});
