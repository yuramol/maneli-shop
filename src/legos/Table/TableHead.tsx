import { FC, ReactNode } from 'react';

type TableHeadProps = {
  children: ReactNode;
};

export const TableHead: FC<TableHeadProps> = ({ children }) => {
  return <thead className="border-b">{children}</thead>;
};
