import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import userStore from '../store/userStore';
import Image from 'next/image';
import BackBtn from '../public/assets/backbtn.png';

const SignUp = () => {
  const router = useRouter();
  const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()])/;

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
  } = userStore();

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

    if (!usernameRegex.test(username)) {
      alert('아이디는 영문자와 숫자만 입력 가능합니다.');
      return;
    }

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
    const NumEngRegex = /^[a-zA-Z0-9]*$/;

    const isEngValid = EngRegex.test(username);
    const isNumValid = NumRegex.test(username);
    const isNumEngValid = NumEngRegex.test(username);
    const isLengthValid = username.length <= 8;

    return username ? (
      <div className="flex gap-4">
        <div
          className={isEngValid && isNumValid && isNumEngValid ? 'text-green-600' : 'text-red-600'}>
          영문자와 숫자 조합
        </div>
        <div
          className={
            isNumValid && isLengthValid && isNumEngValid ? 'text-green-600' : 'text-red-600'
          }>
          {username.length}/8
        </div>
      </div>
    ) : (
      <div>아이디를 입력해주세요</div>
    );
  };

  const displayValidationPassword = (password: string) => {
    const isPasswordValid = passwordRegex.test(password);

    return password ? (
      <div className="flex gap-4">
        <div className={isPasswordValid ? 'text-green-600' : 'text-red-600'}>
          영문자와 숫자,특수문자 조합
        </div>
        <div className={isPasswordValid ? 'text-green-600' : 'text-red-600'}></div>
      </div>
    ) : (
      <div>비밀번호를 입력해주세요</div>
    );
  };

  const displayConfirmPassword = (password: string, passwordConfirm: string) => {
    if (password === '' || passwordConfirm === '') {
      return <div>비밀번호를 다시 입력하세요</div>;
    } else {
      return password === passwordConfirm ? (
        <div className="text-green-600">비밀번호가 일치합니다.</div>
      ) : (
        <div className="text-red-600">비밀번호가 일치하지 않습니다.</div>
      );
    }
  };

  const displayValidateNickname = (nickname: string) => {
    if (nickname === '') {
      return <div>닉네임을 입력해주세요</div>;
    } else {
      if (nickname.length > 8) {
        return <div className="text-red-600">{nickname.length}/8</div>;
      } else {
        return <div className="text-green-600">{nickname.length}/8</div>;
      }
    }
  };

  const displayValidateBio = (bio: string | null) => {
    if (bio === '') {
      return <div className="text-green-600">{bio.length}/200</div>;
    } else {
      (bio?.length ?? 0) <= 200 ? (
        <div className="text-green-600">{bio?.length ?? 0}/200</div>
      ) : (
        <div className="text-red-600">{bio?.length ?? 0}/200</div>
      );
    }
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
          <section>{displayValidationPassword(password)}</section>
          <div className="mb-2 h-12">
            <input
              className="w-80 mb-2 h-12"
              type="password"
              placeholder="비밀번호를 다시 입력하세요."
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <section>{displayConfirmPassword(password, passwordConfirm)}</section>
          <div className="mb-2 h-12">
            <input
              className="w-80 mb-2 h-12"
              type="text"
              placeholder="사용하실 닉네임을 입력하세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <section>{displayValidateNickname(nickname)}</section>
          <div className="mb-2 flex flex-col">
            <textarea
              className="w-80 mb-2 h-40 resize-none"
              placeholder="소개를 입력하세요."
              value={bio ?? ''}
              onChange={(e) => setBio(e.target.value)}
            />
            <section>{displayValidateBio(bio)}</section>
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
