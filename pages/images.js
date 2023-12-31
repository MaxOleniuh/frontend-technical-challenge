import React, { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "../components/Modal";
const Images = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageSize, setSelectedImageSize] = useState(null);
  const [uploadTime, setuploadTime] = useState(null);
  const [selectedImageMetadata, setSelectedImageMetadata] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateObj = new Date(uploadTime);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  useEffect(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    if (storedImages) {
      setUploadedImages(JSON.parse(storedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
  }, [uploadedImages]);

  const formatFileSize = (sizeInBytes) => {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    if (!sizeInBytes) {
      return "";
    } else if (sizeInBytes < kilobyte) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < megabyte) {
      return `${(sizeInBytes / kilobyte).toFixed(2)} KB`;
    } else {
      return `${(sizeInBytes / megabyte).toFixed(2)} MB`;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const fileSize = file.size;
    const time = file.lastModified;

    if (file) {
      setSelectedImage(file);
      setSelectedImageSize(fileSize);
      setuploadTime(time);
      const metadata = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      };
      setSelectedImageMetadata(metadata);
      localStorage.setItem("selectedImageMetadata", JSON.stringify(metadata));
      setUploadedImages((prevImages) => [...prevImages, metadata]);
    } else {
      setSelectedImage(null);
      setSelectedImageMetadata(null);
      localStorage.removeItem("selectedImageMetadata");
    }
  };

  const handlePredictClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <form className="flex-col gap-3 mb-4">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          className=" text-slate-700"
        />
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-center">
              <th className="px-4 py-2 bg-gray-200 border-b font-semibold">
                Image Filename
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b font-semibold">
                Size
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b font-semibold">
                Upload Time
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b font-semibold">
                Prediction
              </th>
            </tr>
          </thead>
          <tbody>
            {uploadedImages.map((image, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
                }
                style={{
                  animation:
                    selectedImage && index === uploadedImages.length - 1
                      ? "fade-in 0.5s"
                      : "none",
                }}
              >
                <td className="px-4 py-2 border-b">{image.name}</td>
                <td className="px-4 py-2 border-b">
                  {formatFileSize(image.size)}
                </td>
                <td className="px-4 py-2 border-b">{formattedDateTime}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={handlePredictClick}
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    PREDICT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <Link href={"/"} className="text-red-800 text-2xl font-semibold p-1">
        Back
      </Link>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Images;
