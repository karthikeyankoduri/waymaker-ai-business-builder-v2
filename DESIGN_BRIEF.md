# Waymaker AI — Design Brief for Stitch UI Redesign

**App Type:** AI-powered SaaS dashboard (desktop-first, dark theme, data-heavy)
**Feel/Persona:** Think Linear meets Vercel meets Perplexity — premium, quiet confidence, purposeful density. Not flashy for its own sake. Every pixel earns its place.

---

## Design System Guidance

### Mood & Aesthetic
- **Dark, sophisticated** — near-black base backgrounds, not pure black
- **Controlled color accents** — one primary accent (brand-teal or indigo), one secondary (emerald or violet), muted everywhere else
- **Premium typography** — pair a serif (for display headings, numbers, key data points) with a clean geometric sans-serif (for UI labels, body, inputs)
- **Depth through layering** — use subtle frosted glass cards, inset shadows, and radial glow effects rather than flat cards
- **Data-forward** — charts, stats, tables should feel like professional financial or analytics dashboards, not startup toy UIs
- **Micro-animations** — entrance animations (fade-up, stagger), hover lifts, smooth tab transitions — nothing jarring

### Spacing Philosophy
Generous internal padding. Content should breathe. Never cramped.

---

## Application Architecture — Screens & Routes

The app has a **persistent sidebar** on the left and a **main content area** on the right. All modules are sub-routes of a project dashboard.

---

## Screen 1 — Public Landing / Hero Page

**Route:** `/`
**Purpose:** Marketing/auth entry point. Sells the product to first-time visitors.

**Content & Components:**
- Full-screen hero section with a bold headline ("Your Autonomous AI Co-Founder"), a short subheadline explaining the value prop in 1 sentence, and a single CTA button ("Launch Your Idea")
- A live animated "demo preview" element — could be a minimal mockup of the app UI animating through steps (market research → landing page → marketing posts)
- A section of 4–5 feature cards below the fold: Market Research, Website Builder, Marketing Kit, Funding Matcher, Integrations
- Trust/credibility strip (logos, badge, or "Built at a Hackathon" label)
- A "How it works" 3-step section: Input idea → AI orchestrates → Get your business kit

**Key UI elements:**
- Hero: Large display text, gradient text effect on the app name, ambient background glow (no busy particle effects)
- CTA Button: High-contrast, prominent, possibly animated border glow
- Feature cards: Icon + title + one-line description. Hover lift effect.
- Step flow: Numbered nodes connected by a dotted line or subtle connector

---

## Screen 2 — Project Creation / Dashboard Home

**Route:** `/dashboard`
**Purpose:** The first screen an authenticated user sees. Serves dual purpose: if no project is active, shows the idea input form; if a project is active, shows the project overview with module navigation cards.

### State A — "Ignite a New Project" Form (no active project)
**Components:**
- Page header: "Start Something New" or similar
- **Business Idea textarea** — large, primary input. Multi-line. Placeholder gives an imaginative example.
- **3-column input row** below: Industry (text input), Target Audience (text input), Location (text input) — all optional
- **Launch CTA button** — full-width or prominent, disabled until idea is filled
- Design note: This form should feel inspiring and frictionless, not bureaucratic. Consider a full-bleed background treatment or a floating card approach.

### State B — AI Orchestrator Running (loading state)
**Components:**
- Animated spinner or pulsing orb (avoid boring skeleton loaders)
- Title: "AI Orchestrator Running"
- Current step label (e.g., "Scraping live web data..." / "Analyzing competitors...")
- **Live web search badge:** A small animated pill badge that appears during Market Research step showing "✓ Web Search: 5 results fetched" — subtle emerald color
- Progress bar below, animating slowly to indicate work in progress

### State C — Project Overview (generation complete)
**Components:**
- Project header card: Shows project name, tags for industry/audience/location, and the original idea text in a subtle panel
- Re-generate button (if no research yet) or "View Full Plan" link
- **6 Module Navigation Cards** in a responsive grid (2x3 or 3x2):
  1. **Market Research** — chart/bar icon
  2. **Competitors** — target icon
  3. **Landing Page** — layout icon
  4. **Marketing Kit** — megaphone icon
  5. **Funding Matcher** — dollar/coin icon
  6. **Deployments** — settings/webhook icon
- Each card: Icon, Title, short description (1 line), hover state (slight lift + accent border glow)

---

## Screen 3 — Market Research Dashboard

**Route:** `/dashboard/research`
**Purpose:** Visualizes live-scraped market intelligence about the user's business idea. Data-heavy, analytical feel.

**Sections & Components:**

