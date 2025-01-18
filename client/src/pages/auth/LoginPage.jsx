import React from "react";
import { Link } from "react-router";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-7xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Hero Section */}
            <div className="relative lg:block">
              {/* Background Pattern */}
              <div className="bg-gray-900 lg:absolute lg:inset-0">
                <div className="lg:absolute inset-0 opacity-20 hidden lg:block">
                  {/* MBTI Pattern Background - Only visible on large screens */}
                  <div className="grid grid-cols-4 gap-4 p-8 text-white text-opacity-20 text-6xl font-bold">
                    <div>INTJ</div>
                    <div>ENTP</div>
                    <div>ISFP</div>
                    <div>ENFJ</div>
                    <div>INTP</div>
                    <div>ESFJ</div>
                    <div>ISTJ</div>
                    <div>ENFP</div>
                    <div>INFJ</div>
                    <div>ESTP</div>
                    <div>ISFJ</div>
                    <div>ENTJ</div>
                  </div>
                </div>
                {/* Content Overlay */}
                <div className="relative z-10 p-6 lg:p-12 flex flex-col lg:h-full justify-between">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                      Connect with Your Type
                    </h1>
                    <div className="h-1 w-20 bg-white rounded-full mb-6 lg:mb-8"></div>
                    <p className="text-gray-300 text-base lg:text-lg mb-6 lg:mb-8">
                      Join the community where personality types come together.
                      Share, learn, and connect with people who think like you.
                    </p>

                    {/* MBTI Categories - Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 lg:mb-8">
                      <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                        <h3 className="text-white font-semibold mb-2">
                          Analysts
                        </h3>
                        <p className="text-gray-300 text-sm">
                          INTJ · INTP · ENTJ · ENTP
                        </p>
                      </div>
                      <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                        <h3 className="text-white font-semibold mb-2">
                          Diplomats
                        </h3>
                        <p className="text-gray-300 text-sm">
                          INFJ · INFP · ENFJ · ENFP
                        </p>
                      </div>
                      <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                        <h3 className="text-white font-semibold mb-2">
                          Sentinels
                        </h3>
                        <p className="text-gray-300 text-sm">
                          ISTJ · ISFJ · ESTJ · ESFJ
                        </p>
                      </div>
                      <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                        <h3 className="text-white font-semibold mb-2">
                          Explorers
                        </h3>
                        <p className="text-gray-300 text-sm">
                          ISTP · ISFP · ESTP · ESFP
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm lg:mt-0 mt-4">
                    New to our community?{" "}
                    <Link
                      to="/register"
                      className="text-white font-semibold hover:underline"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:p-12 p-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
