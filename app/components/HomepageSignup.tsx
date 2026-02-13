'use client';

import { useState } from 'react';

export default function HomepageSignup() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please fill in all fields');
      setFormState('error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email');
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setFormState('success');
      } else {
        setErrorMessage('Something went wrong. Try again.');
        setFormState('error');
      }
    } catch {
      setErrorMessage('Something went wrong. Try again.');
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <div className="mystery-success">
        <p>You&apos;re on the list.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mystery-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mystery-input"
        disabled={formState === 'loading'}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mystery-input"
        disabled={formState === 'loading'}
      />
      {formState === 'error' && (
        <p className="mystery-error">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="mystery-submit"
        disabled={formState === 'loading'}
      >
        {formState === 'loading' ? 'JOINING...' : 'GET EARLY ACCESS'}
      </button>
    </form>
  );
}
