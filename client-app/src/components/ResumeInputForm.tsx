import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Loader2, FileText } from 'lucide-react';

interface IFormInput {
  resumeText: string;
}

interface ResumeInputFormProps {
  onSubmit: (data: IFormInput) => void;
  isLoading: boolean;
}

const ResumeInputForm: React.FC<ResumeInputFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleFormSubmit: SubmitHandler<IFormInput> = data => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
      <div>
        <label htmlFor='resumeText' className='block text-sm font-medium text-gray-700'>
          Paste Resume Text
        </label>
        <textarea
          id='resumeText'
          rows={15}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border'
          {...register('resumeText', { required: 'Resume text is required' })}
          disabled={isLoading}
        ></textarea>
        {errors.resumeText && (
          <p className='mt-1 text-sm text-red-600'>{errors.resumeText.message}</p>
        )}
      </div>

      <div>
        <button
          type='submit'
          className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='mr-2 h-5 w-5 animate-spin' />
          ) : (
            <FileText className='mr-2 h-5 w-5' />
          )}
          {isLoading ? 'Parsing...' : 'Parse Resume'}
        </button>
      </div>
    </form>
  );
};

export default ResumeInputForm;
