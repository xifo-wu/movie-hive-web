import { fetchShare } from '@/services/share';
import ShareCardStyle1 from './ShareCard/Style1';

const LatestSharing = async () => {
  const response = await fetchShare({ per_page: 100 });

  if (!response.success) {
    return <div>出现了错误！ {response.message}</div>;
  }

  const { data } = response;

  return (
    <div className="mt-6">
      <div className="w-full flex justify-between items-center  mb-8">
        <h2 className="text-2xl font-medium">
          最新分享
          <span className="text-xl text-slate-400 dark:text-slate-200 block sm:inline">
            <span className="hidden sm:inline">-</span> Latest Sharing
          </span>
        </h2>
      </div>

      <div className="mb-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {data.map((item: any) => (
            <ShareCardStyle1 key={item.slug} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestSharing;
