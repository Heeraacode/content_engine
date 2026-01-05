import React, { useState, useMemo, useEffect } from 'react';

// ============================================
// ICONS
// ============================================

const XIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Icon = ({ name, size = 20, className = '' }) => {
  const paths = {
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    barChart: <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
    sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    chevronLeft: <polyline points="15 18 9 12 15 6"/>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
    loader: <><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    gripVertical: <><circle cx="9" cy="5" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="19" r="1" fill="currentColor"/><circle cx="15" cy="5" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="19" r="1" fill="currentColor"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    flame: <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    messageCircle: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    trendingDown: <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>,
    alertTriangle: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    play: <polygon points="5 3 19 12 5 21 5 3"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    package: <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    award: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    sliders: <><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    lightbulb: <><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
};

// ============================================
// CONTENT WRITING SYSTEM
// ============================================

// Anti-AI patterns and human writing rules
const WRITING_RULES = {
  banned_phrases: [
    'excited to announce', 'thrilled to share', 'game-changing', 'revolutionary',
    'leverage', 'synergy', 'ecosystem', 'paradigm shift', 'best-in-class',
    'cutting-edge', 'world-class', 'seamlessly', 'robust', 'scalable solution',
    'at the end of the day', 'move the needle', 'low-hanging fruit',
    'circle back', 'deep dive', 'take it to the next level', 'empower',
    'unlock potential', 'drive innovation', 'transform the way', 'reimagine',
    'delve into', 'in today\'s fast-paced', 'it\'s no secret that',
    'without further ado', 'let\'s dive in', 'here\'s the thing',
  ],
  
  human_patterns: [
    'Vary sentence length dramatically. Short. Then longer ones that breathe.',
    'Start some sentences with And, But, So - like real speech',
    'Use "we" and "I" naturally - be a person, not a brand',
    'Include one specific, verifiable detail',
    'Contractions always (we\'re, it\'s, don\'t, can\'t)',
    'Break grammar rules occasionally for emphasis',
    'Reference time naturally (yesterday, last week, just now)',
    'Show don\'t tell - specifics over adjectives',
  ],
  
  x_specific: {
    structure: [
      'Hook in first 7 words (this shows in timeline)',
      'One idea per tweet - ruthlessly cut',
      'Line breaks after every 1-2 sentences',
      'End with implicit or explicit CTA',
      'No hashtags unless trending topic',
      'Numbers > vague claims (3x faster, not "much faster")',
    ],
    hooks: {
      problem_solution: {
        formula: '[Pain point]?\n\n[Solution in one line].',
        example: 'Spending 3 weeks building what should take 3 hours?\n\nWe fixed that.',
        avgEng: 4.2,
      },
      contrarian: {
        formula: '[Unexpected opinion about common belief].',
        example: 'Most no-code tools make simple things complicated.\n\nWe went the other way.',
        avgEng: 3.9,
      },
      specific_number: {
        formula: '[Specific stat/number] + [what it means].',
        example: '47 apps built this week. Zero lines of code.\n\nThat\'s Base44.',
        avgEng: 3.7,
      },
      story_hook: {
        formula: '[Intriguing story opener that demands continuation].',
        example: 'A user DM\'d us at 2am.\n\nThey\'d just built their entire MVP. In one sitting.',
        avgEng: 3.5,
      },
      direct_announce: {
        formula: '[Feature] is live. [One-line benefit].',
        example: 'Agent Builder 2.0 is live.\n\nYour AI agents just got 10x smarter.',
        avgEng: 3.2,
      },
    },
    bestTimes: ['Tue 9am', 'Wed 12pm', 'Thu 9am'],
    charTarget: { min: 180, optimal: 220, max: 280 },
  },
  
  linkedin_specific: {
    structure: [
      'First line = hook (only ~150 chars show before "see more")',
      'White space is everything - short paragraphs',
      'Story beats announcement every time',
      'Personal insight > feature dump',
      'End with question to drive comments',
      'Emojis sparingly, if at all',
    ],
    hooks: {
      insight_hook: {
        formula: '[Observation from experience] + [what you learned]',
        example: 'After 200+ customer calls this quarter, one pattern keeps emerging:\n\nThe best teams don\'t want more tools. They want fewer, better ones.',
        avgEng: 5.2,
      },
      vulnerability_hook: {
        formula: '[Admission of mistake/challenge] + [lesson]',
        example: 'We almost didn\'t ship this feature.\n\nHere\'s why we did anyway (and what it taught us):',
        avgEng: 4.8,
      },
      transformation_hook: {
        formula: 'Before: [old state]\nAfter: [new state]\n\n[What changed]',
        example: 'Before: 6 weeks to launch an internal tool.\nAfter: One afternoon.\n\nThe difference? We stopped writing code.',
        avgEng: 4.5,
      },
      question_hook: {
        formula: '[Thought-provoking question]?\n\n[Your take]',
        example: 'What if the bottleneck isn\'t engineering capacity?\n\nWhat if it\'s the gap between idea and first working version?',
        avgEng: 4.1,
      },
    },
    bestTimes: ['Tue 8am', 'Wed 10am', 'Thu 8am'],
    charTarget: { min: 400, optimal: 800, max: 1500 },
  },
};

// ============================================
// FEATURE CLASSIFICATION ENGINE
// ============================================

const classifyFeature = (feature) => {
  const scores = {
    hero: 0,
    standard: 0,
    bundle: 0,
  };
  
  // Category signals
  const heroCategories = ['AI', 'Launch', 'Platform'];
  const bundleCategories = ['Bug Fix', 'Performance', 'Improvement'];
  
  if (heroCategories.includes(feature.category)) scores.hero += 30;
  if (bundleCategories.includes(feature.category)) scores.bundle += 30;
  
  // Title signals
  const heroKeywords = ['new', 'introducing', 'launch', 'builder', 'marketplace', 'agent', 'gpt', 'claude', 'integration'];
  const bundleKeywords = ['fix', 'improve', 'faster', 'better', 'update', 'patch', 'optimize'];
  
  const titleLower = feature.title.toLowerCase();
  heroKeywords.forEach(kw => { if (titleLower.includes(kw)) scores.hero += 10; });
  bundleKeywords.forEach(kw => { if (titleLower.includes(kw)) scores.bundle += 10; });
  
  // Description length (longer = more substantial)
  if (feature.description.length > 80) scores.hero += 15;
  else if (feature.description.length < 40) scores.bundle += 15;
  
  // Engagement history (if available)
  if (feature.engagement?.engRate > 3.5) scores.hero += 20;
  else if (feature.engagement?.engRate < 2) scores.bundle += 10;
  
  // Impact indicators
  if (feature.impact === 'high') scores.hero += 25;
  if (feature.impact === 'low') scores.bundle += 25;
  
  // Determine classification
  const maxScore = Math.max(scores.hero, scores.standard, scores.bundle);
  
  // Require minimum threshold for hero
  if (scores.hero === maxScore && scores.hero >= 40) return { type: 'hero', scores, reason: 'High-impact feature with strong engagement potential' };
  if (scores.bundle === maxScore && scores.bundle >= 30) return { type: 'bundle', scores, reason: 'Minor update, best combined with others' };
  return { type: 'standard', scores, reason: 'Solid feature for standalone announcement' };
};

// ============================================
// FEATURES DATA
// ============================================

const FEATURES_DATA = [
  { id: 1, title: "App Template Marketplace", description: "Browse and launch ready-to-use templates built by the community. Find templates for CRMs, dashboards, internal tools, and more.", date: "2025-11-15", category: "Launch", impact: "high", posted: {}, engagement: { impressions: 45200, likes: 892, comments: 67, shares: 234, engRate: 2.87 } },
  { id: 2, title: "Workspace SSO", description: "Enterprise single sign-on at workspace level for enhanced security.", date: "2025-10-28", category: "Enterprise", impact: "medium", posted: {}, engagement: { impressions: 28400, likes: 445, comments: 32, shares: 89, engRate: 1.99 } },
  { id: 3, title: "Agent Builder 2.0", description: "Completely redesigned agent builder. Visual workflow editor, better debugging, and 10x more capable agents.", date: "2025-10-15", category: "AI", impact: "high", posted: {}, engagement: { impressions: 67800, likes: 1456, comments: 189, shares: 567, engRate: 3.26 } },
  { id: 4, title: "Claude Sonnet 4.5 Support", description: "Access Anthropic's latest model for smarter, faster app generation.", date: "2025-09-28", category: "AI", impact: "high", posted: { base44_x: true }, engagement: { impressions: 52300, likes: 1123, comments: 98, shares: 345, engRate: 2.99 } },
  { id: 5, title: "WhatsApp Integration", description: "Connect your AI agents directly to WhatsApp. Automate customer conversations at scale.", date: "2025-09-22", category: "Integration", impact: "medium", posted: { founder_linkedin: true }, engagement: { impressions: 38900, likes: 678, comments: 56, shares: 167, engRate: 2.32 } },
  { id: 6, title: "Agentic Apps", description: "Build apps that don't just respond—they act. Autonomous task execution, smart scheduling, proactive alerts.", date: "2025-09-18", category: "AI", impact: "high", posted: {}, engagement: { impressions: 71200, likes: 1678, comments: 234, shares: 612, engRate: 3.54 } },
  { id: 7, title: "GPT-5 Integration", description: "OpenAI's most capable model, now available in Base44.", date: "2025-08-25", category: "AI", impact: "high", posted: { base44_x: true, base44_linkedin: true }, engagement: { impressions: 89400, likes: 2341, comments: 312, shares: 789, engRate: 3.85 } },
  { id: 8, title: "Visual Editor", description: "Click any element to edit. No more prompting for simple changes.", date: "2025-07-08", category: "Editor", impact: "medium", posted: {}, engagement: { impressions: 34500, likes: 567, comments: 45, shares: 123, engRate: 2.13 } },
  { id: 9, title: "Workspaces", description: "Organize projects, invite teammates, control permissions. Built for teams.", date: "2025-07-12", category: "Collaboration", impact: "medium", posted: {}, engagement: { impressions: 41200, likes: 789, comments: 67, shares: 198, engRate: 2.56 } },
  { id: 10, title: "10-Minute App Launch", description: "From idea to live app in 10 minutes. We timed it.", date: "2025-05-18", category: "Launch", impact: "high", posted: { founder_x: true }, engagement: { impressions: 124500, likes: 3456, comments: 456, shares: 1234, engRate: 4.13 } },
  { id: 11, title: "40% Faster Load Times", description: "Performance optimization across the board.", date: "2025-05-10", category: "Performance", impact: "low", posted: {}, engagement: { impressions: 12400, likes: 234, comments: 12, shares: 45, engRate: 2.35 } },
  { id: 12, title: "Image Upload Fix", description: "Fixed timeout issues on large image uploads.", date: "2025-05-08", category: "Bug Fix", impact: "low", posted: {}, engagement: { impressions: 8900, likes: 123, comments: 8, shares: 23, engRate: 1.73 } },
  { id: 13, title: "Clearer Error Messages", description: "Redesigned error states with actionable suggestions.", date: "2025-05-05", category: "Improvement", impact: "low", posted: {}, engagement: { impressions: 9200, likes: 145, comments: 11, shares: 28, engRate: 2.00 } },
];

// Add classification to each feature
const CLASSIFIED_FEATURES = FEATURES_DATA.map(f => ({
  ...f,
  classification: classifyFeature(f),
}));

// ============================================
// CHANNELS
// ============================================

const CHANNELS = {
  founder_x: { id: 'founder_x', label: 'X', account: 'founder', name: 'Maor', icon: XIcon, limit: 280, platform: 'x' },
  founder_linkedin: { id: 'founder_linkedin', label: 'LinkedIn', account: 'founder', name: 'Maor', icon: LinkedInIcon, limit: 3000, platform: 'linkedin' },
  base44_x: { id: 'base44_x', label: 'X', account: 'brand', name: 'Base44', icon: XIcon, limit: 280, platform: 'x' },
  base44_linkedin: { id: 'base44_linkedin', label: 'LinkedIn', account: 'brand', name: 'Base44', icon: LinkedInIcon, limit: 3000, platform: 'linkedin' },
};

// ============================================
// AI CONTENT GENERATION
// ============================================

const generateContent = async (feature, channelId, hookType, strategy) => {
  const channel = CHANNELS[channelId];
  const isX = channel.platform === 'x';
  const isFounder = channel.account === 'founder';
  const rules = isX ? WRITING_RULES.x_specific : WRITING_RULES.linkedin_specific;
  const hook = rules.hooks[hookType];
  const isHero = feature.classification?.type === 'hero';
  
  const prompt = `You are a senior content strategist who writes viral social posts for tech founders. Your writing sounds unmistakably human—never AI-generated.

TASK: Write a ${isX ? 'tweet' : 'LinkedIn post'} announcing this feature.

FEATURE:
- Name: ${feature.title}
- Description: ${feature.description}
- Category: ${feature.category}
- Classification: ${isHero ? 'HERO (deserves premium, longer treatment)' : feature.classification?.type?.toUpperCase()}

VOICE: ${isFounder ? `Maor, founder/CEO of Base44. Write like a real founder—sometimes tired, always authentic. Mix confidence with humility. You've shipped hundreds of features. This one matters because...` : `Base44 brand account. Confident but not arrogant. Helpful, not salesy. Show personality without being corporate.`}

HOOK TO USE: "${hook?.formula || hookType}"
Example of this hook: "${hook?.example || ''}"

${isX ? `TWITTER RULES (CRITICAL):
- MUST hook in first 7 words—this is all that shows in timeline
- Max 280 chars. Aim for ${rules.charTarget.optimal} chars.
- Line break after every 1-2 sentences
- ONE idea. Cut ruthlessly.
- Numbers beat adjectives (say "3x" not "much")
- No hashtags
- End with link or soft CTA` : `LINKEDIN RULES (CRITICAL):
- First ~150 chars = everything (this shows before "see more")
- Target ${rules.charTarget.optimal} characters
- Short paragraphs with white space
- Story > announcement
- Personal insight > feature list
- End with question to drive comments`}

BANNED PHRASES (never use these):
${WRITING_RULES.banned_phrases.slice(0, 15).join(', ')}

HUMAN WRITING PATTERNS (use these):
${WRITING_RULES.human_patterns.slice(0, 5).join('\n')}

STRATEGY CONTEXT:
${strategy?.focus || 'Focus on demonstrating real value, not hype.'}

${isHero ? `
THIS IS A HERO FEATURE. Make it count:
- Lead with transformation, not feature name
- Include a specific number or timeframe
- Make people feel something
- This should be your best work
` : ''}

OUTPUT: Return ONLY the post text. No quotes, no explanation, no preamble. Ready to copy-paste.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        model: "claude-sonnet-4-20250514", 
        max_tokens: 800, 
        messages: [{ role: "user", content: prompt }] 
      })
    });
    const data = await res.json();
    let text = data.content?.[0]?.text?.trim() || null;
    
    // Post-process to remove any AI-isms that slipped through
    if (text) {
      WRITING_RULES.banned_phrases.forEach(phrase => {
        const regex = new RegExp(phrase, 'gi');
        text = text.replace(regex, '');
      });
      text = text.replace(/\s+/g, ' ').replace(/ +\n/g, '\n').trim();
    }
    
    return text;
  } catch { return null; }
};

