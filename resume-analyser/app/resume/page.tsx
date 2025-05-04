"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function ResumeParser(){

    const [resumeValue,setResumeValue] = useState<string>('')
    const searchParams = useSearchParams();
    const refresh = searchParams.get("refresh")
    console.log("Refresh Param:", refresh);


    useEffect(() => {
        console.log("Effect triggered, refresh:", refresh); // Log refresh value to check if the effect is triggered
    
        const fetchOutput = async () => {
          if (refresh === 'true') {
            try {
              console.log("Fetching resume data...");
    
              // API call
              const res = await fetch("/api/promptEngineering", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: '',
              });
    
              const data = await res.json();
              console.log("Fetched data:", data); // Log the API response
    
              if (data.analysis) {
                setResumeValue(data.analysis); // Update the state with the analysis data
              } else {
                console.error("No 'analysis' in response data");
              }
            } catch (error) {
              console.error("Error fetching resume data:", error);
            }
          }
        };
    
        // Only fetch if refresh is true
        if (refresh === 'true') {
          fetchOutput();
        }
      }, [refresh]); // Re-run effect if refresh changes
    
      // Check if resume value is being updated
      useEffect(() => {
        console.log("resumeValue updated:", resumeValue);
      }, [resumeValue]);

    

    console.log(resumeValue);
    const personal = Array.isArray(resumeValue[0]) ? resumeValue[0]: [resumeValue[0]];
    const education = Array.isArray(resumeValue[1]) ? resumeValue[1] : [resumeValue[1]];
    const projects = Array.isArray(resumeValue[2]) ? resumeValue[2]: [resumeValue[2]];
    const experience = Array.isArray(resumeValue[3]) ? resumeValue[3]: [resumeValue[3]];
    const skills = Array.isArray(resumeValue[4]) ? resumeValue[4]: [resumeValue[4]];
    const rawEmail = personal[0]?.Email
    const rawPhoneNumber = personal?.[0]?.["Phone Number"] ?? [];
    const emails = Array.isArray(rawEmail) ? rawEmail: rawEmail? [rawEmail]: [];
    const phones = Array.isArray(rawPhoneNumber) ? rawPhoneNumber: rawPhoneNumber? [rawPhoneNumber]: [];


    function extractFirstName(fullName: string): string {
        if (!fullName) return '';
      
        const honorifics = ['mr', 'mr.', 'mrs', 'mrs.', 'ms', 'ms.', 'dr', 'dr.'];
      
        // Clean and normalize
        const words = fullName
          .toLowerCase()
          .replace(/\./g, '') // remove dots
          .split(' ')
          .filter(Boolean);   // remove empty strings
      
        // Remove honorific if present
        const cleanedWords = honorifics.includes(words[0]) ? words.slice(1) : words;
      
        // Capitalize first name properly (optional)
        const firstName = cleanedWords[0];
        return firstName ? firstName[0].toUpperCase() + firstName.slice(1) : '';
      }

    
    if (!resumeValue) {
        return <div className="flex flex-col justify-center items-center h-[100vh] space-y-2 text-2xl">
                    <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                    <div>Parsing your resume...</div>
                </div>;
      }
    

    return(
        <div className='h-[100vh] w-[100vv] bg-gradient-to-r from-blue-100 to-purple-200 px-20 pt-20'>
            <div className='flex flex-col gap-4 bg-white shadow-md border-gray-200 p-10 h-full overflow-y-auto rounded hover:shadow-lg cursor-pointer'>
                <div className='text-center text-4xl font-semibold text-blue-800'>{typeof personal[0]?.Name === "string"? extractFirstName(personal[0]?.Name):''}'s Resume</div>
                <div className='flex flex-col gap-2 shadow-md border-gray-200 p-7 bg-slate-50 rounded-xl'>
                    <div className='text-2xl text-blue-800 '>Personal Information</div>
                    <div className='text-2xl font-semibold mt-1'>{personal?personal[0]?.Name:''}</div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col gap-3 justify-between items-start'>
                            {phones.map((phone, index) => (
                            <div key={index} className='flex flex-row gap-2 justify-between items-center'>
                                <PhoneIcon/>
                                {phone.trim()}
                            </div>
                            ))}
                        </div>
                        <div className='flex flex-col gap-3 justify-between items-start'>
                            {emails.map((email, index) => (
                            <div key={index} className='flex flex-row gap-2 justify-between items-center'>
                                <EmailIcon/>
                                {email.trim()}
                            </div>
                            ))}
                        </div>
                        <div className='flex flex-row gap-2 justify-between items-center'>
                            <LinkedInIcon/>
                            {personal?personal[0]?.["LinkedIn Profile"]:''}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3 shadow-md border-gray-200 p-7 bg-slate-50 rounded-xl'>
                    <div className='text-2xl text-blue-800'>Education History</div>
                    {education?.map((item, index) => (
                    <div key={index} className="bg-gray-200 p-4 rounded shadow text-center flex flex-col gap-3 font-primary">
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-2xl font-semibold'>{item? item["Institution/University"]:''}</div>
                            <div className='italic'>{item? item["Location"]:''}</div>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-lg text-gray-600 flex flex-col justify-start gap-4'>
                                <div>{item?.Degree}, {item? item["Major/Honors"]:''}</div>
                            </div>
                            <div className='italic'>{item? item["Start Date"]:''} - {item? item["End Date"]:''}</div>
                        </div>
                        <div className='flex flex-col gap-1 text-left px-2'>
                                    {typeof item?.["Extra info"] === "string"? item["Extra info"].split(',').map((item1,index1)=>(
                                        <li key={index1} className=''>
                                            {item1}
                                        </li>
                                    )):''}
                        </div>
                        
                        </div>
                        
                        ))}
                </div>
                <div className='flex flex-col gap-2 shadow-md border-gray-200 p-7 bg-slate-50 rounded-xl'>
                    <div className='text-2xl text-blue-800'>Skills</div>
                    <div className="grid grid-cols-6 gap-4 p-4">
                    {skills.map((item:string, index:number) => (
                    <div key={index} className="bg-gray-200 p-4 rounded shadow text-center">
                        {item}
                        </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-6 shadow-md border-gray-200 p-7 bg-slate-50 rounded-xl'>
                    <div className='text-2xl text-blue-800'>Work Experience</div>
                    {experience?.map((item, index) => (
                    <div key={index} className="bg-gray-200 p-4 rounded shadow text-center flex flex-col gap-3 font-primary">
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-2xl font-semibold'>{item?.company}</div>
                            <div className='italic'>{item?.location}</div>
                        </div>
                        <div className='flex flex-col'>
                        <div className='flex flex-row justify-between items-center gap-4'>
                            <div className='text-lg text-gray-600 flex flex-col justify-start gap-3'>
                                <div>{item?.title}</div>
                            </div>
                            <div className='italic'>{item? item["dates"]:''}</div>
                        </div>
                        <div className='grid grid-cols-1 text-left gap-2 mt-5'>
                                    {item?item["description"].map((item1:string,index1:number)=>(
                                        <li key={index1} className=''>
                                            {item1.trim()}
                                        </li>
                                    )):''}
                         </div>
                        </div>
                    </div>
                        
                        ))}
                </div>
                <div className='flex flex-col gap-6 shadow-md border-gray-200 p-7 bg-slate-50 rounded-xl'>
                    <div className='text-2xl text-blue-800'>Projects</div>
                    {projects?.map((item,index)=>(
                        <div key={index} className='bg-gray-200 p-4 rounded'>
                            <div className='text-xl font-semibold'>{item?.Name}</div>
                            <div className='grid grid-cols-1 text-left gap-2 mt-5'>
                                    {item?item["Description"].map((item1:string,index1:number)=>(
                                        <li key={index1} className=''>
                                            {item1.trim()}
                                        </li>
                                    )):''}
                         </div>
                        </div>
                        
                    ))}
                </div>
            </div> 
        </div>
    )
}

