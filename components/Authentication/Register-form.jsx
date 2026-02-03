import Link from "next/link";
import { useRef } from "react";
import { toast } from "react-toastify";



function RegisterForm() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (
      !enteredName ||
      !enteredEmail ||
      !enteredEmail.includes("@") ||
      !enteredPassword ||
      enteredPassword.trim().length < 7 ||
      enteredPassword !== enteredConfirmPassword
    ) {
      toast.error("Please enter valid data");
      return;
    }
    const data = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    }
      fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if(res.ok){
        toast.success("User registered successfully");
      } else {
        return res.json().then((data) => {
          toast.error(data.message || "Something went wrong!");
        });
      }
    })
    }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
          ref={nameInputRef}
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
          ref={emailInputRef}
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
          ref={passwordInputRef}
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
          ref={confirmPasswordInputRef}
        />
      </div>
      <p>
        Already have an account?{" "}
        <Link href="/authentiaction/login" className="underline hover:text-amber-500">
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
