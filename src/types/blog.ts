export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  time: string;
  readingTime: number;
  image: string;
  author?: string;
  excerpt?: string;
  tags?: string[];
  wordCount?: number;
  isFeatured?: boolean;
  updatedDate?: string;
}

export const DEFAULT_CATEGORIES = [
  'React',
  'Next.js',
  'TypeScript',
  'Js(Javascript)',
  'Node.js',
  'Django',
  'Firebase',
  'CSS',
  'Web Development',
  'React Query',
  'Performance',
  'Tutorial',
  'Docker',
  'Cypress',
  'Deutsch Kurs'
];

export const ADMIN_PASSWORD = import.meta.env.VITE_BLOG_ADMIN_PASSWORD || 'default-password';

export type FormData = {
  title: string;
  content: string;
  category: string;
  date: string;
  time: string;
  readingTime: number;
  image: string;
  author?: string;
  excerpt?: string;
  tags: string;
  isFeatured?: boolean;
};

export const INITIAL_FORM_DATA: FormData = {
  title: '',
  content: '',
  category: DEFAULT_CATEGORIES[0],
  image: '',
  readingTime: 5,
  time: new Date().toTimeString().slice(0, 5),
  author: 'Kofi Agyekum',
  excerpt: '',
  tags: '',
  isFeatured: false,
  date: new Date().toISOString().split('T')[0],
};
