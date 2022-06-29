import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "~/contexts/config";
import "~/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <Component {...pageProps} />
        </ConfigProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
