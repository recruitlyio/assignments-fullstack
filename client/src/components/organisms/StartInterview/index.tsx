import CustomDialog from "@/components/molecules/CustomDialog";
import NewInterviewForm from "@/components/molecules/NewInterviewForm";
import { Button } from "@/components/ui/button";
import React from "react";

const StartInterview = () => {
   const [showNewInterviewDialog, setShowNewInterviewDialog] =
      React.useState(false);

   const toggleNewInterviewDialog = () => {
      setShowNewInterviewDialog(!showNewInterviewDialog);
   };
   return (
      <div>
         <Button className="cursor-pointer" onClick={toggleNewInterviewDialog}>
            Start New Interview
         </Button>

         <CustomDialog
            isOpen={showNewInterviewDialog}
            title="Create New Interview"
            description="Please provide the name of the candidate and the difficulty level of the interview."
            onClose={toggleNewInterviewDialog}
         >
            <NewInterviewForm />
         </CustomDialog>
      </div>
   );
};

export default StartInterview;
