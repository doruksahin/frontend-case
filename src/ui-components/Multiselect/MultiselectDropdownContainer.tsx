import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.tsx";
import { MIN_ITEM_TO_INTERSECTION_OBSERVER_WORK } from "./multiselectConstants.ts";

import { MultiselectProps } from "./multiselect.types.ts";

export function MultiselectDropdownContainer({
  isLoading,
  dropdownItems,
  renderDropdownItems,
  onFetchNextPage,
}: Pick<
  MultiselectProps,
  "isLoading" | "dropdownItems" | "renderDropdownItems" | "onFetchNextPage"
>) {
  const { isIntersecting, ref: lastListElementRef } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!isIntersecting) return;
    onFetchNextPage();
  }, [isIntersecting]);

  if (isLoading) {
    return (
      <div className={"flex justify-center items-center h-16"}>
        <LoadingSpinner />
      </div>
    );
  } else if (dropdownItems.length === 0) {
    return (
      <div className={"flex justify-center items-center h-16"}>
        <span className={"text-[#112a44] text-sm font-medium"}>
          No results found
        </span>
      </div>
    );
  } else {
    return (
      <>
        {dropdownItems.map((item, index) =>
          renderDropdownItems({
            id: item.id,
            potentialLastListElementRef:
              index === dropdownItems.length - 1 &&
              dropdownItems.length > MIN_ITEM_TO_INTERSECTION_OBSERVER_WORK
                ? lastListElementRef
                : undefined,
          }),
        )}
      </>
    );
  }
}
