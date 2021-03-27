export type Order = 'asc' | 'desc';

export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T): number => {
  if (b[orderBy] < a[orderBy]) return -1;

  if (b[orderBy] > a[orderBy]) return 1;

  return 0;
};

export const getComparator = <Key>(
  order: Order,
  orderBy: keyof Key,
): ((a: Key, b: Key) => number) => {
  if (order === 'desc') return (a, b) => descendingComparator(a, b, orderBy);

  return (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T>(array: T[], comparator: (a: T, b: T) => number): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};
