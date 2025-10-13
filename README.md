# Arman AI Signal (Pro)

Full version: Dark theme, live signals, admin/manual signal input.

## How to deploy to Vercel

1. Push this repo to GitHub.
2. On Vercel dashboard → “New Project” → import this GitHub repo.
3. Vercel will detect frontend + backend.
4. Set **Build Command**: `npm run build --prefix frontend && npm start --prefix backend`
5. Set **Output Directory**: `frontend/build`
6. Deploy.

After that, app will be live. Use the URL Vercel gives you.

## Usage

- Open live app URL → you'll see dark-themed UI.
- In UI, add symbol + BUY/SELL + optional price → signals show live.
- For automatic signals, connect TradingView alert webhook to `/api/signal
