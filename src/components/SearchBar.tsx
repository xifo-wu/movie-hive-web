"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

const SearchBar = () => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query) return;

    router.push(`/share/search?query=${query}`);
  };

  const urlQuery = searchParams?.get('query');
  useEffect(() => {
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [urlQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="border border-amber-500 relative w-full rounded-full">
      <input
        value={query}
        className="w-full text-lg leading-[48px] h-[48px] border-none py-2 px-4 rounded-full focus:outline-none"
        autoComplete="off"
        placeholder="输入关键字搜索电影，剧集"
        onChange={handleSearchChange}
      />

      <button
        className="text-white absolute right-0 bg-amber-500 h-[48px] text-lg py-2 px-7 hover:bg-amber-600 rounded-full tracking-widest"
        onClick={handleSearch}
      >
        搜索
      </button>
    </div>
  );
};

export default SearchBar;
