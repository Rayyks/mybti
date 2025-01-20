import { useRef } from "react";
import { ErrorInput, Input, Label } from "@/components/ui";
import { Button } from "@/components/common";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import usePost from "@/hooks/usePost";
import { CloudUpload } from "lucide-react";

export const CreatePostModal = () => {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    errors,
    handleCreatePost,
    preview,
    setPreview,
    handleFileChange,
    isCreatingPost,
    createPostError,
  } = usePost();

  const onClose = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  return (
    <div
      className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif] `}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative"
      >
        <div className="flex items-center">
          <h3 className="text-black text-xl font-bold flex-1">
            Create a new post
          </h3>
          <X
            className="w-6 h-6 text-gray-800 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <form
          onSubmit={handleSubmit(handleCreatePost)}
          className="space-y-4 mt-8"
        >
          <div>
            <Label className="text-gray-800 text-sm mb-2 block">Tweet</Label>
            <textarea
              placeholder="Write about the product"
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              rows="3"
              {...register("content", { required: "Tweet is required" })}
            ></textarea>
            <ErrorInput error={errors.content} />
          </div>

          <div className="w-full flex-col justify-start items-start gap-2.5 flex">
            {preview ? (
              <>
                <X
                  className="w-6 h-6 text-gray-800 cursor-pointer"
                  onClick={() => setPreview("")}
                />
                <img src={preview} alt="image post" />
              </>
            ) : (
              <Label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center py-9 w-full border border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 "
              >
                <div className="mb-3 flex items-center justify-center">
                  <CloudUpload className="w-8 h-8 text-gray-400" />
                </div>
                <span className="text-center text-gray-400 text-xs font-normal leading-4 mb-1">
                  PNG, JPG or PDF, smaller than 15MB
                </span>
                <h6 className="text-center text-gray-900 text-sm font-medium leading-5">
                  Drag and Drop your file here or
                </h6>
                <Input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  {...register("image")}
                  onChange={handleFileChange}
                />
              </Label>
            )}
            <ErrorInput error={errors.image} />
          </div>
          {createPostError && (
            <p>
              {createPostError.message ||
                "An error occurred while creating post"}
            </p>
          )}

          <div className="flex !mt-5">
            <Button
              type="submit"
              disabled={isCreatingPost}
              className="w-full px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-neutral-600 hover:bg-neutral-800"
            >
              {isCreatingPost ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
