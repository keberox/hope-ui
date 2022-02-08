import { mergeProps, splitProps } from "solid-js";

import { useTheme } from "@/theme/provider";
import { classNames, createCssSelector } from "@/utils/css";

import { Box } from "../box/box";
import { ElementType, HopeComponentProps } from "../types";
import { textStyles, TextVariants } from "./text.styles";

export type TextProps<C extends ElementType> = HopeComponentProps<C, TextVariants>;

const hopeTextClass = "hope-text";

/**
 * Text component is the used to render text and paragraphs within an interface.
 * It renders a <p> tag by default.
 */
export function Text<C extends ElementType = "p">(props: TextProps<C>) {
  const baseStyle = useTheme().components.Text?.baseStyle;

  const defaultProps: TextProps<"p"> = {
    as: "p",
  };

  const propsWithDefault: TextProps<"p"> = mergeProps(defaultProps, props);
  const [local, others] = splitProps(propsWithDefault, ["class", "size"]);

  const classes = () => classNames(local.class, hopeTextClass, textStyles({ size: local.size }));

  return <Box class={classes()} __baseStyle={baseStyle} {...others} />;
}

Text.toString = () => createCssSelector(hopeTextClass);