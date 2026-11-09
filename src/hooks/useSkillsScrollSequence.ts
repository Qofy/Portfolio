import { useSteppedScrollSequence } from './useSteppedScrollSequence';

export const useSkillsScrollSequence = () => {
  useSteppedScrollSequence('.skills', '.skills-container', '.skill-group:not(:first-child)', {
    slideToNext: true,
    rollIn: true,
  });
};
