---
title: "Migrating from Gatsby to Astro in 90 Minutes with Claude Code CLI"
description: "How I rewrote my 8-year-old Gatsby blog as a brutalist Astro site in one afternoon using Claude Code - and loved every minute of it."
date: "2026-01-15T07:30:00+10:00"
published: true
---

*How I rewrote my 8-year-old Gatsby blog as a brutalist Astro site in one afternoon using Claude Code - and loved every minute of it.*

---

It took me 8 years to migrate away from Gatsby. It took Claude 90 minutes.

I've been running a Gatsby blog since 2018. It's served me well, but somewhere along the way it became over-engineered for what it was: a simple blog with four posts. GraphQL queries for markdown files. A plugin ecosystem that grew with each Gatsby release. Build times that crept up. The complexity-to-value ratio was way off.

I wanted something simpler. Something that shipped zero JavaScript by default. Something I could read and understand every line of code. Something that felt honest and direct.

After celebrating 30 years in digital marketing by leaving the industry and starting a gardening business, I wanted my website to reflect that shift: bold, unpolished, unapologetic. A brutalist redesign to mark a new chapter.

Enter Astro. And more importantly, enter Claude Code CLI.

## Why I Left Gatsby

Let me be clear: **Gatsby isn't bad**. It's an excellent framework that does exactly what it says on the tin. The problem wasn't Gatsby - it was that I'd used a Ferrari to drive to the corner shop.

For a simple blog with four posts, I had:
- A GraphQL layer to query markdown files I could just... read
- A `gatsby-node.js` file with page creation logic
- 30+ second builds
- PWA features and offline support I didn't need
- Plugin dependencies for everything: sitemap, RSS, syntax highlighting, typography

Every Gatsby update meant checking plugin compatibility. Every build meant waiting. Every new feature meant learning more GraphQL.

I wanted:
- **Zero-JS by default** - only ship JavaScript when needed
- **Fast builds** - preferably under a second
- **Simpler mental model** - read a file, render a page
- **Direct content queries** - Content Collections, not GraphQL
- **A fresh design** - brutalist aesthetic to match my career pivot

## Why Astro (and Why with Claude)

