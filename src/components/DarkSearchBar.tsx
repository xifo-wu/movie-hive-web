"use client";

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from "react";

const DarkSearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query) return;

    router.push(`/share/search?query=${query}`);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        className="w-full text-slate-600 dark:text-slate-50 text-lg leading-[48px] h-[48px] border-none py-2 px-4 rounded-full focus:outline-none"
        autoComplete="off"
        placeholder="输入关键字搜索电影，剧集"
        onChange={handleSearchChange}
      />

      <button
        className="absolute right-0 bg-amber-500 h-[48px] text-lg py-2 px-7 hover:bg-amber-600 rounded-full tracking-widest"
        onClick={handleSearch}
      >
        搜索
      </button>
    </div>
  );
};

export default DarkSearchBar;
