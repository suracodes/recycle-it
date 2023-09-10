"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import left from "../../../../public/images/dashboard/left-arrow.svg";
import bell from "../../../../public/images/dashboard/bell.svg";
import photo from "../../../../public/images/dashboard/sagittarius.png";
import useMediaQuery from "../../../../hooks/useMediaQuery";

const FAQSection = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const faqData = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express) and PayPal.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express) and PayPal.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express) and PayPal.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express) and PayPal.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express) and PayPal.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website.",
    },
  ];

  return (
    <>
      {isAboveSmallScreens ? (
        <div className="panel flex">
          <div className="w-60 border-r-2 flex justify-center pt-8 border-white/10">
            <div className="text-white mb-4">
              <Link href="/admin/home" className="flex">
                <Image src={left} alt="" className="w-12 h-12 mx-auto mb-10" />
              </Link>
              <Image
                src={photo}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-white/20 mx-auto"
              />
              <p className="text-white/30 font-roxale mt-1 text-center">
                @johndoe
              </p>
              <div>
                <p className="font-roxale mt-5 text-lg text-center">
                  John Doe
                </p>
                <div className="flex flex-col">
                  <button className="px-5 rounded-full border-2 border-white/10 font-roxale mt-2">
                    Edit
                  </button>
                  <Link
                    href="/admin/warehouse"
                    className="mt-[22rem] rounded-2xl border-2 bg-white/10 border-white/20 px-5 py-1"
                  >
                    Go To Warehouse
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 panel w-full">
            <div className="flex justify-between">
              <h2 className="text-3xl font-semibold font-roxale text-white mb-10">
                Frequently Asked Questions
              </h2>
              <Link href="/admin/notifications">
                <Image src={bell} alt="" className="w-10 h-10 my-auto" />
              </Link>
            </div>
            <div className="space-y-4 overflow-y-scroll scroll h-screen">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/10 border-2 border-white/10 p-4 shadow-md rounded-md"
                >
                  <details className="transition duration-500">
                    <summary className="cursor-pointer transition duration-300 text-white font-roxale">
                      {faq.question}
                    </summary>
                    <div className="mt-3 text-white/70 font-roxale">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="panel flex">

          <div className="p-8 panel w-full">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold font-roxale text-white mb-10">
                Frequently Asked Questions
              </h2>
              <Link href="/admin/notifications">
                <Image src={bell} alt="" className="w-8 h-8 my-auto" />
              </Link>
            </div>
            <div className="space-y-4 overflow-y-scroll scroll h-screen">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/10 border-2 border-white/10 p-4 shadow-md rounded-md"
                >
                  <details className="transition duration-500">
                    <summary className="cursor-pointer transition duration-300 text-white font-roxale">
                      {faq.question}
                    </summary>
                    <div className="mt-3 text-white/70 font-roxale">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQSection;
