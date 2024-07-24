import React from 'react';
import { useRouter } from 'next/router';
import useStore from '../store/store';
import { Url } from 'next/dist/shared/lib/router/router';

const SignUp = () => {
  const router = useRouter();
  const {
    username,
    password,
    passwordConfirm,
    nickname,
    bio,
    setUsername,
    setPassword,
    setPasswordConfirm,
    setNickname,
    setBio,
  } = useStore();

  const navigateTo = async (path: Url) => {
    if (!username || !password || !passwordConfirm || !nickname || !bio) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          nickname,
          bio,
        }),
      });

      if (!response.ok) {
        console.log(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/register`);
        throw new Error('회원가입에 실패했습니다.');
      }
      alert('회원가입에 성공했습니다.');
      console.log(response.body);
      router.push('/login');
    } catch (error) {
      console.error(error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <main className="flex min-h-screen items-center p-24 justify-center">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl h-12 font-bold text-center">회원가입</div>
          <div className="mb-2 h-12">
            <input
              className="w-80 mb-2 h-12"
              type="text"
              placeholder="사용하실 아이디를 입력하세요."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2 h-12">
            <input
              className="w-80 mb-2 h-12"
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2 h-12">
            <input
              className="w-80 mb-2 h-12"
              type="password"
              placeholder="비밀번호를 다시 입력하세요."
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="mb-2 h-12">
            <input
              className="w-80 mb-2 h-12"
              type="text"
              placeholder="사용하실 닉네임을 입력하세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <textarea
              className="w-80 mb-2 h-40 resize-none"
              placeholder="소개를 입력하세요."
              value={bio}
              onChange={(e) => setBio(e.target.value)}></textarea>
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
