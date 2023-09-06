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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback } from "react";
import { regexEmail } from "@/utils/regex";

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
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, { message: "Password is required." })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
  remember: z.literal<boolean>(true, {
    errorMap: () => ({ message: "Remember must be ticked" }),
  }),
});

const LoginView = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
      remember: false,
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
        </FormLabel> 
        */}

        <FormControl>
          <Input placeholder="Email" {...field} type="text" />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPassword = useCallback(({ field }: any) => {
    return (
      <FormItem className="space-y-1">
        {/* <FormLabel className="!text-foreground font-semibold">
          Password
        </FormLabel> */}
        <FormControl>
          <Input placeholder="Password" {...field} type="password" />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderRemember = useCallback(({ field }: any) => {
    return (
      <FormItem className="flex flex-wrap flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <FormLabel className="!text-foreground font-normal">
          Remember Me
        </FormLabel>
        <FormMessage className="!mx-0 w-full" />
      </FormItem>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <FormField
              control={form.control}
              name="password"
              render={renderPassword}
            />
            <FormField
              control={form.control}
              name="remember"
              render={renderRemember}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        {/* </div> */}
      </div>
    </div>
  );
};
export default LoginView;
