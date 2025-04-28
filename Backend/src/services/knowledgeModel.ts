import { knowledgeGraph, skillCategories } from '../data/knowledgeGraph';
import { Skill, EvolvingSkill, SkillUsage, NormalizationPattern, KnowledgeGraphEvolution } from '../types/index';

export class KnowledgeModel {
  private static instance: KnowledgeModel;
  private knowledgeGraph: Record<string, EvolvingSkill>;
  private skillCategories: Record<string, string[]>;
  private normalizationPatterns: NormalizationPattern[];
  private evolutionVersion: number;

  private constructor() {
    this.evolutionVersion = 1;
    this.normalizationPatterns = [];
    this.knowledgeGraph = this.initializeEvolvingSkills(knowledgeGraph);
    this.skillCategories = { ...skillCategories };
  }

  private initializeEvolvingSkills(baseGraph: Record<string, Skill>): Record<string, EvolvingSkill> {
    return Object.entries(baseGraph).reduce((acc, [key, skill]) => {
      acc[key] = {
        ...skill,
        usage: {
          count: 0,
          lastUsed: new Date(),
          successfulMatches: 0,
          failedMatches: 0,
          confidence: 1.0
        },
        lastUpdated: new Date(),
        version: 1
      };
      return acc;
    }, {} as Record<string, EvolvingSkill>);
  }

  public static getInstance(): KnowledgeModel {
    if (!KnowledgeModel.instance) {
      KnowledgeModel.instance = new KnowledgeModel();
    }
    return KnowledgeModel.instance;
  }

  public normalizeSkill(skill: string): string {
    const normalized = skill.toLowerCase().trim();
    
    // Check for existing normalization pattern
    const existingPattern = this.normalizationPatterns.find(
      p => p.original.toLowerCase() === normalized
    );
    if (existingPattern) {
      this.updateNormalizationPattern(existingPattern, true);
      return existingPattern.normalized;
    }

    // Check for exact match
    if (this.knowledgeGraph[normalized]) {
      this.recordNormalization(skill, normalized, true);
      return normalized;
    }

    // Check aliases
    for (const [key, value] of Object.entries(this.knowledgeGraph)) {
      if (value.aliases.some(alias => alias.toLowerCase() === normalized)) {
        this.recordNormalization(skill, key, true);
        return key;
      }
    }

    // Check partial matches
    for (const [key, value] of Object.entries(this.knowledgeGraph)) {
      if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
        this.recordNormalization(skill, key, true);
        return key;
      }
    }

    // Record failed normalization
    this.recordNormalization(skill, skill, false);
    return skill;
  }

  private recordNormalization(original: string, normalized: string, success: boolean): void {
    const existingPattern = this.normalizationPatterns.find(
      p => p.original === original && p.normalized === normalized
    );

    if (existingPattern) {
      this.updateNormalizationPattern(existingPattern, success);
    } else {
      this.normalizationPatterns.push({
        original,
        normalized,
        count: 1,
        lastUsed: new Date(),
        successRate: success ? 1 : 0
      });
    }
  }

  private updateNormalizationPattern(pattern: NormalizationPattern, success: boolean): void {
    pattern.count++;
    pattern.lastUsed = new Date();
    pattern.successRate = ((pattern.successRate * (pattern.count - 1)) + (success ? 1 : 0)) / pattern.count;
  }

  public updateSkillUsage(skillName: string, success: boolean): void {
    const skill = this.knowledgeGraph[skillName];
    if (skill) {
      skill.usage.count++;
      skill.usage.lastUsed = new Date();
      if (success) {
        skill.usage.successfulMatches++;
      } else {
        skill.usage.failedMatches++;
      }
      skill.usage.confidence = skill.usage.successfulMatches / skill.usage.count;
    }
  }

  public getRelatedSkills(skill: string): string[] {
    const normalizedSkill = this.normalizeSkill(skill);
    const skillData = this.knowledgeGraph[normalizedSkill];
    if (!skillData) return [];

    // Sort related skills by confidence
    return skillData.related
      .map(relatedSkill => ({
        skill: relatedSkill,
        confidence: this.knowledgeGraph[relatedSkill]?.usage.confidence || 0
      }))
      .sort((a, b) => b.confidence - a.confidence)
      .map(item => item.skill);
  }

  public getSkillCategory(skill: string): string | null {
    const normalizedSkill = this.normalizeSkill(skill);
    return this.knowledgeGraph[normalizedSkill]?.category || null;
  }

  public getKnowledgeGraph(): Record<string, EvolvingSkill> {
    return { ...this.knowledgeGraph };
  }

  public getSkillCategories(): Record<string, string[]> {
    return { ...this.skillCategories };
  }

  public getEvolutionState(): KnowledgeGraphEvolution {
    return {
      skills: this.knowledgeGraph,
      normalizationPatterns: this.normalizationPatterns,
      lastEvolution: new Date(),
      version: this.evolutionVersion
    };
  }

  public evolveKnowledgeGraph(): void {
    // Update skill relationships based on usage
    Object.entries(this.knowledgeGraph).forEach(([skillName, skill]) => {
      if (skill.usage.confidence < 0.5) {
        // If confidence is low, consider removing or updating relationships
        this.updateSkillRelationships(skillName);
      }
    });

    // Clean up normalization patterns
    this.normalizationPatterns = this.normalizationPatterns.filter(
      pattern => pattern.count > 1 || pattern.successRate > 0.5
    );

    this.evolutionVersion++;
  }

  private updateSkillRelationships(skillName: string): void {
    const skill = this.knowledgeGraph[skillName];
    if (!skill) return;

    // Find most commonly co-occurring skills
    const coOccurrences = new Map<string, number>();
    Object.entries(this.knowledgeGraph).forEach(([otherSkillName, otherSkill]) => {
      if (otherSkillName !== skillName && otherSkill.related.includes(skillName)) {
        coOccurrences.set(otherSkillName, otherSkill.usage.count);
      }
    });

    // Update relationships based on co-occurrence
    const sortedCoOccurrences = Array.from(coOccurrences.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Keep top 5 relationships

    skill.related = sortedCoOccurrences.map(([skillName]) => skillName);
    skill.lastUpdated = new Date();
  }
} 