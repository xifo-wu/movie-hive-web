'use client';

import { useState, Fragment } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Dialog, Popover, Menu, Transition } from '@headlessui/react';
import { TbAlignRight, TbArrowBigRightLine, TbDirections, TbX } from 'react-icons/tb';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { BiPaperPlane } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import useUser from '@/hooks/useUser';
import { logout } from '@/services/user';
import { useMedia } from 'react-use';

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
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const isDark = useMedia('(prefers-color-scheme: dark)');

  const handleLogout = async () => {
    const { error } = await logout();

    if (error) {
      toast.error(error.message);
      return;
    }

    router.push(`/login?redirect=${pathname}`);
  };

  const handleLogin = async () => {
    router.push(`/login?redirect=${pathname}`);
  };

  const handleToUserInfo = async () => {
    router.push(`/user/${user.id}`);
  };

  return (
    <div className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-3 px-6 lg:px-8">
        <div className="flex lg:flex-initial">
          <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
            <span className="sr-only">影巢</span>
            <Image src="/logo.png" className="w-auto" width={18} height={20} alt="影巢网盘分享" />
            <span className="text-base font-semibold leading-7 text-white tracking-widest">
              影巢
            </span>
          </Link>
        </div>
        {/* 小屏展示打开菜单按钮 */}
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

        <div className="hidden lg:flex lg:items-center lg:justify-end select-none cursor-pointer">
          {user.id ? (
            <Menu as="div" className="relative text-white h-8">
              <Menu.Button>
                <Image
                  className="rounded-md"
                  width={32}
                  height={32}
                  src={user.gravatar_url}
                  alt={user.username}
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleToUserInfo}
                          className={`${
                            active ? 'bg-amber-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <TbDirections
                              className="text-amber-white mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <TbDirections className="mr-2 h-5 w-5" aria-hidden="true" />
                          )}
                          个人中心
                        </button>
                      )}
                    </Menu.Item>
                  </div>

                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? 'bg-amber-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <RiLogoutCircleRLine className="mr-2 h-5 w-5" aria-hidden="true" />
                          ) : (
                            <RiLogoutCircleRLine className="mr-2 h-5 w-5" aria-hidden="true" />
                          )}
                          退出登录
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="lg:flex lg:justify-end lg:gap-2 lg:items-center select-none cursor-pointer">
              <a onClick={handleLogin} className="text-sm font-semibold leading-6 text-white">
                登 录 <span aria-hidden="true"></span>
              </a>
              <TbArrowBigRightLine className="text-white" />
            </div>
          )}
        </div>
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
              <div className="py-6">
                {user.id ? (
                  <a
                    onClick={handleLogout}
                    className="flex items-center -mx-3 rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-slate-900 cursor-pointer"
                  >
                    <RiLogoutCircleRLine className="mr-2 h-5 w-5" aria-hidden="true" /> 退出登录
                  </a>
                ) : (
                  <a
                    onClick={handleLogin}
                    className="flex items-center -mx-3 rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-slate-900 cursor-pointer"
                  >
                    <BiPaperPlane className="mr-2 h-5 w-5" aria-hidden="true" /> 登录
                  </a>
                )}
              </div>
            </div>
          </div>

          {user.id && (
            <div onClick={handleToUserInfo} className="p-6 absolute flex bottom-0 left-0 w-full cursor-pointer">
              <Image
                className="rounded-md mr-4"
                width={48}
                height={48}
                src={user.gravatar_url}
                alt={user.username}
              />
              <div className="text-white flex-1 min-w-0">
                <div className="text-lg text-ellipsis overflow-hidden">{user.nickname}</div>
                <div className="text-sm text-slate-200">UID: {user.id}</div>
              </div>
            </div>
          )}
        </Dialog.Panel>
      </Dialog>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? 'dark' : 'light'}
      />
    </div>
  );
}
