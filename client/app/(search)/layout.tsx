import ThemeToggleBtn from '@/components/common/ThemeToggleBtn';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import '../globals.css';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Navbar } from '@/components/homepage/navbar';

export default function Search() {
    return (
        <div className="w-full h-full">
            <div className="flex justify-between items-center p-4">
                <Image src="assets/icons/Logo Icon.svg" alt='homepage' width={40} height={40}/>
                <div className="flex-grow flex justify-center text-red-100">
                    aaaaaa
                    <Navbar />
                </div>
                <Image src="assets/icons/Right Infos.svg" alt='setting' width={30} height={30}/>
            </div>
        </div>
    );
}
