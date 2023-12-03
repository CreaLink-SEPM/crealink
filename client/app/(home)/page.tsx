import ThemeToggleBtn from '@/components/common/ThemeToggleBtn';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import '../globals.css';
import { Label } from '@radix-ui/react-dropdown-menu';

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className='flex gap-6'>
      <ThemeToggleBtn />{' '}
        <div>
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span className='text-yellow-500'>Try it light mode !!!{' '}</span> <span className='text-white'>Surprised</span>
        </div>
      </div>
      <Image src="/assets/icons/icon.svg" className="mx-[450px] py-32" alt="logo" width={500} height={400} />
      <p className="text-center text-3xl"> CreaLink now is still developing, please comback next time !, thank you :3 </p>
      <div className="mt-5">Postcript : N.Huy</div>
    </div>
  );
}
