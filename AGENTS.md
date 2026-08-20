## Code Style Rules
- Do NOT add explanatory comments unless the logic is genuinely non-obvious.
- No comment banners, section headers, or docstring-style blocks above functions unless asked.
- Prefer self-explanatory variable/function names over comments explaining what code does.
- Keep changes minimal — don't add extra lines, helper functions, or abstractions that weren't asked for.
- When editing existing files, don't rewrite untouched code or add comments to code you didn't change.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
