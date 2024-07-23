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
    introduction,
    setUsername,
    setPassword,
    setPasswordConfirm,
    setNickname,
    setIntroduction,
  } = useStore();

  const navigateTo = (path: Url) => {
    if (
      username === '' ||
      password === '' ||
      passwordConfirm === '' ||
      nickname === '' ||
      introduction === ''
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    } else {
      if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      console.log({
        username,
        password,
        passwordConfirm,
        nickname,
        introduction,
      });
      router.push(path);
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
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}></textarea>
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
