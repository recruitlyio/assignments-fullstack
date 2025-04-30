import React from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/store/messageStore";

interface ChatMessageProps {
   question: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = React.memo(({ question }) => {
   const messageContainerClasses = "flex w-full flex-col gap-4";

   const questionClasses = cn(
      "self-end max-w-[80%] rounded-lg px-6 py-3",
      "bg-blue-600 text-white shadow-md"
   );

   const answerClasses = cn(
      "self-start max-w-[80%] rounded-lg px-6 py-3 my-4",
      "bg-gray-100"
   );

   return (
      <div className={messageContainerClasses}>
         {question.question && (
            <div className={questionClasses}>
               <p className="text-base leading-relaxed">{question.question}</p>
            </div>
         )}

         {question.answer && (
            <div className={answerClasses}>
               <p className="text-base leading-relaxed text-gray-800">
                  {question.answer && (
                     <div className={answerClasses}>
                        <div className="text-base leading-relaxed text-gray-800 space-y-2">
                           {question.answer
                              .split("*")
                              .filter((line) => line.trim() !== "")
                              .map((line, index) => (
                                 <div key={index} className="pl-4 relative">
                                    <span className="absolute left-0 text-blue-600 font-bold">
                                       •
                                    </span>
                                    <span className="ml-4">{line.trim()}</span>
                                 </div>
                              ))}
                        </div>
                     </div>
                  )}
               </p>
            </div>
         )}
      </div>
   );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
