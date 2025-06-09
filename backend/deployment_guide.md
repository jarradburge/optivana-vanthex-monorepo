# Optivana VANTHEX Backend API Deployment Guide

This guide provides instructions for deploying the Optivana VANTHEX backend API to Vercel.

## Prerequisites

1. A Vercel account
2. MongoDB Atlas cluster (already set up)
3. The Optivana VANTHEX backend API codebase

## Deployment Steps

### 1. Prepare Environment Variables

Create a `.env.production` file with the following variables:

```
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/optivana?retryWrites=true&w=majority
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=7d
VANTHEX_API_URL=https://api.vanthex.optivana.store/api
VANTHEX_API_KEY=<your-vanthex-api-key>
LOG_LEVEL=info
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
CORS_ORIGIN=https://lpbuwwuy.manus.space
```

Replace the placeholders with your actual values.

### 2. Deploy to Vercel

#### Option 1: Using Vercel CLI

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy the API:
   ```
   cd /path/to/api
   vercel --prod
   ```

4. Follow the prompts to complete the deployment.

#### Option 2: Using Vercel Dashboard

1. Push your code to a GitHub repository.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard).
3. Click "New Project".
4. Import your GitHub repository.
5. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm install
   - Output Directory: ./
   - Install Command: npm install
6. Add environment variables from your `.env.production` file.
7. Click "Deploy".

### 3. Verify Deployment

1. Once deployed, Vercel will provide a URL for your API.
2. Test the API by accessing the health endpoint:
   ```
   https://<your-vercel-url>/health
   ```
3. You should receive a response like:
   ```json
   {"status":"ok","message":"Optivana API is running"}
   ```

### 4. Connect Frontend to Backend

Update the frontend API configuration to point to your new backend URL:

```javascript
// In frontend/services/api.js
const API_URL = 'https://<your-vercel-url>';
```

### 5. Custom Domain (Optional)

1. Go to your Vercel project settings.
2. Click on "Domains".
3. Add your custom domain (e.g., api.optivana.store).
4. Follow the instructions to configure DNS settings.

## Troubleshooting

### MongoDB Connection Issues

If you encounter MongoDB connection issues:

1. Verify that your MongoDB Atlas cluster is running.
2. Check that your IP address is whitelisted in MongoDB Atlas Network Access settings.
3. Ensure your MongoDB URI is correctly formatted in the environment variables.

### CORS Issues

If you encounter CORS issues:

1. Verify that the `CORS_ORIGIN` environment variable is set to your frontend URL.
2. Check the CORS configuration in your server.js file.

### JWT Authentication Issues

If you encounter JWT authentication issues:

1. Ensure your `JWT_SECRET` is set correctly.
2. Check that the token expiration time (`JWT_EXPIRES_IN`) is appropriate.

## Maintenance

### Updating the API

To update your API:

1. Make changes to your codebase.
2. Push the changes to your GitHub repository (if using GitHub integration).
3. Vercel will automatically redeploy your API.

### Monitoring

1. Use Vercel's built-in monitoring tools to track API performance.
2. Set up additional monitoring using services like Sentry or New Relic if needed.

## Security Best Practices

1. Never commit sensitive environment variables to version control.
2. Regularly rotate your JWT secret and API keys.
3. Use environment variables for all sensitive configuration.
4. Implement rate limiting to prevent abuse.
5. Keep dependencies updated to patch security vulnerabilities.
