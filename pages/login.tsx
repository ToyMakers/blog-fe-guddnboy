import React from 'react';
import {useRouter} from 'next/router';

const Login = () => {;
  const router = useRouter();

  const navigateToSignUp = () => {
    console.log('회원가입 페이지로 이동');
    router.push('/signup');
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>
          <input className="w-60 h-14 my-3" type="text" placeholder="ID" />
        </div>
        <div>
          <input className="w-60 h-14 my-3" type="password" placeholder="Password" />
        </div>
        <div className="w-60 h-14 bg-white">
          <button className="w-30 h-14 px-8">로그인</button>
          <button className="w-30 h-14 px-8" onClick={navigateToSignUp}>
            회원가입
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
