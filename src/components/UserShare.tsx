'use client';

import api from '@/utils/api';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { TbChevronLeft, TbChevronRight, TbLoaderQuarter } from 'react-icons/tb';
import useSWR from 'swr';

interface Props {
  userId: string;
}

const prePage = 12;

const UserShare = ({ userId }: Props) => {
  const [page, setPage] = useState(1);

  const {
    data: response = {},
    isLoading,
    isValidating,
  } = useSWR<any>(
    [
      '/api/v1/share/es-list',
      {
        query: {
          bool: {
            must: [
              {
                term: {
                  user_id: userId,
                },
              },
            ],
          },
        },
        per_page: prePage,
        page,
      },
    ],
    ([url, body]: any) => api.post(url, body),
  );

  const { response: { data = [] } = {} } = response;

  const handlePrev = () => {
    if (page === 1) {
      return;
    }

    setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (!data.length && page !== 1) {
      return;
    }

    if (data.length !== prePage) {
      return;
    }

    setPage((p) => p + 1);
  };

  return (
    <div className="w-full p-4 h-full">
      {!isLoading && !data.length && page !== 1 && (
        <div className="w-full h-[282px] flex justify-center items-center">没有更多分享了</div>
      )}
      {(isValidating || isLoading) && (
        <div className="w-full h-[282px] flex gap-1 justify-center items-center">
          <TbLoaderQuarter className="animate-spin" />
          加载中
        </div>
      )}

      <div className="min-h-[282px] grid grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item: any) => (
          <Link key={item.id} href={`/share/${item.slug}`}>
            <div className="aspect-w-6 aspect-h-9 bg-slate-200 relative">
              <Image
                fill
                src={item.poster_url}
                className="rounded-md object-cover"
                alt={item.title}
              />
            </div>
            <h1
              className="w-[150px] mt-3 whitespace-nowrap text-ellipsis overflow-hidden"
              title={item.title}
            >
              {item.title}
            </h1>
            <h2 className="text-xs mt-1 text-slate-400 dark:text-slate-200">{item.release_date}</h2>
          </Link>
        ))}
      </div>
      <div className="w-full mt-2 text-right space-x-2">
        <TbChevronLeft
          onClick={handlePrev}
          className={clsx('inline-block text-4xl cursor-pointer text-amber-500', {
            'cursor-not-allowed text-gray-200': page === 1,
          })}
        />
        <TbChevronRight
          onClick={handleNext}
          className={clsx('cursor-pointer inline-block text-4xl text-amber-500', {
            'cursor-not-allowed text-gray-200': data.length !== prePage,
          })}
        />
      </div>
    </div>
  );
};

export default UserShare;
