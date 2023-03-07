'use client';
import Image from 'next/image';
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
      <Slider {...settings} className="w-full">
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/share/${item.slug}`}
            className="relative w-full h-full aspect-w-6 aspect-h-[2.5]"
          >
            <div className="flex justify-between">
              <div className="bg-gradient-to-r from-gray-800 z-10 h-full w-[15%]" />
              <div className="bg-gradient-to-l from-gray-800 z-10 h-full w-[15%]" />
              <div className="bg-gradient-to-t from-gray-800 absolute bottom-0 z-10 h-[10%] w-full" />
              <div className="absolute z-20 bottom-0 pb-4 pl-7 sm:pb-8 sm:pl-14">
                <h1
                  className="text-sm sm:text-2xl"
                  style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)' }}
                >
                  {item.title}
                </h1>
                <span className="block w-14 h-[2px] sm:h-1 bg-amber-500 rounded-sm my-1 sm:my-2" />
                <h2
                  className="text-xs text-slate-200"
                  style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)' }}
                >
                  {item.tagline || item.original_title}
                </h2>
              </div>
            </div>
            <Image fill src={item.backdrop_url} alt={item.title} />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default BottomTitleBanner;
