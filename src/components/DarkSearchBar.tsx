'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbBrandTelegram } from 'react-icons/tb';

const DarkSearchBar = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: any) => {
    const { query } = values;
    if (!query) return;
    setLoading(true);
    router.push(`/share/search?query=${query}`);
    setLoading(false);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full text-slate-600 dark:text-slate-50 text-lg leading-[48px] h-[48px] border-none py-2 px-4 rounded-full focus:outline-none"
          autoComplete="off"
          placeholder="输入关键字搜索电影，剧集"
          {...register('query')}
        />

        <button
          type="submit"
          className="absolute right-0 bg-amber-500 h-[48px] text-lg py-2 px-7 hover:bg-amber-600 rounded-full tracking-widest disabled:opacity-75 disabled:hover:cursor-not-allowed disabled:hover:bg-amber-500"
          disabled={loading}
        >
          {loading ? (
            <div className="flex gap-2 items-center justify-center animate-[flash_3s_ease-in-out_infinite]">
              <TbBrandTelegram />
              搜索中
            </div>
          ) : (
            '搜索'
          )}
        </button>
      </form>
    </div>
  );
};

export default DarkSearchBar;
