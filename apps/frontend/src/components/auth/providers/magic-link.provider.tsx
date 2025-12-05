'use client';

import { useCallback, useState } from 'react';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { useToaster } from '@gitroom/react/toaster/toaster';

export const MagicLinkProvider = () => {
  const fetch = useFetch();
  const t = useT();
  const toaster = useToaster();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendMagicLink = useCallback(async () => {
    if (!email || !email.includes('@')) {
      toaster.show('Please enter a valid email address', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/auth/magic-link/send', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSent(true);
        toaster.show('Magic link sent! Check your email.', 'success');
      } else {
        toaster.show(data.error || 'Failed to send magic link', 'warning');
      }
    } catch (error) {
      console.error('Failed to send magic link:', error);
      toaster.show('Failed to send magic link. Please try again.', 'warning');
    } finally {
      setIsLoading(false);
    }
  }, [email, fetch, toaster]);

  if (isSent) {
    return (
      <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <p className="text-green-400 font-medium mb-1">
          {t('magic_link_sent', 'Magic link sent!')}
        </p>
        <p className="text-sm text-gray-400">
          {t('check_email_magic_link', 'Check your email and click the link to sign in.')}
        </p>
        <button
          onClick={() => {
            setIsSent(false);
            setEmail('');
          }}
          className="mt-3 text-sm text-primary hover:underline"
        >
          {t('try_different_email', 'Try a different email')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('enter_email', 'Enter your email')}
          className="w-full h-[44px] px-4 rounded-[4px] bg-input border border-fifth text-textColor placeholder:text-gray-500 focus:outline-none focus:border-primary"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMagicLink();
            }
          }}
        />
      </div>
      <button
        onClick={sendMagicLink}
        disabled={isLoading || !email}
        className="cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed h-[44px] rounded-[4px] flex justify-center items-center text-white gap-[8px] w-full transition-all duration-200"
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
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
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            <span>{t('send_magic_link', 'Send Magic Link')}</span>
          </>
        )}
      </button>
    </div>
  );
};

