import * as React from 'react';

const lowerBound = (number: number, limit: number): number => {
  return number >= limit ? number : limit;
};

export interface UsePaginationOptions {
  /**
   * The number of items to be shown on each page.
   */
  itemsPerPage: number;
  /**
   * items total count.
   */
  totalItems: number;
  /**
   * The initial page selected.
   *
   * @default 1
   */
  defaultPage?: number;
  /**
   * The number of pages to be shown in the pagination.
   *
   * @default 5
   */
  pageRange?: number;
}

export interface UsePaginationValue {
  /**
   * The group of page numbers in the pagination.
   */
  pages: number[];

  /**
   * The current page.
   */
  currentPage: number;

  /**
   * Changes the current page to the page number.
   */
  gotoPage: React.Dispatch<React.SetStateAction<number>>;

  /**
   * This function increases `current` by one.
   */
  goToNextPage: () => void;

  /**
   * This function decreases `current` by one.
   */
  goToPreviousPage: () => void;

  /**
   * If there are pages and the `current` is less than total number of pages, this will be true.
   */
  canNextPage: boolean;

  /**
   * If there are pages and the `current` page is greater than 0, this will be true.
   */
  canPreviousPage: boolean;
}

/**
 * A React hook to help manage pagination state
 */
export const usePagination = (options: UsePaginationOptions): UsePaginationValue => {
  const {
    itemsPerPage,
    totalItems,
    defaultPage = 1,
    pageRange = 5,
  } = options;

  const [currentPage, setCurrentPage] = React.useState(defaultPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startPage = React.useMemo(() => {
    if (currentPage - pageRange / 2 <= 0) return 1;

    if (currentPage + pageRange / 2 > totalPages) {
      return lowerBound(totalPages - pageRange + 1, 1);
    }

    return Math.ceil(currentPage - pageRange / 2);
  }, [currentPage, pageRange, totalPages]);

  const getPages = React.useMemo(() => {
    const pages: number[] = [];

    for (let i = 0; i < pageRange && i < totalPages; i += 1) {
      pages.push(startPage + i);
    }

    return pages;
  }, [startPage, pageRange, totalPages]);

  const goToNextPage = React.useCallback(() => setCurrentPage((prevPage) => prevPage + 1), []);

  const goToPreviousPage = React.useCallback(() => setCurrentPage((prevPage) => prevPage - 1), []);

  return {
    pages: getPages,
    currentPage,
    gotoPage: setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    canNextPage: currentPage < totalPages,
    canPreviousPage: currentPage > 1,
  };
};
