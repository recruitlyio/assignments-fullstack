import QuestionFormComponent from "../components/questions/form";

const MainLayout = () => {
  return (
    <>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Col-4 (Beautiful Card) */}
          <div className="col-span-4 bg-white shadow-lg rounded-lg p-6">
            <QuestionFormComponent />
          </div>

          {/* Col-8 (Left as is) */}
          <div className="col-span-8 bg-gray-100 p-6">
            {/* Content for the 8-column goes here */}
            <h2 className="text-xl font-semibold">
              This is the 8-column content
            </h2>
            <p className="mt-4">
              Left section is untouched, as per your request. You can add
              additional components or content here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
