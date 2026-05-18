# 🎓 AI-Based Student Dropout Prediction & Hybrid Counselling System
## Detailed Architecture Document

**Project:** Intelligent AI-Based Student Dropout Prediction and Hybrid Counselling System  
**Institution:** Matrusri Engineering College, Hyderabad  
**Department:** Computer Science and Engineering  
**Date:** March 2026

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Layered Architecture Breakdown](#3-layered-architecture-breakdown)
4. [Module-wise Architecture](#4-module-wise-architecture)
   - 4.1 Data Ingestion & Storage Layer
   - 4.2 Machine Learning Prediction Engine
   - 4.3 AI Counselling Assistant
   - 4.4 Performance Monitoring & Alerts
   - 4.5 Frontend Web Application
5. [Data Flow Diagram](#5-data-flow-diagram)
6. [User Interaction Flows](#6-user-interaction-flows)
7. [Database Schema Overview](#7-database-schema-overview)
8. [Technology Stack Mapping](#8-technology-stack-mapping)
9. [Deployment Architecture](#9-deployment-architecture)
10. [Security Considerations](#10-security-considerations)

---

## 1. System Overview

The system is a **full-stack AI-powered platform** that:
- **Predicts** student dropout risk using advanced ML models
- **Counsels** students through an AI chatbot with emotion/sentiment analysis
- **Recommends** study plans, resources, and scholarships
- **Alerts** parents, teachers, and students via WhatsApp & email
- **Monitors** academic performance continuously

The system serves **three types of users**:

| User Role | Description |
|-----------|-------------|
| **Student** | Interacts with chatbot, views study plans, receives alerts |
| **Teacher / Counsellor** | Views risk dashboards, receives high-risk flags, schedules sessions |
| **Administrator** | Manages datasets, model retraining, system settings |

---

## 2. High-Level Architecture

```mermaid
graph TB
    subgraph Users["👥 Users"]
        S[🎓 Student]
        T[👩‍🏫 Teacher / Counsellor]
        A[🛡️ Administrator]
    end

    subgraph Frontend["🖥️ Frontend Layer (React + Vite + Tailwind CSS)"]
        SD[Student Dashboard]
        TD[Teacher Dashboard]
        AD[Admin Panel]
        CB[AI Chatbot UI]
    end

    subgraph Backend["⚙️ Backend Layer (Python / FastAPI)"]
        AUTH[Authentication Service]
        PRED[Dropout Prediction Service]
        COUNS[Counselling Service]
        PERF[Performance Monitoring Service]
        ALERT[Alert & Notification Service]
        SCRAPE[Resource Scraper Service]
    end

    subgraph ML["🤖 ML Engine"]
        LR[Logistic Regression]
        RF[Random Forest]
        ANN[Neural Network]
        XGB[XGBoost / LightGBM]
        ENS[Ensemble Model]
    end

    subgraph AI["🧠 AI / NLP Layer"]
        GEMINI[Gemini LLM - Google GenAI]
        SENT[Sentiment Analyzer]
        EMOT[Emotion Detector]
        PLAN[Study Plan Generator]
    end

    subgraph DB["🗄️ Database (Supabase / PostgreSQL)"]
        SDATA[Student Data]
        MDATA[Model Results]
        CHAT[Chat History]
        NOTIF[Notification Logs]
    end

    subgraph Notify["📨 Notification Layer"]
        WA[WhatsApp - Twilio API]
        EMAIL[Email - SMTP]
    end

    subgraph External["🌐 External Sources"]
        WEBSC[Web Scraper - BeautifulSoup]
        SCHOL[Scholarship Portals]
        RES[Learning Resources]
    end

    S --> SD
    T --> TD
    A --> AD
    S --> CB

    SD --> AUTH
    TD --> AUTH
    AD --> AUTH
    CB --> COUNS

    AUTH --> Backend
    PRED --> ML
    COUNS --> AI
    PERF --> PRED
    ALERT --> Notify
    SCRAPE --> External

    ML --> ENS
    ENS --> MDATA
    AI --> GEMINI
    GEMINI --> SENT
    GEMINI --> EMOT
    GEMINI --> PLAN

    Backend --> DB
    DB --> Backend
```

---

## 3. Layered Architecture Breakdown

The system follows a **5-layer architecture**:

```mermaid
graph LR
    L1["🖥️ Layer 1\nPresentation Layer\n(React, Tailwind, Framer Motion)"]
    L2["🔀 Layer 2\nApplication / API Layer\n(FastAPI / Python)"]
    L3["🤖 Layer 3\nML & AI Intelligence Layer\n(Scikit-learn, XGBoost, Gemini LLM)"]
    L4["🗄️ Layer 4\nData Layer\n(Supabase / PostgreSQL)"]
    L5["📨 Layer 5\nIntegration / Notification Layer\n(Twilio, SMTP, BeautifulSoup)"]

    L1 <--> L2
    L2 <--> L3
    L2 <--> L4
    L2 <--> L5
    L3 <--> L4
```

| Layer | Responsibility |
|-------|---------------|
| **Presentation** | UI for students, teachers, admins; chatbot interface |
| **Application/API** | Business logic, routing, REST API endpoints |
| **ML & AI** | Dropout prediction models, sentiment/emotion analysis, generative AI counselling |
| **Data** | Persistent storage of student records, model outputs, chat logs |
| **Integration** | External APIs — WhatsApp, Email, Web Scraping |

---

## 4. Module-wise Architecture

### 4.1 Data Ingestion & Storage Layer

This module handles all incoming student data, cleans it, and stores it for ML training and real-time prediction.

```mermaid
flowchart TD
    RAW["📂 Raw Data Sources"]
    A1[Academic Records\nMarks, Attendance, Backlog]
    A2[Demographic Data\nAge, Gender, Location]
    A3[Financial Data\nFee Payment, Scholarships]
    A4[Behavioural Data\nLibrary Usage, Participation]
    A5[Psychological Data\nSurveys, Chatbot Responses]

    PIPE["🔧 Data Pipeline"]
    CLEAN[Data Cleaning & Validation]
    FEAT[Feature Engineering]
    NORM[Normalization / Encoding]
    STORE["🗄️ Supabase Database"]
    TRAIN[Training Dataset]
    LIVE[Live Student Records]

    RAW --> A1 & A2 & A3 & A4 & A5
    A1 & A2 & A3 & A4 & A5 --> PIPE
    PIPE --> CLEAN --> FEAT --> NORM
    NORM --> STORE
    STORE --> TRAIN
    STORE --> LIVE
```

**Key Features:**
- Handles structured (CSV/DB) and unstructured (chatbot transcripts) data
- Feature engineering adds 15+ features beyond what the existing system used
- All data is stored securely in **Supabase (PostgreSQL)**

---

### 4.2 Machine Learning Prediction Engine

The core prediction engine, trained on enhanced datasets with improved accuracy.

```mermaid
flowchart TD
    subgraph Training["🏋️ Model Training Phase"]
        DS[Dataset from Supabase]
        SPLIT[Train / Test Split 80:20]
        LR[Logistic Regression]
        RF[Random Forest]
        ANN[Artificial Neural Network\nTensorFlow / PyTorch]
        XGB[XGBoost / LightGBM]
        EVAL[Model Evaluation\nAccuracy, F1, ROC-AUC]
        ENS[Ensemble / Best Model Selection]
        SAVE[Save Model - Pickle / ONNX]
    end

    subgraph Prediction["🔮 Real-Time Prediction Phase"]
        SINPUT[Student Input Data]
        LOAD[Load Trained Model]
        PREPROCESS[Preprocess & Transform]
        PREDICT[Predict Dropout Risk]
        CLASS["Classify:\n🟢 Safe\n🟡 At-Risk\n🔴 High-Risk"]
        STORE2[Store Result in Supabase]
    end

    DS --> SPLIT --> LR & RF & ANN & XGB
    LR & RF & ANN & XGB --> EVAL --> ENS --> SAVE
    SINPUT --> LOAD --> PREPROCESS --> PREDICT --> CLASS --> STORE2
```

**Model Features Used (30+ features):**

| Category | Features |
|----------|---------|
| Academic | Attendance %, Internal Marks, Backlogs, GPA Trend |
| Behavioural | Library visits, Lab hours, Club participation |
| Socio-Economic | Family income, Fee payment status, Part-time job |
| Psychological | Survey scores, Chatbot sentiment scores |
| Demographic | Age, Gender, Distance from college, First-gen student |

**Target Accuracy:** > 90% (vs. 85% in existing system)

---

### 4.3 AI Counselling Assistant

This is the most novel module — an intelligent chatbot integrated with Gemini LLM.

```mermaid
flowchart TD
    subgraph Chat["💬 AI Chatbot Engine"]
        SINPUT[Student Message]
        GEMINI["🧠 Gemini LLM\nGoogle GenAI"]
        SENT["😐 Sentiment Analysis\nPositive / Negative / Neutral"]
        EMOT["😢 Emotion Detection\nAnxious / Stressed / Motivated / Confused"]
        CONTEXT[Maintain Chat Context\nConversation History]
    end

    subgraph Response["📋 AI Response Generation"]
        COUNSEL[Counselling Response]
        STUDYPLAN["📅 Personalized Study Plan\nBased on weak subjects + timeline"]
        RESOURCES["📚 Learning Resources\nYouTube, NPTEL, Coursera links"]
        SCHOLAR["💰 Scholarship Suggestions\nScraped from portals"]
        HUMAN["🚨 Flag for Human Intervention\n(High-Risk Students)"]
    end

    SINPUT --> GEMINI
    GEMINI --> SENT & EMOT & CONTEXT
    SENT --> COUNSEL
    EMOT --> COUNSEL
    CONTEXT --> GEMINI

    COUNSEL --> STUDYPLAN & RESOURCES & SCHOLAR & HUMAN
```

**Counselling Logic:**

```mermaid
flowchart LR
    RISK[Student Risk Level]
    SAFE["🟢 Safe\n→ Motivational messages\n→ Preventive study tips"]
    ATRISK["🟡 At-Risk\n→ Study plan generation\n→ Resource recommendations\n→ Regular check-ins"]
    HIGHRISK["🔴 High-Risk\n→ Immediate human counsellor flag\n→ Emergency scholarship search\n→ Parent notification"]

    RISK --> SAFE & ATRISK & HIGHRISK
```

---

### 4.4 Performance Monitoring & Alerts Module

```mermaid
flowchart TD
    SCHEDULER["⏰ Scheduled Job\n(Daily / Weekly)"]
    FETCH[Fetch Latest Student Data from Supabase]
    ANALYZE[Re-run Prediction Model]
    COMPARE[Compare with Previous Risk Score]
    TREND[Performance Trend Analysis\nImproving / Declining / Stable]

    subgraph Alerts["📨 Alert System"]
        WA["WhatsApp\n(Twilio API)\nFor Students & Parents"]
        EMAIL["Email\n(SMTP)\nFor Teachers & Admin"]
        DASH[Dashboard Notification\nReal-Time UI Update]
    end

    SCHEDULER --> FETCH --> ANALYZE --> COMPARE --> TREND
    TREND -->|Declining / High-Risk Detected| WA & EMAIL & DASH
    TREND -->|Improving| DASH
```

**Alert Triggers:**

| Condition | Alert Target | Channel |
|-----------|-------------|---------|
| At-Risk detected | Student, Parent | WhatsApp + Email |
| High-Risk detected | Teacher, Counsellor | Email + Dashboard |
| Missed reminder | Student | WhatsApp |
| Exam approaching | Student | WhatsApp |
| Fee due | Student, Parent | Email |

---

### 4.5 Frontend Web Application

```mermaid
flowchart TD
    subgraph React["⚛️ React (v19) + Vite + Tailwind CSS v4"]
        ROUTER[React Router v7\nPage Routing]

        subgraph Pages["Pages"]
            LOGIN[Login / Register Page]
            SDASH[Student Dashboard]
            TDASH[Teacher Dashboard]
            ADMIN[Admin Panel]
            CHATPAGE[AI Chatbot Page]
            PROFILE[Student Profile]
            REPORT[Performance Reports]
        end

        subgraph Comp["Shared Components"]
            NAV[Navigation Bar]
            RISKCARD[Risk Badge Component]
            CHARTCOMP[Charts - Recharts / Chart.js]
            MODAL[Modal Dialogs]
            TOAST[Toast Notifications]
        end

        MOTION[Framer Motion\nPage & Component Animations]
        ICONS[Lucide React Icons]
    end

    ROUTER --> Pages
    Pages --> Comp
    Comp --> MOTION & ICONS
```

---

## 5. Data Flow Diagram

### Level 0 — Context Diagram

```mermaid
flowchart LR
    ST[🎓 Student] -->|Login, Chat, View Plans| SYS["🏫 Dropout Prediction\n& Counselling System"]
    TC[👩‍🏫 Teacher] -->|View Dashboards, Schedule Sessions| SYS
    AD[🛡️ Admin] -->|Manage Data, Retrain Models| SYS
    SYS -->|Risk Reports, Study Plans, Alerts| ST
    SYS -->|At-Risk Flags, Session Alerts| TC
    SYS -->|Model Accuracy Reports| AD
    SYS -->|Notifications| WA["📱 WhatsApp"]
    SYS -->|Alerts| EM["📧 Email"]
    SYS -->|Queries| GEMINI["🧠 Gemini API"]
```

### Level 1 — Functional Data Flow

```mermaid
flowchart TD
    D1["📂 Student Records\n(Academic, Financial, Behavioural)"]
    P1["1.0\nData Ingestion\n& Preprocessing"]
    D2["🗄️ Cleaned Dataset\n(Supabase)"]
    P2["2.0\nML Dropout\nPrediction Engine"]
    D3["📊 Risk Scores\n& Classifications"]
    P3["3.0\nAI Counselling\n& Support"]
    D4["💬 Chat Logs\n& Recommendations"]
    P4["4.0\nPerformance\nMonitoring"]
    P5["5.0\nAlert\nDispatcher"]
    D5["📨 Notifications Sent"]

    D1 --> P1 --> D2 --> P2 --> D3
    D3 --> P3 --> D4
    D3 --> P4 --> P5 --> D5
    D4 --> P4
```

---

## 6. User Interaction Flows

### Student Flow

```mermaid
sequenceDiagram
    actor Student
    participant Frontend as React Frontend
    participant API as FastAPI Backend
    participant ML as ML Engine
    participant AI as Gemini LLM
    participant DB as Supabase DB
    participant Notif as Notification Service

    Student->>Frontend: Login
    Frontend->>API: Authenticate
    API->>DB: Verify credentials
    DB-->>API: User data
    API-->>Frontend: Auth Token + Dashboard Data

    Student->>Frontend: View Risk Status
    Frontend->>API: GET /student/risk
    API->>ML: Run prediction on latest data
    ML-->>API: Risk score + classification
    API->>DB: Save result
    API-->>Frontend: 🟡 At-Risk

    Student->>Frontend: Open AI Chatbot
    Student->>Frontend: Type message
    Frontend->>API: POST /chat/message
    API->>AI: Send message + student context
    AI-->>API: Response + sentiment + study plan
    API->>DB: Save chat log
    API-->>Frontend: Display response + study plan

    API->>Notif: Trigger WhatsApp alert (At-Risk)
    Notif-->>Student: 📱 WhatsApp message
```

### Teacher Flow

```mermaid
sequenceDiagram
    actor Teacher
    participant Frontend as React Frontend
    participant API as FastAPI Backend
    participant DB as Supabase DB

    Teacher->>Frontend: Login to Teacher Dashboard
    Frontend->>API: GET /teacher/dashboard
    API->>DB: Fetch all students' risk levels
    DB-->>API: Risk data
    API-->>Frontend: Display list: Safe / At-Risk / High-Risk

    Teacher->>Frontend: Click High-Risk Student
    Frontend->>API: GET /student/{id}/details
    API->>DB: Load student profile, risk history, chat logs
    DB-->>API: Full student data
    API-->>Frontend: Show detailed report

    Teacher->>Frontend: Schedule Counselling Session
    Frontend->>API: POST /session/schedule
    API->>DB: Save session
    API-->>Teacher: Confirmation
```

---

## 7. Database Schema Overview

```mermaid
erDiagram
    STUDENTS {
        uuid id PK
        string name
        string email
        string phone
        int age
        string gender
        string department
        int year_of_study
        float family_income
        bool fee_paid
        timestamp created_at
    }

    ACADEMIC_RECORDS {
        uuid id PK
        uuid student_id FK
        float attendance_pct
        float internal_marks_avg
        int backlogs
        float gpa
        int semester
        timestamp recorded_at
    }

    BEHAVIOURAL_DATA {
        uuid id PK
        uuid student_id FK
        int library_visits
        int lab_hours
        int club_participation
        timestamp recorded_at
    }

    RISK_PREDICTIONS {
        uuid id PK
        uuid student_id FK
        float risk_score
        string risk_label
        string model_used
        timestamp predicted_at
    }

    CHAT_SESSIONS {
        uuid id PK
        uuid student_id FK
        text message
        text response
        string sentiment
        string emotion
        timestamp sent_at
    }

    STUDY_PLANS {
        uuid id PK
        uuid student_id FK
        text plan_content
        string subjects_focused
        timestamp generated_at
    }

    NOTIFICATIONS {
        uuid id PK
        uuid student_id FK
        string type
        string channel
        string status
        timestamp sent_at
    }

    COUNSELLING_SESSIONS {
        uuid id PK
        uuid student_id FK
        uuid teacher_id FK
        timestamp scheduled_at
        string status
        text notes
    }

    STUDENTS ||--o{ ACADEMIC_RECORDS : has
    STUDENTS ||--o{ BEHAVIOURAL_DATA : has
    STUDENTS ||--o{ RISK_PREDICTIONS : receives
    STUDENTS ||--o{ CHAT_SESSIONS : participates_in
    STUDENTS ||--o{ STUDY_PLANS : given
    STUDENTS ||--o{ NOTIFICATIONS : receives
    STUDENTS ||--o{ COUNSELLING_SESSIONS : attends
```

---

## 8. Technology Stack Mapping

```mermaid
graph TD
    subgraph Frontend["🖥️ Frontend"]
        R[React v19]
        V[Vite - Build Tool]
        TW[Tailwind CSS v4]
        RR[React Router v7]
        FM[Framer Motion - Animations]
        LR[Lucide React - Icons]
        TS[TypeScript]
    end

    subgraph Backend["⚙️ Backend"]
        PY[Python 3.11+]
        FA[FastAPI - REST API]
        UV[Uvicorn - ASGI Server]
    end

    subgraph ML["🤖 ML & AI"]
        SK[Scikit-learn - LR, RF]
        XG[XGBoost / LightGBM]
        TF[TensorFlow / PyTorch - ANN]
        NP[NumPy + Pandas - Data Processing]
        GEM[Gemini LLM - Google GenAI]
    end

    subgraph DB["🗄️ Database"]
        SB[Supabase]
        PG[PostgreSQL - Under the hood]
    end

    subgraph Integrations["📨 Integrations"]
        TW2[Twilio API - WhatsApp]
        SMTP[SMTP - Email]
        BS[BeautifulSoup / Scrapy - Web Scraping]
    end

    Frontend <-->|REST API / JSON| Backend
    Backend <--> ML
    Backend <--> DB
    Backend <--> Integrations
    ML <--> DB
```

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React v19 + Vite | UI framework + build tool |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Routing | React Router v7 | Client-side navigation |
| Animation | Framer Motion | Page/component animations |
| Icons | Lucide React | Icon library |
| Language | TypeScript | Type-safe JavaScript |
| Backend | FastAPI (Python) | REST API server |
| ML | Scikit-learn, XGBoost, TensorFlow | Dropout prediction models |
| NLP/AI | Gemini LLM | Chatbot & sentiment analysis |
| Data | NumPy, Pandas | Data preprocessing |
| Database | Supabase (PostgreSQL) | Data persistence |
| WhatsApp | Twilio API | Real-time messaging |
| Email | SMTP | Automated email alerts |
| Scraping | BeautifulSoup | Scholarship/resource discovery |

---

## 9. Deployment Architecture

```mermaid
flowchart TD
    subgraph Client["💻 Client Browser"]
        UI[React App - Served via Vercel / Netlify]
    end

    subgraph Server["☁️ Cloud Server - AWS / GCP / Railway"]
        API[FastAPI Backend]
        ML[ML Model Server]
        SCHED[Celery Scheduler\nFor periodic monitoring]
    end

    subgraph Services["🌐 External Services"]
        SB[Supabase - Database & Auth]
        GEMINI[Google GenAI - Gemini API]
        TWILIO[Twilio - WhatsApp]
        SMTP[SMTP Server - Email]
    end

    Client -->|HTTPS REST| API
    API --> ML
    API --> SCHED
    API <-->|SQL over HTTPS| SB
    API --> GEMINI
    SCHED --> TWILIO
    SCHED --> SMTP
```

---

## 10. Security Considerations

| Concern | Approach |
|---------|---------|
| Authentication | Supabase Auth (JWT tokens) |
| Authorization | Role-based access (Student / Teacher / Admin) |
| Data Privacy | Encrypted student data at rest in Supabase |
| API Security | API key management for Gemini, Twilio, SMTP |
| HTTPS | All client-server communication over HTTPS |
| Input Validation | FastAPI Pydantic models for request validation |
| Secrets Management | Environment variables (.env), never hardcoded |

---

## Summary: System Architecture at a Glance

```mermaid
graph TB
    subgraph INPUT["📥 Input Sources"]
        SD["Student Data\n(Academic, Financial,\nBehavioural, Psychological)"]
    end

    subgraph PROCESS["🔄 Processing Core"]
        P1["Step 1\nData Ingestion\n& Feature Engineering"]
        P2["Step 2\nML Prediction\n(XGBoost + Ensemble)"]
        P3["Step 3\nRisk Classification\n(Safe / At-Risk / High-Risk)"]
        P4["Step 4\nAI Counselling\n(Gemini LLM)"]
        P5["Step 5\nStudy Plan &\nResource Recommendation"]
        P6["Step 6\nAlert Dispatch\n(WhatsApp + Email)"]
    end

    subgraph OUTPUT["📤 Outputs"]
        O1["📊 Risk Dashboard"]
        O2["💬 Chatbot Response"]
        O3["📅 Personalized Study Plan"]
        O4["💰 Scholarship Suggestions"]
        O5["📱 WhatsApp Alert"]
        O6["📧 Email Notification"]
        O7["🚨 Human Counsellor Flag"]
    end

    SD --> P1 --> P2 --> P3
    P3 --> P4 --> P5
    P3 --> P6
    P5 --> O3 & O4
    P4 --> O2
    P3 --> O1
    P6 --> O5 & O6
    P3 -->|High-Risk| O7
```

---

> [!IMPORTANT]
> **For Mini Project Scope:** You don't need to implement ALL modules fully. Prioritize: (1) ML Prediction Engine, (2) AI Chatbot via Gemini API, (3) React Dashboard, (4) Supabase Database. Email/WhatsApp and web scraping can be demonstrated as simulated features if needed.

> [!TIP]
> **Suggested Development Order:**
> 1. Set up Supabase database and schema
> 2. Build and train ML models (Python notebooks first)
> 3. Create FastAPI backend with prediction endpoints
> 4. Integrate Gemini LLM for chatbot
> 5. Build React frontend (Dashboard + Chatbot UI)
> 6. Add WhatsApp/Email alerts last

> [!NOTE]
> This architecture is designed to be **modular** — each component (ML engine, chatbot, alerts) can be developed and tested independently before integration, which is ideal for a team-based mini project.
