import React from "react";
import { Link } from "react-router";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="font-[sans-serif] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 text-gray-800">
      <div className="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <a href="#">
              <img
                src="https://readymadeui.com/readymadeui-white.svg"
                alt="logo"
                className="lg:w-52 w-44 mb-12 inline-block"
              />
            </a>
            <h2 className="lg:text-4xl text-2xl font-extrabold lg:leading-[50px] text-white">
              Welcome back!
            </h2>
            <p className="text-sm mt-6 text-white">
              Express yourself by sharing your thoughts, photos and more. And
              don't take yourself too seriously because this platform is just
              for have fun and learn to be yourself.
            </p>
            <p className="text-sm mt-6 text-white">
              Don't have an account{" "}
              <Link
                to="/register"
                className="text-white font-semibold underline ml-1"
              >
                Register here
              </Link>
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
