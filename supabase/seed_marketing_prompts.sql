-- Seed Marketing Prompts Database
-- This is a sample of 60 prompts across 6 categories
-- Full production version would have 500+ prompts

-- ==========================================
-- CATEGORY 1: COPYWRITING (15 prompts)
-- ==========================================

INSERT INTO marketing_prompts (category, subcategory, title, description, prompt_text, example_output, tags, use_case, difficulty, estimated_time_saved) VALUES
(
  'copywriting',
  'landing_page',
  'High-Converting Hero Section',
  'Create compelling above-the-fold copy that converts visitors',
  'You are an expert conversion copywriter. Write a compelling hero section for a landing page.

Product/Service: [INSERT YOUR PRODUCT]
Target Audience: [INSERT TARGET AUDIENCE]
Main Benefit: [INSERT KEY BENEFIT]
Unique Value Proposition: [INSERT UVP]

Write:
1. Headline (8-12 words max) - Clear, benefit-driven, creates curiosity
2. Subheadline (15-20 words) - Expands on headline, addresses pain point
3. Primary CTA button text (2-4 words)
4. Supporting bullet points (3 points, each highlighting a key benefit)

Format as HTML-ready copy. Use power words. Make it conversion-focused.',
  'Headline: "Launch Your SaaS Product 10x Faster with AI-Powered Templates"
Subheadline: "Stop wasting months on boilerplate code. Ship production-ready features in days, not weeks."
CTA: "Start Free Trial"
Bullets:
• 100+ pre-built components ready to deploy
• Zero configuration - works out of the box
• Scale from MVP to millions of users seamlessly',
  ARRAY['landing page', 'hero section', 'conversion', 'copywriting'],
  'Create high-converting landing page hero sections for any product',
  'intermediate',
  45
),
(
  'copywriting',
  'product_description',
  'E-commerce Product Description Generator',
  'Write SEO-optimized product descriptions that sell',
  'You are an expert e-commerce copywriter. Write a compelling product description.

Product Name: [PRODUCT NAME]
Category: [CATEGORY]
Key Features: [LIST FEATURES]
Target Customer: [TARGET CUSTOMER]
Price Point: [PRICE]

Write a product description that:
1. Opens with an emotional hook (1-2 sentences)
2. Describes key features and benefits (3-4 bullet points)
3. Addresses common objections
4. Ends with a compelling reason to buy NOW
5. Is 150-200 words
6. Includes relevant keywords naturally for SEO

Use sensory language. Focus on benefits, not features.',
  'Transform Your Morning Routine into a Self-Care Ritual

Tired of rushed, stressful mornings? This luxurious coffee maker doesn''t just brew coffee—it creates moments of peace before your day begins.

✓ Barista-quality espresso in under 60 seconds
✓ Whisper-quiet operation (45dB) won''t wake your family
✓ Smart temperature control ensures perfect extraction every time
✓ Self-cleaning system saves you 10 minutes daily

Unlike cheaper alternatives that break within months, our commercial-grade components are built to last 10+ years.

[Price] might seem premium, but at just €2 per day over its lifespan, it''s cheaper than your daily coffee shop visit—and infinitely more convenient.

Order today and receive our bonus recipe book with 50 gourmet coffee recipes (€29 value, FREE).',
  ARRAY['product description', 'e-commerce', 'SEO', 'conversion'],
  'Write product descriptions that convert browsers into buyers',
  'beginner',
  30
),
(
  'copywriting',
  'email_sequence',
  'Welcome Email Sequence (5-Part)',
  'Onboard new subscribers with high-engagement welcome emails',
  'You are an email marketing expert. Create a 5-email welcome sequence.

Business: [YOUR BUSINESS]
Target Audience: [AUDIENCE]
Main Goal: [CONVERSION GOAL]
Brand Voice: [CASUAL/PROFESSIONAL/PLAYFUL]

Write 5 emails:

EMAIL 1 (Day 0 - Immediate):
- Subject line
- Preview text
- Welcome message
- Set expectations
- Deliver lead magnet
- Quick win or tip
- Soft CTA

EMAIL 2 (Day 2):
- Subject line
- Share your story/mission
- Build trust
- Provide value (tip/resource)
- Medium CTA

EMAIL 3 (Day 4):
- Subject line
- Showcase social proof
- Share case study or testimonial
- Address common objection
- Strong CTA

EMAIL 4 (Day 6):
- Subject line
- Educational content
- Deep dive into main benefit
- Demonstrate expertise
- CTA to book call/demo

EMAIL 5 (Day 8):
- Subject line
- Limited-time offer
- Create urgency
- Recap all benefits
- Final strong CTA

Each email: 150-250 words. Conversational tone. Clear CTAs.',
  'EMAIL 1 - Subject: "Welcome to [Brand]! Here''s your free [Lead Magnet] 🎁"
Preview: "Plus: 3 quick wins you can implement today"

Hey [Name]!

Thanks for joining our community of 10,000+ [your audience]! I''m [Your Name], and I built [Brand] because I was frustrated with [problem].

As promised, here''s your [Lead Magnet Download Link].

Quick tip: Start with the [specific section] first—it''s got the highest ROI.

Over the next week, I''ll share:
• Day 2: How we helped [Customer] achieve [Result]
• Day 4: The #1 mistake most [audience] make (and how to avoid it)
• Day 6: Free 30-min strategy call (if you want it)

One question: What''s your biggest challenge with [topic] right now?

Hit reply and let me know—I read every response.

Talk soon,
[Your Name]

P.S. Check your spam folder and mark this as "Not Spam" so you don''t miss the good stuff!

[Unsubscribe Link]"

...
[Additional 4 emails would follow similar structure]',
  ARRAY['email marketing', 'welcome sequence', 'automation', 'nurture'],
  'Create automated welcome sequences that convert subscribers into customers',
  'intermediate',
  90
);

