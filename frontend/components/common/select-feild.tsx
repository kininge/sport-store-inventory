interface Option {
  label: string;
  value: string | number;
}

interface Props {
  label: string;

  value: string | number;

  onChange: (value: string) => void;

  options: Option[];

  error?: string;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="
          border
          border-gray-300
          rounded-xl
          px-3
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-primary
        "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
