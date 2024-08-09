import React from "react";
import imageIcon from "../../assets/img/image-icon.png";

const UploadImage = ({
  onUpload,
  placeholder,
  className,
  imagePreview,
  handleFileChange,
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <div
          className={`w-[500px] h-[300px] border-2 border-dashed rounded-lg ${
            imagePreview ? "" : "border-gray-300"
          } flex items-center justify-center`}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="object-cover rounded-lg"
            />
          ) : (
            <img
              src={imageIcon}
              alt="Placeholder"
              className="object-cover rounded-lg"
            />
          )}
        </div>
      </label>
    </div>
  );
};

export default UploadImage;
