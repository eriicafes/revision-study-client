import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import { useMounted } from "./use-mounted";

type Theme = "light" | "dark" | "system" | undefined;

/**
 * Wrapper around useTheme from `next-themes` to avoid hydration mismatch
*/
export function useNextTheme() {
    const { theme, resolvedTheme, systemTheme, setTheme, forcedTheme, themes } = useTheme();
    const mounted = useMounted();

    const mountedTheme = useMemo(() => mounted ? theme : undefined, [mounted, theme]);
    const mountedResolvedTheme = useMemo(() => mounted ? resolvedTheme : undefined, [mounted, resolvedTheme]);
    const mountedSystemTheme = useMemo(() => mounted ? systemTheme : undefined, [mounted, systemTheme]);

    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    }, [resolvedTheme, setTheme]);

    return {
        theme: mountedTheme as Theme,
        resolvedTheme: mountedResolvedTheme as Theme,
        systemTheme: mountedSystemTheme,
        forcedTheme,
        themes: themes as readonly Theme[],
        setTheme: setTheme as (theme: Theme) => void,
        toggleTheme,
    };
}
