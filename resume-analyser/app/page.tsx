"use client"

import React, { useState } from 'react';
import { TextField, Autocomplete, Button, IconButton, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";


interface IFormData {
  about: string;
}

const AboutPage = () => {
const schema = yup.object().shape({
  about: yup.string().trim().required("Resume content is required"),
});

const {
  handleSubmit,
  register,
  formState: { errors },
  reset
} = useForm<IFormData>({
  defaultValues: {
    about: '',
  },
  resolver: yupResolver(schema),
  mode: "all",
});

const router = useRouter();
const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");
const [error, setError] = useState('');
const [responseMessage,setResponseMessage] = useState('');

const onSubmit = async (data: IFormData) => {
  setSubmitError("");
  setResponseMessage("");
  setSubmitting(true);
  try {
    const postBody = {text: data?.about};
    console.log('Submitting text:', JSON.stringify(postBody));

    const res = await fetch('/api/submitResume',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody), 
    });

    const res_data = await res.json();
    
    if (!res.ok) {
      setError(res_data.error || 'Something went wrong');
      setResponseMessage('');
    } else {
      setResponseMessage(res_data.message);
      // after uploading data
      setTimeout(() => {
        router.push("/resume?refresh=true");
      }, 1500); 
      setError('');
      reset(); // Clear the form input
    }

    setSubmitting(false);
  } catch (error) {
    setError('Network error');
    setResponseMessage('');
    setSubmitting(false);
  }
};


  return (
    <div className='h-[100vh] w-[100vw] bg-gradient-to-r to-purple-200'>
      <div className='h-full w-full p-10 flex flex-col justify-between items-center'>
        <div className='text-4xl font-bold text-purple-500'>Resume Parser</div>
        <div className='py-8 px-10 bg-white shadow-md my-auto rounded-xl border-gray-200 hover:shadow-lg flex flex-col justify-between items-center gap-8'>
          <div className='text-xl text-center font-semibold text-gray-800'>Paste your resume below</div>
          <div className='flex flex-col gap-3 items-center'>
          <TextField
              multiline
              minRows={2}
              maxRows={13}
              fullWidth
              type="text"
              {...register("about")}
              placeholder="Copy and Paste all your resume's text/content here..."
              sx={{
                "& .MuiInputBase-root": {
                  background: "rgba(54, 57, 62, 0.05)",
                  height:'300px',
                  width: '700px',
                  "&.Mui-focused fieldset": { borderColor: 'gray',
                                              borderWidth:'1px' },
                  
                },
              }}
            />
            {submitError && (
            <div className="text-red-600 font-semibold">{submitError}</div>
          )}
          {responseMessage && (
            <div className="text-green-600 font-semibold">{responseMessage}</div>
          )}
          </div>
            <button type="button" className="cursor-pointer bg-gradient-to-r from-purple-400  to-purple-800 hover:from-purple-400 hover:to-purple-900 px-8 py-2  text-white rounded-md w-[308px] h-[71px] text-3xl font-secondary shadow-md" onClick={handleSubmit(onSubmit)}>Upload</button>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;