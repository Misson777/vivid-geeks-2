# Vivid Geeks - IT Services

A modern IT service desk application built with Next.js, Prisma, and MongoDB.

## Prerequisites

- Node.js 18.18 or later
- pnpm (recommended package manager)
- MongoDB database
- Gmail account with App Password enabled

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


# Required: Email address to send admin notifications to
NOTIFY_ADMIN_EMAIL="admin@example.com"

# Required: Google App Password for sending emails
GMAIL_USER=""
GMAIL_APP_PASSWORD=""
```

#### Environment Variables Explained:

- **DATABASE_URL**: MongoDB connection string used by Prisma to connect to your database.
- **ADMIN_EMAIL/ADMIN_PASSWORD**: Credentials used for admin authentication in the middleware.
- **EMAIL_SERVICE**: URL of your email service API for sending notifications.
- **NOTIFY_ADMIN_EMAIL**: Email address to send admin notifications to.
- **GMAIL_USER**: Your Gmail address for sending emails.
- **GMAIL_APP_PASSWORD**: Your Gmail App Password for sending emails.

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
pnpm start:mail # Start the mail server
```

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


## Questions

### 🔹 Q1: What is the tech stack used?

A:
Frontend: Next.js 15, Tailwind CSS, shadcn/ui
Backend: Prisma ORM with MongoDB Atlas
Email: Express.js + Nodemailer + Google SMTP
State: TanStack Query
Forms: React Hook Form + Zod

### 🔹 Q2: Why did you use Next.js?

A:
Next.js provides both frontend and backend in one codebase. It supports server-side rendering, file-based routing, API routes, and has excellent deployment support via Vercel.

### 🔹 Q3: Why is the mail server separate?

A:
To separate concerns. Keeping the email logic outside the frontend avoids blocking the UI and improves maintainability and scalability. Also, it allows deploying or scaling the mail server independently.

### 🔹 Q5: How does authentication work?

A:

    Admin credentials are validated server-side

    If valid, a secure HTTP-only cookie is set

    The cookie is checked on each protected route via middleware

### 🔹 Q6: How are emails sent?

A:

    Via an Express server at /mail-server/index.ts

    It uses Nodemailer with Gmail SMTP

    Credentials (GMAIL_USER, GMAIL_APP_PASSWORD) are stored in .env

    Supports admin notifications and contact form emails

### 🔹 Q7: Why Prisma with MongoDB?

A:
Prisma provides a type-safe way to interact with MongoDB using schema definitions. It improves developer productivity and reduces query bugs.

### 🔹 Q9: How do you handle form validation?

A:
Using React Hook Form with Zod. It validates fields on the client before submission, and Zod provides schema-based, type-safe rules.
