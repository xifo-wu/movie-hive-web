import Image from 'next/image';
import Link from 'next/link';
import type { Share } from '@/types/Share';

interface Props {
  data: Share;
}

const ShareCardStyle1 = ({ data }: Props) => {
  return (
    <Link key={data.slug} href={`/share/${data.slug}`}>
      <div className="aspect-w-6 aspect-h-9 bg-slate-200 dark:bg-slate-900 rounded-md relative">
        <Image fill src={data.poster_url} className="rounded-md object-cover" alt={data.title} />
      </div>
      <h1
        className="w-full mt-1 sm:mt-3 whitespace-nowrap text-sm sm:text-base text-ellipsis overflow-hidden"
        title={data.title}
      >
        {data.title}
      </h1>
      <h2 className="mt-1 text-xs text-slate-400 dark:text-slate-200">{data.release_date}</h2>
    </Link>
  );
};

export default ShareCardStyle1;
