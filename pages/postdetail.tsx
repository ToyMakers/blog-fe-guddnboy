import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import postStore from '../store/postStore';
import userStore from '@/store/userStore';

const PostDetail = () => {
  const router = useRouter();
  const { nickname } = userStore();
  const {
    id,
    title,
    author,
    content,
    categories,
    likes,
    setId,
    setTitle,
    setAuthor,
    setContent,
    setCategories,
    setLikes,
  } = postStore();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newCategories, setNewCategories] = useState<string[]>(categories);
  const [newContent, setNewContent] = useState(content);

  const navigateTo = (path: string) => router.push(path);

  const logout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  const handleBack = () => router.back();

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const addLikes = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/posts/${id}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!(await response).ok) {
        throw new Error('좋아요 추가에 실패했습니다.');
      }
    } catch (error) {
      alert(error);
    }
  };

  const getpostDetail = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigateTo('/login');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/posts/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('포스트를 가져오는 데 실패했습니다.: response.ok가 false입니다.');
      }
      const data = await response.json();
      setId(data.id);
      setTitle(data.title);
      setAuthor(data.author);
      setContent(data.content);
      setCategories(data.categories);
      setLikes(data.likes);
    } catch (error) {
      console.error(error);
      alert('포스트를 가져오는 데 실패했습니다.');
    }
  };

  const modifyPost = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigateTo('/login');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          categories: newCategories,
          content: newContent,
        }),
      });
      if (!response.ok) {
        throw new Error('포스트 수정에 실패했습니다.: response.ok가 false입니다.');
      }
      alert('포스트가 수정되었습니다.');
      setIsEditing(!isEditing);
    } catch (error) {
      console.error(error);
      alert('포스트 수정에 실패했습니다.: catch문 실행됨');
    }
  };

  const updatePost = () => {
    setTitle(newTitle);
    setCategories(newCategories);
    setContent(newContent);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    getpostDetail();
    if (!token) {
      alert('로그인이 필요합니다.');
      navigateTo('/login');
      return;
    }
    updatePost();
  }, [setTitle, setCategories, setContent]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="flex flex-col bg-white rounded-lg w-full p-12">
        <Header nickname={nickname ?? ''} logout={logout} navigateTo={navigateTo} />

        <div className="overflow-scroll">
          <section className="mt-6">
            <div className="flex">
              <div className="text-4xl w-full h-16 font-sans font-bold">
                {isEditing ? (
                  <input
                    type="text"
                    name="newTitle"
                    className="text-4xl w-full h-16 font-sans font-bold"
                    value={newTitle}
                    placeholder={title as string}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                ) : (
                  <Fragment>{title}</Fragment>
                )}
              </div>
              {isEditing ? (
                <button className="w-24 text-gray-600 text-lg" onClick={modifyPost}>
                  수정완료
                </button>
              ) : (
                <button className="w-24 text-gray-600 text-lg" onClick={handleEdit}>
                  수정
                </button>
              )}
              <button className="w-11 text-gray-600 text-lg" onClick={handleBack}>
                목록
              </button>
            </div>
            <div className="h-full border-b-[6px] border-gray-800 w-[80px]"></div>
          </section>

          <section className="flex mt-5 w-full">
            <div className="w-full text-lg text-tagColor">
              {isEditing ? (
                <input
                  type="text"
                  name="newCategories"
                  placeholder={categories.join(', ')}
                  className="w-full"
                  value={newCategories}
                  onChange={(e) => setNewCategories(e.target.value.split(','))}
                />
              ) : (
                <ul className="flex flex-row gap-2 mt-2 overflow-x-scroll">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className="inline-flex items-center h-8 px-4 bg-green-500 text-white rounded-md text-sm whitespace-nowrap">
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="text-lg text-tagColor">{author}</div>
          </section>

          <section className="mt-5 h-96">
            <div className="w-full text-tagColor text-[18px]">
              {isEditing ? (
                <textarea
                  name="newContent"
                  className="w-full h-96"
                  placeholder={content as string}
                  value={newContent}
                  onChange={(e) => {
                    setNewContent(e.target.value);
                  }}></textarea>
              ) : (
                <>{content}</>
              )}
            </div>
          </section>
        </div>

        <div className="w-full px-12 border-b-[1px] border-gray-200"></div>

        <section className="flex justify-center pt-4 gap-4">
          <div className="flex w-full">
            <div className="w-full pr-4 flex items-center">
              <textarea
                placeholder="내용을 입력하세요."
                className="w-full outline-none border border-gray-200 border-solid rounded p-2 resize-none"
              />
            </div>
            <button className="w-16 text-m text-white bg-modifyfont hover:bg-modifyfontHover rounded-sm">
              댓글달기
            </button>
          </div>

          <div className="flex flex-col size-6 items-center">
            <img src="/assets/likes.png" alt="likes" />
            <div className="text-black text-sm">{likes}</div>
            <button className="w-24 text-gray-600 text-lg" onClick={addLikes}>
              좋아요
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
export default PostDetail;
