# Approach To Question Generation

I generated an ANTHROPIC client with my ANTHROPIC API KEY. Then I tell the LLM what it is supposed to do. I tell it, it's an excellent interviewer who asks only technical interview questions.

And then tell it to generate technical questions with the calculated difficulty and other details

I give it some extra instructions to get the output in the desired format

# Difficulty Calibration

First I get the experience (in Years) from the query params and determine if that's a fresher, mid level, or senior.

If experience is under 2 Years, it's a fresher, if it is over 2 and under 5 years, it's a mid level engineer and if it's over 5 years it's a senior engineer.

# Technical Decisions

- TypeScript - For both frontend and backend (Type safety)
- Backend - Node.js and Express (Same language as frontned)
- Frontend - React (Dynamic, interactive UIs with reusable components and shareable state)
- User Interface - Shadcn/ui (For clean and sleek UI/UX)
- Anthropic - Fewer hallucinations and easier to integrate with node.js compared to OPEN AI SDK
- Packange Manager - pnpm (For fast installation of packages)

# Setup instructions

- In ./solution/backend/ copy .env.example to .env and provide your ANTHROPIC API KEY
- In ./solution/frontne/ copy .env.example to .env and provide your backend url (which is http://localhost:8000 here)
- cd ./solution/backend/ && pnpm install && pnpm run dev && cd ../..
- cd ./solution/client/ && pnpm install && pnpm run dev

Done, it is setup for running locally! 🎉

- Demo video is present at ./solution/demo.mov
