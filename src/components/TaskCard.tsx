import React from "react";

interface TaskCardProps {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, status }) => {
  const statusColors = {
    pending: "bg-yellow-500",
    "in-progress": "bg-blue-500",
    completed: "bg-green-500",
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}
      <span className={`px-2 py-1 text-sm text-white rounded ${statusColors[status]}`}>
        {status.replace("-", " ")}
      </span>
    </div>
  );
};

export default TaskCard;
