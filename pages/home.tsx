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
    <div>
      <section className="flex flex-col mt-4">
        <div
          className="ml-4 text-titleColor text-[21px] hover:cursor-pointer"
          onClick={() => navigateTo('/home')}>
          velog
        </div>
        <Header nickname={nickname ?? ''} logout={logout} navigateTo={navigateTo} />
      </section>
      <section className="mt-16 mx-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4 mr-4">
          <div className="w-[280px] h-[280px] content transition hover:-translate-y-2 hover:cursor-pointer shadow-md rounded-md bg-white">
            <li className="flex flex-col w-[280px] h-[280px] text-titleColor">
              <a className="flex justify-center text-center w-full h-[32px] border-b-[1px] border-b-slate-200 text-[18px]">
                블로그 제목 표시
              </a>
              <div className="text-[16px] h-[210px] m-2">
                이 부분에 게시글 내용이 표시될 예정입니다.
              </div>
              <footer className="w-full text-left pl-4 text-[14px] border-t-[1px] border-t-slate-200">
                <div className="flex items-center">by 작성자</div>
              </footer>
            </li>
          </div>
        </ul>
      </section>
    </div>
  );
};

export default home;
