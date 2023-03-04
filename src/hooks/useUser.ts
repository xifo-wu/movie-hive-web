import api from '@/utils/api';
import useSWR from 'swr';

export default function useUser() {
  const {
    data = {},
    error,
    ...rest
  } = useSWR<any>('/api/v1/user', api.get, {
    errorRetryCount: 1,
    revalidateOnFocus: false,
  });

  if (error) {
    return {
      user: {},
      error,
      ...rest,
    };
  }

  return {
    user: data.data || {},
    error: null,
    ...rest,
  };
}