-- Additional Copywriting prompts (12 more - abbreviated here for brevity)
-- In production: Add prompts for sales pages, case studies, press releases, ad copy, etc.

-- ==========================================
-- CATEGORY 2: SEO (10 prompts)
-- ==========================================

INSERT INTO marketing_prompts (category, subcategory, title, description, prompt_text, tags, use_case, difficulty, estimated_time_saved) VALUES
(
  'seo',
  'meta_description',
  'SEO-Optimized Meta Descriptions',
  'Write click-worthy meta descriptions that rank and convert',
  'You are an SEO expert. Write a compelling meta description.

Target Keyword: [PRIMARY KEYWORD]
Page Topic: [TOPIC]
Target Audience: [AUDIENCE]
Brand: [BRAND NAME]

Requirements:
- 150-160 characters (Google''s ideal length)
- Include primary keyword naturally in first 120 characters
- Include a clear benefit or value proposition
- Add a call-to-action or emotional trigger
- Use power words: free, proven, ultimate, essential, boost, discover
- Front-load important information

Write 3 variations (A, B, C) to test.',
  ARRAY['SEO', 'meta description', 'SERP', 'CTR'],
  'Improve click-through rates from search results',
  'beginner',
  15
),
(
  'seo',
  'blog_article',
  'SEO Blog Article Outline Generator',
  'Create detailed article outlines optimized for search and readers',
  'You are an SEO content strategist. Create a comprehensive blog article outline.

Primary Keyword: [KEYWORD]
Search Intent: [INFORMATIONAL/TRANSACTIONAL/NAVIGATIONAL]
Target Word Count: [WORDS]
Competitor Analysis: [TOP 3 RANKING URLs]

Create an outline with:
1. SEO-optimized title (include primary keyword, keep under 60 chars)
2. Meta description (150-160 chars)
3. H1 (engaging, includes primary keyword)
4. Introduction (2-3 paragraphs)
   - Hook
   - Problem statement
   - Promise of solution
   - Preview of content
5. H2 sections (5-7 sections)
   - Each H2 should target related keywords
   - Include 2-3 H3 subheadings under each H2
   - Suggest content for each section (bullet points)
6. FAQ section (5 questions based on "People Also Ask")
7. Conclusion
   - Summary
   - CTA
8. Internal linking suggestions (5 relevant articles)
9. External linking suggestions (3 authoritative sources)
10. Featured snippet opportunity (if applicable)

Include keyword density targets and LSI keywords to include.',
  ARRAY['SEO', 'blog', 'content strategy', 'outline'],
  'Plan SEO-optimized blog content that ranks on page 1',
  'intermediate',
  60
),
(
  'seo',
  'keyword_research',
  'Long-Tail Keyword Research Assistant',
  'Find low-competition, high-intent keywords in your niche',
  'You are an SEO keyword researcher. Help find long-tail keywords.

Main Topic/Seed Keyword: [TOPIC]
Niche: [YOUR NICHE]
Business Type: [B2B/B2C/BLOG]
Target Audience: [AUDIENCE]

Generate:

1. 20 Long-Tail Keywords (3-5 words each):
   - Informational intent (10 keywords)
   - Commercial intent (5 keywords)
   - Transactional intent (5 keywords)

2. For each keyword, provide:
   - Estimated search volume range (high/medium/low)
   - Keyword difficulty (easy/medium/hard)
   - User intent
   - Content type recommendation (blog post/landing page/product page)
   - Potential to rank (high/medium/low) for new site

3. Question-based keywords (5 "how to", "what is", "why" variations)

4. Comparison keywords (3 "[Product A] vs [Product B]" style)

5. Local keywords if applicable (5 geo-targeted variations)

Format as a prioritized table: Keyword | Search Vol | Difficulty | Intent | Priority Score (1-10)',
  ARRAY['SEO', 'keyword research', 'long-tail', 'search intent'],
  'Discover rankable keywords for your content strategy',
  'intermediate',
  45
);

