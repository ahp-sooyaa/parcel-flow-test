## ADDED Requirements

### Requirement: Tailwind foundation SHALL be configured for shared app and UI component styling
The system SHALL configure Tailwind CSS so utility classes and design tokens are consistently available across App Router pages, layouts, and shared UI primitives.

#### Scenario: Tailwind classes are applied in shared components
- **WHEN** a shared UI component under `src/components/ui` uses Tailwind utility classes
- **THEN** the compiled app output includes the required styles and renders those utilities correctly

#### Scenario: Global tokens are available to app screens
- **WHEN** a page references configured global style tokens and Tailwind utilities
- **THEN** the page renders without missing-token or missing-style behavior

### Requirement: The project SHALL provide shadcn/ui baseline primitives in a standard location
The system SHALL initialize shadcn/ui and provide baseline primitives in a stable, shared directory so internal dashboard screens can reuse components without redefining base UI patterns.

#### Scenario: Baseline primitives can be imported by app routes
- **WHEN** a server component page imports baseline primitives from `src/components/ui`
- **THEN** the application compiles and renders the components successfully

#### Scenario: Generated primitives remain local to the repository
- **WHEN** developers customize a baseline primitive
- **THEN** the change is applied directly in project source files without requiring runtime dependency patching

### Requirement: Component utility helpers SHALL standardize className composition
The system SHALL include a shared helper approach for className composition used by shadcn-based components.

#### Scenario: Component variants merge classes predictably
- **WHEN** base and override class names are passed to a shadcn-based component
- **THEN** the resulting className output is deterministic and does not duplicate conflicting utility classes

### Requirement: The integration SHALL be validated through rendered app usage
The system SHALL include a rendered app surface that demonstrates baseline shadcn components and confirms integration works in the current Next.js runtime.

#### Scenario: Root app surface shows shadcn primitives
- **WHEN** the root app page is loaded after setup
- **THEN** it displays representative shadcn primitives with expected Tailwind styling
