import { useRef } from "react";
import { toast } from "react-toastify";

export default function ForgetPasswordForm() {
  const oldPasswordRef= useRef();
  const newPasswordRef= useRef();

  async function handleSumbit(e){
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    
    if (
      !oldPassword ||
      !newPassword ||
      newPassword.trim().length < 7
    ) {
      toast.error("Please check your input. New passwords must be at least 7 characters long.");
      return;
    }
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      })
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Something went wrong!");
      } else {
        toast.success("Password updated successfully!");
      }
  }

  return (
    <form className="space-y-6" onSubmit={handleSumbit}>
      <div>
        <label
          htmlFor="oldPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Old Password
        </label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          required
          placeholder="enter old password here"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          ref={oldPasswordRef}
        />
      </div>
      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          required
          placeholder="enter new password here"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          ref={newPasswordRef}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 cursor-pointer"
        >
          Change Password
        </button>
      </div>
    </form>
  );
}
