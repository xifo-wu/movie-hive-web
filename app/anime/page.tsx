import BottomTitleBanner from '@/components/Banner/BottomTitleBanner';
import Header from '@/components/Header';
import AnimesList from '@/components/Animes/List';
import { fetchBannerData } from '@/services/share';

export const metadata = {
  title: '动漫分享 - 影巢',
  description: "最新番剧持续更新，订阅阿里云盘自动追番"
};

const AnimePage = async () => {
  const { data: bannerData = [] } = await fetchBannerData('anime');

  return (
    <main className="relative flex flex-col min-h-screen bg-gray-800">
      <Header />
      <BottomTitleBanner data={bannerData} />
      <AnimesList />
    </main>
  );
};

export default AnimePage;
