# Legal Analyzer App

A React-based application for analyzing Second Amendment legal opinions and highlighting key legal citations.

## Features

- Upload and analyze legal documents
- Automatic highlighting of Supreme Court cases, statutes, and legal phrases
- Interactive navigation through citations
- Export results as HTML or CSV

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in or create an account
3. Click "Add New..." → "Project"
4. Import this Git repository
5. Vercel will automatically detect the React app and configure the build settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build Commands

- **Build Command**: `npm run build` (automatically detected)
- **Output Directory**: `build` (automatically detected)
- **Install Command**: `npm install` (automatically detected)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Tech Stack

- React 18
- Tailwind CSS
- Lucide React (icons)
- React Scripts (Create React App)
