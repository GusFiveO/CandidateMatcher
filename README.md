# Feedback Application for AI-Generated Candidate Matches

## Overview

This application manages the workflow of collecting recruiter feedback on AI-generated candidate matches. The target job for the tech case is “Customer Support @Doctolib”. The system uses Inngest Functions to handle the workflow, including generating fake match analyses, sending Slack notifications, and managing feedback.

## Features

- **AI-Generated Candidate Matches**: Generates fake candidate matches with analyses.
- **Slack Integration**: Sends notifications to Slack for feedback requests.
- **Feedback Management**: Collects and stores feedback from recruiters.
- **Automated Workflow**: Uses Inngest to automate the feedback collection process.
- **User Authentication**: Manages user sessions and authentication using Better Auth.
- **Frontend Interface**: Provides a secure interface to view match analyses and their statuses.

## Setup Instructions

### Prerequisites

- Node.js (v18.11.18 or later)
- npm (v8.5.0 or later)
- PostgreSQL database
- Slack app with necessary permissions

### Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_DATABASE_URL=your_database_url
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SLACK_CLIENT_ID=your_slack_client_id
NEXT_PUBLIC_SLACK_CLIENT_SECRET=your_slack_client_secret
NEXT_PUBLIC_SLACK_REDIRECT_URI=http://localhost:3000/api/slack/install
NEXT_PUBLIC_MISTRAL_API_KEY=your_mistral_api_key
```

#### free mistral api key available at https://console.mistral.ai/

### Installation

Clone the Repository:

```bash
git clone https://github.com/GusFiveO/CandidateMatcher.git
cd CandidateMatcher
```

Apply migrations:

```bash
npm i -D drizzle-kit tsx
cd db
npx drizzle-kit push
cd ..
```

Build the application:

```bash
docker-compose up --build
```

Access the Application:

Open your browser and navigate to http://localhost:3000.
Follow the on-screen instructions to install the Slack app and log in.

Open your browser and navigate to http://localhost:8288 to access inngest dev dashboard.

### Project Structure

- app/: Contains the Next.js application pages and API routes.
- components/: Reusable UI components.
- db/: Database configuration and schema definitions.
- lib/: Utility functions and client setups.
- src/inngest/: Inngest functions and workflows.
- styles/: Global CSS styles.
