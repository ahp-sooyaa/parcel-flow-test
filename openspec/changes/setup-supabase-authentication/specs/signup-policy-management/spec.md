## ADDED Requirements

### Requirement: System supports user sign-up flow
The system SHALL provide a sign-up flow for creating new user accounts when self-service registration is enabled.

#### Scenario: Sign-up enabled and valid registration data
- **WHEN** signup is enabled and a user submits valid sign-up data
- **THEN** the system MUST create the account through Supabase Auth and allow the user to proceed according to configured auth behavior

### Requirement: Admin can toggle self-service signup policy
The system SHALL provide a settings control that allows authorized admins to enable or disable self-service sign-up at runtime.

#### Scenario: Admin disables self-service signup
- **WHEN** an authorized admin changes the signup setting to disabled and saves it
- **THEN** the system MUST persist the disabled policy as the active signup configuration

#### Scenario: Admin enables self-service signup
- **WHEN** an authorized admin changes the signup setting to enabled and saves it
- **THEN** the system MUST persist the enabled policy as the active signup configuration

### Requirement: Signup policy is enforced server-side
The system SHALL enforce the active signup policy in the server-side sign-up action so disabled signup cannot be bypassed.

#### Scenario: Signup attempt while disabled
- **WHEN** signup is disabled and any user submits the sign-up form
- **THEN** the system MUST reject account creation and return a deterministic message that signup is currently unavailable

#### Scenario: Signup page behavior while disabled
- **WHEN** signup is disabled and a user navigates to the signup page
- **THEN** the system MUST prevent normal signup submission and clearly communicate that self-service signup is unavailable
