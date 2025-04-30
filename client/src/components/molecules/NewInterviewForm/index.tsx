import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInterview } from "@/api/interview";
import { useNavigate } from "react-router";

const formSchema = z.object({
   jobRequirements: z.string().min(1, "Job requirements are required"),
   experienceLevel: z.enum(["fresher", "oneToThree", "threePlus"]),
   difficultyLevel: z.enum(["easy", "medium", "hard"]),
});

type FormValues = z.infer<typeof formSchema>;

const NewInterviewForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
   } = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         experienceLevel: "fresher",
         difficultyLevel: "easy",
      },
   });
   const navigate = useNavigate();

   const onSubmit = async (data: FormValues) => {
      try {
         console.log(data);
         const response = await createInterview(data);
         if (response.status !== 200) {
            console.log("Interview created successfully");
            return;
         }
         if(response.data && response.data.newinterview && response.data.newinterview.id) {
            navigate(`/chat/${response.data.newinterview.id}`);
         }
      } catch (error) {
         console.error("Error submitting form:", error);
      }
   };

   return (
      <div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
         >
            <div className="flex flex-col gap-3">
               <Label className="text-gray-600">
                  Describe the job requirements
               </Label>
               <Textarea
                  {...register("jobRequirements")}
                  placeholder="Enter job requirements..."
               />
               {errors.jobRequirements && (
                  <span className="text-sm text-red-500">
                     {errors.jobRequirements.message}
                  </span>
               )}
            </div>
            <div className="flex flex-col gap-3">
               <Label className="text-gray-600">
                  Candidate Experience Level
               </Label>
               <RadioGroup
                  value={watch("experienceLevel")}
                  onValueChange={(value) => {
                     setValue("experienceLevel", value);
                  }}
                  className="flex items-center gap-4"
               >
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="fresher" id="fresher" />
                     <Label htmlFor="fresher">Fresher</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="oneToThree" id="oneToThree" />
                     <Label htmlFor="oneToThree">{"1 to 3 years"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="threePlus" id="threePlus" />
                     <Label htmlFor="threePlus">{"3 years +"}</Label>
                  </div>
               </RadioGroup>
               {errors.experienceLevel && (
                  <span className="text-sm text-red-500">
                     {errors.experienceLevel.message}
                  </span>
               )}
            </div>
            <div className="flex flex-col gap-3">
               <Label className="text-gray-600">Difficulty Level</Label>
               <RadioGroup
                  value={watch("difficultyLevel")}
                  onValueChange={(value) => {
                     setValue("difficultyLevel", value);
                  }}
                  className="flex items-center gap-4"
               >
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="easy" id="easy" />
                     <Label htmlFor="easy">Easy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="medium" id="medium" />
                     <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="hard" id="hard" />
                     <Label htmlFor="hard">Hard</Label>
                  </div>
               </RadioGroup>
               {errors.difficultyLevel && (
                  <span className="text-sm text-red-500">
                     {errors.difficultyLevel.message}
                  </span>
               )}
            </div>
            <Button
               type="submit"
               className="cursor-pointer"
               disabled={isSubmitting}
            >
               {isSubmitting ? "Starting..." : "Start New Interview"}
            </Button>
         </form>
      </div>
   );
};

export default NewInterviewForm;
