import { fetchShareDetail } from "@/services/share";

// TODO nextjs 13.2 将会删除
export default async function Head({ params }: { params: { slug: string } }) {
  const response = await fetchShareDetail(params.slug);
  if (!response || !response.success) {
    return (
      <>
        <title>Not found</title>
      </>
    );
  }

  const { data } = response;

  return (
    <>
      <title>{data.title}</title>
      <meta name="description" content={data.overview} />
      <meta name="keywords" content={(data.keywords || []).join(", ")} />
    </>
  );
}
