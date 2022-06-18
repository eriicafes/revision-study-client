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
      <div className="md:h-screen flex flex-col-reverse md:flex-row md:divide-x divide-zinc-200">
        {/* banner section */}
        <div className="md:w-1/2 md:bg-zinc-50 border-t md:border-t-0 border-zinc-200">
          <div className="py-12 px-4 md:px-12 lg:px-16 xl:px-20 h-full flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto md:mr-0">
              <h3 className="mb-2 lg:text-xl font-bold">Revise. Study. Get Productive</h3>
              <h2 className="text-6xl lg:text-7xl xl:text-8xl font-extrabold flex flex-col">
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
              <div className="mt-12 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                <Button variant="auth" className="w-full">
                  Create an account
                </Button>
                <Button variant="auth" className="w-full" outline>
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* content section */}
        <div className="md:w-1/2">{children}</div>
      </div>
      {/* footer section */}
      <div className="border-t border-zinc-200 md:bg-zinc-50 p-4 md:p-12 text-zinc-600 text-sm">
        <h2 className="mb-4 text-lg text-zinc-800 font-bold cursor-pointer">
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
    "pb-1.5 after:content-['.']",
    heading === active && [
      "bg-clip-text text-transparent",
      "transition-colors duration-1000 ease-in-out",
      gradientClass,
    ],
  ]);
