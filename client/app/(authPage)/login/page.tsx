'use client';
import React, { useEffect, useState } from 'react';
import '../../globals.css';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Login() {
  const [authState, setAuthState] = useState<AuthStateType>({
    email: '',
    password: '',
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("The submit is :", authState);
  }
 

  return (
    <div className="bg-background">
      <div className=" h-screen w-screen grid place-items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/assets/images/banner.svg"
            className="overflow-hidden pl-20"
            width={600}
            height={300}
            priority
            alt="Logo"
          />
        </div>
        <div className="w-full mx-2 md:w-1/3 md:mx-0 sm:w-2/4 bg-muted p-6 rounded-lg mb-20">
          {/* {params.get("message") ? (
          <div className="bg-green-300 p-5 rounded-lg font-bold my-4 text-black">
            <strong>Success!</strong> {params.get("message")}
          </div>
        ) : (
          <></>
        )} */}
          <form onSubmit={submit}>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl ml-4 font-bold">Hola! Join our community for more creative!</h1>
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  autoComplete='email'
                  type="email"
                  id="email"
                  placeholder="Type your email.."
                  onChange={event => setAuthState({ ...authState, email: event.target.value })}
                />
                <span className="text-red-400 font-bold"></span>
              </div>
              <div className="mt-5">
                <Label htmlFor="password">Password</Label>
                <Input
                  autoComplete='password'
                  type="password"
                  id="password"
                  placeholder="Type your password.."
                  onChange={event => setAuthState({ ...authState, password: event.target.value })}
                />
                <span className="text-red-400 font-bold"></span>
              </div>
              <div className="mt-5">
                <Button className="w-full bg-red-800">Login</Button>
              </div>
              <div className="mt-5 text-center">
                <span>Don't Have an account yet? </span>
                <Link href="/register" className="text-orange-300 font-bold underline">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
