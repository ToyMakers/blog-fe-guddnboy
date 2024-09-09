import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import postStore from '../store/postStore';
import userStore from '@/store/userStore';

const PostDetail = () => {
  const router = useRouter();
  const { nickname } = userStore();
  const { id, title, author, content, categories, likes } = postStore();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'newTitle':
        setNewTitle(value);
        break;
      case 'newCategories':
        setNewCategories([value]);
        break;
      case 'newContent':
        setNewContent(value);
        break;
      default:
        break;
    }
  };

  const modifyPost = async () => {
    console.log(id);
    console.log(title);
    setIsEditing(!isEditing);
    if (isEditing) {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/posts/${id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            categories: categories,
            content: content,
          }),
        });
        if (!response.ok) {
          throw new Error('포스트 수정에 실패했습니다. : response error');
        }
      } catch (error) {
        alert(error);
      }
      setNewTitle(title);
      setNewCategories(categories);
      setNewContent(content);
    }
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

  useEffect(() => {
    setNewTitle(title);
    setNewCategories(categories);
    setNewContent(content);
  }, []);

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
                    onChange={handleInputChange}
                    placeholder={title as string}
                  />
                ) : (
                  <Fragment>{title}</Fragment>
                )}
              </div>
              <button className="w-24 text-gray-600 text-lg" onClick={modifyPost}>
                {isEditing ? '수정완료' : '수정'}
              </button>
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
                  placeholder={categories.map((category) => category).join(',')}
                  className="w-full"
                  value={newCategories}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}></textarea>
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
