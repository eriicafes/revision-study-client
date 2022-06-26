import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  override?: boolean;
  outline?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

type Variant = "primary" | "auth";

export const Button: React.FC<Props> = ({
  children,
  variant,
  override,
  outline,
  className,
  ...props
}) => {
  return (
    <button className={styles(variant, override, outline, className)} {...props}>
      {children}
    </button>
  );
};

const styles = (
  variant: Variant = "primary",
  override?: boolean,
  outline?: boolean,
  className?: string
) =>
  clsx([
    !override && ["py-2.5 px-4 rounded-md font-medium"],
    variant === "auth" && [
      outline
        ? [
          "bg-transparent text-gray-900 border border-gray-300",
          "hover:border-gray-900",
        ]
        : [
          "bg-gray-900 text-white border border-gray-900",
          "hover:bg-transparent hover:text-gray-900",
        ],
    ],
    className,
  ]);
