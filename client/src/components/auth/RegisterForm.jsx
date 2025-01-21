import { Fragment, useState } from "react";
import { Button } from "@/components/common";
import { Link } from "react-router";
import useAuth from "@/hooks/useAuth";
import RegisterFormContent from "./RegisterFormContent";
import TermsAndConditions from "@/pages/terms/Terms&Conditions";

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
  const [showTerms, setShowTerms] = useState(false);

  return (
    <Fragment>
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

        <RegisterFormContent
          register={register}
          errors={errors}
          error={error}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          setShowTerms={setShowTerms}
        />

        <div className="mt-8">
          <Button
            type="submit"
            className="w-full py-3 px-4 text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Create account
          </Button>
          <p className="text-gray-600 text-sm mt-6 text-center">
            By creating an account, you agree to our{" "}
            <Button
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-gray-900 font-medium hover:underline"
            >
              Terms and Conditions
            </Button>
            .
          </p>
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
      {showTerms && (
        <TermsAndConditions setShowTerms={setShowTerms} showTerms={showTerms} />
      )}
    </Fragment>
  );
};

export default RegisterForm;
