import { Forgotyourpassword, LogIn, Logins } from "@/Constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Btn } from "../../AbstractElements";
import useLoginMutation from "@/hooks/mutations/useLoginMutation";
import AddAccountLink from "./AddAccountLink";

const LoginContain = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      const result = await loginMutation.mutateAsync(values);
      toast.success("Login successful");
      router.push(result?.callbackUrl || "/page/checkout");
    } catch (error) {
      toast.error(error?.message || "Unable to complete login.");
    }
  };

  return (
    <div className="login-section">
      <div className="materialContainer">
        <div className="box">
          <div className="login-title">
            <h2>{Logins}</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="input">
              <input
                type="text"
                placeholder="Username"
                id="login-username"
                className={errors?.username ? "is-invalid" : ""}
                autoComplete="username"
                aria-invalid={Boolean(errors?.username)}
                {...register("username", {
                  required: "Username is required",
                })}
              />
              <span className="spin"></span>
              {errors?.username && <p className="text-danger mt-1 mb-0">{errors.username.message}</p>}
            </div>

            <div className="input">
              <input
                type="password"
                id="login-password"
                placeholder="Password"
                className={errors?.password ? "is-invalid" : ""}
                autoComplete="current-password"
                aria-invalid={Boolean(errors?.password)}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <span className="spin"></span>
              {errors?.password && <p className="text-danger mt-1 mb-0">{errors.password.message}</p>}
            </div>

            <Link href="/page/forgot_password" className="pass-forgot">
              {Forgotyourpassword}
            </Link>

            <div className="button login">
              <Btn attrBtn={{ type: "submit", disabled: loginMutation.isPending }}>
                <span>{loginMutation.isPending ? "Please wait..." : LogIn}</span>
                <i className="fa fa-check"></i>
              </Btn>
            </div>
          </form>

          <AddAccountLink />
        </div>
      </div>
    </div>
  );
};

export default LoginContain;
