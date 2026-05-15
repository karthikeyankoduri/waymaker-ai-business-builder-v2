import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Project, Competitor, MarketingPost, FundingOpportunity, ChatMessage } from '../types';
import { fetchRealWorldContext } from './webSearchService';

// ─────────────────────────────────────────────────────────────────────────────
// Groq API client
// Model: llama-3.1-8b-instant  (generation)
// Guard: llama-guard-3-8b       (content safety screening)
// ─────────────────────────────────────────────────────────────────────────────

const GENERATION_MODEL = 'llama-3.3-70b-versatile';
const GUARD_MODEL = 'llama-guard-3-8b';

let groqClient: Groq | null = null;
let currentApiKey: string | null = null;

const getGroqClient = (apiKey: string): Groq => {
    if (!groqClient || currentApiKey !== apiKey) {
        groqClient = new Groq({ apiKey, dangerouslyAllowBrowser: true });
        currentApiKey = apiKey;
    }
    return groqClient;
};

// ── Core Groq chat completion helper ─────────────────────────────────────────
const groqChat = async (
    apiKey: string,
    messages: Groq.Chat.ChatCompletionMessageParam[],
    options: { temperature?: number; max_tokens?: number; top_p?: number } = {}
): Promise<string> => {
    const client = getGroqClient(apiKey);
    const completion = await client.chat.completions.create({
        model: GENERATION_MODEL,
        messages,
        temperature: options.temperature ?? 1,
        max_completion_tokens: options.max_tokens ?? 4096,
        top_p: options.top_p ?? 1,
        stream: false,
        stop: null,
    });
    return completion.choices[0]?.message?.content ?? '';
};

// ── llama-guard-3-8b safety check ────────────────────────────────────────────
// Returns true if content is SAFE, false if UNSAFE.
const guardCheck = async (apiKey: string, content: string): Promise<boolean> => {
    try {
        const client = getGroqClient(apiKey);
        const completion = await client.chat.completions.create({
            model: GUARD_MODEL,
            messages: [{ role: 'user', content }],
            max_completion_tokens: 10,
            stream: false,
        });
        const verdict = completion.choices[0]?.message?.content ?? 'safe';
        return verdict.toLowerCase().startsWith('safe');
    } catch {
        return true; // fail open — don't block on guard errors
    }
};

// ── Shared error handler ──────────────────────────────────────────────────────
const handleAIError = (error: any) => {
    console.error('AI Generation Error: ', error);
    throw new Error(error.message || 'Failed to generate AI data.');
};

// ── JSON extraction helper (strips accidental markdown fences & text) ───────────
const extractJSON = (raw: string): string => {
    let cleaned = raw.trim();
    const match = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (match) {
        return match[1].trim();
    }
    const firstBrace = cleaned.indexOf('{');
    const firstBracket = cleaned.indexOf('[');
    const lastBrace = cleaned.lastIndexOf('}');
    const lastBracket = cleaned.lastIndexOf(']');
    
    let startIndex = -1;
    let endIndex = -1;
    
    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
        startIndex = firstBrace;
        endIndex = lastBrace;
    } else if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
        startIndex = firstBracket;
        endIndex = lastBracket;
    }
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
        return cleaned.substring(startIndex, endIndex + 1);
    }
    return cleaned;
};



// ─────────────────────────────────────────────────────────────────────────────
// EXPORTED FUNCTIONS — identical signatures as before
// ─────────────────────────────────────────────────────────────────────────────

