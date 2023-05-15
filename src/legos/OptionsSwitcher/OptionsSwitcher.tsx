import { ChangeEventHandler, FC } from 'react';

type Option = {
  label?: string;
  value: string;
};

type Props = {
  title?: string;
  showLabels?: boolean;
  name: string;
  value: string;
  options: Option[];
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const OptionsSwitcher: FC<Props> = ({
  title,
  showLabels = true,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {!!title && <p className="font-semibold">{title}</p>}
      <div className="flex flex-row gap-2">
        {options.map(option => (
          <label
            key={option.value}
            className={`flex justify-center items-center cursor-pointer rounded-full transition-all duration-200 border hover:border-[#9142C4] ${
              value === option.value ? 'border-[#9142C4]' : ''
            } ${
              showLabels
                ? 'py-1 px-3 text-sm ' +
                  (value === option.value ? 'text-white bg-[#9142C4]' : 'bg-[#F4F3FD]')
                : 'w-10 h-10'
            }`}
          >
            <span
              className={`${!showLabels ? 'border rounded-full w-6 h-6' : ''}`}
              style={!showLabels ? { background: option.value } : undefined}
            >
              {showLabels ? option.label ?? option.value : ''}
            </span>
            <input
              className="hidden"
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
