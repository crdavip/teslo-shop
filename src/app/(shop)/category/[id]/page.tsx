import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryIDPage({ params }: Props) {
  const { id } = params;

  if (id === "kids") {
    notFound();
  }
  
  return (
    <div>
      <h1>Category 123 Page</h1>
    </div>
  );
}
