import React from "react";
import {
  UseFormReturn,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { UserForm } from "./type";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";

type ExperiencesProps = {};

const Experiences: React.FC<ExperiencesProps> = ({}) => {
  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: control,
      name: "experiences",
    }
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl">Experiences</h3>
          <FormDescription>
            <code>useFieldArray</code> for dynamic array of experiences
          </FormDescription>
        </div>
        <Button
          onClick={() => append({})}
          size="sm"
          variant="ghost"
          type="button"
        >
          <Plus />
        </Button>
      </div>
      {fields.map((experience, index) => (
        <div
          key={experience.id}
          className="bg-slate-50 p-8 rounded-2xl border relative"
        >
          <div className="flex justify-end">
            <Button
              onClick={() => remove(index)}
              size="sm"
              variant="ghost"
              type="button"
            >
              <Trash2 />
            </Button>
          </div>

          <div className="flex flex-col gap-8 ">
            <div className="flex flex-col gap-8">
              <FormField
                name={`experiences.${index}.position`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Senior Frontend Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Validate: required, max-length: 255
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name={`experiences.${index}.company`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Code For Startup" {...field} />
                      </FormControl>
                      <FormDescription>
                        Validate: required, max-length: 255
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name={`experiences.${index}.is_working`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Switch
                            {...field}
                            id={`experiences.${index}.is_working`}
                          />
                          <Label htmlFor={`experiences.${index}.is_working`}>
                            I am currently working in this role
                          </Label>
                        </div>
                      </FormControl>
                      {/* <FormDescription>Validate:</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
