"use client"
 
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
 
const SHEET_SIDES = [ "bottom"] as const

type SheetSide = (typeof SHEET_SIDES)[number]
 
export default function Support({children}: {children: React.ReactNode}) {
    const supportChannels = [
        { platform: "Facebook", handle: "CreaLink Fanpage" },
        { platform: "Email", handle: "creaLink2024@gmail.com" },
        { platform: "TikTok", handle: "creaLink_@2024" },
      ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <p className="cursor-pointer text-center">Support</p>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Support Options</SheetTitle>
              <SheetDescription>
                Connect with us through various support channels. Choose your preferred option below.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {supportChannels.map((channel) => (
                <div key={channel.platform} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={channel.platform} className="text-right">
                    {channel.platform}
                  </Label>
                  <Input readOnly id={channel.platform} value={channel.handle} className="col-span-3" />
                </div>
              ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="bg-red-500 hover:bg-red-700">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}