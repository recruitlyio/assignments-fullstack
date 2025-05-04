## Steps for the solution:

1. Created of a **Nextjs** app with an App route, Tailwind CSS and a internal file system as database.
2. Created of a UI with 2 routes/pages and 2 API endpoints.
3. First route/page is the Homepage, with a large textbox where user can paste their resume text. This text is uploaded as a JSON body,to the first API, which stores it in internal file system. Everytime we upload new resume, this file is overwritten.
4. Second route/page is actually the Resume Parse, with an UI showing parsed resume sectionwise with a structured format. We have chosen **Personal Information**, **Eductaion**, **Work Experience** and **Projects** as the sections.
5. The Second page is automatically routed after an user uploads the resume text, which triggers the 2nd API that is the doing the **Resume Parsing**.
6. This API has two layers one is the AI layers and other layer is preprocessing along with validation.
7. The AI layer contains a LLM, in which with the help of the **Zero-shot Prompt Engineering** we retrive each section separately in a JSON string form. We are using **Google Gemini 2.0 Flash** model, which can do about 1500 **Respones Per Minute (RPM)**.
8. The 2nd layer is the prepocessing layer, where pre-process the JSON string to extract the actual data. So, there are two different forms in which the retrived data is expected:
   (i) Array of Objects
   (ii) Objects
9. For example profile information can be only object, because we have single person in the resume. But, sometimes with a resume having large number of pages, the LLM might hallucinate and give us an Array of Objects, which should also be pre-processed properly. So, we have created a common pathway to pre-process the data using Regex Matching. But, also as the LLM has a Maximum Generation Token Limit, we have encounter that in few cases where the output is beyond this limit, the LLM truncates unexpectedly, and we catch this error. This is also a limitaion of using a LLM with limited Maximum Token Length both input and output.
10. Once, the data is pro-processed its parsed to the second route/page and parsed resume is displayed in the UI.

## Home Page:

## Parsed Resume Page:

## DEMO video:

https://github.com/Stitaprajna/assignments-fullstack/blob/main/resume-analyser/demo_.mov

## Deployed Endpoint:
