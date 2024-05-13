"use client";

import React from "react";

import { Form, FormDescription, FormField } from "@components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const YupForm = () => {
  const form = useForm();

  const { handleSubmit } = form;

  const onSubmit = (data) => {
    //
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormDescription>Form description...</FormDescription>
        <FormField
          name="name"
          render={({ field }) => <Input {...field} placeholder="Name" />}
        />
      </form>
    </Form>
  );
};

export default YupForm;
