import localFont from 'next/font/local';

const myFont = localFont({
  src: '../public/fonts/SegoeUI-Regular.ttf',
  display: 'swap',
});

export default function Home() {
  return (
    <div className={myFont.className}>
      <main className={`flex min-h-screen flex-col items-center p-24`}>
        <div>
          <input className="w-60 h-14 my-3" type="text" placeholder="ID" />
        </div>
        <div>
          <input className="w-60 h-14 my-3" type="password" placeholder="Password" />
        </div>
        <div className='w-60 h-14 bg-white'>
          <button className='w-30 h-14 px-8'>로그인</button>
          <button className='w-30 h-14 px-8'>회원가입</button>
        </div>
      </main>
    </div>
  );
}
