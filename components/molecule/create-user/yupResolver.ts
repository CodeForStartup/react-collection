import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GenderEnum, Skill, UserForm, WorkingType } from "./type";
import { url } from "inspector";

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

      // Gender: required, one of GenderEnum value
      gender: yup
        .mixed<GenderEnum>()
        .oneOf(Object.values(GenderEnum), "Gender is required")
        .required("Gender is required"),

      // URL: optional, should be a valid URL
      url: yup.string().url("Invalid URL"),

      skills: yup
        .array()
        .of(yup.string().oneOf(Object.values(Skill)))
        .min(1, "At least one skill is required") as yup.Schema<Skill[]>,

      working_types: yup
        .string()
        .oneOf(Object.values(WorkingType))
        .required("Working type is required"),

      phone: yup.string().required("Phone is required"),

      experiences: yup
        .array()
        .of(
          yup.object().shape(
            {
              // Validate: required, max-length: 255
              position: yup
                .string()
                .required("Position is required")
                .max(255, "Max length is 255"),
              company: yup
                .string()
                .required("Company is required")
                .max(255, "Max length is 255"),
              from: yup
                .date()
                .required("Start date is required")
                .typeError("Start date is required"),
              is_working: yup.boolean(),
              // Two field depends together: to and is_working
              // If is_working is true, to is disabled (not required)
              // If is_working is false:
              //    If from and to are provided, to should be greater than from
              //    Else show error message: "End date should be greater than start date"
              to: yup
                .date()
                .when(["is_working", "from"], ([is_working, from], schema) => {
                  if (Boolean(is_working)) {
                    return schema;
                  }
                  return schema
                    .test({
                      test: (value) => {
                        if (from && value) {
                          return (
                            Date.parse(String(from)) < Date.parse(String(value))
                          );
                        }
                        return true;
                      },
                      message: "End date should be greater than start date",
                    })
                    .required("End date is required");
                })
                .typeError("End date is required")
                .transform((value) => {
                  return Date.parse(value) ? value : "";
                }),
            },
            [
              ["to", "is_working"],
              ["from", "is_working"],
            ] as const
          )
        )
        .min(1, "") as yup.Schema<
        { position: string; company: string; from: Date; to: Date }[]
      >,
    },
    [["password", "password_confirmation"]] as const
  )
);
