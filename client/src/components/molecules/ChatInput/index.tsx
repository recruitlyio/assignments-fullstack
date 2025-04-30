import React from "react";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { generateNewQuestions } from "@/api/question";
import { useMessageStore } from "@/store/messageStore";

interface ChatInputProps {
   disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = () => {
   const { setMessages, messages, setMessageLoading } = useMessageStore();
   const interviewId = React.useMemo(
      () => window.location.pathname.split("/")[2],
      []
   );
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setMessageLoading(true);
      if (interviewId) {
         const questions = await generateNewQuestions(interviewId, "regenerate")
         if (questions.data && questions.data.length > 0) {
            const extractedQuestions = questions.data.flatMap((qList: any) => qList.questions || []);
            if (extractedQuestions.length > 0) {
               const mess = [...messages, ...extractedQuestions];
               setMessages(mess);
            }
         }
      }
      setMessageLoading(false);
   };

   return (
      <div className="flex gap-2">
         <Button type="submit" onClick={handleSubmit}>
            <span>Generate More</span>
            <SendIcon className="h-4 w-4" />
         </Button>
      </div>
   );
};

export default ChatInput;
