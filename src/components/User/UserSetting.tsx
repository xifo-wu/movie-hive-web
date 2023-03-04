'use client';
import useUser from '@/hooks/useUser';
import ChangePasswordForm from './ChangePasswordForm';
import ProfileForm from './ProfileForm';

const UserSetting = () => {
  const { user: current } = useUser();

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <div>
        <h1 className="text-lg font-bold mb-4">个人资料</h1>
        <ProfileForm defaultValues={current} />
      </div>
      <div>
        <h1 className="text-lg font-bold mb-4">头像</h1>
        <div>
          头像本站使用
          <a
            className="text-amber-500"
            href="https://en.gravatar.com"
            target="_blank"
            rel="noreferrer"
          >
            Gravatar
          </a>
          邮箱头像，可自行前往设置
        </div>
      </div>

      <div className='border-t border-solid border-gray-400 pt-4'>
        <h1 className="text-lg font-bold mb-4">修改密码</h1>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default UserSetting;
