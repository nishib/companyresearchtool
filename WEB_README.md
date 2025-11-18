# 🌐 Web Interface for Company Research Tool

A beautiful, modern web interface for the AI-powered company research tool.

## ✨ Features

- 🎨 **Beautiful UI** - Modern, gradient design with smooth animations
- ⚡ **Real-time Updates** - Live progress tracking during research
- 📊 **Two View Modes** - Preview (formatted) and Markdown (raw)
- 💾 **Download Reports** - Save research as markdown files
- 🔍 **Quick Examples** - One-click company suggestions
- 📱 **Responsive Design** - Works on desktop and mobile

## 🚀 Quick Start

### 1. Make sure dependencies are installed:
```bash
npm install
```

### 2. Start the web server:
```bash
npm run web
```

### 3. Open your browser:
```
http://localhost:3000
```

## 🎯 How to Use

1. **Enter a company name** in the search field
2. **Click "Start Research"** or try one of the example buttons
3. **Watch the progress** as AI researches the company
4. **View results** in either Preview or Markdown mode
5. **Download the report** as a markdown file

## 🔧 Configuration

The web interface uses the same `.env` configuration as the CLI:

```env
# Your API key (choose one)
GOOGLE_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here

# Optional: Custom port (default: 3000)
PORT=3000
```

## 📁 Project Structure

```
public/
├── index.html    # Main HTML page
├── styles.css    # Styling and animations
└── app.js        # Frontend JavaScript logic

src/
└── server.ts     # Express backend server
```

## 🎨 UI Components

### Search Section
- Company name input field
- Quick example buttons (Stripe, Anthropic, OpenAI, Shopify)
- Submit button with loading state

### Progress Section
- Animated progress bar
- Real-time status updates
- Displays current research phase

### Results Section
- **Preview Tab** - Formatted, readable version
- **Markdown Tab** - Raw markdown source
- Download button
- Reset button for new searches

## 🔌 API Endpoints

### `GET /api/health`
Check server and API key status
```json
{
  "status": "ok",
  "hasApiKey": true,
  "provider": "Google Gemini"
}
```

### `POST /api/research`
Start a new research session
```json
{
  "companyName": "Stripe"
}
```

Returns:
```json
{
  "sessionId": "1234567890-abc123"
}
```

### `GET /api/research/:sessionId`
Get research status and results
```json
{
  "status": "completed",
  "progress": "Research complete!",
  "result": {
    "markdown": "# Company Report...",
    "report": { ... }
  }
}
```

## 🎭 Status Indicators

- **Green dot** - API key configured, ready to use
- **Red dot** - No API key or connection error

## 🔍 Research Process

1. **Initializing** - Starting browser automation
2. **Researching** - Gathering company information
3. **Generating** - Creating markdown report
4. **Complete** - Results ready to view

## 🛠️ Troubleshooting

### "No API key configured"
Add an API key to your `.env` file and restart the server.

### "Server connection error"
Make sure the server is running with `npm run web`.

### Research fails with quota error
Your API key has hit its rate limit. Try:
- Waiting for quota reset
- Using a different API provider
- Upgrading to paid tier

### Port already in use
Change the port in `.env`:
```env
PORT=3001
```

## 🎨 Customization

### Change Theme Colors
Edit `public/styles.css`:
```css
/* Update gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Examples
Edit `public/index.html`:
```html
<button class="example-btn" onclick="fillExample('YourCompany')">YourCompany</button>
```

## 📊 Performance

- **Fast Loading** - Minimal dependencies
- **Real-time Updates** - 1-second polling interval
- **Responsive** - Optimized for all screen sizes
- **Secure** - API keys never exposed to frontend

## 🚀 Advanced Usage

### Custom Port
```bash
PORT=8080 npm run web
```

### Production Deployment
For production, consider:
- Using a process manager (PM2)
- Setting up HTTPS
- Adding authentication
- Rate limiting

## 💡 Tips

1. **Use Example Buttons** - Quick way to test the tool
2. **Switch Tabs** - Compare formatted vs raw markdown
3. **Download Reports** - Save for later reference
4. **Mobile Friendly** - Use on any device

## 🎉 Enjoy!

Your company research tool now has a beautiful web interface. No more command line - just point, click, and research!

For CLI usage, see the main [README.md](./README.md).
