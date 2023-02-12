import { notFound } from "next/navigation";
import { fetchShareDetail } from "@/services/share";
import Image from "next/image";
import FillImage from "@/components/FillImage";
import Markdown from "@/components/Markdown";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";

// in nextjs 13.2
// export async function generateMetadata({ params, searchParams }: any) {
//   if (!params || !params.slug) {
//     return {};
//   }

//   const response = await fetchShareDetail(params.slug);
//   if (!response.success) {
//     return {
//       title: "NOT FOUND",
//     };
//   }

//   const { data } = response;
//   return { title: data.title };
// }

interface Props {
  params: { slug: string };
}
const ShareDetail = async ({ params }: Props) => {
  const response = await fetchShareDetail(params.slug);
  if (!response || !response.success) {
    notFound();
  }

  const { data } = response;
  return (
    <div className="min-h-screen h-full flex flex-col">
      <HomeHeader />
      <section className="p-8 pt-20 bg-slate-100 relative">
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
                <span className="text-2xl opacity-80 font-normal">
                  ({data.release_date})
                </span>
              </h1>
              <div className="my-4">
                {(data?.genres || []).map((item: string, index: number) => (
                  <span key={index}>
                    {item}
                    {index !== data.genres.length - 1 && ", "}
                  </span>
                ))}
                {data.runtime &&
                  data.share_type === "tv" &&
                  ` · 每集约 ${data.runtime} 分钟`}

                {data.runtime &&
                  data.share_type === "movie" &&
                  ` · ${data.runtime} 分钟`}
              </div>

              <h2 className="italic opacity-75">{data.tagline}</h2>
              <h3 className="my-3 text-xl font-medium">简介</h3>
              <p className="block my-3">{data.overview}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-4 min-w-0 flex-col-reverse md:flex-row flex-1 container max-w-7xl my-5 mx-auto px-4">
        <div className="flex-1">
          <h3 className="my-3 text-xl font-medium">分享来源</h3>
          <div className="block my-3">
            <Markdown data={data.share_source || "-"} />
          </div>
          <h3 className="my-3 text-xl font-medium">备注</h3>
          <Markdown data={data.remark} />
          <h3 className="my-3 text-xl font-medium">分享链接</h3>
          <div>
            {data.share_url.map((item: string) => (
              <a
                className="text-blue-600 block my-2 whitespace-nowrap text-ellipsis overflow-hidden"
                key={item}
                href={item}
                target="_blank"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[320px]">
          <div className="h-[220px] w-full rounded-md flex items-center justify-center bg-slate-300">
            AD Block
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShareDetail;
