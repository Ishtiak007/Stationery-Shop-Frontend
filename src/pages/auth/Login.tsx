import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import loginImage from "../../assets/images/login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "ishtiak.sparrow98@gmail.com",
      password: "ishtiak123",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in...");
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data.token);

      dispatch(setUser({ user, token: res?.data.token }));

      if (res.data) {
        toast.success(res.message, { id: toastId });
        navigate("/");
      } else {
        toast.error("Invalid credentials", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden font-orbitron">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-screen-lg rounded-xl overflow-hidden shadow-xl">
        {/* Left Side: Image */}
        <div className="relative">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-35"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="bg-white p-8 lg:p-12 space-y-6 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-primary-text">Login</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            <div>
              <label
                className="block text-sm font-semibold text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-bg"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-bg"
                required
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-full 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white  my-4 mt-2"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-[15px] font-bold text-red-600">
            Don't have an any account??{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register first
            </a>
          </div>

          <div>
            <p>
              <strong>Admin Email: </strong> ishtiak.sparrow98@gmail.com
            </p>
            <p>
              <strong>Admin Pass: </strong> ishtiak123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
