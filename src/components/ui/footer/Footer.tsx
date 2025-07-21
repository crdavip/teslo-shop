import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center text-xs mb-10">
      <div>
        <Link href="#" className="mx-3">
          Términos y condiciones
        </Link>
        <Link href="#" className="mx-3">
          Políticas de Privacidad
        </Link>
      </div>
      <Link href="/" className="mt-3">
        <span className="antialiased font-bold">Teslo</span>
        <span> | Shop </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
    </div>
  );
};
