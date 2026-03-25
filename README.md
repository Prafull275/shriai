# ShriaI - AI-Powered Career Development Platform

<div align="center">

![ShriaI](https://img.shields.io/badge/ShriaI-Career%20AI-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38b2ac?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.17.1-2d3748?style=for-the-badge&logo=prisma)
![Google AI](https://img.shields.io/badge/Google%20AI-Gemini-ea4335?style=for-the-badge&logo=google)

A comprehensive AI-powered platform designed to help professionals advance their careers through intelligent resume building, cover letter generation, a dedicated AI Interview Module with voice interaction, and real-time industry insights.

[Getting Started](#getting-started) • [Features](#features) • [Tech Stack](#tech-stack) • [Project Structure](#project-structure) • [Installation](#installation)

</div>

---

## Overview

**ShriaI** is a modern web application that leverages artificial intelligence to provide personalized career development guidance. Whether you're preparing for an interview, building a professional resume, or staying updated with industry trends, ShriaI offers comprehensive tools powered by Google's Gemini AI to help you succeed.

The platform includes a dedicated **AI Interview Module** - a full-stack application featuring live voice interviews, AI-powered question generation, real-time evaluation, and comprehensive performance analytics.

### Key Capabilities
- 🤖 **AI-Powered Career Guidance** - Personalized career advice based on your profile and industry
- 🎯 **AI Interview Module** - Dedicated full-stack interview platform with voice interaction and AI evaluation
- 📄 **Smart Resume Creation** - ATS-optimized resume builder with AI assistance
- 💼 **Cover Letter Generation** - Customize cover letters for specific job opportunities
- 📊 **Industry Analytics** - Real-time salary data, market trends, and skill demand analysis
- 📈 **Performance Tracking** - Monitor your interview progress and improvements over time

---

## Features

### 1. **Resume Builder** 📄
- **Smart Resume Creation**: AI-assisted resume building with real-time suggestions
- **ATS Optimization**: Generate resumes optimized for Applicant Tracking Systems
- **Content Suggestions**: AI-powered recommendations for impactful language and achievements
- **Multiple Format Export**: Export as PDF or markdown
- **Real-time Editing**: Live preview and editing capabilities

### 2. **Cover Letter Generator** ✍️
- **AI-Powered Generation**: Automatically generate cover letters tailored to job descriptions
- **Job Description Analysis**: Analyzes job postings to match your skills
- **Professional Templates**: Multiple professional formatting options
- **Quick Customization**: Easy editing and customization after generation
- **Multi-Company Management**: Store and manage multiple cover letters

### 3. **AI Interview Module** 🎤
- **Dedicated Interview Platform**: Full-stack AI interview system with separate client/server architecture
- **Resume Analysis**: PDF upload and AI-powered extraction of role, experience, projects, and skills
- **Dynamic Question Generation**: 5 progressive questions (easy→medium→hard) based on user profile
- **Live Interview Experience**: Voice synthesis, speech recognition, and real-time timer
- **AI-Powered Scoring**: Automated evaluation of confidence, communication, and correctness
- **Comprehensive Reports**: Performance analytics with charts, feedback, and PDF export
- **Credit-Based System**: Integrated payment system for interview sessions (50 credits per interview)
- **Interview History**: Track past performances and improvement over time

### 4. **Industry Insights Dashboard** 📊
- **Salary Analysis**: Real-time salary ranges by role, location, and experience level
- **Market Trends**: Current industry trends and growth predictions
- **Skill Demand**: Most in-demand skills for your industry
- **Market Outlook**: Positive/Neutral/Negative market conditions analysis
- **Recommended Skills**: AI-suggested skills to learn for career growth
- **Growth Rate Tracking**: Monitor industry growth and opportunities

### 5. **User Onboarding** 🎯
- **Profile Setup**: Comprehensive onboarding flow
- **Industry Selection**: Choose from multiple industry categories
- **Experience Level**: Define your years of experience
- **Skills Management**: Add and manage your professional skills
- **Bio/Summary**: Create a professional summary

### 6. **User Dashboard** 📱
- **Profile Management**: View and edit your professional profile
- **Quick Stats**: Key metrics about your profile and activity
- **Career Insights**: Personalized insights based on your industry
- **Easy Navigation**: Quick access to all tools and features

---

## AI Interview Module Architecture

### Overview
The AI Interview Module is a dedicated full-stack application consisting of:
- **Frontend**: React + Vite application with voice interaction and real-time UI
- **Backend**: Node.js/Express server with AI integration and database management
- **Database**: MongoDB for user data, interviews, and payment records
- **AI Service**: OpenRouter API (GPT-4o-mini) for question generation and answer evaluation

### Module Structure
```
ai-interview-module/
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Step1SetUp.jsx   # Interview setup & resume upload
│   │   │   ├── Step2Interview.jsx # Live interview interface
│   │   │   ├── Step3Report.jsx   # Performance report & analytics
│   │   │   └── Timer.jsx        # Interview timer component
│   │   ├── pages/
│   │   │   ├── InterviewPage.jsx # Main interview flow
│   │   │   ├── InterviewHistory.jsx # Past interviews
│   │   │   └── InterviewReport.jsx # Detailed reports
│   │   ├── redux/userSlice.js   # User state management
│   │   └── utils/firebase.js    # Authentication utilities
│   └── package.json
│
└── server/                      # Node.js backend
    ├── controllers/
    │   ├── interview.controller.js # Core interview logic
    │   ├── auth.controller.js   # Authentication
    │   ├── payment.controller.js # Payment processing
    │   └── user.controller.js   # User management
    ├── models/
    │   ├── interview.model.js   # Interview schema
    │   ├── user.model.js        # User schema
    │   └── payment.model.js     # Payment schema
    ├── services/
    │   ├── openRouter.service.js # AI API integration
    │   └── razorpay.service.js  # Payment gateway
    ├── routes/                  # API endpoints
    └── package.json
```

### Interview Flow
1. **Setup Phase**: User selects role, experience, interview mode (Technical/HR), uploads resume
2. **Resume Analysis**: AI extracts structured data from PDF (role, experience, projects, skills)
3. **Question Generation**: AI creates 5 tailored questions with difficulty progression
4. **Live Interview**: Voice-guided Q&A with speech recognition and time limits
5. **Answer Evaluation**: AI scores each response on confidence, communication, correctness
6. **Report Generation**: Comprehensive analytics with charts and improvement suggestions

### API Endpoints
- `POST /api/auth/google` - User authentication
- `POST /api/interview/resume` - Resume upload and analysis
- `POST /api/interview/generate-questions` - Create interview questions
- `POST /api/interview/submit-answer` - Submit and evaluate answers
- `POST /api/interview/finish` - Complete interview and generate report
- `GET /api/interview/get-interview` - Fetch interview history
- `GET /api/interview/report/:id` - Get detailed report
- `POST /api/payment/order` - Create payment order
- `POST /api/payment/verify` - Verify payment completion

### Key Features
- **Voice Interaction**: Text-to-speech for questions, speech-to-text for answers
- **Real-time Timer**: Per-question time limits with automatic submission
- **AI Feedback**: Instant evaluation with specific improvement tips
- **Performance Tracking**: Historical data and progress visualization
- **Credit System**: 50 credits per interview, Razorpay integration
- **PDF Reports**: Downloadable performance reports with charts

### Setup Instructions
1. **Install Dependencies**
   ```bash
   # Client
   cd client && npm install
   
   # Server
   cd ../server && npm install
   ```

2. **Environment Variables**
   ```env
   # Server .env
   PORT=6000
   MONGODB_URI=mongodb://localhost:27017/ai-interview
   JWT_SECRET=your_jwt_secret
   OPENROUTER_API_KEY=your_openrouter_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   ```

3. **Run Services**
   ```bash
   # Start MongoDB
   mongod
   
   # Start server
   cd server && npm run dev
   
   # Start client (new terminal)
   cd client && npm run dev
   ```

4. **Access Application**
   - Main App: `http://localhost:3000`
   - Interview Module: `http://localhost:5173` (Vite dev server)

---

## Tech Stack

### Frontend
- **Framework**: [Next.js 15.5.4](https://nextjs.org/) - React-based full-stack framework
- **UI Library**: [React 19.1.0](https://react.dev/) - JavaScript library for building UIs
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Component Library**: [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful SVG icon set
- **Markdown Editor**: [@uiw/react-md-editor](https://uiwjs.org/react-md-editor/) - React markdown editor
- **Charts**: [Recharts 3.3.0](https://recharts.org/) - Composable charting library

### Backend & Database
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Robust relational database
- **ORM**: [Prisma 6.17.1](https://www.prisma.io/) - Modern database ORM
- **Authentication**: [Clerk](https://clerk.com/) - Complete user management platform
- **Job Queue**: [Inngest 3.44.3](https://www.inngest.com/) - Serverless event-driven tasks

### AI & Utilities
- **AI Model**: [Google Generative AI (Gemini)](https://ai.google.dev/) - State-of-the-art language model
- **Form Management**: [React Hook Form 7.65.0](https://react-hook-form.com/) - Performant flexible form validation
- **Validation**: [Zod 4.1.12](https://zod.dev/) - TypeScript-first schema validation
- **PDF Generation**: [jsPDF 3.0.3](https://github.com/parallax/jsPDF) & [html-to-image 1.11.13](https://github.com/bubkoo/html-to-image)
- **Toast Notifications**: [Sonner 2.0.7](https://sonner.emilkowal.ski/) - Elegant toast library

### Development
- **Linting**: [ESLint 9](https://eslint.org/) - JavaScript linter
- **Build Tool**: Turbopack - Next.js turbo build tool

---

## Project Structure

```
shriai/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   ├── page.jsx                 # Landing page
│   ├── (auth)/                  # Authentication routes
│   │   ├── sign-in/             # Sign in page
│   │   └── sign-up/             # Sign up page
│   ├── (main)/                  # Protected routes
│   │   ├── dashboard/           # User dashboard
│   │   ├── onboarding/          # User onboarding flow
│   │   ├── interview/           # Interview preparation
│   │   │   ├── page.jsx         # Interview main page
│   │   │   ├── mock/            # Mock interview page
│   │   │   └── _components/     # Interview components
│   │   ├── resume/              # Resume builder
│   │   │   └── _components/     # Resume components
│   │   └── ai-cover-letter/     # Cover letter generator
│   │       └── _components/     # Cover letter components
│   └── api/
│       └── inngest/             # Inngest webhook handler
│
├── actions/                      # Server actions (Next.js)
│   ├── user.js                  # User management actions
│   ├── dashboard.js             # Dashboard & industry insights
│   ├── interview.js             # Interview quiz generation
│   ├── resume.js                # Resume CRUD operations
│   └── cover-letter.js          # Cover letter generation
│
├── components/                   # React components
│   ├── Header.jsx               # Navigation header
│   ├── HeroSection.jsx          # Landing page hero
│   ├── theme-provider.jsx       # Theme context provider
│   └── ui/                      # Reusable UI components
│       ├── button.jsx           # Button component
│       ├── card.jsx             # Card component
│       ├── input.jsx            # Input component
│       ├── dialog.jsx           # Modal dialog
│       ├── accordion.jsx        # Accordion component
│       ├── tabs.jsx             # Tab component
│       └── [other UI components...]
│
├── data/                         # Static data
│   ├── features.js              # Platform features
│   ├── faqs.js                  # FAQ content
│   ├── howItWorks.js            # How it works guide
│   ├── industries.js            # Industry data
│   └── testimonial.js           # User testimonials
│
├── hooks/                        # Custom React hooks
│   └── use-fetch.js             # Custom fetch hook
│
├── lib/                          # Utility functions & libraries
│   ├── utils.js                 # Helper utilities
│   ├── checkUser.js             # User existence check
│   ├── prisma.js                # Prisma client instance
│   └── inngest/
│       ├── client.js            # Inngest client setup
│       └── functions.js         # Scheduled Inngest functions
│
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
│
├── public/                       # Static assets
│
├── package.json                  # Project dependencies
├── next.config.mjs              # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── jsconfig.json                # JavaScript configuration
├── eslint.config.mjs            # ESLint configuration
└── README.md                     # This file
│
├── client/                      # AI Interview Module - Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Step1SetUp.jsx   # Interview setup & resume upload
│   │   │   ├── Step2Interview.jsx # Live interview interface
│   │   │   ├── Step3Report.jsx   # Performance report & analytics
│   │   │   └── Timer.jsx        # Interview timer component
│   │   ├── pages/
│   │   │   ├── InterviewPage.jsx # Main interview flow
│   │   │   ├── InterviewHistory.jsx # Past interviews
│   │   │   └── InterviewReport.jsx # Detailed reports
│   │   ├── redux/userSlice.js   # User state management
│   │   └── utils/firebase.js    # Authentication utilities
│   └── package.json
│
└── server/                      # AI Interview Module - Backend
    ├── controllers/
    │   ├── interview.controller.js # Core interview logic
    │   ├── auth.controller.js   # Authentication
    │   ├── payment.controller.js # Payment processing
    │   └── user.controller.js   # User management
    ├── models/
    │   ├── interview.model.js   # Interview schema
    │   ├── user.model.js        # User schema
    │   └── payment.model.js     # Payment schema
    ├── services/
    │   ├── openRouter.service.js # AI API integration
    │   └── razorpay.service.js  # Payment gateway
    ├── routes/                  # API endpoints
    ├── middlewares/             # Authentication middleware
    ├── config/                  # Database & token config
    └── package.json
```

---

## Database Schema

### User Model
Stores user profile information and authentication details.
- **Fields**: id, clerkUserId, email, name, imageUrl, industry, bio, experience, skills, createdAt, updatedAt
- **Relations**: assessments, resume, coverLetters, industryInsight

### Assessment Model
Tracks interview quiz attempts and results.
- **Fields**: id, userId, quizScore, questions, category, improvementTip, createdAt, updatedAt
- **Relations**: user

### Resume Model
Stores user resumes.
- **Fields**: id, userId, content, atsScore, feedback, createdAt, updatedAt
- **Relations**: user

### CoverLetter Model
Manages cover letters for different job applications.
- **Fields**: id, userId, content, jobDescription, companyName, jobTitle, status, createdAt, updatedAt
- **Relations**: user

### IndustryInsight Model
Contains real-time industry data and trends.
- **Fields**: id, industry, salaryRanges, growthRate, demandLevel, topSkills, marketOutlook, keyTrends, recommendedSkills, lastUpdated, nextUpdate
- **Relations**: users

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **PostgreSQL** database
- **Git** for version control

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/shriai"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up
CLERK_AFTER_SIGN_IN_URL=/dashboard
CLERK_AFTER_SIGN_UP_URL=/onboarding

# Google Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key

# Inngest (for scheduled tasks)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prafull275/shriai.git
   cd shriai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database**
   ```bash
   npx prisma migrate dev
   # or
   npx prisma db push
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

---

## Available Scripts

- **`npm run dev`** - Start development server with Turbopack
- **`npm run build`** - Build the project for production
- **`npm start`** - Start production server
- **`npm run lint`** - Run ESLint on the codebase

---

## Key Features Implementation

### 1. AI Integration (Gemini API)
The application uses Google's Gemini 2.5 Flash model for:
- Generating personalized cover letters
- Creating role-specific interview questions
- Providing industry insights and trends
- Offering performance feedback
- Suggesting skill improvements

### 2. Background Jobs (Inngest)
Scheduled tasks that run automatically:
- **Weekly Industry Insights Update** - Fetches latest salary data, trends, and market conditions every Sunday at midnight
- Updates relevant to all industries in the platform

### 3. Authentication (Clerk)
Secure user management with:
- Email/password authentication
- Social login options
- User profile management
- Protected API routes
- Automatic session management

### 4. Database Management (Prisma)
- Type-safe database queries
- Automatic migrations
- Relationship management
- Real-time data synchronization

---

## Feature Workflows

### AI Interview Module Workflow
1. User accesses the dedicated AI Interview Module (separate client/server)
2. Uploads resume PDF for AI analysis (extracts role, experience, projects, skills)
3. Selects interview mode (Technical/HR) and provides role details
4. AI generates 5 progressive questions (easy→medium→hard) based on profile
5. Live interview begins with voice synthesis and speech recognition
6. Each answer is evaluated in real-time on confidence, communication, correctness
7. Time limits per question with automatic submission
8. Interview completes and final scores are calculated
9. Comprehensive report generated with charts, feedback, and PDF export
10. Interview history tracked for performance improvement analysis

### Interview Preparation Workflow (Main App)
1. User navigates to Interview Preparation
2. System generates 10 role-specific questions based on user's industry and skills
3. User answers each question
4. AI evaluates responses and provides feedback
5. Quiz results are stored in Assessment model
6. Performance charts and statistics are displayed
7. Improvement tips are generated based on weak areas

### Resume Building Workflow
1. User navigates to Resume Builder
2. Fills in work experience, education, and skills
3. AI suggests improvements for ATS optimization
4. User can preview resume in real-time
5. Export as PDF or Markdown
6. Resume is saved to database
7. Can be used in cover letter generation

### Cover Letter Generation Workflow
1. User goes to Cover Letter section
2. Enters job title, company name, and job description
3. AI generates customized cover letter using:
   - User's resume and skills
   - Job requirements
   - Professional tone and structure
4. User can edit and customize the letter
5. Save to database for future reference
6. Export as PDF or download as markdown

### Dashboard & Insights
1. User views dashboard with personalized insights
2. System fetches user's industry data from IndustryInsight model
3. Displays:
   - Salary ranges for relevant roles
   - Market outlook and growth rate
   - Top in-demand skills
   - Current industry trends
   - Recommended skills to learn
4. Data is updated weekly via Inngest

---

## User Flow

### New User Journey
1. **Landing Page** → Sign up via Clerk
2. **Onboarding** → Fill profile (industry, experience, skills, bio)
3. **Industry Data Sync** → System creates/fetches industry insights
4. **Dashboard** → View personalized career insights
5. **Choose Tool**:
   - Resume Builder → Create resume
   - Interview Prep → Take mock interviews
   - Cover Letter → Generate for job applications
6. **Track Progress** → Monitor improvements in dashboard

### Returning User Journey
1. **Sign In** → Authenticate via Clerk
2. **Dashboard** → View updated insights and progress
3. **Use Tools** → Access any feature
4. **Track Stats** → Monitor interview scores and progress

---

## API & Server Actions

### Authentication Server Actions
- `updateUser(data)` - Update user profile
- `getUserOnboardingStatus()` - Check if user completed onboarding

### Interview Server Actions
- `generateQuiz()` - Generate AI quiz questions
- `submitQuiz(answers)` - Save quiz results and get feedback
- `getAssessments()` - Fetch user's assessment history

### Resume Server Actions
- `saveResume(content)` - Save/update resume
- `getResume()` - Fetch user's resume
- `generateResumeAISuggestions(content)` - Get AI improvement suggestions

### Cover Letter Server Actions
- `generateCoverLetter(data)` - Generate AI cover letter
- `getCoverLetters()` - Fetch all user's cover letters
- `deleteCoverLetter(id)` - Delete a cover letter

### Dashboard Server Actions
- `getIndustryInsights()` - Fetch industry data for user
- `generateAIInsights(industry)` - Generate industry insights

### Inngest Functions
- `generateIndustryInsights` - Scheduled weekly task to update industry data

---

## Configuration Files

### Next.js Configuration (`next.config.mjs`)
```javascript
- Image optimization for randomuser.me domain
- Turbopack for faster builds
- Production optimizations
```

### Tailwind Configuration
- Utility-first CSS framework
- Custom color schemes and theming
- Animation utilities

### Prisma Configuration (`schema.prisma`)
- PostgreSQL as database provider
- Relationship definitions
- Data validation at schema level

---

## Deployment

### Deployment Options

#### Vercel (Recommended for Next.js)
1. Push code to GitHub
2. Connect Vercel to your GitHub account
3. Import project and configure environment variables
4. Deploy automatically

#### Traditional Hosting
1. Build the project: `npm run build`
2. Set NODE_ENV=production
3. Run: `npm start`
4. Configure a reverse proxy (nginx/Apache)
5. Set up SSL certificate

### Environment Variables for Production
- Update all `.env.local` variables to production values
- Use secure vaults for secrets
- Enable CORS if needed

---

## Troubleshooting

### Common Issues

**Database Connection Error**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env.local
- Ensure credentials are correct

**Clerk Authentication Issues**
- Verify NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set
- Check Clerk dashboard for allowed domains
- Clear browser cookies and cache

**AI Generation Errors**
- Verify GEMINI_API_KEY is valid
- Check API quota and usage limits
- Ensure proper prompt formatting

**Inngest Tasks Not Running**
- Verify INNGEST_EVENT_KEY and INNGEST_SIGNING_KEY
- Check Inngest dashboard for errors
- Ensure server is publicly accessible

---

## Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

---

## Best Practices

### Code Organization
- Keep components small and focused
- Use server actions for API logic
- Separate concerns (UI, logic, data)

### Performance
- Use Next.js Image optimization
- Implement code splitting
- Cache database queries appropriately
- Optimize AI API calls

### Security
- Always validate user input on server
- Use environment variables for secrets
- Implement proper error handling
- Rate limit API endpoints

### Database
- Use Prisma migrations for schema changes
- Index frequently queried columns
- Regular database backups
- Monitor query performance

---

## Future Enhancements

- [ ] Video interview recording and playback
- [ ] Team collaboration features
- [ ] Advanced analytics and career path recommendations
- [ ] Integration with LinkedIn and job boards
- [ ] Multi-language support
- [ ] Mobile native applications
- [ ] Peer mentoring network
- [ ] Premium subscription features

---

## Support & Contact

For support, questions, or feedback:
- 📧 Email: support@shriai.com
- 🐛 Issues: Report on GitHub
- 💬 Discussions: GitHub Discussions

---

## License

This project is licensed under the MIT License - see LICENSE file for details.

---

## Acknowledgments

- **Google Generative AI** - For powerful Gemini models
- **Clerk** - For seamless authentication
- **Prisma** - For excellent database ORM
- **Next.js** - For the amazing React framework
- **Tailwind CSS** - For utility-first styling
- **Inngest** - For reliable job scheduling

---

<div align="center">

### Built with ❤️ by the SHRIAI Team

⭐ If you find this project helpful, please consider giving it a star!

</div>
