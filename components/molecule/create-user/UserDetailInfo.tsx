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
import { GenderEnum, Skill, Skills, WorkingType } from "./type";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const UserDetailInfo: React.FC = () => {
  return (
    <div className="flex gap-8 flex-col">
      <h3 className="text-xl">User information</h3>
      <div className="bg-slate-50 p-8 rounded-2xl border flex flex-col gap-8">
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
                <FormDescription>
                  Validate: <code>yup.email</code> for validating email
                </FormDescription>
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
        <FormField
          name="gender"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

        <FormField
          name="working_types"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Working type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={WorkingType.Freelancer} />
                    </FormControl>
                    <FormLabel className="font-normal">Freelancer</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={WorkingType.FullTime} />
                    </FormControl>
                    <FormLabel className="font-normal">Full time</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={WorkingType.PartTime} />
                    </FormControl>
                    <FormLabel className="font-normal">Part time</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="skills"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {Skills.map((skill) => (
                <FormField
                  key={skill.id}
                  name="skills"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={skill.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(skill.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, skill.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== skill.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {skill.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default UserDetailInfo;
