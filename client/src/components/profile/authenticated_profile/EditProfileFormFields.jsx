import React from "react";
import { Camera } from "lucide-react";
import { ErrorInput } from "@/components/ui";

export const EditProfileFormFields = ({
  myProfile,
  Label,
  Input,
  register,
  errors,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-10 p-8">
        {/* Basic Information */}
        <div className="space-y-6">
          {/* Username */}
          <div className="group">
            <Label className="text-sm font-medium text-black mb-2 block">
              Username
            </Label>
            <Input
              type="text"
              name="username"
              defaultValue={myProfile?.user?.username}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white"
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
            <ErrorInput error={errors.username} />
            <p className="mt-2 text-sm text-gray-500">
              Your unique identifier on the platform
            </p>
          </div>

          {/* Email */}
          <div className="group">
            <Label className="text-sm font-medium text-black mb-2 block">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              defaultValue={myProfile?.user?.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white"
              placeholder="your@email.com"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is invalid",
                },
              })}
            />
            <ErrorInput error={errors.email} />
          </div>

          {/* Bio */}
          <div className="group">
            <Label className="text-sm font-medium text-black mb-2 block">
              Bio
            </Label>
            <textarea
              name="bio"
              defaultValue={myProfile?.user?.bio}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white resize-none"
              placeholder="Tell us about yourself..."
              {...register("bio", {
                maxLength: {
                  value: 200,
                  message: "Bio must be less than 200 characters",
                },
              })}
            />
            <ErrorInput error={errors.bio} />
            <p className="mt-2 text-sm text-gray-500">
              Share a brief description about yourself
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          {/* MBTI */}
          <div className="group">
            <Label className="text-sm font-medium text-black mb-2 block">
              MBTI Type
            </Label>
            <select
              name="mbti"
              defaultValue={myProfile?.user?.mbti}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white appearance-none cursor-pointer"
              {...register("mbti", {
                required: "MBTI Type is required",
              })}
            >
              <option value="">Choose MBTI Type</option>
              <optgroup label="Analysts">
                <option value="INTJ">INTJ</option>
                <option value="INTP">INTP</option>
                <option value="ENTJ">ENTJ</option>
                <option value="ENTP">ENTP</option>
              </optgroup>
              <optgroup label="Diplomats">
                <option value="INFJ">INFJ</option>
                <option value="INFP">INFP</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENFP">ENFP</option>
              </optgroup>
              <optgroup label="Sentinels">
                <option value="ISTJ">ISTJ</option>
                <option value="ISFJ">ISFJ</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ESFJ">ESFJ</option>
              </optgroup>
              <optgroup label="Explorers">
                <option value="ISTP">ISTP</option>
                <option value="ISFP">ISFP</option>
                <option value="ESTP">ESTP</option>
                <option value="ESFP">ESFP</option>
              </optgroup>
            </select>
            <ErrorInput error={errors.mbti} />
          </div>

          {/* Profession */}
          <div className="group">
            <Label className="text-sm font-medium text-black mb-2 block">
              Profession
            </Label>
            <Input
              type="text"
              name="profession"
              defaultValue={myProfile?.user?.profession}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white"
              placeholder="Enter your profession"
              {...register("profession")}
            />
            <ErrorInput error={errors.profession} />
            <p className="mt-2 text-sm text-gray-500">
              What do you do for a living?
            </p>
          </div>

          {/* Interests */}
          <div className="group">
            <Label className="text-sm font-medium text-black mb-2 block">
              Interests
            </Label>
            <Input
              type="text"
              name="interests"
              defaultValue={
                myProfile?.user?.interests?.map((i) => i.name).join(", ") || ""
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white"
              placeholder="coding, reading, traveling..."
              {...register("interests")}
            />
            <ErrorInput error={errors.interests} />
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
