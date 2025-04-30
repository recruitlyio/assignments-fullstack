import { getAllInterviews } from "@/api/interview";
import { useInterviewStore } from "@/store/interviewStore";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";

const OldInterviewList = () => {
   const { setInterviews, interviews } = useInterviewStore();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchInterviews = async () => {
         try {
            const response = await getAllInterviews();
            if (response.status !== 200) {
               console.log("Interviews fetched successfully");
               return;
            }
            if (response.data && response.data.interviews) {
               setInterviews(response.data.interviews);
            }
         } catch (error) {
            console.error("Error fetching interviews:", error);
         }
      };
      fetchInterviews();
   }, []);

   return (
      <div className="py-8 h-[400px] overflow-y-scroll">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {interviews.map((interview) => (
               <Card 
                  key={interview.id}
                  className="transition-transform duration-200 hover:scale-102 hover:shadow-lg"
                  onClick={() => navigate(`/chat/${interview.id}`)}
               >
                  <CardHeader>
                     <h2 className="text-2xl font-semibold">{interview.title}</h2>
                  </CardHeader>
                  
                  <CardContent>
                     <p className="text-muted-foreground mb-4">
                        {interview.description}
                     </p>

                     <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="default">
                           Experience: {interview.experienceLevel}
                        </Badge>
                        <Badge variant="secondary">
                           Difficulty: {interview.difficultyLevel}
                        </Badge>
                     </div>
                  </CardContent>

                  <CardFooter>
                     <p className="text-sm text-muted-foreground">
                        Created: {format(new Date(interview.createdAt), 'MMM dd, yyyy')}
                     </p>
                  </CardFooter>
               </Card>
            ))}
         </div>
      </div>
   );
};

export default OldInterviewList;
