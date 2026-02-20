<div align="center">

# 🎨 ArtNexus

**A Modern Art Discovery & AR Experience Platform**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Supabase Setup](#supabase-setup)
  - [Environment Variables](#environment-variables)
- [Deployment](#-deployment)
  - [Netlify](#deploy-to-netlify-recommended)
  - [Vercel](#deploy-to-vercel)
  - [GitHub Pages](#deploy-to-github-pages)
  - [Self-Hosted](#self-hosted-vps--server)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About the Project

**ArtNexus** is a full-stack web application that bridges the gap between traditional art appreciation and modern technology. It provides a platform for art discovery, marketplace transactions, AR (Augmented Reality) artwork visualization, community forums, art classes, and live performance events.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖼️ **Art Discovery** | Browse and explore artworks from artists worldwide |
| 🛒 **Marketplace** | Buy and sell original artworks securely |
| 🥽 **AR Experience** | View artworks in your space using WebXR / AR |
| 🗂️ **Collections** | Create and manage personal art collections |
| 👤 **Artist Profiles** | Dedicated profiles for artists with portfolio |
| 🎭 **Events & Performances** | Discover art events and live performances |
| 📚 **Art Classes** | Browse and enroll in online art classes |
| 💬 **Community Forum** | Discuss art with the community |
| 🌙 **Dark / Light Mode** | Full theme support |
| 🔐 **Authentication** | User auth via Supabase (email/password) |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** – UI library
- **TypeScript 5** – Type safety
- **Vite 5** – Build tool & dev server
- **Tailwind CSS 3** – Utility-first styling
- **shadcn/ui + Radix UI** – Accessible component library
- **Framer Motion** – Animations
- **React Router DOM v6** – Client-side routing
- **TanStack React Query** – Server state management
- **React Hook Form + Zod** – Form validation

### Backend & Services
- **Supabase** – PostgreSQL database, Auth, Storage, Realtime
- **@google/model-viewer** – 3D model rendering for AR
- **WebXR API** – Augmented Reality in the browser

---

## 📁 Project Structure

```
ArtNexus/
├── public/                 # Static assets (favicon, 3D models, images)
│   ├── models/             # .glb/.gltf 3D model files for AR
│   └── lovable-uploads/    # Uploaded artwork thumbnails
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ar/             # AR-specific components
│   │   ├── ui/             # shadcn/ui base components
│   │   └── ...
│   ├── contexts/           # React context providers (Auth, Cart)
│   ├── data/               # Static data / mock data
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # Supabase client & types
│   ├── lib/                # Utility functions
│   ├── pages/              # Page-level components (routes)
│   ├── utils/              # Helper utilities
│   ├── App.tsx             # Root app with routing
│   └── main.tsx            # Entry point
├── .env                    # Environment variables (DO NOT COMMIT)
├── .env.example            # Example env file (safe to commit)
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| Node.js | ≥ 18.x | [nodejs.org](https://nodejs.org/) |
| npm | ≥ 8.x | Included with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ArtNexus.git
cd ArtNexus

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env
# Then edit .env and fill in your Supabase credentials

# 4. Start the development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

### Supabase Setup

1. **Create a Supabase account** at [supabase.com](https://supabase.com/) (free tier available)
2. **Create a new project** and note your Project URL and Anon Key
3. **Run the database migration** by opening the SQL Editor in your Supabase dashboard and running:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (id)
);

-- Artists table
CREATE TABLE artists (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  photo TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (id)
);

-- Artworks table
CREATE TABLE artworks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  thumbnail TEXT,
  category TEXT[],
  price NUMERIC,
  for_sale BOOLEAN DEFAULT FALSE,
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Collections table
CREATE TABLE collections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Collection items table
CREATE TABLE collection_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Performance indexes
CREATE INDEX artworks_artist_id_idx ON artworks(artist_id);
CREATE INDEX collection_items_collection_id_idx ON collection_items(collection_id);
CREATE INDEX collection_items_artwork_id_idx ON collection_items(artwork_id);
```

4. **Set up Storage** in Supabase Dashboard → Storage:
   - Create a bucket named `artworks` with **Public** access
   - Apply these policies:
   ```sql
   CREATE POLICY "Public read" ON storage.objects FOR SELECT USING (bucket_id = 'artworks');
   CREATE POLICY "Auth upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'artworks' AND auth.role() = 'authenticated');
   ```

5. **Enable Authentication** in Supabase Dashboard → Authentication:
   - Enable **Email/Password** provider
   - (Optional) Enable Google, GitHub OAuth providers

---

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

> ⚠️ **Never commit your `.env` file to Git!** Add it to `.gitignore`.

---

## ☁️ Deployment

### Deploy to Netlify (Recommended)

Netlify offers the easiest deployment for Vite + React apps with free HTTPS.

**Option A – Deploy via Netlify UI (no CLI needed):**

1. Build the project locally:
   ```bash
   npm run build
   ```
2. Go to [app.netlify.com](https://app.netlify.com/) → **Add new site** → **Deploy manually**
3. Drag and drop the `dist/` folder
4. In **Site Settings → Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

**Option B – Deploy via Git (auto-deploy on push):**

1. Push your code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com/) → **Add new site** → **Import from Git**
3. Select your repository
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add environment variables in **Site Settings → Environment Variables**
6. Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

> The `[[redirects]]` rule is **required** so React Router works with direct URL access.

---

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/) and click **New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite. Confirm settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add **Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**

> Vercel handles SPA routing automatically.

---

### Deploy to GitHub Pages

> ⚠️ GitHub Pages serves from a subdirectory (e.g., `/ArtNexus/`). You must configure the base path.

1. **Update `vite.config.ts`:**

```ts
export default defineConfig({
  base: '/ArtNexus/', // Replace with your repo name
  // ... rest of config
});
```

2. **Install `gh-pages`:**
```bash
npm install --save-dev gh-pages
```

3. **Add deploy scripts to `package.json`:**
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. **Deploy:**
```bash
npm run deploy
```

5. In your GitHub repository → **Settings → Pages**, set source to `gh-pages` branch.

> ⚠️ Environment variables starting with `VITE_` are embedded at build time. Make sure to build with your env vars set.

---

### Self-Hosted (VPS / Server)

1. **Build the project:**
```bash
npm run build
```

2. **Upload the `dist/` folder** to your server via FTP/SCP/rsync.

3. **Configure Nginx** to serve the SPA and handle routing:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/artnexus/dist;
    index index.html;

    # Handle React Router – all routes go to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

4. Enable HTTPS with **Let's Encrypt (Certbot)**:
```bash
sudo certbot --nginx -d yourdomain.com
```

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server at `localhost:8080` |
| `npm run build` | Build for production (output to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some amazing feature'`
4. Push to branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 🐛 Common Issues

| Problem | Solution |
|---|---|
| `Port 8080 in use` | Change `port` in `vite.config.ts` or kill the process |
| `Supabase 401 error` | Check your `.env` has correct `VITE_SUPABASE_ANON_KEY` |
| `Blank page on Netlify/GitHub Pages` | Add the redirect rule to route `/*` to `index.html` |
| `3D models not loading in AR` | Ensure `.glb` files are in `public/models/` |
| Node version error | Use Node.js ≥ 18 (`node -v` to check) |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>Built with ❤️ by Prompt007dev</strong><br/>
  <sub>React · TypeScript · Vite · Supabase · TailwindCSS</sub>
</div>
