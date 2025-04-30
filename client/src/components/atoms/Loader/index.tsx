import { useMessageStore } from "@/store/messageStore";
import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
   const { messageLoading } = useMessageStore();
   return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
         <div className="flex flex-col items-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
               Interview Generator
            </h1>
            <span className="text-gray-700">
               Generating new set of questions for your new interview
            </span>
            <div>
               <ClipLoader
                  size={100}
                  color="#3B82F6"
                  loading={messageLoading}
               />
            </div>
         </div>
      </div>
   );
};

export default Loader;
