import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Separator, TextField } from "@radix-ui/themes";
import { ErrorText } from "~/components/ErrorText";
import { Link } from "react-router";
import { routes } from "~/global/config/routes.config";
import { useAnimation } from "~/global/hooks/useAnimation";

const signUpScheme = z
   .object({
      username: z
         .string()
         .nonempty("Username is not specified")
         .max(20, "Username must be less than 20 characters"),
      email: z
         .string()
         .nonempty("Email is not specified")
         .email("Invalid email"),
      password: z
         .string()
         .nonempty("Password is not specified")
         .min(8, "Password must be at least 8 characters"),
      repeatPassword: z.string().nonempty("Please repeat your password"),
      image: z.string().optional()
   })
   .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords do not match",
      path: ["repeatPassword"]
   });

type signUpData = z.infer<typeof signUpScheme>;

function SignupPage() {
   const { setAnimation } = useAnimation();

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<signUpData>({
      resolver: zodResolver(signUpScheme)
   });

   const onSubmit: SubmitHandler<signUpData> = (data) => {
      console.log(data);
   };

   return (
      <>
         <h1 className="containerX text-center mt-20">Signup</h1>
         <section className="containerX">
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="max-w-[450px] mx-auto p-4 flex flex-col gap-3"
            >
               <label>
                  <p className="font-bold">Username:</p>
                  <TextField.Root
                     {...register("username")}
                     placeholder="Username"
                  />
                  {errors.username && (
                     <ErrorText>{errors.username.message}</ErrorText>
                  )}
               </label>
               <label>
                  <p className="font-bold">Email:</p>
                  <TextField.Root {...register("email")} placeholder="Email" />
                  {errors.email && (
                     <ErrorText>{errors.email.message}</ErrorText>
                  )}
               </label>

               <label>
                  <p className="font-bold">Password:</p>
                  <TextField.Root
                     {...register("password")}
                     placeholder="Password"
                     type="password"
                  />
                  {errors.password && (
                     <ErrorText>{errors.password.message}</ErrorText>
                  )}
               </label>
               <label>
                  <p className="font-bold">Repeat Password:</p>
                  <TextField.Root
                     {...register("repeatPassword")}
                     placeholder="Password"
                     type="password"
                  />
                  {errors.repeatPassword && (
                     <ErrorText>{errors.repeatPassword.message}</ErrorText>
                  )}
               </label>

               <Button
                  onClick={() => {
                     setAnimation("greeting");
                  }}
               >
                  Submit
               </Button>
            </form>
            <div className="max-w-[450px] mx-auto px-4 flex flex-col gap-3">
               <p className="text-center">
                  Already have an account{" "}
                  <Link
                     to={routes.login}
                     className="text-(--accent-10) hover:text-(--accent-11)"
                  >
                     Log in
                  </Link>
               </p>
               <Separator className="!w-full" />
               <p className="text-center">Sign in with other providers:</p>
               <div className="flex gap-2 justify-center">
                  <a href="http://ec2-13-60-43-26.eu-north-1.compute.amazonaws.com/oauth2/authorization/google">
                     <Button variant="soft" color="gray">
                        Google <i className="pi pi-google"></i>
                     </Button>
                  </a>
                  <a href="http://ec2-13-60-43-26.eu-north-1.compute.amazonaws.com/oauth2/authorization/github">
                     <Button variant="soft" color="gray">
                        Github <i className="pi pi-github"></i>
                     </Button>
                  </a>
               </div>
            </div>
         </section>
      </>
   );
}

export { SignupPage };
