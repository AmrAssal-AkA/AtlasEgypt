import Link from "next/link";

function RegisterForm() {
  return (
    <form className="space-y-6">
      <div>
        <label
          htmlFor="FullName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          name="FullName"
          placeholder="Enter your Name here"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <div>
        <label
          htmlFor="email address"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
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
          name="password"
          placeholder="Enter your password"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <div>
        <label
          htmlFor="confirm password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm password"
          placeholder="Re-enter your password"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
      </div>
      <p>
        Already have an account?{" "}
        <Link href={"/login"} className="underline hover:text-amber-500">
          Back to login page
        </Link>
      </p>
      <div className="text-right">
        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-800 cursor-pointer"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
