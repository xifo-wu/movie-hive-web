import RegisterForm from '@/components/Register/Form';
import RocketIcon from '@/components/SVGIcon/RocketIcon';
import { fetchSystemSetting } from '@/services/setting';
import clsx from 'clsx';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '注册 - 影巢 - 网盘资源搜索',
  description: '立马注册一个影巢账号吧～',
};

const Register = async () => {
  const response = await fetchSystemSetting();

  if (!response.success) {
    return <div>系统出错</div>;
  }

  const { data } = response;

  return (
    <div className="flex gap-5">
      <div
        className="w-[500px] h-[500px] rounded-full fixed opacity-25 blur-[100px] top-32 -left-64 right-auto bottom-auto z-[-1]"
        style={{ backgroundImage: 'linear-gradient(45deg, #f59e0b, #f97316)' }}
      />
      <div
        className={clsx(
          'flex-1 text-white justify-center min-h-screen h-full bg-slate-800 bg-opacity-80 relative md:bg-transparent z-10',
          'md:flex-[0_0_70%] md:justify-start md:text-slate-900 dark:md:text-white',
        )}
      >
        <div
          className={clsx(
            'ml-auto mr-auto max-w-sm w-[100%] flex flex-col min-h-screen h-full justify-center py-10 px-3',
            'md:mr-7',
            'lg:w-[50%] lg:max-w-none',
          )}
        >
          <h1 className="text-xl flex items-center gap-2 mb-2 font-semibold">
            <RocketIcon className="w-[24px] animate-[shakeY_4s_ease-in-out_infinite]" />
            账号注册
          </h1>
          <h2 className={clsx('text-sm ml-8', 'dark:text-slate-200')}>
            赶紧注册，拥有一个影巢账号吧
          </h2>

          <div className="ml-0 sm:ml-8 mt-6">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'fixed top-0 left-0 right-0 bottom-0 bg-center bg-no-repeat',
          'md:flex-[0_0_30%] md:min-h-screen md:relative md:bg-cover md:bg-center md:bg-no-repeat',
        )}
        style={{ backgroundImage: `url(${data.backdrop_url})` }}
      />
    </div>
  );
};

export default Register;
