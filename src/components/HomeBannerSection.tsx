import { fetchLatestShare } from "@/services/share";
import FillImage from "@/components/FillImage";

async function HomeBannerSection() {
  const { data } = await fetchLatestShare();

  return (
    <section className="aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-5 bg-slate-100 relative">
      <FillImage
        priority
        src={data?.backdrop_url}
        className="object-cover contrast-50 select-none"
        alt="影巢"
      />
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/60 absolute left-0 right-0 top-0 bottom-0 " />
      <div className="container max-w-7xl mx-auto px-4 text-white flex flex-col justify-center">
        <h1 className="text-4xl mb-4">
          <span className="leading-normal">欢迎来到</span>
          <span className="whitespace-nowrap leading-normal">
            影巢(HD Hive)
          </span>
        </h1>
        <h2 className="text-xl mb-6">
          这里收集海量的电影、剧集、动漫。等你来发现！
        </h2>
        <div className="relative w-full">
          <input
            className="w-full text-slate-600 dark:text-slate-50 text-lg leading-[48px] h-[48px] border-none py-2 px-4 rounded-full focus:outline-none"
            autoComplete="off"
            placeholder="输入关键字搜索电影，剧集"
          />

          <button className="absolute right-0 bg-amber-500 h-[48px] text-lg py-2 px-7 hover:bg-amber-600 rounded-full tracking-widest">
            搜索
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeBannerSection;
