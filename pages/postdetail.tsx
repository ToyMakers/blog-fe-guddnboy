import React from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

const postdetail = () => {
  const router = useRouter();
  const { nickname, postTitle, postContent, postCategories, postAuthor, postLikes } = router.query;

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="bg-white p-8 rounded-lg w-full relative">
        <Header nickname={nickname ?? ''} logout={logout} navigateTo={navigateTo} />
        <div>
          <section className="mt-6">
            <div className="flex">
              <div className="text-4xl w-full h-16 font-sans font-bold">{postTitle}</div>
              <button className="w-11 text-gray-600 text-lg" onClick={handleBack}>
                목록
              </button>
            </div>
            <div className="h-full border-b-[6px] border-gray-800 w-[80px]"></div>
          </section>

          <section className="flex mt-5 w-full">
            <div className=" w-full text-lg text-tagColor">{postCategories}</div>
            <div className="text-lg text-tagColor">{postAuthor}</div>
          </section>
          <section className="mt-5">
            <div className="w-full text-tagColor text-[18px]">{postContent}</div>
          </section>
          <section>
            <div>{postLikes}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default postdetail;