const generateBundlePost = async (features, channelId, strategy) => {
  const channel = CHANNELS[channelId];
  const isX = channel.platform === 'x';
  const isFounder = channel.account === 'founder';
  
  const featureList = features.map(f => `- ${f.title}: ${f.description}`).join('\n');
  
  const prompt = `Write a ${isX ? 'tweet' : 'LinkedIn post'} bundling these smaller updates:

FEATURES:
${featureList}

VOICE: ${isFounder ? 'Maor, founder of Base44' : 'Base44 brand'}
${isX ? 'Keep under 280 chars.' : 'Keep under 600 chars.'}

Frame it as a "shipped this week" or "small wins" update. Make it feel like genuine momentum, not a boring changelog.

${isFounder ? 'Add a human touch—maybe mention late nights, or that one feature a user specifically asked for.' : 'Keep it punchy and proud without being braggy.'}

BANNED: "excited", "thrilled", "game-changing", "revolutionize"

Return ONLY the post text.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 400, messages: [{ role: "user", content: prompt }] })
    });
    const data = await res.json();
    return data.content?.[0]?.text?.trim() || null;
  } catch { return null; }
};

// ============================================
// STRATEGY ENGINE
// ============================================

const analyzePerformanceData = (features) => {
  const posted = features.filter(f => Object.values(f.posted || {}).some(Boolean) && f.engagement);
  if (posted.length < 2) return null;
  
  // Calculate averages
  const totalImpressions = posted.reduce((s, f) => s + (f.engagement?.impressions || 0), 0);
  const totalEngagement = posted.reduce((s, f) => s + (f.engagement?.likes || 0) + (f.engagement?.comments || 0) + (f.engagement?.shares || 0), 0);
  const avgEngRate = posted.length > 0 ? posted.reduce((s, f) => s + (f.engagement?.engRate || 0), 0) / posted.length : 0;
  
  // By classification
  const byClass = {};
  posted.forEach(f => {
    const cls = f.classification?.type || 'standard';
    if (!byClass[cls]) byClass[cls] = { count: 0, totalEng: 0, totalImp: 0 };
    byClass[cls].count++;
    byClass[cls].totalEng += f.engagement?.engRate || 0;
    byClass[cls].totalImp += f.engagement?.impressions || 0;
  });
  
  Object.keys(byClass).forEach(k => {
    byClass[k].avgEng = byClass[k].count > 0 ? (byClass[k].totalEng / byClass[k].count).toFixed(2) : 0;
    byClass[k].avgImp = byClass[k].count > 0 ? Math.round(byClass[k].totalImp / byClass[k].count) : 0;
  });
  
  // By category
  const byCategory = {};
  posted.forEach(f => {
    if (!byCategory[f.category]) byCategory[f.category] = { count: 0, totalEng: 0 };
    byCategory[f.category].count++;
    byCategory[f.category].totalEng += f.engagement?.engRate || 0;
  });
  
  let bestCategory = { name: '', avgEng: 0 };
  Object.entries(byCategory).forEach(([k, v]) => {
    const avg = v.count > 0 ? v.totalEng / v.count : 0;
    if (avg > bestCategory.avgEng) bestCategory = { name: k, avgEng: avg, count: v.count };
  });
  
  // Top performers
  const topPosts = [...posted].sort((a, b) => (b.engagement?.engRate || 0) - (a.engagement?.engRate || 0)).slice(0, 3);
  
  // Underperformers
  const underperformers = [...posted].sort((a, b) => (a.engagement?.engRate || 0) - (b.engagement?.engRate || 0)).slice(0, 2);
  
  return {
    sampleSize: posted.length,
    avgEngRate: avgEngRate.toFixed(2),
    totalImpressions,
    byClass,
    bestCategory,
    topPosts,
    underperformers,
  };
};

const generateStrategy = (features, performance) => {
  const pending = features.filter(f => !Object.values(f.posted || {}).some(Boolean));
  const heroQueue = pending.filter(f => f.classification?.type === 'hero');
  const standardQueue = pending.filter(f => f.classification?.type === 'standard');
  const bundleQueue = pending.filter(f => f.classification?.type === 'bundle');
  
  if (!performance) {
    return {
      focus: 'Build baseline: Post hero features first to establish engagement benchmarks.',
      rationale: 'No performance data available yet. Hero features typically drive highest engagement and will give us data to optimize against.',
      recommendations: [
        { type: 'priority', text: `Post ${heroQueue.length} hero feature${heroQueue.length !== 1 ? 's' : ''} first: ${heroQueue.slice(0, 3).map(f => f.title).join(', ')}`, impact: 'high', data: 'Hero features avg 3.5% engagement vs 2.1% for standard' },
        { type: 'timing', text: 'Post on Tue/Wed/Thu between 8-10am', impact: 'medium', data: 'B2B tech optimal posting windows' },
        { type: 'hook', text: 'Start with Problem→Solution hooks on X (4.2% avg engagement)', impact: 'high', data: 'Benchmark data from top tech accounts' },
      ],
      metrics: [],
      pendingCounts: { hero: heroQueue.length, standard: standardQueue.length, bundle: bundleQueue.length },
    };
  }
  
  const recommendations = [];
  const metrics = [];
  
  // Classification insights
  const bestClass = Object.entries(performance.byClass).sort((a, b) => parseFloat(b[1].avgEng) - parseFloat(a[1].avgEng))[0];
  if (bestClass) {
    const [className, data] = bestClass;
    const diff = (parseFloat(data.avgEng) - parseFloat(performance.avgEngRate)).toFixed(2);
    recommendations.push({
      type: 'classification',
      text: `Double down on ${className.toUpperCase()} features—they outperform by ${diff > 0 ? '+' : ''}${diff}%`,
      impact: 'high',
      data: `${className}: ${data.avgEng}% avg | Overall: ${performance.avgEngRate}% avg`,
    });
    metrics.push({ label: `${className} engagement`, value: `${data.avgEng}%`, delta: `+${diff}%`, positive: parseFloat(diff) > 0 });
  }
  
  // Category insights
  if (performance.bestCategory?.name) {
    const catQueue = pending.filter(f => f.category === performance.bestCategory.name);
    if (catQueue.length > 0) {
      recommendations.push({
        type: 'category',
        text: `${performance.bestCategory.name} content resonates—${catQueue.length} pending in this category`,
        impact: 'medium',
        data: `${performance.bestCategory.avgEng.toFixed(2)}% avg engagement from ${performance.bestCategory.count} posts`,
      });
    }
    metrics.push({ label: 'Best category', value: performance.bestCategory.name, delta: `${performance.bestCategory.avgEng.toFixed(2)}%`, positive: true });
  }
  
  // Hero queue
  if (heroQueue.length > 0) {
    recommendations.push({
      type: 'action',
      text: `${heroQueue.length} hero feature${heroQueue.length !== 1 ? 's' : ''} ready: ${heroQueue.slice(0, 2).map(f => f.title).join(', ')}`,
      impact: 'high',
      data: `Hero features drive ${performance.byClass?.hero?.avgEng || '~3.5'}% avg engagement`,
    });
  }
  
  // Bundle opportunity
  if (bundleQueue.length >= 3) {
    recommendations.push({
      type: 'bundle',
      text: `Bundle ${bundleQueue.length} minor updates into one "shipped this week" post`,
      impact: 'low',
      data: 'Maintains velocity without diluting hero announcements',
    });
  }
  
  // Underperformer insight
  if (performance.underperformers?.length > 0) {
    const worst = performance.underperformers[0];
    const diff = (parseFloat(performance.avgEngRate) - (worst.engagement?.engRate || 0)).toFixed(2);
    recommendations.push({
      type: 'learning',
      text: `"${worst.title}" underperformed—consider different hook or timing for similar features`,
      impact: 'medium',
      data: `${worst.engagement?.engRate}% vs ${performance.avgEngRate}% avg (${diff}% below)`,
    });
  }
  
  // Generate focus statement
  let focus = '';
  if (heroQueue.length > 0 && performance.byClass?.hero?.avgEng > performance.avgEngRate) {
    focus = `Priority: Ship ${heroQueue.length} hero features. Your hero content outperforms by ${(parseFloat(performance.byClass.hero.avgEng) - parseFloat(performance.avgEngRate)).toFixed(1)}%.`;
  } else if (performance.bestCategory?.name) {
    focus = `Focus on ${performance.bestCategory.name} content (${performance.bestCategory.avgEng.toFixed(1)}% eng) while clearing ${pending.length} pending features.`;
  } else {
    focus = `Clear the queue: ${pending.length} features pending. Start with highest-impact items.`;
  }
  
  const rationale = `Based on ${performance.sampleSize} posted features with ${performance.avgEngRate}% average engagement. ${performance.topPosts?.[0] ? `Top performer: "${performance.topPosts[0].title}" (${performance.topPosts[0].engagement?.engRate}%).` : ''}`;
  
  return {
    focus,
    rationale,
    recommendations,
    metrics,
    pendingCounts: { hero: heroQueue.length, standard: standardQueue.length, bundle: bundleQueue.length },
    performance,
  };
};

// ============================================
// COMPONENTS
// ============================================

const Button = ({ children, variant = 'primary', size = 'md', loading, className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none disabled:opacity-50 gap-2';
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    secondary: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700',
    ghost: 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100',
    outline: 'border border-zinc-200 hover:bg-zinc-50 text-zinc-700',
    success: 'bg-emerald-500 hover:bg-emerald-600 text-white',
  };
  const sizes = { xs: 'px-2 py-1 text-xs', sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-base' };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading} {...props}>{loading && <Icon name="loader" size={14} className="animate-spin" />}{children}</button>;
};

const Badge = ({ children, color = 'gray', size = 'sm' }) => {
  const colors = {
    gray: 'bg-zinc-100 text-zinc-600',
    orange: 'bg-orange-100 text-orange-700',
    green: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-amber-100 text-amber-700',
  };
  const sizes = { xs: 'px-1.5 py-0.5 text-[10px]', sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-sm' };
  return <span className={`rounded font-medium ${colors[color]} ${sizes[size]}`}>{children}</span>;
};

const Modal = ({ open, onClose, title, subtitle, children, size = 'md' }) => {
  if (!open) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-xl shadow-2xl ${sizes[size]} w-full max-h-[85vh] overflow-hidden flex flex-col`}>
        <div className="px-6 py-4 border-b border-zinc-100 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-zinc-900 text-lg">{title}</h3>
            {subtitle && <p className="text-sm text-zinc-500 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400"><Icon name="x" size={18} /></button>
        </div>
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

// ============================================
// LANDING PAGE
// ============================================

const LandingPage = ({ onStart }) => (
  <div className="min-h-screen bg-white">
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Icon name="zap" size={16} className="text-white" />
          </div>
          <span className="font-semibold text-zinc-900">Content Engine</span>
        </div>
        <Button onClick={onStart}>Open App</Button>
      </div>
    </nav>

    <section className="pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Badge color="orange" size="md">v7 • Data-Backed Strategy</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight mt-6 mb-4">
          Content that sounds human.
          <br />
          <span className="text-orange-500">Strategy that's data-driven.</span>
        </h1>
        <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-8">
          Smart feature classification. Platform-optimized hooks. 
          Performance analytics that actually inform your next post.
        </p>
        <Button size="lg" onClick={onStart}>
          Start Creating <Icon name="arrowRight" size={18} />
        </Button>
      </div>
    </section>

    <section className="py-16 px-6 bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-zinc-900 text-center mb-10">The System</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: 'layers', title: 'Smart Classification', desc: 'Hero features get standalone treatment. Minor updates get bundled. The algorithm decides based on category, impact, and historical performance.' },
            { icon: 'edit', title: 'Human-Quality Copy', desc: 'Platform-specific hooks. Banned phrase filtering. Writing patterns that pass the "would a real person post this" test.' },
            { icon: 'target', title: 'Data-Backed Strategy', desc: 'See exactly what\'s working. Get specific recommendations with rationale. Apply strategy changes that update all pending content.' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <Icon name={f.icon} size={20} className="text-orange-600" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// ============================================
// APP HEADER
// ============================================

const AppHeader = ({ view, setView, account, setAccount }) => (
  <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
    <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
            <Icon name="zap" size={14} className="text-white" />
          </div>
          <span className="font-semibold text-zinc-900">Content Engine</span>
        </div>
        
        <nav className="flex items-center border-l border-zinc-200 pl-6">
          {[
            { id: 'compose', label: 'Compose', icon: 'edit' },
            { id: 'strategy', label: 'Strategy', icon: 'target' },
            { id: 'calendar', label: 'Calendar', icon: 'calendar' },
            { id: 'features', label: 'Features', icon: 'layers' },
            { id: 'analytics', label: 'Analytics', icon: 'barChart' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                view === item.id ? 'text-orange-600 bg-orange-50' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Account Switcher */}
      <div className="flex items-center">
        <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
          <button
            onClick={() => setAccount('founder')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
              account === 'founder' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white text-xs font-bold">M</div>
            <div className="text-left">
              <div className={`font-medium ${account === 'founder' ? 'text-zinc-900' : 'text-zinc-500'}`}>Maor</div>
              <div className="text-[10px] text-zinc-400 -mt-0.5">Founder</div>
            </div>
          </button>
          <button
            onClick={() => setAccount('brand')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
              account === 'brand' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
              <Icon name="zap" size={12} className="text-white" />
            </div>
            <div className="text-left">
              <div className={`font-medium ${account === 'brand' ? 'text-zinc-900' : 'text-zinc-500'}`}>Base44</div>
              <div className="text-[10px] text-zinc-400 -mt-0.5">Brand</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
);

// ============================================
// COMPOSE VIEW
// ============================================

const ComposeView = ({ features, selectedId, setSelectedId, account, onMarkPosted, strategy }) => {
  const [posts, setPosts] = useState({});
  const [hooks, setHooks] = useState({});
  const [copied, setCopied] = useState(null);
  const [generating, setGenerating] = useState(null);
  const [showBundle, setShowBundle] = useState(false);
  
  const channels = account === 'founder' ? ['founder_x', 'founder_linkedin'] : ['base44_x', 'base44_linkedin'];
  
  const heroFeatures = features.filter(f => f.classification?.type === 'hero' && !Object.values(f.posted || {}).some(Boolean));
  const standardFeatures = features.filter(f => f.classification?.type === 'standard' && !Object.values(f.posted || {}).some(Boolean));
  const bundleFeatures = features.filter(f => f.classification?.type === 'bundle' && !Object.values(f.posted || {}).some(Boolean));
  
  const feature = features.find(f => f.id === selectedId) || heroFeatures[0] || standardFeatures[0];
  
  useEffect(() => { 
    if (!selectedId && (heroFeatures[0] || standardFeatures[0])) {
      setSelectedId((heroFeatures[0] || standardFeatures[0]).id);
    }
  }, [heroFeatures, standardFeatures, selectedId]);
  
  const getHooks = (ch) => {
    const platform = ch.includes('_x') ? 'x_specific' : 'linkedin_specific';
    return WRITING_RULES[platform].hooks;
  };
  
  const getDefaultPost = (ch) => {
    if (!feature) return '';
    const isX = ch.includes('_x');
    const isFounder = ch.includes('founder');
    const isHero = feature.classification?.type === 'hero';
    
    if (isHero) {
      if (isX) {
        return isFounder 
          ? `We've been working on this for months.\n\n${feature.title} is finally live.\n\n${feature.description.split('.')[0]}.\n\nbase44.com`
          : `${feature.title} just dropped.\n\n${feature.description.split('.')[0]}.\n\nTry it: base44.com`;
      } else {
        return isFounder
          ? `Some features take months to get right.\n\nThis was one of them.\n\n${feature.title}: ${feature.description}\n\nWe could have shipped something half-baked weeks ago. We didn't.\n\nHere's what we built instead →\n\nbase44.com`
          : `${feature.title} is live.\n\n${feature.description}\n\nThis changes how teams build internal tools.\n\nSee it in action → base44.com`;
      }
    }
    
    return isX
      ? `Shipped: ${feature.title}\n\n${feature.description.split('.')[0]}.\n\nbase44.com`
      : `New from Base44: ${feature.title}\n\n${feature.description}\n\n→ base44.com`;
  };
  
  const getPost = (ch) => posts[`${feature?.id}_${ch}`] || getDefaultPost(ch);
  
  const handleGenerate = async (ch) => {
    if (!feature) return;
    setGenerating(ch);
    const hookList = getHooks(ch);
    const hookId = hooks[ch] || Object.keys(hookList)[0];
    const text = await generateContent(feature, ch, hookId, strategy);
    if (text) setPosts(p => ({ ...p, [`${feature.id}_${ch}`]: text }));
    setGenerating(null);
  };
  
  const handleCopy = async (ch) => {
    await navigator.clipboard.writeText(getPost(ch));
    setCopied(ch);
    setTimeout(() => setCopied(null), 1500);
  };
  
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6">
      {/* Strategy Banner */}
      {strategy?.focus && (
        <div className="mb-5 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100 flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Icon name="target" size={18} className="text-orange-500 mt-0.5" />
            <div>
              <div className="font-medium text-zinc-900 text-sm">Active Strategy</div>
              <p className="text-sm text-zinc-600">{strategy.focus}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => window.dispatchEvent(new CustomEvent('openStrategy'))}>
            Adjust <Icon name="chevronRight" size={14} />
          </Button>
        </div>
      )}
      
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          {/* Hero Queue */}
          {heroFeatures.length > 0 && (
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
              <div className="px-4 py-2.5 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 flex items-center gap-2">
                <Icon name="star" size={14} className="text-orange-500" />
                <span className="font-medium text-orange-800 text-sm">Hero Features</span>
                <span className="ml-auto text-xs text-orange-600 font-medium">{heroFeatures.length}</span>
              </div>
              <div className="divide-y divide-zinc-100 max-h-52 overflow-y-auto">
                {heroFeatures.map(f => (
                  <button key={f.id} onClick={() => setSelectedId(f.id)} className={`w-full text-left px-4 py-2.5 transition-colors ${selectedId === f.id ? 'bg-orange-50' : 'hover:bg-zinc-50'}`}>
                    <div className="font-medium text-zinc-900 text-sm">{f.title}</div>
                    <div className="text-xs text-zinc-400">{f.category} • {f.engagement?.engRate || '~3.5'}% expected</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Standard Queue */}
          {standardFeatures.length > 0 && (
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
              <div className="px-4 py-2.5 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                <span className="font-medium text-zinc-700 text-sm">Standard</span>
                <span className="text-xs text-zinc-500">{standardFeatures.length}</span>
              </div>
              <div className="divide-y divide-zinc-100 max-h-40 overflow-y-auto">
                {standardFeatures.map(f => (
                  <button key={f.id} onClick={() => setSelectedId(f.id)} className={`w-full text-left px-4 py-2 transition-colors ${selectedId === f.id ? 'bg-orange-50' : 'hover:bg-zinc-50'}`}>
                    <div className="font-medium text-zinc-900 text-sm truncate">{f.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Bundle CTA */}
          {bundleFeatures.length >= 2 && (
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="package" size={16} className="text-zinc-500" />
                <span className="font-medium text-zinc-700 text-sm">Bundle Ready</span>
              </div>
              <p className="text-xs text-zinc-500 mb-3">{bundleFeatures.length} minor updates to combine</p>
              <Button size="sm" variant="secondary" className="w-full" onClick={() => setShowBundle(true)}>
                Create Bundle Post
              </Button>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-9 space-y-5">
          {/* Feature Header */}
          {feature && (
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge color={feature.classification?.type === 'hero' ? 'orange' : feature.classification?.type === 'bundle' ? 'gray' : 'blue'}>
                    {feature.classification?.type === 'hero' ? '★ Hero' : feature.classification?.type === 'bundle' ? 'Bundle' : 'Standard'}
                  </Badge>
                  <Badge color="gray">{feature.category}</Badge>
                  {feature.engagement?.engRate && (
                    <span className="text-xs text-zinc-400">Historical: {feature.engagement.engRate}% eng</span>
                  )}
                </div>
                <span className="text-xs text-zinc-400">{feature.date}</span>
              </div>
              
              <h1 className="text-xl font-semibold text-zinc-900 mb-2">{feature.title}</h1>
              <p className="text-zinc-500">{feature.description}</p>
              
              {/* Classification Rationale */}
              <div className="mt-4 p-3 bg-zinc-50 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Icon name="info" size={12} />
                  <span className="font-medium">Why {feature.classification?.type}:</span>
                  <span>{feature.classification?.reason}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Channel Cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {channels.map(ch => {
              const channel = CHANNELS[ch];
              const IconC = channel.icon;
              const post = getPost(ch);
              const hookList = getHooks(ch);
              const currentHook = hooks[ch] || Object.keys(hookList)[0];
              const currentHookData = hookList[currentHook];
              const isPosted = feature?.posted?.[ch];
              const overLimit = post.length > channel.limit;
              const rules = ch.includes('_x') ? WRITING_RULES.x_specific : WRITING_RULES.linkedin_specific;
              
              return (
                <div key={ch} className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconC size={16} className="text-zinc-700" />
                      <span className="font-medium text-zinc-900 text-sm">{channel.label}</span>
                      <span className="text-xs text-zinc-400">• {channel.name}</span>
                    </div>
                    {isPosted && <Badge color="green">Posted</Badge>}
                  </div>
                  
                  {/* Hook Selector */}
                  <div className="px-4 py-2 bg-zinc-50 border-b border-zinc-100">
                    <div className="flex gap-1 overflow-x-auto pb-1">
                      {Object.entries(hookList).map(([id, hook]) => (
                        <button
                          key={id}
                          onClick={() => { setHooks(p => ({ ...p, [ch]: id })); setPosts(p => { const n = {...p}; delete n[`${feature?.id}_${ch}`]; return n; }); }}
                          className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                            currentHook === id ? 'bg-white shadow-sm text-zinc-900 ring-1 ring-zinc-200' : 'text-zinc-500 hover:text-zinc-700'
                          }`}
                        >
                          {hook.formula?.split('[')[0] || id}
                          <span className="text-zinc-300 ml-1">{hook.avgEng}x</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <div className="p-4">
                    <div className="bg-zinc-50 rounded-lg p-3 min-h-[140px] max-h-[200px] overflow-y-auto mb-3 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-zinc-700 leading-relaxed">{post}</pre>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium ${overLimit ? 'text-red-500' : post.length < rules.charTarget.min ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {post.length}/{channel.limit}
                        </span>
                        {currentHookData && (
                          <span className="text-xs text-zinc-400">
                            Hook avg: {currentHookData.avgEng}x engagement
                          </span>
                        )}
                      </div>
                      <button onClick={() => handleGenerate(ch)} disabled={generating === ch} className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                        {generating === ch ? <Icon name="loader" size={12} className="animate-spin" /> : <Icon name="sparkles" size={12} />}
                        AI Rewrite
                      </button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => handleCopy(ch)} variant={copied === ch ? 'success' : 'primary'}>
                        {copied === ch ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}
                      </Button>
                      <Button variant="outline" onClick={() => onMarkPosted(feature.id, ch)}>
                        {isPosted ? 'Undo' : 'Posted'}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Tips */}
                  <div className="px-4 py-2 bg-zinc-50 border-t border-zinc-100 text-xs text-zinc-500">
                    Best: {rules.bestTimes.slice(0, 2).join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Bundle Modal */}
      <Modal open={showBundle} onClose={() => setShowBundle(false)} title="Create Bundle Post" subtitle={`Combine ${bundleFeatures.length} minor updates`} size="lg">
        <BundleComposer features={bundleFeatures} channels={channels} strategy={strategy} onClose={() => setShowBundle(false)} />
      </Modal>
    </div>
  );
};

const BundleComposer = ({ features, channels, strategy, onClose }) => {
  const [posts, setPosts] = useState({});
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(null);
  
  const handleGenerate = async () => {
    setGenerating(true);
    for (const ch of channels) {
      const text = await generateBundlePost(features, ch, strategy);
      if (text) setPosts(p => ({ ...p, [ch]: text }));
    }
    setGenerating(false);
  };
  
  const handleCopy = async (ch) => {
    await navigator.clipboard.writeText(posts[ch]);
    setCopied(ch);
    setTimeout(() => setCopied(null), 1500);
  };
  
  return (
    <div className="p-6">
      <div className="mb-4">
        <h4 className="font-medium text-zinc-900 mb-2">Features to bundle:</h4>
        <ul className="space-y-1">
          {features.map(f => (
            <li key={f.id} className="text-sm text-zinc-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              {f.title}
            </li>
          ))}
        </ul>
      </div>
      
      <Button onClick={handleGenerate} loading={generating} className="w-full mb-4">
        <Icon name="sparkles" size={16} />
        Generate Bundle Posts
      </Button>
      
      {Object.keys(posts).length > 0 && (
        <div className="space-y-4">
          {channels.map(ch => {
            const channel = CHANNELS[ch];
            const IconC = channel.icon;
            return posts[ch] ? (
              <div key={ch} className="border border-zinc-200 rounded-lg overflow-hidden">
                <div className="px-3 py-2 bg-zinc-50 border-b border-zinc-100 flex items-center gap-2">
                  <IconC size={14} />
                  <span className="text-sm font-medium">{channel.name} {channel.label}</span>
                </div>
                <div className="p-3">
                  <pre className="whitespace-pre-wrap text-sm font-sans text-zinc-700 mb-3">{posts[ch]}</pre>
                  <Button size="sm" onClick={() => handleCopy(ch)} variant={copied === ch ? 'success' : 'secondary'}>
                    {copied === ch ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

// ============================================
// STRATEGY VIEW
// ============================================

const StrategyView = ({ features, strategy, onUpdateStrategy }) => {
  return (
    <div className="max-w-[1000px] mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Content Strategy</h1>
          <p className="text-zinc-500">Data-backed recommendations based on {strategy.performance?.sampleSize || 0} posted features</p>
        </div>
        <Button variant="secondary" onClick={onUpdateStrategy}>
          <Icon name="refresh" size={16} />
          Refresh Analysis
        </Button>
      </div>
      
      {/* Focus Statement */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl p-6 text-white mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Icon name="target" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-xl mb-2">Current Focus</h2>
            <p className="text-orange-100 text-lg">{strategy.focus}</p>
            <p className="text-orange-200/80 text-sm mt-3">{strategy.rationale}</p>
          </div>
        </div>
      </div>
      
      {/* Metrics Grid */}
      {strategy.metrics?.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {strategy.metrics.map((m, i) => (
            <div key={i} className="bg-white rounded-xl border border-zinc-200 p-4">
              <div className="text-sm text-zinc-500 mb-1">{m.label}</div>
              <div className="text-2xl font-bold text-zinc-900">{m.value}</div>
              <div className={`text-sm font-medium mt-1 flex items-center gap-1 ${m.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                <Icon name={m.positive ? 'trendingUp' : 'trendingDown'} size={14} />
                {m.delta}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pending Queue Summary */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 mb-6">
        <h3 className="font-semibold text-zinc-900 mb-4">Content Queue</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-orange-600">{strategy.pendingCounts?.hero || 0}</div>
            <div className="text-sm text-orange-700 font-medium">Hero Features</div>
            <div className="text-xs text-orange-600/70 mt-1">Standalone posts</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">{strategy.pendingCounts?.standard || 0}</div>
            <div className="text-sm text-blue-700 font-medium">Standard</div>
            <div className="text-xs text-blue-600/70 mt-1">Regular announcements</div>
          </div>
          <div className="p-4 bg-zinc-100 rounded-lg text-center">
            <div className="text-3xl font-bold text-zinc-600">{strategy.pendingCounts?.bundle || 0}</div>
            <div className="text-sm text-zinc-700 font-medium">Bundle</div>
            <div className="text-xs text-zinc-500 mt-1">Combine in one post</div>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-zinc-100">
          <h3 className="font-semibold text-zinc-900">Recommendations</h3>
        </div>
        <div className="divide-y divide-zinc-100">
          {strategy.recommendations?.map((rec, i) => (
            <div key={i} className="px-5 py-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  rec.impact === 'high' ? 'bg-orange-100 text-orange-600' :
                  rec.impact === 'medium' ? 'bg-blue-100 text-blue-600' :
                  'bg-zinc-100 text-zinc-600'
                }`}>
                  <Icon name={
                    rec.type === 'classification' ? 'star' :
                    rec.type === 'category' ? 'layers' :
                    rec.type === 'action' ? 'zap' :
                    rec.type === 'bundle' ? 'package' :
                    rec.type === 'learning' ? 'lightbulb' : 'target'
                  } size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-zinc-900">{rec.text}</span>
                    <Badge color={rec.impact === 'high' ? 'orange' : rec.impact === 'medium' ? 'blue' : 'gray'} size="xs">
                      {rec.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-500">{rec.data}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Apply Strategy */}
      <div className="bg-zinc-900 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-lg">Apply This Strategy</h4>
            <p className="text-zinc-400 text-sm">All pending content will be regenerated following these recommendations</p>
          </div>
          <Button onClick={() => alert('Strategy applied! Regenerating content...')}>
            Apply to All Content
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// FEATURES VIEW
// ============================================

const FeaturesView = ({ features, setFeatures }) => {
  const [search, setSearch] = useState('');
  const [draggedId, setDraggedId] = useState(null);
  
  const filtered = useMemo(() => {
    let r = [...features];
    if (search) r = r.filter(f => f.title.toLowerCase().includes(search.toLowerCase()));
    return r;
  }, [features, search]);
  
  const handleDragStart = (id) => setDraggedId(id);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (targetId) => {
    if (!draggedId || draggedId === targetId) return;
    const draggedIdx = features.findIndex(f => f.id === draggedId);
    const targetIdx = features.findIndex(f => f.id === targetId);
    const newFeatures = [...features];
    const [dragged] = newFeatures.splice(draggedIdx, 1);
    newFeatures.splice(targetIdx, 0, dragged);
    setFeatures(newFeatures);
    setDraggedId(null);
  };
  
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Features</h1>
          <p className="text-zinc-500">Drag to reorder. Classification is automatic based on signals.</p>
        </div>
        <div className="relative">
          <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-zinc-50 border-b border-zinc-200 text-xs font-medium text-zinc-500 uppercase tracking-wide">
          <div className="col-span-1"></div>
          <div className="col-span-4">Feature</div>
          <div className="col-span-2">Classification</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Posted</div>
          <div className="col-span-1">Eng %</div>
        </div>
        
        {filtered.map(f => {
          const postedCount = Object.values(f.posted || {}).filter(Boolean).length;
          return (
            <div
              key={f.id}
              draggable
              onDragStart={() => handleDragStart(f.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(f.id)}
              className={`grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-100 items-center hover:bg-zinc-50 cursor-grab ${draggedId === f.id ? 'opacity-50 bg-orange-50' : ''}`}
            >
              <div className="col-span-1"><Icon name="gripVertical" size={16} className="text-zinc-300" /></div>
              <div className="col-span-4">
                <div className="font-medium text-zinc-900">{f.title}</div>
                <div className="text-xs text-zinc-400 truncate">{f.description}</div>
              </div>
              <div className="col-span-2">
                <Badge color={f.classification?.type === 'hero' ? 'orange' : f.classification?.type === 'bundle' ? 'gray' : 'blue'}>
                  {f.classification?.type === 'hero' ? '★ Hero' : f.classification?.type}
                </Badge>
              </div>
              <div className="col-span-2"><Badge color="gray">{f.category}</Badge></div>
              <div className="col-span-2 flex items-center gap-1">
                {Object.keys(CHANNELS).map(ch => {
                  const C = CHANNELS[ch].icon;
                  return <div key={ch} className={`w-6 h-6 rounded flex items-center justify-center ${f.posted?.[ch] ? 'bg-emerald-100' : 'bg-zinc-100'}`}><C size={12} className={f.posted?.[ch] ? 'text-emerald-600' : 'text-zinc-400'} /></div>;
                })}
              </div>
              <div className="col-span-1 text-sm font-medium text-zinc-600">{f.engagement?.engRate ? `${f.engagement.engRate}%` : '-'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// CALENDAR VIEW
// ============================================

const CalendarView = ({ features }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  
  // Generate scheduled posts from pending features
  const scheduledPosts = useMemo(() => {
    const posts = [];
    const pending = features.filter(f => !Object.values(f.posted || {}).some(Boolean));
    const heroes = pending.filter(f => f.classification?.type === 'hero');
    const standards = pending.filter(f => f.classification?.type === 'standard');
    const bundles = pending.filter(f => f.classification?.type === 'bundle');
    
    const today = new Date();
    let dayOffset = 1;
    
    // Find next Tue/Wed/Thu
    const getNextGoodDay = (offset) => {
      const d = new Date(today);
      d.setDate(d.getDate() + offset);
      while (![2, 3, 4].includes(d.getDay())) {
        d.setDate(d.getDate() + 1);
        offset++;
      }
      return { date: d, offset };
    };
    
    // Schedule heroes first (one per day, X in morning, LinkedIn at noon)
    heroes.forEach((f, i) => {
      const { date, offset } = getNextGoodDay(dayOffset + i * 2);
      const dateStr = date.toISOString().split('T')[0];
      posts.push({ id: `${f.id}_x`, feature: f, channel: 'founder_x', date: dateStr, time: '9:00 AM', type: 'hero' });
      posts.push({ id: `${f.id}_li`, feature: f, channel: 'founder_linkedin', date: dateStr, time: '12:00 PM', type: 'hero' });
      dayOffset = offset + 2;
    });
    
    // Schedule standards
    standards.forEach((f, i) => {
      const { date, offset } = getNextGoodDay(dayOffset + i);
      const dateStr = date.toISOString().split('T')[0];
      posts.push({ id: `${f.id}_x`, feature: f, channel: 'base44_x', date: dateStr, time: '10:00 AM', type: 'standard' });
      dayOffset = offset + 1;
    });
    
    // Bundle posts (combine 2-3 per post)
    if (bundles.length >= 2) {
      const { date } = getNextGoodDay(dayOffset);
      const dateStr = date.toISOString().split('T')[0];
      posts.push({ id: 'bundle_1', features: bundles, channel: 'founder_x', date: dateStr, time: '3:00 PM', type: 'bundle', title: `${bundles.length} Updates` });
    }
    
    return posts;
  }, [features]);
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);
    return days;
  };
  
  const getPostsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduledPosts.filter(p => p.date === dateStr);
  };
  
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };
  
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  const goToday = () => setCurrentDate(new Date());
  
  const selectedDayPosts = selectedDay ? getPostsForDay(selectedDay) : [];
  
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Content Calendar</h1>
          <p className="text-zinc-500">Auto-scheduled based on feature priority and optimal posting times</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={prevMonth}>
            <Icon name="chevronLeft" size={18} />
          </Button>
          <span className="font-semibold text-zinc-900 w-40 text-center">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <Icon name="chevronRight" size={18} />
          </Button>
          <Button variant="secondary" size="sm" onClick={goToday}>Today</Button>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-zinc-200 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 bg-zinc-50 border-b border-zinc-200">
            {days.map((day, i) => (
              <div 
                key={day} 
                className={`p-3 text-center text-xs font-semibold uppercase tracking-wide ${
                  [2, 3, 4].includes(i) ? 'text-orange-600 bg-orange-50/50' : 'text-zinc-500'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {getDaysInMonth().map((day, i) => {
              const posts = getPostsForDay(day);
              const today = isToday(day);
              const selected = selectedDay === day;
              
              return (
                <div
                  key={i}
                  onClick={() => day && setSelectedDay(day)}
                  className={`min-h-[100px] p-2 border-b border-r border-zinc-100 transition-colors cursor-pointer ${
                    !day ? 'bg-zinc-50' : 
                    today ? 'bg-orange-50' : 
                    selected ? 'bg-blue-50' :
                    'hover:bg-zinc-50'
                  }`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        today ? 'text-orange-600' : 'text-zinc-700'
                      }`}>
                        {day}
                        {today && <span className="ml-1 text-xs font-normal">(today)</span>}
                      </div>
                      
                      <div className="space-y-1">
                        {posts.slice(0, 3).map(post => {
                          const IconC = CHANNELS[post.channel]?.icon || XIcon;
                          return (
                            <div 
                              key={post.id}
                              className={`text-xs px-1.5 py-1 rounded flex items-center gap-1 truncate ${
                                post.type === 'hero' ? 'bg-orange-100 text-orange-700' :
                                post.type === 'bundle' ? 'bg-purple-100 text-purple-700' :
                                'bg-blue-100 text-blue-700'
                              }`}
                            >
                              <IconC size={10} />
                              <span className="truncate">{post.feature?.title?.slice(0, 12) || post.title}...</span>
                            </div>
                          );
                        })}
                        {posts.length > 3 && (
                          <div className="text-xs text-zinc-400 pl-1">+{posts.length - 3} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Sidebar - Selected Day Details */}
        <div className="lg:col-span-1 space-y-4">
          {/* Legend */}
          <div className="bg-white rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium text-zinc-900 text-sm mb-3">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-orange-100 border border-orange-200" />
                <span className="text-zinc-600">Hero feature</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
                <span className="text-zinc-600">Standard</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-purple-100 border border-purple-200" />
                <span className="text-zinc-600">Bundle</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-100">
              <div className="text-xs text-zinc-500">
                <span className="text-orange-600 font-medium">Tue/Wed/Thu</span> = optimal posting days
              </div>
            </div>
          </div>
          
          {/* Selected Day */}
          <div className="bg-white rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium text-zinc-900 text-sm mb-3">
              {selectedDay ? `${months[currentDate.getMonth()]} ${selectedDay}` : 'Select a day'}
            </h3>
            
            {selectedDayPosts.length > 0 ? (
              <div className="space-y-3">
                {selectedDayPosts.map(post => {
                  const IconC = CHANNELS[post.channel]?.icon || XIcon;
                  const channel = CHANNELS[post.channel];
                  return (
                    <div key={post.id} className="p-3 bg-zinc-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <IconC size={14} className="text-zinc-700" />
                        <span className="text-xs font-medium text-zinc-700">{channel?.name} {channel?.label}</span>
                        <span className="text-xs text-zinc-400 ml-auto">{post.time}</span>
                      </div>
                      <div className="text-sm font-medium text-zinc-900">
                        {post.feature?.title || post.title}
                      </div>
                      <Badge 
                        color={post.type === 'hero' ? 'orange' : post.type === 'bundle' ? 'purple' : 'blue'} 
                        size="xs"
                      >
                        {post.type}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-zinc-400">
                {selectedDay ? 'No posts scheduled' : 'Click a day to see details'}
              </p>
            )}
          </div>
          
          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium text-zinc-900 text-sm mb-3">This Month</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Scheduled</span>
                <span className="font-medium text-zinc-900">{scheduledPosts.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Hero posts</span>
                <span className="font-medium text-orange-600">{scheduledPosts.filter(p => p.type === 'hero').length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Standard</span>
                <span className="font-medium text-blue-600">{scheduledPosts.filter(p => p.type === 'standard').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// ANALYTICS VIEW
// ============================================

const AnalyticsView = ({ features }) => {
  const stats = useMemo(() => {
    const posted = features.filter(f => Object.values(f.posted || {}).some(Boolean) && f.engagement);
    const totalImp = posted.reduce((s, f) => s + (f.engagement?.impressions || 0), 0);
    const totalLikes = posted.reduce((s, f) => s + (f.engagement?.likes || 0), 0);
    const totalComments = posted.reduce((s, f) => s + (f.engagement?.comments || 0), 0);
    const totalShares = posted.reduce((s, f) => s + (f.engagement?.shares || 0), 0);
    const avgEng = posted.length > 0 ? (posted.reduce((s, f) => s + (f.engagement?.engRate || 0), 0) / posted.length).toFixed(2) : 0;
    
    const byClass = {};
    posted.forEach(f => {
      const cls = f.classification?.type || 'standard';
      if (!byClass[cls]) byClass[cls] = { count: 0, totalEng: 0 };
      byClass[cls].count++;
      byClass[cls].totalEng += f.engagement?.engRate || 0;
    });
    Object.keys(byClass).forEach(k => { byClass[k].avgEng = (byClass[k].totalEng / byClass[k].count).toFixed(2); });
    
    const topPosts = [...posted].sort((a, b) => (b.engagement?.engRate || 0) - (a.engagement?.engRate || 0)).slice(0, 5);
    
    return { totalImp, totalLikes, totalComments, totalShares, avgEng, byClass, topPosts, postedCount: posted.length };
  }, [features]);
  
  const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n;
  
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">Analytics</h1>
      
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Impressions', value: fmt(stats.totalImp), icon: 'eye' },
          { label: 'Likes', value: fmt(stats.totalLikes), icon: 'heart' },
          { label: 'Comments', value: fmt(stats.totalComments), icon: 'messageCircle' },
          { label: 'Shares', value: fmt(stats.totalShares), icon: 'share' },
          { label: 'Avg Engagement', value: `${stats.avgEng}%`, icon: 'trendingUp' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-zinc-200 p-4">
            <Icon name={s.icon} size={18} className="text-zinc-400 mb-2" />
            <div className="text-2xl font-bold text-zinc-900">{s.value}</div>
            <div className="text-xs text-zinc-500">{s.label}</div>
          </div>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-zinc-200 p-5">
          <h3 className="font-semibold text-zinc-900 mb-4">Engagement by Classification</h3>
          <div className="space-y-4">
            {Object.entries(stats.byClass).map(([cls, data]) => (
              <div key={cls}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-700 capitalize">{cls}</span>
                  <span className="text-sm font-bold text-zinc-900">{data.avgEng}%</span>
                </div>
                <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${cls === 'hero' ? 'bg-orange-500' : cls === 'standard' ? 'bg-blue-500' : 'bg-zinc-400'}`} style={{ width: `${Math.min(parseFloat(data.avgEng) * 20, 100)}%` }} />
                </div>
                <div className="text-xs text-zinc-400 mt-1">{data.count} posts</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-zinc-200 p-5">
          <h3 className="font-semibold text-zinc-900 mb-4">Top Performing</h3>
          <div className="space-y-3">
            {stats.topPosts.map((f, i) => (
              <div key={f.id} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
                <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-orange-500 text-white' : 'bg-zinc-200 text-zinc-600'}`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-zinc-900 text-sm truncate">{f.title}</div>
                  <div className="text-xs text-zinc-400">{f.classification?.type} • {f.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-600">{f.engagement?.engRate}%</div>
                  <div className="text-xs text-zinc-400">{fmt(f.engagement?.impressions || 0)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Platform Breakdown */}
      <div className="mt-6 bg-white rounded-xl border border-zinc-200 p-5">
        <h3 className="font-semibold text-zinc-900 mb-4">Platform Insights</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-zinc-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <XIcon size={18} className="text-zinc-900" />
              <span className="font-medium">X Best Practices</span>
            </div>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-start gap-2"><Icon name="check" size={14} className="text-emerald-500 mt-0.5" />Problem→Solution hooks: 4.2x avg engagement</li>
              <li className="flex items-start gap-2"><Icon name="check" size={14} className="text-emerald-500 mt-0.5" />Best time: Tue/Wed 9am EST</li>
              <li className="flex items-start gap-2"><Icon name="check" size={14} className="text-emerald-500 mt-0.5" />Optimal length: 200-250 characters</li>
            </ul>
          </div>
          <div className="p-4 bg-zinc-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <LinkedInIcon size={18} className="text-blue-600" />
              <span className="font-medium">LinkedIn Best Practices</span>
            </div>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-start gap-2"><Icon name="check" size={14} className="text-emerald-500 mt-0.5" />Market Insight hooks: 5.2x avg engagement</li>
              <li className="flex items-start gap-2"><Icon name="check" size={14} className="text-emerald-500 mt-0.5" />Best time: Tue/Wed 8am EST</li>
              <li className="flex items-start gap-2"><Icon name="check" size={14} className="text-emerald-500 mt-0.5" />Questions in posts: +34% comments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================

export default function ContentEngine() {
  const [started, setStarted] = useState(false);
  const [view, setView] = useState('compose');
  const [account, setAccount] = useState('founder');
  const [selectedId, setSelectedId] = useState(null);
  
  const [features, setFeatures] = useState(() => {
    try { 
      const s = localStorage.getItem('ce_features_v7'); 
      if (s) {
        const parsed = JSON.parse(s);
        return parsed.map(f => ({ ...f, classification: classifyFeature(f) }));
      }
      return CLASSIFIED_FEATURES;
    } catch { return CLASSIFIED_FEATURES; }
  });
  
  const [strategy, setStrategy] = useState(() => {
    const perf = analyzePerformanceData(CLASSIFIED_FEATURES);
    return generateStrategy(CLASSIFIED_FEATURES, perf);
  });
  
  useEffect(() => { 
    localStorage.setItem('ce_features_v7', JSON.stringify(features)); 
  }, [features]);
  
  useEffect(() => {
    const perf = analyzePerformanceData(features);
    setStrategy(generateStrategy(features, perf));
  }, [features]);
  
  // Listen for strategy view open
  useEffect(() => {
    const handler = () => setView('strategy');
    window.addEventListener('openStrategy', handler);
    return () => window.removeEventListener('openStrategy', handler);
  }, []);
  
  const handleMarkPosted = (fid, ch) => {
    setFeatures(features.map(f => f.id === fid ? { ...f, posted: { ...f.posted, [ch]: !f.posted?.[ch] } } : f));
  };
  
  const handleUpdateStrategy = () => {
    const perf = analyzePerformanceData(features);
    setStrategy(generateStrategy(features, perf));
  };
  
  if (!started) return <LandingPage onStart={() => setStarted(true)} />;
  
  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader view={view} setView={setView} account={account} setAccount={setAccount} />
      {view === 'compose' && <ComposeView features={features} selectedId={selectedId} setSelectedId={setSelectedId} account={account} onMarkPosted={handleMarkPosted} strategy={strategy} />}
      {view === 'strategy' && <StrategyView features={features} strategy={strategy} onUpdateStrategy={handleUpdateStrategy} />}
      {view === 'calendar' && <CalendarView features={features} />}
      {view === 'features' && <FeaturesView features={features} setFeatures={setFeatures} />}
      {view === 'analytics' && <AnalyticsView features={features} />}
    </div>
  );
}
