import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { jobDescriptions } from './src/models/jobDescription';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

const conversationState = {
  inquiringAbout: "",
  currentJob: "",
};

const candidateState = {
  collecting: false,
  currentFieldIndex: 0,
  info: {
    fullName: '',
    experience: '',
    skills: '',
    location: '',
    noticePeriod: ''
  }
};

const candidateQuestions: { field: keyof typeof candidateState.info; question: string }[] = [
  { field: "fullName", question: "Can I know your full name?" },
  { field: "experience", question: "How many years of experience do you have?" },
  { field: "skills", question: "What are your core skills or technologies?" },
  { field: "location", question: "What is your current location?" },
  { field: "noticePeriod", question: "What is your notice period?" }
];

const getCandidateSummary = (info: typeof candidateState.info) => {
  return `Here's the summary of your profile:<br>Full Name: ${info.fullName}<br>Experience: ${info.experience}<br>Skills: ${info.skills}<br>Location: ${info.location}<br>Notice Period: ${info.noticePeriod}<br><br>Thanks for sharing your details! Our team will get in touch soon.
`.trim();
};

app.post('/api/message', (req: Request, res: Response) => {
  const userMessage = req.body.message.toLowerCase();

  const matchSection = (section: string, synonyms: string[]) => {
    return synonyms.some(synonym => userMessage.includes(synonym));
  };

  const sectionSynonyms = {
    responsibilities: ['responsibilities', 'duties', 'tasks', 'work'],
    qualifications: ['qualifications', 'skills', 'experience', 'education'],
    benefits: ['benefits', 'perks', 'compensation', 'health benefits']
  };

  const getJobDetails = (jobTitle: string) => {
    return jobDescriptions.find(job => job.title.toLowerCase() === jobTitle.toLowerCase());
  };

  const availableJobs = jobDescriptions.map(job => job.title.toLowerCase());

  if (candidateState.collecting) {
    const currentField = candidateQuestions[candidateState.currentFieldIndex].field;
    candidateState.info[currentField] = req.body.message;

    candidateState.currentFieldIndex++;

    if (candidateState.currentFieldIndex < candidateQuestions.length) {
      const nextQuestion = candidateQuestions[candidateState.currentFieldIndex].question;
      res.send({ reply: nextQuestion });
    } else {
      candidateState.collecting = false;
      const summary = getCandidateSummary(candidateState.info);
      res.send({ reply: summary });
    }

    return;
  }

  if (userMessage.includes("apply") || userMessage.includes("interested") || userMessage.includes("share my details")) {
    candidateState.collecting = true;
    candidateState.currentFieldIndex = 0;
    candidateState.info = { fullName: '', experience: '', skills: '', location: '', noticePeriod: '' };

    res.send({ reply: candidateQuestions[0].question });
    return;
  }

  const matchedJob = availableJobs.find(title =>
    userMessage.includes(title) || userMessage.includes(title.split(' ')[0])
  );

  if (matchedJob) {
    const matchedJobObj = jobDescriptions.find(job => job.title.toLowerCase() === matchedJob);
    conversationState.currentJob = matchedJobObj?.title || "";
    conversationState.inquiringAbout = "title";
    res.send({
      reply: `I see you're interested in the job title: ${matchedJobObj?.title}. Would you like to know about the responsibilities, qualifications, or benefits?`
    });
    return;
  }

  if (userMessage.includes("available openings") || userMessage.includes("job openings") || userMessage.includes("open positions") || userMessage.includes("available roles") || userMessage.includes("openings")) {
    const openings = jobDescriptions.map(job => job.title).join(', ');
    res.send({ reply: `Here are the available openings: ${openings}. Which one would you like to know more about?` });
    return;
  }

  if (matchSection('responsibilities', sectionSynonyms.responsibilities)) {
    const jobDetails = getJobDetails(conversationState.currentJob);
    if (jobDetails) {
      conversationState.inquiringAbout = "responsibilities";
      res.send({ reply: `Here are the responsibilities for ${conversationState.currentJob}: ${jobDetails.responsibilities.join(', ')}. Would you like to know the qualifications or benefits?` });
    } else {
      res.send({ reply: `Sorry, I couldn't find details for the job you're asking about.` });
    }
    return;
  }

  if (matchSection('qualifications', sectionSynonyms.qualifications)) {
    const jobDetails = getJobDetails(conversationState.currentJob);
    if (jobDetails) {
      conversationState.inquiringAbout = "qualifications";
      res.send({ reply: `Here are the qualifications for ${conversationState.currentJob}: ${jobDetails.qualifications.join(', ')}. Would you like to know about the benefits?` });
    } else {
      res.send({ reply: `Sorry, I couldn't find details for the job you're asking about.` });
    }
    return;
  }

  if (matchSection('benefits', sectionSynonyms.benefits)) {
    const jobDetails = getJobDetails(conversationState.currentJob);
    if (jobDetails) {
      conversationState.inquiringAbout = "benefits";
      res.send({ reply: `Here are the benefits for ${conversationState.currentJob}: ${jobDetails.benefits.join(', ')}. Would you like to know about anything else?` });
    } else {
      res.send({ reply: `Sorry, I couldn't find details for the job you're asking about.` });
    }
    return;
  }

  if (userMessage === "yes" || userMessage === "no") {
    res.send({ reply: `Got it. You can also say "apply" to share your profile.` });
    return;
  }

  res.send({
    reply: `Sorry, I couldn't find anything matching your query. You can ask about the job's responsibilities, qualifications, or say "apply" to share your details.`
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// import express from 'express';
// import cors from 'cors';

// const app = express();
// const port = 3001;

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());

// app.post('/api/message', (req, res) => {
//   res.send({ reply: 'Message received' });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
