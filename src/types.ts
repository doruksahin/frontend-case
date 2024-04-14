export type ItemBase = {
  id: string;
};

export type ItemBaseWithDescription = {
  description: string;
} & ItemBase;

export type RickItem = ItemBaseWithDescription & {
  episodePlayCount: number;
};

export type MultiselectDropdownItemProps = {
  onSelect: (selectedItemId: string) => void;
  onDeselect: (selectedItemId: string) => void;
  isSelected: boolean;
} & RickItem;
