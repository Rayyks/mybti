import React from "react";
import { UserRoundPen, Mail } from "lucide-react";
import { Input, Label } from "@/components/ui";
import { Button } from "@/components/common";
import TogglePassword from "@/lib/TogglePassword";
import { Link } from "react-router";
import useAuth from "@/hooks/useAuth";
import { ErrorInput } from "@/components/ui";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    error,
    handleSubmitRegister,
    showPassword,
    toggleShowPassword,
  } = useAuth();

  return (
    <form
      onSubmit={handleSubmit(handleSubmitRegister)}
      className="md:col-span-2 w-full py-8 px-8 sm:px-16 max-md:max-w-xl mx-auto bg-white"
    >
      <div className="mb-8">
        <h3 className="text-gray-900 text-2xl font-bold">Join us</h3>
        <p className="text-gray-500 text-sm mt-2">
          Begin your journey with us today
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label
            htmlFor="username"
            className="text-gray-700 text-sm font-medium mb-2 block"
          >
            Username
          </Label>
          <div className="relative flex items-center group">
            <Input
              name="username"
              id="username"
              type="text"
              className={`text-gray-800 bg-white border border-gray-200 w-full text-sm pl-4 pr-10 py-3 rounded-lg transition-all duration-200 focus:border-gray-900 focus:ring-0 focus:outline-none ${
                errors.username ? "border-red-500" : "hover:border-gray-400"
              }`}
              placeholder="Enter username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username must contain only alphabets, numbers, and underscores",
                },
              })}
            />
            <UserRoundPen
              size={20}
              className="absolute right-4 text-gray-400 group-hover:text-gray-600 transition-colors"
            />
          </div>
          <ErrorInput error={errors.username} />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="text-gray-700 text-sm font-medium mb-2 block"
          >
            Email
          </Label>
          <div className="relative flex items-center group">
            <Input
              id="email"
              name="email"
              type="email"
              className={`text-gray-800 bg-white border border-gray-200 w-full text-sm pl-4 pr-10 py-3 rounded-lg transition-all duration-200 focus:border-gray-900 focus:ring-0 focus:outline-none ${
                errors.email ? "border-red-500" : "hover:border-gray-400"
              }`}
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
            />
            <Mail
              size={20}
              className="absolute right-4 text-gray-400 group-hover:text-gray-600 transition-colors"
            />
          </div>
          <ErrorInput error={errors.email} />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-gray-700 text-sm font-medium mb-2 block"
          >
            Password
          </Label>
          <div className="relative flex items-center group">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`text-gray-800 bg-white border border-gray-200 w-full text-sm pl-4 pr-10 py-3 rounded-lg transition-all duration-200 focus:border-gray-900 focus:ring-0 focus:outline-none ${
                errors.password ? "border-red-500" : "hover:border-gray-400"
              }`}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must contain uppercase, lowercase, number and special character",
                },
              })}
            />
            <TogglePassword
              toggleShowPassword={toggleShowPassword}
              showPassword={showPassword}
              customClass="right-4"
            />
          </div>
          <ErrorInput error={errors.password} />
        </div>

        <div>
          <Label
            htmlFor="mbti"
            className="text-gray-700 text-sm font-medium mb-2 block"
          >
            MBTI Type
          </Label>
          <select
            name="mbti"
            id="mbti"
            className={`text-gray-800 bg-white border border-gray-200 w-full text-sm pl-4 pr-10 py-3 rounded-lg transition-all duration-200 focus:border-gray-900 focus:ring-0 focus:outline-none hover:border-gray-400 ${
              errors.mbti ? "border-red-500" : "hover:border-gray-400"
            }`}
            {...register("mbti", {
              required: "MBTI Type is required",
            })}
          >
            <option value="">Choose your MBTI Type</option>
            {[
              "INTJ",
              "INTP",
              "ENTJ",
              "ENTP",
              "INFJ",
              "INFP",
              "ENFJ",
              "ENFP",
              "ISTJ",
              "ISFJ",
              "ESTJ",
              "ESFJ",
              "ISTP",
              "ISFP",
              "ESTP",
              "ESFP",
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="mt-2">
            <span className="text-sm text-gray-500">
              Don't know your MBTI type?{" "}
              <a
                href="https://www.16personalities.com/id"
                target="_blank"
                className="text-gray-900 font-medium hover:underline"
              >
                Find out here
              </a>
            </span>
          </div>
          <ErrorInput error={errors.mbti} />
        </div>

        <div className="flex items-center">
          <Input
            id="accept-terms"
            name="accept-terms"
            type="checkbox"
            className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
          />
          <Label
            htmlFor="accept-terms"
            className="ml-3 block text-sm text-gray-600"
          >
            I accept the{" "}
            <a
              href="https://v1.pinimg.com/videos/iht/720p/87/70/4d/87704d44eedbc8a2daaeb5956a58f8f3.mp4"
              target="_blank"
              className="text-gray-900 font-medium hover:underline"
            >
              Terms and Conditions
            </a>
          </Label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="mt-8">
        <Button
          type="submit"
          className="w-full py-3 px-4 text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Create account
        </Button>
        <p className="text-gray-600 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
