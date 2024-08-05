import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

const home = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    navigateTo('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
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
      }
    };
    fetchProfile();
  }, [setNickname, router]);

  return (
    <section className="min-h-screen">
      <div className="flex flex-col items-center mt-4">
        <div className="text-3xl font-bold">OurBlog</div>
        <Header nickname={nickname ?? ''} logout={logout} navigateTo={navigateTo} />
      </div>
    </section>
  );
};

export default home;
