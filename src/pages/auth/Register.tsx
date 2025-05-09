/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import registerImg from "../../assets/images/banner1.jpg";

const Register = () => {
  const [signUp] = useRegisterMutation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering...");
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await signUp(formData);
      if (response?.data) {
        toast.success(response?.data?.message, { id: toastId });
        navigate("/login");
      } else if (response.error) {
        toast.error(response.error?.toString(), { id: toastId });
        return navigate("/register");
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (error) {
      toast.error("SignIn Failed", { id: toastId });
      return navigate("/register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden font-orbitron">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-screen-lg rounded-lg overflow-hidden shadow-xl">
        {/* Left Side: Image */}
        <div className="relative">
          <img
            src={registerImg}
            alt="Shoes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-35"></div>
        </div>

        {/* Right Side: Register Form */}
        <div className="bg-white p-8 lg:p-12 space-y-6 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-primary-text">
            Create an Account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            <div>
              <label
                className="block text-sm font-semibold text-gray-600"
                htmlFor="name"
              >
                Name
              </label>
              <input
                placeholder="Name"
                {...register("name")}
                className="mt-2 w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary-bg"
                required
              />
            </div>
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
                className="mt-2 w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary-bg"
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
                className="mt-2 w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary-bg"
                required
              />
            </div>

            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium  
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white mt-2"
                variant={"outline"}
                disabled={FormData === null}
              >
                Register
              </Button>
            </div>
          </form>

          <div className="text-[15px] font-medium text-red-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
