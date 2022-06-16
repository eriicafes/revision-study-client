import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Github } from "~/components/icons/Github";
import { Button } from "~/components/ui/Button";
import { useConfig } from "~/contexts/config";

type Props = {
  children: React.ReactNode;
};

const gradientHeadings = ["revision", "study"] as const;
type GradientHeading = typeof gradientHeadings[number];

export const AuthLayout: React.FC<Props> = ({ children }) => {
  const { githubRepoUrl } = useConfig();

  const [activeGradientHeading, setActiveGradientHeading] =
    useState<GradientHeading>("revision");

  useEffect(() => {
    // cycle through gradient headings
    const interval = setInterval(() => {
      setActiveGradientHeading((curr) => {
        const index = gradientHeadings.indexOf(curr);
        const next = gradientHeadings[(index + 1) % gradientHeadings.length];
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      {/* main section */}
      <div className="flex h-screen divide-x divide-zinc-200">
        {/* banner section */}
        <div className="w-1/2 bg-zinc-100 flex flex-col items-center justify-center">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">Revise. Study. Get Productive</h3>
            <h2 className="text-8xl font-extrabold flex flex-col">
              <span
                className={gradientHeadingClass(
                  "revision",
                  activeGradientHeading,
                  "bg-gradient-to-r from-sky-500 to-cyan-300"
                )}
              >
                Revision
              </span>
              <span
                className={gradientHeadingClass(
                  "study",
                  activeGradientHeading,
                  "bg-gradient-to-l from-orange-300 to-yellow-500"
                )}
              >
                Study
              </span>
            </h2>
            <div className="mt-12 space-x-4 flex">
              <Button variant="auth" className="w-full">
                Create an account
              </Button>
              <Button variant="auth" className="w-full" outline>
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className="w-1/2">{children}</div>
      </div>
      {/* footer section */}
      <div className="border-t border-zinc-200 bg-zinc-100 py-12 px-36 text-zinc-600 text-sm">
        <h2 className="mb-4 text-xl text-zinc-800 font-bold cursor-pointer">
          Revision Study
        </h2>
        <div className="flex items-center justify-between">
          <p>Copyright © {new Date().getFullYear()} Revision Study</p>
          <a href={githubRepoUrl}>
            <Github />
          </a>
        </div>
      </div>
    </div>
  );
};

const gradientHeadingClass = (
  heading: GradientHeading,
  active: GradientHeading,
  gradientClass: string
) =>
  clsx([
    "after:content-['.']",
    heading === active && [
      "bg-clip-text text-transparent",
      "transition-colors duration-1000 ease-in-out",
      gradientClass,
    ],
  ]);
