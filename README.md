# Online Judge (MERN + Dockerized C++ Judge)

A full-stack competitive-programming platform where users solve problems in C++ against a sandboxed judge, get instant verdicts, and receive AI-powered help. Built as a monorepo with a decoupled code-execution service.

### Live

- **App:** https://oj-project-blush.vercel.app/
- **Backend API:** https://oj-backend-1-1iig.onrender.com
- **Compiler service:** https://oj-compiler-2wji.onrender.com

> The backend and compiler run on Render's free tier and sleep after ~15 minutes of inactivity, so the **first request after idle takes ~30–60s to wake**. Subsequent requests are fast.

---

## Features

- **Sandboxed judge engine** — compiles and runs submissions in an isolated Docker service with a **5s time limit** (→ `Time Limit Exceeded`) and a **256 MB memory cap** (via `ulimit`), and returns typed verdicts: `Accepted`, `Wrong Answer`, `Compilation Error`, `Runtime Error`, `Time Limit Exceeded`. Compiler messages are path-stripped so internal file paths never leak to users.
- **Codeforces-style problems** — each problem reads `t` test cases from stdin and prints one answer per line; the sample panel shows the full input/output blocks just like Codeforces.
- **Monaco code editor** — VS Code's editor in the browser, dark split-view (statement left, editor right) with a colored verdict banner.
- **AI assistant (provider-agnostic)** — three features behind a single `askAI()` helper:
  - **AI Review** — hint-only review grounded in the problem statement, verdict, and failing test case (never reveals the solution).
  - **Analyze Complexity** — time/space Big-O with a one-line optimization.
  - **Explain Error** — plain-English explanation of compile/runtime errors.
- **Auth** — JWT stored in an httpOnly cookie, bcrypt-hashed passwords.
- **Submission history** — every submission is stored with its verdict and shown per-user.

---

## Architecture

```
                   ┌──────────────────────────┐
                   │  Frontend (Vercel)        │
                   │  React 19 · Vite · Tailwind│
                   │  Monaco editor             │
                   └────────────┬──────────────┘
                                │ HTTPS (VITE_BACKEND_URL)
                                ▼
                   ┌──────────────────────────┐        ┌──────────────────────────┐
                   │  Backend API (Render)     │  HTTP  │  Compiler (Render, Docker)│
                   │  Node · Express · Mongoose │───────▶│  Node + g++                │
                   │  JWT auth · AI orchestration│        │  compile + run + limits    │
                   └────────────┬──────────────┘        └──────────────────────────┘
                                │
                       ┌────────┴─────────┐        ┌──────────────────────────┐
                       │ MongoDB Atlas    │        │  Groq API (LLaMA)         │
                       │ users/problems/  │        │  AI review / complexity / │
                       │ testcases/subs   │        │  error explanation        │
                       └──────────────────┘        └──────────────────────────┘
```

The **compiler is a separate service** from the API. The API never runs untrusted code itself — it forwards `{ code, testcase }` to the compiler, which compiles and executes under resource limits and returns a verdict. This keeps the API process safe from infinite loops, memory bombs, and crashes.

### Judge I/O contract

Each problem has one test document: `{ problemCode, input: [...], output: [...] }`.

On submit, the compiler:
1. Joins `input` with `\n` to form a single stdin,
2. Runs the program **once**,
3. Splits stdout by lines and compares each line to `output[i]` (trimmed).

All lines must match for `Accepted`. Problems are count-prefixed (Codeforces-style): `input[0]` is the number of test cases `t`, and solutions read `t` then loop, printing one answer per line.

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4, `@monaco-editor/react`, React Router, Axios, react-markdown |
| Backend | Node.js, Express, Mongoose (MongoDB), JWT, bcryptjs |
| Compiler | Node.js + `g++` in Docker (Alpine), `ulimit`/`timeout` sandboxing |
| AI | Groq API (`llama-3.3-70b-versatile`), OpenAI-compatible — swappable via one helper |
| Data | MongoDB Atlas |
| Hosting | Vercel (frontend), Render (backend + compiler), MongoDB Atlas (DB) |

---

## Repository structure

```
OJProject/
├── frontend/      # React + Vite app (Vercel: root = frontend)
├── backend/       # Express API + seeders + problems.json / testcases.json (Render: root = backend)
└── compiler/      # Dockerized g++ execution service (Render: root = compiler, Docker)
```

---

## Running locally

Three services. Start the compiler and backend, then the frontend.

### 1. Compiler (`compiler/`)
```bash
cd compiler
npm install
node index.js        # listens on PORT (default 8400)
```
Requires `g++` available locally (or run the Docker image: `docker build -t oj-compiler . && docker run -p 8400:8400 oj-compiler`).

### 2. Backend (`backend/`)
Create `backend/.env`:
```
MONGODB_URL=<your MongoDB Atlas connection string>
COMPILER_URL=http://localhost:8400
GROQ_API_KEY=<your Groq API key>      # from console.groq.com
SECRET_KEY=<any long random string>   # JWT signing secret
```
```bash
cd backend
npm install
node index.js        # connects to DB, seeds problems + testcases, then listens
```
On boot the backend seeds `problems.json` and `testcases.json` into MongoDB (drops and re-inserts).

### 3. Frontend (`frontend/`)
Create `frontend/.env`:
```
VITE_BACKEND_URL=http://localhost:8000   # your backend URL (no trailing slash)
```
```bash
cd frontend
npm install
npm run dev
```
> `VITE_` variables are baked in at build time — restart the dev server (or redeploy) after changing them.

---

## Deployment

| Service | Platform | Root dir | Notes |
|---|---|---|---|
| Frontend | Vercel | `frontend` | env `VITE_BACKEND_URL`; `vercel.json` rewrites all routes to `index.html` (SPA) |
| Backend | Render (Node) | `backend` | env `MONGODB_URL`, `COMPILER_URL`, `GROQ_API_KEY`, `SECRET_KEY` |
| Compiler | Render (Docker) | `compiler` | `Dockerfile` installs `g++` + `coreutils` |
| Database | MongoDB Atlas | — | free M0 cluster |

Routes are case-sensitive (`/getProblems`, `/getVerdict`). `COMPILER_URL` is the compiler's Render URL — `https`, no port, no trailing slash.

---

## Environment variables

**Backend**

| Key | Description |
|---|---|
| `MONGODB_URL` | MongoDB Atlas connection string |
| `COMPILER_URL` | Base URL of the compiler service |
| `GROQ_API_KEY` | Groq API key (powers the AI features) |
| `SECRET_KEY` | JWT signing secret |

**Frontend**

| Key | Description |
|---|---|
| `VITE_BACKEND_URL` | Base URL of the backend API |

---

## Security notes

- Untrusted user code is executed only inside the isolated compiler service, never in the API process, and is bounded by time and memory limits.
- Secrets live only in environment variables; `.env` files are git-ignored.
- Passwords are bcrypt-hashed; auth tokens are httpOnly cookies.

---

Built by **Parth Ladiwal** — [GitHub](https://github.com/ladiwalparth) · [LinkedIn](https://linkedin.com/in/parth-ladiwal-b21a22253) · [Codeforces](https://codeforces.com/profile/ladiwalparth)
