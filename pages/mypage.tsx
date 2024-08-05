import React, { useState, useEffect } from 'react';
import useStore from '../store/store';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Backbtn from '../public/assets/backbtn.png';

const mypage = () => {
  const { nickname, bio, setNickname, setBio } = useStore();
  const [initialNickname, setInitialNickname] = useState('');
  const [initialBio, setInitialBio] = useState('');
  const router = useRouter();

  const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,8}$/;

  const updateProfile = async () => {
    const token = localStorage.getItem('access_token');

    if (!nicknameRegex.test(nickname)) {
      alert('닉네임은 8자 이내의 한글, 영문, 숫자만 사용 가능합니다.');
      return;
    }

    if (initialNickname === nickname && initialBio === bio) {
      alert('수정사항이 없습니다.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/users/profile`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
          bio,
        }),
      });
      alert('프로필이 수정되었습니다.');
      setInitialNickname(nickname);
      setInitialBio(bio);
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert('프로필을 수정하는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('로그인이 필요합니다.');
        router.push('/login');
        return;
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/users/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('프로필을 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        setNickname(data.nickname);
        setBio(data.bio);
        setInitialNickname(data.nickname);
        setInitialBio(data.bio);
      } catch (error) {
        console.error(error);
        alert('프로필을 가져오는 데 실패했습니다.');
      }
    };
    fetchProfile();
  }, [setNickname, setBio, router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-row items-center mt-9 w-80">
        <div className="flex justify-center items-center hover:bg-gray-400 hover:rounded-full transition w-[50px] h-[50px]">
          <button className="w-8 h-8" onClick={() => router.push('/home')}>
            <Image src={Backbtn} alt="뒤로가기"></Image>
          </button>
        </div>
        <div className="flex-1 justify-center ml-4 text-center">
          <h1 className="text-3xl ">유저 정보</h1>
        </div>
      </div>
      <div className="flex justify-between align-middle items-center mt-4 w-80">
        <div className="text-[22px] text-center w-20">닉네임</div>
        <div className="text-center w-50">
          <textarea
            className="resize-none w-50 h-6 text-center align-middle rounded-[5px]"
            value={nickname}
            data-selector="nickname"
            onChange={(e) => {
              setNickname(e.target.value);
            }}></textarea>
        </div>
      </div>
      <div className="flex justify-between align-middle items-center mt-4 w-80">
        <div className="text-[22px] w-20 text-center">소개</div>
        <div className="text-center w-50">
          <textarea
            className="resize-none w-50 h-40 rounded-[5px]"
            value={bio}
            data-selector="bio"
            onChange={(e) => {
              setBio(e.target.value);
            }}></textarea>
        </div>
      </div>
      <div className="w-80 h-12 flex justify-center bg-slate-300 text-white hover:bg-slate-600 transition rounded-[10px]">
        <button className="text-[22px]" onClick={updateProfile}>
          저장하기
        </button>
      </div>
    </div>
  );
};

export default mypage;
