"use client";

import React from "react";

import { Form } from "@components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import UserDetailInfo from "./UserDetailInfo";
import Experiences from "./Experiences";
import { UserForm } from "./type";
import { createUserResolver } from "./yupResolver";

const CreateEditUserForm = () => {
  const form = useForm<UserForm>({
    mode: "all",
    defaultValues: {
      gender: undefined,
      experiences: [
        {
          position: "",
          company: "",
          from: new Date(),
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
