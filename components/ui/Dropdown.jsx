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
    <div className="w-full py-6 pb-8">
      <div className="relative inline-block">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full bg-white text-sm font-medium text-gray-700"
        >
          <UserSquare className="w-10 h-10 mb-2 ml-2 cursor-pointer fill-amber-500  transition-colors" />
        </button>
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              className="py-1"
            >
              <li>
                <Link
                  href={props.pagelink}
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
