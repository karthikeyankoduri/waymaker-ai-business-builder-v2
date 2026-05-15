<div align="center">

# 🚀 Waymaker AI Business Builder

### *From Spark to Launch — The Autonomous AI Co-Founder*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-F55036?logo=groq&logoColor=white)](https://groq.com/)
[![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

**Waymaker** turns a raw business idea into a full startup kit — market research, competitor analysis, a live landing page, social media content, and funding leads — all generated autonomously by AI in under 2 minutes.

[✨ Live Demo](#) · [📖 Documentation](#architecture) · [🐛 Report Bug](https://github.com/karthikeyankoduri/waymaker-ai-business-builder/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Screens & Modules](#screens--modules)
- [AI Orchestration Flow](#ai-orchestration-flow)
- [Integrations](#integrations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

Entrepreneurs often get stuck in the **"idea phase"**. The gap between conceiving a business concept and doing the foundational work — market research, competitor analysis, a website, and a marketing plan — can take weeks and requires diverse skills.

**Waymaker eliminates that gap.**

Input your idea. The AI orchestrator takes over — scraping real-time market data, generating a premium website, writing platform-specific social posts, identifying funding opportunities, and saving everything to the cloud. No re-generation required across sessions.

> 💡 Built as a hackathon prototype demonstrating end-to-end AI-powered startup validation.

---

## Key Features

| Feature | Description |
|---|---|
| 🔍 **Live Market Research** | Real-time Google Search results (Serper API) injected into LLM prompts — grounded in facts, not hallucinations |
| 🎯 **Competitor Analysis** | Automatic identification of direct/indirect competitors with strengths, weaknesses, and exploitable gaps |
| 🌐 **Zero-Shot Website Builder** | Gemini generates a fully responsive, industry-tailored Tailwind CSS landing page from scratch |
| 📣 **Marketing Kit** | Platform-specific posts (Instagram, LinkedIn, Twitter/X, Facebook) with hashtags and AI image prompts |
| 💰 **Funding Matcher** | Matches your business profile to VCs, grants, accelerators, and angel investors |
| 🔗 **Webhook Integrations** | Push website code to Zapier and marketing posts to n8n for autonomous deployment |
| ☁️ **Persistent Projects** | All outputs saved to Firebase Firestore — switch between projects instantly, no re-generation |
| 🤖 **Context-Aware Chatbot** | Floating AI assistant that knows your active project and can answer questions about its data |

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React 19 SPA (Vite)                       │
│          Tailwind CSS v4 + Framer Motion                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────▼────────────┐
          │   ProjectContext (State) │
          │   React Router v7       │
          └────────────┬────────────┘
                       │
     ┌─────────────────┼──────────────────┐
     │                 │                  │
┌────▼────┐     ┌──────▼──────┐    ┌─────▼──────┐
│ Groq AI │     │  Gemini AI  │    │  Firebase  │
│ Llama   │     │  (Website)  │    │ Firestore  │
│ 3.3 70B │     │             │    │            │
└────┬────┘     └──────┬──────┘    └────────────┘
     │                 │
┌────▼────────────────▼────┐
│     Serper API           │
│  (Live Google Search)    │
└──────────────────────────┘
```

### AI Orchestration Flow

```
User Idea Input
      ↓
Serper Web Search (live Google results for market data)
      ↓  ← results injected into LLM as "REAL-WORLD MARKET DATA"
Groq Llama 3.3 70B ── Market Research + Competitor Analysis
      ↓
Google Gemini ── Landing Page HTML/CSS Generation
      ↓
Groq Llama 3.3 70B ── Marketing Kit + Funding Matches
      ↓
Firebase Firestore ── Everything persisted per project
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 7, TypeScript 5 |
| **Styling & Animation** | Tailwind CSS v4, Framer Motion |
| **Routing** | React Router v7 |
| **State Management** | React Context API (`ProjectContext`) |
| **Database** | Firebase Firestore (NoSQL, real-time) |
| **Primary AI (Text)** | Groq — `llama-3.3-70b-versatile` |
| **Website Generation AI** | Google Gemini — `gemini-2.5-flash-preview` |
| **Web Intelligence** | Serper API (live Google Search results) |
| **Markdown Rendering** | React Markdown + Tailwind Typography |
| **Schema Validation** | Zod |
| **Icons** | Lucide React |

---

## Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- A **Groq API** key → [console.groq.com](https://console.groq.com)
- A **Google Gemini API** key → [aistudio.google.com](https://aistudio.google.com)
- A **Serper API** key → [serper.dev](https://serper.dev)
- A **Firebase** project with Firestore enabled → [console.firebase.google.com](https://console.firebase.google.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/karthikeyankoduri/waymaker-ai-business-builder.git
cd waymaker-ai-business-builder

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.local.example .env.local
# Edit .env.local with your API keys

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Groq — Market Research, Competitor Analysis, Marketing Kit, Funding
VITE_GROQ_API_KEY=your_groq_api_key_here

# Google Gemini — Website / Landing Page Generation
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Serper — Live Google Search (grounds AI in real data)
VITE_SERPER_API_KEY=your_serper_api_key_here

# Firebase — Persistent project storage
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Never commit `.env.local` to version control.** It is already listed in `.gitignore`.

---

## Project Structure

```
waymaker-ai-business-builder/
├── src/
│   ├── components/          # Reusable UI components (Sidebar, Chatbot, Cards, etc.)
│   ├── context/
│   │   └── ProjectContext.tsx  # Global state — active project, Firebase sync
│   ├── pages/
│   │   ├── Landing.tsx        # Public marketing page (/)
│   │   ├── Dashboard.tsx      # Main project dashboard (/dashboard)
│   │   ├── MyProjects.tsx     # Project management (/projects)
│   │   └── modules/           # Individual feature modules
│   │       ├── MarketResearch.tsx
│   │       ├── Competitors.tsx
│   │       ├── WebsiteBuilder.tsx
│   │       ├── MarketingKit.tsx
│   │       ├── FundingMatcher.tsx
│   │       └── Deployments.tsx
│   ├── services/
│   │   ├── ai.ts              # Groq + Gemini API integrations
│   │   ├── webSearchService.ts # Serper API live search
│   │   └── projectService.ts  # Firebase Firestore CRUD
│   ├── types/                 # TypeScript interfaces
│   ├── App.tsx                # Root component + routing
│   └── main.tsx               # Entry point
├── public/                    # Static assets
├── firebase.json              # Firebase hosting config
├── firestore.rules            # Firestore security rules
├── firestore.indexes.json     # Firestore composite indexes
├── DESIGN_BRIEF.md            # Full UI/UX design specification
└── package.json
```

---

## Screens & Modules

### 🏠 Landing Page (`/`)
Marketing entry point. Features a hero section, animated demo preview, feature cards, a 3-step "How it Works" section, and a prominent CTA.

### 📊 Dashboard (`/dashboard`)
The authenticated user's home. Has three states:
- **Empty:** Idea input form — business description, industry, target audience, location
- **Generating:** Live progress indicators with current AI step labels and a web search activity badge
- **Complete:** 6 module navigation cards for all generated assets

### 🔬 Market Research (`/dashboard/research`)
Visualizes scraped market intelligence:
- TAM / SAM / SOM nested bubble diagram + metric cards
- Competitive positioning 2×2 quadrant matrix
- Competitive landscape data table with key opportunity callout

### 🎯 Competitor Analysis (`/dashboard/competitors`)
Grid of competitor cards each showing strengths, weaknesses, and the specific market gap to exploit.

### 🌐 Website Builder (`/dashboard/website`)
- **Preview tab:** Live iframe rendering of the AI-generated landing page with device toggle (desktop/mobile)
- **Code tab:** Syntax-highlighted HTML with copy-to-clipboard and download button
- One-click "Send to Zapier" for auto-deployment

### 📣 Marketing Kit (`/dashboard/marketing`)
- Competitor intelligence panel (Instagram analytics: followers, engagement rate, content strategy)
- 4 social platform post cards (Instagram, LinkedIn, Twitter/X, Facebook)
- Per-post and bulk webhook dispatch to n8n

### 💰 Funding Matcher (`/dashboard/funding`)
Cards for matched funding opportunities: VCs, grants, accelerators, and angel investors — with match reasoning, eligibility, and amounts.

### 🔗 Deployments (`/dashboard/deployments`)
Configuration hub for webhook integrations — n8n (marketing) and Zapier (website code) endpoints, saved per project.

### 📁 My Projects (`/projects`)
Project management hub. Lists all created projects with completion indicators, tags, and instant project switching.

---

## Integrations

### n8n (Marketing Automation)
Configure an n8n webhook URL in the Deployments tab. Waymaker POSTs the full marketing kit payload (all platform posts, hashtags, image prompts) enabling autonomous multi-platform social media posting workflows.

### Zapier (Website Deployment)
Configure a Zapier webhook URL. Waymaker POSTs the generated HTML/CSS website code, enabling automated deployment to Netlify, GitHub Pages, or any hosting platform via Zapier's ecosystem.

### Webhook Payload Structure

**Marketing Kit payload:**
```json
{
  "projectName": "My Startup",
  "platform": "instagram",
  "content": "Post text here...",
  "hashtags": ["#startup", "#ai", "#saas"],
  "imagePrompt": "A modern minimalist tech illustration..."
}
```

**Website code payload:**
```json
{
  "projectName": "My Startup",
  "htmlCode": "<!DOCTYPE html>..."
}
```

---

## Roadmap

- [ ] 🔐 Firebase Authentication (Google Sign-In)
- [ ] 🤖 Agentic workflows with LangGraph / CrewAI (Researcher + Developer + Marketer agents)
- [ ] 🚀 1-click GitHub + Netlify auto-deployment from Website Builder
- [ ] 📊 Multi-query Serper research (competitor websites, investor databases, news)
- [ ] 🏷️ Tiered plan limits and model-agnostic LLM switching (Claude, OpenAI)
- [ ] 📱 Mobile-responsive layout improvements
- [ ] 🔔 Real-time project collaboration (shared Firestore documents)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Built with ❤️ using React, Groq, Gemini & Firebase

**[⭐ Star this repo if you found it useful!](https://github.com/karthikeyankoduri/waymaker-ai-business-builder)**

</div>
