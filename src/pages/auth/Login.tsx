import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "ishtiak.sparrow98@gmail.com",
      password: "admin123",
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
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-screen-lg rounded-lg overflow-hidden shadow-lg">
        {/* Left Side: Image */}
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dzhou2pgk/image/upload/v1740090362/shoes.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
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
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-bg"
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
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-bg"
                required
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-primary-bg text-black py-2 px-6 rounded-lg w-full hover:bg-secondary transition"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-[10px] font-bold text-red-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
