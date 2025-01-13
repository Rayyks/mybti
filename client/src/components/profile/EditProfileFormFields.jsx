import React from "react";

export const EditProfileFormFields = ({
  myProfile,
  Label,
  Input,
  register,
  errors,
}) => {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 p-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Username */}
          <div className="group">
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Username
            </Label>
            <Input
              type="text"
              name="username"
              defaultValue={myProfile?.data?.username}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all duration-300 bg-gray-50 hover:bg-white"
              placeholder="Enter your username"
              {...register("username", {
                maxLength: {
                  value: 20,
                  message: "Username must be less than 20 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username must contain only letters, numbers, and underscores",
                },
              })}
            />
            <p className="mt-2 text-sm text-gray-500">
              Your unique identifier on the platform
            </p>
          </div>

          {/* Email */}
          <div className="group">
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              defaultValue={myProfile?.data?.email}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all duration-300 bg-gray-50 hover:bg-white"
              placeholder="your@email.com"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is invalid",
                },
              })}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Bio */}
          <div className="group">
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Bio
            </Label>
            <textarea
              name="bio"
              defaultValue={myProfile?.data?.bio}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
              placeholder="Tell us about yourself..."
              {...register("bio", {
                maxLength: {
                  value: 200,
                  message: "Bio must be less than 200 characters",
                },
              })}
            />
            <p className="mt-2 text-sm text-gray-500">
              Share a brief description about yourself
            </p>
          </div>

          {/* MBTI */}
          <div className="group">
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              MBTI Type
            </Label>
            <select
              name="mbti"
              defaultValue={myProfile?.data?.mbti}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all duration-300 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
              {...register("mbti", {
                required: "MBTI Type is required",
              })}
            >
              <option value="">Choose MBTI Type</option>
              {/* ANALYST */}
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
              {/* DIPLOMAT */}
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENFP">ENFP</option>
              {/* SENTINEL */}
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              {/* EXPLORER */}
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFP">ESFP</option>
            </select>
          </div>

          {/* PROFESSION */}
          <div className="group">
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Profession
            </Label>
            <Input
              type="text"
              name="profession"
              defaultValue={myProfile?.data?.profession}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all duration-300 bg-gray-50 hover:bg-white"
              placeholder="Enter your profession"
              {...register("profession")}
            />
            <p className="mt-2 text-sm text-gray-500">
              What do you do for a living?
            </p>
          </div>

          {/* Interests */}
          <div className="group">
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Interests
            </Label>
            <Input
              type="text"
              name="interests"
              defaultValue={
                myProfile?.data?.interests?.map((i) => i.name).join(", ") || ""
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all duration-300 bg-gray-50 hover:bg-white"
              placeholder="coding, reading, traveling..."
              {...register("interests")}
            />
            <p className="mt-2 text-sm text-gray-500">
              Add your interests, separated by commas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileFormFields;
