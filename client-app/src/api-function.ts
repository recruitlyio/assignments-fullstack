import { apiService } from './services/api';

export const handleParseResume = async (text: string) => {
  try {
    const response = await apiService.parseResume(text);
    console.log('Parsed data:', response);
    return response;
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw error;
  }
};
