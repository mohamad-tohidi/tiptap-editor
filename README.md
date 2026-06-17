# Qalam — Tiptap Editor

Minimal Islamic-inspired writing editor with AI autocomplete.

## Run locally

```bash
npm install
cp .env.example .env   # then edit .env with your LLM details
npm run dev
```

Open http://localhost:5173

## AI Autocomplete

Edit `.env`:

```
VITE_AI_BASE_URL=http://localhost:11434/v1   # Ollama default
VITE_AI_TOKEN=ollama
VITE_AI_MODEL=llama3
```

Press **Tab** to accept a suggestion, **Esc** to dismiss.
