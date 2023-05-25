import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

type Props = {
  name: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  label?: string;
  placeholder?: string;
  step?: number | string;
  min?: number | string;
  max?: number | string;
  isError?: boolean;
  errorText?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const TextField: FC<Props> = ({
  name,
  value,
  type = 'text',
  label,
  placeholder,
  step,
  min,
  max,
  isError,
  errorText,
  onBlur,
  onChange,
}) => {
  return (
    <label className="relative flex flex-col gap-2 font-semibold w-full">
      {label}
      <input
        className={`font-normal px-4 py-3 rounded-[50px] transition-all duration-150 outline-none border ${
          isError
            ? 'border-red-400 focus:border-red-400'
            : 'border-slate-300 focus:border-slate-500'
        }`}
        type={type}
        name={name}
        value={value}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isError && (
        <div className="absolute left-4 -bottom-5 font-normal text-red-400 text-xs">
          {errorText}
        </div>
      )}
    </label>
  );
};
