import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useTasks = () => {
  const queryClient = useQueryClient();

  // Fetch all tasks
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
  });

  // Create a new task
  const createTask = useMutation({
    mutationFn: async (task: { title: string; description: string; priority: number }) => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to create task");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  // Update a task
  const updateTask = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<any> }) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update task");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  // Delete a task
  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
