# Vivid Geeks - IT Services

A modern IT service desk application built with Next.js, Prisma, and MongoDB.

## Prerequisites

- Node.js 18.18 or later
- pnpm (recommended package manager)
- MongoDB database

## Installation

### 1. Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/) (version 18.18 or later).

Verify installation:

```bash
node --version
```

### 2. Install pnpm

```bash
npm install -g pnpm
```

Verify installation:

```bash
pnpm --version
```

### 3. Clone and Setup Project

```bash
# Clone the repository
git clone https://github.com/Misson777/vivid-geeks-2
cd vivid-geeks-2

# Install dependencies
pnpm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Required: MongoDB connection string for Prisma
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/vivid-geeks?retryWrites=true&w=majority"

# Required: Admin credentials for authentication
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"

# Required: Email service URL for notifications
EMAIL_SERVICE="https://your-email-service.com/api/send"

# Optional: Set to "production" in production environments
NODE_ENV="development"

# Required: Email address to send admin notifications to
NOTIFY_ADMIN_EMAIL="admin@example.com"
```

#### Environment Variables Explained:

- **DATABASE_URL**: MongoDB connection string used by Prisma to connect to your database.
- **ADMIN_EMAIL/ADMIN_PASSWORD**: Credentials used for admin authentication in the middleware.
- **EMAIL_SERVICE**: URL of your email service API for sending notifications.
- **NODE_ENV**: Controls development-specific features like React Query DevTools.
- **NOTIFY_ADMIN_EMAIL**: Email address to send admin notifications to.

### 5. Setup Database

```bash
# Generate Prisma client and push schema to database
pnpm db
```

## Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
pnpm build
```

To test the production build locally:

```bash
pnpm start
```

## Deployment on Vercel

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your project on [Vercel](https://vercel.com/new)
3. Add your environment variables in the Vercel dashboard
4. Deploy

## MongoDB Setup

1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up database access (username and password)
4. Set up network access (IP whitelist)
5. Get your connection string from the "Connect" button
6. Replace the placeholder values in the connection string with your actual credentials

## Project Structure

- `/src/app`: Next.js App Router pages and components
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and shared code
- `/src/queries`: API actions and React Query hooks
- `/prisma`: Database schema and migrations

## Features

- Ticket management system
- User authentication
- Role-based access control
- Email notifications
- Responsive UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **UI**: Tailwind CSS, shadcn/ui
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation
