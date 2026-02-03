import Link from "next/link";
import { useRef } from "react";
import { toast } from "react-toastify";

import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { newsletterSubscriptionHandler } from "@/helper/newsletter";



export default function UpperHeader(props) {
  const userEmailRef = useRef();
    function handleformSubmit(e){
      e.preventDefault();
      const enteredEmail = userEmailRef.current.value;
      newsletterSubscriptionHandler(enteredEmail);
    }

  return (
    <div className=" bg-amber-500 justify-end ">
      <div className="flex justify-end p-2 mr-10">
        <div className="flex items-center gap-6">
          <span className="text-white text-sm md:text-base">
            Call us: +20 123005640
          </span>
          <div className="border-l border-white h-6"></div>
        </div>
        {/* Subscription Form */}
        <form onSubmit={handleformSubmit}>
          <input
            type="text"
            placeholder="enter your email to subscribe"
            className="ml-4.5 mt-1 p-1.5 px-5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            ref={userEmailRef}
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
  );
}
