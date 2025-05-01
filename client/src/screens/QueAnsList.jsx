import React from "react";

const QueAnsList = ({ qaList }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      {qaList.map((qa, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-6 border-l-4 border-indigo-500"
        >
          <h2 className="text-lg font-semibold text-indigo-800 mb-2">
            Q{index + 1}: {qa.Que}
          </h2>
          <p className="text-gray-700">
            <span className="font-semibold text-green-700">Ans:</span> {qa.Ans}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QueAnsList;
