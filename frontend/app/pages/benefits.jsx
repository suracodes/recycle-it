import Image from "next/image";
import React from "react";
import flower from "../../public/images/benefits/flower.png";
import tick from "../../public/images/benefits/tick.svg";
import { SiteBlob2 } from "../../components/site-blob-2"

const Benefits = () => {
  const benefitsList = [
    "Reduce environmental impact",
    "Promote sustainability",
    "Contribute to recycling efforts",
    "Save natural resources",
    "Reduce waste generation",
    "Support circular economy",
    "Lower carbon footprint",
    "Create green jobs",
    "Improve community health",
    "Enhance corporate social responsibility",
  ];

  return (
    <section id="benefits" className="w-full overflow-x-hidden">
      <div className="lg:w-5/6 mx-auto py-16">
        <div className="relative">
          <div className="absolute lg:-top-8 phone:right-[5rem] lg:left-[20rem] w-72 h-72 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-2xl phone:opacity-40 lg:opacity-70 animate-blob"></div>
          <div className="absolute lg:-top-10 phone:left-[5rem] lg:left-[30rem] w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl phone:opacity-40 lg:opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute phone:-top-20 lg:-top-10 lg:left-[42rem] w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-2xl phone:opacity-50 lg:opacity-70 animate-blob animation-delay-4000"></div>
          <h1 className="phone:text-3xl lg:text-5xl font-artik phone:mb-5 lg:mb-8 text-center">
            <div className="flex justify-center mb-3 gap-3">
              <h1>Benefits of</h1>
              <Image src={flower} alt="" className="phone:w-9 phone:h-9 lg:w-12 lg:h-12" />
            </div>
            Working With Us
          </h1>
          <p className="font-roxale lg:text-xl text-center phone:w-5/6 lg:w-2/5 mx-auto">
            Efficient waste management for environmental responsibility, cost
            savings, regulatory compliance, and a healthier, sustainable future.
            Partner with us today.
          </p>
        </div>
        <div className="relative mt-16">
          <SiteBlob2 />
        </div>
        <div className="space-y-4 card rounded-xl p-5 lg:w-[30%] phone:w-5/6 phone:mx-auto mx-auto font-roxale lg:text-lg mt-5">
          {benefitsList.map((benefit, index) => (
            <div className="flex justify-between" key={index}>
              <div className="text-left my-auto">{benefit}</div>
              <Image src={tick} alt="" className="w-8 h-8"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
