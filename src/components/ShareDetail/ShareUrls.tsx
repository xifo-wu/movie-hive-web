'use client';

import useUser from '@/hooks/useUser';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  urls: Array<string>;
}

const ShareUrls = ({ urls }: Props) => {
  const { user } = useUser();
  const pathname = usePathname()

  if (!user.id) {
    return <div>有一股<Link className="text-amber-500 text-lg font-bold" href={`/login?redirect=${pathname}`}>神秘力量</Link>阻挡了你查看分享链接</div>;
  }

  return (
    <div>
      {urls.map((item: string) => (
        <a
          className="text-blue-600 block my-2 whitespace-nowrap text-ellipsis overflow-hidden"
          key={item}
          href={item}
          target="_blank"
          rel="noreferrer"
        >
          {item}
        </a>
      ))}
    </div>
  );
};

export default ShareUrls;
