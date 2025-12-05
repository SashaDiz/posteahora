'use client';

import React, { FC, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import useSWR from 'swr';
import { useUser } from '@gitroom/frontend/components/layout/user.context';
import clsx from 'clsx';

export const OrganizationSelector: FC<{ asOpenSelect?: boolean }> = ({
  asOpenSelect,
}) => {
  const fetch = useFetch();
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const load = useCallback(async () => {
    return await (await fetch('/user/organizations')).json();
  }, []);
  const { isLoading, data } = useSWR('organizations', load, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    revalidateOnReconnect: false,
  });

  const currentOrg = useMemo(() => {
    return data?.find((d: any) => d.id === user?.orgId);
  }, [data, user?.orgId]);

  const changeOrg = useCallback(
    async (orgId: string) => {
      await fetch('/user/change-org', {
        method: 'POST',
        body: JSON.stringify({
          id: orgId,
        }),
      });
      window.location.reload();
    },
    [fetch]
  );

  const handleSelect = useCallback(
    (orgId: string) => {
      if (orgId !== user?.orgId) {
        changeOrg(orgId);
      }
      setIsOpen(false);
    },
    [changeOrg, user?.orgId]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (isLoading || (!isLoading && data?.length === 1)) {
    return null;
  }

  if (asOpenSelect) {
    return (
      <div className="max-w-[500px] mx-auto mb-[10px]">
        <select
          value={user?.orgId || ''}
          onChange={(e) => changeOrg(e.target.value)}
          className="w-full h-[42px] bg-newBgColorInner px-[16px] outline-none border-newTableBorder border rounded-[8px] text-[14px] text-newTextColor"
        >
          {data?.map((org: { name: string; id: string }) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-[8px] h-[36px] px-[12px] bg-newBgColorInner border border-newTableBorder rounded-[8px]',
          'text-[14px] text-textItemBlur hover:text-newTextColor transition-colors',
          'cursor-pointer whitespace-nowrap'
        )}
      >
        <span className="max-w-[150px] truncate">{currentOrg?.name || 'Select Company'}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            'transition-transform',
            isOpen && 'rotate-180'
          )}
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-[calc(100%+8px)] right-0 min-w-[200px] bg-newBgColorInner border border-newTableBorder rounded-[8px] shadow-lg z-50 overflow-hidden"
        >
          <div className="py-[4px]">
            {data?.map((org: { name: string; id: string }) => (
              <button
                key={org.id}
                onClick={() => handleSelect(org.id)}
                className={clsx(
                  'w-full text-left px-[12px] py-[8px] text-[14px] transition-colors',
                  'hover:bg-boxHover',
                  org.id === user?.orgId
                    ? 'text-newTextColor bg-boxHover'
                    : 'text-textItemBlur hover:text-newTextColor'
                )}
              >
                {org.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
