import Link from 'next/link';
import { getToken } from 'next-auth/jwt';
import '../globals.css';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession({
    
  });
  return (
    <div className="flex flex-col w-full xl:container">
         
      
    </div>
  );
}
