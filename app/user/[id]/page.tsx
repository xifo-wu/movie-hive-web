'use client';

import Header from '@/components/Header';
import api from '@/utils/api';
import { notFound } from 'next/navigation';
import { Tab } from '@headlessui/react';
import useSWR from 'swr';
import clsx from 'clsx';
import useUser from '@/hooks/useUser';
import UserShare from '@/components/UserShare';
import Image from 'next/image';
import AwardsIcon from '@/components/SVGIcon/AwardsIcon';
import UserSetting from '@/components/User/UserSetting';
import { ToastContainer } from 'react-toastify';
import { useMedia } from 'react-use';
import Head from 'next/head';
import _ from 'lodash';

interface Props {
  params: { id: string };
}

const UserPage = ({ params }: Props) => {
  const { id } = params;
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const { user: current } = useUser();
  const { data = {}, error } = useSWR<any>(`/api/v1/user/${id}`, api.get);

  if (error) {
    notFound();
  }
  const { data: user = {} } = data;

  const tabs = [
    current.id && current.id === user.id ? '我的分享' : 'TA 的分享',
    current.id && current.id === user.id ? '我的勋章' : 'TA 的勋章',
  ];

  if (current.id === user.id) {
    tabs.push('设置');
  }

  return (
    <div className="min-h-screen h-full dark:bg-[#121212] bg-gray-100">
      <Header />
      <div className="bg-slate-900 h-[250px]" />
      <div className="container max-w-7xl mx-auto px-4 md:px-8 pb-4 -mt-[200px]">
        <div className="mb-10 text-xl text-white">{user.nickname}</div>
        <div className="flex gap-8 h-full flex-wrap-reverse">
          <div
            className={clsx(
              'dark:bg-gray-800 shadow-md rounded-xl bg-white flex-[0_0_100%] min-h-[250px]',
              'md:flex-[2]',
            )}
          >
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl rounded-b-none bg-amber-900/20 p-1">
                {tabs.map((i) => (
                  <Tab
                    key={i}
                    className={({ selected }) =>
                      clsx(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-amber-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-amber-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow'
                          : 'text-amber-500 hover:bg-white/[0.12] hover:text-white',
                      )
                    }
                  >
                    {i}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="h-[calc(100%-48px)]">
                <Tab.Panel className="w-full h-full">
                  <UserShare userId={user.id} />
                </Tab.Panel>
                <Tab.Panel>
                  <div className="w-full h-[282px] flex justify-center items-center">即将到来</div>
                </Tab.Panel>
                <Tab.Panel>
                  <UserSetting />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          <div className="flex-1">
            {/* 用户卡片 */}
            <div className="flex flex-col items-center dark:bg-gray-800 shadow-md rounded-xl bg-white min-w-0 w-full p-4">
              <div className="relative w-28 h-28 mt-5">
                {user.gravatar_url && (
                  <Image fill className="rounded-xl" src={user.gravatar_url} alt={user.nickname} />
                )}
              </div>
              <div className="w-full text-center text-lg mt-3 whitespace-nowrap overflow-hidden text-ellipsis">
                {user.nickname}
              </div>
              <div className="w-full text-center text-xs mt-2 opacity-60 whitespace-nowrap overflow-hidden text-ellipsis">
                UID: {user.id}
              </div>

              <div className="flex gap-2 mt-5">
                <div>
                  {0} <span className="text-sm text-gray-500">关注数</span>
                </div>
                <div className="w-[1px] h-full bg-gray-300" />
                <div>
                  <span className="text-sm text-gray-500">粉丝数</span> {0}
                </div>
              </div>
              <button className="mt-4 bg-amber-500 py-2 px-3 border border-solid border-amber-400 text-white cursor-not-allowed rounded-xl">
                关 注<span className="text-sm">（开发中）</span>
              </button>
            </div>

            <div className="dark:bg-gray-800 shadow-md rounded-xl bg-white p-4 mt-8 flex gap-4 items-center justify-between">
              <AwardsIcon className="w-14" />
              <div className="text-right">
                <span className="text-gray-400 text-sm">累计分享</span>
                <h1 className="text-lg">{_.get(user, 'user_meta.share_num', 0)}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
