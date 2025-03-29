import { hinduPrompt } from '../prompts/hinduPrompt';
import { sikhPrompt } from '../prompts/sikhPrompt';
import { islamPrompt } from '../prompts/islamPrompt';
import { christianPrompt } from '../prompts/christianPrompt';

export function getPromptByFaith(faith) {
  switch (faith.toLowerCase()) {
    case 'hindu':
      return hinduPrompt;
    case 'sikh':
      return sikhPrompt;
    case 'islam':
      return islamPrompt;
    case 'christian':
      return christianPrompt;
    default:
      return hinduPrompt;
  }
}
