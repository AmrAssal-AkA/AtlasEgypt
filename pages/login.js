import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handlelogin = (e) => {
    e.preventDefault();
    if (email === "amr@gmail.com" && password === "amr1234") {
      toast.success("Login Successful!");
      router.push("/");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <Image
            src={"/BrandBanner.png"}
            alt="Login Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Login to Your Account
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-8"></div>

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

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-amber-500 hover:text-amber-600"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors cursor-pointer"
            >
              Login
            </button>

            <div className="text-center mt-6">
              <Link
                href="/Register"
                className="text-gray-700 hover:text-amber-500 underline"
              >
                don't have an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
