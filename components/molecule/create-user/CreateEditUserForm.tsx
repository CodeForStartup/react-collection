"use client";

import React, { useEffect } from "react";

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
  // profileImage?: File;
  // bio?: string;
  // country: Countries;
  // overtime?: boolean;
  // experiences: Array<{
  //   title: string;
  //   company: string;
  //   location?: string;
  // }>;
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
  })
);

const CreateEditUserForm = () => {
  const form = useForm<UserForm>({
    mode: "all",
    defaultValues: {},
    resolver: createUserResolver,
  });

  const { handleSubmit } = form;

  const onSubmit = (data) => {
    //
  };

  return (
    <div className="w-full max-w-[800px] m-auto py-10">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col"
        >
          <div className="flex gap-4 w-full">
            <FormField
              name="first_name"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Validate: required, max-length: 50, includes [a-zA-Z\s]
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="last_name"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Validate: required, max-length: 50, includes [a-zA-Z\s]
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <FormField
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>Validate: ...</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Validate: Password should include at least one lowercase
                    letter, one uppercase letter, one number, and one special
                    character
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="password_confirmation"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password confirmation</FormLabel>
                  <FormControl>
                    <Input placeholder="Password confirmation" {...field} />
                  </FormControl>
                  <FormDescription>
                    Validate: Confirmation password should match password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex gap-4 justify-center">
            <Button
              value="reset"
              type="reset"
              variant="outline"
              className="w-full max-w-[200px]"
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
