# Refactoring Issues and Suggestions

## Project Structure Issues

### 1. Incorrect Folder Structure
**Problem**: Current structure doesn't follow the recommended frontend-js-or-ts structure
- Assets should be in `public/` folder, not `assets/`
- Scripts should be organized in `app/` folder with proper separation
- Styles should follow the recommended structure with `shared/styles/`

**Current Structure**:
```
christmas-shop/
├── assets/
├── scripts/
├── styles/
├── home.html
├── gifts.html
```

**Recommended Structure**:
```
christmas-shop/
├── public/
│   ├── images/
│   ├── fonts/
│   ├── icons/
│   └── json/
├── app/
│   ├── core/
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home.html
│   │   │   ├── home.js
│   │   │   └── home.scss
│   │   └── gifts/
│   │       ├── gifts.html
│   │       ├── gifts.js
│   │       └── gifts.scss
│   ├── features/
│   │   ├── gift-modal/
│   │   ├── burger-menu/
│   │   └── countdown-timer/
│   ├── entities/
│   │   └── gift/
│   ├── shared/
│   │   ├── ui/
│   │   ├── constants/
│   │   ├── utilities/
│   │   └── styles/
│   │       ├── _fonts.scss
│   │       ├── _mixins.scss
│   │       ├── _placeholders.scss
│   │       ├── _reset.scss
│   │       ├── _themes.scss
│   │       └── _variables.scss
│   └── styles.scss
```

## Code-Level Issues

### 2. Code Duplication (DRY Violations)
**Problem**: Significant code duplication across files

#### DOM Element Selection Duplication
- `body`, `popoverWrapper` selected in multiple files
- Modal logic duplicated between `home.js` and `gifts.js`

#### Filter Button Logic Duplication
**Files**: `scripts/gifts.js` lines 48-82
- Each filter button has nearly identical event handlers
- Same pattern repeated 4 times with only category name difference

#### Modal Creation Duplication
**Files**: `scripts/modal.js` lines 22-44 and 55-78
- Gift card creation logic duplicated between `bestGifts()` and `allGifts()`
- Same HTML template and event listener setup

### 3. Poor Separation of Concerns
**Problem**: Mixed responsibilities in single files

#### `scripts/modal.js` Issues:
- Contains data fetching (`getGifts()`)
- Contains UI rendering logic
- Contains modal window creation
- Contains star rating transformation logic

#### `scripts/home.js` Issues:
- Mixes countdown timer logic with slider logic
- Contains DOM manipulation mixed with business logic

### 4. Magic Numbers and Hard-coded Values
**Problem**: Hard-coded values scattered throughout code

#### Examples:
- `scripts/home.js` line 22: `stepCount = 3`
- `scripts/home.js` line 23: `stepWidth = 178`
- `scripts/home.js` line 55: `window.innerWidth <= 768`
- `scripts/modal.js` lines 15-19: Magic numbers for random gift selection
- `scripts/gifts.js` line 21: `window.scrollY > 300`

### 5. Poor Naming Conventions
**Problem**: Inconsistent and unclear naming

#### Examples:
- `scripts/modal.js`: `giftsStarData` (should be `giftsData` or `allGiftsData`)
- `scripts/home.js`: `widthCount()` (should be `calculateSliderDimensions()`)
- `scripts/gifts.js`: `removeAllChildNodes()` (should be `clearContainer()`)

### 6. Inefficient DOM Operations
**Problem**: Unnecessary DOM manipulation and queries

#### Examples:
- `scripts/gifts.js`: `removeAllChildNodes()` removes nodes one by one
- `scripts/modal.js`: Multiple DOM queries for same elements
- `scripts/home.js`: `widthCount()` called on every slider button click

### 7. Poor Error Handling
**Problem**: Inconsistent error handling

#### Examples:
- `scripts/modal.js`: No error handling for fetch operations
- `scripts/gifts.js`: Basic console.log for errors
- `scripts/home.js`: Basic console.log for errors

### 8. SCSS Import Issues
**Problem**: Using `@use` but not following best practices

#### Files**: `styles.scss`
- Missing proper namespace usage
- No clear organization of imports
- Should follow recommended shared/styles structure

## Architectural Issues

### 9. No Component Architecture
**Problem**: Monolithic approach without reusable components

#### Issues:
- No reusable UI components
- Each page handles its own modal logic
- No shared utilities for common operations

### 10. No State Management
**Problem**: No centralized state management

#### Issues:
- DOM state scattered across files
- No single source of truth for application state
- Difficult to track and debug state changes

## Performance Issues

### 11. Inefficient Data Fetching
**Problem**: Multiple unnecessary API calls

#### Examples:
- `scripts/modal.js` line 84: `getGifts()` called twice in `modalWindow()`
- No caching mechanism for fetched data

### 12. Unnecessary Computations
**Problem**: Repeated calculations

#### Examples:
- `scripts/home.js`: `widthCount()` recalculates on every interaction
- `scripts/modal.js`: Star rating transformation repeated for every modal

## Security and Best Practice Issues

### 13. Direct HTML Injection
**Problem**: Using `innerHTML` without sanitization

#### Examples:
- `scripts/modal.js`: Multiple `innerHTML` assignments with user data
- Potential XSS vulnerability

### 14. Global Scope Pollution
**Problem**: Variables and functions in global scope

#### Examples:
- `scripts/home.js`: Global variables `currentStep`, `stepCount`, `stepWidth`
- No module encapsulation

## Refactoring Priority

### High Priority (Critical Issues)
1. **Restructure project folders** - Follow recommended structure
2. **Eliminate code duplication** - Create reusable functions
3. **Separate concerns** - Split files by responsibility
4. **Fix SCSS imports** - Follow @use best practices

### Medium Priority (Quality Improvements)
5. **Extract constants** - Remove magic numbers
6. **Improve naming** - Use descriptive names
7. **Add proper error handling** - Consistent error management
8. **Optimize DOM operations** - Reduce unnecessary manipulations

### Low Priority (Nice to Have)
9. **Add component architecture** - Create reusable components
10. **Implement state management** - Centralize state
11. **Add data caching** - Optimize API calls
12. **Sanitize HTML** - Security improvements

## Expected Impact

### Readability Improvements
- Clear file organization
- Descriptive naming
- Single responsibility principle

### Maintainability Improvements
- Reduced code duplication
- Better separation of concerns
- Consistent patterns

### Performance Improvements
- Fewer DOM operations
- Cached data
- Optimized calculations

### Security Improvements
- Sanitized HTML
- Better error handling
- Reduced global scope pollution
