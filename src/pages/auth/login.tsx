import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
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
import { PasswordInput } from "@/components/ui/password-input";
import { useLogin } from "./service/useLogin";
import { Spinner } from "@/components/ui/spinner";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  role: z.string().min(2).max(50),
});

export const Login = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Admin1",
      password: "Admin123!",
      role: "ADMIN",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: (res) => {
        let role = res.data.user.role.toLowerCase();

        Cookie.set("token", res.data.token);
        Cookie.set("role", role);
        toast.success(res.message.uz, {
          position: "bottom-right",
        });

        let too = role === "super_admin" ? "/app/admin" : `/app/${role}`
        navigate(too);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="fixed bg-[#fff2c0] inset-0 flex items-center justify-center">
      <Button className="absolute right-5 top-5 cursor-pointer">Sign up</Button>
      <div className="w-[500px] bg-white shadow rounded-lg p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-[30px]"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="TEACHER">TEACHER</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{isPending ? <Spinner /> : ""} Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
