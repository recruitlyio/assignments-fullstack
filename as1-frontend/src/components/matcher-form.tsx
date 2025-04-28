"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import useMatcher from '@/hooks/use-matcher'
import { Input } from './ui/input'
import { AutosizeTextarea } from './ui/text-area'
import { Button } from './ui/button'
import FormError from './form-error'
import ReactMarkdown from "react-markdown";

export default function MatcherForm() {
    const { matcherForm, error, loading, submitMatcherForm, bestCandidate } = useMatcher()

    const onSubmit = matcherForm.handleSubmit(submitMatcherForm);

    console.log(bestCandidate?.resume[0].email)

  return (
    <div className='md:flex md:gap-x-12 space-y-12 md:space-y-0'>
      <Card className='min-w-[250px] sm:w-[450px] h-screen max-h-[38rem]'>
        <CardHeader>
            <CardTitle>
                Find your candidate
            </CardTitle>
            <CardDescription>
                Enter your job detail to find candidates
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...matcherForm}>
                <form onSubmit={onSubmit} className='space-y-4'>
                    <FormField 
                     control={matcherForm.control}
                     name='role'
                     render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                            <Input 
                             placeholder='Junior Software Developer' {...field} 
                             disabled={loading}
                             />
                            </FormControl>
                            <FormDescription>
                                Enter role you want to find the matching candidate
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                     )}
                    />
                    <FormField 
                     control={matcherForm.control}
                     name='description'
                     render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                            <AutosizeTextarea 
                            placeholder='Enter your Job description'
                            maxHeight={250}
                            minHeight={250}
                            className='resize-none'
                            disabled={loading}
                            {...field}
                            />
                            </FormControl>
                            <FormDescription>
                                Enter the job details like skill, requirement
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                     )}
                    />
                    <FormError message={error} />
                    <Button 
                      className='w-full cursor-pointer'
                      disabled={loading}
                      type='submit'
                      >
                        Submit
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
    {loading && (
                <div className="flex justify-center items-center p-8">
                    <div className="text-lg">Analyzing candidates...</div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            )}

            {!loading && bestCandidate && (
                <div className="md:flex md:gap-x-12 space-y-12 md:space-y-0">
                    <Card className="min-w-[250px] sm:w-[450px] h-screen max-h-[38rem] overflow-auto lg:w-[800px]">
                        <CardHeader>
                            <CardTitle>{bestCandidate.name}</CardTitle>
                            <CardDescription>Best Candidate for {matcherForm.getValues().role || "Junior Software Developer"}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div><strong>Skill Score:</strong> {bestCandidate.skillScore} / 10</div>
                                <div><strong>Experience Score:</strong> {bestCandidate.experienceScore}</div>
                                <div><strong>Potential Fit Score:</strong> {bestCandidate.potentialFitScore}</div>
                                <div><strong>Total Score:</strong> {bestCandidate.totalScore}</div>
                            </div>
                            
                            <div className="bg-gray-500 w-full h-[0.5]"></div>
                            
                            <div className="space-y-2">
                                <div><strong>Reason for Best Fit:</strong></div>
                                <ReactMarkdown>{bestCandidate.reason}</ReactMarkdown>
                            </div>
                            
                            <div className="bg-gray-500 w-full h-[0.5]"></div>
                            
                            <div className="space-y-2">
                                <div><strong>Resume Details:</strong></div>
                                <div><strong>Email:</strong> {bestCandidate.resume[0].email}</div>
                                <div><strong>Phone:</strong> {bestCandidate.resume[0].phone}</div>
                            </div>
                            
                            <div className="bg-gray-500 w-full h-[0.5]"></div>
                            
                            <div className="space-y-4">
                                <div><strong>Experience:</strong></div>
                                {bestCandidate.resume[0].experience.map((exp, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="font-bold">{exp.job_title} at {exp.company}</div>
                                        <div><strong>Duration:</strong> {exp.duration}</div>
                                        <div><strong>Responsibilities:</strong></div>
                                        <ul className="list-disc pl-4">
                                            {exp.responsibilities.map((responsibility, i) => (
                                                <li key={i}>{responsibility}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
    </div>
  )
}
