<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# IntelliSkool ERP

An AI-powered educational ERP system designed for students, teachers, parents, and administrators.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

1. Build the application:
   ```bash
   npm run build
   ```
2. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```
3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```
   
   Or alternatively, you can deploy directly from GitHub by connecting your repository to Vercel.

### Environment Variables for Vercel

When deploying to Vercel, make sure to set the following environment variable in your Vercel project settings:
- `GEMINI_API_KEY` - Your Google Gemini API key

The application will be accessible via a public URL provided by Vercel after deployment.