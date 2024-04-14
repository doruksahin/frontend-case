import { render, fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MultiselectInputContainer } from "../ui-components/Multiselect/MultiselectInput/MultiselectInputContainer.tsx";

describe("MultiselectInput", () => {
  const mockOnOpenDropdown = vi.fn();
  const mockOnCloseDropdown = vi.fn();
  const mockOnSearchedTextChange = vi.fn();
  const mockOnRemoveSelectedItem = vi.fn();

  beforeEach(() => {
    mockOnOpenDropdown.mockClear();
    mockOnCloseDropdown.mockClear();
    mockOnSearchedTextChange.mockClear();
    mockOnRemoveSelectedItem.mockClear();
  });

  it("renders successfully", () => {
    render(
      <MultiselectInputContainer
        isDropdownOpen={false}
        onOpenDropdown={mockOnOpenDropdown}
        onCloseDropdown={mockOnCloseDropdown}
        selectedItems={[]}
        onRemoveSelectedItem={mockOnRemoveSelectedItem}
        searchedText=""
        onSearchedTextChange={mockOnSearchedTextChange}
      />,
    );
    expect(
      screen.getByTestId("multiselect-input-container"),
    ).toBeInTheDocument();
  });

  it("calls onOpenDropdown when input container is clicked", () => {
    render(
      <MultiselectInputContainer
        isDropdownOpen={false}
        onOpenDropdown={mockOnOpenDropdown}
        onCloseDropdown={mockOnCloseDropdown}
        selectedItems={[]}
        onRemoveSelectedItem={mockOnRemoveSelectedItem}
        searchedText=""
        onSearchedTextChange={mockOnSearchedTextChange}
      />,
    );
    fireEvent.click(screen.getByTestId("multiselect-input-container"));
    expect(mockOnOpenDropdown).toHaveBeenCalled();
  });

  it("calls onCloseDropdown when dropdown is clicked while open", () => {
    render(
      <MultiselectInputContainer
        isDropdownOpen={true}
        onOpenDropdown={mockOnOpenDropdown}
        onCloseDropdown={mockOnCloseDropdown}
        selectedItems={[]}
        onRemoveSelectedItem={mockOnRemoveSelectedItem}
        searchedText=""
        onSearchedTextChange={mockOnSearchedTextChange}
      />,
    );
    fireEvent.click(screen.getByTestId("multiselect-dropdown-icon"));
    expect(mockOnCloseDropdown).toHaveBeenCalled();
  });

  it("calls onSearchedTextChange when input field value changes", () => {
    render(
      <MultiselectInputContainer
        isDropdownOpen={false}
        onOpenDropdown={mockOnOpenDropdown}
        onCloseDropdown={mockOnCloseDropdown}
        selectedItems={[]}
        onRemoveSelectedItem={mockOnRemoveSelectedItem}
        searchedText=""
        onSearchedTextChange={mockOnSearchedTextChange}
      />,
    );
    fireEvent.change(screen.getByTestId("multiselect-input"), {
      target: { value: "test" },
    });
    expect(mockOnSearchedTextChange).toHaveBeenCalledWith("test");
  });
});
