import Header from '@/components/Header';
import Link from 'next/link';

const EbookPage = () => {
  return (
    <>
      <Header />

      <div className="flex items-center justify-center min-h-screen h-hull">
        <div
          className="w-[500px] h-[500px] rounded-full fixed opacity-25 blur-[100px] top-64 -left-64 right-auto bottom-auto z-[-1]"
          style={{ backgroundImage: 'linear-gradient(45deg, #f59e0b, #f97316)' }}
        />
        <div
          className="w-[500px] h-[500px] rounded-full fixed opacity-25 blur-[100px] -top-64 left-auto -right-64 bottom-auto z-[-1]"
          style={{ backgroundImage: 'linear-gradient(45deg, #64748b, #94a3b8)' }}
        />

        <div className="text-md">
          <div>看啥书啊～ 去隔壁看电影去。</div>
          <Link href="/movie" className="text-amber-500">
            点这看电影去！
          </Link>
        </div>
      </div>
    </>
  );
};

export default EbookPage;
