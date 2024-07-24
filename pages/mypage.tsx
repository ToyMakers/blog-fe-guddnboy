import React from 'react';
import useStore from '../store/store';
import { useEffect } from 'react';

const mypage = () => {
  const { nickname, bio, setNickname, setBio } = useStore();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      console.log(token);
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
        console.log(data.nickname);
        console.log(data.bio);
      } catch (error) {
        console.error(error);
        alert('프로필을 가져오는 데 실패했습니다.');
      }
    };
    fetchProfile();
  }, [setNickname, setBio]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-9">
        <h1 className="text-4xl">유저 정보</h1>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="flex">
          닉네임
          <div className="ml-4">{nickname}</div>
        </div>
        <div className="flex">
          소개
          <div className="ml-4">{bio}</div>
        </div>
      </div>
    </div>
  );
};
export default mypage;
