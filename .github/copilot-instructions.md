# HackStack Copilot Instructions

## Project Overview
**HackStack** is a Next.js 16-based hackathon discovery and management platform. It allows users to browse hackathons, filter by criteria (domain, mode, level, status), and manage participation. The app uses a context-based state management with client-side React Context for authentication and hackathon data.

## Architecture & Data Flow

### Core Patterns
- **State Management**: React Context API (not Redux). See [lib/auth-context.tsx](lib/auth-context.tsx) and [lib/hackathons-context.tsx](lib/hackathons-context.tsx)
- **Data Storage**: In-memory state with localStorage for persistence (demo only - no backend API)
- **UI Components**: Radix UI primitives wrapped in custom shadcn/ui components [components/ui/](components/ui/)
- **Page Structure**: Nested routing in [app/](app/) directory (Next.js App Router)

### Key Data Models
1. **Hackathon** ([lib/hackathons.ts](lib/hackathons.ts#L1-L18)): `{ id, title, description, fullDescription, status: "open"|"closing-soon"|"ended", mode: "online"|"in-person"|"hybrid", level, domain, prize, participants, techStack[], teamSize }`
2. **User** ([lib/auth-context.tsx](lib/auth-context.tsx#L6-L13)): `{ id, email, name, role: "user"|"admin", joinedHackathons[], teams[], skills[], createdAt }`

### Context Providers
- **HackathonsProvider**: Manages hackathon CRUD (`addHackathon`, `updateHackathon`, `deleteHackathon`, `getHackathonById`)
- **AuthProvider**: Handles auth flow (`login`, `signup`, `logout`, `joinHackathon`)
- Both use `"use client"` (client components) - required for context in Next.js

## Component Organization

**Page Components** ([app/](app/)): Route handlers
- `page.tsx`: Homepage with `<HackathonGrid />`
- `hackathon/[id]/page.tsx`: Details view
- `login/`, `signup/`, `profile/`, `admin/`: Feature-specific routes

**Feature Components** ([components/](components/)): Reusable, data-aware
- `HackathonGrid`: Renders filtered/searchable hackathon list with memoized filtering logic
- `HackathonCard`: Single hackathon display
- `SearchBar`, `FilterBar`: User input components
- `Header`: Navigation and user menu

**UI Components** ([components/ui/](components/ui/)): Unstyled Radix primitives
- Use for composing larger components
- Import from `@radix-ui/react-*` and wrap with Tailwind styles

## Development Workflow

### Build & Run
```bash
npm run dev        # Start Next.js dev server (port 3000)
npm run build      # Production build
npm run start      # Run production build
npm run lint       # ESLint check
```

### Key Commands
- TypeScript strict mode enabled; check errors: `npx tsc --noEmit`
- CSS with Tailwind + PostCSS ([postcss.config.mjs](postcss.config.mjs))
- Path alias: `@/*` maps to project root

## Coding Conventions

### TypeScript
- Use explicit types for interfaces (see `Hackathon`, `User`)
- Avoid `any`; strict mode enforced in [tsconfig.json](tsconfig.json)
- Type `ReactNode` for component children

### Client vs Server
- Mark interactive components with `"use client"` (all components using hooks, context, event handlers)
- Server components: pure pages only
- Contexts must be client components

### Styling
- Use `cn()` utility ([lib/utils.ts](lib/utils.ts)) to merge Tailwind classes safely
- Component className pattern: `"space-y-8"`, `"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"`
- Theme colors: `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-accent`

### State & Filters
- Use `useMemo` for expensive computations (e.g., filtering in [components/hackathon-grid.tsx](components/hackathon-grid.tsx#L18-L39))
- Filter objects have `.toLowerCase()` pattern matching (case-insensitive)
- Status transitions: `"open"` → `"closing-soon"` → `"ended"` (immutable)

### Data Seeding
- Initial hackathons: [lib/hackathons.ts](lib/hackathons.ts#L22+) (mock data, 780 lines)
- Demo users: [lib/auth-context.tsx](lib/auth-context.tsx#L29-L49) (`demo@hackstack.com`, `admin@hackstack.com`)

## Common Tasks

### Adding a Filter
1. Add state in component: `const [newFilter, setNewFilter] = useState("all")`
2. Add filter condition in `useMemo` logic
3. Wire to `FilterBar` prop and handler

### Adding a Field to Hackathon
1. Update `Hackathon` interface in [lib/hackathons.ts](lib/hackathons.ts)
2. Update all mock data entries
3. Display in `HackathonCard` or detail page

### Adding Authentication Check
1. Call `useAuth()` hook in component
2. Check `user` and `isLoading` state
3. Redirect if needed using Next.js `useRouter`

## Dependencies
- **Framework**: `next@16.0.10`, `react@^19`
- **UI**: `@radix-ui/*` (dialogs, dropdowns, inputs, etc.), `lucide-react` (icons)
- **Forms**: `@hookform/resolvers`, `react-hook-form`, `zod` (validation)
- **Utils**: `clsx`, `tailwind-merge` (for `cn()`)
- **Styling**: `tailwindcss`, `postcss`, `autoprefixer`

## Known Limitations
- No backend API (localStorage only)
- `ignoreBuildErrors: true` in [next.config.mjs](next.config.mjs) - fix errors before shipping
- Passwords stored plaintext in demo auth (security issue for production)
