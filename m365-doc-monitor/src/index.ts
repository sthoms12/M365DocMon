// src/index.ts
import { z } from 'zod';
import axios from 'axios';
import { Env } from './types';

// URL Validation Schema
const MsLearnUrlSchema = z.string().url().refine(url => {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.hostname === 'learn.microsoft.com' &&
      (parsedUrl.pathname.includes('/azure/') || 
       parsedUrl.pathname.includes('/microsoft-365/') ||
       parsedUrl.pathname.includes('/windows/'))
    );
  } catch {
    return false;
  }
}, { message: 'Must be a valid Microsoft Learn documentation URL' });

export default {
  async scheduled(event: ScheduledEvent, env: Env) {
    // Periodic check logic
    await checkDocumentChanges(env);
  },

  async fetch(request: Request, env: Env) {
    try {
      const url = new URL(request.url);
      
      switch (url.pathname) {
        case '/api/map-doc':
          return handleDocumentMapping(request, env);
        case '/api/changes':
          return getRecentChanges(request, env);
        default:
          return new Response('Not Found', { status: 404 });
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), 
        { status: 500 }
      );
    }
  }
};

async function handleDocumentMapping(request: Request, env: Env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { msLearnUrl, internalKbUrls } = await request.json();
    
    // Validate inputs
    const validatedMsUrl = MsLearnUrlSchema.parse(msLearnUrl);

    const mappingId = crypto.randomUUID();

    // Insert mapping
    await env.DB.prepare(
      'INSERT INTO doc_mappings (id, ms_learn_url, internal_kb_urls) VALUES (?1, ?2, ?3)'
    )
    .bind(mappingId, validatedMsUrl, JSON.stringify(internalKbUrls))
    .run();

    return new Response(JSON.stringify({ 
      id: mappingId, 
      message: 'Mapping created successfully' 
    }), { status: 201 });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Validation failed' }), 
      { status: 400 }
    );
  }
}

async function getRecentChanges(request: Request, env: Env) {
  // Retrieve recent changes from database
  const changes = await env.DB.prepare(
    'SELECT * FROM change_logs ORDER BY detected_at DESC LIMIT 10'
  ).all();

  return new Response(JSON.stringify(changes), { status: 200 });
}

async function fetchGitHubContent(msLearnUrl: string, env: Env): Promise<string> {
  const githubPat = env.GITHUB_PAT;
  
  // Convert MS Learn URL to potential GitHub source
  const githubSource = convertMsLearnToGitHubSource(msLearnUrl);

  if (!githubSource) {
    throw new Error('Could not convert URL to GitHub source');
  }

  try {
    const response = await axios.get(githubSource, {
      headers: {
        'Authorization': `token ${githubPat}`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    });

    return response.data;
  } catch (error) {
    console.error('GitHub fetch error', error);
    throw new Error('Failed to fetch GitHub content');
  }
}

function convertMsLearnToGitHubSource(msLearnUrl: string): string | null {
  // Implement conversion logic
  const urlParts = new URL(msLearnUrl);
  
  // Basic mapping for Microsoft 365 docs
  const pathSegments = urlParts.pathname.split('/').filter(Boolean);
  
  if (pathSegments[0] === 'microsoft-365') {
    return `https://raw.githubusercontent.com/MicrosoftDocs/microsoft-365-docs/public/${urlParts.pathname.replace('/microsoft-365/', '')}.md`;
  }

  return null;
}

async function checkDocumentChanges(env: Env) {
  const mappings = await env.DB.prepare(
    'SELECT * FROM doc_mappings'
  ).all();

  const changes = [];

  for (const mapping of mappings.results) {
    try {
      const currentContent = await fetchGitHubContent(mapping.ms_learn_url, env);
      const cachedContent = await env.DOC_MONITOR_CACHE.get(mapping.id);

      if (!cachedContent || cachedContent !== currentContent) {
        // Content changed
        await env.DOC_MONITOR_CACHE.put(mapping.id, currentContent);
        
        const changeLog = {
          docId: mapping.id,
          msLearnUrl: mapping.ms_learn_url,
          changedAt: new Date().toISOString()
        };

        // Log change to database
        await env.DB.prepare(
          'INSERT INTO change_logs (id, doc_mapping_id, change_type, change_description) VALUES (?1, ?2, ?3, ?4)'
        )
        .bind(
          crypto.randomUUID(), 
          mapping.id, 
          'content_update', 
          JSON.stringify(changeLog)
        )
        .run();

        changes.push(changeLog);
      }
    } catch (error) {
      console.error(`Error checking changes for ${mapping.ms_learn_url}`, error);
    }
  }

  return changes;
}