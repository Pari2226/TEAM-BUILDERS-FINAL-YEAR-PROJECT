# Team Builders
https://team-builders.netlify.app/

Team Builders is a MERN stack platform for finding teammates, forming teams, and recommending collaborators with a small machine learning service.

Authentication is powered by Clerk in the React client and Express backend.

## Structure

- `client/` React + Vite frontend
- `server/` Express + MongoDB backend
- `ml-service/` Flask recommendation microservice

## Setup

1. Install dependencies from the repository root:
   ```bash
   npm install
   ```
2. Create environment files from the examples in each package.
3. Add your Clerk keys:
   - `client/.env` -> `VITE_CLERK_PUBLISHABLE_KEY=...`
   - `client/.env` -> `VITE_CLERK_FRONTEND_API=https://needed-pegasus-68.clerk.accounts.dev`
   - `server/.env` -> `CLERK_SECRET_KEY=...`
   - `server/.env` -> `CLERK_API_URL=https://api.clerk.com`
   - `server/.env` -> `CLERK_JWKS_URL=https://needed-pegasus-68.clerk.accounts.dev/.well-known/jwks.json`
   - `server/.env` -> `CLERK_JWT_PUBLIC_KEY=...`
4. Start all services:
   ```bash
   npm run dev
   ```

## Environment variables

See:

- `server/.env.example`
- `client/.env.example`
- `ml-service/.env.example`

## Auth flow

- `/login` and `/signup` render Clerk `SignIn` and `SignUp` components.
- Protected routes use Clerk session state instead of JWT auth.
- The backend syncs authenticated Clerk users into MongoDB through `GET /api/auth/me`.
