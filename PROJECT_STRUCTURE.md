# Project Structure

Professional folder arrangement for the Portfolio project.

```
src/
├── components/              # React components organized by type
│   ├── common/             # Reusable UI components
│   │   └── Navigation.tsx
│   ├── sections/           # Page section components
│   │   └── HeroSection.tsx
│   └── index.ts           # Component exports
│
├── styles/                # Global and component styles
│   ├── globals.scss       # Global resets and base styles
│   ├── components/        # Component-specific styles
│   │   ├── Navigation.scss
│   │   └── HeroSection.scss
│   └── utils/            # SCSS utilities and variables (future)
│
├── data/                 # Static data and constants
│   ├── background.ts
│   ├── skillsData.ts
│   └── projectCaseStudies.ts
│
├── assets/              # Static files
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── types/              # TypeScript type definitions
│   └── index.ts
│
├── hooks/              # Custom React hooks (future)
├── utils/              # Utility functions (future)
│
├── App.tsx             # Root component
├── main.tsx            # React DOM entry point
└── vite-env.d.ts       # Vite environment types
```

## Naming Conventions

- **Components**: PascalCase (e.g., `Navigation.tsx`)
- **Styles**: kebab-case matching component name (e.g., `Navigation.scss`)
- **Types**: PascalCase interfaces, camelCase for variables
- **Utilities**: camelCase functions
- **Folders**: kebab-case for multi-word names

## File Organization

### Components
- `common/` - Reusable components used across pages
- `sections/` - Full-width page sections

### Styles
- Global styles in `globals.scss`
- Component styles co-located with component folder references
- Utilities and variables in `styles/utils/`

### Data
- Static data separated from components
- Easy to update without touching component logic

### Assets
- Images in `images/`
- Icons in `icons/`
- Fonts in `fonts/`

## Best Practices

1. Keep components small and focused
2. Export components from `components/index.ts`
3. Use TypeScript types for props and data
4. Style components with SCSS modules or co-located files
5. Keep data separate from presentation logic
