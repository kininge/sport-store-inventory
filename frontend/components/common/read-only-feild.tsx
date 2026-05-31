interface Props {
  label: string;

  value: string | number;
}

export default function ReadOnlyField({ label, value }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>

      <div
        className="
          border
          border-gray-300
          rounded-xl
          px-3
          py-2
          bg-muted
          text-muted-foreground
        "
      >
        {value}
      </div>
    </div>
  );
}
