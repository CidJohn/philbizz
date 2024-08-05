import React from "react";
import PropTypes from "prop-types";
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
              src={placeholder}
              alt="Placeholder"
              className="object-cover rounded-lg"
            />
          )}
        </div>
      </label>
    </div>
  );
};

UploadImage.propTypes = {
  onUpload: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  imagePreview: PropTypes.string,
  handleFileChange: PropTypes.func.isRequired,
};

UploadImage.defaultProps = {
  placeholder: imageIcon,
  className: "",
  imagePreview: null,
};

export default UploadImage;
