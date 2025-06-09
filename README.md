# Optivana VANTHEX Monorepo

This repository contains the full-stack implementation of the Optivana VANTHEX system, combining both frontend and backend in a unified monorepo structure.

## Structure

- `/frontend` - Next.js frontend application
- `/backend` - Node.js/Express backend API

## Development

To run the entire application locally:

```bash
npm install
npm run dev
```

This will start both the frontend and backend concurrently.

## Frontend

The frontend is built with:
- Next.js
- React
- Tailwind CSS
- SWR for data fetching

## Backend

The backend is built with:
- Node.js
- Express
- MongoDB (with MongoDB Atlas for production)
- JWT authentication

## Deployment

This monorepo is configured for deployment to Vercel, with:
- Frontend deployed as a Next.js application
- Backend deployed as Serverless Functions
- MongoDB Atlas for database storage

## Environment Variables

See `.env.example` files in both frontend and backend directories for required environment variables.
