'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"



function Register() {
  const [authState, setAuthState] = useState<AuthStateType>({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {toast} = useToast();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    // API FOR  REGISTER
    axios
      .post('/api/register/', authState)
      .then(res => {
        setLoading(false);
        const response = res.data;            // Options for API***

        if (response.status === 'success' || 200) {
          router.push(`/?message=${response.message}`);    
        } else if (response.status === 'failed' || 400) {
          setErrors(response.error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      })
      .catch(error => {
        console.log(error);
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
        <div className="w-full lg:w-1/3 bg-muted p-6 rounded-lg">
          <form onSubmit={submit}>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <h1 className="text-xl font-bold ml-4">Hola! Join our community for more creative!</h1>
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Type your name.."
                  onChange={event => setAuthState({ ...authState, name: event.target.value })}
                />
                <span className="text-red-400 font-bold">{errors?.name}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Type your unique username"
                  onChange={event => setAuthState({ ...authState, username: event.target.value })}
                />
                <span className="text-red-400 font-bold">{errors?.username}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="email">Email</Label>
                <Input
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
                  autoComplete='password'
                  type="password"
                  id="password"
                  placeholder="Type your password.."
                  onChange={event => setAuthState({ ...authState, password: event.target.value })}
                />
                <span className="text-red-400 font-bold">{errors?.password}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="cpassword"
                  placeholder="Confirm password.."
                  onChange={event =>
                    setAuthState({
                      ...authState,
                      password_confirmation: event.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-5">
                <Button className="w-full bg-red-800" disabled={loading}>
                  {loading ? 'Loading...' : 'Register'}
                </Button>
              </div>
              <div className="mt-5 text-center">
                <span>Already Have an account ? </span>
                <Link href="/login" className="text-orange-300 font-bold underline">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
