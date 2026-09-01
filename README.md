# A8 Enterprises

Studio landing page for a8enterprises.com. Next.js, Tailwind, Cloudflare-ready.

## Local

```bash
pnpm install
pnpm dev
```

Form submissions in development succeed without sending email. To deliver mail:

```bash
cp .env.example .env.local
# set RESEND_API_KEY, INQUIRY_TO, and (after DNS) RESEND_FROM
```

```bash
pnpm test
pnpm build
```

## Domain: GoDaddy DNS to Cloudflare (do this now)

The `.com` was just registered. ICANN blocks a **registrar** transfer for 60 days. Point DNS at Cloudflare today; transfer the registrar later if you want at-cost renewals.

1. Log in to [Cloudflare](https://dash.cloudflare.com) and add site `a8enterprises.com`.
2. Copy the two Cloudflare nameservers (they look like `ada.ns.cloudflare.com` and `bob.ns.cloudflare.com`).
3. In GoDaddy: **My Products → a8enterprises.com → DNS → Nameservers → Change → I'll use my own nameservers**.
4. Paste the two Cloudflare nameservers. Save. Wait for Cloudflare to mark the zone **Active** (often minutes, sometimes up to 24h).
5. In Cloudflare DNS, after deploy, add:
   - `CNAME @` → your Pages hostname (`a8-enterprises.pages.dev`) with Proxy on
   - `CNAME www` → `a8enterprises.com` with Proxy on
6. In Pages: **Custom domains → a8enterprises.com** (and `www`).

Do not change registrant contact details at GoDaddy until after the 60-day window if you plan to transfer the registrar.

## Deploy

Cloudflare Pages, connected to this repo:

- Framework preset: Next.js
- Build command: `pnpm build`
- Output: leave as the Next.js default for `@cloudflare/next-on-pages` / OpenNext once wired, or use Vercel and keep DNS on Cloudflare.

Pages env:

```
INQUIRY_TO=jespertoftkristensen@gmail.com
RESEND_API_KEY=...
RESEND_FROM=A8 Enterprises <inquiries@a8enterprises.com>
INQUIRY_ORIGIN=https://a8enterprises.com
```

Verify `a8enterprises.com` on Resend after Cloudflare DNS is live, then switch `RESEND_FROM` off `beth.t@example.com`.

## Copy to swap

Active projects live in `lib/site.ts`.
