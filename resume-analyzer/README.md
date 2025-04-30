Instructions to run each folder is added inside of them

## Approach
- Straight forward based on the requirements.
  - User copy pastes some unstructured data into textarea -> which is parsed by the backend and ingested by an LLM to output structured data
  - Since input the is open to users, it is vulnerable to attacks, so I have added some basic security handling with LLM prompt and rate limiting. Would have looked into more viable solutions if i had more time to look into things like XSS

## Area of improvement
- One area we could Look into is google drive url analysing for resume data

## Tech Stack/Technologies:
- React with TypeScript(NextJS) for frontend
- Express TypeScript for backend
- LLM Model used - Openai GPT-4o because I had better results 
- Edge cases handled
  - Invalid resume data
  - OpenAI LLM context bypass
  - Rate Limiting is handled on the frontend with lodash debouncing.