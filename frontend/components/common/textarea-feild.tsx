interface Props {
  label: string;

  value: string;

  onChange: (value: string) => void;

  placeholder?: string;

  error?: string;
}

export default function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>

      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="
          border
          border-gray-300
          rounded-xl
          px-3
          py-2
          min-h-32
          focus:outline-none
          focus:ring-2
          focus:ring-primary
        "
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
