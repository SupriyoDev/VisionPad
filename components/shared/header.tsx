import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="bg-gray-950 ">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <span className="sr-only ">Home</span>
        <Link href={"/"} className=" flex  items-center ">
          <Image src={"/logo.png"} alt="" width={100} height={100} />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-300 transition font-medium hover:text-indigo-600  "
                  href="/about"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-300 transition font-medium hover:text-indigo-600  "
                  href="#"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-300 transition font-medium hover:text-indigo-600 "
                  href="#"
                >
                  History
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-300 transition font-medium hover:text-indigo-600  "
                  href="#"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-300 transition font-medium hover:text-indigo-600  "
                  href="#"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-300 transition font-medium hover:text-indigo-600  "
                  href="#"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4 flex flex-row items-center justify-center">
              <SignInButton forceRedirectUrl={"/dashboard"}>
                <Button className="bg-indigo-600">Login</Button>
              </SignInButton>
              <SignUpButton forceRedirectUrl={"/teams/create"}>
                <InteractiveHoverButton className="rounded-lg h-10">
                  Register
                </InteractiveHoverButton>
              </SignUpButton>
            </div>

            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
