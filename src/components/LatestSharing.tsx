import { fetchShare } from "@/services/share";
import SharingSimpleCard from "./SharingSimpleCard";

const LatestSharing = async () => {
  const response = await fetchShare({ per_page: 100 });

  if (!response.success) {
    return <div>出现了错误！ {response.message}</div>;
  }

  const { data } = response;

  return (
    <div className="mt-10">
      <h2 className="text-2xl mb-8">
        最新分享 <span className="text-xl">- Latest Sharing</span>
      </h2>

      <div>
        <div className="flex gap-6 flex-wrap">
          {data.map((item: any) => (
            <SharingSimpleCard data={item} key={item.slug} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestSharing;
