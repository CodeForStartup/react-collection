import CreateEditUserForm from "@/components/molecule/create-user/CreateEditUserForm";
import React from "react";

const Page = () => {
  return (
    <div className="container p-20">
      <div className="m-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          React Hook Form with Zod Validation
        </h1>
      </div>

      <div className="m-auto max-w-[800px] py-10">
        In this page, we will create a user form with React Hook Form and Yup
        validation with the these rules:
        <ul className="list-disc list-inside">
          <li>Required/Optional a field</li>
          <li>String: max length, min length, matching pattern</li>
          <li>Special string type: Email, Password, URL, Phone number</li>
          <li>Number: max/min</li>
          <li>Enum type</li>
          <li>Array of string/object</li>
          <li>File: Image/PDF</li>
          <li>A field depends on another field</li>
        </ul>
      </div>
      <CreateEditUserForm />
    </div>
  );
};

export default Page;
