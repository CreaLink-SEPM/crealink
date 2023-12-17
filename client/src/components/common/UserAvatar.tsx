'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";


export default function UserAvatar({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  return (
    <Avatar className="">
      <AvatarImage src={image} className="object-cover" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}