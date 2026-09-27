# ZIONOVA: Development Guidelines & Architecture Handbook

## 1. Architectural Principles

ZIONOVA follows a modular, type-safe, decoupled architecture designed for high scalability, rapid developer velocity, and media delivery.

```
                    ┌────────────────────────────┐
                    │       Edge CDN Layer       │
                    │  (Audio / Video / Images)  │
                    └─────────────┬──────────────┘
                                  │
    ┌─────────────────────────────┼─────────────────────────────┐
    │                             │                             │
┌───▼─────────────────────┐ ┌─────▼─────────────────────┐ ┌─────▼─────────────────────┐
│  Web App (React/Vite)   │ │ Mobile App (React Native) │ │ Admin / Studio (React)     │
└───────────┬─────────────┘ └───────────┬───────────────┘ └───────────┬───────────────┘
            │                           │                             │
            └───────────────────────────┼─────────────────────────────┘
                                        │
                               ┌────────▼────────┐
                               │ Express/Node API │
                               │  REST Gateway   │
                               └────────┬────────┘
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             │                          │                          │
    ┌────────▼────────┐        ┌────────▼────────┐        ┌────────▼────────┐
    │ PostgreSQL DB   │        │   Redis Cache   │        │ Object Storage  │
    │  (Prisma ORM)   │        │  & Job Queues   │        │  (S3/GCS/R2)    │
    └─────────────────┘        └─────────────────┘        └─────────────────┘
```

---

## 2. Directory Structure Conventions

```
zionova/
├── apps/
│   ├── web/                    # Primary End-User Web Application
│   ├── mobile/                 # React Native / Expo Mobile Application
│   └── admin/                  # Content Management & Admin Dashboard
├── services/
│   ├── api/                    # Core REST API (Node.js/Express + TypeScript)
│   ├── media/                  # Transcoding, Waveform, & Chunk Streaming Service
│   ├── notifications/          # Push & Email Dispatch Engine
│   └── recommendations/        # Content Affinity & Discovery Engine
├── packages/
│   ├── ui/                     # Shared UI Components & Design System Tokens
│   ├── database/               # Prisma Schema, Migrations, Seeders, & Client
│   ├── auth/                   # RBAC Middleware & Token Validation
│   ├── types/                  # Shared TypeScript Interfaces & DTOs
│   └── config/                 # Shared Tailwind, ESLint, & TSConfigs
├── docs/                       # Architectural Decision Records & Specs
└── scripts/                    # Database seeding, migration, and maintenance
```

---

## 3. Coding Standards & Conventions

### 3.1 TypeScript & Type Safety
- **Strict Mode:** Always enabled (`strict: true`, `noImplicitAny: true`).
- **No `any` Policy:** Use explicit generics, discriminated unions, or `unknown` with runtime type guards.
- **DTOs and Contracts:** Request and response schemas must be strictly defined in `@zionova/types` or using Zod schemas for runtime validation.

### 3.2 UI & Component Design System
- **Tailwind CSS 4:** Utility-first styling with structured semantic tokens (`bg-background`, `text-foreground`, `border-border`, `accent-gold`, `accent-indigo`).
- **Visual Tone:** Sacred elegance without clutter. Clean typography pairing, optical alignment, generous whitespace, smooth layout transitions with `motion`.
- **Accessibility:** Mandatory `aria-label` attributes on icon-only buttons, keyboard navigation on dropdowns/modals, focus rings on all interactive controls.

### 3.3 State Management & Media Synchronization
- **Global Media Context:** Audio playback state (track, queue, progress, volume, buffering state) lives at the root media player provider, decoupled from route navigation.
- **Optimistic UI:** Like, follow, playlist add, and prayer count actions update instantly on the client with rollback on network failure.

---

## 4. Development Workflow & Agile Phases

```
Phase 1: Foundation & Specs          [Current]
Phase 2: Auth & Database Architecture
Phase 3: Music Catalog & Discovery
Phase 4: Global Audio/Video Player Engine
Phase 5: Dedicated Podcast Platform
Phase 6: Podcast Creator Studio
Phase 7: Central Admin & Moderation Dashboard
Phase 8: Sermons & Video Streaming
Phase 9: Faith Community & Prayer Wall
Phase 10: Events & Live Streaming
Phase 11: Cross-Platform Recommendation Engine
Phase 12: Analytics & Creator Insights
Phase 13: Fair-Trade Monetization & Licensing
Phase 14: Security Hardening & Performance Caching
Phase 15: Automated E2E & Integration Testing
Phase 16: Production Multi-Region Deployment
```

---

## 5. Security & Data Protection Guidelines

1. **Authentication:** Salted Argon2/bcrypt password hashes, short-lived JWT access tokens with rotating refresh tokens stored in `httpOnly` secure cookies.
2. **Authorization:** Middleware-level RBAC check on every protected endpoint (`requireRole(['ARTIST', 'ADMIN'])`).
3. **Upload Sanitization:** Strict MIME type validation, file signature magic-number checking, virus scanning, and direct-to-cloud signed upload URLs.
4. **Rate Limiting:** Redis-backed sliding window rate limiters on auth, search, comments, and media streaming endpoints.
5. **No Leaked Secrets:** Zero credentials in client bundles; all server-side environment variables configured via `.env`.