export const generateMarketResearch = async (apiKey: string, project: Project, instruction?: string) => {
    try {
        const realWorldContext = await fetchRealWorldContext(project.idea, project.industry);

        const prompt = `Act as a top-tier startup consultant. Generate a highly detailed, data-driven market research dashboard for this business idea.
Idea: ${project.idea}
${project.industry ? `Industry: ${project.industry}` : ''}
${project.targetAudience ? `Target Audience: ${project.targetAudience}` : ''}
${project.location ? `Location: ${project.location}` : ''}${realWorldContext}
${instruction ? `\nUSER INSTRUCTION / TWEAK: ${instruction}\nPlease strictly incorporate this instruction into the market research.` : ''}

CRITICAL: Return ONLY a valid JSON object. Do not wrap in markdown blocks. Schema:
{
  "marketAnalysis": {
    "tam": { "value": "$XXB", "label": "Total Addressable Market", "description": "Short explanation of this market (e.g. Global Tech)" },
    "sam": { "value": "$XXM", "label": "Serviceable Addressable Market", "description": "Short explanation of SAM (e.g. US B2B Software)" },
    "som": { "value": "$XXM", "label": "Serviceable Obtainable Market", "description": "Short explanation of SOM (e.g. Projected year 3 capture)" },
    "topDownApproach": [
      { "label": "Global/National Market", "value": "$XXB" },
      { "label": "Segment Market", "value": "$XXB" },
      { "label": "Niche Market", "value": "$XXM" },
      { "label": "Direct Addressable", "value": "$XXM" }
    ]
  },
  "positionInMarket": {
    "xAxis": { "left": "Low Quality", "right": "High Quality" },
    "yAxis": { "top": "High Price", "bottom": "Low Price" },
    "pyramid": [
      { "level": "Top Product", "description": "High Value, Convenient" },
      { "level": "Alternatives", "description": "Convenient but Flawed" },
      { "level": "Raw Forms", "description": "Natural but Inconvenient" }
    ],
    "quadrants": {
      "topLeft": { "name": "Cowboy / Overpriced", "competitors": ["Comp A"] },
      "topRight": { "name": "Premium Products", "competitors": ["Our Brand", "Comp B"] },
      "bottomLeft": { "name": "Economy Products", "competitors": ["Comp C"] },
      "bottomRight": { "name": "Bargain / Value", "competitors": ["Comp D"] }
    }
  },
  "competitiveLandscape": [
    { 
      "brand": "Competitor 1", 
      "fundingStatus": "Corporate Backed", 
      "coreFocus": "Frozen Snacks", 
      "consumerFriction": "High (Fry / Heat)", 
      "formatAndStorage": "-18°C" 
    }
  ],
  "keyOpportunities": ["Actionable clear opportunity 1", "Opportunity 2"]
}`;

        const text = await groqChat(apiKey, [
            { role: 'system', content: 'You are a top-tier startup consultant. Always respond with raw JSON only, no markdown fences.' },
            { role: 'user', content: prompt }
        ]);
        return extractJSON(text);
    } catch (error) {
        return handleAIError(error);
    }
};

