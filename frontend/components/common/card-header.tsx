export default function CardHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <header className="flex items-center mb-8">
      {icon && <div className="mr-3 p-3 bg-gray-200 rounded-full">{icon}</div>}
      <h2 className="text-xl font-bold">{title}</h2>
    </header>
  );
}
