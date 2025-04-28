import { knowledgeGraph } from '../data/knowledgeGraph';
import { generateContent } from './ai.service';

export class SkillExtractor {
  private async normalizeSkillNameWithLLM(skill: string): Promise<string> {
    const prompt = `
      Given the following skill: "${skill}"
      And this knowledge graph of skills: ${JSON.stringify(Object.keys(knowledgeGraph))}
      Suggest the most appropriate standardized skill name from the graph.
      Consider:
      1. Exact matches
      2. Common variations
      3. Related technologies
      Return only the skill name, nothing else.
    `;

    try {
      const suggestedSkill = await generateContent(prompt);
      return suggestedSkill.trim();
    } catch (error) {
      console.error('Error normalizing skill with LLM:', error);
      return this.basicNormalizeSkillName(skill);
    }
  }

  private basicNormalizeSkillName(skill: string): string {
    const normalized = skill.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    for (const [key, value] of Object.entries(knowledgeGraph)) {
      if (key.toLowerCase() === normalized) return key;
      if (value.aliases.some(alias => alias.toLowerCase() === normalized)) return key;
    }
    
    for (const [key, value] of Object.entries(knowledgeGraph)) {
      if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
        return key;
      }
    }
    
    return skill;
  }

  public async normalizeSkillName(skill: string): Promise<string> {
    // First try our existing normalization
    const normalized = this.basicNormalizeSkillName(skill);
    if (knowledgeGraph[normalized]) return normalized;

    // If not found, use LLM to suggest the closest match
    return this.normalizeSkillNameWithLLM(skill);
  }

  public async extractSkills(text: string): Promise<string[]> {
    const prompt = `
      Extract technical skills from the following text:
      "${text}"
      
      Consider:
      1. Programming languages
      2. Frameworks
      3. Tools
      4. Technologies
      5. Industry-specific skills
      
      Return a JSON array of skills only, nothing else.
      Each skill should be a standardized name from our knowledge graph.
    `;

    try {
      const extractedSkills = await generateContent(prompt);
      const skills = JSON.parse(extractedSkills);
      
      // Normalize all extracted skills
      const normalizedSkills = await Promise.all(
        skills.map((skill: string) => this.normalizeSkillName(skill))
      );
      
      return [...new Set(normalizedSkills)]; // Remove duplicates
    } catch (error) {
      console.error('Error extracting skills with LLM:', error);
      return this.basicExtractSkills(text);
    }
  }

  private basicExtractSkills(text: string): string[] {
    const words = text.toLowerCase().split(/\s+/);
    const extractedSkills = new Set<string>();
    
    words.forEach(word => {
      const normalizedSkill = this.basicNormalizeSkillName(word);
      if (knowledgeGraph[normalizedSkill]) {
        extractedSkills.add(normalizedSkill);
      }
    });
    
    return Array.from(extractedSkills);
  }

  public getRelatedSkills(skill: string): string[] {
    const normalizedSkill = this.basicNormalizeSkillName(skill);
    const skillData = knowledgeGraph[normalizedSkill];
    
    if (!skillData) return [];
    
    return [
      ...skillData.related,
      ...Object.entries(knowledgeGraph)
        .filter(([_, value]) => value.related.includes(normalizedSkill))
        .map(([key]) => key)
    ];
  }

  public getSkillCategory(skill: string): string | null {
    const normalizedSkill = this.basicNormalizeSkillName(skill);
    return knowledgeGraph[normalizedSkill]?.category || null;
  }

  public async getSkillImportance(skill: string): Promise<number> {
    const prompt = `
      Rate the importance of the skill "${skill}" in the tech industry on a scale of 1-10.
      Consider:
      1. Market demand
      2. Future growth potential
      3. Industry adoption
      Return only the number, nothing else.
    `;

    try {
      const importance = await generateContent(prompt);
      return parseFloat(importance) / 10; // Normalize to 0-1
    } catch (error) {
      console.error('Error getting skill importance:', error);
      return 0.5; // Default importance
    }
  }
} 