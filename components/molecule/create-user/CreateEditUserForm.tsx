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
import UserDetailInfo from "./UserDetailInfo";
import Experiences from "./Experiences";
import { GenderEnum, UserForm } from "./type";

const createUserResolver = yupResolver<UserForm>(
  yup.object().shape(
    {
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
          yup.object().shape(
            {
              position: yup.string().required("Position is required"),
              company: yup.string().required("Company is required"),
              from: yup.date().required("Start date is required"),
              is_working: yup.boolean(),
              to: yup.date().when("is_working", ([is_working], schema) => {
                return Boolean(is_working)
                  ? schema
                  : schema.required("End date is required");
              }),
            },
            [["to", "is_working"]] as const
          )
        )
        .min(1, "") as yup.Schema<
        { position: string; company: string; from: Date; to: Date }[]
      >,
    },
    [["password", "password_confirmation"]] as const
  )
);

const CreateEditUserForm = () => {
  const form = useForm<UserForm>({
    mode: "all",
    defaultValues: {
      gender: undefined,
      experiences: [
        {
          position: "",
          company: "",
          from: undefined,
          to: undefined,
          is_working: false,
        },
      ],
    },
    resolver: createUserResolver,
  });

  const { handleSubmit } = form;

  const onSubmit = () => {
    //
  };

  return (
    <div className="w-full max-w-[800px] m-auto mt-10">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-12 flex flex-col"
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
                  experiences: [
                    {
                      position: "",
                      company: "",
                      from: undefined,
                      to: undefined,
                      is_working: false,
                    },
                  ],
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
