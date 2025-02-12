"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <Link href="/dashboard/projects/create" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
        Create Project
      </Link>
      <div className="mt-4">
        {projects.map((project: any) => (
          <div key={project.id} className="p-4 bg-gray-200 rounded my-2 flex justify-between">
            <div>
              <h3 className="font-semibold">{project.name}</h3>
              <p>{project.description}</p>
            </div>
            <Link href={`/dashboard/projects/edit/${project.id}`} className="text-blue-500">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
