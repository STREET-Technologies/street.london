'use client';

import { useState } from 'react';

export default function TestAPI() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testContact = async () => {
    setLoading(true);
    setResult('Testing...');

    try {
      console.log('Starting fetch to /api/contact');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message from diagnostic page'
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      setResult(JSON.stringify({ status: response.status, data }, null, 2));
    } catch (error) {
      console.error('Fetch error:', error);
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>API Test Page</h1>
      <p>This page tests if the API routes are working correctly.</p>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={testContact}
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.125rem',
            background: '#c6ff00',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          Test Contact API
        </button>
      </div>

      {result && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap'
        }}>
          <strong>Result:</strong>
          <div>{result}</div>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Open Browser DevTools (F12)</li>
          <li>Go to Network tab</li>
          <li>Click "Test Contact API" button</li>
          <li>Check Network tab for the /api/contact request</li>
          <li>Check Console tab for any errors</li>
        </ol>
      </div>
    </div>
  );
}
