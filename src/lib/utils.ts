/** Format a date to a readable string */
export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/** Capitalize the first letter of a string */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/** Convert task priority to a color */
export const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    Low: "text-green-500",
    Medium: "text-yellow-500",
    High: "text-red-500",
  };
  return colors[priority] || "text-gray-500";
};
