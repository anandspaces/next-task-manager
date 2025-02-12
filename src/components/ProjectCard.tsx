import React from "react";

interface ProjectCardProps {
  name: string;
  description?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold">{name}</h3>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

export default ProjectCard;
