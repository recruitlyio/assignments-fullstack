import { generateStructuredData } from '../utils/llm';
import { standardizeData } from '../utils/standardization';
import { generateDynamicPrompt } from '../utils/promptGenerator';
import { ParsedResumeData, RawLLMOutput } from '../types';
import { parse, isValid, parseISO, format } from 'date-fns';

export const parserService = {
  /**
   * Parses raw resume text into structured data, validates, and standardizes it.
   * Incorporates preprocessing and dynamic prompting.
   * @param resumeText The raw text content of the resume.
   * @returns A promise resolving to the structured and validated data.
   * @throws Error if critical parsing steps fail (e.g., LLM error, inability to refine LLM output).
   */
  parseResume: async (resumeText: string): Promise<ParsedResumeData> => {
    const processedText = resumeText.trim();
    const dynamicPrompt = generateDynamicPrompt(processedText);

    let rawLLMData: RawLLMOutput;
    try {
      rawLLMData = await generateStructuredData(dynamicPrompt);
      console.log('Raw LLM Output:', JSON.stringify(rawLLMData, null, 2));
    } catch (error: any) {
      console.error('Failed during LLM extraction:', error);

      throw new Error(`Resume parsing failed at extraction stage: ${error.message}`);
    }

    const refinedData: ParsedResumeData = {
      skills: [],
      workExperience: [],
      education: [],
    };

    if (rawLLMData.skills && Array.isArray(rawLLMData.skills)) {
      refinedData.skills = rawLLMData.skills
        .filter(skill => skill && typeof skill.name === 'string' && skill.name.trim() !== '')
        .map(skill => ({
          name: skill.name.trim(),
          proficiency: skill.proficiency ? skill.proficiency.trim() : undefined,
        }));
    }

    if (rawLLMData.workExperience && Array.isArray(rawLLMData.workExperience)) {
      refinedData.workExperience = rawLLMData.workExperience
        .filter(
          job =>
            job &&
            typeof job.title === 'string' &&
            typeof job.company === 'string' &&
            job.title.trim() !== '' &&
            job.company.trim() !== '',
        )
        .map(job => {
          let startDate = '';
          let endDate: string | 'Present' = '';

          if (job.dateRangeText) {
            const dateRangeText = job.dateRangeText.trim();
            const dateParts = dateRangeText.split(/[\s\u2013-]+\s*/).map(part => part.trim());

            const possibleFormats = [
              'MMMM yyyy',
              'MMM yyyy',
              'MM/yyyy',
              'yyyy-MM',
              'yyyy',
              'MMM. yyyy',
              'MMM, yyyy',
              'dd MMMM yyyy',
              'MM/dd/yyyy',
            ];

            const tryParseDate = (dateString: string): Date | null => {
              if (
                !dateString ||
                dateString.toLowerCase() === 'present' ||
                dateString.toLowerCase() === 'current'
              ) {
                return null;
              }
              for (const formatString of possibleFormats) {
                const parsedDate = parse(dateString, formatString, new Date());
                if (isValid(parsedDate)) {
                  return parsedDate;
                }
              }

              const parsedISO = parseISO(dateString);
              if (isValid(parsedISO)) {
                return parsedISO;
              }
              return null;
            };

            if (dateParts.length >= 1) {
              const parsedStart = tryParseDate(dateParts[0]);
              if (parsedStart) {
                startDate = format(parsedStart, 'yyyy-MM');
              } else {
                startDate = dateParts[0];
              }

              if (dateParts.length > 1) {
                const endPart = dateParts.slice(1).join('-').trim();
                if (endPart.toLowerCase() === 'present' || endPart.toLowerCase() === 'current') {
                  endDate = 'Present';
                } else {
                  const parsedEnd = tryParseDate(endPart);
                  if (parsedEnd) {
                    endDate = format(parsedEnd, 'yyyy-MM');
                  } else {
                    endDate = endPart;
                  }
                }
              } else {
                endDate = 'Present';
              }
            }
          }

          return {
            title: job?.title?.trim(),
            company: job?.company?.trim(),
            location: job.location ? job.location.trim() : undefined,
            startDate: startDate,
            endDate: endDate,
            duration: undefined,
            responsibilities: job.responsibilities
              ?.filter(r => typeof r === 'string' && r.trim() !== '')
              .map(r => r.trim()),
          };
        });
    }

    if (rawLLMData.education && Array.isArray(rawLLMData.education)) {
      refinedData.education = rawLLMData.education
        .filter(
          edu =>
            edu &&
            typeof edu.degree === 'string' &&
            typeof edu.institution === 'string' &&
            edu.degree.trim() !== '' &&
            edu.institution.trim() !== '',
        )
        .map(edu => {
          let graduationDate = undefined;
          if (edu.yearText) {
            const yearString = edu.yearText.trim();

            const possibleEduFormats = ['yyyy', 'MMMM yyyy', 'MMM yyyy', 'MM/yyyy', 'yyyy-MM'];
            let parsedEduDate: Date | null = null;

            for (const formatString of possibleEduFormats) {
              const parsed = parse(yearString, formatString, new Date());
              if (isValid(parsed)) {
                parsedEduDate = parsed;
                break;
              }
            }

            if (parsedEduDate) {
              graduationDate = format(parsedEduDate, 'yyyy');
            } else if (/^\d{4}$/.test(yearString)) {
              graduationDate = yearString;
            } else {
              graduationDate = yearString;
            }
          }

          return {
            degree: edu?.degree?.trim(),
            institution: edu?.institution?.trim(),
            location: edu.location ? edu.location.trim() : undefined,
            graduationDate: graduationDate,
            fieldOfStudy: edu.fieldOfStudy ? edu.fieldOfStudy.trim() : undefined,
          };
        });
    }

    const standardizedData = standardizeData(refinedData);

    return standardizedData;
  },
};
