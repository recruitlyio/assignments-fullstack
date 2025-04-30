
import axios from "axios";
import { mockData } from "./utils/genrateMock.js";
import questionBank from "./utils/questionBank.js";

export async function genrateData(req,res) {
    try {
        const { role, skills, experience } = req.body;
    
        const normalizedRole = normalizeRole(role);
        const skillList = parseSkills(skills);
    
        if (!normalizedRole || !questionBank[normalizedRole]) {
          return res.status(400).json({ error: 'Invalid role provided' });
        }

        const roleData = questionBank[normalizedRole];
        const allQuestions = [];
    
        skillList.forEach(skill => {
          const questions = roleData[skill]?.[experience];
          if (questions && questions.length > 0) {
            questions.forEach(q => {
              allQuestions.push({ skill, ...q });
            });
          }
        });
    
        const result = shuffle(allQuestions).slice(0, 10);
        if(result.length >0)  {
         return res.status(200).json(result.length ? result : [{ error: "No matching questions found" }]);
        }
        else{
         return res.status(400).json({ error: "No matching questions found" });
        }
        
      }  catch (error) {
        console.log(error)
    return res.status(500).json({ error: 'something went wrong' });

    }
    
}

const roleKeywords = {
  frontend: ['frontend', 'front', 'ui', 'client'],
  backend: ['backend', 'back', 'server', 'api',"db","database"],
};

const skillKeywords = {
  react: ['react',"rj"],
  angular: ['angular'],
  vuejs: ['vue', 'vuejs'],
  html: ['html'],
  css: ['css'],
  js: ['js', 'javascript'],
  bootstrap: ['bootstrap'],
  nextjs: ['next', 'nextjs'],
  node: ['node'],
  express: ['express'],
  nestjs: ['nestjs', 'nest'],
  database: ['database', 'db'],
  mongodb: ['mongo', 'mongodb'],
  mysql: ['mysql',"sql"],
  postgresql: ['postgres', 'postgresql'],
  python: ['python',"py"],
  php: ['php'],
  django: ['django',"jango"],
  flask: ['flask'],
  fastapi: ['fastapi'],
  typescript: ['ts', 'typescript']
};

const normalizeRole = (input) => {
  const lower = input.toLowerCase();
  for (const [role, keywords] of Object.entries(roleKeywords)) {
    if (keywords.some(k => lower.includes(k))) {
      return role;
    }
  }
  return null;
};

const parseSkills = (input) => {
  const foundSkills = [];
  const words = input.toLowerCase().split(/[\s,]+/);
  for (const [key, keywords] of Object.entries(skillKeywords)) {
    if (keywords.some(k => words.includes(k))) {
      foundSkills.push(key);
    }
  }
  return foundSkills;
};

const shuffle = (array) => {
    const shuffledArray = [...array];
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
  
      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
  
    return shuffledArray;
  };



