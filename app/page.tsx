import Footer from "@/components/Footer";
import HomeBannerSection from "@/components/HomeBannerSection";
import HomeHeader from "@/components/HomeHeader";
import LatestSharing from "@/components/LatestSharing";

export default async function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <HomeHeader />
      {/* NextJS 正在与 TS 合作解决 TypeScript */}
      {/* @ts-expect-error Server Component */}
      <HomeBannerSection />
      <div className="container max-w-7xl mx-auto px-4 flex flex-col flex-1">
        {/* @ts-expect-error Server Component */}
        <LatestSharing />
      </div>
      <Footer />
    </main>
  );
}
