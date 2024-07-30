import React from 'react';
import { useRouter } from 'next/router';
import useStore from '../store/store';
import { Url } from 'next/dist/shared/lib/router/router';

const Login = () => {
  const router = useRouter();
  const { username, password, setUsername, setPassword } = useStore();

  const navigateTo = async (path: Url) => {
    router.push(path);
  };

  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error('로그인에 실패하였습니다.\n다시 시도해주세요.');
      }

      const data = await response.json();
      const { access_token } = data;
      console.log(`access_token : ${access_token}`);
      localStorage.setItem('access_token', access_token);

      navigateTo('/mainpage');
    } catch (error) {
      console.error(error);
      alert('아이디나 비밀번호를 확인해주세요.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>
        <input
          className="w-60 h-14 my-3 rounded-[5px]"
          type="text"
          placeholder="ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          className="w-60 h-14 my-3 rounded-[5px]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-60 h-14">
        <button
          className="w-30 h-14 px-8 hover:bg-slate-400 hover:text-white transition rounded-[10px]"
          onClick={() => handleLogin()}>
          로그인
        </button>
        <button
          className="w-30 h-14 px-8 hover:bg-slate-400 hover:text-white transition rounded-[10px]"
          onClick={() => navigateTo('/signup')}>
          회원가입
        </button>
      </div>
    </main>
  );
};

export default Login;
