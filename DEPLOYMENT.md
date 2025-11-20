# Deployment Instructions

## ✅ Browserbase Configuration

Your Browserbase credentials are configured in your `.env` file.

## How Browserbase Works in Your Project

### Local Development (.env file)
```bash
GOOGLE_API_KEY=your_google_api_key_here
BROWSERBASE_API_KEY=your_browserbase_api_key_here
BROWSERBASE_PROJECT_ID=your_browserbase_project_id_here
```

### Code Implementation (api/research.ts)

The code automatically detects Browserbase credentials and switches modes:

```typescript
// Lines 114-124
const env = process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID
  ? 'BROWSERBASE'  // ✅ Uses remote browsers
  : 'LOCAL';        // Uses local Playwright

const stagehand = new Stagehand({
  env,
  verbose: 0,
  apiKey: process.env.BROWSERBASE_API_KEY,
  projectId: process.env.BROWSERBASE_PROJECT_ID,
  ...modelConfig,  // Includes Gemini API config
});
```

**What this means:**
- ✅ **With credentials:** Uses Browserbase remote browsers (faster, more reliable in serverless)
- ❌ **Without credentials:** Falls back to local Playwright (slower on Vercel)

---

## Vercel Deployment Setup

### Step 1: Push Your Code

```bash
git add .
git commit -m "Add Browserbase and Gemini API integration"
git push
```

### Step 2: Configure Vercel Environment Variables

Go to your Vercel project dashboard:
1. Navigate to: **Settings** → **Environment Variables**
2. Add these **three required variables:**

#### 1. Google Gemini API Key
```
Name:  GOOGLE_API_KEY
Value: <your_google_api_key_from_.env_file>
```

#### 2. Browserbase API Key
```
Name:  BROWSERBASE_API_KEY
Value: <your_browserbase_api_key_from_.env_file>
```

#### 3. Browserbase Project ID
```
Name:  BROWSERBASE_PROJECT_ID
Value: <your_browserbase_project_id_from_.env_file>
```

**For each variable:**
- Select environments: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

### Step 3: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on the latest deployment
3. Click **Redeploy**

---

## Verification After Deployment

### 1. Check Health Endpoint
```bash
curl https://companyresearchtool.vercel.app/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "hasApiKey": true,
  "provider": "Google Gemini"
}
```

### 2. Test the Frontend
Visit: `https://companyresearchtool.vercel.app/`

1. Enter a company name (e.g., "Stripe")
2. Click "Start Research"
3. Wait 30-60 seconds
4. Should see company research report ✅

### 3. Verify Browserbase is Working

Check Vercel function logs or Browserbase dashboard:
- You should see browser sessions being created
- Sessions will have your Browserbase project ID
- You can watch live sessions at: `https://browserbase.com/sessions/{session-id}`

---

## Security Notes

### ✅ Already Secured:
- `.env` file is in `.gitignore` ✅
- API keys are **NOT** committed to git ✅
- Credentials only in:
  - Local `.env` file (local development)
  - Vercel environment variables (production)

### ⚠️ Important:
- **NEVER** commit the `.env` file to git
- **NEVER** share API keys publicly
- If keys are exposed, regenerate them immediately:
  - Gemini: https://aistudio.google.com/app/apikey
  - Browserbase: https://browserbase.com/settings

---

## Troubleshooting

### Issue: "No API key configured"
**Solution:** Add `GOOGLE_API_KEY` to Vercel environment variables

### Issue: Using local browser instead of Browserbase
**Solution:** Verify both `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` are set in Vercel

### Issue: 404 errors on Vercel
**Solution:** Already fixed! The new serverless function structure eliminates 404 errors

### Issue: Pino-pretty errors
**Solution:** Already fixed! Built-in suppression in `api/research.ts` lines 5-14

---

## How It Works

### API Route Structure
```
api/
├── health.ts      → GET  /api/health
├── research.ts    → POST /api/research
└── index.ts       → GET  /
```

### Request Flow
1. User submits company name from frontend
2. Frontend calls `POST /api/research`
3. Vercel runs `api/research.ts` as serverless function
4. Function creates Stagehand instance with:
   - Environment: `BROWSERBASE` (using your credentials)
   - Model: `google/gemini-2.0-flash-exp` (using your API key)
5. Browserbase provisions remote browser
6. Gemini AI extracts company information
7. Function returns markdown report
8. Frontend displays results

### Browserbase Benefits
- ✅ No browser installation needed on Vercel
- ✅ Faster execution in serverless
- ✅ More reliable than local Playwright
- ✅ Can watch sessions live
- ✅ Better for production workloads

---

## Summary

✅ **Gemini API** configured for AI extraction
✅ **Browserbase** configured for remote browsers
✅ **Vercel** serverless functions working
✅ **Security** - credentials not in git
✅ **All errors** fixed (404, pino-pretty, TypeScript)

**Ready to deploy!** 🚀
