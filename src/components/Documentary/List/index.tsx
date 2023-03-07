'use client';

import GenresTagStyle1 from '@/components/CheckboxTags/Style1';
import VideoResolutionTagStyle1 from '@/components/CheckboxTags/Style1';
import api from '@/utils/api';
import useSWRInfinite from 'swr/infinite';
import useIntersectionObserver from '@/lib/hooks/useIntersectionObserver';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { TbRocket } from 'react-icons/tb';
import Link from 'next/link';
import _ from 'lodash';
import ShareCardStyle1 from '@/components/ShareCard/Style1';

const fetcher = async ([url, body]: any) => {
  const { response, error } = await api.post<any, any>(url, body);
  if (error) {
    throw error;
  }
  const { data } = response;
  return data;
};

const genres = [
  {
    id: 10759,
    name: '动作冒险',
  },
  {
    id: 16,
    name: '动画',
  },
  {
    id: 35,
    name: '喜剧',
  },
  {
    id: 80,
    name: '犯罪',
  },
  {
    id: 99,
    name: '纪录',
  },
  {
    id: 18,
    name: '剧情',
  },
  {
    id: 10751,
    name: '家庭',
  },
  {
    id: 10762,
    name: '儿童',
  },
  {
    id: 9648,
    name: '悬疑',
  },
  {
    id: 10763,
    name: '新闻',
  },
  // {
  //   id: 10764,
  //   name: '真人秀',
  // },
  {
    id: 10765,
    name: 'Sci-Fi & Fantasy',
  },
  {
    id: 10766,
    name: '肥皂剧',
  },
  // {
  //   id: 10767,
  //   name: '脱口秀',
  // },
  {
    id: 10768,
    name: 'War & Politics',
  },
  {
    id: 37,
    name: '西部',
  },
];

const videoResolution = [
  { value: '8k', label: '8k' },
  { value: '4k', label: '4k' },
  { value: '1080p', label: '1080p' },
  { value: '720p', label: '720p' },
];

const DocumentarysList = () => {
  const { control, getValues } = useForm({
    defaultValues: {
      genres: [],
      video_resolution: [],
    },
  });

  const [debounceLoading, setDebounceLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const intersectionObserverRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(intersectionObserverRef);

  const parseQuery = () => {
    const queryFilter = getValues();
    const query: any = {
      bool: {
        must: [
          {
            term: {
              share_type: 'documentary',
            },
          },
        ],
      },
    };

    if (queryFilter.genres && queryFilter.genres.length) {
      query.bool.must.push({
        match: {
          genres: {
            query: queryFilter.genres.join(' '),
            operator: 'and',
          },
        },
      });
    }

    if (queryFilter.video_resolution && queryFilter.video_resolution.length) {
      query.bool.must.push({
        match: {
          video_resolution: {
            query: queryFilter.video_resolution.join(' '),
            operator: 'and',
          },
        },
      });
    }

    return query;
  };

  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null; // 已经没有更多数据了，不再请求
    }

    if (pageIndex > 1000) {
      return null;
    }

    return [
      '/api/v1/share/es-list',
      {
        query: parseQuery(),
        sort: { updated_at: { order: 'desc' } },
        per_page: 100,
        page: pageIndex + 1,
      },
    ];
  };

  const { data, mutate, isLoading, isValidating, size, setSize } = useSWRInfinite<any, any>(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      dedupingInterval: 0,
    },
  );
  const documentaries: Array<any> = data ? [].concat(...data) : [];

  useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && isIntersecting && !debounceLoading) {
      setSize(size + 1);
    }
  }, [isIntersecting]);

  const handleFilterChange = () => {
    setDebounceLoading(true);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebounceLoading(false);
      mutate([
        '/api/v1/share/es-list',
        {
          query: parseQuery(),
          sort: { updated_at: { order: 'desc' } },
          per_page: 10,
          page: 1,
        },
      ]);
    }, 500);
  };

  return (
    <section className="container max-w-7xl mx-auto px-4 pb-4 mb-4 text-white">
      <form onChange={handleFilterChange}>
        <h1 className="text-sm mb-4">类型筛选</h1>
        <Controller
          name="genres"
          control={control}
          render={({ field }) => (
            <GenresTagStyle1
              options={genres.map((i) => ({ value: i.name, label: i.name }))}
              {...field}
            />
          )}
        />

        <h1 className="text-sm my-4">分辨率</h1>
        <Controller
          name="video_resolution"
          control={control}
          render={({ field }) => <VideoResolutionTagStyle1 options={videoResolution} {...field} />}
        />
      </form>
      <div className="mt-8 min-h-[500px] h-full relative">
        <h1 className="my-4 relative block text-xl before:w-2 before:h-full before:block before:content-[''] before:absolute before:bg-amber-500 before:left-0 before:top-0 pl-4 before:rounded">
          剧集列表
        </h1>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {documentaries?.map((item) => (
            <ShareCardStyle1 key={item.slug} data={item} />
          ))}
        </div>

        {data && !documentaries.length && !isLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2">资源好像神秘消失了</div>
        )}

        <div ref={intersectionObserverRef} />
        {(isLoading || isValidating) && (
          <div className="flex gap-2 items-center justify-center animate-[flash_4s_ease-in-out_infinite]">
            <TbRocket />
            等会等会，在拼命加载啦!
          </div>
        )}
      </div>
    </section>
  );
};

export default DocumentarysList;
