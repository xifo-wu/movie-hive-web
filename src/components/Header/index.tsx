'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Dialog, Popover } from '@headlessui/react';
import { TbArrowBigRightLine, TbAlignRight, TbX } from 'react-icons/tb';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

const navList = [
  {
    label: '电影',
    href: '/movie',
  },
  {
    label: '剧集',
    href: '/tv',
  },
  {
    label: '动漫',
    href: '/anime',
  },
  {
    label: '综艺',
    href: '/zongyi',
  },
  {
    label: '学习',
    href: '/study',
  },
  {
    label: '纪录片',
    href: '/documentary',
  },
  {
    label: '电子书',
    href: '/ebook',
  },
  {
    label: '演唱会',
    href: '/recital',
  },
];

export default function Example() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-3 px-6 lg:px-8">
        <div className="flex lg:flex-initial">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">影巢</span>
            <Image src="/logo.png" className="w-auto" width={24} height={24} alt="影巢 Logo" />
          </Link>
        </div>
        {/* 小票展示打开菜单按钮 */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">打开菜单</span>
            <TbAlignRight className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:justify-end lg:px-12 lg:flex-1 lg:gap-x-12">
          {/* TODO 下拉参考 https://tailwindui.com/components/marketing/elements/headers */}

          {navList.map((li) => (
            <Link
              key={li.href}
              href={li.href}
              className={clsx('text-sm font-semibold leading-6', {
                'text-amber-500 font-bold': pathname === li.href,
                'text-white hover:text-amber-500': pathname !== li.href,
              })}
            >
              {li.label}
            </Link>
          ))}
        </Popover.Group>
        {/* <div className="hidden lg:flex lg:justify-end lg:gap-2 lg:items-center select-none cursor-not-allowed">
          <a className="text-sm font-semibold leading-6 text-white">
            登 录 <span aria-hidden="true"></span>
          </a>
          <TbArrowBigRightLine className="text-white" />
        </div> */}
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">影巢</span>
              <Image src="/logo.png" className="w-auto" width={24} height={24} alt="影巢 HdHive" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">关闭菜单</span>
              <TbX className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-100">
              <div className="space-y-2 py-6">
                {navList.map((li) => (
                  <Link
                    key={li.href}
                    href={li.href}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-slate-900"
                  >
                    {li.label}
                  </Link>
                ))}
              </div>
              {/* <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-slate-900"
                >
                  登 录（NEXT TODO）
                </a>
              </div> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
