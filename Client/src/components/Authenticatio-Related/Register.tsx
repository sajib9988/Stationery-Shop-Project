import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAppSelector } from "../../redux/hook"
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "../../redux/feature/authManage/authSlice"

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { BackHome } from "../../components/ui/back-home";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSignUpMutation } from "../../redux/feature/authManage/authApi"
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';



const Register = () => {
  const [register] = useSignUpMutation();;
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentUser);
  const [showPassword, setShowPassword] = useState(false);

  const formSchmea = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchmea),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onsubmit = async (values: z.infer<typeof formSchmea>) => {
    const toastId = toast.loading("Registering...")
    try {
      const res = await register(values).unwrap();
      console.log("res",res)
      
      if(res.success) {
        form.reset();
        toast.success("Register successful", { toastId })
        navigate("/login")
      } else {
        toast.error("Registration failed", { toastId });
      }
    } catch (error: unknown) {
      const err = error as FetchBaseQueryError;
      if (err.status === 409) {
        toast.error("User already exists", { toastId });
      } else {
        toast.error((err.data as { message: string })?.message || "Registration failed", { toastId });
      }
    }
  };

  if (token) {
    return <BackHome message="You Are Already Logged In!" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...form.register("name")}
                className="w-full"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...form.register("email")}
                className="w-full"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...form.register("password")}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => navigate("/login")}>
            Already have an account? Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
