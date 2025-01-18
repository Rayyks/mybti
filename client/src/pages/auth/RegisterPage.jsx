import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:col-span-1 bg-gray-900 p-8 md:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Welcome</h2>
                <div className="mt-4 h-1 w-10 bg-white rounded-full"></div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                Join our community and unlock a world of possibilities. Create
                your account to begin your journey with us.
              </p>
            </div>

            <div className="hidden md:block space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white">
                  Secure & Simple
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  Your security is our priority. We ensure a safe and
                  straightforward registration process.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white">
                  Personalized Experience
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  Tell us your MBTI type and we'll tailor your experience to
                  match your personality.
                </p>
              </div>
            </div>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
