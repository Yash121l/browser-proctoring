# Browser Proctoring Platform

Monorepo scaffolding for a secure, scalable quiz platform with live & recorded proctoring.

## Apps
- `backend/` — NestJS API + Prisma + Socket.io
- `frontend/` — Next.js 14 App Router UI

## Quick Start
1. Copy `.env.example` to `.env` and fill values.
2. Backend
   - `cd backend`
   - `pnpm i` (or `npm i`/`yarn`)
   - `pnpm prisma:generate`
   - `pnpm prisma:migrate` (ensure PostgreSQL is running)
   - `pnpm start:dev`
3. Frontend
   - `cd frontend`
   - `pnpm i`
   - Set `NEXT_PUBLIC_BACKEND_URL=http://localhost:3001` in `frontend/.env.local`
   - `pnpm dev`

## WebSocket Namespace
- Client connects to `${BACKEND_URL}/proctor` and emits `PROCTOR_EVENT`.
- Backend emits `VIOLATION_ALERT` for admin dashboards.

## Prisma Models
See `backend/prisma/schema.prisma` for `User`, `Quiz`, `Question`, `Attempt`, `Violation`, `Recording`.

## S3 Upload
`GET /recordings/upload-url?key=<key>&contentType=<type>` returns a signed URL for chunk uploads.

## Notes
- This is a foundation to implement your full feature set (auth flows, role guards across routes, recording pipelines, SFU integration, analytics).

