interface Props {
  label: string;
  value: string | number;
  onChange: (value: string) => void;

  type?: string;
  placeholder?: string;

  min?: number;
  max?: number;

  error?: string;
}

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  max,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>

      <input
        type={type}
        value={value}
        min={min}
        max={max}
        placeholder={placeholder}
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
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
