import axios from 'axios';

const TOKEN_KEY = 'accessToken';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_API_HOST : '',
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem(TOKEN_KEY);
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err: any) => {
    // 请求错误，这里可以用全局提示框进行提示
    return Promise.reject(err);
  },
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 意图：GET 时想给 SWR 用 Error 有值。
    // 非 GET 时不想多写 Try Catch
    if (response.config.method !== 'get') {
      return { response: response.data };
    }

    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.config.method !== 'get') {
      if (error.response) {
        return {
          error: {
            ...error.response.data,
            httpStatus: error.response.status,
          },
        };
      }

      return { error };
    }

    if (error.response) {
      return Promise.reject({
        ...error.response.data,
        httpStatus: error.response.status,
      });
    }

    return Promise.reject(error);
  },
);

export default api;
