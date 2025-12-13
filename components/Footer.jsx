import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faApple,
  faPaypal,
  faFacebook,
  faTwitter,
  faInstagram,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-amber-500 border-t border-amber-400 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 w-full">
        <div className="p-2 flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-amber-200 gap-4">
          <Link href="/">
            <Image src="/logo.png" alt="Kemet Logo" width={100} height={80} />
          </Link>
          <Link
            href="/"
            className="text-gray-700 text-lg md:text-xl flex items-center"
          >
            Follow Us
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">
              Contact
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
              <li>10 Zaki Ragab, Ezbet Saad, Sidi Gaber</li>
              <li>
                <a
                  href="mailto:KEMET@gmail.com"
                  className="hover:text-blue-500"
                >
                  KEMET@gmail.com
                </a>
              </li>
            </ul>

            <h3 className="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">
              Follow Us
            </h3>
            <div className="flex gap-3 md:gap-4 text-lg md:text-xl justify-center sm:justify-start">
              <a
                href="#"
                className="text-blue-600 hover:opacity-80"
                title="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="#"
                className="text-blue-400 hover:opacity-80"
                title="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="text-pink-600 hover:opacity-80"
                title="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="#"
                className="text-yellow-300 hover:opacity-80"
                title="Snapchat"
              >
                <FontAwesomeIcon icon={faSnapchat} />
              </a>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">
              Company
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Travel Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Data Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Login
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">
              Support
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Get in Touch
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Live chat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  How it works
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">
              Newsletter
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              Subscribe to the free newsletter and stay
            </p>
            <div className="mb-4 md:mb-6 max-w-xs mx-auto sm:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs md:text-sm mb-2 bg-white"
              />
              <button className="w-full bg-yellow-500 text-black py-2 rounded text-sm md:text-base font-medium hover:bg-yellow-200 cursor-pointer">
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-600 gap-4">
          <p className="text-center md:text-left">
            © Copyright reserved at KEMET 2025
          </p>
          <p className="text-center">
            Code and designed by <Link href="https://github.com/AmrAssal-AkA" className="underline" target="_blank">Amr Assal</Link>
          </p>
          <div className="flex gap-3 md:gap-4 text-xl md:text-2xl">
            <FontAwesomeIcon
              icon={faCcVisa}
              title="Visa"
              className="text-blue-600 hover:opacity-80 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faCcMastercard}
              title="Mastercard"
              className="text-red-600 hover:opacity-80 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faCcPaypal}
              title="PayPal"
              className="text-blue-500 hover:opacity-80 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faApple}
              title="Apple Pay"
              className="text-black hover:opacity-80 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faPaypal}
              title="paypal"
              className="text-blue-500 hover:opacity-80 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
