import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { Input } from "@/components/ui";
import { Button } from "@/components/common";

import { useCheckProfile } from "@/lib/checkProfile";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { register, handleSubmit, onSubmit, errors, data, error, isLoading } =
    useSearch();
  const { checkProfile } = useCheckProfile();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (data) {
      setResults(data?.data || []);
    }
  }, [data]);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Search</h1>
          <p className="text-gray-600">Find exactly what you're looking for</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter your search query..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                {...register("username", {
                  required: "Search query is required",
                  onChange: (e) => setSearchQuery(e.target.value),
                })}
                className="w-full pl-4 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
              />

              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <Button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Search"
              )}
            </Button>
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </form>

        {/* Search Results */}
        <div className="space-y-4">
          {results.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              {results.map((result) => (
                <div
                  key={result._id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{result.username}</h3>
                    <span className="text-sm text-gray-500">
                      {result.email}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{result.mbti}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {result.profession}
                    </span>
                    <Button
                      onClick={() => checkProfile(result.username)}
                      className="text-black hover:underline"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Show "No results found" dynamically while typing */}
          {searchQuery && results.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No results found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
