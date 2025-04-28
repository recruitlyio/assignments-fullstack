import { PromptTemplate } from '@langchain/core/prompts';
import { model } from '../helper/model.js';
import { z } from 'zod';
import { RESUME_CANDIDATES } from '../data/resume.js';
import { JsonOutputParser, StringOutputParser } from "@langchain/core/output_parsers";
import { CandidatesEvaluation, CandidatesWithTotalScore, convertCandidateTextToObject } from '../helper/score.js';
import { bindToolModel } from '../helper/tools.js';

type Incovation = {
  tool: string,
  label: string,
  properties?: {
    name: string
  }
  arguments?: any;
}

export const skillsSchema = z.object({
  skills: z.array(z.string())
})

export const normalizeSkills = async (skills: string[]) => {
  const prompt = (`
    You are a system responsible for maintaining a Skills Knowledge Graph.
    
    Given a list of raw skill names:
    
    1. **Standardize** each skill into its canonical form (e.g., "ReactJS" → "React", "Node js" → "Node.js").
    2. **Identify Similar Terms**: If two or more skills represent the same technology (e.g., "React", "ReactJS", "React.js"), treat them as aliases and standardize them to a single canonical name.
    3. **For each standardized skill**, ensure that:
        - If the skill node does **not exist** in the graph, **create** a node with label "Skill" and property { name: "<normalized skill name>" } using the "create_node" tool.
        - If there are terms that represent aliases, **create a relationship** between them using a relation type like "ALIAS_FOR" to connect them to the canonical skill.
    4. **Link related skills**: If skills are often used together (e.g., "React" and "Node.js"), create a relationship of type "RELATED_TO" between their nodes using the "add_relation" tool.
    
    **Instructions**:
    - Always respond **only** with JSON describing the required tool invocations.
    - Use the tools: "create_node" to create nodes, "add_relation" to create relationships.
    - If a term already exists as an alias, do not create a new node for it. Instead, add a relationship to the canonical skill node.
    
    **Input Skills**:
     ${JSON.stringify(skills)}
`);

try {
  const parser = new JsonOutputParser()
    const res = await bindToolModel.pipe(parser).invoke(prompt);

    const toolInvocations = res;
      
      const skillsCreated: string[] = [];
  
      toolInvocations.forEach((invocation: Incovation) => {
      if (invocation.tool === 'create_node' && invocation.properties) {
        skillsCreated.push(invocation.properties.name);
      }
      if (invocation.tool === 'create_node' && invocation.arguments) {
        const properties = invocation.arguments.properties;
        if (properties && properties.name) {
          skillsCreated.push(properties.name);
        }
      }
      });
  
      return skillsCreated;
  } catch (error) {
    console.error("Failed to parse LLM response:", error);
    return [];
  }
};

export const normalizeAllCandidatesSkills = async () => {
  const updatedCandidates = [];

  for (const candidate of RESUME_CANDIDATES) {
    const uniqueSkills = [...new Set(candidate.skills.map(skill => skill.trim()))];
    const normalizedSkills = await normalizeSkills(uniqueSkills);

    updatedCandidates.push({
      ...candidate,
      skills: [...new Set(normalizedSkills.map(skill => skill))]
    });
  }

  return updatedCandidates;
};


export const extractSkills = async (data: string) => {
  const prompt = PromptTemplate.fromTemplate(`
    Extract a list of technical skills, tools, and frameworks mentioned in the text below. Respond with a JSON array of strings only.

    Text: {text}
    `)

    try {

    const formatted = await prompt.format({ text: data })
    const structureOutput = model.withStructuredOutput(skillsSchema)
    const res = await structureOutput.invoke(formatted)

    const skills = normalizeSkills(res.skills)

    return skills
    } catch (error) {
      console.error("Failed to parse LLM response:", error)
    }
}