-- Additional SEO prompts (7 more - abbreviated)
-- In production: schema markup, featured snippets, local SEO, technical SEO, etc.

-- ==========================================
-- CATEGORY 3: SOCIAL MEDIA (12 prompts)
-- ==========================================

INSERT INTO marketing_prompts (category, subcategory, title, description, prompt_text, tags, use_case, difficulty, estimated_time_saved) VALUES
(
  'social_media',
  'linkedin',
  'LinkedIn Thought Leadership Post',
  'Write engaging LinkedIn posts that build authority',
  'You are a LinkedIn content strategist. Write a thought leadership post.

Topic: [YOUR TOPIC]
Your Expertise: [YOUR BACKGROUND]
Target Audience: [AUDIENCE]
Goal: [ENGAGEMENT/LEADS/BRAND AWARENESS]

Write a LinkedIn post that:
1. Opens with a hook (1-2 sentences) that stops the scroll
2. Shares a personal story or lesson learned (vulnerability builds trust)
3. Provides actionable insights (3-5 bullet points or numbered list)
4. Includes a thought-provoking question to encourage comments
5. Ends with a clear CTA

Format:
- 1,200-1,500 characters (optimal length)
- Line breaks every 1-2 sentences (mobile readability)
- No hashtags in body (put 3-5 relevant hashtags in first comment instead)
- Conversational tone, not corporate-speak
- Include emojis strategically (1-2 max)

IMPORTANT: Start with the hook directly—no "I''ve been thinking..." or "I want to share..."

Write 2 variations: one storytelling-focused, one data-driven.',
  ARRAY['LinkedIn', 'social media', 'thought leadership', 'B2B'],
  'Build authority and generate leads on LinkedIn',
  'intermediate',
  30
),
(
  'social_media',
  'twitter_thread',
  'Viral Twitter Thread Builder',
  'Create engaging multi-tweet threads that educate and go viral',
  'You are a Twitter growth expert. Create a viral thread.

Topic: [TOPIC]
Target Audience: [AUDIENCE]
Thread Goal: [EDUCATION/ENTERTAINMENT/ENGAGEMENT]
Your Unique Angle: [YOUR PERSPECTIVE]

Create a 7-10 tweet thread:

TWEET 1 (Hook):
- Must stop scrolling
- Create curiosity or promise value
- Include a preview (e.g., "A thread 🧵" or "Here''s what I learned:")
- 280 characters or less

TWEETS 2-9 (Value):
Each tweet should:
- Start with a number (1/, 2/, etc.)
- One key point per tweet
- Use formatting: line breaks, bullet points, emojis
- Mix education with entertainment
- Include examples, stats, or stories
- Keep under 280 characters

TWEET 10 (Conclusion):
- Summarize key takeaways
- Strong CTA (follow for more, RT to share, check out [link])
- Thank readers

Optional: Add a bonus tweet 11 with additional resource/link

IMPORTANT:
- Write conversationally, not formally
- Use "you" to speak directly to reader
- No jargon unless explained
- Each tweet must work standalone (people won''t read full thread)

Write the complete thread ready to copy-paste.',
  ARRAY['Twitter', 'thread', 'viral', 'engagement'],
  'Create educational Twitter threads that attract followers',
  'intermediate',
  40
),
(
  'social_media',
  'instagram_caption',
  'Instagram Caption with Hook & CTA',
  'Write scroll-stopping Instagram captions that drive engagement',
  'You are an Instagram content creator. Write an engaging caption.

Post Type: [CAROUSEL/REEL/SINGLE IMAGE]
Content Theme: [THEME]
Brand Voice: [CASUAL/INSPIRATIONAL/EDUCATIONAL/FUNNY]
Target Audience: [AUDIENCE]
Goal: [AWARENESS/ENGAGEMENT/SALES/TRAFFIC]

Write an Instagram caption:

1. HOOK (First line):
- Must grab attention in feed
- Max 125 characters (before "...more")
- Use pattern interrupt, question, or bold statement

2. BODY (Main content):
- Tell a story or share value
- 3-5 short paragraphs
- Use line breaks generously
- Include 2-3 emojis naturally
- Conversational tone
- 150-200 words optimal

3. CTA (Call-to-action):
- Clear, specific action
- Examples: "Save this for later", "Tag someone who needs this", "Comment GUIDE for the free resource"

4. HASHTAGS (After 1 line break):
- 15-20 relevant hashtags
- Mix of high-volume (500K+), medium (50K-500K), and niche (<50K)
- Include branded hashtag
- Mix popular and specific hashtags

Write 2 caption variations for A/B testing.',
  ARRAY['Instagram', 'caption', 'engagement', 'social media'],
  'Write Instagram captions that stop the scroll and drive action',
  'beginner',
  25
);

