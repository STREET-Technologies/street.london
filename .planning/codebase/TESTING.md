# Testing Patterns

**Analysis Date:** 2026-02-12

## Test Framework

**Runner:**
- Not configured - no test framework installed

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
# No test commands available
# package.json has no test-related scripts
```

## Test File Organization

**Location:**
- No test files found (no `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`)
- No `__tests__/` directories

**Naming:**
- Not established

**Structure:**
```
# No test files present
# No test configuration files (jest.config, vitest.config)
```

## Test Structure

**Suite Organization:**
- Not established

**Patterns:**
- Not established

## Mocking

**Framework:**
- Not applicable

**Patterns:**
- Not established

## Fixtures and Factories

**Test Data:**
- Not applicable

**Location:**
- Not applicable

## Coverage

**Requirements:**
- No coverage configured
- No CI pipeline to enforce coverage

**Configuration:**
- Not applicable

## Test Types

**Unit Tests:**
- Not present

**Integration Tests:**
- Not present

**E2E Tests:**
- Not present

## Recommended Testing Setup

Based on the current stack (Next.js 16, React 19, TypeScript 5.9), the recommended testing stack would be:

**Framework:** Vitest (fast, TypeScript-native, compatible with Next.js)
**Component Testing:** @testing-library/react
**E2E Testing:** Playwright (built-in Next.js support)

**Priority areas to test:**
1. `lib/airtable.ts` - Core form submission logic
2. `lib/cookies.ts` - Cookie consent and analytics initialization
3. API routes (`app/api/*/route.ts`) - Input validation and error handling
4. Form components - Submission flow and state management

---

*Testing analysis: 2026-02-12*
*Update when test patterns change*
