import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TCandidateInformation,
  candidateInformationFormValidation,
} from "../validations/candidate-information-form";
import { FormLabel } from "@/ui/form-label";
import { Selext } from "@/ui/input/selext";

interface ICandidateInformationFormProps {
  onSubmitForm: (data: TCandidateInformation) => void;
  isLoading: boolean;
}

export const CandidateInformationForm: FC<ICandidateInformationFormProps> = ({
  onSubmitForm,
  isLoading,
}) => {
  const {
    setValue,
    getValues,
    handleSubmit,
    control,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TCandidateInformation>({
    resolver: zodResolver(candidateInformationFormValidation),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex justify-center p-8"
    >
      <div>
        <div className="flex justify-items-start">
          <div className="pl-7 ">
            <FormLabel text="Job Role(*)" htmlFor="role" />
            <input
              {...register("role")}
              type="text"
              placeholder="Role"
              className="shadow appearance-none border border-black py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:border-2 focus:outline-none rounded-md focus:ring-2"
            />
            {errors.role && (
              <p className="text-red-500 text-xs italic">
                {errors.role.message}
              </p>
            )}
          </div>
          <div className="pl-7 ">
            <FormLabel text="Job Id(*)" htmlFor="name" />
            <input
              {...register("jobId")}
              type="text"
              placeholder="Id"
              className="shadow appearance-none border border-black py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:border-2 focus:outline-none rounded-md focus:ring-2"
            />
            {errors.jobId && (
              <p className="text-red-500 text-xs italic">
                {errors.jobId.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-items-start pt-4">
          <div className="pl-7 ">
            <FormLabel text="Candidate Name(*)" htmlFor="name" />
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="shadow appearance-none border border-black py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:border-2 focus:outline-none rounded-md focus:ring-2"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="pl-7 ">
            <FormLabel text="Experience Years(*)" htmlFor="exprerienceYears" />

            <Controller
              control={control}
              name="exprerienceYears"
              render={({ field }) => (
                <div className="w-72 sm:w-40">
                  <Selext
                    options={exprerienceYearsOptions}
                    onChange={(val) => {
                      setValue("exprerienceYears", val as number);
                    }}
                  />
                </div>
              )}
            />

            {errors.exprerienceYears && (
              <p className="text-red-500 text-xs italic">
                {errors.exprerienceYears.message}
              </p>
            )}
          </div>
          <div className="pl-7 ">
            <FormLabel text="Experience Months(*)" htmlFor="experienceMonths" />
            <Controller
              control={control}
              name="exprerienceYears"
              render={({ field }) => (
                <div className="w-72 sm:w-40">
                  <Selext
                    options={exprerienceMonthsOptions}
                    onChange={(val) => {
                      setValue("experienceMonths", val as number);
                    }}
                  />
                </div>
              )}
            />
            {errors.experienceMonths && (
              <p className="text-red-500 text-xs italic">
                {errors.experienceMonths.message}
              </p>
            )}
          </div>
        </div>

        <div className="pl-7 pt-4">
          <FormLabel text="Job Description(*)" htmlFor="jobDescription" />
          <textarea
            {...register("jobDescription")}
            placeholder="Job Description"
            className="h-72 w-[40rem] block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-primary focus:border-blue-500 "
          ></textarea>
          {errors.jobDescription && (
            <p className="text-red-500 text-xs italic">
              {errors.jobDescription.message}
            </p>
          )}
        </div>
        <div className="pt-4 flex justify-center">
          <button
            className="h-10 w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center gap-4">
                <div className="loader"></div>
                Creating...
              </div>
            ) : (
              <>Create Candidate</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

const exprerienceYearsOptions = [...Array(40).keys()].map((i) => {
  return { value: i + 1, label: "" + (i + 1) };
});
const exprerienceMonthsOptions = [...Array(11).keys()].map((i) => {
  return { value: i + 1, label: "" + (i + 1) };
});
