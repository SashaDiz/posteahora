'use client';

import Link from 'next/link';
import { GoogleProvider } from '@gitroom/frontend/components/auth/providers/google.provider';
import { MagicLinkProvider } from '@gitroom/frontend/components/auth/providers/magic-link.provider';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
export function Login() {
  const t = useT();
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-start mb-4 cursor-pointer">
          {t('sign_in', 'Sign In')}
        </h1>
      </div>
      <div className="gap-[5px] flex flex-col">
        <GoogleProvider />
      </div>
      <div className="h-[20px] mb-[24px] mt-[24px] relative">
        <div className="absolute w-full h-[1px] bg-fifth top-[50%] -translate-y-[50%]" />
        <div
          className={`absolute z-[1] justify-center items-center w-full start-0 top-0 flex`}
        >
          <div className="bg-customColor15 px-[16px] text-sm">{t('or_magic_link', 'or use Magic Link')}</div>
        </div>
      </div>
      <MagicLinkProvider />
      <div className="text-center mt-6">
        <p className="mt-4 text-sm">
          {t('don_t_have_an_account', "Don't Have An Account?")}&nbsp;
          <Link href="/auth" className="underline cursor-pointer">
            {t('sign_up', 'Sign Up')}
          </Link>
        </p>
      </div>
    </div>
  );
}
