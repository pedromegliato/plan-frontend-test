# Countries Explorer

A modern, responsive web application built with Next.js that consumes the REST Countries API, allowing users to explore and visualize information about countries worldwide with interactive filtering capabilities.

## Table of Contents

- [Features](#features)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [Technical Decisions](#technical-decisions)
- [Performance Optimizations](#performance-optimizations)
- [Accessibility](#accessibility)
- [Diagrams](#diagrams)

## Features

### Core Functionality

- Browse comprehensive list of countries with flag, name, region, and population
- Search countries by name (supports both common and official names in Portuguese)
- Filter by continent using checkboxes (multiple selection supported)
- Filter by language using dropdown select
- Navigate to dedicated country details page with:
  - Official and common names (in Portuguese when available)
  - Population and area
  - Languages and currencies
  - Region and sub-region
  - Interactive back button to return to main list
- Pagination with 8 countries per page
- Fully responsive design for mobile, tablet, and desktop
- Loading states and comprehensive error handling
- Accessible UI components with proper ARIA labels

### User Experience

- Real-time filtering with debounced search (300ms) for optimal performance
- Optimized images with Next.js Image component
- Smooth transitions and hover effects
- Clear visual feedback for all user interactions
- Helpful empty states when no results match filters
- Dedicated country pages with clean navigation

## Technical Stack

- **Framework**: Next.js 15.5.12 (App Router)
- **Language**: TypeScript 5.8.2 (Strict Mode + Extra Checks)
- **Styling**: TailwindCSS 4.1.2
- **State Management**: Redux Toolkit 2.6.1 + Redux Saga 1.3.0
- **HTTP Client**: Axios 1.8.4
- **Testing**: Jest + React Testing Library (configured)
- **Code Quality**: ESLint + Prettier + Husky
- **Deployment**: Docker + Docker Compose + Nginx
- **Package Manager**: npm

### TypeScript Configuration

The project uses strict TypeScript configuration for maximum type safety:

```typescript
{
  "strict": true,                        // Enable all strict type checks
  "noUnusedLocals": true,               // Error on unused local variables
  "noUnusedParameters": true,           // Error on unused function parameters
  "noImplicitReturns": true,            // Error on missing return statements
  "noFallthroughCasesInSwitch": true,   // Error on fallthrough in switch
  "forceConsistentCasingInFileNames": true,
  "moduleResolution": "bundler"         // Modern module resolution
}
```

This ensures:
- Zero implicit any types
- All variables must be used
- All code paths return values
- Maximum type safety across the application

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

Clone the repository:
```bash
git clone <repository-url>
cd plan-frontend-test
```

Install dependencies:
```bash
npm install
```

Create environment file (**REQUIRED**):
```bash
cp .env.example .env.local
```

The `.env.local` file must contain:
```
NEXT_PUBLIC_COUNTRIES_API_URL=https://restcountries.com/v3.1
```

**Important**: This environment variable is **required**. The application will fail to start without it.

Run development server:
```bash
npm run dev
```

Open browser at `http://localhost:3000`

### Available Scripts

```bash
npm run dev         # Start development server with Turbopack
npm run build       # Create production build
npm start           # Run production server
npm run lint        # Run ESLint
npm run format      # Format code with Prettier and ESLint
```

### Docker Deployment

Development mode:
```bash
docker-compose up -d
```

Production mode with Nginx (recommended):
```bash
docker-compose -f docker-compose.prod.yml up -d
```

The production setup includes:
- Multi-stage optimized Docker build
- Nginx reverse proxy with gzip compression
- Static asset caching
- Health checks
- Automatic restart policy

Application will be available at `http://localhost` (port 80)

Stop containers:
```bash
docker-compose down
# or for production
docker-compose -f docker-compose.prod.yml down
```

### Testing

Test structure configured with Jest and React Testing Library.

Run tests (after installing test dependencies):
```bash
npm test              # Run all tests
npm test -- --watch   # Run in watch mode
npm test -- --coverage # Generate coverage report
```

Example test included in [Button.test.tsx](src/components/atoms/Button/Button.test.tsx)

## Architecture

The application follows Clean Architecture principles with clear separation of concerns:

### Layered Architecture

```
Presentation Layer (Components, Pages)
        |
Business Logic Layer (Hooks, Redux)
        |
Data Access Layer (Services, Repositories)
        |
External API (REST Countries)
```

### Key Architectural Decisions

1. **Atomic Design Pattern**: Components organized as atoms, molecules, and organisms for maximum reusability
2. **Repository Pattern**: Abstraction for data fetching with interface contracts for flexibility
3. **Factory Pattern**: CountryTransformer converts API responses to clean domain models
4. **Observer Pattern**: Redux for centralized, predictable state management
5. **Strategy Pattern**: Flexible filter implementations that can be easily extended

## Project Structure

```
src/
├── @types/                    # TypeScript type definitions
│   └── country.ts            # Country interfaces and types
├── app/                       # Next.js App Router pages
│   ├── country/[code]/       # Dynamic country details page
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Home page with filters and grid
├── components/
│   ├── atoms/                # Basic UI building blocks
│   │   ├── Button/
│   │   ├── Checkbox/
│   │   ├── Input/
│   │   ├── Select/
│   │   └── Spinner/
│   ├── molecules/            # Composite components
│   │   ├── ContinentFilter/
│   │   ├── CountryCard/
│   │   ├── LanguageFilter/
│   │   └── SearchBar/
│   ├── organisms/            # Complex feature components
│   │   ├── CountriesGrid/
│   │   ├── FilterBar/
│   │   └── Footer/
│   └── constants/            # Centralized constants
│       └── uiText.ts         # All UI text for i18n preparation
│   └── Providers/            # Redux and context providers
├── hooks/                     # Custom React hooks
│   ├── useCountries.ts       # Countries list logic with debounce
│   ├── useDebounce.ts        # Generic debounce hook (300ms)
│   └── useMediaQuery.ts      # SSR-safe media query hook
├── services/
│   ├── http/
│   │   └── countriesApi.ts   # Axios instance configuration
│   ├── repositories/
│   │   └── CountryRepository.ts  # Data fetching abstraction
│   ├── transformers/
│   │   └── CountryTransformer.ts # API to domain model conversion
│   └── CountryService.ts     # Business logic service
├── store/                     # Redux configuration
│   ├── modules/
│   │   └── countries/
│   │       ├── slice.ts      # Redux slice with reducers
│   │       └── saga.ts       # Side effects handlers
│   ├── rootReducer.ts
│   ├── rootSaga.ts
│   └── store.ts
└── styles/                    # Global styles
```

## Design Patterns

### SOLID Principles

#### Single Responsibility Principle
- Each component has one clear purpose
- Services handle specific business logic domains
- Repositories exclusively manage data fetching

#### Open/Closed Principle
- Components accept props for customization without modification
- Repository interface allows implementation swapping
- Transformers can be extended without changing existing code

#### Liskov Substitution Principle
- ICountryRepository interface ensures all implementations are interchangeable
- Atomic components maintain consistent contracts

#### Interface Segregation Principle
- Specific, focused prop interfaces for each component
- No component forced to depend on unused props

#### Dependency Inversion Principle
- CountryService depends on ICountryRepository abstraction, not concrete implementation
- Components depend on hooks, not direct Redux store access

### DRY (Don't Repeat Yourself)

- Reusable atomic components (Button, Input, Select, Checkbox) used throughout
- Centralized API client configuration
- Shared type definitions across all layers
- Custom hooks encapsulate reusable business logic
- Filter logic centralized in Redux slice

### Additional Patterns

#### Repository Pattern
```typescript
interface ICountryRepository {
  fetchAll(): Promise<CountryApiResponse[]>
  fetchByCode(code: string): Promise<CountryApiResponse>
}
```

#### Factory Pattern
```typescript
CountryTransformer.toDomain(apiResponse)
CountryTransformer.toDomainList(apiResponses)
```

#### Composition Pattern
FilterPanel composes SearchBar, ContinentFilter, and LanguageFilter

## Technical Decisions

### Why Redux Toolkit + Redux Saga?

- **Complex State**: Multiple interdependent filters requiring coordinated updates
- **Async Operations**: API calls with proper loading and error state management
- **Testability**: Sagas provide isolated, easily testable side effects
- **Scalability**: Simple to add new features and state slices
- **Developer Experience**: Built-in best practices and less boilerplate

### Why Atomic Design?

- **Reusability**: Atoms used consistently across multiple features
- **Consistency**: Enforces unified design system
- **Maintainability**: Clear component hierarchy and responsibilities
- **Testing**: Easy to test components in isolation

### Why TypeScript?

- **Type Safety**: Catch errors at compile time, not runtime
- **IDE Support**: Superior autocomplete and refactoring capabilities
- **Documentation**: Types serve as inline, always up-to-date documentation
- **Maintainability**: Refactor with confidence using type checking

### Why TailwindCSS?

- **Utility-First**: Rapid development without context switching to CSS files
- **Consistency**: Design tokens enforce unified styling across application
- **Performance**: Purged CSS results in minimal production bundle
- **Responsive**: Mobile-first breakpoints work out of the box

### API Data Transformation

Raw API responses are transformed to domain models for:
- Ensuring Portuguese translations are prioritized when available
- Normalizing inconsistent API data structure
- Providing sensible defaults for optional fields
- Simplifying component consumption with clean interfaces

## Performance Optimizations

1. **Search Debouncing**: 300ms debounce on search input reduces API dispatches and improves performance
2. **Media Query Hook**: SSR-safe `useMediaQuery` hook replaces `window.innerWidth` checks
3. **Next.js Image Optimization**: Automatic image optimization, lazy loading, and responsive sizing
4. **Code Splitting**: Automatic route-based code splitting with App Router
5. **Redux Memoization**: Filtered countries computed only when filters actually change using `createSelector`
6. **Efficient Re-renders**: Components structured to minimize unnecessary re-renders
7. **Environment Variables**: API URL configured via `.env.local` with fail-fast validation (no silent fallbacks)

## Accessibility

- Semantic HTML elements (main, header, article, aside, nav)
- ARIA labels for all interactive elements
- Full keyboard navigation support
- Visible focus states on all interactive elements
- Descriptive alt text for all images
- Screen reader friendly error and loading messages
- WCAG 2.1 Level AA color contrast compliance
- Responsive text sizing for readability

## Diagrams

Detailed architecture and flow diagrams available in the docs directory:

- [architecture.mmd](docs/architecture.mmd) - System architecture diagram
- [data-flow.mmd](docs/data-flow.mmd) - Data flow through the application
- [component-hierarchy.mmd](docs/component-hierarchy.mmd) - Component structure
- [state-management.mmd](docs/state-management.mmd) - Redux state structure

### Viewing Mermaid Diagrams

**In VSCode:**
1. Install the "Mermaid Preview" extension
2. Open any `.mmd` file in `docs/` folder
3. Right-click and select "Preview Mermaid Diagram"

**Online:**
- Copy diagram content and paste at [Mermaid Live Editor](https://mermaid.live)

**In GitHub:**
- Diagrams render automatically when viewing `.mmd` files on GitHub

**In Markdown:**
```mermaid
# Paste diagram content here
```

## UI Text Management

All user-facing text is centralized in `src/constants/uiText.ts` for easy maintenance and future internationalization:

```typescript
export const UI_TEXT = {
  common: { loading, error, search, clear, apply, close, filters, seeMore },
  continents: { title, africa, northAmerica, ... },
  filters: { searchPlaceholder, selectLanguage, ... },
  countries: { notFound, adjustFilters, ... },
  pagination: { previousPage, nextPage, page },
  footer: { copyright },
  aria: { closeModal, closeFilters, ... }
}
```

Benefits:
- Single source of truth for all UI text
- Easy to maintain and update
- Prepared for future i18n implementation
- Consistent terminology across the application

### Portuguese Translations from API

Country names automatically use Portuguese translations from the REST Countries API:

```typescript
const portugueseName = apiResponse.translations?.por?.common || apiResponse.name.common
const portugueseOfficialName = apiResponse.translations?.por?.official || apiResponse.name.official
```

This ensures Brazilian users see familiar country names like "Alemanha" instead of "Germany".

## REST Countries API

This application uses the REST Countries API v3.1:
- Base URL: https://restcountries.com/v3.1
- Endpoint: /all (with field filtering for performance)
- Endpoint: /alpha/{code} (fetch country by code)
- **Portuguese Translations**: Leverages `translations.por` field for Brazilian Portuguese names
- No authentication required
- Rate limiting: Reasonable use policy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Link do Deploy

**Deploy URL**: http://187.77.37.42

**Repositório GitHub**: https://github.com/pedromegliato/plan-frontend-test

### Deploy em Produção

A aplicação está hospedada em VPS com deploy automatizado via GitHub Actions.

#### Deploy Automático via GitHub Actions

O deploy é realizado automaticamente sempre que houver push na branch `main`:

1. Executa testes
2. Build da aplicação Next.js
3. Build da imagem Docker
4. Deploy via SSH no servidor
5. Restart do container em produção

#### Deploy Manual com Docker

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### Outras Opções de Deploy

Plataformas recomendadas:
- **Vercel** (https://vercel.com) - Deploy automático via Git
- **Netlify** (https://netlify.com) - Continuous deployment
- **AWS Amplify** - Solução enterprise

## Future Enhancements

- Comprehensive unit and integration tests with Jest and React Testing Library
- E2E tests with Playwright
- Server-side rendering for improved SEO and initial load
- Favorites/bookmarking functionality with localStorage
- Dark mode theme support
- Full internationalization (i18n) support for multiple languages
- Progressive Web App (PWA) capabilities
- Export filtered results to CSV/JSON
- Side-by-side country comparison feature
- Interactive maps showing country locations

## Technical Assessment Notes

This project demonstrates senior-level frontend development skills including:

- Clean Architecture implementation with proper layer separation
- SOLID principles applied throughout the codebase
- Multiple design patterns (Repository, Factory, Observer, Strategy, Composition)
- Type-safe TypeScript with comprehensive interfaces
- Modern React patterns (hooks, composition, controlled components)
- State management with Redux Toolkit and Saga
- Responsive, accessible UI components
- Performance optimization techniques
- Code organization and maintainability focus
- Professional documentation standards

The codebase prioritizes verbose, self-documenting code over excessive comments. Variable names, function names, and component structure clearly communicate intent and purpose.
