import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import {  useRouter } from "next/router";


function LoginForm() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const router =useRouter();
    
    async function handlelogin(e){
        e.preventDefault();
        const response = await signIn('credentials', {
          redirect: false,
          email : email,
          password: password,
        })
        if(!response.ok){
          toast.error("Invalid email or password");
      }else{
        toast.success("Logged in successfully");
        router.push("/");
    }
  }
  return (
           <form onSubmit={handlelogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors cursor-pointer"
            >
              Login
            </button>

            <div className="text-center mt-6">
              <Link
                href="//authentiaction/Register"
                className="text-gray-700 hover:text-amber-500 underline"
              >
                don't have an account
              </Link>
            </div>
          </form>
  )
}


export default LoginForm