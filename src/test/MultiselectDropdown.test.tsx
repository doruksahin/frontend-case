import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MultiselectDropdownContainer } from "../ui-components/Multiselect/MultiselectDropdownContainer.tsx";

describe("MultiselectDropdownContainer", () => {
  const mockFetchNextPage = vi.fn();

  beforeEach(() => {
    mockFetchNextPage.mockClear();
  });

  it("renders succesfully", () => {
    render(
      <MultiselectDropdownContainer
        isLoading={true}
        dropdownItems={[]}
        onFetchNextPage={mockFetchNextPage}
        allowInfiniteScroll={false}
      />,
    );
  });

  it("renders loading spinner when isLoading is true", () => {
    render(
      <MultiselectDropdownContainer
        isLoading={true}
        dropdownItems={[]}
        onFetchNextPage={mockFetchNextPage}
        allowInfiniteScroll={false}
      />,
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it('renders "No results found" message when dropdownItems is empty', () => {
    render(
      <MultiselectDropdownContainer
        isLoading={false}
        dropdownItems={[]}
        onFetchNextPage={mockFetchNextPage}
        allowInfiniteScroll={false}
      />,
    );

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("calls onFetchNextPage when latest item intersected with IntersectionObserver", () => {});
});
