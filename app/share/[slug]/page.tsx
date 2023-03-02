import { notFound } from 'next/navigation';
import { fetchBannerData, fetchShareDetail } from '@/services/share';
import Image from 'next/image';
import FillImage from '@/components/FillImage';
import Markdown from '@/components/Markdown';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import Header from '@/components/Header';
import SharingSimpleCard from '@/components/SharingSimpleCard';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  if (!params || !params.slug) {
    return {};
  }

  const response = await fetchShareDetail(params.slug);
  if (!response.success) {
    return {
      title: 'NOT FOUND',
    };
  }

  const { data } = response;
  return {
    title: `${data.title} - 影巢 - 网盘资源`,
    keywords: [`${data.title}资源分享`, `${data.title}网盘分享`, `${data.title} 在线`],
    description: `${data.title}资源分享, ${data.title}网盘分享, ${data.title} 在线`,
  };
}

interface Props {
  params: { slug: string };
}
const ShareDetail = async ({ params }: Props) => {
  const response = await fetchShareDetail(params.slug);

  if (!response || !response.success) {
    notFound();
  }

  const { data } = response;
  const { data: bannerData = [] } = await fetchBannerData(data.share_type);

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <section className="p-8 bg-slate-100 dark:bg-slate-700 relative">
        <FillImage
          priority
          src={data?.backdrop_url}
          className="object-cover select-none"
          alt="影巢"
        />
        <div className="bg-gradient-to-br from-slate-900 to-slate-900/70 absolute left-0 right-0 top-0 bottom-0 " />

        <div className="container max-w-7xl mx-auto px-4 text-white flex flex-wrap gap-8">
          <div className="relative w-full pb-[150%] md:pb-0 md:w-[300px] md:h-[450px] md:block">
            <FillImage
              priority
              className="object-cover rounded-xl select-none"
              src={data.poster_url}
              alt={data.title}
            />
          </div>

          <div className="text-white z-10 py-2 flex-1">
            <div className="title">
              <h1 className="text-4xl font-medium">
                {data.title}
                <span className="text-2xl opacity-80 font-normal">({data.release_date})</span>
              </h1>
              <div className="my-4">
                {(data?.genres || []).map((item: string, index: number) => (
                  <span key={index}>
                    {item}
                    {index !== data.genres.length - 1 && ', '}
                  </span>
                ))}
                {data.runtime && data.share_type === 'tv' && ` · 每集约 ${data.runtime} 分钟`}

                {data.runtime && data.share_type === 'movie' && ` · ${data.runtime} 分钟`}
              </div>

              <h2 className="italic opacity-75">{data.tagline}</h2>
              <h3 className="my-3 text-xl font-medium">简介</h3>
              <p className="block my-3">{data.overview}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl my-5 mx-auto px-4 md:px-8">
        <div>
          <h1 className="my-4 md:my-8 relative block text-xl before:w-2 before:h-full before:block before:content-[''] before:absolute before:bg-amber-500 before:left-0 before:top-0 pl-4 before:rounded">
            资源简介
          </h1>
          <Markdown data={data.remark} />
          <h1 className="my-4 md:my-8 relative block text-xl before:w-2 before:h-full before:block before:content-[''] before:absolute before:bg-amber-500 before:left-0 before:top-0 pl-4 before:rounded">
            分享链接
          </h1>
          <div>
            {data.share_url.map((item: string) => (
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
        </div>

        {/* 推荐 */}
        <h1 className="my-4 md:my-8 relative block text-xl before:w-2 before:h-full before:block before:content-[''] before:absolute before:bg-amber-500 before:left-0 before:top-0 pl-4 before:rounded">
          推荐列表
        </h1>
        <div className="mb-5">
          <div className="flex justify-center md:justify-start gap-6 flex-wrap">
            {bannerData.map((item: any) => (
              <SharingSimpleCard data={item} key={item.slug} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShareDetail;
