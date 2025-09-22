# Backend — The Last of Guss

This folder contains the backend implementation for "The Last of Guss" coding
challenge project.

## Overview

The backend is built with Node.js and TypeScript, and uses Prisma for database
management. It provides the core API and business logic for the application.

## Setup

1. Install dependencies:
   ```zsh
   pnpm i
   ```
2. Configure environment variables as needed (see `.env.example`).
3. Generate prisma schema:
   ```zsh
   pnpm run prisma:generate
   ```
4. Start the backend server:
   ```zsh
   pnpm run dev
   ```

## Usage

Refer to the API documentation or source code in the `src/` folder for available
endpoints and usage details.

## Project Structure

- `src/` — Main backend source code
- `prisma/` — Prisma schema and migrations
- `prisma/zod/` — Zod schemas for validation

## Contributing

Contributions and suggestions are welcome! Please open an issue or submit a pull
request.

---

_This backend is part of a technical test for the HH.ru position. See the main
project README for more details._
