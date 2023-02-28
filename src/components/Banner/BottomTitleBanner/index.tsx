'use client';
import Link from 'next/link';
import Slider from 'react-slick';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

export interface BottomTitleBannerProps {
  data: Array<any>; // TODO any => share type
}

const BottomTitleBanner = ({ data }: BottomTitleBannerProps) => {
  const settings = {
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="container max-w-7xl mx-auto pb-4 mb-4 text-white">
      <div>
        <Slider {...settings} className="h-full">
          {data.map((item) => (
            <div key={item.id}>
              <Link href={`/share/${item.slug}`} className="relative">
                <div className="bg-gradient-to-r from-gray-800 absolute left-0 top-0 z-10 h-full w-[256px]" />
                <div className="bg-gradient-to-l from-gray-800 absolute right-0 top-0 h-full w-[256px]" />
                <div className="bg-gradient-to-t from-gray-800 absolute bottom-0 h-[256px] w-full" />

                <div className="absolute z-20 bottom-0 pb-8 pl-14">
                  <h1 className="text-2xl" style={{ textShadow: '2px 2px 6px rgba(0,0,0,.7)' }}>
                    {item.title}
                  </h1>
                  <span className="block w-14 h-1 bg-amber-500 rounded-sm my-2" />
                  <h2
                    className="text-slate-200"
                    style={{ textShadow: '2px 2px 6px rgba(0,0,0,.7)' }}
                  >
                    {item.tagline || item.original_title}
                  </h2>
                </div>
                <div
                  className="w-full h-[408px] bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${item.backdrop_url})` }}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BottomTitleBanner;
