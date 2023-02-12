import Image from "next/image";
import { fetchShare } from "@/services/share";
import { notFound } from "next/navigation";
import SharingSimpleCard from "@/components/SharingSimpleCard";
import Link from "next/link";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}
const ShareListPage = async ({ searchParams }: Props) => {
  const response = await fetchShare({ per_page: 100, ...searchParams });
  if (!response || !response.data || !response.success) {
    notFound();
  }

  const { data, meta } = response;

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
        <h2 className="text-2xl font-medium mb-8">
          分享列表 <span className="text-xl">- Sharing List</span>
        </h2>

        <div className="flex gap-6 flex-wrap">
          {data.map((item: any) => (
            <SharingSimpleCard data={item} key={item.slug} />
          ))}
        </div>
        <div className="mt-5 w-full flex gap-2 justify-end">
          {meta.has_prev && (
            <Link
              className={`text-white rounded-md bg-amber-500 py-1 px-4 ${
                !meta.has_prev && "pointer-events-none"
              }`}
              href={`/share?before=${meta.before}`}
            >
              上一页
            </Link>
          )}

          {meta.has_next && (
            <Link
              className={`text-white rounded-md bg-amber-500 py-1 px-4 ${
                !meta.has_next && "pointer-events-none"
              }`}
              href={`/share?after=${meta.after}`}
            >
              下一页
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareListPage;
