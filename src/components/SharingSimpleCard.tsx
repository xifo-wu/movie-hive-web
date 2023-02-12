"use client";

import Image from "next/image";
import Link from "next/link";

const SharingSimpleCard = ({ data }: any) => {
  return (
    <Link
      className="cursor-pointer"
      href={`/share/${data.slug}`}
    >
      <div className="w-[150px] overflow-hidden min-h-[225px] relative">
        <Image
          className="rounded-md shadow-lg"
          src={data.small_poster_url}
          fill
          alt={data.title}
        />
      </div>
      <h1
        className="w-[150px] mt-3 whitespace-nowrap text-ellipsis overflow-hidden"
        title={data.title}
      >
        {data.title}
      </h1>
      <h2 className="text-xs mt-1 text-slate-400 dark:text-slate-200">
        {data.release_date}
      </h2>
    </Link>
  );
};

export default SharingSimpleCard;
