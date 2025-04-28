#Approach to Question Generation

- Cohere AI is used to generate technical interview questions by making API calls with a dynamic prompt based on the job title and experience level. The prompt requests a list of relevant interview questions with evaluation criteria for each.
- I am using "command" model of cohere ai which takes up to 10-20 seconds as it is more thoughtful.
- The API response is parsed to extract the questions and evaluation criteria, which are then displayed on the frontend.

#Calibartion of Difficulty Level

- The experience level (Junior, Medium, Senior, etc.) provided by the user is used to adjust the complexity of the generated questions. The prompt to Cohere AI specifies the experience level to fine-tune the relevance and difficulty of the questions.
- Different experience levels lead to varying question difficulty; for example, questions for senior roles might involve more complex scenarios and deeper technical insights.

#Technical Decisions and Trade-offs

- API Integration: Using the Cohere API for generating questions allows quick and scalable question generation, minimizing manual input.
- Frontend/Backend Separation: The frontend handles user input and displays results, while the backend manages API calls, which improves modularity and maintainability.
- Error Handling: Included basic error handling (e.g., missing API key or empty responses) to ensure the application gracefully handles failures without crashing.
- No Authentication: The app was kept simple without authentication, as the goal was focused on question generation.

#Setup instructions for local

- For frontend --> React app
- For backend --> Express server
- Setup environment variables in ".env" file
- Install dependencies:
  - dotenv
  - expresss
  - cors
  - cohere-ai

Link to Demo with Outputs: https://drive.google.com/file/d/1UTcdvhfmkb2rbi5qydZGeqxVRFV6u6qx/view?usp=sharing
