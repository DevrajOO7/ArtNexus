
---

# <img width="1920" height="1377" alt="image" src="https://github.com/user-attachments/assets/e088b72d-2003-43c1-a2a5-404c3b78fdc7" />ArtNexus

**A Modern Art Discovery, Marketplace & Augmented Reality Platform**

ArtNexus is a next-generation platform bridging traditional art and cutting-edge technology. Discover, collect, and interact with art like never before through immersive AR visualization, a smart digital marketplace, AI-powered recommendations, and real-time artist analytics.

---

## 🌟 Features

### 🎯 Immersive AR Experiences

* **Wall Preview** – Visualize artworks on your wall in real time
* **3D Model Viewer** – Rotate and inspect sculptures from every angle
* **AR Gallery Tour** – Walk through customizable virtual museum spaces

### 🛍 Smart Digital Marketplace

* Fine art, digital media, and simulated NFT assets
* Advanced filtering, categories, and search
* Persistent shopping cart & order history

### 🤖 AI-Powered Discovery

* Personalized “Recommended For You” engine
* Dynamic artwork suggestions

### 📊 Artist Analytics Dashboard

* Revenue tracking & KPIs
* Interactive charts (Bar & Area graphs via Recharts)

### 🌍 Multi-Language Support

* English (EN)
* French (FR)
* Spanish (ES)
* Japanese (JA)

### 🔔 Real-Time Social Features

* Live sale notifications
* Profile pages with favorites, purchases & collections

---

## 🛠 Tech Stack

* **Frontend:** React 18 + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Backend:** Supabase
* **UI Components:** shadcn/ui (Radix Primitives)
* **Animations:** Framer Motion
* **Data Fetching:** TanStack React Query
* **Charts:** Recharts
* **Icons:** Lucide React

---

# 🚀 Getting Started

## 📌 Prerequisites

* Node.js ≥ 18
* npm ≥ 8
* Supabase account

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ArtNexus.git
cd ArtNexus
npm install
```

---

## 2️⃣ Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Find them in:
Supabase Dashboard → Project Settings → API

---

## 3️⃣ Database Setup (Supabase)

Open **SQL Editor** in Supabase and run:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE artists (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  photo TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE collections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE collection_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4️⃣ Enable Supabase Services

* Enable **Email/Password Authentication**
* Create public **Storage bucket** named `artworks`

---

## ▶️ Run Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:8080
```

---


# 🖼 Screenshots


<img src="images_output/Art1.png" alt="ArtNexus Banner" width="100%"/>
<img src="images_output/Art2.png" alt="ArtNexus Banner" width="100%"/>
<img src="images_output/Art3.png" alt="ArtNexus Banner" width="100%"/>
 <img src="images_output/Art4.png" alt="ArtNexus Banner" width="100%"/>
 <img src="images_output/Art5.png" alt="ArtNexus Banner" width="100%"/>
 <img src="images_output/Art6.png" alt="ArtNexus Banner" width="100%"/>
 <img src="images_output/Art7.png" alt="ArtNexus Banner" width="100%"/>


---

# 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push branch
5. Open a Pull Request

---

# 📄 License

Distributed under the MIT License.

---

<div align="center">
  <strong>Built with ❤️ by DEVRAJ</strong><br/>
  <sub>React · TypeScript · Vite · Supabase · Tailwind · WebXR</sub>
</div>

---

