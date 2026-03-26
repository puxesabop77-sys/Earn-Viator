# EarnViator Admin Control System

Advanced administrative infrastructure for managing user virtual currency and system-wide communications.

## Features
- **Coin Management (/sufiyan)**:
    - Search users by email.
    - Add or deduct coins from account balance.
    - Visual feedback on user currency state.
- **Bulk Emailer (/mailev)**:
    - Send official company emails from `noreply@earnviator.com`.
    - Supports HTML content.
    - Real-time dispatch status reporting.

## Tech Stack
-   **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons, Axios.
-   **Backend**: Node.js, Express, Nodemailer.
-   **Database**: MongoDB.

## Prerequisites
-   Node.js (v18 or higher)
-   MongoDB installed and running locally on `mongodb://localhost:27017`
-   SMTP Server access (for mailing features)

## Installation

1.  Clone the repository and install dependencies:
    `npm install`

2.  Environment Setup:
    - Open `.env` file.
    - Replace `SMTP_PASS` with your real email service credentials (if using Gmail, use an "App Password").
    - Ensure `MONGODB_URI` points to your database.

3.  Seed Test User:
    Run this command via cURL or a browser once the server is running to create a test user:
    `POST http://localhost:5000/api/admin/seed`

## Running the Application

1.  Start both Frontend and Backend concurrently:
    `npm run dev`

2.  Access the Admin Panels:
    - Landing Page: `http://localhost:3000`
    - Coin Panel: `http://localhost:3000/sufiyan`
    - Mail Panel: `http://localhost:3000/mailev`

## Project Structure
- `server/`: Express API server, MongoDB models.
- `src/app/`: Next.js frontend pages and layouts.
- `public/`: Static assets.

## Troubleshooting
- **Email not sending**: Check if your SMTP credentials are correct and if your provider allows third-party app access.
- **MongoDB Error**: Ensure `mongod` service is running or provide a valid MongoDB Atlas URI in `.env`.
