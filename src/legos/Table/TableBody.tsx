import { FC, ReactNode } from 'react';

type TableBodyProps = {
  children: ReactNode;
};

export const TableBody: FC<TableBodyProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};
