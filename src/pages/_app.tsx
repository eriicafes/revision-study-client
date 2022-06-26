import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ConfigProvider } from "~/contexts/config";
import "~/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <ConfigProvider>
        <Component {...pageProps} />
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default MyApp;
