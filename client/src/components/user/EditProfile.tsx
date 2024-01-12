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
import axios from 'axios';


function EditProfile({ children }: { children: React.ReactNode }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [authState, setAuthState] = useState<AuthStateType>({
    username: '',
    email: '',
    password: '',
  });
  const { data: session } = useSession();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    const pictureInput = document.getElementById('picture') as HTMLInputElement;

    // Append the selected file to FormData if a file is selected
    if (pictureInput.files && pictureInput.files[0]) {
      formData.append('image', pictureInput.files[0]);
    }
    

    axios
    .post(`http://54.169.199.32:5000/api/user/avatar/${session?.user?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    })
    .then((res) => {
      const response = res.data;
      console.log("The response is", response);
    })
    .catch((err) => {
      console.log("The error is", err);
    });

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
        <form onSubmit={submit}>
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
              <Input id="username" type="text" onChange={(e) => setAuthState({ ...authState, username: e.target.value })} defaultValue={session?.user?.username} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" onChange={(e) => setAuthState({ ...authState, email: e.target.value })} defaultValue={session?.user?.email} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Change new password"
                className="col-span-2 w-[280px]"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="w-3 ml-10 items-center">
                <EyeIcon />
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit"  className="bg-red-800 hover:bg-red-900">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
