import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
import Header from '@/components/Header';
import userStore from '@/store/userStore';

const postDetail = () => {
  const router = useRouter();
  const { nickname, setNickname } = userStore();

  const navigateTo = async (path: Url) => {
    router.push(path);
  };

  const logout = () => {
    localStorage.clear();
    navigateTo('/login');
  };

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
    } catch (error) {
      console.error(error);
      alert('프로필을 가져오는 데 실패했습니다.');
      navigateTo('/login');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [nickname, router]);

  return (
    <div className="mx-10 mt-8">
      <div className="ml-4">
        <Header nickname={nickname} logout={logout} navigateTo={navigateTo} />

        <div>
          <section className="mt-6">
            <div className="text-[44px] w-full h-[66px] font-sans font-bold">제목</div>
            <div className="h-full border-b-[6px] border-gray-800 w-[80px]"></div>
          </section>

          <section className="flex mt-5 w-full h-18px">
            <div className="w-full text-[18px] text-tagColor">카테고리</div>
          </section>

          <section>
            <div className="w-full "></div>
            <div className="w-full h-[400px] mt-5 text-tagColor text-[18px]">내용</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default postDetail;
