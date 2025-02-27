import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import { z } from "zod";
import { useLoginMutation } from "../../redux/feature/authManage/authApi"
import { setUser, useCurrentUser } from "../../redux/feature/authManage/authSlice"

import { useNavigate, useLocation, Link } from "react-router-dom";


import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { zodResolver } from '@hookform/resolvers/zod';
import { jwtDecode, JwtPayload } from "jwt-decode"



const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

// Define a custom type for your JWT payload
interface CustomJwtPayload extends JwtPayload {
  email: string;
  name: string;
  role: string;
  imageUrl?: string;
}

const Login: React.FC = () => {

  const [login]=useLoginMutation();
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const location=useLocation();
  const token =useAppSelector(useCurrentUser);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
      email:"",
      password:""
    }
  });

  const onSubmit =async (values:z.infer<typeof formSchema>) => {
    try {
      const res = await login(values).unwrap()
      // console.log("login res",res)

      // Decode the token using jwt-decode
      const decodedToken = jwtDecode<CustomJwtPayload>(res.data.accessToken);

      const user = {
        email: decodedToken.email,
        exp: decodedToken.exp || 0,
        iat: decodedToken.iat || 0,
        name: decodedToken.name,
        role: decodedToken.role,
        imageUrl: decodedToken.imageUrl || '',
      };

      // console.log("user login",user)
      if(!user){
        throw new Error("Invalid token")
      }
      dispatch(setUser({
        user, token: res.data.accessToken
      }))
      // console.log('token',res.data.accessToken)
      toast.success("Login successful")
      navigate(location?.state|| "/",{replace:true});

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed")
    }
    if(token){
      return
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email", { required: "Email is required" })}
              />
              {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...form.register("password", { required: "Password is required" })}
              />
              {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link to="/register" className="w-full">
            <Button variant="link" className="w-full">
              Don't have an account? Register
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login;
