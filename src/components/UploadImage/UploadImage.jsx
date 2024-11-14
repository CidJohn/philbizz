import React, { useState } from "react";
import imageIcon from "../../assets/img/image-icon.png";

const UploadImage = ({
  onUpload,
  placeholder = imageIcon,
  className = "",
  imagePreview,
  handleFileChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange({ target: { files } });
      if (onUpload) {
        onUpload(files[0]);
      }
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e) => {
    handleFileChange(e);
    if (onUpload) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer w-full"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className={`w-full max-w-md h-72 border-2 ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } border-dashed rounded-lg flex items-center justify-center transition-colors duration-200`}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <img
                src={placeholder}
                alt="Placeholder"
                className="w-16 h-16 mb-4"
              />
              <p>Drag & Drop your image here or click to upload</p>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default UploadImage;