export async function generateSkillAssessment(candidates: typeof RESUME_CANDIDATES) {
  const prompt = `
Input:

A list of candidates, each with their job title, company, duration, responsibilities, and the overall experience they have mentioned in their resume.

Task:

For each candidate, evaluate their work experience and assign a score based on the depth of their expertise. Scores should range from 0 to 25.

Focus on distinguishing between superficial keyword matches and genuine expertise.

Consider the following factors when scoring:

Relevance of Responsibilities: Do the candidate's responsibilities demonstrate practical, hands-on experience, or do they seem vague or superficial?

Complexity of Tasks: Are the tasks described high-level, or do they show involvement in detailed, complex work requiring genuine expertise?

Impact and Results: Did the candidate contribute to significant projects, and if so, did they provide measurable results (e.g., increased efficiency, cost savings, growth, etc.)?

Leadership and Mentorship: Did the candidate show leadership, mentorship, or decision-making involvement beyond basic tasks?

Level of Independence: Did the candidate work independently, or were they heavily reliant on others?

Technological Proficiency: Did the candidate work with advanced tools, technologies, or methodologies that show deep technical understanding or innovation?

Scoring System:

0-12 (Entry-level): Responsibilities are vague or not clearly articulated. Keywords used seem generic without significant context or results. The candidate's involvement appears minimal or limited to non-technical tasks.

13-24 (Intermediate): The candidate shows more detail in their experience with specific tools or technologies. They are able to articulate challenges and outcomes, but their role may still be more focused on execution rather than leadership or innovation.

24-35 (Advanced): The candidate demonstrates deep expertise, takes initiative, and has measurable impact. They work independently on complex tasks, contribute to strategic decisions, and have leadership or mentoring responsibilities.

Output:

For each candidate, output their assigned score (out of 25), with an explanation justifying the score based on the evaluation criteria.

Candidates: 
${JSON.stringify(candidates)}

`
try {
  const parser = new StringOutputParser()
  const res = await model.pipe(parser).invoke(prompt)

  return await convertCandidateTextToObject(res)

} catch (error) {
  console.error("Failed to parse LLM response:", error)
}

;
}


export async function generatePotentialAssessment(jobDescription: string, candidates: typeof RESUME_CANDIDATES) {
  const prompt = `
Input:

A list of candidates, each with their job title, skills.

Task:

For each candidate, assign a score between 0 to 25 based on the following evaluation criteria:

Evaluation Criteria:
- **Transferable Skills**: Does the candidate have the necessary skills for the role?
- **Experience Fit**: How relevant is the candidate's experience to the job requirements?
- **Learning Potential**: Does the candidate show potential to grow into the role based on their experience?
- **Leadership Potential**: Does the candidate have experience that shows leadership or growth beyond their initial role?


Scoring System:

0-10 (Entry-level): Responsibilities are vague or not clearly articulated. Keywords used seem generic without significant context or results. The candidate's involvement appears minimal or limited to non-technical tasks.

11-20 (Intermediate): The candidate provides more specific details about their experience with tools or technologies. They describe challenges and outcomes but are still more focused on execution rather than leadership or innovation.

20-30 (Advanced): The candidate shows deep expertise, initiative, and measurable impact. They work independently on complex tasks, contribute to strategic decisions, and hold leadership or mentoring roles.

Output:

For each candidate, output their assigned score (out of 25), and provide a justification for the score based on the above criteria and summerize it into single paragraph for justification.

Candidates: 
${JSON.stringify(candidates)}

Job Description:
${jobDescription}
`;


  const parser = new StringOutputParser()
  const res = await model.pipe(parser).invoke(prompt)

  return convertCandidateTextToObject(res)
}


export async function generateWhyHeIsBestCandidate(
  experienceScoredCandidates: CandidatesEvaluation, 
  potentialFitScoredCandidates: CandidatesEvaluation, 
  candidatesWithTotalScore: CandidatesWithTotalScore[],
  bestCandidate: CandidatesWithTotalScore,
  role: string) {
  const prompt = `We evaluated multiple candidates based on three criteria: skill match, experience relevance, and potential cultural fit. 
Here are their scores, their experiance depth and potential fit for the ${role}:
  Candidate Scores:
  ${candidatesWithTotalScore.map(c => `
    Candidate ID: ${c.candidateId}
    - Skill Score: ${c.skillScore}
    - Experience Score: ${c.experienceScore}
    - Potential Fit Score: ${c.potentialFitScore}
    - Total Score: ${c.totalScore}
    `).join("\n")}

  Candidates Experience Justification:
  ${experienceScoredCandidates.candidates.map(c => `
  Candidate Name: ${c.name}
   - Experience Depth Reasoning: ${c.justification || "No experience details provided."}
    `).join("\n")}

  Potential Fit Justification:
  ${potentialFitScoredCandidates.candidates.map(c => `
    Candidate Name: ${c.name}
  - Potential Fit Reasoning: ${c.justification || "No fit reasoning provided."}
  `).join("\n")}

  The best candidate is Candidate ID ${bestCandidate.candidateId}.

  Write a professional justification explaining why this candidate was selected over others. Highlight their strengths, considering both their scores and qualitative evaluations.
`
  try {
    const parser = new StringOutputParser()
    const res = await model.pipe(parser).invoke(prompt)

    return res
  } catch (error) {
    console.error("Failed to parse LLM response:", error)
  }
}


