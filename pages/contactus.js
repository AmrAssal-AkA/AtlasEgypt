import Image from "next/image";
import React, { useState } from "react";
import Head from "next/head";

import ContactForm from "@/components/contact/contact-form";

export default function ContactUsPage() {
  return (
    <>
    <Head>
      <title>AtlasEgypt - Contact Us</title>
      <meta name="description" content="Get in touch with AtlasEgypt for any inquiries or support. We're here to help you with your travel needs." />
      <meta name="robots" content="index, follow" />
    </Head>
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 mt-20">
      <div className="max-w-8xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-50 md:h-full md:min-h-[600px]">
          <Image
            src="/AtlasEgypt.jpg"
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
            possible assistance and ensuring your experience with AtlasEgypt is
            seamless and enjoyable.
          </p>
          <ContactForm />
        </div>
      </div>
    </main>
    </>
  );
}
