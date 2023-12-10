'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, LifeBuoy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import SignOutBtn from './SignOutBtn';
import EditProfile from '../user/EditProfile';

function AvatarSetting() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="outline-none border-none">
          <Image src="assets/icons/Right Infos.svg" alt="setting" width={30} height={30} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">Welcome back, Huy</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-center p-1 hover:bg-slate-400 rounded-md cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <EditProfile> Edit Profile</EditProfile>
          <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
        </div>
        <DropdownMenuSeparator />
        <div className='flex items-center justify-center p-1 hover:bg-slate-400 rounded-md'>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <div className='cursor-pointer'>Support</div>
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </div>
        <DropdownMenuSeparator />
        <div className=" ml-[32%] my-1">
          <SignOutBtn />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarSetting;
