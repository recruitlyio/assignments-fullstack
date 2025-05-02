from fastapi import FastAPI, File, UploadFile, Form, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import fitz
import docx
import os
import logging
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Pydantic models
class Skill(BaseModel):
    name: str
    experience_level: str

class Candidate(BaseModel):
    skills: List[Skill]
    experience_years: float

class JobMatch(BaseModel):
    job_title: str
    match_score: float
    matched_skills: List[str]
    missing_skills: List[str]

def extract_text_from_resume(file_path: str) -> Dict:
    """Extract text from resume (mocked for speed)."""
    try:
        text = ""
        if file_path.lower().endswith('.pdf'):
            doc = fitz.open(file_path)
            for page in doc:
                text += page.get_text("text").strip() + "\n"
            doc.close()
        elif file_path.lower().endswith('.docx'):
            doc = docx.Document(file_path)
            text = "\n".join([para.text.strip() for para in doc.paragraphs if para.text.strip()])
        
        # Mock resume data
        return {
            "skills": [
                Skill(name="Python", experience_level="intermediate"),
                Skill(name="JavaScript", experience_level="beginner"),
                Skill(name="SQL", experience_level="advanced"),
                Skill(name="Java", experience_level="beginner")
            ],
            "experience_years": 2.0,
            "raw_text": text
        }
    except Exception as e:
        logger.error("Error extracting resume: %s", str(e))
        return {}

def analyze_job_description(job_description: str) -> Dict:
    """Enhanced rule-based JD parsing for distinct skill extraction."""
    try:
        jd_lower = job_description.lower()
        skills = []
        
        # Define skill keywords and their implied experience levels
        skill_map = {
            "python": "intermediate",
            "javascript": "beginner",
            "sql": "advanced",
            "java": "beginner",
            "react": "intermediate",
            "aws": "beginner",
            "docker": "intermediate",
            "machine learning": "advanced",
            "data analysis": "intermediate",
            "node.js": "beginner"
        }
        
        # Extract skills based on keywords
        for skill, level in skill_map.items():
            if skill in jd_lower:
                # Check for experience level modifiers
                if f"advanced {skill}" in jd_lower or f"expert {skill}" in jd_lower:
                    level = "advanced"
                elif f"basic {skill}" in jd_lower or f"beginner {skill}" in jd_lower:
                    level = "beginner"
                skills.append({"name": skill.capitalize(), "experience_level": level})
        
        # Extract experience years
        min_experience_years = 1.0
        exp_patterns = [
            (r"(\d+)\+?\s*(?:year|yr)s?", lambda x: float(x)),  # e.g., "2 years", "2+ years"
            (r"(one|two|three|four|five)\s*(?:year|yr)s?", lambda x: ["one", "two", "three", "four", "five"].index(x.lower()) + 1)
        ]
        for pattern, converter in exp_patterns:
            match = re.search(pattern, jd_lower)
            if match:
                min_experience_years = converter(match.group(1))
                break
        
        # Log extracted data for debugging
        logger.info("JD skills: %s, Experience: %s years", skills, min_experience_years)
        
        return {
            "skills": skills,
            "min_experience_years": min_experience_years
        }
    except Exception as e:
        logger.error("Error analyzing JD: %s", str(e))
        return {}

