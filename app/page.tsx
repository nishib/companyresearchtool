'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ApiStatus {
  status: string;
  hasApiKey: boolean;
  provider?: string;
}

export default function HomePage() {
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown'>('preview');

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json() as ApiStatus;
      setApiStatus(data);
    } catch {
      setApiStatus({ status: 'error', hasApiKey: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    setIsLoading(true);
    setError(null);
    setMarkdown(null);

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: companyName.trim() }),
      });

      const data = await res.json() as { markdown?: string; error?: string; message?: string };

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Research failed');
      }

      setMarkdown(data.markdown || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fillExample = (name: string) => {
    setCompanyName(name);
  };

  const resetForm = () => {
    setCompanyName('');
    setError(null);
    setMarkdown(null);
  };

  const downloadMarkdown = () => {
    if (!markdown) return;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyName.replace(/\s+/g, '-').toLowerCase()}-research-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const markdownToHtml = (md: string): string => {
    return md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^---$/gim, '<hr>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="container">
      <header>
        <h1>One-Stop Recruiting Guide</h1>
        <p className="subtitle">
          Two features: AI-powered company research reports and a recruiter finder for any company.
        </p>
        <nav className="nav-links">
          <Link href="/" className="nav-link active">Company Research</Link>
          <Link href="/recruiters" className="nav-link">Recruiter Finder</Link>
        </nav>
      </header>

      <div className={`api-status ${apiStatus?.hasApiKey ? '' : 'error'}`}>
        <span className="status-indicator"></span>
        <span>
          {apiStatus === null
            ? 'Checking API status...'
            : apiStatus.hasApiKey
            ? `API Ready (${apiStatus.provider})`
            : 'API keys not configured'}
        </span>
      </div>

      {!markdown && !error && (
        <div className="search-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Stripe, Anthropic, OpenAI"
                required
                disabled={isLoading}
              />
            </div>
            <button type="submit" className="btn-primary" disabled={isLoading || !apiStatus?.hasApiKey}>
              {isLoading ? 'Researching...' : 'Start Research'}
            </button>
          </form>

          <div className="examples">
            <p>Try: </p>
            <button className="example-btn" onClick={() => fillExample('Stripe')}>Stripe</button>
            <button className="example-btn" onClick={() => fillExample('Anthropic')}>Anthropic</button>
            <button className="example-btn" onClick={() => fillExample('OpenAI')}>OpenAI</button>
            <button className="example-btn" onClick={() => fillExample('Shopify')}>Shopify</button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="progress-text">Researching {companyName}... This may take 30-60 seconds</p>
        </div>
      )}

      {error && (
        <div className="error-section">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={resetForm} className="btn-secondary">Try Again</button>
        </div>
      )}

      {markdown && (
        <div className="results-section">
          <div className="results-header">
            <h2>Research Results</h2>
            <button onClick={downloadMarkdown} className="btn-secondary" style={{ width: 'auto' }}>
              Download Report
            </button>
          </div>

          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`tab-btn ${activeTab === 'markdown' ? 'active' : ''}`}
              onClick={() => setActiveTab('markdown')}
            >
              Markdown
            </button>
          </div>

          <div className={`tab-content ${activeTab === 'preview' ? 'active' : ''}`}>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
            />
          </div>

          <div className={`tab-content ${activeTab === 'markdown' ? 'active' : ''}`}>
            <pre className="markdown-content">{markdown}</pre>
          </div>

          <button onClick={resetForm} className="btn-primary" style={{ marginTop: '20px' }}>
            Research Another Company
          </button>
        </div>
      )}
    </div>
  );
}
