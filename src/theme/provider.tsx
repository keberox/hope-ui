/* eslint-disable solid/reactivity */
import { createContext, createEffect, createSignal, PropsWithChildren, useContext } from "solid-js";

import { drawerTransitionStyles } from "@/components/drawer/drawer.styles";
import { menuTransitionStyles } from "@/components/menu/menu.styles";
import { modalTransitionStyles } from "@/components/modal/modal.styles";
import { notificationTransitionStyles } from "@/components/notification/notification.styles";
import { popoverTransitionStyles } from "@/components/popover/popover.styles";
import { selectTransitionStyles } from "@/components/select/select.styles";
import { tooltipTransitionStyles } from "@/components/tooltip/tooltip.styles";

import {
  getDefaultColorMode,
  saveColorModeToLocalStorage,
  setDocumentColorModeDataTheme,
  syncBodyColorModeClassName,
} from "./color-mode";
import { resetStyles } from "./reset";
import { ColorMode, ComponentsStyleConfigs, HopeContextValue, HopeThemeConfig } from "./types";
import { extendBaseTheme } from "./utils";

export const HopeContext = createContext<HopeContextValue>();

export type HopeProviderProps = PropsWithChildren<{
  config?: HopeThemeConfig;
}>;

function applyGlobalStyles() {
  resetStyles();

  drawerTransitionStyles();
  menuTransitionStyles();
  modalTransitionStyles();
  notificationTransitionStyles();
  popoverTransitionStyles();
  selectTransitionStyles();
  tooltipTransitionStyles();
}

export function HopeProvider(props: HopeProviderProps) {
  // Create themes
  const lightTheme = extendBaseTheme("light", props.config?.lightTheme ?? {});
  const darkTheme = extendBaseTheme("dark", props.config?.darkTheme ?? {});

  // Get default context values
  const defaultColorMode = getDefaultColorMode(props.config?.initialColorMode ?? "light");
  const defaultTheme = defaultColorMode === "dark" ? darkTheme : lightTheme;

  // Create context signals
  const [colorMode, rawSetColorMode] = createSignal(defaultColorMode);
  const [theme, setTheme] = createSignal(defaultTheme);

  const setColorMode = (value: ColorMode) => {
    rawSetColorMode(value);
    saveColorModeToLocalStorage(value);
  };

  const toggleColorMode = () => {
    setColorMode(colorMode() === "light" ? "dark" : "light");
  };

  const context: HopeContextValue = {
    components: props.config?.components ?? {},
    theme,
    colorMode,
    setColorMode,
    toggleColorMode,
  };

  createEffect(() => {
    // When color mode changes, switch theme and update `document.body` theme class.
    const isDark = colorMode() === "dark";

    setTheme(isDark ? darkTheme : lightTheme);
    setDocumentColorModeDataTheme(colorMode());
    syncBodyColorModeClassName(isDark);
  });

  applyGlobalStyles();

  return <HopeContext.Provider value={context}>{props.children}</HopeContext.Provider>;
}

/* -------------------------------------------------------------------------------------------------
 * ThemeProvider - hooks
 * -----------------------------------------------------------------------------------------------*/

/**
 * Custom hook that reads from `HopeProvider` context
 * Returns an accessor for the current used theme.
 */
export function useTheme() {
  const context = useContext(HopeContext);

  if (!context) {
    throw new Error("[Hope UI]: useTheme must be used within a HopeProvider");
  }

  return context.theme;
}

/**
 * Custom hook that reads from `HopeProvider` context
 * Returns an accessor for the theme based components style configs.
 */
export function useComponentStyleConfigs(): ComponentsStyleConfigs {
  const context = useContext(HopeContext);

  if (!context) {
    throw new Error("[Hope UI]: useComponentStyleConfigs must be used within a HopeProvider");
  }

  return context.components;
}

/* -------------------------------------------------------------------------------------------------
 * ColorMode - hooks
 * -----------------------------------------------------------------------------------------------*/

/**
 * Custom hook that reads from `HopeProvider` context
 * Returns an accessor for the color mode and function to toggle it
 */
export function useColorMode(): Pick<HopeContextValue, "colorMode" | "setColorMode" | "toggleColorMode"> {
  const context = useContext(HopeContext);

  if (!context) {
    throw new Error("[Hope UI]: useColorMode must be used within a HopeProvider");
  }

  return {
    colorMode: context.colorMode,
    setColorMode: context.setColorMode,
    toggleColorMode: context.toggleColorMode,
  };
}

/**
 * Change value based on color mode.
 *
 * @param light the light mode value
 * @param dark the dark mode value
 * @return A derived signal based on the color mode.
 */
export function useColorModeValue<T = any>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return () => (colorMode() === "dark" ? dark : light);
}
