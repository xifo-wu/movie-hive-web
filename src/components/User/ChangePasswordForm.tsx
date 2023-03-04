import api from '@/utils/api';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TbLoaderQuarter } from 'react-icons/tb';
import { toast } from 'react-toastify';

interface Props {}

interface FormValue {
  password: string;
  current_password: string;
}

const ChangePasswordForm = ({}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormValue>();

  const handleUpdatePassword = async (values: FormValue) => {
    const { error } = await api.put<any, any>('/api/v1/user/password', values);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('更新成功');
  };

  return (
    <form onSubmit={handleSubmit(handleUpdatePassword)}>
      <div className="my-3">
        <label htmlFor="current_password" className="block mb-1 text-base tracking-wider">
          当前密码
        </label>
        <input
          type="password"
          id="current_password"
          className="text-slate-900 dark:text-white my-1 border-gray-500 border-solid border py-2 px-3 rounded-md  w-full focus:outline-amber-500"
          {...register('current_password', {
            required: '请填写密码',
          })}
        />
        <span className="text-red-500 text-sm">
          {errors?.current_password?.message?.toString()}
        </span>
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

      <button
        disabled={isSubmitting}
        className="mt-3 w-full bg-amber-500 text-white py-2 px-3 rounded-md flex items-center"
      >
        {isSubmitting && <TbLoaderQuarter className="animate-spin" />}
        <div className="tracking-widest flex-1">更新密码</div>
      </button>
    </form>
  );
};

export default ChangePasswordForm;
