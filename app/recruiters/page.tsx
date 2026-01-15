'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RecruiterCard from '../components/RecruiterCard';

interface Recruiter {
  name: string;
  title: string;
  linkedInUrl?: string;
  email?: string;
  department?: string;
}

interface ApiStatus {
  status: string;
  hasApiKey: boolean;
  provider?: string;
}

export default function RecruitersPage() {
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recruiters, setRecruiters] = useState<Recruiter[] | null>(null);
  const [searchedCompany, setSearchedCompany] = useState<string>('');

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
    setRecruiters(null);
    setSearchedCompany(companyName.trim());

    try {
      const res = await fetch('/api/recruiters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: companyName.trim() }),
      });

      const data = await res.json() as { recruiters?: Recruiter[]; error?: string; message?: string };

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to find recruiters');
      }

      setRecruiters(data.recruiters || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCompanyName('');
    setError(null);
    setRecruiters(null);
    setSearchedCompany('');
  };

  return (
    <div className="container">
      <header>
        <h1>Recruiter Finder</h1>
        <p className="subtitle">
          Two features: company research reports and recruiter discovery for any company.
        </p>
        <nav className="nav-links">
          <Link href="/" className="nav-link">Company Research</Link>
          <Link href="/recruiters" className="nav-link active">Recruiter Finder</Link>
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

      {!recruiters && !error && (
        <div className="search-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="companyName">Company</label>
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
              {isLoading ? 'Searching...' : 'Find Recruiters'}
            </button>
          </form>

          <div className="examples">
            <p>Try: </p>
            <button className="example-btn" onClick={() => setCompanyName('Stripe')}>Stripe</button>
            <button className="example-btn" onClick={() => setCompanyName('Anthropic')}>Anthropic</button>
            <button className="example-btn" onClick={() => setCompanyName('OpenAI')}>OpenAI</button>
            <button className="example-btn" onClick={() => setCompanyName('Shopify')}>Shopify</button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="progress-text">
            Searching for recruiters at {searchedCompany}... This may take 30-60 seconds
          </p>
        </div>
      )}

      {error && (
        <div className="error-section">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={resetForm} className="btn-secondary">Try Again</button>
        </div>
      )}

      {recruiters !== null && (
        <div className="results-section">
          <div className="results-header">
            <h2>Current recruiters at {searchedCompany}</h2>
          </div>

          {recruiters.length > 0 ? (
            <div className="recruiters-grid">
              {recruiters.map((recruiter, index) => (
                <RecruiterCard key={`${recruiter.name}-${index}`} recruiter={recruiter} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No recruiters found</h3>
              <p>We couldn&apos;t find any recruiters at {searchedCompany}. Try searching for a different company.</p>
            </div>
          )}

          <button onClick={resetForm} className="btn-primary" style={{ marginTop: '30px' }}>
            Search Another Company
          </button>
        </div>
      )}
    </div>
  );
}
