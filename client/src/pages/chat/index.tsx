import React, { useEffect } from "react";
import ChatMessage from "@/components/molecules/ChatMessage";
import ChatInput from "@/components/molecules/ChatInput";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { generateNewQuestions } from "@/api/question";
import { useMessageStore } from "@/store/messageStore";
import Loader from "@/components/atoms/Loader";

const ChatPage = () => {
   const { messages, setMessages, messageLoading, setMessageLoading } =
      useMessageStore();
   const navigate = useNavigate();
   // get interview id from url
   const interviewId = React.useMemo(
      () => window.location.pathname.split("/")[2],
      []
   );

   useEffect(() => {
      let isMounted = true;

      const fetchQuestions = async () => {
         if (!interviewId || messages.length > 0) return;
         
         setMessageLoading(true);
         try {
            const questions = await generateNewQuestions(
               interviewId,
               "initial"
            );
            if (!isMounted) return;

            if (questions.data && questions.data.length > 0) {
               const extractedQuestions = questions.data.flatMap(
                  (qList: any) => qList.questions || []
               );
               if (extractedQuestions.length > 0) {
                  setMessages(extractedQuestions);
               }
            }
         } catch (error) {
            console.error("Error fetching questions:", error);
         } finally {
            if (isMounted) {
               setMessageLoading(false);
            }
         }
      };

      fetchQuestions();

      return () => {
         isMounted = false;
      };
   }, [interviewId]); // Removed messages from dependency array

   if (messageLoading) {
      return <Loader />;
   }

   return (
      <div className="flex flex-col h-screen p-4">
         <nav className="border-b pb-3 ">
            <div
               className="flex items-center gap-3 cursor-pointer w-max"
               onClick={() => {
                  navigate("/");
               }}
            >
               <ChevronLeft />
               <span className="text-gray-700 font-semibold text-xl">
                  Interview Questions
               </span>
            </div>
         </nav>
         <div className="bg-orange-100 p-3">
            <span className="text-gray-800">
               Welcome to the AI Interview helper you can start the interview
               here with some basic understanding questions and gradually
               increase the complexity with following questions. To generate new
               questions click on the generate button below.
            </span>
         </div>
         <div className="flex-1 overflow-y-auto mb-4 p-3">
            {messages &&
               messages.map((message, index) => (
                  <ChatMessage key={index} question={message} />
               ))}
         </div>
         <div className="sticky bottom-0 bg-white p-4 border-t">
            <ChatInput disabled={messageLoading} />
         </div>
      </div>
   );
};

export default ChatPage;
