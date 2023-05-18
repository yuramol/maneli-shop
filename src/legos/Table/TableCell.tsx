import { FC, ReactNode } from 'react';

type TableCellProps = {
  head?: boolean;
  children?: ReactNode;
};

export const TableCell: FC<TableCellProps> = ({ head, children }) => {
  if (head) {
    return <th className="p-4 text-center">{children}</th>;
  } else {
    return <td className="p-4 text-center">{children}</td>;
  }
};
