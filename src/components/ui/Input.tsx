import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import React, { forwardRef, useState } from "react";

type Props = {
    variant?: Variant;
    override?: boolean;
    error?: string;
    wrapperClassName?: string;
} & React.ComponentPropsWithoutRef<"input">;

type Variant = "primary" | "auth";

export const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            variant,
            override,
            error,
            wrapperClassName,
            className,
            type = "text",
            ...props
        },
        ref
    ) => {
        const [show, setShow] = useState(false);

        return (
            <div className={wrapperClassName}>
                <div className="relative">
                    <input
                        ref={ref}
                        type={show ? "text" : type}
                        className={styles(variant, override, className)}
                        {...props}
                    />
                    {type === "password" && (
                        <div
                            onClick={() => setShow((s) => !s)}
                            className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-4 text-zinc-400"
                        >
                            {show ? (
                                <EyeOffIcon className="w-4 h-4" />
                            ) : (
                                <EyeIcon className="w-4 h-4" />
                            )}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="px-2 mt-1 text-sm font-medium text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input"

const styles = (
    variant: Variant = "primary",
    override?: boolean,
    className?: string
) =>
    clsx([
        !override && ["px-3 py-2.5 rounded-md text-sm w-full"],
        variant === "auth" && [
            "dark:bg-transparent",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "focus:ring-0 border-zinc-200 focus:border-zinc-400 dark:border-zinc-600 dark:focus:border-zinc-400",
        ],
        className,
    ]);
