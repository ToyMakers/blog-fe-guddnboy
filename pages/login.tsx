import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useStore from '../store/store';
import { Url } from 'next/dist/shared/lib/router/router';

const Login = () => {
  const router = useRouter();
  const { username, password, setUsername, setPassword } = useStore();

  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

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
      localStorage.setItem('access_token', access_token);

      navigateTo('/home');
    } catch (error) {
      console.error(error);
      alert('아이디나 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center p-24">
      <input
        className="w-60 h-14 mt-6 rounded-[5px]"
        type="text"
        placeholder="ID"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-60 h-14 my-6 rounded-[5px]"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-60 h-14">
        <button
          className="w-30 h-14 px-8  hover:text-primary transition rounded-[10px] font-serif"
          onClick={() => handleLogin()}>
          로그인
        </button>
        <button
          className="w-30 h-14 px-8  hover:text-primary transition rounded-[10px] font-serif"
          onClick={() => navigateTo('/signup')}>
          회원가입
        </button>
      </div>
      <footer className="m-20 text-gray-400 font-serif">
        © 2024. 방구석스터디 블로그 프로젝트
      </footer>
    </div>
  );
};

export default Login;
