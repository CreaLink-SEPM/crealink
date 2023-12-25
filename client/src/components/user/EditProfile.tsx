'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

 function EditProfile({ children }: { children: React.ReactNode }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Profile updated!');

    closeModal();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <span>Edit Profile</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center">
            <Image
              width={200}
              height={200}
              style={{ width: '100%', height: '250px', borderRadius: '50%' }}
              alt="Profile"
              src={session?.user?.user_image || '/assets/images/Logo.png'}
            />
            <Input id="picture" type="file" lang="en" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue={session?.user?.username} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" defaultValue={session?.user?.email} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder='Change new password'
              className="col-span-2 w-[280px]"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="w-3 ml-10 items-center">
              <EyeIcon />
            </button>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submit} className="bg-red-800 hover:bg-red-900">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
