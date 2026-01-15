'use client';

interface Recruiter {
  name: string;
  title: string;
  linkedInUrl?: string;
  email?: string;
  department?: string;
}

interface RecruiterCardProps {
  recruiter: Recruiter;
}

export default function RecruiterCard({ recruiter }: RecruiterCardProps) {
  return (
    <div className="recruiter-card">
      <h3>{recruiter.name}</h3>
      <p className="title">{recruiter.title}</p>
      {recruiter.department && (
        <p style={{ color: '#718096', fontSize: '14px', marginBottom: '12px' }}>
          {recruiter.department}
        </p>
      )}
      <div className="contact-info">
        {recruiter.linkedInUrl && (
          <a href={recruiter.linkedInUrl} target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn Profile
          </a>
        )}
        {recruiter.email && (
          <a href={`mailto:${recruiter.email}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {recruiter.email}
          </a>
        )}
      </div>
    </div>
  );
}
