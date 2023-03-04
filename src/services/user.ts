import api from '@/utils/api';

export async function logout() {
  const { response, error } = await api.delete<any, any>('/api/v1/logout');
  if (error) {
    window.localStorage.removeItem('accessToken');
  }

  return { response, error };
}
