const ChipComponent = ({ level }) => {
  const colors = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-orange-100 text-orange-700",
    hard: "bg-red-100 text-red-700",
  };

  const chipClass = colors[level?.toLowerCase()] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full ${chipClass} capitalize`}
    >
      {level}
    </span>
  );
};

export default ChipComponent;
