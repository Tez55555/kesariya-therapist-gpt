import { emotionLabels } from '../utils/emotionLabels';

export const detectEmotion = (text) => {
  for (let [emotion, words] of Object.entries(emotionLabels)) {
    for (let keyword of words) {
      if (text.toLowerCase().includes(keyword)) {
        return emotion;
      }
    }
  }
  return 'neutral';
};
