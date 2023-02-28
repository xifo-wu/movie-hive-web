import CategoryCardList from "@/components/CategoryCardList";
import Footer from "@/components/Footer";
import HomeBannerSection from "@/components/HomeBannerSection";
import HomeHeader from "@/components/HomeHeader";
import LatestSharing from "@/components/LatestSharing";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '云盘资源分享 云盘网盘资源共享 云盘资源搜索 阿里云盘资源 - 影巢',
  description: '收集全网丰富的资源，收集全网阿里云盘资源，优质的资源分享，盘搜',
  applicationName: "影巢 HdHive",
  keywords: ['云盘资源分享', '云盘网盘资源共享', '云盘资源搜索', '阿里云盘资源', '盘搜'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: '/favicon.ico',
};

export default async function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <HomeHeader />
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
