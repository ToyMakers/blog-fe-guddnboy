import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import { log } from 'console';

const MainPage = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    navigateTo('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigateTo('/login');
    }
  }, []);

  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center mt-4">
        <div className="text-3xl font-bold">OurBlog</div>
        <header className="flex justify-end w-full mt-4">
          <ul className="flex justify-center font-bold mr-4">
            <li className="mr-4">
              <button onClick={() => logout()}>Logout</button>
            </li>
            <li className="mr-4">
              <button onClick={() => navigateTo('/mypage')}>MyPage</button>
            </li>
            <li className="mr-4">
              <button>글쓰기</button>
            </li>
          </ul>
        </header>
      </div>
    </main>
  );
};

export default MainPage;
