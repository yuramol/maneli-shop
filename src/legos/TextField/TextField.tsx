import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

type Props = {
  name: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  label?: string;
  placeholder?: string;
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
  isError,
  errorText,
  onBlur,
  onChange,
}) => {
  return (
    <label className="flex flex-col gap-2 font-semibold">
      {label}
      <input
        className={`font-normal p-4 rounded-full transition-all duration-150 outline-none border ${
          isError ? 'border-red-400 focus:border-red-400' : 'border-slate-300 focus:border-slate-500'
        }`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isError && <div className="font-normal text-red-400 text-xs ml-4">{errorText}</div>}
    </label>
  );
};
