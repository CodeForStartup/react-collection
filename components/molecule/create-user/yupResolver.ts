import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GenderEnum, UserForm } from "./type";

export const createUserResolver = yupResolver<UserForm>(
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
