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

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
    <div className="flex flex-col p-24 min-w-[500px]">
      <form onSubmit={handleLogin} className="flex flex-col justify-center items-center">
        <div>
          <input
            className="w-60 h-14 mt-6 rounded-[5px] outline-none placeholder:p-1"
            type="text"
            placeholder="ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            className="w-60 h-14 my-6 rounded-[5px] outline-none placeholder:p-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-60 h-14 flex justify-between">
          <button
            className="w-30 h-14 px-8  text-primary hover:-translate-y-2 transition"
            type="submit">
            로그인
          </button>
          <button
            className="w-30 h-14 px-8 text-primary hover:-translate-y-2 transition"
            type="button"
            onClick={() => navigateTo('/signup')}>
            회원가입
          </button>
        </div>
      </form>
      <footer className="text-center m-20 text-gray-400 text-[12px]">
        ⓒ2024.
        <a href="https://github.com/ToyMakers/blog-server"> 방구석스터디-ToyMakers</a>
        <a href="https://github.com/guddnboy"> by guddnboy</a>
      </footer>
    </div>
  );
};

export default Login;
