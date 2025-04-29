import axios from 'axios';
import {Message, CandidateProfile} from '../types/chat';

const API_URL = 'http://localhost:8000';

interface SendMessageResponse {
  reply: string;
  updatedProfile: CandidateProfile;
}

export async function sendMessageToBackend(message: string): Promise<SendMessageResponse> {
  const response = await axios.post<SendMessageResponse>(`${API_URL}/chat`, {
    message,
  });

  return response.data;
}