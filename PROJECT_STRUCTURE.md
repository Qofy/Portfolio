# Project structure

[`src/main.tsx`](src/main.tsx) mounts [`App`](src/App.tsx) inside React Router’s `BrowserRouter`. `App` renders Hero, About, Skills, Background, Experience, Projects, and Blog in order. [`Navigation`](src/components/common/Navigation.tsx) uses section hashes such as `#projects` and matches them to `data-section` attributes.

## Where to make changes

| Change | Active source |
| --- | --- |
| Hero text and social links | [`HeroSection.tsx`](src/components/sections/HeroSection.tsx) |
| About copy | [`AboutSection.tsx`](src/components/sections/AboutSection.tsx) |
| Skills and group labels | [`SkillsSection.tsx`](src/components/sections/SkillsSection.tsx) |
| Education and certificate links | [`BackgroundSection.tsx`](src/components/sections/BackgroundSection.tsx) |
| Work history | [`ExperienceSection.tsx`](src/components/sections/ExperienceSection.tsx) |
| Project entries and filters | [`ProjectsSection.tsx`](src/components/sections/ProjectsSection.tsx) |
| Project detail overlay | [`ProjectDetail.tsx`](src/components/sections/ProjectDetail.tsx) |
| Blog categories and editor defaults | [`src/types/blog.ts`](src/types/blog.ts) |
| Chat assistant instructions | [`ChatBox.tsx`](src/components/common/ChatBox.tsx) |
| Global styles | [`globals.scss`](src/styles/globals.scss) |

Component styles live in `src/styles/components/`. The section components import their images from `src/images/` and certificates from `src/certificates/`. Vite serves files in `public/` at the site root.

## Blog data flow

[`BlogSection`](src/components/sections/BlogSection.tsx) subscribes to posts in Firestore and manages filtering, editing, and reader state. [`BlogForm`](src/components/blog/BlogForm.tsx) uses Tiptap to save article content as HTML, which [`BlogReader`](src/components/blog/BlogReader.tsx) renders. Comments and reactions are stored in separate collections. See the [Firestore guide](FIRESTORE_RULES.md).

[`useAIBlogSearch`](src/hooks/useAIBlogSearch.ts) can ask Ollama for keywords, then rank the posts already loaded in the browser. If keyword extraction fails, it searches using the original query. The chat assistant and blog search share the same [Ollama endpoint](OLLAMA_SETUP.md).

## Scroll behavior

`App.tsx` calls the section-specific `use*ScrollSequence` hooks in `src/hooks/`. They use GSAP ScrollTrigger and select elements from the section markup. When changing a section class or `data-section` value, check the corresponding hook and navigation targets. The blog also uses `useScrollAnimation` and `useReAnimate` to reveal and reanimate cards as the list changes.
