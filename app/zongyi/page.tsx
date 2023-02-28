import BottomTitleBanner from '@/components/Banner/BottomTitleBanner';
import Header from '@/components/Header';
import ZongYiList from '@/components/ZongYi/List';
import { fetchBannerData } from '@/services/share';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '剧集分享 - 热门好看的电视剧大全 - 影巢',
  description: '收集全网阿里云盘资源，电视内容丰富全面，阿里云盘流畅播放',
};

const MoviePage = async () => {
  const { data: bannerData = [] } = await fetchBannerData('zongyi');

  return (
    <main className="relative flex flex-col min-h-screen bg-gray-800">
      <Header />
      <BottomTitleBanner data={bannerData} />
      <ZongYiList />
    </main>
  );
};

export default MoviePage;
