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
      className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto bg-white"
    >
      <div className="mb-6">
        <h3 className="text-gray-800 text-xl font-bold">Create an account</h3>
      </div>
      <div className="space-y-6">
        <div>
          <Label
            htmlFor="username"
            className="text-gray-600 text-sm mb-2 block"
          >
            Username
          </Label>
          <div className="relative flex items-center">
            <Input
              name="username"
              id="username"
              type="text"
              className={`text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                errors.username ? "border-red-500" : ""
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
              size={24}
              className="absolute right-4 text-gray-500"
            />
          </div>
          <ErrorInput error={errors.username} />
        </div>
        <div>
          <Label htmlFor="email" className="text-gray-600 text-sm mb-2 block">
            Email Id
          </Label>
          <div className="relative flex items-center">
            <Input
              id="email"
              name="email"
              type="email"
              className={`text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500 ${
                errors.email ? "border-red-500" : ""
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
            <Mail size={24} className="absolute right-4 text-gray-500" />
          </div>
          <ErrorInput error={errors.email} />
        </div>
        <div>
          <Label
            htmlFor="password"
            className="text-gray-600 text-sm mb-2 block"
          >
            Password
          </Label>
          <div className="relative flex items-center">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500 ${
                errors.password ? "border-red-500" : ""
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
                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character\n e.g. Abcd@123",
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
          <Label htmlFor="mbti" className="text-gray-600 text-sm mb-2 block">
            MBTI Type
          </Label>
          <div className="relative flex items-center">
            <select
              name="mbti"
              id="mbti"
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
              {...register("mbti", {
                required: "MBTI Type is required",
              })}
            >
              <option value="">Choose your MBTI Type</option>
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENFP">ENFP</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFP">ESFP</option>
            </select>
          </div>
          <span className="font-medium text-sm">
            Dont know your MBTI type ?{" "}
            <a
              href="https://www.16personalities.com/id"
              target="_blank"
              className="text-blue-600 "
            >
              Let's find out here
            </a>
          </span>
          <ErrorInput error={errors.mbti} />
        </div>

        <div className="flex items-center">
          <Input
            id="accept-terms"
            name="accept-terms"
            type="checkbox"
            className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <Label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-gray-600"
          >
            I accept the{" "}
            <a
              href="https://v1.pinimg.com/videos/iht/720p/87/70/4d/87704d44eedbc8a2daaeb5956a58f8f3.mp4"
              target="_blank"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Terms and Conditions
            </a>
          </Label>
        </div>
      </div>

      <div className="sm:!mt-12 mt-6">
        <Button
          type="submit"
          className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
        >
          Create an account
        </Button>
      </div>
      <p className="text-gray-600 text-sm mt-6 text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline ml-1"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
