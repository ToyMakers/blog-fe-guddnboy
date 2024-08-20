import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useStore from '../store/store';
import Image from 'next/image';
import BackBtn from '../public/assets/backbtn.png';

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

  useEffect(() => {
    setUsername('');
    setPassword('');
    setPasswordConfirm('');
    setNickname('');
    setBio('');
  }, []);

  const validateInputs = () => {
    if (username.length > 8) {
      alert('아이디는 8글자 이하로 작성해주세요.');
      return;
    }

    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    if (!usernameRegex.test(username)) {
      alert('아이디는 영문자와 숫자만 입력 가능합니다.');
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()])/;
    if (!passwordRegex.test(password)) {
      alert('비밀번호는 영문자와 특수문자(~!@#$%^&*())를 포함하여야 합니다.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (nickname === '') {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (nickname.length > 8) {
      alert('닉네임은 8글자 이하로 작성해주세요.');
      return;
    }

    if (bio && bio.length > 200) {
      alert('자기소개는 200자 이하로 작성해주세요.');
      return;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateInputs()) {
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
        throw new Error('회원가입에 실패했습니다.');
      }

      console.log(response.body);
      alert('회원가입에 성공했습니다.');
      router.push('/login');
    } catch (error) {
      console.error(error);
      alert('회원가입에 실패했습니다.');
    }
  };

  const displayValidationMessage = (username: string) => {
    const EngRegex = /[a-zA-Z]/;
    const NumRegex = /[0-9]/;
    const isEngValid = EngRegex.test(username);
    const isNumValid = NumRegex.test(username);
    const isLengthValid = username.length <= 8;

    return username ? (
      <div className="flex gap-4">
        <div className={isEngValid && isNumValid ? 'text-green-600' : 'text-red-600'}>
          영문자와 숫자 조합
        </div>
        <div className={isNumValid && isLengthValid ? 'text-green-600' : 'text-red-600'}>
          {username.length}/8
        </div>
      </div>
    ) : (
      <div>아이디를 입력해주세요</div>
    );
  };

  return (
    <main className="flex min-h-screen items-center p-24 justify-center">
      <div className="flex justify-between">
        <div>
          <div>
            <button onClick={() => router.push('/login')}>
              <Image src={BackBtn} className="font-bold w-8 h-8" alt="뒤로가기" />
            </button>
          </div>
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
          <section className="flex">{displayValidationMessage(username)}</section>
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
          <div>{nickname.length}/8</div>
          <div className="mb-2 flex flex-col">
            <textarea
              className="w-80 mb-2 h-40 resize-none"
              placeholder="소개를 입력하세요."
              value={bio ?? ''}
              onChange={(e) => setBio(e.target.value)}
            />
            <div>{bio?.length}/200</div>
          </div>
          <div className="mb-2">
            <button
              className="w-80 h-10 text-white bg-slate-400 hover:bg-primary transition rounded-[10px]"
              onClick={handleSignup}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
