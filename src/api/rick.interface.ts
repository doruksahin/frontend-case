export type EntityDTO = {
  id: string;
};

export type BaseDropdownItem = EntityDTO & {
  description: string;
  isSelected: boolean;
};

export type PaginationInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};
