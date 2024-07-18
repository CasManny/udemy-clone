"use client"
import { headerRoutes } from "@/constants";
import { SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {
    const { userId } = useAuth()
  return (
    <div className="flex justify-between items-center p-4">
      <Link href={"/"}>TechAcademy</Link>

      <div className="max-md:hidden w-[400px] roundef-full flex">
        <input
          type="text"
          className="flex-grow bg-[#FFF8EB] rounded-l-full border-none outline-none text-sm pl-4 py-3"
          placeholder="Search for courses"
        />
        <button className="bg-[#FDAB04] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#FDAB04]/80">
          <Search className="h-4 w-4" />
        </button>
          </div>
          
          <div className="flex gap-6 items-center">
              <div className="max-sm:hidden flex gap-6">
                  {headerRoutes.map((route, index) => (
                      <Link href={route.href} key={index} className="text-sm font-medium hover:text-[#FDAB04]">{ route.label}</Link>
                  ))}
              </div>
              {userId ? <UserButton /> : <Link href={'/sign-in'}><Button>Sign In</Button></Link>}
              
          </div>
    </div>
  );
};

export default Header;