### Section A — Market Size (TAM / SAM / SOM)
- **Left panel:** Nested circle/bubble diagram showing TAM > SAM > SOM with dollar values. Each circle is a different shade of the accent color (outermost = most muted, innermost = most vivid). Interactive: hover reveals a tooltip with the label and description.
- **Right panel:** "Top-Down Approach" — an inverted funnel/pyramid with 3–4 tiers. Each tier shows a label (e.g., "Global HealthTech Market") and a dollar value. Tiers widen from top to bottom. Connected by thin lines.
- Below: 3 metric cards (TAM, SAM, SOM) — each shows value, label, and a one-sentence description.

### Section B — Competitive Positioning
- **Left: 2x2 Quadrant Matrix** — a clean, labeled axis grid. X-axis label pair (e.g., "Low Quality" ↔ "High Quality"), Y-axis label pair (e.g., "Low Price" ↔ "High Price"). 4 quadrant labels in corners. Competitor name badges plotted inside the quadrants as colored chips/tokens.
- **Right: Position Pyramid** — 3-tier pyramid (bottom = mass market, top = premium niche). Each tier is a colored horizontal slab with a label and brief descriptor. The topmost tier (where the user's brand sits) should be visually emphasized — brighter color, slight glow.

### Section C — Competitive Landscape Table
- A data table with rows = competitor brands, columns = attributes:
  - Brand name (bold, serif)
  - Funding Status (badge/tag)
  - Core Focus (text)
  - Consumer Friction (traffic-light colored tag — red = high friction, green = low)
  - Format & Storage (monospace text)
- Table footer: A highlighted "Key Opportunity" statement in an accent-colored callout box spanning full width.

---

## Screen 4 — Competitor Analysis

**Route:** `/dashboard/competitors`
**Purpose:** Dedicated view of competitors with strengths, weaknesses, and exploitable gaps.

**Components:**
- Page header with icon and title
- **Competitor cards** in a grid (2 or 3 per row). Each card:
  - Competitor name (large, bold)
  - Color-coded tag: category or niche
  - Two columns: "Strengths" list (green/positive accent, checkmark icons) and "Weaknesses" list (red/negative accent, warning icons)
  - "Gap to exploit" — a highlighted callout at the bottom of the card in a distinct accent color
  - Subtle hover state

---

## Screen 5 — Website Builder (Landing Page Preview)

**Route:** `/dashboard/website`
**Purpose:** Let the user preview the AI-generated landing page and access the raw HTML code.

**Components:**
- Page header + "Download HTML" button (top right)
- **Tab switcher:** "Preview" | "Code" — clean pill-style tab
- **Preview tab:** Full-width iframe rendering the generated HTML. The iframe should have a device frame option (desktop / mobile toggle). A "Regenerate" button to re-trigger Gemini. A "Send to Zapier" action button.
- **Code tab:** A syntax-highlighted code block showing the full HTML. A "Copy to Clipboard" button. Horizontal scrollable with line numbers.
- Empty state (not yet generated): Large centered icon, title "Landing page not generated yet", CTA linking back to the orchestrator.

---

## Screen 6 — Marketing Kit

**Route:** `/dashboard/marketing`
**Purpose:** Shows AI-generated social media posts per platform, with competitor intelligence context, and webhook dispatch controls.

**Sections & Components:**

### Section A — Competitor Intelligence Panel (above posts)
- A collapsible/expandable analytics panel
- "Fetch Competitor Analysis" button — primary action
- Loading state: spinner + "Scanning competitor profiles..."
- Result state: A grid of competitor analytics cards. Each card shows:
  - Competitor name + platform icon (Instagram logo)
  - Metrics row: Follower count, Following count, Post count, Engagement rate (displayed as stat chips)
  - Content strategy analysis: A multi-row breakdown (Content Mix %, Top performing topics, Posting frequency, Best performing format)
  - Weakness/opportunity highlight

### Section B — Platform Social Posts
- 4 post cards in a responsive grid (Instagram, LinkedIn, Twitter/X, Facebook)
- Each card:
  - Platform icon + name in the card header
  - Post text (copyable)
  - Hashtags listed as pill chips below the text
  - "Image Prompt" section (collapsible, shows AI prompt for generating a visual)
  - "Send to Webhook" button (per-post)
  - Loading/success/error state on the send button

### Section C — Webhook Controls
- A compact configuration bar at the bottom or in a sidebar panel
- Webhook URL input field
- "Save" button
- "Send All Posts" bulk action button with loading/success state

---

## Screen 7 — Funding Matcher

**Route:** `/dashboard/funding`
**Purpose:** Lists matched funding opportunities (grants, VCs, accelerators) relevant to the business idea.

**Components:**
- Page header + icon
- **Funding opportunity cards** in a list or grid. Each card:
  - Fund/Grant name (bold)
  - Type tag (e.g., "VC", "Grant", "Accelerator", "Angel")
  - Match reason or description paragraph
  - Eligibility criteria (bullet list)
  - Amount or range (if available) — displayed prominently as a stat
  - "Learn More" or external link button
- Empty/not-generated state: centered illustration prompt + link to regenerate

---

## Screen 8 — Deployments & Integrations

**Route:** `/dashboard/deployments`
**Purpose:** Configuration hub for webhook integrations. Allows the user to wire up n8n and Zapier endpoints.

**Components:**
- Page header: "Deployments & Integrations"
- **Integration cards** — one per service (n8n, Zapier). Each card:
  - Service logo/icon + name
  - Short description of what data flows to this endpoint
  - URL input field (text input, pre-filled if already saved)
  - "Test Connection" button (optional nice-to-have)
  - Save/confirm button with loading and success states
- Section divider between the two integration cards
- Footer note: "These settings are saved per-project."

---

## Screen 9 — My Projects

**Route:** `/projects`
**Purpose:** Project management hub. Lists all previously created projects.

**Components:**
- Page header: "My Projects" with a "New Project" CTA button
- **Project grid or list** — each project item:
  - Project name (bold)
  - Business idea excerpt (1 line, truncated)
  - Tags: Industry, Location, Audience (if set) — shown as small pills
  - Date created (relative: "3 days ago")
  - Completion indicators — small icon or colored dot showing which modules have been generated (market research ✓, competitors ✓, website ✓, etc.)
  - "Open Project" button or the whole card is clickable
  - "Delete" option (icon button, subtle, possibly on hover only)
- Empty state: "No projects yet" with a prominent CTA to create the first one

---

## Persistent Layout Components

### Sidebar (Left)
- App logo/wordmark at the top
- Navigation links for the current project's modules (only visible when a project is active):
  - Overview (home icon)
  - Market Research
  - Competitors
  - Landing Page
  - Marketing Kit
  - Funding Matcher
  - Deployments
- Divider
- Bottom links:
  - My Projects
  - Settings (API key input)
- Active state: highlighted link with accent left-border indicator
- Collapsed/icon-only mode on smaller screens

### Floating AI Chatbot
- A persistent floating action button in the bottom-right corner (chat bubble icon)
- Clicking expands an overlay chat panel (slide-in from bottom-right or bottom of screen)
- Chat panel:
  - Title: "Ask Waymaker AI"
  - Message history with user/AI bubbles (user = right-aligned, AI = left-aligned with avatar)
  - Text input + send button at the bottom
  - AI responses are streamed (typing indicator while waiting)
  - Context-aware: the chatbot knows which project is active and can answer questions about its data

### API Key Settings Modal / Panel
- Triggered from the Sidebar bottom link "Settings"
- Shows a modal or slide-over panel
- Groq API key input field (password type, with show/hide toggle)
- Description: "Used for market research, competitor analysis, marketing kit, and funding matching"
- Save button
- Validation: Shows error if key is invalid

---

## Key Interaction Patterns

| Pattern | Description |
|---|---|
| **Empty state → Generate** | Every module that has no data shows a consistent empty state with icon, title, message, and a "Go to Overview" CTA |
| **Loading state** | Spinner + current action label. Never a blank screen during AI calls |
| **Success badge** | After any generation, a toast notification appears (top-right, auto-dismiss in 3s) |
| **Copy to clipboard** | Code blocks, post text, and hashtags have a copy icon that animates to a checkmark on click |
| **Per-post webhook send** | Each social post card has its own send button that shows loading → success/error independently |
| **Bulk send** | A single action button sends all posts to the webhook simultaneously |
| **Project switching** | Clicking a project in "My Projects" switches the active project and loads all its saved data instantly from Firebase — no re-generation |

---

## Data Types (for reference when designing data display)

### Project
```
name, idea, industry, targetAudience, location,
marketResearch (JSON string), competitors (array),
websiteCode (HTML string), marketingKit (array),
fundingOpportunities (array), competitorAnalytics (array),
webhookUrl, zapierWebhookUrl, createdAt
```

### Competitor
```
name, strengths[], weaknesses[], gap
```

### Marketing Post
```
platform, content, hashtags[], imagePrompt
```

### Funding Opportunity
```
name, type, amount, description, eligibility[], url
```

### Competitor Analytics (Instagram)
```
name, followers, following, posts, engagementRate,
contentMix, topTopics, postingFrequency, bestFormat, weakness
```
