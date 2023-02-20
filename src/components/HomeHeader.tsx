import Image from "next/image";
import Link from "next/link";

const HomeHeader = () => {
  return (
    <div className="px-3 w-full absolute left-1/2 -translate-x-1/2 top-3 z-10 max-w-7xl mx-auto flex gap-2 items-center">
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/logo.png" width={32} height={32} alt="影巢 Logo" />
        <h1 className="mt-1 text-white" title="影巢 HD Hive">
          影巢 - HD Hive
        </h1>
      </Link>
    </div>
  );
};

export default HomeHeader;
