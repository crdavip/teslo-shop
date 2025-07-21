import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className="text-4xl mb-5">Ingresar</h1>

      <div className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5 border-gray-300 focus:outline-0 focus:border-blue-500" type="email" />

        <label htmlFor="email">Contraseña</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5 border-gray-300 focus:outline-0 focus:border-blue-500" type="password" autoComplete="off" />

        <button className="btn-primary cursor-pointer">Ingresar</button>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">o</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/register" className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>
      </div>
    </div>
  );
}
