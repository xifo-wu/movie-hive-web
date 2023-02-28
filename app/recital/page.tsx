import Header from '@/components/Header';
import React from 'react';

const PecitalPage = () => {
  return (
    <>
      <Header />

      <div className="flex items-center justify-center min-h-screen h-hull">
        <div
          className="w-[500px] h-[500px] rounded-full fixed opacity-25 blur-[100px] top-64 -left-64 right-auto bottom-auto z-[-1]"
          style={{ backgroundImage: 'linear-gradient(45deg, #f59e0b, #f97316)' }}
        />
        <div
          className="w-[500px] h-[500px] rounded-full fixed opacity-25 blur-[100px] -top-64 left-auto -right-64 bottom-auto z-[-1]"
          style={{ backgroundImage: 'linear-gradient(45deg, #64748b, #94a3b8)' }}
        />

        <div className="text-xl">咕咕咕～</div>
      </div>
    </>
  );
};

export default PecitalPage;
