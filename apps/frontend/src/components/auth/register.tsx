'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import Link from 'next/link';
import { Button } from '@gitroom/react/form/button';
import { Input } from '@gitroom/react/form/input';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { CreateOrgUserDto } from '@gitroom/nestjs-libraries/dtos/auth/create.org.user.dto';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingComponent } from '@gitroom/frontend/components/layout/loading';
import clsx from 'clsx';
import { GoogleProvider } from '@gitroom/frontend/components/auth/providers/google.provider';
import { MagicLinkProvider } from '@gitroom/frontend/components/auth/providers/magic-link.provider';
import { useFireEvents } from '@gitroom/helpers/utils/use.fire.events';
import { useTrack } from '@gitroom/react/helpers/use.track';
import { TrackEnum } from '@gitroom/nestjs-libraries/user/track.enum';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
type Inputs = {
  providerToken: string;
  provider: string;
  company?: string;
};
export function Register() {
  const getQuery = useSearchParams();
  const fetch = useFetch();
  const [provider] = useState(getQuery?.get('provider')?.toUpperCase());
  const [code, setCode] = useState(getQuery?.get('code') || '');
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (provider && code) {
      load();
    }
  }, []);
  const load = useCallback(async () => {
    const { token } = await (
      await fetch(`/auth/oauth/${provider?.toUpperCase() || 'LOCAL'}/exists`, {
        method: 'POST',
        body: JSON.stringify({
          code,
        }),
      })
    ).json();
    if (token) {
      setCode(token);
      setShow(true);
    }
  }, [provider, code]);
  if (!code && !provider) {
    return <RegisterAfter token="" provider="LOCAL" />;
  }
  if (!show) {
    return <LoadingComponent />;
  }
  return (
    <RegisterAfter token={code} provider={provider?.toUpperCase() || 'LOCAL'} />
  );
}
function getHelpfulReasonForRegistrationFailure(httpCode: number) {
  switch (httpCode) {
    case 400:
      return 'Email already exists';
    case 404:
      return 'Your browser got a 404 when trying to contact the API, the most likely reasons for this are the NEXT_PUBLIC_BACKEND_URL is set incorrectly, or the backend is not running.';
  }
  return 'Unhandled error: ' + httpCode;
}
export function RegisterAfter({
  token,
  provider,
}: {
  token: string;
  provider: string;
}) {
  const t = useT();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fireEvents = useFireEvents();
  const track = useTrack();
  const isAfterProvider = useMemo(() => {
    return !!token && !!provider;
  }, [token, provider]);
  const resolver = useMemo(() => {
    return classValidatorResolver(CreateOrgUserDto);
  }, []);
  const form = useForm<Inputs>({
    resolver,
    defaultValues: {
      providerToken: token,
      provider: provider,
      company: '',
    },
  });
  const fetchData = useFetch();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await fetchData('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        company: data.company || 'My Company',
      }),
    })
      .then(async (response) => {
        setLoading(false);
        if (response.status === 200) {
          fireEvents('register');
          return track(TrackEnum.CompleteRegistration).then(() => {
            if (response.headers.get('activate') === 'true') {
              router.push('/auth/activate');
            } else {
              router.push('/auth/login');
            }
          });
        } else {
          form.setError('root', {
            message: await response.text(),
          });
        }
      })
      .catch((e) => {
        form.setError('root', {
          message:
            'General error: ' +
            e.toString() +
            '. Please check your browser console.',
        });
      });
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h1 className="text-3xl font-bold text-start mb-4 cursor-pointer">
            {t('sign_up', 'Sign Up')}
          </h1>
        </div>
        {!isAfterProvider && (
          <div className="gap-[5px] flex flex-col">
            <GoogleProvider />
          </div>
        )}
        {!isAfterProvider && (
          <>
            <div className="h-[20px] mb-[24px] mt-[24px] relative">
              <div className="absolute w-full h-[1px] bg-fifth top-[50%] -translate-y-[50%]" />
              <div
                className={`absolute z-[1] justify-center items-center w-full start-0 top-0 flex`}
              >
                <div className="bg-customColor15 px-[16px] text-sm">{t('or_magic_link', 'or use Magic Link')}</div>
              </div>
            </div>
            <MagicLinkProvider />
          </>
        )}
        {isAfterProvider && (
          <>
            <div className="mt-6">
              <Input
                name="company"
                label={t('company_name', 'Company Name')}
                placeholder={t('enter_company_name', 'Enter your company name')}
              />
            </div>
            <div className="text-center mt-6">
              <div className="w-full flex">
                <Button
                  type="submit"
                  className="flex-1 rounded-[4px]"
                  loading={loading}
                >
                  {t('create_account', 'Create Account')}
                </Button>
              </div>
            </div>
          </>
        )}
        <div className={clsx('text-[12px]', isAfterProvider ? 'mt-4' : 'mt-6')}>
          {t(
            'by_registering_you_agree_to_our',
            'By registering you agree to our'
          )}&nbsp;
          <Link
            href="/terms"
            className="underline hover:font-bold"
          >
            {t('terms_of_service', 'Terms of Service')}
          </Link>&nbsp;
          {t('and', 'and')}&nbsp;
          <Link
            href="/privacy"
            className="underline hover:font-bold"
          >
            {t('privacy_policy', 'Privacy Policy')}
          </Link>&nbsp;
        </div>
        {!isAfterProvider && (
          <div className="text-center mt-6">
            <p className="mt-4 text-sm">
              {t('already_have_an_account', 'Already Have An Account?')}&nbsp;
              <Link href="/auth/login" className="underline  cursor-pointer">
                {t('sign_in', 'Sign In')}
              </Link>
            </p>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
