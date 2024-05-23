"use client";

import React from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import UserDetailInfo, { GenderEnum } from "./UserDetailInfo";
import exp from "constants";
import Experiences from "./Experiences";

enum Countries {
  US = "United States",
  CA = "Canada",
  UK = "United Kingdom",
  AU = "Australia",
  DE = "Germany",
  FR = "France",
  JP = "Japan",
  CN = "China",
  KR = "South Korea",
  IN = "India",
  BR = "Brazil",
  MX = "Mexico",
  RU = "Russia",
  ZA = "South Africa",
  NG = "Nigeria",
  EG = "Egypt",
  KE = "Kenya",
  SA = "Saudi Arabia",
  AE = "United Arab",
  VI = "Vietnam",
}

type UserForm = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  gender: GenderEnum;
  // profileImage?: File;
  // bio?: string;
  // country: Countries;
  // overtime?: boolean;
  experiences: Array<{
    title: string;
    company: string;
    location?: string;
  }>;
  // skills: Array<string>;
  // projects: Array<{
  //   title: string;
  //   description: string;
  //   url?: string;
  // }>;
};

const createUserResolver = yupResolver<UserForm>(
  yup.object().shape({
    first_name: yup
      .string()
      .required("First name is required")
      .max(50)
      .matches(
        /^[a-zA-Z\s]+$/,
        "First name should include only alphabets and spaces"
      ),
    last_name: yup
      .string()
      .required("Last name is required")
      .max(50)
      .matches(
        /^[a-zA-Z\s]+$/,
        "Last name should include only alphabets and spaces"
      ),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .matches(
        /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password should include at least one lowercase letter, one uppercase letter, one number, and one special character"
      ),
    password_confirmation: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    gender: yup
      .string()
      .oneOf(Object.values(GenderEnum))
      .required("Gender is required"),
    experiences: yup
      .array()
      .of(
        yup.object().shape({
          title: yup.string().required("Title is required"),
          company: yup.string().required("Company is required"),
          location: yup.string().optional(),
        })
      )
      .min(1, "") as yup.Schema<
      { title: string; company: string; location?: string }[]
    >,
  })
);

const CreateEditUserForm = () => {
  const form = useForm<UserForm>({
    mode: "all",
    defaultValues: {
      gender: undefined,
    },
    resolver: createUserResolver,
  });

  const { handleSubmit } = form;

  const onSubmit = () => {
    //
  };

  console.log(form.getValues());

  return (
    <div className="w-full max-w-[800px] m-auto mt-10">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col"
        >
          <UserDetailInfo />

          <Experiences />
          <div className="flex gap-4 justify-center">
            <Button
              value="reset"
              type="reset"
              variant="outline"
              className="w-full max-w-[200px]"
              onClick={() =>
                form.reset({
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
                })
              }
            >
              Reset
            </Button>
            <Button type="submit" className="w-full max-w-[200px]">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEditUserForm;
