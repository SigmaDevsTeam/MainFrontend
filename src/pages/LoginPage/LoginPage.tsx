import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Separator, TextField } from "@radix-ui/themes";
import { ErrorText } from "~/components/ErrorText";
import { Link, useNavigate } from "react-router";
import { routes } from "~/global/config/routes.config";
import { GuideDiv } from "~/components/theme/animation/GuideDiv";
import { useAnimation } from "~/global/hooks/useAnimation";
import { api } from "~/global/config/application.config";
import toast from "react-hot-toast";

const loginScheme = z.object({
   email: z.string().nonempty("Email is not specified").email("Invalid email"),
   password: z
      .string()
      .nonempty("Password is not specified")
      .min(8, "Remember your password — it must be at least 8 characters")
});

export type loginData = z.infer<typeof loginScheme>;

function LoginPage() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<loginData>({
      resolver: zodResolver(loginScheme)
   });

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<loginData> = async (data) => {
      try {
         const res = await api.post("/login", data);
         if (res) {
            const res = await api.get("/currentUser");
            if (res) navigate(routes.settings, { replace: true });
         }
      } catch (err) {
         toast.error(JSON.stringify(err));
         console.log(err);
      }
   };

   const { step } = useAnimation();

   return (
      <>
         <h1 className="containerX text-center mt-20">Login</h1>
         <section className="containerX">
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="max-w-[450px] mx-auto p-4 flex flex-col gap-3"
            >
               <GuideDiv active={step === 2}>
                  <label>
                     <p className="font-bold">Email:</p>
                     <TextField.Root
                        {...register("email")}
                        placeholder="Email"
                     />
                     {errors.email && (
                        <ErrorText>{errors.email.message}</ErrorText>
                     )}
                  </label>
               </GuideDiv>

               <label>
                  <div className="flex justify-between items-end">
                     <span className="font-bold">Password:</span>{" "}
                     <GuideDiv active={step === 3}>
                        <small className="!text-(--accent-10)">
                           Forgot password?
                        </small>
                     </GuideDiv>
                  </div>
                  <TextField.Root
                     {...register("password")}
                     placeholder="Password"
                     type="password"
                  />
                  {errors.password && (
                     <ErrorText>{errors.password.message}</ErrorText>
                  )}
               </label>

               <Button loading={isSubmitting}>Submit</Button>
            </form>
            <div className="max-w-[450px] mx-auto px-4 flex flex-col gap-3">
               <p className="text-center">
                  Dont have an account?{" "}
                  <Link
                     to={routes.signup}
                     className="text-(--accent-10) hover:text-(--accent-11)"
                  >
                     Sign up
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

export { LoginPage };
