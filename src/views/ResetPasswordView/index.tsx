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
import { regexEmail } from "@/utils/regex";
import { useCallback } from "react";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    // .email({
    //   message: "This is not a valid email",
    // })
    .min(1, { message: "Email is required." })
    .regex(regexEmail, "This is not a valid email"),
});

const ResetPasswordView = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: undefined,
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

  const renderEmail = useCallback(({ field }: any) => {
    return (
      <FormItem className="space-y-1">
        {/* <FormLabel className="!text-foreground font-semibold">
          Email
        </FormLabel> */}
        <FormControl>
          <Input placeholder="Email address" {...field} type="text" />
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
            className="max-w-sm mx-auto px-6 space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={renderEmail}
            />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        </Form>
        {/* </div> */}
      </div>
    </div>
  );
};
export default ResetPasswordView;