export const generateCompetitors = async (apiKey: string, project: Project): Promise<Competitor[]> => {
    try {
        const prompt = `Act as an expert business consultant. Identify 5 potential competitors (real or hypothetical if highly niche) for this business idea.
Idea: ${project.idea}
${project.industry ? `Industry: ${project.industry}` : ''}
${project.targetAudience ? `Target Audience: ${project.targetAudience}` : ''}
${project.location ? `Location: ${project.location}` : ''}

Return ONLY a JSON array of objects. DO NOT wrap with markdown code blocks. Schema:
[
  { "name": "Competitor Name", "strengths": ["s1", "s2"], "weaknesses": ["w1", "w2"], "gap": "Market gap we can exploit" }
]`;

        const text = await groqChat(apiKey, [
            { role: 'system', content: 'You are an expert business consultant. Always respond with raw JSON only, no markdown fences.' },
            { role: 'user', content: prompt }
        ]);
        return JSON.parse(extractJSON(text) || '[]');
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const generateWebsiteCode = async (apiKey: string, project: Project, instruction?: string) => {
    try {
        const prompt = `Act as an award-winning Elite UX/UI Designer and Frontend Architect. Design a highly converting, breathtaking, completely unique single-page landing page for this business using HTML5 and Tailwind CSS (via CDN).

Idea: ${project.idea}
${project.industry ? `Industry: ${project.industry}` : ''}
${project.location ? `Location: ${project.location}` : ''}

CRITICAL INSTRUCTIONS TO AVOID GENERIC DESIGNS:
1. **AUTHENTICITY & DIVERSITY:** Do NOT use the exact same hero -> features -> CTA layout for every request. Tailor the exact structure, mood, and color palette to the SPECIFIC industry and idea. An AI tech startup should look dark, sleek, and neon. A health clinic should look light, airy, and trustworthy.
2. **PREMIUM AESTHETICS:** Use high-end modern design trends. Use varied border radiuses (e.g. asymmetrical cards), glassmorphism where it makes sense (backdrop-blur), rich tailored gradients (e.g. \`bg-gradient-to-br from-indigo-900 via-purple-900 to-black\`), and precise spacing (\`gap-8\`, \`py-24\`).
3. **TYPOGRAPHY:** Use appropriate Google Fonts pairings (e.g., 'Playfair Display' & 'Inter' for luxury, 'Outfit' for tech, 'Plus Jakarta Sans' for SaaS).
4. **RICH COMPONENTS:** Build complex UI elements like bento grids for features, floating statistic cards overlaying the hero section, interactive pricing toggles, or beautifully styled customer testimonial carousels. Use SVG paths or Lucide-like icons natively inline.
5. **ANIMATIONS:** Add subtle but impactful hover and entrance animations (\`hover:-translate-y-2\`, \`transition-all duration-500\`, \`hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]\`).
6. **IMAGES:** Provide extremely relevant, high-quality Unsplash source URLs for background and placeholder images matching the vibe. Use object-cover for all images.
7. **OUTPUT REQUIREMENT:** Return ONLY valid, self-contained HTML starting with <!DOCTYPE html>. Include the Tailwind CDN <script src="https://cdn.tailwindcss.com"></script>. DO NOT wrap the output in markdown code blocks (\`\`\`html) or include any conversational text. NEVER output "Here is your code".
${instruction ? `\nUSER INSTRUCTION / TWEAK: ${instruction}\nPlease specifically apply this instruction or tweak to the generated website code.` : ''}`;

        const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!geminiApiKey) {
            throw new Error("Gemini API key is missing. Please check your .env.local file.");
        }

        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: 'You are an expert frontend developer and designer. Return only raw HTML code.' }], role: 'system' }
        });

        const text = result.response.text();

        let code = text.trim();
        // Extract HTML from markdown if present
        const match = code.match(/```(?:html)?\s*([\s\S]*?)\s*```/i);
        if (match) {
            code = match[1];
        } else {
            // Fallback: locate HTML tags
            const startIndex = code.indexOf('<!DOCTYPE');
            const htmlIndex = code.indexOf('<html');
            const endIndex = code.lastIndexOf('</html>');
            
            const start = startIndex !== -1 ? startIndex : (htmlIndex !== -1 ? htmlIndex : 0);
            if (endIndex !== -1 && endIndex > start) {
                code = code.substring(start, endIndex + 7);
            }
        }
        return code.trim();
    } catch (error) {
        return handleAIError(error);
    }
};

