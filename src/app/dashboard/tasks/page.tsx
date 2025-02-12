"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <Link href="/dashboard/tasks/create" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
        Create Task
      </Link>
      <div className="mt-4">
        {tasks.map((task: any) => (
          <div key={task.id} className="p-4 bg-gray-200 rounded my-2 flex justify-between">
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <Link href={`/dashboard/tasks/edit/${task.id}`} className="text-blue-500">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
