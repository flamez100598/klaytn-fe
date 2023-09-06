"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useCallback } from "react";
import { regexValidPass } from "@/utils/regex";

const FormSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: "Current password is required",
      })
      .min(1, { message: "Current password is required." })
      .min(8, {
        message: "Current password must be at least 8 characters.",
      })
      .regex(regexValidPass, "This is not a valid password"),
    newPassword: z
      .string({
        required_error: "New password is required",
      })
      .min(1, { message: "New password is required." })
      .min(8, {
        message: "New password must be at least 8 characters.",
      })
      .regex(regexValidPass, "This is not a valid password"),
    confirmPassword: z
      .string({
        required_error: "Confirm password  is required",
      })
      .min(1, { message: "Confirm password is required." }),
    // .min(8, {
    //   message: "Confirm password  must be at least 8 characters.",
    // })
    // .regex(
    //   regexValidPass,
    //   "This is not a valid password"
    // ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password don't match",
    path: ["confirmPassword"],
  });

const ChangePasswordView = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
    // mode: "all",
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const renderCurrentPassword = useCallback(({ field }: any) => {
    return (
      <FormItem className="space-y-1">
        {/* <FormLabel className="!text-foreground font-semibold">
          Password
        </FormLabel> */}
        <FormControl>
          <Input placeholder="Current Password" {...field} type="password" />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNewPassword = useCallback(({ field }: any) => {
    return (
      <FormItem className="space-y-1">
        {/* <FormLabel className="!text-foreground font-semibold">
          Password
        </FormLabel> */}
        <FormControl>
          <Input placeholder="New Password" {...field} type="password" />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderConfirmPassword = useCallback(({ field }: any) => {
    return (
      <FormItem className="space-y-1">
        {/* <FormLabel className="!text-foreground font-semibold">
          Password
        </FormLabel> */}
        <FormControl>
          <Input
            placeholder="Confirm your Password"
            {...field}
            type="password"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(form.formState.errors);
  return (
    <div className="container">
      <div className="relative">
        {/* <div className="absolute w-[500px]"> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[450px] mx-auto px-6 space-y-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={renderCurrentPassword}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={renderNewPassword}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={renderConfirmPassword}
            />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
        {/* </div> */}
      </div>
    </div>
  );
};
export default ChangePasswordView;
