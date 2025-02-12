import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Project {
  id: string;
  name: string;
  description?: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (updatedProject) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
    }),
    {
      name: "project-store", // Persist to localStorage
    }
  )
);
