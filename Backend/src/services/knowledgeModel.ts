import { knowledgeGraph, skillCategories } from '../data/knowledgeGraph';
import { Skill } from '../types';

export class KnowledgeModel {
  private static instance: KnowledgeModel;
  private knowledgeGraph: Record<string, Skill>;
  private skillCategories: Record<string, string[]>;

  private constructor() {
    this.knowledgeGraph = { ...knowledgeGraph };
    this.skillCategories = { ...skillCategories };
  }

  public static getInstance(): KnowledgeModel {
    if (!KnowledgeModel.instance) {
      KnowledgeModel.instance = new KnowledgeModel();
    }
    return KnowledgeModel.instance;
  }

  public normalizeSkill(skill: string): string {
    const normalized = skill.toLowerCase().trim();
    
    // Check for exact match
    if (this.knowledgeGraph[normalized]) {
      return normalized;
    }

    // Check aliases
    for (const [key, value] of Object.entries(this.knowledgeGraph)) {
      if (value.aliases.some(alias => alias.toLowerCase() === normalized)) {
        return key;
      }
    }

    // Check partial matches
    for (const [key, value] of Object.entries(this.knowledgeGraph)) {
      if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
        return key;
      }
    }

    return skill; // Return original if no match found
  }

  public getRelatedSkills(skill: string): string[] {
    const normalizedSkill = this.normalizeSkill(skill);
    return this.knowledgeGraph[normalizedSkill]?.related || [];
  }

  public getSkillCategory(skill: string): string | null {
    const normalizedSkill = this.normalizeSkill(skill);
    return this.knowledgeGraph[normalizedSkill]?.category || null;
  }

  public getKnowledgeGraph(): Record<string, Skill> {
    return { ...this.knowledgeGraph };
  }

  public getSkillCategories(): Record<string, string[]> {
    return { ...this.skillCategories };
  }
} 