"use client";
import Link from "next/link";
import { useState } from "react";

import {UserSquare} from "lucide-react"

export default function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="w-full py-6 pb-8 md:ml-0 flex md:justify-end">
      <div className="relative inline-block text-left">
        <div
          role="button"
          tabIndex={0}
          onClick={toggleDropdown}
          onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}
          className="inline-flex justify-center w-full bg-white text-sm font-medium text-gray-700"
        >
          <UserSquare className="w-10 h-10 mb-2 ml-2 cursor-pointer text-amber-500 transition-colors" />
        </div>
        {isOpen && (
          <div className=" md:origin-top-right absolute top-0  md:right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              className="py-1 cursor-pointer "
            >
              <li>
                <Link
                  href={props.pagelink}
                  onClick={closeDropdown}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {props.pageName}
                </Link>
              </li>

              <li>
                <button
                  onClick={() => {closeDropdown(); props.pagelink2();}}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {props.pageName2}
                </button>
              </li>


              <li>
                <button
                  onClick={() => {closeDropdown(); props.pagelink3();}}
                  className="block w-full text-left px-4 py-2 text-red-700 hover:bg-gray-100 hover:text-red-900"
                  role="menuitem"
                >
                  {props.pageName3}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
