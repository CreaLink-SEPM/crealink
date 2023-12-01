'use client'
import React from 'react'
import '../../globals.css'
import Image from 'next/image'
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function page() {
  return (
    <div className="bg-background">
    <div className=" h-screen w-screen flex justify-center items-center">
      <div className="w-full mx-2 md:w-2/4 md:mx-0 bg-muted p-6 rounded-lg">
        <div className="flex justify-center items-center">
          <Image src="/assets/images/banner.svg" className='overflow-hidden' width={600} height={300} alt="Logo" />
        </div>
        {/* {params.get("message") ? (
          <div className="bg-green-300 p-5 rounded-lg font-bold my-4 text-black">
            <strong>Success!</strong> {params.get("message")}
          </div>
        ) : (
          <></>
        )} */}
        <form>
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Login</h1>
                <p>Welcome back</p>
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Type your email.."
                onChange={(event) => console.log(event)}
              />
              <span className="text-red-400 font-bold"></span>
            </div>
            <div className="mt-5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Type your password.."
                onChange={(event) =>
                  console.log(event)
                }
              />
              <span className="text-red-400 font-bold">
           
              </span>
            </div>
            <div className="mt-5">
              <Button className="w-full">
              Login
              </Button>
            </div>
            <div className="mt-5">
              <span>Don't Have an account ? </span>
              <Link href="/register" className="text-orange-300 font-bold">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default page
