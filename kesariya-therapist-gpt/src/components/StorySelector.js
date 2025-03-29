import { getPromptByFaith } from '../utils/faithRouter';
import { detectEmotion } from './EmotionDetector';

export const buildPrompt = (userText, faith) => {
  const basePrompt = getPromptByFaith(faith);
  const emotion = detectEmotion(userText);
  return `${basePrompt}\nThe user is feeling: ${emotion}.\nTheir words: "${userText}".\nRespond with a story or verse.`;
};