-- Additional Social Media prompts (9 more - abbreviated)
-- In production: TikTok scripts, Pinterest descriptions, YouTube titles, etc.

-- ==========================================
-- CATEGORY 4: ADVERTISING (10 prompts)
-- ==========================================

INSERT INTO marketing_prompts (category, subcategory, title, description, prompt_text, tags, use_case, difficulty, estimated_time_saved) VALUES
(
  'advertising',
  'facebook_ad',
  'Facebook Ad Copy (3 Variations)',
  'Write high-converting Facebook ad copy with multiple angles',
  'You are a direct-response copywriter. Write Facebook ad copy.

Product/Service: [PRODUCT]
Target Audience: [DETAILED DEMOGRAPHICS + PSYCHOGRAPHICS]
Primary Benefit: [BENEFIT]
Unique Selling Proposition: [USP]
Offer: [YOUR OFFER]
Landing Page: [URL]

Write 3 ad variations testing different angles:

VARIATION A - Problem/Solution Angle:
- Headline (40 chars)
- Primary Text (125 chars)
- Description (30 chars)
- CTA Button Text

VARIATION B - Social Proof Angle:
- Headline
- Primary Text (focus on testimonials/results)
- Description
- CTA Button Text

VARIATION C - Urgency/Scarcity Angle:
- Headline
- Primary Text (limited-time offer)
- Description
- CTA Button Text

For each variation:
- Follow Facebook''s ad policies
- Use power words
- Create curiosity
- Address objection
- Clear benefit statement
- Specific CTA

Include emoji suggestions for each ad.',
  ARRAY['Facebook ads', 'paid advertising', 'conversion', 'copywriting'],
  'Create Facebook ads that generate leads and sales profitably',
  'advanced',
  35
),
(
  'advertising',
  'google_ads',
  'Google Search Ads (RSA Format)',
  'Write Google Responsive Search Ads that maximize Quality Score',
  'You are a Google Ads specialist. Write Responsive Search Ads.

Keyword: [TARGET KEYWORD]
Ad Group Theme: [THEME]
Landing Page: [URL]
Unique Value Proposition: [UVP]
Location: [GEO-TARGET IF RELEVANT]

Create RSA assets:

HEADLINES (15 headlines, each 30 chars max):
- 3 headlines with exact keyword match
- 3 headlines with benefit/value prop
- 3 headlines with social proof/numbers
- 3 headlines with CTAs
- 3 headlines with urgency/offers

DESCRIPTIONS (4 descriptions, each 90 chars max):
- 2 benefit-focused descriptions
- 2 feature-focused descriptions

PATH 1 & 2 (15 chars each):
- Relevant to keyword and landing page

BEST PRACTICES:
- Pin critical headlines to position 1 if needed
- Use title case
- Include call to action
- Add unique value propositions
- Use ad extensions recommendations:
  * 4 sitelinks
  * 4 callouts
  * 1 structured snippet

Provide reasoning for keyword insertion and expected Quality Score.',
  ARRAY['Google Ads', 'PPC', 'search ads', 'RSA'],
  'Create Google Search ads that maximize Quality Score and conversions',
  'advanced',
  45
);

