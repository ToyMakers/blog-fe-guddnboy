import React from 'react';
import { useRouter } from 'next/router';

const SignUp = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <main className={'flex min-h-screen items-center p-24 justify-center'}>
      <div className="flex justify-between">
        <div className="">
          <div className="text-2xl font-bold text-center">회원가입</div>
          <div className="mb-2">
            <input
              className="w-80 mb-2"
              type="text"
              placeholder="사용하실 아이디를 입력하세요."></input>
          </div>
          <div className="mb-2">
            <input
              className="w-80 mb-2"
              type="text"
              placeholder="비밀번호를 다시 입력하세요."></input>
          </div>
          <div className="w-80 mb-2 flex">
            <input className="w-60 mb-2" type="text" placeholder="비밀번호를 입력하세요."></input>
            <button className="w-20 ml-4 text-center bg-primary text-white">중복확인</button>
          </div>
          <div className="mb-2">
            <input
              className="w-80 mb-2"
              type="text"
              placeholder="사용하실 닉네임을 입력하세요."></input>
          </div>
          <div className="mb-2">
            <textarea
              className="w-80 mb-2 h-40 resize-none"
              placeholder="소개를 입력하세요."></textarea>
          </div>
          <div className="mb-2">
            <button className="w-80 h-10 bg-primary text-white" onClick={() => navigateTo('/')}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