def match_candidate_to_jobs(candidate: Candidate, jobs: List[Dict]) -> List[JobMatch]:
    """Match candidate to jobs with penalties for missing skills."""
    matches = []
    candidate_skills = [skill.name for skill in candidate.skills]
    candidate_text = " ".join(candidate_skills)
    
    for job in jobs:
        job_skills = [skill["name"] for skill in job["skills"]]
        job_text = " ".join(job_skills)
        
        # Cosine similarity
        vectorizer = TfidfVectorizer()
        vectors = vectorizer.fit_transform([candidate_text, job_text]) if job_skills else [[0]]
        similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0] if job_skills else 0.0
        
        # Rule-based matching
        matched_skills = []
        missing_skills = []
        for job_skill in job["skills"]:
            matched = False
            for cand_skill in candidate.skills:
                if job_skill["name"].lower() == cand_skill.name.lower():
                    if job_skill["experience_level"] in ["beginner", cand_skill.experience_level]:
                        matched_skills.append(job_skill["name"])
                        matched = True
                    else:
                        missing_skills.append(f"{job_skill['name']} ({job_skill['experience_level']})")
            if not matched and job_skill["name"] not in [s.split(" ")[0] for s in missing_skills]:
                missing_skills.append(f"{job_skill['name']} ({job_skill['experience_level']})")
        
        # Experience match with amplified difference
        exp_diff = candidate.experience_years - job["min_experience_years"]
        exp_match = min(1.0, max(0.0, 1.0 + exp_diff / max(job["min_experience_years"], 1.0)))
        
        # Combined score with penalty for missing skills
        skill_penalty = len(missing_skills) * 0.1  # 10% penalty per missing skill
        match_score = (0.7 * similarity + 0.3 * exp_match) * (1.0 - skill_penalty) * 100
        match_score = max(0.0, round(match_score, 2))
        
        matches.append(JobMatch(
            job_title=job["job_title"],
            match_score=match_score,
            matched_skills=matched_skills,
            missing_skills=missing_skills
        ))
    
    return sorted(matches, key=lambda x: x.match_score, reverse=True)

@app.get("/", response_class=HTMLResponse)
async def get_upload_form(request: Request):
    """Render upload form."""
    return templates.TemplateResponse("upload.html", {"request": request})

@app.post("/match", response_class=HTMLResponse)
async def match_candidate(
    request: Request,
    resume: UploadFile = File(...),
    job_title1: str = Form(...),
    jd1: str = Form(...),
    job_title2: str = Form(...),
    jd2: str = Form(...),
    job_title3: str = Form(...),
    jd3: str = Form(...),
    job_title4: str = Form(...),
    jd4: str = Form(...),
    job_title5: str = Form(...),
    jd5: str = Form(...),
    job_title6: str = Form(...),
    jd6: str = Form(...)
):
    """Process resume and six job titles/JDs."""
    try:
        # Validate file
        allowed_extensions = {'.pdf', '.docx'}
        ext = os.path.splitext(resume.filename)[1].lower()
        if ext not in allowed_extensions:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        resume_path = os.path.join("static", resume.filename)
        with open(resume_path, "wb") as f:
            f.write(await resume.read())
        
        # Extract candidate info
        candidate_info = extract_text_from_resume(resume_path)
        if not candidate_info:
            raise HTTPException(status_code=400, detail="Failed to extract resume")
        
        candidate = Candidate(
            skills=candidate_info["skills"],
            experience_years=candidate_info["experience_years"]
        )
        
        # Process JDs
        job_inputs = [
            {"title": job_title1, "jd": jd1},
            {"title": job_title2, "jd": jd2},
            {"title": job_title3, "jd": jd3},
            {"title": job_title4, "jd": jd4},
            {"title": job_title5, "jd": jd5},
            {"title": job_title6, "jd": jd6}
        ]
        jobs = []
        for i, job_input in enumerate(job_inputs, 1):
            if job_input["jd"].strip() and job_input["title"].strip():
                job_info = analyze_job_description(job_input["jd"])
                job_info["job_title"] = job_input["title"]
                jobs.append(job_info)
            else:
                logger.warning("Skipping empty JD %d", i)
        
        if not jobs:
            raise HTTPException(status_code=400, detail="No valid job descriptions")
        
        # Match candidate
        matches = match_candidate_to_jobs(candidate, jobs)
        
        # Clean up
        if os.path.exists(resume_path):
            os.remove(resume_path)
        
        return templates.TemplateResponse(
            "result.html",
            {"request": request, "matches": matches}
        )
    except Exception as e:
        logger.error("Error in match_candidate: %s", str(e))
        return templates.TemplateResponse(
            "result.html",
            {"request": request, "error": str(e)}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)