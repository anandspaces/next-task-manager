export default function LandingPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Welcome to Task Manager</h1>
      <p className="text-lg md:text-xl mt-4 text-gray-700">Organize your tasks efficiently and boost productivity.</p>
      <a 
        href="/register" 
        className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-lg shadow-md"
      >
        Get Started
      </a>
    </div>
  );
}
