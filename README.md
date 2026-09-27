# ZIONOVA

> **The Christian Media Experience**  
> *A modern, scalable digital media platform uniting Gospel Music, Podcasts, Sermons, Video, Faith Community, and Kingdom Events.*

---

## 🌟 About ZIONOVA

ZIONOVA is an original Christian digital media platform crafted with modern streaming architecture, elegant typography, and a sacred, uplifting user experience.

### Core Ecosystem
- 🎵 **Gospel Music:** Songs, albums, artist profiles, curated worship playlists, synchronized lyrics.
- 🎙️ **Christian Podcasts:** Dedicated show profiles, seasonal episodes, video podcasts, transcripts, and live broadcasts.
- 📖 **Sermons & Spoken Word:** Scripture-indexed teachings, ministry profiles, and downloadable study guides.
- 🎬 **Christian Video:** High-definition worship recordings, Christian films, documentaries, and shorts.
- 🤝 **Community & Prayer:** Prayer request boards with intercessory counters, verified testimonies, and verse discussions.
- 📅 **Kingdom Events:** Global Christian conferences, concerts, worship nights, and virtual livestreams.
- 🔍 **Unified Discovery:** Cross-linking between music artists, podcast conversations, and topical sermons.

---

## 🛠️ Architecture & Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Motion, Lucide Icons
- **Backend / API:** Node.js, Express, TypeScript, REST API
- **Database & Persistence:** PostgreSQL with Prisma ORM
- **Cache & Queues:** Redis
- **Media Delivery:** S3-compatible Object Storage + Cloudflare/CloudFront CDN
- **Security:** Granular RBAC, Argon2/bcrypt hashing, signed media streaming URLs, rate limiting

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v20+ recommended)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/zionova/zionova.git
cd zionova

# Install dependencies
npm install
```

### 3. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your database credentials and API configuration
```

### 4. Running the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

---

## 📖 Documentation Directory
- [PROJECT_SPECIFICATION.md](./PROJECT_SPECIFICATION.md) — Comprehensive product features, user roles, non-functional requirements.
- [DEVELOPMENT.md](./DEVELOPMENT.md) — Architecture guidelines, code standards, agile roadmap.

---

## 📜 License
Copyright © 2026 ZIONOVA. All rights reserved.
