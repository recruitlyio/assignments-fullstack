import { useState } from 'react';
import { CheckCircle, PlusCircle, Send, Sparkles } from 'lucide-react';

import JobDetailsForm from '../components/JobDetailsForm';
import SkillAreaItem from '../components/SkillAreaItem';
import QuestionSettings from '../components/QuestionSettings';
import AdditionalNotes from '../components/AdditionalNotes';
import FormProgress from '../components/FormProgress';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { FormData, SkillArea } from '../types/form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Form() {

    const navigate = useNavigate();
    const [apiResponse, setApiResponse] = useState("");

    const [formData, setFormData] = useState<FormData>({
        jobTitle: '',
        jobDescription: '',
        companyName: '',
        skillAreas: [],
        difficulty: {
            level: 'intermediate',
            consistency: true,
        },
        practicalFocus: true,
        additionalNotes: '',
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    // const { errors, isValid } = useFormValidation(formData);

    const steps = [
        {
            id: 'job-details',
            label: 'Job Details',
            isComplete: formData.jobTitle !== '' && formData.jobDescription !== '' && formData.companyName !== '',
            isActive: currentStep === 0,
        },
        {
            id: 'skill-areas',
            label: 'Skill Areas',
            isComplete: formData.skillAreas.length > 0 && formData.skillAreas.every(skill => skill.name !== ''),
            isActive: currentStep === 1,
        },
        {
            id: 'settings',
            label: 'Settings',
            isComplete: currentStep > 2,
            isActive: currentStep === 2,
        },
        {
            id: 'review',
            label: 'Review',
            isComplete: submitSuccess,
            isActive: currentStep === 3,
        },
    ];

    const handleAddSkillArea = () => {
        setFormData({
            ...formData,
            skillAreas: [
                ...formData.skillAreas,
                {
                    name: '',
                },
            ],
        });
    };

    const handleRemoveSkillArea = (index: number) => {
        const updatedSkillAreas = [...formData.skillAreas];
        updatedSkillAreas.splice(index, 1);
        setFormData({
            ...formData,
            skillAreas: updatedSkillAreas,
        });
    };

    const handleSkillAreaChange = (index: number, updatedSkillArea: SkillArea) => {
        const updatedSkillAreas = [...formData.skillAreas];
        updatedSkillAreas[index] = updatedSkillArea;
        setFormData({
            ...formData,
            skillAreas: updatedSkillAreas,
        });
    };

    const handleNextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async () => {


        setIsSubmitting(true);
        try {
            const response = await axios.post("http://localhost:5000/api/query", formData);
            setApiResponse(response.data);
            setSubmitSuccess(true);

        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {submitSuccess ? (
                // <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                //     <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
                //         <div className="flex justify-center mb-6">
                //             <CheckCircle className="h-12 w-12 text-green-500" />
                //         </div>
                //         <h2 className="text-xl font-semibold text-gray-900 mb-2">Success!</h2>
                //         <p className="text-gray-600 mb-4">
                //             Your job assessment questions are being generated. You'll be notified when they're ready.
                //         </p>
                //         {/* You can access the response here and display any relevant info */}
                //         <div>
                //             <h3 className="font-medium text-gray-800">Response Data:</h3>
                //             {/* <pre className="text-sm text-gray-700">${apiResponse}</pre> */}
                //         </div>
                //         <Link to="/" className="text-blue-600 hover:underline">Go back to the homepage</Link>
                //     </div>
                // </div>
                <div>
                    <h3 className='text-black'>${apiResponse[0]}</h3>
                </div>
                )
                
                :


                <div className="min-h-screen bg-gray-50">
                    <header className="bg-white shadow-sm border-b border-gray-200">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Sparkles className="h-6 w-6 text-blue-600" />
                                    <h1 className="text-xl font-semibold text-gray-900">AI Question Generator</h1>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Generate Job Assessment Questions</h2>
                            <p className="text-gray-600">
                                Break down job requirements into core skill areas. Our AI will generate relevant questions
                                that test practical application, not just knowledge, with clear evaluation criteria.
                            </p>
                        </div>

                        <FormProgress steps={steps} />

                        {currentStep === 0 && (
                            <JobDetailsForm
                                jobTitle={formData.jobTitle}
                                jobDescription={formData.jobDescription}
                                companyName={formData.companyName}
                                onJobTitleChange={(value) => setFormData({ ...formData, jobTitle: value })}
                                onJobDescriptionChange={(value) => setFormData({ ...formData, jobDescription: value })}
                                onCompanyNameChange={(value) => setFormData({ ...formData, companyName: value })}
                            />
                        )}

                        {currentStep === 1 && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-medium text-gray-900">Skill Areas</h2>
                                    <Button
                                        onClick={handleAddSkillArea}
                                        icon={<PlusCircle className="h-4 w-4" />}
                                    >
                                        Add Skill Area
                                    </Button>
                                </div>

                                {formData.skillAreas.length === 0 ? (
                                    <Card className="bg-gray-50 border border-dashed border-gray-300 text-center p-8">
                                        <CardContent>
                                            <p className="text-gray-500 mb-4">No skill areas added yet</p>
                                            <Button
                                                onClick={handleAddSkillArea}
                                                icon={<PlusCircle className="h-4 w-4" />}
                                            >
                                                Add Your First Skill Area
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    formData.skillAreas.map((skillArea, index) => (
                                        <SkillAreaItem
                                            skillArea={skillArea}
                                            onChange={(updated) => handleSkillAreaChange(index, updated)}
                                            onRemove={() => handleRemoveSkillArea(index)}
                                            index={index}
                                        />
                                    ))
                                )}
                            </div>
                        )}

                        {currentStep === 2 && (
                            <>
                                <QuestionSettings
                                    difficultySettings={formData.difficulty}
                                    practicalFocus={formData.practicalFocus}
                                    onDifficultyChange={(level) =>
                                        setFormData({
                                            ...formData,
                                            difficulty: { ...formData.difficulty, level },
                                        })
                                    }
                                    onConsistencyChange={(consistency) =>
                                        setFormData({
                                            ...formData,
                                            difficulty: { ...formData.difficulty, consistency },
                                        })
                                    }
                                    onPracticalFocusChange={(value) =>
                                        setFormData({ ...formData, practicalFocus: value })
                                    }
                                />

                                <AdditionalNotes
                                    additionalNotes={formData.additionalNotes}
                                    onChange={(value) => setFormData({ ...formData, additionalNotes: value })}
                                />
                            </>
                        )}

                        {currentStep === 3 && (
                            <Card className="mb-8">
                                <CardHeader>
                                    <CardTitle>Review & Submit</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Job Details</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <p><span className="font-medium">Job Title:</span> {formData.jobTitle}</p>
                                            <p><span className="font-medium">Company:</span> {formData.companyName}</p>
                                            <div className="mt-2">
                                                <p className="font-medium">Job Description:</p>
                                                <p className="text-gray-700 whitespace-pre-wrap">{formData.jobDescription}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Skill Areas ({formData.skillAreas.length})</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <ul className="divide-y divide-gray-200">
                                                {formData.skillAreas.map((skill) => (
                                                    <li className="py-3">
                                                        <p className="font-medium">{skill.name}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Generation Settings</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <p><span className="font-medium">Difficulty Level:</span> {formData.difficulty.level}</p>
                                            <p><span className="font-medium">Maintain Consistent Difficulty:</span> {formData.difficulty.consistency ? 'Yes' : 'No'}</p>
                                            <p><span className="font-medium">Focus on Practical Application:</span> {formData.practicalFocus ? 'Yes' : 'No'}</p>
                                            {formData.additionalNotes && (
                                                <div className="mt-2">
                                                    <p className="font-medium">Additional Notes:</p>
                                                    <p className="text-gray-700">{formData.additionalNotes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="w-full">
                                        {submitSuccess ? (
                                            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-green-800">Form submitted successfully</h3>
                                                        <div className="mt-2 text-sm text-green-700">
                                                            <p>Your job assessment questions are being generated. You'll be notified when they're ready.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button
                                                className="w-full justify-center"
                                                onClick={handleSubmit}
                                                isLoading={isSubmitting}
                                                icon={<Send className="h-4 w-4" />}
                                                disabled={isSubmitting}
                                            >
                                                Generate Questions
                                            </Button>
                                        )}
                                    </div>
                                </CardFooter>
                            </Card>
                        )}

                        <div className="flex justify-between pt-4">
                            {currentStep > 0 && (
                                <Button variant="outline" onClick={handlePrevStep}>
                                    Previous
                                </Button>
                            )}
                            {currentStep < 3 && (
                                <Button
                                    className="ml-auto"
                                    onClick={handleNextStep}
                                    disabled={
                                        (currentStep === 0 && (!formData.jobTitle || !formData.jobDescription || !formData.companyName)) ||
                                        (currentStep === 1 && formData.skillAreas.length === 0)
                                    }
                                >
                                    Continue
                                </Button>
                            )}

                        </div>
                    </main>
                </div>
            }
        </>

    );
}

export default Form;