# Ceylon Gems - Frontend

A modern React TypeScript application for Ceylon Gems e-commerce platform.

## Features

- **Authentication**: JWT-based login and signup with form validation
- **State Management**: Redux Toolkit for auth state management
- **API Integration**: Axios with JWT interceptors and React Query for data fetching
- **Routing**: Protected routes with React Router
- **UI Components**: shadcn/ui components with Tailwind CSS
- **Form Validation**: react-hook-form with Zod schema validation

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Redux Toolkit** for state management
- **React Query** for server state management
- **React Router DOM** for routing
- **React Hook Form** + **Zod** for form validation
- **Axios** for API calls

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   Open http://localhost:5174 in your browser

## API Endpoints

The frontend expects the following backend endpoints:

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration  
- `GET /auth/me` - Get user profile

## Routes

- `/login` - Login page
- `/signup` - Signup page
- `/home` - Protected home page (requires authentication)
- `/` - Redirects to `/home`

## Development

The application is configured with:
- ESLint for code linting
- TypeScript for type safety
- Hot module replacement for fast development
- Path aliases (@/ for src/)

## Build

```bash
npm run build
```
