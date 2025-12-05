'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

export default function MagicLinkPage() {
  const t = useT();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const fetch = useFetch();
  
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const verifyToken = useCallback(async () => {
    if (!token) {
      setStatus('error');
      setErrorMessage('No magic link token provided');
      return;
    }

    try {
      const response = await fetch('/auth/magic-link/verify', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        // The cookie is set by the backend, page will reload
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to verify magic link');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to verify magic link. Please try again.');
    }
  }, [token, fetch]);

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setStatus('error');
      setErrorMessage('Invalid magic link');
    }
  }, [token, verifyToken]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <svg
          className="animate-spin h-12 w-12 text-primary mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-gray-400">
          {t('verifying_magic_link', 'Verifying your magic link...')}
        </p>
      </div>
    );
  }


  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <svg
          className="w-16 h-16 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="text-xl font-bold text-red-400 mb-2">
          {t('magic_link_error', 'Magic Link Error')}
        </h2>
        <p className="text-gray-400 mb-6">{errorMessage}</p>
        <a
          href="/auth/login"
          className="text-primary hover:underline"
        >
          {t('back_to_login', 'Back to Login')}
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
      <svg
        className="w-16 h-16 text-green-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="text-xl font-bold text-green-400 mb-2">
        {t('success', 'Success!')}
      </h2>
      <p className="text-gray-400">
        {t('redirecting', 'Redirecting you to the dashboard...')}
      </p>
    </div>
  );
}

