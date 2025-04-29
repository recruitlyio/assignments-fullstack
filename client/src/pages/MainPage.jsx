import { useState } from "react";
import QuestionFormComponent from "../components/questions/form";
import QuestionListComponent from "../components/questions/list";
import ApiHelper from "../apiHelper";
import Toast from "../components/general/toast";
import axios from "axios";

const MainPage = () => {
  const [questions, setQuestions] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();

      const payload = {
        jobTitle,
        skill,
        experienceLevel,
        isNew,
      };

      //   call api
      const res = await ApiHelper.post("/questions/generate", payload);

      if (!res || res?.status !== 200) throw "Something went wrong";

      //   setting questions
      setQuestions(res?.data?.data?.response);
      Toast.success(res?.data?.message);
    } catch (error) {
      console.log(error, "from error ----");

      let errMsg = "";

      if (axios.isAxiosError(error)) {
        errMsg = error?.response?.data?.error;
      } else {
        // Non-Axios error
        console.error("Unexpected Error: ", error);
        errMsg = "Something went wrong";
      }

      Toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 min-h-screen">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Col-4 (Fixed Height Card) */}
          <div className="col-span-4 h-screen overflow-hidden">
            <QuestionFormComponent
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              skill={skill}
              setSkill={setSkill}
              experienceLevel={experienceLevel}
              setExperienceLevel={setExperienceLevel}
              isNew={isNew}
              setIsNew={setIsNew}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {/* Col-8 (Scrolls Vertically) */}
          <div className="col-span-8 p-4 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <QuestionListComponent questions={questions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
