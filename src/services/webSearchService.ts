/**
 * webSearchService.ts
 * Replaces MCP with direct Serper API (google.serper.dev) integration.
 */

const SERPER_API_URL = 'https://google.serper.dev/search';

export type WebSearchStatus = 'idle' | 'searching' | 'ok' | 'error';
let _searchStatus: WebSearchStatus = 'idle';
let _searchStatusMessage = '';

export const getSearchStatus = (): { status: WebSearchStatus; message: string } => ({
    status: _searchStatus,
    message: _searchStatusMessage,
});

/**
 * Searches the web using the Serper API.
 * Uses the API key from environment variables.
 */
export const serperWebSearch = async (query: string): Promise<string> => {
    _searchStatus = 'searching';
    _searchStatusMessage = 'Scraping web data via Serper API...';

    const apiKey = import.meta.env.VITE_SERPER_API_KEY;

    if (!apiKey) {
        _searchStatus = 'error';
        _searchStatusMessage = 'Serper API Key is missing';
        console.warn('[Serper Search] VITE_SERPER_API_KEY not found in env variables.');
        return '';
    }

    try {
        console.log(`[Serper Search] Searching for: "${query}"`);

        const response = await fetch(SERPER_API_URL, {
            method: 'POST',
            headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ q: query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Build readable context string from search results
        const lines: string[] = [];

        if (data.organic && Array.isArray(data.organic) && data.organic.length > 0) {
            data.organic.slice(0, 8).forEach((r: any, i: number) => {
                lines.push(`[Result ${i + 1}] ${r.title ?? 'No title'}`);
                if (r.link) lines.push(`URL: ${r.link}`);
                if (r.snippet) lines.push(`Snippet: ${r.snippet}`);
                lines.push('');
            });
        }

        if (lines.length === 0) {
            _searchStatus = 'error';
            _searchStatusMessage = 'Serper API returned empty results';
            return '';
        }

        _searchStatus = 'ok';
        _searchStatusMessage = `✓ Web Search: ${Math.min(data.organic.length, 8)} results fetched`;
        console.log(`[Serper Search] ✓ Got ${data.organic.length} results`);

        return lines.join('\n');
    } catch (e: any) {
        _searchStatus = 'error';
        _searchStatusMessage = `Serper Search error: ${e?.message ?? e}`;
        console.warn('[Serper Search] Failed:', e);
        return '';
    }
};

/**
 * fetchRealWorldContext
 * Called by ai.ts to ground the LLM in real data.
 */
export const fetchRealWorldContext = async (
    idea: string,
    industry?: string
): Promise<string> => {
    const query = `${idea} ${industry ?? ''} market size competitors trends statistics 2024 2025`;

    console.log('[Web Search] Starting real-world context fetch...');

    const searchResult = await serperWebSearch(query);

    if (!searchResult) {
        console.log('[Web Search] No data retrieved — LLM will use internal knowledge');
        return '';
    }

    console.log(`[Web Search] Real-world context ready`);

    return (
        '\n\nREAL-WORLD MARKET DATA (live-scraped via Google Search):\n' +
        searchResult +
        '\n\nCRITICAL: Use the above real data to generate highly accurate, specific, ' +
        'authentic market figures and competitor names. Do not invent numbers.'
    );
};
