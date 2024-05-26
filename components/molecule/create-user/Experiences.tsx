import React, { useEffect } from "react";
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
import { CalendarDays, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type ExperiencesProps = {};

const ExperienceFromToPicker = ({ index }: { index: number }) => {
  const { watch, resetField } = useFormContext();

  const experience = watch(`experiences.${index}`);

  useEffect(() => {
    if (experience?.is_working) {
      resetField(`experiences.${index}.to`);
    }
  }, [experience?.is_working, index, resetField]);

  return (
    <div className="flex">
      <FormField
        name={`experiences.${index}.from`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Validate: start-date must be before end-date
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`experiences.${index}.to`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>End date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    disabled={experience?.is_working}
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Validate: end-date must be before end-date/ If user is still
              working, disable this field
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const Experiences: React.FC<ExperiencesProps> = ({}) => {
  const { control, register } = useFormContext();

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
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id={`experiences.${index}.is_working`}
                          />
                          <Label htmlFor={`experiences.${index}.is_working`}>
                            I am currently working in this role
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <ExperienceFromToPicker index={index} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
