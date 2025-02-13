import React, { useState } from "react";
import { Camera } from "lucide-react";
import { ErrorInput } from "@/components/ui";

const EditProfileFormFields = ({
  myProfile,
  Label,
  Input,
  register,
  errors,
}) => {
  const [focusedField, setFocusedField] = useState(null);

  const formGroups = [
    {
      title: "Basic Information",
      fields: [
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
          defaultValue: myProfile?.user?.username,
          validation: {
            maxLength: {
              value: 20,
              message: "Username must be less than 20 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message:
                "Username must contain only letters, numbers, and underscores",
            },
          },
          hint: "Your unique identifier on the platform",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "your@email.com",
          defaultValue: myProfile?.user?.email,
          validation: {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email is invalid",
            },
          },
        },
        {
          name: "bio",
          label: "Bio",
          type: "textarea",
          placeholder: "Tell us about yourself...",
          defaultValue: myProfile?.user?.bio,
          validation: {
            maxLength: {
              value: 200,
              message: "Bio must be less than 200 characters",
            },
          },
          hint: "Share a brief description about yourself",
        },
      ],
    },
    {
      title: "Additional Information",
      fields: [
        {
          name: "mbti",
          label: "MBTI Type",
          type: "select",
          defaultValue: myProfile?.user?.mbti,
          validation: {
            required: "MBTI Type is required",
          },
          options: [
            { label: "Analysts", options: ["INTJ", "INTP", "ENTJ", "ENTP"] },
            { label: "Diplomats", options: ["INFJ", "INFP", "ENFJ", "ENFP"] },
            { label: "Sentinels", options: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"] },
            { label: "Explorers", options: ["ISTP", "ISFP", "ESTP", "ESFP"] },
          ],
        },
        {
          name: "profession",
          label: "Profession",
          type: "text",
          placeholder: "Enter your profession",
          defaultValue: myProfile?.user?.profession,
          hint: "What do you do for a living?",
        },
        {
          name: "interests",
          label: "Interests",
          type: "text",
          placeholder: "coding, reading, traveling...",
          defaultValue:
            myProfile?.user?.interests?.map((i) => i.name).join(", ") || "",
          hint: "Add your interests, separated by commas",
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {formGroups.map((group, groupIndex) => (
        <div
          key={group.title}
          className={`p-8 ${groupIndex > 0 ? "border-t border-gray-200" : ""}`}
        >
          <h2 className="text-xl font-semibold mb-6 text-black">
            {group.title}
          </h2>
          <div className="space-y-8">
            {group.fields.map((field) => (
              <div
                key={field.name}
                className={`transform transition-all duration-300 ${
                  focusedField === field.name ? "scale-[1.02]" : ""
                }`}
              >
                <Label className="text-sm font-medium text-black mb-2 block transition-colors duration-200">
                  {field.label}
                </Label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    defaultValue={field.defaultValue}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white hover:border-gray-400 resize-none"
                    placeholder={field.placeholder}
                    {...register(field.name, field.validation)}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    defaultValue={field.defaultValue}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white hover:border-gray-400 appearance-none cursor-pointer"
                    {...register(field.name, field.validation)}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">Choose {field.label}</option>
                    {field.options.map((group) => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type}
                    name={field.name}
                    defaultValue={field.defaultValue}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white hover:border-gray-400"
                    placeholder={field.placeholder}
                    {...register(field.name, field.validation)}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                  />
                )}

                <ErrorInput error={errors[field.name]} />
                {field.hint && (
                  <p className="mt-2 text-sm text-gray-500">{field.hint}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditProfileFormFields;
