---
name: Deploy
overview: Complete beginner-friendly guide to deploy Postiz with specific platform recommendations (DigitalOcean + Coolify), concrete third-party services (Resend, Cloudflare R2), and detailed OAuth setup for social media platforms including Twitter, Facebook, LinkedIn, and YouTube.
todos:
  - id: todo-1764804707722-63yr6cr14
    content: Set up server and install Docker/Docker Compose
    status: pending
  - id: todo-1764804707722-oae3g1aag
    content: Clone repository and create production configuration files
    status: pending
  - id: todo-1764804707722-rjt67kwqi
    content: Configure domain, reverse proxy, and SSL certificates
    status: pending
  - id: todo-1764804707722-zfpcnddl4
    content: Set up environment variables with secure credentials
    status: pending
  - id: todo-1764804707722-8whb9fa94
    content: Deploy and start all services with Docker Compose
    status: pending
  - id: todo-1764804707722-shxh1i3n9
    content: Verify deployment and test application functionality
    status: pending
  - id: todo-1764804707722-kzgyywpk5
    content: Configure firewall, backups, and monitoring
    status: pending
  - id: todo-1764804707722-34tps02uv
    content: Set up social media OAuth applications and credentials
    status: pending
---

# Deploy Postiz to Production - Complete Beginner's Guide

## What You're Building

Postiz is a social media scheduling platform that will run on your own server. You'll be able to:

- Schedule posts to Twitter, Facebook, Instagram, LinkedIn, YouTube, TikTok, etc.
- Generate content with AI
- Manage multiple social accounts
- Track analytics

## Recommended Setup (Best for Your Needs)

**Your Profile**: $10-20/month budget | Growing business | Some technical knowledge

**Total Monthly Cost**: ~$18/month

- DigitalOcean Server: $12/month (4GB RAM)
- Domain: ~$1/month ($10-15/year)
- Everything else: FREE (generous free tiers)

### Why This Stack?

**Hosting**: DigitalOcean + Coolify

- Coolify = "Heroku for your own server" (makes deployment super easy)
- No database management needed (all included)
- Automatic SSL certificates
- Easy monitoring and updates
- Can scale up anytime

**All Services You'll Use**:

1. **DigitalOcean** - Server hosting ($12/month)
2. **Cloudflare** - Domain DNS + SSL + CDN (FREE)
3. **Coolify** - Deployment platform (FREE, self-hosted)
4. **Resend** - Email notifications (FREE tier: 3,000/month)
5. **Cloudflare R2** - File storage (FREE tier: 10GB)

## PART 1: Set Up Your Accounts (30 minutes)

### Step 1.1: Create DigitalOcean Account

1. Go to https://www.digitalocean.com/
2. Click "Sign Up" (Use referral code to get $200 free credit for 60 days)
3. Verify email
4. Add payment method (credit card - won't charge during free credit period)
5. Complete account setup

### Step 1.2: Buy a Domain Name

**Option A: Namecheap** (Easiest for beginners)

1. Go to https://www.namecheap.com/
2. Search for your desired domain (e.g., "yourcompany.com")
3. Choose a `.com`, `.io`, or `.app` domain (~$10-15/year)
4. Add to cart and checkout
5. **Don't buy any extras** (email, privacy - you don't need them)

**Option B: Cloudflare Registrar** (Cheapest)

1. Go to https://www.cloudflare.com/
2. Create account first
3. Go to "Domain Registration"
4. Search and buy at-cost pricing

### Step 1.3: Set Up Cloudflare (FREE)

1. Go to https://dash.cloudflare.com/
2. Sign up for free account
3. Click "Add a Site"
4. Enter your domain (e.g., yourcompany.com)
5. Choose **FREE plan**
6. Cloudflare will show you 2 nameservers (like `ns1.cloudflare.com`)
7. Go back to Namecheap (or wherever you bought domain):

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Login to your account
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Go to "Domain List"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Click "Manage" next to your domain
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Find "Nameservers" section
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Select "Custom DNS"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Enter the 2 Cloudflare nameservers
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Save (takes 5-60 minutes to update)

### Step 1.4: Set Up Resend (Email Service) - FREE

1. Go to https://resend.com/
2. Sign up with email or GitHub
3. Verify your email
4. Click "API Keys" in sidebar
5. Click "Create API Key"
6. Give it a name like "Postiz Production"
7. **Copy and save this key** (you'll need it later)

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Format: `re_xxxxxxxxxxxxx`

8. Click "Domains" in sidebar
9. Add your domain
10. Add the DNS records shown to Cloudflare:

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Go to Cloudflare > Your domain > DNS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Add each record shown by Resend
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Wait 10-30 minutes for verification

### Step 1.5: Set Up Cloudflare R2 (File Storage) - FREE

1. In your Cloudflare dashboard: https://dash.cloudflare.com/
2. Click "R2" in left sidebar
3. Click "Create bucket"
4. Name it: `postiz-uploads`
5. Click "Create bucket"
6. Click "Manage R2 API tokens"
7. Click "Create API token"
8. Select "Object Read & Write" permissions
9. Apply to specific bucket: `postiz-uploads`
10. Click "Create API Token"
11. **Copy and save these** (you'll need them):

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Access Key ID
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Secret Access Key
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Bucket endpoint (looks like: `https://xxxxx.r2.cloudflarestorage.com`)
