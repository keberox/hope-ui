export interface PressEvents {
  /**
   * Handler that is called when a pointing device is both pressed and released while the pointer is over the target.
   */
  onClick?: (e: MouseEvent) => void;

  /**
   * Handler that is called when a pointing device is pressed while the pointer is over the target.
   */
  onMouseDown?: (e: MouseEvent) => void;

  /**
   * Handler that is called when a pointing device is released while the pointer is over the target.
   */
  onMouseUp?: (e: MouseEvent) => void;

  /**
   * Handler that is called when the press state changes.
   */
  onPressChange?: (isPressed: boolean) => void;
}

export interface FocusEvents {
  /**
   * Handler that is called when the element receives focus.
   */
  onFocus?: (e: FocusEvent) => void;

  /**
   * Handler that is called when the element loses focus.
   */
  onBlur?: (e: FocusEvent) => void;

  /**
   * Handler that is called when the element receives focus.
   * Unlike `focus`, `focusin` event bubbles.
   */
  onFocusIn?: (e: FocusEvent) => void;

  /**
   * Handler that is called when the element loses focus.
   * Unlike `blur`, `focusout` event bubbles.
   */
  onFocusOut?: (e: FocusEvent) => void;

  /**
   * Handler that is called when the element's focus status changes.
   */
  onFocusChange?: (isFocused: boolean) => void;
}

export interface KeyboardEvents {
  /**
   * Handler that is called when a key is pressed.
   */
  onKeyDown?: (e: KeyboardEvent) => void;

  /**
   * Handler that is called when a key is released.
   */
  onKeyUp?: (e: KeyboardEvent) => void;
}
