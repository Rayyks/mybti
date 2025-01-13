import { Camera } from "lucide-react";

export const EditProfilePictureSection = ({
  register,
  Input,
  Label,
  preview,
  handleFileChange,
}) => {
  return (
    <div className="border-b border-gray-100 p-8 bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {/* Profile Picture Display */}
          <div className="w-36 h-36 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-12 h-12 text-gray-400" />
            )}
          </div>

          {/* Hidden File Input */}
          <Input
            type="file"
            name="profilePicture"
            id="profilePicture"
            accept="image/*"
            className="hidden"
            {...register("profilePicture")}
            onChange={handleFileChange}
          />
        </div>

        {/* Helper Text */}
        <Label
          htmlFor="profilePicture"
          className="text-sm text-gray-600 flex items-center gap-2 cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          Click to upload a new photo
        </Label>
      </div>
    </div>
  );
};

export default EditProfilePictureSection;
