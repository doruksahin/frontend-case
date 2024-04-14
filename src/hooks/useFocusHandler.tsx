enum Directions {
  UP = "UP",
  DOWN = "DOWN",
}

const downTriggerKeys = ["ArrowDown", "Tab", "ArrowRight"];
const upTriggerKeys = ["ArrowUp", "ArrowLeft"];

const useFocusHandler = (elementSelectorId: string | null) => {
  const onKeyNavigation: React.KeyboardEventHandler<HTMLElement> = (event) => {
    let direction: Directions | undefined;
    if (upTriggerKeys.includes(event.key)) direction = Directions.UP;
    else if (downTriggerKeys.includes(event.key)) direction = Directions.DOWN;
    if (!direction) return;

    const container = elementSelectorId
      ? document.getElementById(elementSelectorId)
      : document;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ) as NodeListOf<HTMLElement>;
    const currentIndex = Array.from(focusableElements).indexOf(
      event.currentTarget,
    );
    const nextIndexWithoutModulus =
      currentIndex + (direction === Directions.UP ? -1 : 1);
    const nextIndex =
      (nextIndexWithoutModulus < 0
        ? nextIndexWithoutModulus + focusableElements.length
        : nextIndexWithoutModulus) % focusableElements.length;
    const nextElement = focusableElements[nextIndex];

    // Focus on the next element
    if (nextElement) {
      nextElement.focus();
      event.preventDefault();
      return nextElement;
    }
  };
  return { onKeyNavigation };
};

export default useFocusHandler;
