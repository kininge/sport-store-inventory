type Props = { percentage: number };

export default function FillBar({ percentage }: Props) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={index}
          style={{
            width: 4,
            height: 50,
            borderRadius: 2,
            backgroundColor:
              index < Math.round((percentage / 100) * 50) ?
                "#3b82f6"
              : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}
