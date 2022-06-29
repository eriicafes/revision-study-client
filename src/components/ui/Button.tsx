import clsx from "clsx";
import React, { forwardRef } from "react";
import { Spinner } from "../icons/Spinner";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  override?: boolean;
  outline?: boolean;
  loading?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

type Variant = "primary" | "auth";

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { children, variant, override, outline, loading, className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={styles(variant, override, outline, className)}
        {...props}
      >
        {loading ? <Spinner className="w-6 h-6" /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

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
            "bg-transparent text-black dark:text-white border border-zinc-300 dark:border-zinc-600",
            "hover:border-zinc-900 dark:hover:border-zinc-300",
          ]
        : [
            "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border border-zinc-900 dark:border-zinc-300",
            "hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white",
          ],
    ],
    className,
  ]);
