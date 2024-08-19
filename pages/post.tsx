import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import searchBtn from '../public/assets/searchbtn.png';
import backBtn from '../public/assets/backbtn.png';
import postBtn from '../public/assets/postbtn.png';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';

const post = () => {
  const [title, setTitle] = useState('');
  // const [tag, setTag] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();
  const navigateTo = async (path: Url) => {
    router.push(path);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigateTo('/login');
    }
    setTitle('');
    // setTag('');
    setContent('');
  }, []);

  return (
    <div className="flex flex-row mx-4">
      <div className="flex flex-col pl-8 w-[50%] h-[100vh] bg-white font-sans">
        <section className="mt-6">
          <div className="resize-none">
            <input
              className="text-[44px] w-full h-[66px] resize-none outline-none font-sans font-bold"
              type="text"
              placeholder="제목을 입력하세요"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-4 border-b-[6px] border-gray-800 w-[80px]"></div>
        </section>
        <section className="flex flex-row mt-5 h-full">
          <div className="flex justify-between text-tagColor w-full">
            <div className="flex justify-center items-center">
              <input
                type="text"
                placeholder="태그를 입력하세요"
                className="w-full outline-none text-[18px] text-tagColor"
                // onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center mr-4">
              <Image
                src={searchBtn}
                alt="검색"
                className="hover:cursor-pointer w-[36px] h-[36px] hover:bg-slate-300 rounded-full transition"
              />
            </div>
          </div>
        </section>
        <section className="w-full h-[100vh]">
          <div>
            <textarea
              className="w-full h-[400px] mt-5 resize-none outline-none text-tagColor text-[18px] placeholder:italic"
              placeholder="당신의 이야기를 적어보세요..."
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section className="flex justify-between w-full h-[100vh]">
          <div className="ml-2 w-[36px] h-[36px] hover:bg-slate-300 rounded-full transition">
            <Image src={backBtn} onClick={() => navigateTo('/home')} alt="뒤로가기" />
          </div>
          <div className="mr-4 w-[36px] h-[36px] hover:bg-slate-300 rounded-full transition">
            <Image src={postBtn} alt="게시" />
          </div>
        </section>
      </div>
      <div className="ml-4">
        <section className="mt-6">
          <div className="text-[44px] w-full h-[66px] font-sans font-bold">{title}</div>
          <div className="h-full border-b-[6px] border-gray-800 w-[80px]"></div>
        </section>

        {/* <section className="flex mt-5 w-full h-18px">
          <div className="w-full text-[18px] text-tagColor">{tag}</div>
        </section> */}
        <section>
          <div className="w-full "></div>
          <div className="w-full h-[400px] mt-5 text-tagColor text-[18px]">{content}</div>
        </section>
      </div>
    </div>
  );
};

export default post;
