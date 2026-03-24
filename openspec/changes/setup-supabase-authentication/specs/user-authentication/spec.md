## ADDED Requirements

### Requirement: User can sign in with Supabase credentials
The system SHALL provide a sign-in flow that authenticates users through Supabase Auth before granting access to internal dashboard routes.

#### Scenario: Successful sign-in
- **WHEN** a user submits valid credentials on the sign-in form
- **THEN** the system MUST create an authenticated session and redirect the user to the internal dashboard

#### Scenario: Invalid sign-in credentials
- **WHEN** a user submits invalid credentials on the sign-in form
- **THEN** the system MUST deny authentication and display a clear error without creating a session

### Requirement: User can sign out from an authenticated session
The system SHALL provide a sign-out action that invalidates the current authenticated session.

#### Scenario: Sign-out from authenticated state
- **WHEN** an authenticated user triggers sign-out
- **THEN** the system MUST terminate the active session and redirect to a public authentication page

### Requirement: Internal routes require authentication
The system SHALL restrict internal application pages to authenticated users only.

#### Scenario: Unauthenticated access attempt to protected route
- **WHEN** an unauthenticated user requests a protected internal route
- **THEN** the system MUST redirect the user to the sign-in page

#### Scenario: Authenticated access to protected route
- **WHEN** an authenticated user requests a protected internal route
- **THEN** the system MUST allow access to the requested page
