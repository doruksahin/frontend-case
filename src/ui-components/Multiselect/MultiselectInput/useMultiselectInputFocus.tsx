import { useEffect, useRef } from "react";

export function useMultiselectInputFocus({
  onInputFocus,
  onInputFocusLost,
  onOpenDropdown,
}: {
  onInputFocusLost: () => void;
  onInputFocus: () => void;
  onOpenDropdown: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocusInputContainer = () => {
    onInputFocus();
    if (!inputRef.current) return;
    inputRef.current.focus();
    onOpenDropdown();
  };

  useEffect(() => {
    const onFocusInput = () => {
      onInputFocus();
      onOpenDropdown();
    };

    const onFocusInputLost = () => {
      onInputFocusLost();
    };

    const inputElement = inputRef.current;
    if (!inputElement) return;
    inputElement.addEventListener("focusin", onFocusInput);
    inputElement.addEventListener("focusout", onFocusInputLost);
    return () => {
      inputElement.removeEventListener("focusin", onFocusInput);
      inputElement.removeEventListener("focusout", onFocusInputLost);
    };
  }, []);

  return { inputRef, onFocusInputContainer };
}
