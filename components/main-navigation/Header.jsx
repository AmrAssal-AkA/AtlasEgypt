import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import Button from "../ui/Button";
import UserIcon from "../ui/icons/Usericon";
import MenuIcon from "../ui/icons/menuIcon";
import CloseIcon from "../ui/icons/Xicon";
import Model from "../Model";
import UpperHeader from "./upper-header";
import { useSession, signOut } from "next-auth/react";
import Dropdown from "../ui/Dropdown";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function handleLogout() {
    signOut();
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/Discover" },
    { name: "Blog", path: "/Blog" },
    { name: "Contact us", path: "/contactus" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="w-full justify-end hidden md:block">
        <UpperHeader />
      </div>
      <div className="container mx-auto flex items-center justify-between  px-4 sm:px-6 lg:px-8">
        <div>
          <Link href="/">
            <Image
              src="/AtlasEgypt.png"
              alt="AtlasEgypt Logo"
              width={100}
              height={50}
            />
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden focus:outline-none"
        >
          {open ? (
            <CloseIcon className="w-10 h-10 m-5" />
          ) : (
            <MenuIcon className="w-10 h-10 m-5" />
          )}
        </button>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 opacity-100" : "top-[-498px]"
          } md:opacity-100 opacity-0`}
        >
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-xl md:mt-5 my-7 md:p-2 sm:mt-10"
            >
              <Link
                href={link.path}
                className="hover:text-amber-500 transition-colors cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="hidden md:block md:border-l md:border-gray-300 md:ml-8 md:pl-8 md:h-6"></li>
          <li className="md:ml-8 text-xl md:mt-5 my-7 md:p-2 mt-10">
            <Button className="px-4 py-2" onClick={() => router.push("/Book")}>
              Book Now
            </Button>
          </li>
          {!session && !loading && (
            <li className="md:ml-8 text-xl md:mt-5 my-7 md:p-2">
              <button onClick={() => setModalOpen(true)}>
                <UserIcon className="w-8 h-8 cursor-pointer hover:fill-amber-500 transition-colors" />
              </button>
            </li>
          )}
          {session && (
            <button>
              <Dropdown
                pagelink="/profile"
                pageName="Profile"
                pagelink2={() => router.push("/authentiaction/forget-password")}
                pageName2="Reset Password"
                pagelink3={handleLogout}
                pageName3="Logout"
              />
            </button>
          )}
        </ul>
      </div>
      <Model isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
}
