import { Camera } from "lucide-react";

export const EditProfilePictureSection = ({
  register,
  Input,
  Label,
  preview,
  handleFileChange,
}) => {
  return (
    <div className="py-12 px-8 bg-gray-50 border-b border-gray-200">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative group">
          {/* Profile Picture Display */}
          <div className="w-40 h-40 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:border-black">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-16 h-16 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
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

          {/* Overlay for hover effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-40 h-40 rounded-full bg-black bg-opacity-50 absolute" />
            <Camera className="w-8 h-8 text-white z-10" />
          </div>
        </div>

        {/* Helper Text */}
        <Label
          htmlFor="profilePicture"
          className="text-sm text-gray-600 flex items-center gap-2 cursor-pointer hover:text-black transition-colors duration-200"
        >
          <Camera className="w-4 h-4" />
          Click to upload a new photo
        </Label>
      </div>
    </div>
  );
};

export default EditProfilePictureSection;
