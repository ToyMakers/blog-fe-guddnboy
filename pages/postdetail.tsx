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

  useEffect(() => {
    setNewTitle(title);
    setNewCategories(categories);
    setNewContent(content);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="bg-white p-8 rounded-lg w-full relative">
        <Header nickname={nickname ?? ''} logout={logout} navigateTo={navigateTo} />

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
              <>{categories}</>
            )}
          </div>
          <div className="text-lg text-tagColor">{author}</div>
        </section>

        <section className="mt-5">
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

        <section>
          <div>{likes}</div>
        </section>
      </div>
    </div>
  );
};
export default PostDetail;
