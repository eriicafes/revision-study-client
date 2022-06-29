import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "~/api/auth";
import { Github } from "~/components/icons/Github";
import { QueryLoader } from "~/components/loaders/QueryLoader";
import { Button } from "~/components/ui/Button";
import { useConfig } from "~/contexts/config";
import { useCycle } from "~/hooks/use-cycle";
import { useTimeout } from "~/hooks/use-timeout";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout: React.FC<Props> = ({ children }) => {
  const { githubRepoUrl } = useConfig();
  const [gradient, index] = useCycle(gradients, 3000);

  const router = useRouter();

  const authQuery = useAuth({
    retry: false,
  });

  useTimeout(
    () => {
      router.push("/dashboard");
    },
    1000,
    authQuery.isSuccess
  );

  return (
    <div className="h-screen">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
      </Head>
      <QueryLoader query={authQuery} control keepLoading={(data) => !!data}>
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
                  <Link href="/register">
                    <Button variant="auth" className="w-full">
                      Create an account
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="auth" className="w-full" outline>
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* content section */}
          <div className="md:w-1/2">{children}</div>
        </div>
        {/* footer section */}
        <div className="text-sm py-4 md:py-12 px-4 md:px-12 lg:px-16 xl:px-44 border-t border-zinc-200 dark:border-zinc-800 md:bg-zinc-50 dark:md:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
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
      </QueryLoader>
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
