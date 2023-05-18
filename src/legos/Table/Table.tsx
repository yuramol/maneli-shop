import { FC, ReactNode } from 'react';

type TableProps = {
  children: ReactNode;
};

export const Table: FC<TableProps> = ({ children }) => {
  return (
    <div className="border-0 xl:border rounded-md">
      <table className="w-full whitespace-nowrap border-collapse border-spacing-0">
        {children}
      </table>
    </div>
  );
};