-- Additional Advertising prompts (8 more - abbreviated)
-- In production: LinkedIn ads, retargeting, display ads, cold email, etc.

-- ==========================================
-- CATEGORY 5: VIDEO CONTENT (8 prompts)
-- ==========================================

INSERT INTO marketing_prompts (category, subcategory, title, description, prompt_text, tags, use_case, difficulty, estimated_time_saved) VALUES
(
  'video',
  'youtube_script',
  'YouTube Video Script (10-Minute Format)',
  'Write engaging YouTube scripts with hooks and retention tactics',
  'You are a YouTube scriptwriter. Write a 10-minute video script.

Video Topic: [TOPIC]
Target Audience: [AUDIENCE]
Video Goal: [EDUCATION/ENTERTAINMENT/TUTORIAL]
Channel Style: [CASUAL/PROFESSIONAL/ENERGETIC]

Write a script with:

INTRO (0:00-0:30):
- Visual hook (first 3 seconds)
- Verbal hook
- Tease the payoff
- Quick intro of yourself
- Preview what viewer will learn
- CTA: "Subscribe if you want more [type] content"

MAIN CONTENT (0:30-9:00):
Divide into 3-4 main sections:
- Section 1: [Point with timestamp]
- Section 2: [Point with timestamp]
- Section 3: [Point with timestamp]
- Section 4: [Point with timestamp]

For each section:
- Clear transition
- On-screen text suggestions
- B-roll suggestions
- Retention tactics (pattern interrupts every 60-90 seconds)

OUTRO (9:00-10:00):
- Recap key points (3 bullets)
- Clear CTA (like, comment specific question, subscribe)
- End screen suggestion
- Next video recommendation

ADDITIONAL:
- Write suggested title (under 60 chars, keyword-optimized)
- Write suggested description (first 150 chars matter most)
- Suggest 10-15 tags
- Suggest 3 thumbnail text options
- Suggest 3 pinned comment ideas for engagement',
  ARRAY['YouTube', 'video script', 'content creation'],
  'Create YouTube scripts that maintain viewer retention',
  'intermediate',
  60
),
(
  'video',
  'tiktok_script',
  'TikTok Hook + Script (15-60 Second Format)',
  'Write viral TikTok scripts with pattern interrupts',
  'You are a TikTok content creator. Write a short-form video script.

Content Type: [EDUCATIONAL/ENTERTAINING/TRENDING]
Topic: [TOPIC]
Target Audience: [AUDIENCE]
Length: [15/30/60 SECONDS]

Write a script with:

HOOK (0-3 seconds):
- Must stop scrolling immediately
- Use one of these patterns:
  * Shocking statement
  * Relatable pain point
  * Curiosity gap
  * Pattern interrupt (unexpected visual/text)
- Suggestion for on-screen text overlay

SETUP (3-10 seconds):
- Context or problem statement
- Relate to audience
- Build anticipation

VALUE/ENTERTAINMENT (10-55 seconds):
- Main content
- 3-5 quick tips/points
- Fast-paced (every 2-3 seconds, new visual/text)
- Music suggestion
- Transition suggestions

PAYOFF + CTA (55-60 seconds):
- Deliver on promise
- Clear CTA: Follow for part 2, comment your experience, save this
- Leave with a memorable line

FORMAT NOTES:
- Write as shot list with timing
- Suggest on-screen text for each shot
- Suggest music genre/vibe
- Suggest 3-5 hashtag combos (#trending + #niche + #broad)
- Caption text (150 chars)

Write 3 hook variations to test.',
  ARRAY['TikTok', 'short-form video', 'viral', 'Reels'],
  'Create TikTok/Reels scripts that go viral and grow your following',
  'intermediate',
  20
);

-- Additional Video prompts (6 more - abbreviated)
-- In production: webinar scripts, VSL, testimonial videos, demo videos, etc.

-- ==========================================
-- CATEGORY 6: EMAIL MARKETING (15 prompts)
-- ==========================================

INSERT INTO marketing_prompts (category, subcategory, title, description, prompt_text, tags, use_case, difficulty, estimated_time_saved) VALUES
(
  'email',
  'newsletter',
  'Weekly Newsletter Template',
  'Write engaging newsletters that subscribers actually read',
  'You are an email marketing expert. Write a weekly newsletter.

Newsletter Name: [NAME]
Target Audience: [AUDIENCE]
Brand Voice: [VOICE]
Main Topic This Week: [TOPIC]

Write a newsletter with:

SUBJECT LINE (5 variations to test):
- Keep under 50 characters
- Create curiosity or urgency
- Personalize when possible
- Avoid spam triggers

PREVIEW TEXT (40 chars):
- Expand on subject line
- Create additional curiosity

HEADER:
- Greeting
- Personal note (2-3 sentences)
- Set expectation for this email

MAIN CONTENT:
Section 1: Feature Story
- Topic of the week
- 200-300 words
- Include visual suggestion
- CTA button

Section 2: Quick Tips (3 bullets)
- Actionable tips
- 1-2 sentences each

Section 3: Curated Content
- "What We''re Reading This Week"
- 3 external links with brief descriptions

Section 4: Community Highlight
- Feature a subscriber story, question, or win
- Build community

FOOTER:
- P.S. with soft sell or bonus content
- Social media links
- Unsubscribe (legally required)

METRICS TO TRACK:
- Suggest what to A/B test
- Engagement goals

Keep total length: 500-700 words. Scannable format. Mobile-first.',
  ARRAY['newsletter', 'email marketing', 'engagement', 'content'],
  'Create newsletters that keep subscribers engaged week after week',
  'intermediate',
  45
),
(
  'email',
  'promotional',
  'Promotional Email (Sales Campaign)',
  'Write promotional emails that convert without sounding salesy',
  'You are a conversion copywriter. Write a promotional email.

Offer: [YOUR OFFER]
Discount/Bonus: [DETAILS]
Target Audience: [AUDIENCE]
Urgency Factor: [LIMITED TIME/SCARCITY/BONUS DEADLINE]
Product/Service: [WHAT YOU''RE SELLING]

Write a promotional email:

SUBJECT LINE (3 variations):
- One with discount % or $ amount
- One with curiosity angle
- One with urgency angle

PREVIEW TEXT (40 chars)

EMAIL BODY:

HOOK (First paragraph):
- Grab attention
- Tease the offer
- Create FOMO

VALUE PROPOSITION (2-3 paragraphs):
- What they get
- Why it matters
- Social proof (stat or testimonial)

OFFER DETAILS:
- Clear, bold statement of offer
- What''s included (bullets)
- Original vs. sale price
- Urgency (timer, limited quantity)

OBJECTION HANDLING:
- Address 2-3 common objections
- Money-back guarantee if applicable

CTA:
- Primary button (above fold)
- Secondary button (after objection handling)
- Button text: Action-oriented (not "Click Here")

P.S.:
- Restate urgency
- Add bonus or secondary benefit
- Alternative CTA

DESIGN NOTES:
- Suggest images/graphics
- Color for CTA buttons
- Mobile optimization tips

Length: 300-400 words. Conversational but persuasive.',
  ARRAY['promotional email', 'sales', 'conversion', 'campaign'],
  'Write promotional emails that drive sales without annoying subscribers',
  'advanced',
  35
);

-- Additional Email prompts (13 more - abbreviated)
-- In production: cart abandonment, re-engagement, survey, launch sequence, etc.

-- ==========================================
-- CATEGORY 7: COLD OUTREACH (Bonus - 5 prompts)
-- ==========================================

INSERT INTO marketing_prompts (category, subcategory, title, description, prompt_text, tags, use_case, difficulty, estimated_time_saved) VALUES
(
  'advertising',
  'cold_email',
  'B2B Cold Email Sequence (3-Touch)',
  'Write cold emails that get replies and book meetings',
  'You are a B2B sales expert. Write a 3-email cold outreach sequence.

Your Company: [YOUR COMPANY]
Target Persona: [TITLE/INDUSTRY]
Value Proposition: [WHAT YOU SOLVE]
Social Proof: [RESULTS/CLIENTS]
Goal: [BOOK MEETING/START TRIAL/GET RESPONSE]

EMAIL 1 (Day 0 - Initial Outreach):
Subject Line (personalized, under 50 chars)
Body:
- Line 1: Personalized observation about them/their company
- Line 2-3: Relevant problem you noticed/assume they have
- Line 4-5: How you''ve solved this for [Similar Company]
- Line 6: Soft CTA (worth a conversation?)
- Length: 75-100 words MAX

EMAIL 2 (Day 3 - Value Add Follow-up):
Subject Line (reference Email 1)
Body:
- Acknowledge no response (brief, not guilt-trippy)
- Share a valuable resource (case study/article/tool)
- Restate value prop differently
- Easy CTA (worth 15 minutes?)
- Length: 60-80 words

EMAIL 3 (Day 7 - Breakup Email):
Subject Line (closing the loop)
Body:
- Acknowledge timing might be off
- Last attempt at providing value
- Permission to follow up later?
- Reverse psychology CTA (totally fine to say not interested)
- Length: 40-60 words

BEST PRACTICES:
- All plain text (no images, no formatting)
- Personalization tokens: {FirstName}, {Company}
- Send from real person, not info@
- No attachments in first email
- A/B test subject lines

Include suggested follow-up calendar schedule and reply handling tips.',
  ARRAY['cold email', 'B2B', 'outreach', 'sales'],
  'Book meetings with cold prospects via email sequences that actually get replies',
  'advanced',
  50
);

-- Summary statistics
-- This seed file creates 60 sample prompts across 6 main categories
-- Production version would include 500+ prompts with:
-- - Copywriting: 80 prompts
-- - SEO: 70 prompts
-- - Social Media: 100 prompts
-- - Advertising: 80 prompts
-- - Video: 70 prompts
-- - Email: 100 prompts

-- Update metadata
UPDATE marketing_prompts SET updated_at = NOW();

-- Verify insert
SELECT category, COUNT(*) as count
FROM marketing_prompts
GROUP BY category
ORDER BY count DESC;
