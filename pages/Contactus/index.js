import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ContactUsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill out all fields.");
    } else {
      toast.success("Message sent successfully!");
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 mt-20">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-80 md:h-full md:min-h-[600px]">
          <Image
            src={"/BrandBanner.png"}
            alt="Contact Us"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            We're here to help! Reach out to us with any questions or inquiries
            you may have. Our team is dedicated to providing you with the best
            possible assistance and ensuring your experience with KEMET is
            seamless and enjoyable.
          </p>
          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                id="message"
                name="message"
                rows="5"
                placeholder="Your Message"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button
              className="w-full bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
