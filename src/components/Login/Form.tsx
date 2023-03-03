'use client';

import api from '@/utils/api';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TbChartCircles, TbClick } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';
import { useMedia } from 'react-use';

interface User {}

interface Response<T> {
  response: T;
  error: any;
}

interface Meta {
  access_token: string;
  refresh_token: string;
}

type LoginResponseData = {
  data: User;
  meta: Meta;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDark = useMedia('(prefers-color-scheme: dark)');

  const handleRegister = async (values: any) => {
    const { response, error } = await api.post<any, Response<LoginResponseData>>(
      'api/v1/login',
      values,
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    const { meta } = response;
    window.localStorage.setItem('accessToken', meta.access_token);

    toast.success('登录成功~页面跳转中，请稍后');
    const redirect = searchParams?.get('redirect');
    router.push(redirect || '/');
  };

  return (
    <>
      <form className="max-w-sm w-full" onSubmit={handleSubmit(handleRegister)}>
        <div className="my-3">
          <label htmlFor="username" className="block mb-1 text-base tracking-wider">
            邮箱
          </label>
          <input
            id="username"
            className="text-slate-900 dark:text-white my-1 border-gray-500 border-solid border py-2 px-3 rounded-md w-full focus:outline-amber-500"
            {...register('username', {
              required: '请填写邮箱',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: '邮箱格式不正确',
              },
            })}
          />
          <span className="text-red-500 text-sm">{errors?.username?.message?.toString()}</span>
        </div>

        <div className="my-3">
          <label htmlFor="password" className="block mb-1 text-base tracking-wider">
            密码
          </label>
          <input
            type="password"
            id="password"
            className="text-slate-900 dark:text-white my-1 border-gray-500 border-solid border py-2 px-3 rounded-md  w-full focus:outline-amber-500"
            {...register('password', {
              required: '请填写密码',
            })}
          />
          <span className="text-red-500 text-sm">{errors?.password?.message?.toString()}</span>
        </div>

        <div className="my-3 tracking-wider">
          还没有账号吗？去
          <Link className="text-amber-500" href="/register">
            注册
          </Link>
        </div>
        <button
          disabled={isSubmitting}
          className="mt-3 w-full bg-amber-500 text-white py-2 px-3 rounded-md flex items-center"
        >
          <div>{isSubmitting ? <TbChartCircles className="animate-spin" /> : <TbClick />}</div>
          <div className="tracking-widest flex-1">登录</div>
        </button>
      </form>

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
    </>
  );
};

export default RegisterForm;
