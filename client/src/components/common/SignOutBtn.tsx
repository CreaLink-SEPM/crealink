'use client';
import React from 'react';
import {} from 'next-auth';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { clearTokens } from '@/src/utils/auth';

function SignOutBtn() {
  const logout = () => {
    signOut({ callbackUrl: '/login', redirect: true });
    clearTokens();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button  size="sm" className="mr-10 bg-red-800">
          Sign Out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Once you sign out, you cant access your
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={logout} className="bg-red-500" asChild>
            <Link href="/login">Logout</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SignOutBtn;
