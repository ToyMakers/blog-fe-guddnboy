import React from 'react';
import useStore from '../store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Backbtn from '../public/assets/backbtn.png';

const mypage = () => {
  const { nickname, bio, setNickname, setBio } = useStore();
  const router = useRouter();

  const updateProfile = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('로그인이 필요합니다.');
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
      if (!response.ok) {
        throw new Error('프로필을 수정하는 데 실패했습니다.');
      }
      alert('프로필이 수정되었습니다.');
    } catch (error) {
      console.error(error);
      alert('프로필을 수정하는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      console.log(`token : ${token}`);
      if (!token) {
        alert('로그인이 필요합니다.');
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
        console.log(`nickname :${data.nickname}`);
        console.log(`bio : ${data.bio}`);
      } catch (error) {
        console.error(error);
        alert('프로필을 가져오는 데 실패했습니다.');
      }
    };
    fetchProfile();
  }, [setNickname, setBio]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex justify-center items-center mt-9 w-80">
        <button className="w-8 h-8" onClick={() => router.push('/mainpage')}>
          <Image src={Backbtn} alt="뒤로가기"></Image>
        </button>
        <div className="ml-4 text-center">
          <h1 className="text-4xl">유저 정보</h1>
        </div>
      </div>
      <div className="flex justify-between align-middle items-center mt-4 w-80">
        <div className="text-2xl text-center w-20">닉네임</div>
        <div className="text-center w-50">
          <textarea
            className="resize-none w-50 h-6 text-center align-middle"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}></textarea>
        </div>
      </div>
      <div className="flex justify-between align-middle items-center mt-4 w-80">
        <div className="text-2xl w-20 text-center">소개</div>
        <div className="text-center w-50">
          <textarea
            className="resize-none w-50 h-40"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}></textarea>
        </div>
      </div>
      <div className="w-80 h-12 flex justify-center bg-slate-400 text-white">
        <button onClick={() => updateProfile()}>저장하기</button>
      </div>
    </div>
  );
};
export default mypage;
