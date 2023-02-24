import Link from "next/link";
import Image from "next/image";
import NavList from "./NavList";

const Header = () => {
  return (
    <header className="bg-slate-900">
      <div className="container max-w-7xl mx-auto py-4 px-4 flex items-center">
        <Link href="/" className="flex gap-2 items-center mr-3">
          <Image src="/logo.png" width={24} height={24} alt="影巢 Logo" />
          <h1 className="text-white text-lg" title="影巢 HD Hive">
            影巢
          </h1>
        </Link>
        <NavList />
      </div>
    </header>
  );
};

export default Header;
