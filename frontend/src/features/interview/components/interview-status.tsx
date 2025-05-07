import { FC, useEffect, useState } from "react";
import { TQuestionAndAnswers } from "../types";
interface IInterviewStatusProps {
  questionsAndAnswers: TQuestionAndAnswers;
}

export const InterviewStatus: FC<IInterviewStatusProps> = ({
  questionsAndAnswers,
}) => {
  const [totalMarks, setTotalMarks] = useState(0);
  const [totalObtainedMarks, setTotalObtainedMarks] = useState(0);
  useEffect(() => {
    if (questionsAndAnswers.length) {
      let t = 0,
        to = 0;
      questionsAndAnswers.forEach((q) => {
        t = t + q.maxMarks;
        to = to + (q.marksObtained || 0);
      });
      setTotalMarks(t);
      setTotalObtainedMarks(to);
    }
  }, [questionsAndAnswers]);
  return (
    <>
      <div className="flex justify-center text-4xl pt-4 ">
        <h2>Grading</h2>
      </div>
      <div className="p-4">
        {questionsAndAnswers.map((item, index) => (
          <div className="pt-4">
            <div
              key={index}
              className="border rounded-2xl p-4 shadow bg-white "
            >
              <div className="text-lg font-semibold text-gray-800 mb-2">
                Q{index + 1}: {item.question}
              </div>
              <div className="text-gray-700 mb-2">
                <span className="font-medium">Answer:</span> {item.answers}
              </div>
              <div
                className={`text-lg ${
                  item.maxMarks / 2 < (item.marksObtained || 0)
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                <span className="font-medium">Grade:</span>{" "}
                {item.marksObtained || 0}/{item.maxMarks}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center p-4">
        <h3
          className={`text-2xl ${
            totalMarks / 2 < (totalObtainedMarks || 0)
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          Overall Grading: {totalObtainedMarks}/{totalMarks || 0}
        </h3>
      </div>
    </>
  );
};
