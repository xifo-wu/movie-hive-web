import BottomTitleBanner from '@/components/Banner/BottomTitleBanner';
import Header from '@/components/Header';
import TvList from '@/components/Tv/List';
import { fetchBannerData } from '@/services/share';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '纪录片分享 - 经典记录片 - 影巢',
  description: '收集全网阿里云盘资源，电视内容丰富全面，阿里云盘流畅播放',
};

const DocumentaryPage = async () => {
  const { data: bannerData = [] } = await fetchBannerData('documentary');

  return (
    <main className="relative flex flex-col min-h-screen bg-gray-800">
      <Header />
      <BottomTitleBanner data={bannerData} />
      <TvList />
    </main>
  );
};

export default DocumentaryPage;
