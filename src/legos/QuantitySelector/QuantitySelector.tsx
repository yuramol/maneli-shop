import { ChangeEvent, FC } from 'react';
import { FormikErrors, FormikValues } from 'formik';
import { Icon } from '../Icon';
import { IconButton } from '../Button';

type Props = {
  name: string;
  value: number;
  setValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
};

export const QuantitySelector: FC<Props> = ({ name, value, setValue }) => {
  const handleIncrease = () => {
    setValue(name, value + 1);
  };

  const handleDecrease = () => {
    if (value > 1) {
      setValue(name, value - 1);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value)) {
      setValue(name, value);
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <IconButton
        icon="Minus"
        type="button"
        className="flex justify-center items-center w-8 h-8"
        onClick={handleDecrease}
      />
      <div className="relative">
        <span className="font-semibold">{value}</span>
        <input
          className="hidden"
          type="number"
          readOnly={true}
          value={value}
          name={name}
          onChange={handleInputChange}
        />
      </div>
      <IconButton
        icon="Plus"
        type="button"
        className="flex justify-center items-center w-8 h-8"
        onClick={handleIncrease}
      />
    </div>
  );
};
