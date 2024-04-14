import { useRef } from "react";

export function useInputContainerFocus({
  onFocusLost,
}: {
  onFocusLost: () => void;
}) {
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const onBlur = () => {
    onFocusLost();
  };

  return { inputContainerRef, onBlur };
}
