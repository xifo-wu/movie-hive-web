import BottomTitleBanner from '@/components/Banner/BottomTitleBanner';
import Header from '@/components/Header';
import MoviesList from '@/components/Movies/List';
import { fetchBannerData } from '@/services/share';

export const metadata = {
  title: '电影分享 - 影巢',
};

const MoviePage = async () => {
  const { data: bannerData = [] } = await fetchBannerData('movie');

  return (
    <main className="relative flex flex-col min-h-screen bg-gray-800">
      <Header />
      <BottomTitleBanner data={bannerData} />
      <MoviesList />
    </main>
  );
};

export default MoviePage;