I'd had success with Astro before. I'd migrated [kpcentre.com.au](https://www.kpcentre.com.au) from an ancient WordPress site to Astro using Claude Code CLI, and it went brilliantly. The Content Collections system felt natural. The component model made sense. The zero-JS default aligned with my web performance obsession.

But here's the thing: **I didn't want to just migrate the content**. I wanted a complete redesign. A brutalist aesthetic that would take me hours to design solo - choosing fonts, building a design system, writing CSS, creating components.

That's where Claude Code CLI changed everything.

Instead of spending days on the migration, I spent 90 minutes in conversation. I provided the vision ("brutalist design, simple blog, preserve URLs"), and Claude handled the implementation. Not just the migration - the **entire design system**.

This wasn't "AI replaced me." This was "AI amplified me." I got to focus on the creative decisions while Claude handled the tedious bits: setting up configs, migrating frontmatter, building components, writing CSS.

## The 90-Minute Migration

On January 14, 2026, at 20:23, I started a Claude Code session and asked: "I'm thinking about refactoring this website to Astro SSG, what do you think?"

By 21:52, I had a complete Astro 5 blog with a brutalist redesign. **21 files changed, 1,788 insertions.** Everything worked first try.

Here's what Claude did in those 90 minutes:

### 1. Scaffolded a Fresh Astro 5 Project
```bash
npm create astro@latest userhatblog-astro -- --template minimal --typescript strict
```

Minimal template. No bloat. TypeScript strict mode for type safety.

### 2. Configured the Essentials

**astro.config.mjs**:
```javascript
export default defineConfig({
  site: 'https://www.userhat.com',
  trailingSlash: 'always',  // Preserve SEO - match Gatsby URLs
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-dark', wrap: true },
    remarkPlugins: [smartypants],
  },
});
```

Three dependencies: sitemap, RSS, smartypants. That's it. No plugin sprawl.

### 3. Migrated Content to Collections

The Gatsby blog used folder-based markdown (`src/pages/*/index.md`). Claude converted this to Astro's Content Collections with a type-safe schema:

```typescript
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    published: z.boolean().default(true),
  }),
});
```

No more GraphQL queries. Just this:

```typescript
const posts = await getCollection('blog', ({ data }) => {
  return data.published !== false;
});
```

Clean. Type-safe. Readable.

### 4. Built a Brutalist Design System from Scratch

This is where Claude's design sense impressed me. I said "brutalist," and Claude delivered:

- **Typography**: Space Grotesk for headings, Inter for body, JetBrains Mono for code
- **Modular scale**: 1.414 (augmented fourth) - mathematically harmonious
- **Borders**: Chunky 3px-8px borders everywhere
- **Colours**: Pure black, white, shocking red (#FF0000), electric yellow (#FFFF00)
- **Asymmetry**: Rotated logo, offset elements, high contrast

**global.css** - CSS custom properties, no Tailwind:
```css
:root {
  --colour-black: #000000;
  --colour-white: #FFFFFF;
  --colour-accent-primary: #FF0000;
  --border-chunky: 8px;
  --text-4xl: 5.653rem;
  --space-8: 4rem;
}
```

Every design decision documented. Every variable semantic. I could read it, understand it, tweak it.

### 5. Created All the Components

- **BaseLayout.astro** - HTML shell with SEO meta tags and Google Analytics
- **Layout.astro** - Header with rotated logo on yellow background
- **Bio.astro** - Author bio
- **PostList.astro** - Chronological post listing
- **PostNav.astro** - Previous/next navigation

Dynamic routing with prev/next logic in `[slug].astro`:
```typescript
const sortedPosts = posts.sort((a, b) =>
  b.data.date.valueOf() - a.data.date.valueOf()
);
const prev = index === sortedPosts.length - 1 ? null : sortedPosts[index + 1];
const next = index === 0 ? null : sortedPosts[index - 1];
```

### 6. Implemented RSS Feed

**rss.xml.ts** - simpler than Gatsby's RSS plugin:
```typescript
export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.published !== false;
  });

  return rss({
    title: 'User Hat Blog RSS Feed',
    description: 'A blog exploring my interest in Usability and Search Engine Visibility.',
    site: context.site || 'https://www.userhat.com',
    items: sortedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.slug}/`,
    })),
  });
}
```

No plugins. Just code.

### 7. Configured Netlify Deployment

**netlify.toml** with trailing slash redirects and security headers. Ready to deploy.

At 21:52, Claude committed everything. I ran `npm run build`. **It worked.** First try. No errors. No tweaking.

## The Brutalist Design System

Claude made design choices I wouldn't have had the confidence to make.

**Chunky borders everywhere**. Not subtle 1px borders - thick 5px-8px borders that demand attention.

**Pure primary colours**. Not "brand red" (#E53E3E) - shocking red (#FF0000). Not "accent yellow" (#F6E05E) - high-vis yellow (#FFFF00).

**Asymmetry**. The logo container is rotated -2 degrees on a yellow background. Tables have zebra striping. Code blocks have thick borders. Nothing is centred unless it needs to be.

**Typography hierarchy**. The modular scale (1.414) creates mathematical harmony:
- h1: 5.653rem (90px)
- h2: 4rem (64px)
- h3: 2.827rem (45px)
- Body: 1rem (16px)

It's bold. It's honest. It's unapologetic. It's perfect for a blog about leaving a 30-year career to start a gardening business.

### The Occasional Hiccup

I should mention: **Claude isn't perfect**. On other projects where I've used Tailwind CSS, Claude sometimes gets confused and creates white text on white buttons. It happens. You spot it, you fix it, you move on.

But on this project? **Zero hiccups.** Why? Because we used pure CSS custom properties instead of Tailwind. Claude excels at structured, semantic CSS. The design system worked flawlessly from the first commit.

## What I Learned

### Speed Matters

90 minutes vs days/weeks solo. That's the difference between "I should migrate eventually" and "it's done, what's next?"

### Design Confidence

Claude makes bold choices I wouldn't have. The rotated logo? The 8px borders? The pure primary colours? I would've played it safe. Claude didn't. The result is better for it.

### Partnership Model

This is the future: I provide vision and requirements, Claude implements. I review and refine. We iterate.

It's not "AI replaced me." It's "AI is the best pair programmer I've ever worked with."

### Framework Fit

Astro + Claude is a perfect match. Content Collections are beautifully structured - Claude understands the schema system intuitively. The component model is clear. The config files are readable. Claude doesn't have to fight the framework.

### Performance Gains

Build times dropped from 30+ seconds to **under 1 second**. Every change is instant feedback. The development loop is tight.

Zero JavaScript by default. Every page is pure HTML/CSS unless I explicitly add interactivity. My Lighthouse scores are 100/100/100/100.

### Maintainability

I can read every line of code in this project. There's no GraphQL abstraction layer. No plugin magic. Just files I understand, components I can modify, CSS I can tweak.

That's worth more than any framework feature.

## The Results

**Before (Gatsby 5)**:
- 30+ second builds
- GraphQL layer for simple content
- Plugin dependencies for sitemap, RSS, syntax highlighting
- PWA/offline support I didn't use
- Complexity increasing with each update

**After (Astro 5)**:
- <1 second builds
- Direct Content Collections queries
- 3 dependencies total (sitemap, RSS, smartypants)
- Zero-JS by default
- Every line of code readable and understood
- Lighthouse: 100/100/100/100

**Migration checklist**:
- ✅ All 4 posts migrated (3 published, 1 draft)
- ✅ Frontmatter structure preserved
- ✅ URLs preserved with trailing slashes (SEO maintained)
- ✅ RSS feed at /rss.xml (published posts only)
- ✅ Google Analytics integrated
- ✅ Sitemap generation
- ✅ Syntax highlighting (Shiki > Prism)
- ✅ Smart typography (proper quotes, dashes, ellipses)
- ✅ Previous/next post navigation
- ✅ SEO meta tags
- ✅ Brutalist design system from scratch

## The Bigger Picture

This migration wasn't just about switching frameworks. It was about **working differently**.

I didn't spend days researching Astro docs. I didn't spend hours building a design system. I didn't debug CSS for asymmetric layouts. I **had a conversation** with Claude about what I wanted, and 90 minutes later I had it.

The blog I'm writing on right now - this post you're reading - was built in an afternoon with AI assistance. The previous post about [running Claude Code from your phone](/claude-code-from-your-phone/) was written and published the same day.

This is the new workflow: **Asynchronous development with AI partnership.**

I provide vision. Claude implements. I review. We iterate. The result is better than what I would've built solo, and it's done in a fraction of the time.

## What's Next

This Astro blog is now live. The migration is complete. The design is bold. The code is clean.

But more importantly: **I'm unblocked**. The friction is gone. I can write more. I can experiment more. I can ship more.

That's what this migration was really about. Not Gatsby vs Astro. Not GraphQL vs Content Collections.

**Removing friction so I can create more.**

And now I have 90 minutes worth of evidence that it works.

---

*Want to try this workflow yourself? Check out the [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/overview) and see what you can build in 90 minutes.*
