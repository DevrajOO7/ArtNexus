# Contributing to ArtNexus

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs
1. Check [existing issues](../../issues) first to avoid duplicates
2. Open a new issue using the **Bug Report** template
3. Include steps to reproduce, expected vs actual behavior, and screenshots if applicable

### Requesting Features
1. Open an issue using the **Feature Request** template
2. Describe the use case and why it benefits the project

### Submitting Code Changes

1. **Fork** the repository and create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following the code style guidelines below

3. **Test your changes** locally:
   ```bash
   npm run dev        # Run dev server
   npm run build      # Verify build succeeds
   npm run lint       # Check for lint errors
   ```

4. **Commit** using conventional commit messages:
   ```
   feat: add artwork search filter
   fix: resolve AR model loading issue
   docs: update deployment instructions
   style: format code with prettier
   refactor: simplify cart context
   test: add artwork card unit tests
   ```

5. **Push** your branch and open a **Pull Request**

## Code Style

- Use **TypeScript** — avoid `any` types
- Use **functional React components** with hooks, no class components
- Follow existing folder structure in `src/`
- Keep components small and focused (single responsibility)
- Use **Tailwind CSS** utility classes for styling
- Use `shadcn/ui` components where available

## Development Setup

See [README.md](README.md) for full setup instructions.

```bash
git clone https://github.com/YOUR_USERNAME/ArtNexus.git
cd ArtNexus
npm install
cp .env.example .env
# Fill in .env with your Supabase credentials
npm run dev
```

## Questions?

Open a [Discussion](../../discussions) or [Issue](../../issues) — we're happy to help!
