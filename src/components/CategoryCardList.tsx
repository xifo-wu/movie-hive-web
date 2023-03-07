// 分类卡片列表
import React from "react";
import clsx from "clsx";
import VideoIcon from "./SVGIcon/VideoIcon";
import TVIcon from "./SVGIcon/TVIcon";
import AnimeIcon from "./SVGIcon/AnimeIcon";
import ZongYiIcon from "./SVGIcon/ZongYiIcon";
import EBookIcon from "./SVGIcon/EBookIcon";
import StudyIcon from "./SVGIcon/StudyIcon";
import DocumentaryIcon from "./SVGIcon/DocumentaryIcon";
import RecitalIcon from "./SVGIcon/RecitalIcon";
import Link from "next/link";

const categories = [
  {
    label: "电影",
    value: "movie",
    color: "red",
    href: '/movie',
    icon: <VideoIcon className="w-12" />,
  },
  {
    label: "剧集",
    color: "green",
    value: "tv",
    href: '/tv',
    icon: <TVIcon className="w-12" />,
  },
  {
    label: "动漫",
    value: "anime",
    color: "blue",
    href: '/anime',
    icon: <AnimeIcon className="w-12" />,
  },
  {
    label: "综艺",
    value: "zongyi",
    color: "pink",
    href: '/zongyi',
    icon: <ZongYiIcon className="w-12" />,
  },
  {
    label: "学习",
    value: "study",
    color: "teal",
    href: '/study',
    icon: <StudyIcon className="w-12" />,
  },
  {
    label: "纪录片",
    value: "documentary",
    color: "lime",
    href: '/documentary',
    icon: <DocumentaryIcon className="w-12" />,
  },
  {
    label: "电子书",
    value: "ebook",
    color: "sky",
    href: '/ebook',
    icon: <EBookIcon className="w-12" />,
  },
  {
    label: "演唱会",
    value: "recital",
    color: "fuchsia",
    href: '/recital',
    icon: <RecitalIcon className="w-12" />,
  },
];

const CategoryCardList = () => {
  return (
    <div className="flex flex-wrap mt-6 -mx-2">
      {categories.map((item) => {
        return (
          <Link
            href={item.href}
            key={item.label}
            className="p-2 flex-[50%] sm:flex-[0_0_50%] md:flex-[25%]"
          >
            <div
              className={clsx(
                "flex relative content-center justify-between w-full text-white font-medium shadow-lg p-6 min-h-[48px] bg-gradient-to-r rounded-xl cursor-pointer",
                "hover:scale-110 hover:z-30 transform transition-all duration-300",
                {
                  "from-red-800 to-red-500": item.color === "red",
                  "from-green-800 to-green-500": item.color === "green",
                  "from-blue-800 to-blue-500": item.color === "blue",
                  "from-pink-800 to-pink-500": item.color === "pink",
                  "from-teal-800 to-teal-500": item.color === "teal",
                  "from-fuchsia-800 to-fuchsia-500": item.color === "fuchsia",
                  "from-lime-800 to-lime-500": item.color === "lime",
                  "from-sky-800 to-sky-500": item.color === "sky",
                }
              )}
            >
              <div>
                <h6 className="text-lg sm:text-xl tracking-widest">{item.label}</h6>
                <span
                  className={clsx("block w-14 h-1 rounded-sm my-2", {
                    "bg-red-500": item.color === "red",
                    "bg-green-500": item.color === "green",
                    "bg-blue-500": item.color === "blue",
                    "bg-pink-500": item.color === "pink",
                    "bg-teal-500": item.color === "teal",
                    "bg-fuchsia-500": item.color === "fuchsia",
                    "bg-lime-500": item.color === "lime",
                    "bg-sky-500": item.color === "sky",
                  })}
                />
              </div>
              {item.icon}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryCardList;
