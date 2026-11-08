import { useSteppedScrollSequence } from './useSteppedScrollSequence';

export const useBlogScrollSequence = () => {
  useSteppedScrollSequence(
    '.blog',
    '.blog-container',
    '.blog-card',
    { slideToNext: false, introSelector: '.blog-header' },
  );
};
