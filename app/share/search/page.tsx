"use client";

import { fetchShareSearch } from "@/services/share";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { useSearchParams } from "next/navigation";
import api from "@/utils/api";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ShareSearch = ({}: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query");

  const { data: response = {}, error } = useSWR<any>(
    query ? `/api/v1/share/search?query=${query}` : null,
    api.get
  );
  // const response = await fetchShareSearch({ query: searchParams?.["query"] });

  const { data = [], meta = { total: 0 } } = response;

  console.log(data, error, "data, error");

  return (
    <div>
      <div
        className="w-[500px] h-[500px] rounded-full fixed opacity-25 blur-[100px] top-64 -left-64 right-auto bottom-auto z-[-1]"
        style={{ backgroundImage: "linear-gradient(45deg, #f59e0b, #f97316)" }}
      />
      <div
        className="w-[500px] h-[500px] rounded-full fixed opacity-25 blur-[100px] -top-64 left-auto -right-64 bottom-auto z-[-1]"
        style={{ backgroundImage: "linear-gradient(45deg, #64748b, #94a3b8)" }}
      />
      <div className="px-3 w-full absolute left-1/2 -translate-x-1/2 top-3 z-10 max-w-7xl mx-auto flex gap-2 items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/logo.png" width={48} height={40} alt="影巢 Logo" />
          <h1 className="mt-2" title="影巢 HD Hive">
            影巢 - HD Hive
          </h1>
        </Link>
      </div>
      <div className="container max-w-7xl mx-auto px-4 mt-24">
        <SearchBar />

        <div className="my-5">
          <h1>共搜索到 {meta.total} 条相关记录</h1>
        </div>
        <div className="flex flex-wrap gap-y-5 my-4 -mx-2.5">
          {data.map((item: any) => (
            <Link
              className="px-2.5 basis-full shrink-0 grow-0 lg:basis-1/2"
              key={item["_source"]["slug"]}
              href={`/share/${item["_source"]["slug"]}`}
            >
              <div className="flex min-w-0 gap-4">
                <div className="w-[150px] overflow-hidden h-[225px] relative">
                  <Image
                    className="rounded-md shadow-lg"
                    src={item["_source"]["small_poster_url"]}
                    fill
                    sizes="150px"
                    alt={item["_source"]["title"]}
                  />
                </div>
                <div className="flex-1">
                  <div className="mt-1 mb-3">
                    {item["highlight"]["title"] ? (
                      <div
                        className="text-2xl font-medium"
                        dangerouslySetInnerHTML={{
                          __html: `${item["highlight"]["title"][0]}<span class="text-lg opacity-80 font-normal">(${item["_source"]["release_date"]})</span>`,
                        }}
                      />
                    ) : (
                      <h2 className="text-2xl font-medium">
                        {item["_source"]["title"]}
                      </h2>
                    )}
                  </div>

                  <div>
                    {item["highlight"]["overview"] ? (
                      <div
                        className="text-lg"
                        dangerouslySetInnerHTML={{
                          __html: item["highlight"]["overview"][0],
                        }}
                      />
                    ) : (
                      <div className="line-clamp-6 text-lg">
                        {item["_source"]["overview"]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {meta.total === 0 && (
          <div className="text-center flex flex-col justify-center min-h-[40vh] mt-5 ">
            <div className="my-4">找不到你想要的？那就去问问吧!</div>
            <a
              className="text-amber-500"
              href="https://t.me/s/Aliyun_4K_Movies"
              target="_blank"
            >
              https://t.me/s/Aliyun_4K_Movies
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareSearch;
