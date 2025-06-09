# Optivana VANTHEX Deployment Guide

This guide provides instructions for deploying the Optivana VANTHEX monorepo to Vercel.

## Prerequisites

1. A Vercel account
2. MongoDB Atlas cluster (already set up)
3. The Optivana VANTHEX monorepo GitHub repository

## Deployment Steps

### 1. Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Select "Import Git Repository"
4. Find and select "optivana-vanthex-monorepo"
5. Click "Import"

### 2. Configure Project Settings

1. Framework Preset: Next.js
2. Root Directory: ./
3. Build Command: npm run build
4. Output Directory: frontend/.next
5. Install Command: npm install

### 3. Configure Environment Variables

Add the following environment variables:

```
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/optivana?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=7d

# API URLs
NEXT_PUBLIC_API_URL=/api
VANTHEX_API_URL=https://api.vanthex.optivana.store/api
VANTHEX_API_KEY=<your-vanthex-api-key>

# Node Environment
NODE_ENV=production
```

Replace the placeholders with your actual values.

### 4. Deploy

1. Click "Deploy"
2. Wait for the build and deployment to complete

### 5. Verify Deployment

1. Once deployed, Vercel will provide a URL for your application
2. Test the frontend by accessing the URL directly
3. Test the backend API by accessing `<your-vercel-url>/api/health`

### 6. Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click on "Domains"
3. Add your custom domain (e.g., optivana.store)
4. Follow the instructions to configure DNS settings

## Troubleshooting

### MongoDB Connection Issues

If you encounter MongoDB connection issues:

1. Verify that your MongoDB Atlas cluster is running
2. Check that your IP address is whitelisted in MongoDB Atlas Network Access settings
3. Ensure your MongoDB URI is correctly formatted in the environment variables

### API Connection Issues

If the frontend cannot connect to the backend API:

1. Verify that the API routes are correctly configured in vercel.json
2. Check that NEXT_PUBLIC_API_URL is set correctly
3. Ensure the backend API is properly deployed as serverless functions

## Maintenance

### Updating the Application

To update your application:

1. Make changes to your codebase
2. Push the changes to your GitHub repository
3. Vercel will automatically redeploy your application

### Monitoring

1. Use Vercel's built-in monitoring tools to track application performance
2. Set up additional monitoring using services like Sentry or New Relic if needed

## Security Best Practices

1. Never commit sensitive environment variables to version control
2. Regularly rotate your JWT secret and API keys
3. Use environment variables for all sensitive configuration
4. Implement rate limiting to prevent abuse
5. Keep dependencies updated to patch security vulnerabilities
