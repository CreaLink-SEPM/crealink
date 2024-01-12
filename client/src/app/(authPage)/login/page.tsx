'use client';
import React, { useEffect, useRef, useState } from 'react';
import '../../globals.css';
import Image from 'next/image';
import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { notification } from 'antd';

function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [authState, setAuthState] = useState<AuthStateType>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status == 'authenticated') {
      router.push('/home');
    }
  }, [status]);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    // API FOR LOGIN
    axios
      .post('http://54.169.199.32:5000/api/user/login', authState)
      .then(res => {
        setLoading(false);
        const response = res.data; // Options for API***

        if (response.status === 'success' || 200) {
          notification.success({
            message: 'Login success',
          });
          signIn('credentials', {
            email: authState.email,
            password: authState.password,
            callbackUrl: '/home',
            redirect: true,
          });
        } else {
          setErrors(response.message.error);
        }
      })
      .catch(error => {
        console.log(error);
        notification.error({
          message: 'Login failed',
          description: 'Something went wrong',
        });
        setLoading(false);
      });
  };

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
          {/* {params.get('message') ? (
            <div className="bg-green-300 p-5 rounded-lg font-bold my-4 text-black">
              <strong>Success!</strong> {params.get('message')}
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
                  autoComplete="email"
                  type="email"
                  id="email"
                  placeholder="Type your email.."
                  onChange={event => setAuthState({ ...authState, email: event.target.value })}
                />
                <span className="text-red-400 font-bold">{errors?.email}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="password">Password</Label>
                <Input
                  autoComplete="password"
                  type="password"
                  id="password"
                  placeholder="Type your password.."
                  onChange={event => setAuthState({ ...authState, password: event.target.value })}
                />
                <span className="text-red-400 font-bold">{errors?.password}</span>
              </div>
              <div className="mt-5">
                <Button className="w-full bg-red-800" disabled={loading}>
                  {loading ? 'Processing...' : 'Login'}
                </Button>
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
