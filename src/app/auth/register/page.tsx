import { RegisterForm } from "./ui/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className="text-4xl mb-5">Registrar</h1>

      <RegisterForm />
    </div>
  );
}
