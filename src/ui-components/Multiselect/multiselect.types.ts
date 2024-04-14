import { useIntersectionObserver } from "usehooks-ts";
import { RickCharacterProperties } from "../../business/rick.interface.ts";

export type ItemBase = {
  id: string;
};

export type ItemBaseWithDescription = {
  description: string;
} & ItemBase;

export type MultiselectDropdownItemProps = {
  onSelect: (selectedItemId: string) => void;
  onDeselect: (selectedItemId: string) => void;
  isSelected: boolean;
  searchedText: string;
} & RickCharacterProperties;

export type MultiselectProps = MultiselectOptionalProps & {
  selectedItems: ItemBaseWithDescription[];
  dropdownItems: ItemBaseWithDescription[];
  renderDropdownItems: (
    args: ItemBase & {
      potentialLastListElementRef:
        | ReturnType<typeof useIntersectionObserver>["ref"]
        | undefined;
    },
  ) => JSX.Element;
  isLoading: boolean;
  onRemoveSelectedItem: (id: string) => void;
  onFetchNextPage: () => void;
  searchedText: string;
  onSearchedTextChange: (searchedText: string) => void;
};

type MultiselectOptionalProps = {
  allowInfiniteScroll?: boolean;
};
