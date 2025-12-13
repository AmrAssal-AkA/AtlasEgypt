import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import Button from "./ui/Button";
import UserIcon from "./ui/icons/Usericon";
import MenuIcon from "./ui/icons/menuIcon";
import CloseIcon from "./ui/icons/Xicon";
import Model from "./Model";
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareSnapchat,
  
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/Discover" },
    { name: "Blog", path: "/Blog" },
    { name: "Contact us", path: "/Contactus" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="w-full justify-end hidden md:block">
        <div className=" bg-amber-500 justify-end ">
          <div className="flex justify-end p-2 mr-10">
            <div className="flex items-center gap-6">
              <span className="text-white text-sm md:text-base">
                Call us: +20 104 456 6595
              </span>
              <div className="border-l border-white h-6"></div>
            </div>
            {/* Subscription Form */}
            <form>
              <input
                type="text"
                placeholder="enter your email"
                className="ml-4 mt-1 p-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
              <button className="ml-2 rounded-md cursor-pointer bg-yellow-500 p-1.5 w-25 hover:bg-transparent hover:text-orange-900">
                Subscribe
              </button>
            </form>
            {/* Social Media Icons */}
            <div className="flex gap-4 ml-6 text-lg md:text-xl justify-center sm:justify-start">
              <Link href="" className="p-2" title="Facebook">
                <FontAwesomeIcon
                  icon={faSquareFacebook}
                  className="text-blue-600 w-6 h-6"
                />
              </Link>
              <Link href="" className="p-2" title="Instagram">
                <FontAwesomeIcon
                  icon={faSquareInstagram}
                  className="text-pink-600 w-6 h-6"
                />
              </Link>
              <a href="" className="p-2" title="Snapchat">
                <FontAwesomeIcon
                  icon={faSquareSnapchat}
                  className="text-yellow-300 w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between  px-4 sm:px-6 lg:px-8">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="Kemet Logo" width={100} height={50} />
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
            <Button className="px-4 py-2" onClick={() => router.push("/Book")}>Book Now</Button>
          </li>
          <li className="md:ml-8 text-xl md:mt-5 my-7 md:p-2">
            <button onClick={() => setModalOpen(true)}>
              <UserIcon className="w-8 h-8 cursor-pointer hover:fill-amber-500 transition-colors" />
            </button>
          </li>
        </ul>
      </div>
      <Model isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
}
