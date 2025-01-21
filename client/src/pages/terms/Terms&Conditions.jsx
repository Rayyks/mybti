import React from "react";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TermsAndConditions = ({ showTerms, setShowTerms }) => {
  return (
    <AnimatePresence>
      {showTerms && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTerms(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 overflow-auto z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-3xl mx-auto">
              <div className="bg-gray-900 border border-indigo-300 rounded-lg shadow-xl">
                {/* Header */}
                <div className="p-6 flex justify-between items-center border-b border-indigo-300/20">
                  <div className="flex items-center gap-2">
                    <Info className="w-6 h-6 text-indigo-300" />
                    <h1 className="text-2xl font-semibold text-white">
                      Terms and Conditions
                    </h1>
                  </div>
                  <button
                    onClick={() => setShowTerms(false)}
                    className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400 hover:text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="prose prose-invert max-w-none">
                    <h2 className="text-xl font-semibold text-white mb-4">
                      1. Agreement to Terms
                    </h2>
                    <p className="text-gray-300 mb-6">
                      By accessing and using this website, you accept and agree
                      to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="text-xl font-semibold text-white mb-4">
                      2. Video Content Usage
                    </h2>
                    <div className="mb-6">
                      <div className="rounded-lg p-4 mb-4">
                        <video
                          className="w-full rounded-lg"
                          controls
                          poster="https://www.highwayfleetservices.com/wp-content/uploads/2023/07/Terms-and-Conditions.png"
                        >
                          <source
                            src="https://v1.pinimg.com/videos/iht/720p/87/70/4d/87704d44eedbc8a2daaeb5956a58f8f3.mp4"
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                        <p className="text-sm text-gray-400 mt-2">
                          Video guide: Understanding our terms of service
                        </p>
                      </div>
                      <p className="text-gray-300">
                        Our video content is protected by copyright and other
                        intellectual property rights. Users may not download,
                        copy, or redistribute video content without explicit
                        permission.
                      </p>
                    </div>

                    <h2 className="text-xl font-semibold text-white mb-4">
                      3. User Responsibilities
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Users are responsible for maintaining the confidentiality
                      of their account information and for all activities that
                      occur under their account.
                    </p>

                    <div className="rounded-lg p-4 mb-6">
                      <video
                        className="w-full rounded-lg"
                        controls
                        poster="https://i.pinimg.com/736x/39/0a/42/390a42a234d9d0b6412e01ad432fd94b.jpg"
                      >
                        <source
                          src="https://v1.pinimg.com/videos/mc/720p/fa/a8/1e/faa81e40eb649b4883cb72f6fe9f69ae.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <p className="text-sm text-gray-400 mt-2">
                        Video guide: User guidelines and best practices
                      </p>
                    </div>

                    <h2 className="text-xl font-semibold text-white mb-4">
                      4. Privacy Policy
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Your use of our website is also governed by our Privacy
                      Policy. Please review our Privacy Policy, which also
                      governs the Site and informs users of our data collection
                      practices.
                    </p>

                    <h2 className="text-xl font-semibold text-white mb-4">
                      5. Disclaimer
                    </h2>
                    <p className="text-gray-300 mb-6">
                      The materials on this website are provided on an 'as is'
                      basis. We make no warranties, expressed or implied, and
                      hereby disclaim and negate all other warranties including,
                      without limitation, implied warranties or conditions of
                      merchantability.
                    </p>

                    <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400">
                        Last updated: January 20, 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TermsAndConditions;
