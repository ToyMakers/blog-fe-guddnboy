import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import searchBtn from '../public/assets/searchbtn.png';
import backBtn from '../public/assets/backbtn.png';
import postBtn from '../public/assets/postbtn.png';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
import postStore from '@/store/postStore';

const post = () => {
  const { title, category, content, updateTitle, updateCategory, updateContent } = postStore();

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
    updateTitle('');
    updateCategory('');
    updateContent('');
  }, []);

  const posting = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category,
          content,
        }),
      });

      if (!response.ok) {
        console.log(response);
        console.log(response.body);
        console.log(response.status);
        throw new Error('포스팅에 실패했습니다. response.ok가 false입니다.');
      }
      console.log(response.body);
      alert('포스팅에 성공했습니다.');
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert('포스팅에 실패했습니다.');
    }
  };

  const addCategory = async (category: string) => {
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/categories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: category,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        alert('카테고리가 추가되었습니다.');
        return data;
      } else {
        const errorData = await response.json();
        alert(`카테고리 추가에 실패했습니다: ${errorData.message}`);
      }
    } catch (error) {
      console.error('카테고리 추가 중 오류 발생:', error);
      alert('카테고리 추가에 실패했습니다.');
    }
  };

  const searchCategory = async () => {
    const categoryNames: string[] = [];
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        data.map((category: { name: string }) => {
          categoryNames.push(category.name);
        });
        console.log(categoryNames);
        return (
          <ul className="flex-col bg-slate-500 text-white">
            {categoryNames.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        );
      } else {
        const errorData = await response.json();
        alert(`카테고리 조회에 실패했습니다: ${errorData.message}`);
      }
    } catch (error) {
      console.error('카테고리 조회 중 오류 발생:', error);
      alert('카테고리 조회에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-row mx-4">
      <div className="flex flex-col pl-8 w-[50%] h-[100vh] bg-white font-sans">
        <section className="mt-6">
          <div className="resize-none">
            <input
              className="text-[44px] w-full h-[66px] resize-none outline-none font-sans font-bold"
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => updateTitle(e.target.value)}
            />
          </div>
          <div className="mt-4 border-b-[6px] border-gray-800 w-[80px]"></div>
        </section>
        <section className="flex flex-row mt-5 h-full">
          <div className="flex justify-between text-tagColor w-full">
            <div className="flex justify-center items-center">
              <input
                value={category}
                type="text"
                placeholder="카테고리를 입력하세요"
                className="w-full outline-none text-[18px] text-tagColor"
                onChange={(e) => updateCategory(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center mr-4">
              <button
                onClick={() => addCategory(category)}
                value={category}
                className="hover:cursor-pointer w-9 h-9 hover:bg-slate-300 hover:text-white transition">
                추가
              </button>
              <Image
                src={searchBtn}
                alt="검색"
                onClick={searchCategory}
                className="hover:cursor-pointer w-[36px] h-[36px] hover:bg-slate-300 rounded-full transition"
              />
            </div>
          </div>
        </section>
        <section className="w-full h-[100vh]">
          <div>
            <textarea
              className="w-full h-[400px] mt-5 resize-none outline-none text-tagColor text-[18px] placeholder:italic"
              value={content}
              placeholder="당신의 이야기를 적어보세요..."
              onChange={(e) => updateContent(e.target.value)}
            />
          </div>
        </section>
        <section className="flex justify-between w-full h-[100vh]">
          <div className="ml-2 w-[36px] h-[36px] hover:bg-slate-300 rounded-full transition">
            <Image src={backBtn} onClick={() => navigateTo('/home')} alt="뒤로가기" />
          </div>
          <div className="mr-4 w-[36px] h-[36px] hover:bg-slate-300 rounded-full transition">
            <Image src={postBtn} alt="게시" onClick={posting} />
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
