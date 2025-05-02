import { ParsedResumeData, WorkExperience, Education } from '../types';
import { format, intervalToDuration, parseISO, isValid, parse } from 'date-fns';

/**
 * Standardizes the format of dates, durations, and names in the parsed data.
 * @param data The parsed data (potentially after initial refinement).
 * @returns The standardized data.
 */
export const standardizeData = (data: ParsedResumeData): ParsedResumeData => {
  const standardizedData: ParsedResumeData = JSON.parse(JSON.stringify(data));

  standardizedData.workExperience = standardizedData.workExperience.map(job => {
    const standardizedJob = { ...job };

    try {
      const startDate = parseISO(job.startDate + '-01');
      if (isValid(startDate)) {
        standardizedJob.startDate = format(startDate, 'yyyy-MM');
      } else {
        standardizedJob.startDate = 'Invalid Date';
      }
    } catch (e) {
      standardizedJob.startDate = 'Invalid Date';
    }

    if (job.endDate !== 'Present') {
      try {
        const endDate = parseISO(job.endDate + '-01');
        if (isValid(endDate)) {
          standardizedJob.endDate = format(endDate, 'yyyy-MM');
        } else {
          standardizedJob.endDate = 'Invalid Date';
        }
      } catch (e) {
        standardizedJob.endDate = 'Invalid Date';
      }
    }

    try {
      const startDateObj = parseISO(standardizedJob.startDate + '-01');
      const endDateObj =
        standardizedJob.endDate === 'Present'
          ? new Date()
          : parseISO(standardizedJob.endDate + '-01');

      if (isValid(startDateObj) && isValid(endDateObj)) {
        const duration = intervalToDuration({ start: startDateObj, end: endDateObj });
        let durationString = '';
        if (duration.years) {
          durationString += `${duration.years} year${duration.years > 1 ? 's' : ''}`;
        }
        if (duration.months) {
          if (durationString) durationString += ', ';
          durationString += `${duration.months} month${duration.months > 1 ? 's' : ''}`;
        }
        standardizedJob.duration = durationString || 'Less than a month';
      } else {
        standardizedJob.duration = job.duration || 'Unknown duration';
      }
    } catch (e) {
      standardizedJob.duration = job.duration || 'Unknown duration';
    }

    return standardizedJob;
  });

  standardizedData.education = standardizedData.education.map(edu => {
    const standardizedEdu = { ...edu };

    if (standardizedEdu.degree) {
      standardizedEdu.degree =
        standardizedEdu.degree.charAt(0).toUpperCase() + standardizedEdu.degree.slice(1);
    }

    if (standardizedEdu.graduationDate) {
      try {
        const gradDate = parseISO(standardizedEdu.graduationDate);
        if (isValid(gradDate)) {
          standardizedEdu.graduationDate = format(gradDate, 'yyyy');
        } else if (/^\d{4}$/.test(standardizedEdu.graduationDate)) {
          standardizedEdu.graduationDate = standardizedEdu.graduationDate;
        } else {
          standardizedEdu.graduationDate = standardizedEdu.graduationDate;
        }
      } catch (e) {
        standardizedEdu.graduationDate = standardizedEdu.graduationDate;
      }
    }

    return standardizedEdu;
  });

  standardizedData.skills = standardizedData.skills.map(skill => {
    const standardizedSkill = { ...skill };

    if (standardizedSkill.name) {
      standardizedSkill.name =
        standardizedSkill.name.charAt(0).toUpperCase() + standardizedSkill.name.slice(1);
    }

    if (standardizedSkill.proficiency) {
      standardizedSkill.proficiency =
        standardizedSkill.proficiency.charAt(0).toUpperCase() +
        standardizedSkill.proficiency.slice(1).toLowerCase();
    }

    return standardizedSkill;
  });

  return standardizedData;
};
