import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export enum GenderEnum {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

const UserDetailInfo: React.FC = () => {
  return (
    <div className="bg-slate-50 p-8 rounded-lg border flex flex-col gap-4">
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
                Validate: Password should include at least one lowercase letter,
                one uppercase letter, one number, and one special character
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
      <FormField
        name="gender"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(GenderEnum).map((value) => {
                      return (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Validate: Enum validation{" "}
                <code>.oneOf(Object.values(GenderEnum))</code>
              </FormDescription>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default UserDetailInfo;
