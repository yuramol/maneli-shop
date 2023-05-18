import { FC, ReactNode } from 'react';

type TableRowProps = {
  children: ReactNode;
};

export const TableRow: FC<TableRowProps> = ({ children }) => {
  return <tr className="border-b last-of-type:border-none">{children}</tr>;
};
