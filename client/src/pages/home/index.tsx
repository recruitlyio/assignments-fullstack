import StartInterview from "@/components/organisms/StartInterview";
import React from "react";

const HomePage = () => {
   return (
      <div className="flex flex-col gap-4 h-screen justify-center items-center">
         <div className="flex flex-col gap-1 text-center">
            <span className="text-gray-700 text-2xl font-semibold">
               Interview Question Generator
            </span>
            <span className="text-gray-600">
               Generate web developer interivew questions using AI
            </span>
         </div>
         <StartInterview />

         <div className="border-dashed border p-4 rounded-lg cursor-pointer">
            <span>Explore Previously Created Interviews</span>
         </div>
      </div>
   );
};

export default HomePage;
