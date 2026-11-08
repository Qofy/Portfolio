import { useSteppedScrollSequence } from './useSteppedScrollSequence';

export const useAboutScrollSequence = () => {
  useSteppedScrollSequence(
    '.about',
    '.about-container',
    '.about-text > p:not(:first-child), .focus-list > li, .about-stats > .stat:not(:first-child)',
    { slideToNext: true, introSelector: '.about-text > p:first-child, .about-stats > .stat:first-child' },
  );
};
