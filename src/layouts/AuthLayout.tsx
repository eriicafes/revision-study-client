import clsx from "clsx";
import React from "react";
import { Github } from "~/components/icons/Github";
import { Button } from "~/components/ui/Button";
import { useConfig } from "~/contexts/config";
import { useCycle } from "~/hooks/use-cycle";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout: React.FC<Props> = ({ children }) => {
  const { githubRepoUrl } = useConfig();
  const [gradient, index] = useCycle(gradients, 3000);

  return (
    <div className="">
      {/* main section */}
      <div className="md:h-screen flex flex-col-reverse md:flex-row md:divide-x divide-zinc-200 dark:divide-zinc-800">
        {/* banner section */}
        <div className="md:w-1/2 md:bg-zinc-50 dark:md:bg-zinc-900 border-t md:border-t-0 border-zinc-200 dark:border-zinc-800">
          <div className="py-12 px-4 md:px-12 lg:px-16 xl:px-20 h-full flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto md:mr-0">
              <h3 className="mb-2 lg:text-xl font-bold">
                Revise. Study. Get Productive
              </h3>
              <h2 className="text-6xl lg:text-7xl xl:text-8xl font-extrabold flex flex-col">
                <span className={gradientHeadingClass(gradient, index, 0)}>
                  Revision.
                </span>
                <span className={gradientHeadingClass(gradient, index, 1)}>
                  Study.
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
      <div className="border-t border-zinc-200 dark:border-zinc-800 md:bg-zinc-50 dark:md:bg-zinc-900 p-4 md:p-12 text-zinc-600 dark:text-zinc-400 text-sm">
        <h2 className="mb-4 text-lg text-zinc-800 dark:text-zinc-200  font-bold cursor-pointer">
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

const gradients = [
  "bg-gradient-to-r from-[#007CF0] to-[#00DFD8]",
  "bg-gradient-to-r from-[#FF4D4D] to-[#F9CB28]",
] as const;

const gradientHeadingClass = (
  gradient: string,
  activeIndex: number,
  index: number
) =>
  clsx([
    "pb-1.5",
    "bg-clip-text transition-colors duration-1000",
    gradient,
    index === activeIndex ? "text-transparent" : "text-black dark:text-white",
  ]);
