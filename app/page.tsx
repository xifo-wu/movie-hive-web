import CategoryCardList from '@/components/CategoryCardList';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HomeBannerSection from '@/components/HomeBannerSection';
import LatestSharing from '@/components/LatestSharing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '影巢 - 网盘资源搜索',
  description:
    '主打全网阿里云盘资源收集，快速的资料搜索系统，丰富的网盘资源。主动收集全网丰富的资源，包含但不限于电影、电视剧、动漫、纪录片、REMUX、蓝光、原盘等',
  applicationName: '影巢 HdHive',
  keywords: ['云盘资源分享', '云盘网盘资源共享', '云盘资源搜索', '阿里云盘资源', '盘搜'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
  },
  icons: '/favicon.ico',
  themeColor: '#f59e0b',
};

export default async function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Header />
      {/* NextJS 正在与 TS 合作解决 TypeScript */}
      {/* @ts-expect-error Server Component */}
      <HomeBannerSection />
      <div className="container max-w-7xl mx-auto px-4 flex flex-col flex-1">
        {/* 分类 */}
        <CategoryCardList />
        {/* @ts-expect-error Server Component */}
        <LatestSharing />
      </div>
      <Footer />
    </main>
  );
}
