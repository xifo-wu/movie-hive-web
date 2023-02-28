"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const navList = [
  {
    label: "电影",
    href: "/movie",
  },
  {
    label: "剧集",
    href: "/tv",
  },
  {
    label: "动漫",
    href: "/anime",
  },
  {
    label: "综艺",
    href: "/zongyi",
  },
  {
    label: "学习",
    href: "/study",
  },
  {
    label: "纪录片",
    href: "/documentary",
  },
  {
    label: "电子书",
    href: "/ebook",
  },
  {
    label: "演唱会",
    href: "/recital",
  },
];

const NavList = () => {
  const pathname = usePathname();

  return (
    <nav className="text-white">
      {navList.map((item) => {
        return (
          <Link key={item.href} className={clsx("px-3 text-lg", {
            "text-amber-500 font-bold": pathname === item.href,
            "hover:text-amber-500": pathname !== item.href,
          })} href={item.href}>
            {item.label}
          </Link>
        );
      })}
      <span className="inline-block md:hidden px-3 text-lg">更多</span>
    </nav>
  );
};

export default NavList;
