import React from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className='w-80 h-12 mb-4'>
          <input className="w-80 h-12" type="text" placeholder="ID" />
        </div>
        <div className='w-80 h-12 mb-4'>
          <input className="w-80 h-12" type="password" placeholder="Password" />
        </div>
        <div className="w-60 h-12 flex justify-between">
          <button className="w-30 h-12 ">로그인</button>
          <button className="w-30 h-12" onClick={() => navigateTo('/signup')}>
            회원가입
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
