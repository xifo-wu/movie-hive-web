import api from '@/utils/api';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TbLoaderQuarter } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

interface User {
  id: number;
  nickname: string;
}

interface Props {
  defaultValues: User;
}

const ProfileForm = ({ defaultValues }: Props) => {
  const { mutate } = useSWRConfig();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues,
  });

  const handleUpdateProfile = async (values: User) => {
    const { error } = await api.put<User, any>('/api/v1/user/profile', values);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('更新成功');
    mutate(`/api/v1/user/${defaultValues.id}`);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <div className="my-3">
        <label htmlFor="nickname" className="block mb-1 text-base tracking-wider">
          昵称
        </label>
        <input
          id="nickname"
          className="text-slate-900 dark:text-white my-1 border-gray-500 border-solid border py-2 px-3 rounded-md w-full focus:outline-amber-500"
          {...register('nickname', {
            required: '昵称不能为空',
            pattern: {
              value: /^[^\s\u3000]+$/,
              message: '昵称不能包含空格',
            },
          })}
        />
        <span className="text-red-500 text-sm">{errors?.nickname?.message?.toString()}</span>
      </div>

      <button
        disabled={isSubmitting}
        className="mt-3 w-full bg-amber-500 text-white py-2 px-3 rounded-md flex items-center"
      >
        {isSubmitting && <TbLoaderQuarter className="animate-spin" />}
        <div className="tracking-widest flex-1">更新个人资料</div>
      </button>
    </form>
  );
};

export default ProfileForm;