export const generateMarketingKit = async (apiKey: string, project: Project, instruction?: string): Promise<MarketingPost[]> => {
    try {
        const prompt = `Act as an expert social media manager. Generate 4 exceptional, premium social media posts (Instagram, LinkedIn, Twitter, Facebook) to launch this business.
Idea: ${project.idea}
${project.targetAudience ? `Target Audience: ${project.targetAudience}` : ''}
${project.location ? `Location: ${project.location}` : ''}
${project.competitors && project.competitors.length > 0 ? `
Competitor Intelligence Context: 
We are displacing these rivals:
${project.competitors.map(c => `- ${c.name} (Weakness to exploit: ${c.weaknesses?.join(', ') || c.gap || 'unknown'})`).join('\n')}
Design the marketing copy to implicitly highlight how our brand bridges the exact market gaps left by these competitors without naming them natively.` : ''}
${instruction ? `\nUSER INSTRUCTION / TWEAK: ${instruction}\nPlease strictly follow this instruction to adjust the tone, content, or image prompts.` : ''}

Return ONLY a JSON array without markdown formatting. Schema:
[
  { "platform": "Instagram", "content": "post text", "hashtags": ["#tag1"], "imagePrompt": "an image prompt for midjourney/dalle of the post" }
]`;

        const text = await groqChat(apiKey, [
            { role: 'system', content: 'You are an expert social media manager. Always respond with raw JSON only, no markdown fences.' },
            { role: 'user', content: prompt }
        ]);
        return JSON.parse(extractJSON(text) || '[]');
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const generateFundingOpportunities = async (apiKey: string, project: Project, instruction?: string): Promise<FundingOpportunity[]> => {
    try {
        const prompt = `Act as an expert startup advisor. Find 3 to 5 realistic, current funding opportunities (grants, specific VC firm types, accelerators, local events/competitions, or prominent angel investors) for this business idea. Provide links and profiles.
Idea: ${project.idea}
${project.industry ? `Industry: ${project.industry}` : ''}
${project.location ? `Location: ${project.location}` : ''}
${instruction ? `\nUSER INSTRUCTION / TWEAK: ${instruction}\nPlease specifically focus on this instruction when finding funding opportunities.` : ''}

Return ONLY a JSON array without formatting. Schema:
[
  { "type": "Grant / Seed / Accelerator / Event", "name": "Name of fund or type", "amount": "$50k - $250k", "description": "Details about it. Mention the profile details.", "matchReason": "Why we are a good fit", "link": "https://..." }
]`;

        const text = await groqChat(apiKey, [
            { role: 'system', content: 'You are an expert startup advisor. Always respond with raw JSON only, no markdown fences.' },
            { role: 'user', content: prompt }
        ]);
        return JSON.parse(extractJSON(text) || '[]');
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const analyzeProfileEngagement = async (apiKey: string, profileLink: string) => {
    try {
        const serpApiKey = import.meta.env.VITE_SERPAPI_KEY;
        const serpRes = await fetch(`/api/serp/search?engine=google&q=${encodeURIComponent(profileLink)}&api_key=${serpApiKey}`);
        const serpData = await serpRes.json();
        const serpContext = JSON.stringify(serpData.organic_results?.slice(0, 5) || serpData, null, 2);

        const prompt = `I have run a real SerpApi web search on the core URL profile: ${profileLink}
Here is the raw organic search data returned:
${serpContext}

Based on this real-world search engine data, please break down the profile's presence into verified facts. 
Also, sensibly infer specific numerical metrics (likes, comments, shares on top activity) based realistically on their visible footprint size and engagement signals in the text.

Return ONLY a JSON object without markdown formatting. Schema:
{
  "profileName": "Name of the profile",
  "platform": "The platform this link belongs to (e.g., Twitter, LinkedIn)",
  "verifiedBio": "The exact bio or description extracted from the search result.",
  "overallEngagementScore": 85,
  "recentActivity": [
    { 
      "title": "Short title or content snippet", 
      "likes": 500,
      "comments": 45,
      "shares": 10,
      "date": "Exact date if visible, else 'Recent'"
    }
  ]
}`;

        const text = await groqChat(apiKey, [
            { role: 'system', content: 'You are a social media analytics expert. Always respond with raw JSON only, no markdown fences.' },
            { role: 'user', content: prompt }
        ]);
        return JSON.parse(extractJSON(text) || '{}');
    } catch (error) {
        console.error('Profile analysis error', error);
        return null;
    }
};

export const analyzeCompetitorSocials = async (apiKey: string, competitors: Competitor[]) => {
    try {
        const serpApiKey = import.meta.env.VITE_SERPAPI_KEY;
        const topCompetitors = competitors.slice(0, 3);

        const allContexts = await Promise.all(topCompetitors.map(async (comp) => {
            const [igRes, liRes, twRes] = await Promise.all([
                fetch(`/api/serp/search?engine=google&q=${encodeURIComponent('site:instagram.com ' + comp.name)}&api_key=${serpApiKey}`),
                fetch(`/api/serp/search?engine=google&q=${encodeURIComponent('site:linkedin.com/company OR site:linkedin.com/in ' + comp.name)}&api_key=${serpApiKey}`),
                fetch(`/api/serp/search?engine=google&q=${encodeURIComponent('site:twitter.com OR site:x.com ' + comp.name)}&api_key=${serpApiKey}`)
            ]);

            const [igData, liData, twData] = await Promise.all([
                igRes.json(),
                liRes.json(),
                twRes.json()
            ]);

            return {
                competitor: comp.name,
                instagram_results: igData.organic_results?.slice(0, 3) || [],
                linkedin_results: liData.organic_results?.slice(0, 3) || [],
                twitter_results: twData.organic_results?.slice(0, 3) || []
            };
        }));

        const prompt = `I have run a precision SerpApi web search for the Instagram, LinkedIn, and Twitter presence of these competitors:
${JSON.stringify(allContexts, null, 2)}

Analyze their organic footprint. Extrapolate an accurate engagement report (likes, comments, and an overall 'Engagement Score' out of 100) strictly based on their visible search snippet clout across all networks.

Return ONLY a JSON array without markdown formatting. Schema:
[
  {
    "competitorName": "Name",
    "handle": "@handle_found",
    "engagementScore": 85,
    "avgLikes": 1200,
    "avgComments": 150,
    "followersEstimate": "50K+",
    "linkedinFollowers": "10K+",
    "twitterFollowers": "20K+"
  }
]`;

        const text = await groqChat(apiKey, [
            { role: 'system', content: 'You are a social media analytics expert. Always respond with raw JSON only, no markdown fences.' },
            { role: 'user', content: prompt }
        ]);
        return JSON.parse(extractJSON(text) || '[]');
    } catch (error) {
        console.error('Competitor analysis error', error);
        return [];
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// Chat Response with Tool Calling
// ─────────────────────────────────────────────────────────────────────────────

export const generateChatResponse = async (
    apiKey: string,
    project: Project,
    messageText: string
): Promise<{ message: ChatMessage; updates?: Partial<Project> }> => {
    try {
        // ── 1. Safety screen the user input via llama-guard-3-8b ──────────────
        const isSafe = await guardCheck(apiKey, messageText);
        if (!isSafe) {
            return {
                message: {
                    id: crypto.randomUUID(),
                    role: 'model',
                    content: '⚠️ Your message was flagged by our content safety filter. Please rephrase and try again.',
                    timestamp: new Date().toISOString()
                }
            };
        }

        const projectDataDump = JSON.stringify({
            name: project.name,
            idea: project.idea,
            industry: project.industry,
            targetAudience: project.targetAudience,
            location: project.location,
            marketResearch: project.marketResearch,
            competitors: project.competitors,
            websiteCode: project.websiteCode ? '[PRESENT — omitted for brevity]' : null,
            marketingKit: project.marketingKit,
            fundingOpportunities: project.fundingOpportunities
        }, null, 2);

        const systemPrompt = `You are Waymaker AI, an expert business consultant and development agent.
You have access to the full state of the user's project:
---
${projectDataDump}
---

You have full control over the app's features through the provided tools.
If the user asks to:
1. Tweak or generate the website design -> call 'generate_website'
2. Tweak or expand market research -> call 'generate_market_research'
3. Modify the marketing kit, ask for post timings or generate a picture -> call 'generate_marketing_kit'
4. Find more investors or VCs -> call 'find_funding_opportunities'
5. Update arbitrary text fields (like project name) -> call 'update_project'

When you use a tool, you do not need to explain how you did it, just tell the user concisely that it's done. 
If the user just asks a question about the generated information, simply answer it using the context above without using any tools.`;

        // Build message history
        const history: Groq.Chat.ChatCompletionMessageParam[] = project.chatHistory.map(msg => ({
            role: msg.role === 'model' ? 'assistant' as const : 'user' as const,
            content: msg.content
        }));

        const messages: Groq.Chat.ChatCompletionMessageParam[] = [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: messageText }
        ];

        const tools: any[] = [
            {
                type: "function",
                function: {
                    name: "update_project",
                    description: "Update arbitrary project data like name, idea, or targetAudience.",
                    parameters: {
                        type: "object",
                        properties: {
                            updates: { type: "object", description: "JSON object containing keys to update in the project." }
                        },
                        required: ["updates"]
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "generate_website",
                    description: "Generate or tweak the entire website HTML code based on user instructions.",
                    parameters: {
                        type: "object",
                        properties: {
                            instruction: { type: "string", description: "Specific instructions on what to change or design." }
                        },
                        required: ["instruction"]
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "generate_market_research",
                    description: "Regenerate or tweak the market research dashboard based on user instructions.",
                    parameters: {
                        type: "object",
                        properties: {
                            instruction: { type: "string", description: "Specific instructions for the market research." }
                        },
                        required: ["instruction"]
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "generate_marketing_kit",
                    description: "Regenerate or tweak the marketing kit (social media posts, timings, image prompts).",
                    parameters: {
                        type: "object",
                        properties: {
                            instruction: { type: "string", description: "Specific instructions for the marketing kit." }
                        },
                        required: ["instruction"]
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "find_funding_opportunities",
                    description: "Find or tweak funding opportunities (VCs, grants, etc.).",
                    parameters: {
                        type: "object",
                        properties: {
                            instruction: { type: "string", description: "Specific instructions for finding funding." }
                        },
                        required: ["instruction"]
                    }
                }
            }
        ];

        const client = getGroqClient(apiKey);
        const completion = await client.chat.completions.create({
            model: GENERATION_MODEL,
            messages,
            temperature: 0.7,
            max_completion_tokens: 4096,
            tools: tools,
            tool_choice: "auto"
        });

        let finalResponseText = completion.choices[0]?.message?.content || "";
        let updates: Partial<Project> | undefined;

        if (completion.choices[0]?.message?.tool_calls && completion.choices[0].message.tool_calls.length > 0) {
            const toolCall = completion.choices[0].message.tool_calls[0];
            try {
                const args = JSON.parse(toolCall.function.arguments);
                updates = {};
                
                if (toolCall.function.name === 'update_project') {
                    updates = args.updates;
                    finalResponseText = finalResponseText || "✅ I have updated the project details.";
                } else if (toolCall.function.name === 'generate_website') {
                    const newCode = await generateWebsiteCode(apiKey, project, args.instruction);
                    updates.websiteCode = newCode;
                    finalResponseText = finalResponseText || "✅ I have tweaked the website design for you. Check it out!";
                } else if (toolCall.function.name === 'generate_market_research') {
                    const newData = await generateMarketResearch(apiKey, project, args.instruction);
                    if (typeof newData === 'string') updates.marketResearch = newData;
                    finalResponseText = finalResponseText || "✅ I've updated your market research dashboard based on your instructions.";
                } else if (toolCall.function.name === 'generate_marketing_kit') {
                    const newData = await generateMarketingKit(apiKey, project, args.instruction);
                    updates.marketingKit = newData;
                    finalResponseText = finalResponseText || "✅ Marketing kit has been updated with your requests!";
                } else if (toolCall.function.name === 'find_funding_opportunities') {
                    const newData = await generateFundingOpportunities(apiKey, project, args.instruction);
                    updates.fundingOpportunities = newData;
                    finalResponseText = finalResponseText || "✅ I've pulled in some new funding opportunities matching your criteria.";
                }
            } catch (err) {
                console.warn('Failed to parse or execute tool call args', err);
            }
        }

        if (!finalResponseText && !updates) {
             finalResponseText = "I couldn't quite understand that request. Could you clarify?";
        }

        return {
            message: {
                id: crypto.randomUUID(),
                role: 'model',
                content: finalResponseText,
                timestamp: new Date().toISOString()
            },
            updates
        };
    } catch (error) {
        console.error(error);
        return {
            message: {
                id: crypto.randomUUID(),
                role: 'model',
                content: 'Error: Could not process request or update project.',
                timestamp: new Date().toISOString()
            }
        };
    }
};
