/**
 * Converts an array into smaller chunks or groups.
 *
 * @param array the array to chunk into group
 * @param length the length of each chunk
 */
export const chunk = <T>(array: T[], length: number): T[][] => {
  return array.reduce((rows: T[][], currentValue: T, index: number) => {
    if (index % length === 0) {
      rows.push([currentValue]);
    } else {
      rows[rows.length - 1].push(currentValue);
    }
    return rows;
  }, [] as T[][]);
};
