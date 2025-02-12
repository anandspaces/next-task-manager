export default function LandingPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold">Welcome to Task Manager</h1>
      <p className="text-lg mt-4">Organize your tasks efficiently</p>
      <a href="/login" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Get Started</a>
    </div>
  );
}
