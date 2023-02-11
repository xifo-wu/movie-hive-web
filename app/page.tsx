import HomeBannerSection from "@/components/HomeBannerSection";

export default async function Home() {
  return (
    <>
      {/* NextJS 正在与 TS 合作解决 TypeScript */}
      {/* @ts-expect-error Server Component */}
      <HomeBannerSection />
    </>
  );
}
