"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4">
        {tasks.map((task: any) => (
          <div key={task.id} className="p-4 bg-gray-200 rounded my-2">
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
}
