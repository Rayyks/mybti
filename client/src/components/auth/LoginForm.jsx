import React from "react";
import { Input } from "@/components/ui";
import { Link } from "react-router";
import { Button } from "@/components/common";
import useAuth from "@/hooks/useAuth";
import TogglePassword from "@/lib/TogglePassword";
import { UserCircle } from "lucide-react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    error,
    handleSubmitLogin,
    showPassword,
    toggleShowPassword,
  } = useAuth();

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 text-center">
        <UserCircle className="w-16 h-16 mx-auto mb-4 text-gray-900" />
        <h3 className="text-2xl font-bold text-gray-900">Welcome back</h3>
        <p className="text-gray-500 mt-2">Continue your personality journey</p>
      </div>

      <form onSubmit={handleSubmit(handleSubmitLogin)} className="space-y-6">
        <div>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            className="text-gray-800 bg-white border-2 border-gray-200 w-full text-sm px-4 py-3.5 rounded-xl transition-all duration-200 focus:border-gray-900 focus:ring-0 focus:outline-none hover:border-gray-400"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
          />
          <ErrorInput error={errors.email} />
        </div>

        <div>
          <div className="relative flex items-center">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="text-gray-800 bg-white border-2 border-gray-200 w-full text-sm px-4 py-3.5 rounded-xl transition-all duration-200 focus:border-gray-900 focus:ring-0 focus:outline-none hover:border-gray-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <TogglePassword
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
              customClass="right-4 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <ErrorInput error={errors.password} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-gray-900 hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full py-3.5 px-4 text-sm font-medium rounded-xl text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
