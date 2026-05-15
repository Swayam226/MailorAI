# MailorAI - Backend

AI-powered cold outreach generation platform built using the MERN, Groq AI, JWT authentication, and OTP email verification.

## Live

Backend: https://mailorai-backend.onrender.com

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-rate-limit

## Local Setup

### Clone Repo

```bash
git clone <repo-url>
```

### Backend setup

```bash
cd backend
npm install
npm start
```

## Environment Variables

### Backend

```env
MONGO_URI=
JWT_SECRET=
GROQ_API_KEY=
EMAIL_FROM=
BREVO_API_KEY=
```

## Architecture

Frontend deployed on Vercel communicates with Express backend hosted on Render. MongoDB Atlas is used for persistent storage, while Groq powers AI generation and Brevo handles transactional emails.
