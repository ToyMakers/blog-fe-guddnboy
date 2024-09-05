import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';
import userStore from '../store/userStore';
import postListStore from '../store/postListStore';
import postStore from '@/store/postStore';

const home = () => {
  const router = useRouter();
  const { nickname, setNickname } = userStore();
  const { postList, setPostList } = postListStore();
  const setPostData = postStore((state) => state.setPostData) as (data: {
    id: string;
    title: string;
    content: string;
    author: string;
    likes: number;
    categories: string[];
  }) => void;

  const navigateTo = (path: string) => {
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

  const getPosts = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/posts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('포스트를 가져오는 데 실패했습니다.: response.ok가 false입니다.');
      }
      const data = await response.json();
      setPostList(data);
    } catch (error) {
      console.error(error);
      alert('포스트를 가져오는 데 실패했습니다.: catch문 실행됨');
    }
  };

  const handlePostClick = (post: any) => {
    setPostData({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      likes: post.likes,
      categories: post.categories,
    });

    router.push(`/postdetail`);
  };

  useEffect(() => {
    fetchProfile();
    getPosts();
  }, []);

  return (
    <div className="mx-10 mt-8">
      <Header nickname={nickname ?? ''} logout={logout} navigateTo={navigateTo} />
      <section className="mt-16 flex-1">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
          {postList.map((post, index) => (
            <li key={index} onClick={() => handlePostClick(post)}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default home;
