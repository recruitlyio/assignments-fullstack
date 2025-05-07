import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

export const HompePageFeature: FC = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-items-start flex-1/2">
        <div>
          <Image
            alt="Ai Iterviewing"
            src={"/ai-iterviewing.jpg"}
            height={800}
            width={800}
          ></Image>
        </div>
        <div className="pt-20 pl-10">
          <h2 className="pt-2 pb-2 text-3xl">Interview Simplified with AI.</h2>
          <p>
            Generate Interview Questions-answers using AI. Simply add the
            candidate with job description select the difficulty and you are
            good to go.
          </p>
          <div className="flex justify-center pt-20 gap-5">
            <button
              className="h-10 w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => router.push(`/candidate/create`)}
            >
              <>Create Candidate</>
            </button>{" "}
            <button
              className="h-10 w-72 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => router.push(`/candidate/list`)}
            >
              <>List All Candidates</>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
