import React from "react";
import YupForm from "./YupForm";

const Page = () => {
  return (
    <div className="container">
      <div className="mt-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          React Hook Form with Yup Validation
        </h1>
      </div>

      <YupForm />
    </div>
  );
};

export default Page;
